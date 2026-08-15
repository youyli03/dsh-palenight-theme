# DeepSeek Palenight Theme

A theme for the **dsh Harness Web UI**, delivered as a *dynamic Cordis plugin*.
It skins the whole dsh web interface live — no rebuild, no restart, no harness
modification — by stacking a token layer over the active theme.

- **Dark mode** — Community Material Theme *Palenight*: indigo `#292D3E`
  surfaces, periwinkle text `#A6ACCD`, teal accent `#80CBC4`.
- **Light mode** — warm neutral: parchment `#F5F4F0`, warm grey text `#4F4B45`,
  teal accent `#00897B`.
- **Code blocks** get clear contrast in both modes.
- **~100 theme variables** covered (surfaces, tabs/headers, inputs, menus,
  text tiers, borders, buttons, interactive states, code, scrollbars).

## Preview

| Light | Dark |
| --- | --- |
| <img src="screenshots/light.jpeg" width="420" alt="Light mode"> | <img src="screenshots/dark.jpeg" width="420" alt="Dark mode"> |

## How it works

The dsh web frontend exposes a `theme` client service. `overrideTokens(source,
tokens)` stacks a per-token CSS-variable layer on top of the active theme:

```js
theme.overrideTokens('deepseek-palenight-theme', {
  '--dsw-alias-bg-base': { light: '#F5F4F0', dark: '#292D3E' },
  '--dsw-alias-brand-primary': { light: '#00897B', dark: '#80CBC4' },
  // ... ~100 tokens total
})
```

The browser half (`plugin/client.js`) applies the layer and registers small UI
(run-card panel, composer status line). The host half (`plugin/host.js`)
registers two package-private RPC handlers (`demo/ping`, `demo/hello`) and a
model-visible demo tool (`demo_greet`) to prove both halves are live.

## Activation (in a dsh Harness / cordis-preset session)

1. `cordis_define` a new Plugin (`kind: new`, any `idPrefix`), pasting
   `plugin/host.js` as `code.host` and `plugin/client.js` as `code.client`.
2. `cordis_run` the returned `pluginId`/`packageId` (`mode: run`).
3. Approve the browser-side `cordis/request-run` prompt (client code only runs
   after you approve it).
4. The theme applies immediately. Switch dsh Appearance to Light/Dark/System —
   both palettes are themed.

To revert: `cordis_stop <pluginId>` restores the default theme and removes all
effects (badge, cards, tools). `cordis_undefine` removes it permanently.

## Repository layout

```
dsh-palenight-theme/
├── README.md            This file
├── README.zh-CN.md      中文说明
├── LICENSE              MIT
└── plugin/
    ├── client.js        Browser half: theme layer + UI (plain JS, no JSX)
    └── host.js          Node half: RPC handlers + demo tool
```

## Notes

- Both halves are **plain JavaScript** (no TS/JSX/import). The client uses
  `React.createElement` only.
- `Theme.listTokens` exposes only 13 tokens; the frontend actually consumes
  ~100. `overrideTokens` accepts any token name (only the `{ light, dark }`
  pair shape is validated), so the full set is overridable.
- Dark palette values are taken from the Community Material Theme *Palenight*
  VS Code extension (`equinusocio.vsc-community-material-theme-1.4.7`), whose
  license governs those colors; the code here is MIT.

## License

MIT — see [LICENSE](LICENSE).
