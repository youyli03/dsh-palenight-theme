// DeepSeek Palenight Theme — Host half (runs in the DSH Node.js process)
// ============================================================================
// Capabilities used (all verified via cordis_inspect before writing):
//   - harness.handle(method, handler)            Host Builtin: Package-private Client->Host RPC
//   - harness.defineTool(options)                Host Builtin: dynamic model-visible Tool DSL
//   - harness.registerTool(ctx, tool)            Host Builtin: register the dynamic Tool, returns disposer
//   - ctx.effect(cb)                             Cordis lifecycle: owns the disposer for the run
//
// Return shape: a Cordis Plugin object. Plain JavaScript only — no TS/JSX/import.

return {
  apply(ctx) {
    console.log('[deepseek-palenight] host half apply() running')

    // ------------------------------------------------------------------
    // 1) Package-private RPC handlers, callable from the browser half
    //    through host.call('demo/ping' | 'demo/hello', args).
    // ------------------------------------------------------------------
    let pingCount = 0

    harness.handle('demo/ping', async (args) => {
      pingCount += 1
      return {
        ok: true,
        demo: 'deepseek-palenight-theme',
        rpc: 'demo/ping',
        pingCount: pingCount,
        echo: (args && typeof args === 'object') ? args : null,
      }
    })

    harness.handle('demo/hello', async (args) => {
      const name = (args && typeof args.name === 'string' && args.name.length > 0) ? args.name : 'stranger'
      return {
        ok: true,
        demo: 'deepseek-palenight-theme',
        rpc: 'demo/hello',
        message: 'Hello from the Host half, ' + name + '!',
      }
    })

    // ------------------------------------------------------------------
    // 2) Dynamic model-visible Tool: becomes callable in later model steps
    //    and visible through the Tool Inspect provider (Tool.listTools).
    // ------------------------------------------------------------------
    const tool = harness.defineTool({
      name: 'demo_greet',
      description: 'DeepSeek Palenight Theme demo tool: greet a name and confirm the dynamic host half is live.',
      parameters: {
        name: { type: 'string', description: 'Who to greet.', required: true },
      },
      output: {
        schema: { type: 'string' },
        render(args, value) {
          return [{ type: 'text', text: value }]
        },
      },
      async execute(args) {
        return 'Hello, ' + args.name + '! — from the dynamic tool demo_greet (DeepSeek Palenight Theme)'
      },
    })
    ctx.effect(() => harness.registerTool(ctx, tool))

    console.log('[deepseek-palenight] host half ready: demo/ping, demo/hello, demo_greet')
  },
}
