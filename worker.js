// Web Worker for CPU-intensive tasks
self.onmessage = function(e) {
  var data = e.data;
  try {
    switch(data.type) {
      case 'csvToJson':
        var result = parseCSV(data.input);
        self.postMessage({type: 'csvToJson', result: result});
        break;
      case 'jsonToCsv':
        var result = jsonToCsv(data.input);
        self.postMessage({type: 'jsonToCsv', result: result});
        break;
      case 'hash':
        computeHashes(data.input).then(function(result) {
          self.postMessage({type: 'hash', result: result});
        });
        break;
      case 'diff':
        var result = computeDiff(data.a, data.b);
        self.postMessage({type: 'diff', result: result});
        break;
      default:
        self.postMessage({type: 'error', error: 'Unknown task type'});
    }
  } catch(e) {
    self.postMessage({type: 'error', error: e.message});
  }
};

function parseCSVLine(line) {
  var result = [], current = '', inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (inQuotes) {
      if (ch === '"' && (i + 1 >= line.length || line[i + 1] === ',')) { inQuotes = false; }
      else if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { result.push(current); current = ''; }
      else { current += ch; }
    }
  }
  result.push(current);
  return result;
}

function parseCSV(csv) {
  var lines = csv.trim().split('\n');
  var headers = parseCSVLine(lines[0]).map(function(s) { return s.trim(); });
  var result = lines.slice(1).filter(function(l) { return l.trim(); }).map(function(line) {
    var vals = parseCSVLine(line);
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = (vals[i] || '').trim(); });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

function escapeCSV(val) {
  var s = String(val == null ? '' : val);
  if (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function jsonToCsv(json) {
  var arr = JSON.parse(json);
  if (!Array.isArray(arr)) throw new Error('需要 JSON 数组');
  var h = Object.keys(arr[0]);
  var csv = [h.map(escapeCSV).join(',')];
  arr.forEach(function(row) {
    csv.push(h.map(function(k) { return escapeCSV(row[k]); }).join(','));
  });
  return csv.join('\n');
}

async function computeHashes(text) {
  var data = new TextEncoder().encode(text);
  var results = {};
  for (var algo of ['SHA-1', 'SHA-256', 'SHA-512']) {
    var hash = await crypto.subtle.digest(algo, data);
    results[algo] = Array.from(new Uint8Array(hash)).map(function(b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }
  return results;
}

function computeDiff(aLines, bLines) {
  var mx = Math.max(aLines.length, bLines.length);
  var stats = { same: 0, added: 0, removed: 0, modified: 0 };
  var lines = [];
  for (var i = 0; i < mx; i++) {
    var la = aLines[i] || '', lb = bLines[i] || '';
    if (la === lb) {
      lines.push({ type: 'same', text: la });
      stats.same++;
    } else if (!la && lb) {
      lines.push({ type: 'added', text: lb });
      stats.added++;
    } else if (la && !lb) {
      lines.push({ type: 'removed', text: la });
      stats.removed++;
    } else {
      lines.push({ type: 'modified', textA: la, textB: lb });
      stats.modified++;
    }
  }
  return { lines: lines, stats: stats };
}
