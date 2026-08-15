// DeepSeek Palenight Theme — Client half (runs in the browser, dsh Web UI)
// ============================================================================
// pkg-15 (final branding):
//   - dark mode: Palenight (indigo #292D3E, teal #80CBC4) — 100 tokens covered
//   - light mode: warm NEUTRAL (bg #F5F4F0, text #4F4B45, accent teal #00897B)
//   - code blocks high contrast in both modes
// Dark palette source: Community Material Theme "Palenight" (VS Code extension
// equinusocio.vsc-community-material-theme-1.4.7).
// NOTE: Theme.listTokens exposes only 13 tokens; the frontend consumes ~100.
// overrideTokens does NOT restrict token names.
//
// Capabilities used: theme.overrideTokens, slots.inject/register,
// tool.view.cordis (keyed 'self'), conversation.composer.dock (list),
// host.call, React.createElement/useState.
// Return shape: a Cordis Plugin object. Plain JavaScript only.

return {
  apply(ctx) {
    console.log('[deepseek-palenight] client half apply() running (pkg-15)')

    const theme = ctx.get('theme')
    if (theme === undefined) return

    ctx.effect(() => theme.overrideTokens('deepseek-palenight-theme', {
      // ---- surfaces (light = warm NEUTRAL, less yellow; dark = Palenight) ----
      '--dsw-alias-bg-base': { light: '#F5F4F0', dark: '#292D3E' },
      '--dsw-alias-bg-primary': { light: '#F5F4F0', dark: '#292D3E' },
      '--dsw-alias-bg-layer-1': { light: '#FAF9F6', dark: '#333747' },
      '--dsw-alias-bg-layer-2': { light: '#EDEBE4', dark: '#3B4052' },
      '--dsw-alias-bg-layer-3': { light: '#E4E1D6', dark: '#43485E' },
      '--dsw-alias-bg-overlay': { light: '#FAF9F6', dark: '#333747' },
      '--dsw-alias-bg-mask-1': { light: 'rgba(80, 72, 60, 0.24)', dark: 'rgba(8, 9, 16, 0.55)' },
      '--dsw-alias-bg-mask-2': { light: 'rgba(80, 72, 60, 0.12)', dark: 'rgba(8, 9, 16, 0.30)' },
      '--dsw-alias-bg-mask-3': { light: 'rgba(80, 72, 60, 0.48)', dark: 'rgba(0, 0, 0, 0.55)' },
      '--dsw-alias-bg-mask-drop': { light: 'rgba(80, 72, 60, 0.16)', dark: 'rgba(8, 9, 16, 0.45)' },
      '--dsw-alias-bg-mask-photo': { light: 'rgba(0, 0, 0, 0.55)', dark: 'rgba(0, 0, 0, 0.85)' },
      '--dsw-alias-bg-multi-select': { light: '#E2DFD3', dark: '#34384A' },
      '--dsw-alias-bg-module-platform': { light: '#F2F0E9', dark: '#2A2E3E' },
      '--dsw-alias-bg-skeleton': { light: '#E9E6DC', dark: '#333747' },
      '--dsw-specific-sidebar-fill': { light: '#F1EFE8', dark: '#1E2230' },
      '--dsw-specific-input-major': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-specific-menu': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-specific-selector': { light: '#EDEBE4', dark: '#333747' },
      '--dsw-specific-bubble': { light: '#F3F1EA', dark: '#333747' },
      '--dsw-specific-bubble-highlight': { light: '#E9E6DB', dark: '#3B4052' },
      '--dsw-specific-tip': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-specific-login-input': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-alias-fill-l2': { light: '#EDEBE4', dark: '#3B4052' },
      '--dsw-alias-fill-tsp-secondary': { light: '#5C564A0D', dark: '#FFFFFF14' },
      // ---- sidebar / interactive ----
      '--dsw-specific-sidebar-nav-item-active': { light: '#E4E1D6', dark: '#3B4052' },
      '--dsw-specific-sidebar-nav-item-active-accent': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-specific-sidebar-nav-item-hover': { light: '#EDEBE4', dark: '#34384A' },
      '--dsw-alias-interactive-bg-hover': { light: '#EDEBE4', dark: '#34384A' },
      '--dsw-alias-interactive-bg-hover-accent': { light: '#00897B1A', dark: '#80CBC42E' },
      '--dsw-alias-interactive-bg-hover-danger': { light: '#F5E4E1', dark: '#54303A' },
      '--dsw-alias-interactive-bg-hover-solid': { light: '#E4E1D6', dark: '#43485E' },
      '--dsw-alias-interactive-bg-active': { light: '#E4E1D6', dark: '#3B4052' },
      '--dsw-alias-interactive-bg-primary': { light: '#00897B1F', dark: '#80CBC433' },
      // ---- buttons ----
      '--dsw-alias-button-primary-fill': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-button-primary-hover': { light: '#00695C', dark: '#92D5CE' },
      '--dsw-alias-button-primary-dimmed': { light: '#00897B55', dark: '#80CBC455' },
      '--dsw-alias-button-elevated-fill': { light: '#FAF9F6', dark: '#333747' },
      '--dsw-alias-button-floating-fill': { light: '#FAF9F6', dark: '#333747' },
      '--dsw-alias-button-floating-hover': { light: '#EDEBE4', dark: '#3B4052' },
      '--dsw-alias-button-info-fill': { light: '#FAF9F6', dark: '#333747' },
      '--dsw-alias-button-info-hover': { light: '#EDEBE4', dark: '#3B4052' },
      '--dsw-alias-button-ghost-active-fill': { light: '#E4E1D6', dark: '#34384A' },
      '--dsw-alias-button-ghost-active-border': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-button-ghost-active-hover': { light: '#E4E1D6', dark: '#34384A' },
      '--dsw-alias-button-contrast-fill': { light: '#FFFFFF', dark: '#FFFFFF' },
      '--dsw-alias-button-tool-bar-fill': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-alias-button-tool-bar-fill-invisible': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(255, 255, 255, 0.06)' },
      '--dsw-alias-button-tool-bar-hover': { light: '#EDEBE4', dark: '#3B4052' },
      // ---- text (light = warm NEUTRAL grey) ----
      '--dsw-alias-label-primary': { light: '#4F4B45', dark: '#A6ACCD' },
      '--dsw-alias-label-primary-foreground': { light: '#4F4B45', dark: '#A6ACCD' },
      '--dsw-alias-label-primary-bluish': { light: '#6B655C', dark: '#B2B7D3' },
      '--dsw-alias-label-primary-dimmed': { light: '#7A746B', dark: '#7B82A6' },
      '--dsw-alias-label-primary-inverted': { light: '#FFFFFF', dark: '#292D3E' },
      '--dsw-alias-label-secondary': { light: '#7A746B', dark: '#676E95' },
      '--dsw-alias-label-tertiary': { light: '#9C968C', dark: '#7B82A6' },
      '--dsw-alias-label-quaternary': { light: '#B4AEA2', dark: '#565C7E' },
      '--dsw-alias-label-dimmed': { light: '#C6C0B4', dark: '#565C7E' },
      '--dsw-alias-label-caption': { light: '#9C968C', dark: '#7B82A6' },
      '--dsw-alias-label-error': { light: '#B3402F', dark: '#F07178' },
      '--dsw-alias-label-inverse': { light: '#FFFFFF', dark: '#292D3E' },
      // ---- borders / lines (light = warm neutral) ----
      '--dsw-alias-border-l1': { light: '#E0DDD3', dark: '#3A3F58' },
      '--dsw-alias-border-l2': { light: '#D1CDC0', dark: '#444B6E' },
      '--dsw-alias-border-l2-darkmode-thin': { light: '#E0DDD3', dark: '#3A3F58' },
      '--dsw-alias-border-l3': { light: '#C2BCAC', dark: '#4A5068' },
      '--dsw-alias-border-l4': { light: '#B3AC9B', dark: '#565C7E' },
      '--dsw-alias-border-secondary': { light: '#E0DDD3', dark: '#3A3F58' },
      '--dsw-alias-border-inverted': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-border-inverted2': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-separator-primary': { light: '#E0DDD3', dark: '#3A3F58' },
      '--dsw-alias-line-secondary': { light: '#E0DDD3', dark: '#3A3F58' },
      // ---- brand / states ----
      '--dsw-alias-brand-primary': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-brand-primary-invert': { light: '#00897B', dark: '#80CBC4' },
      '--dsw-alias-brand-text': { light: '#FFFFFF', dark: '#292D3E' },
      '--dsw-alias-state-success-primary': { light: '#4F7A3E', dark: '#4DB6AC' },
      '--dsw-alias-state-success-secondary': { light: '#4F7A3E1A', dark: '#4DB6AC33' },
      '--dsw-alias-state-success-tertiary': { light: '#4F7A3E0F', dark: '#4DB6AC22' },
      '--dsw-alias-state-error-primary': { light: '#B3402F', dark: '#F07178' },
      '--dsw-alias-state-error-secondary': { light: '#B3402F1A', dark: '#F0717833' },
      '--dsw-alias-state-warn-primary': { light: '#A9771D', dark: '#FFCB6B' },
      '--dsw-alias-state-warn-label': { light: '#A9771D', dark: '#FFCB6B' },
      '--dsw-alias-state-warn-secondary': { light: '#A9771D1A', dark: '#FFCB6B33' },
      '--dsw-alias-state-warn-tertiary': { light: '#A9771D0F', dark: '#FFCB6B22' },
      '--dsw-alias-state-business-primary': { light: '#2962FF', dark: '#82AAFF' },
      '--dsw-alias-state-business-tertiary': { light: '#2962FF0F', dark: '#82AAFF22' },
      // ---- code (clear contrast vs background in BOTH modes) ----
      '--dsw-alias-markdown-code-block': { light: '#E8E4D6', dark: '#1A1E28' },
      '--dsw-alias-markdown-code-block-banner': { light: '#DDD8C6', dark: '#20242E' },
      '--dsw-alias-markdown-code-segment-selected': { light: '#00897B26', dark: '#80CBC438' },
      '--dsw-alias-markdown-code-segment-unselected': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(0, 0, 0, 0)' },
      '--dsw-alias-markdown-inline-code': { light: '#E8E4D6', dark: '#1E2230' },
      '--dsw-alias-markdown-placeholder': { light: '#B4AEA2', dark: '#565C7E' },
      '--dsw-alias-markdown-tag': { light: '#DDD8C6', dark: '#333747' },
      '--dsw-alias-markdown-citation': { light: '#00897B1F', dark: '#80CBC433' },
      // ---- toast / tooltip / scrollbar ----
      '--dsw-alias-toast-bg': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-alias-tooltip-bg': { light: '#FAF9F6', dark: '#1E2230' },
      '--dsw-alias-scrollbar-bg-l1': { light: '#E4E1D6', dark: '#333747' },
      '--dsw-alias-scrollbar-hover-l1': { light: '#D1CDC0', dark: '#4A5068' },
      '--dsw-alias-scrollbar-bg-l2': { light: '#E0DDD3', dark: '#3A3F58' },
      '--dsw-alias-scrollbar-hover-l2': { light: '#C2BCAC', dark: '#565C7E' },
    }))

    const slots = ctx.get('slots')
    if (slots === undefined) return

    slots.inject('tool.view.cordis', () => slots.register(
      { name: 'tool.view.cordis', key: 'self' },
      (props) => {
        const pid = String(props.pluginId)
        const pkg = String(props.packageId)
        const run = String(props.pluginRunId)
        const [result, setResult] = React.useState(null)
        const [busy, setBusy] = React.useState(false)

        const callHost = (method, args) => {
          if (busy) return
          setBusy(true)
          host.call(method, args).then((res) => {
            setResult({ kind: method, data: res })
          }).catch((err) => {
            setResult({ kind: 'error', data: String((err && err.message) || err) })
          }).then(() => {
            setBusy(false)
          })
        }

        const btnStyle = {
          border: '1px solid var(--dsw-alias-border-l2)',
          borderRadius: '6px',
          background: 'var(--dsw-alias-bg-layer-1)',
          color: 'var(--dsw-alias-label-primary)',
          padding: '4px 10px',
          cursor: busy ? 'default' : 'pointer',
          fontFamily: 'inherit',
          fontSize: '12px',
        }
        const resultText = result === null
          ? 'Click a button to call the Host half.'
          : (result.kind === 'error' ? 'RPC error: ' + result.data : JSON.stringify(result.data))

        return React.createElement('div', { style: {
          display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 12px',
          border: '1px solid var(--dsw-alias-border-l2)', borderRadius: '8px',
          background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)',
          fontFamily: 'inherit', fontSize: '13px',
        } },
          React.createElement('div', { style: { fontWeight: 600, color: 'var(--dsw-alias-brand-primary)' } },
            '◆ DeepSeek Palenight Theme — run card'),
          React.createElement('div', null, 'pluginId: ' + pid + ' · packageId: ' + pkg + ' · runId: ' + run),
          React.createElement('div', null, 'dark: Palenight · light: neutral-warm · 100 tokens'),
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('button', { onClick: () => callHost('demo/ping', { from: 'run-card' }), disabled: busy, style: btnStyle }, 'Ping host'),
            React.createElement('button', { onClick: () => callHost('demo/hello', { name: 'Web UI' }), disabled: busy, style: btnStyle }, 'Hello from host'),
          ),
          React.createElement('div', { style: { color: 'var(--dsw-alias-label-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' } },
            resultText),
        )
      },
    ))

    slots.inject('conversation.composer.dock', () => slots.register(
      { name: 'conversation.composer.dock', id: 'cordis-demo-status', order: 100 },
      () => React.createElement('div', { style: {
        fontSize: '12px', color: 'var(--dsw-alias-label-secondary)',
        display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 4px',
      } },
        React.createElement('span', { style: { color: 'var(--dsw-alias-state-success-primary)' } }, '●'),
        'DeepSeek Palenight Theme active — neutral-warm light, Palenight dark'),
    ))

    console.log('[deepseek-palenight] client half ready: pkg-15')
  },
}
