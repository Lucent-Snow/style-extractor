# style-extractor（中文）

这是一个用于“网站风格 + 动效”**证据提取**的 Codex Skill：从真实网页中提取颜色/字体/间距/组件/状态矩阵，并在网站存在动态效果时，补全运行时动效证据（timing、easing、keyframes、delay chain、JS 驱动动效线索）。输出为风格指南（Markdown），可选生成 HTML 原型。

## 依赖

- Node.js（要求 **v20.19+**）
- Chrome（Stable）
- Codex CLI（或任何支持 MCP 的客户端）
- **必装：`chrome-devtools-mcp`（Chrome DevTools MCP）**：让 agent 能控制/检查真实 Chrome，抓网络请求、截图、运行脚本、录 trace 等

## 安装

### 1) 安装 Chrome DevTools MCP（`chrome-devtools-mcp`）

在 Codex CLI 中添加 MCP Server：

```bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

如果你使用 Windows 且启动 Chrome 失败，可在 `.codex/config.toml` 里为 `chrome-devtools` 增加 `env` 和更长的 `startup_timeout_ms`（不同机器路径可能略有差异），示例：

```toml
[mcp_servers.chrome-devtools]
command = "cmd"
args = ["/c", "npx", "-y", "chrome-devtools-mcp@latest"]
env = { SystemRoot="C:\\Windows", PROGRAMFILES="C:\\Program Files" }
startup_timeout_ms = 20_000
```

### 2) 安装本 Skill

1. 直接从仓库下载 zip（压缩包）
2. 解压并放到 Codex skills 目录（推荐 `public`）下，例如：
   - `C:\\Users\\<You>\\.codex\\skills\\public\\style-extractor\\`
3. 确认该目录下能看到 `SKILL.md`、`references/`、`scripts/`

## 使用（最短路径）

### 0) 约束：输出目录固定

所有生成物必须写到：`%USERPROFILE%\\style-extractor\\`（不要写进 skill 目录）。

### 1) 在 Codex 里这样下指令

把下面这段当作模板改 URL/项目名即可：

> 使用 `style-extractor` 这个 skill。目标网站：`<URL>`。项目名：`<project>`，风格名：`<variant>`。  
> 先用 chrome-devtools-mcp 打开页面并收集证据（截图 + computed styles + 网络里的 CSS/JS）。  
> 如果页面有明显动效，必须用 `document.getAnimations({subtree:true})` 抓运行时动效证据，并给出关键交互的 keyframes / duration / delay / easing / fill，以及可能的 delay chain。  
> 最终输出：`%USERPROFILE%\\style-extractor\\<project>-<variant>-style.md`，并把证据（截图/CSS/JS/动效抓取结果）放到同名 `-evidence\\` 目录。

（提示：`chrome-devtools-mcp` 通常会在首次调用需要浏览器的工具时自动启动/连接 Chrome。）

## 参考与质量基准

- `references/endfield-design-system-style.md`：强动效证据写法（推荐优先对齐）
- `references/motherduck-design-system-style.md`：静态结构与表达方式参考

## 小提示（模型差异：经验之谈）

- 实测：**Codex 往往更“勤快”**，更愿意把动效证据抓全（例如 `document.getAnimations()`、采样、trace）。
- 实测：**Claude 往往审美更好**，但可能会“偷懒”跳过动效证据；建议你明确要求“必须输出动效证据 + keyframes + delay chain”，并让它按 `endfield` 参考格式交付。
