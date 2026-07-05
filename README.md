# 🛠️ 体院办公 - 本地在线工具箱

> 所有工具均在浏览器本地运行，不向服务器发送任何数据。

一个面向齐鲁师范体育学院办公室的在线工具集合，提供 40+ 款实用工具，涵盖文件转换、图片处理、音视频处理、编码解码等。

## ✨ 特点

- 🔒 **隐私安全** — 所有计算在浏览器本地完成，数据无留痕
- 🚀 **无需安装** — 打开即用，支持 PWA 离线使用
- 🎨 **深色/浅色主题** — 支持主题切换，自动记忆偏好
- 📱 **响应式设计** — 支持手机、平板、桌面端
- ♿ **可访问性** — 支持键盘导航、屏幕阅读器

## 🧰 工具列表

### 文件转换
图片格式转换 · 图片转PDF · Word转HTML/TXT/Markdown/PDF · 文本/HTML转Word · Excel转CSV/JSON/HTML/TXT · CSV/JSON转Excel · Markdown编辑器 · CSV/JSON互转 · 文本转PDF · 图片转Base64/ICO · 图片拼接 · 文字转图片

### 压缩
ZIP 压缩/解压

### 音视频处理
视频提取音频 · 音频格式转换 · 视频格式转换 · 视频剪切 · 视频提取帧图片

### 图片工具
图片压缩 · 图片缩放 · 图片加水印 · 颜色拾取

### 识别编码
OCR文字识别 · 二维码生成 · Base64编解码 · 哈希计算

### 开发者
JSON格式化 · 正则测试 · 文本对比 · URL编解码 · 时间戳转换

### 操作指南
磁盘清理 · 存储感知 · 系统文件清理 · CMD一键清理

## 🚀 本地运行

```bash
# 克隆仓库
git clone https://github.com/lyh-03/opentools.git
cd opentools

# 直接用浏览器打开
open index.html

# 或者用本地服务器
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 📦 技术栈

- 纯 HTML/CSS/JavaScript，无框架依赖
- CDN 库：mammoth (Word) · xlsx (Excel) · jszip (ZIP) · marked (Markdown) · qrcode-generator · jsPDF · FFmpeg WASM

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 👨‍💻 作者

刘奕赫 - 齐鲁师范体育学院
