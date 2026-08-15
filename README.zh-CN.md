# DeepSeek Palenight Theme(深蓝紫主题)

为 **dsh Harness Web UI** 定制的主题,以**两种形态**交付:

1. **持久化 dsh bundle(推荐)** — `package.json` 声明 `dsh.bundle.patch` +
   `dsh.client`,装进 dsh profile 后成为宿主组合的一部分:由宿主伺服
   `/plugins/dsh-palenight-theme/client.js`,进入 `window.__DSH_BOOT__` 清单,
   **随宿主重启存活**(与 `@liustack/modlens` 同一机制)。
2. **动态 Cordis 插件(已弃用,仅供参考)** — 旧形态(`plugin/client.js` +
   `plugin/host.js`),在会话里通过 `cordis_define`/`cordis_run` 激活,
   **进程一重启就丢失**。

两种形态都是给活动主题叠加一层 token,无需重建 harness shell。

- **暗色模式** — Community Material Theme *Palenight*:靛蓝 `#292D3E` 表面、
  长春花文字 `#A6ACCD`、teal 强调 `#80CBC4`。
- **亮色模式** — 暖中性米灰:背景 `#F5F4F0`、暖灰文字 `#4F4B45`、teal 强调 `#00897B`。
- **代码块**在两种模式下均有明显对比。
- **约 100 个主题变量**全覆盖(表面、tab/标题条、输入区、菜单、文字档位、
  边框、按钮、交互态、代码、滚动条)。

## 预览

| 亮色模式 | 暗色模式 |
| --- | --- |
| <img src="screenshots/light.jpeg" width="420" alt="亮色模式"> | <img src="screenshots/dark.jpeg" width="420" alt="暗色模式"> |

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

## 激活方式(持久化 bundle 形态——重启不丢)

本包是 dsh **bundle**:`package.json` 声明 `dsh.bundle.patch`(对应
`cordis.patch.yml` 的宿主行)与 `dsh.client`(Web 客户端 bundle)。让 dsh
profile 能解析到它即可:

1. **让 profile 解析到本包。** 两种做法:
   - 用 pnpm 装进 profile(发布后可执行 `dsh plugin --profile web add
     dsh-palenight-theme`);
   - 本地源码:把包目录复制进 profile 的依赖存储,并在
     `~/.dsh/profiles/web/package.json` 中登记:
     - 复制到 `~/.dsh/profiles/node_modules/dsh-palenight-theme/`
     - `dependencies` 增加 `"dsh-palenight-theme": "1.0.0"`
     - `dsh.profile.bundles` 追加 `dsh-palenight-theme`
2. **重启 dsh。** 组合树出现 `- id: dsh-palenight-theme` 行,client-modules
   注册表把 `/plugins/dsh-palenight-theme/client.js` 加进启动清单
   (`dsh.client.platform: web`、`immediately: true`)。
3. **每次启动自动生效。** 在 dsh 外观设置里切换亮/暗/跟随系统,两套配色都已换肤。

卸载:移除依赖与 bundle 条目,再重启。

> **激活门(重要)。** 客户端 bundle 声明了 `inject: ['theme']`,插件会等到
> `theme` 服务(由 `@deepseek-ai/dsh-client-ui-theme` 提供)就绪后才执行
> apply。不要删掉它:若为 `inject: []`,`immediately: true` 的 bundle 会在
> `ui-theme` 提供服务之前运行,`ctx.get('theme')` 为 `undefined`,token 层
> 会静默不生效。
>
> **热更新。** `dsh-client-hmr` 会监视伺服中的 bundle 文件,替换
> `plugin/client-module.js`(同包、新内容哈希)无需重启宿主即可进入清单。

## 激活方式(动态形态,已弃用——重启即失效)

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
├── package.json         Bundle 清单:dsh.bundle.patch + dsh.client
├── cordis.patch.yml     宿主行插入(- id: dsh-palenight-theme)
└── plugin/
    ├── client-module.js 持久化 bundle:浏览器端(仅 token 层,module 协议,
    │                    inject: ['theme'])
    ├── host-module.js   持久化 bundle:极简宿主行(空实现)
    ├── client.js        动态形态:浏览器端(主题层 + 演示 UI)
    └── host.js          动态形态:服务端(RPC handlers + 演示工具)
```

## 备注

- 两端均为**纯 JavaScript**(无 TS/JSX/import);动态形态的 client 只用
  `React.createElement`。
- `Theme.listTokens` 只暴露 13 个 token,前端实际消费约 100 个;
  `overrideTokens` 接受任意 token 名(仅校验 `{ light, dark }` 成对结构),
  因此可全量覆盖。
- 暗色配色取自 Community Material Theme *Palenight* VS Code 扩展
  (`equinusocio.vsc-community-material-theme-1.4.7`),该扩展的许可证管辖这些
  颜色本身;本仓库代码为 MIT。

## 许可证

MIT — 见 [LICENSE](LICENSE)。
