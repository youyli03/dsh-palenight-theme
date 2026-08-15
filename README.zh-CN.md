# DeepSeek Palenight Theme(深蓝紫主题)

为 **dsh Harness Web UI** 定制的主题,以**动态 Cordis 插件**形式交付:
无需重新构建、无需重启、不改 harness,通过给活动主题叠加一层 token 即可
实时换肤整个 dsh 网页界面。

- **暗色模式** — Community Material Theme *Palenight*:靛蓝 `#292D3E` 表面、
  长春花文字 `#A6ACCD`、teal 强调 `#80CBC4`。
- **亮色模式** — 暖中性米灰:背景 `#F5F4F0`、暖灰文字 `#4F4B45`、teal 强调 `#00897B`。
- **代码块**在两种模式下均有明显对比。
- **约 100 个主题变量**全覆盖(表面、tab/标题条、输入区、菜单、文字档位、
  边框、按钮、交互态、代码、滚动条)。

## 原理

dsh 前端暴露 `theme` client 服务,`overrideTokens(source, tokens)` 会把
逐 token 的 CSS 变量层叠加到活动主题之上:

```js
theme.overrideTokens('deepseek-palenight-theme', {
  '--dsw-alias-bg-base': { light: '#F5F4F0', dark: '#292D3E' },
  '--dsw-alias-brand-primary': { light: '#00897B', dark: '#80CBC4' },
  // ...共约 100 个 token
})
```

浏览器端(`plugin/client.js`)应用覆盖层并注册少量 UI(Run 卡片面板、输入区状态条);
服务端(`plugin/host.js`)注册两个私有 RPC(`demo/ping`、`demo/hello`)与一个模型可见的
演示工具(`demo_greet`),证明两端都在线。

## 激活方式(在 dsh Harness / cordis preset 会话中)

1. `cordis_define` 新建 Plugin(`kind: new`,任意 `idPrefix`),把
   `plugin/host.js` 作为 `code.host`、`plugin/client.js` 作为 `code.client` 粘贴。
2. 对返回的 `pluginId`/`packageId` 执行 `cordis_run`(`mode: run`)。
3. 在浏览器端批准 `cordis/request-run` 请求(client 代码必须经你批准才会运行)。
4. 主题立即生效;在 dsh 外观设置里切换亮/暗/跟随系统,两套配色都已换肤。

还原:`cordis_stop <pluginId>` 恢复默认主题并移除全部效果;
`cordis_undefine` 则彻底删除。

## 目录结构

```
dsh-palenight-theme/
├── README.md            英文说明
├── README.zh-CN.md      本文档
├── LICENSE              MIT
└── plugin/
    ├── client.js        浏览器端:主题层 + UI(纯 JS,无 JSX)
    └── host.js          服务端:RPC handlers + 演示工具
```

## 备注

- 两端均为**纯 JavaScript**(无 TS/JSX/import);client 只用 `React.createElement`。
- `Theme.listTokens` 只暴露 13 个 token,前端实际消费约 100 个;
  `overrideTokens` 接受任意 token 名(仅校验 `{ light, dark }` 成对结构),
  因此可全量覆盖。
- 暗色配色取自 Community Material Theme *Palenight* VS Code 扩展
  (`equinusocio.vsc-community-material-theme-1.4.7`),该扩展的许可证管辖这些
  颜色本身;本仓库代码为 MIT。

## 许可证

MIT — 见 [LICENSE](LICENSE)。
