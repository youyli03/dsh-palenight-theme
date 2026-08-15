// DeepSeek Palenight Theme — Host half (persistent bundle form).
// ============================================================================
// The theme is applied entirely by the browser half (plugin/client-module.js);
// this row exists so the client-modules registry sees the package. It is a
// plain cordis plugin with no injects, so it activates immediately and does
// nothing host-side. (The dynamic-plugin demo host half — demo/ping, demo/hello,
// demo_greet — is not carried into the persistent form.)
export const name = 'dsh-palenight-theme'
export const inject = []

export function apply() {
  // no-op: client-side theme only
}
