const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')

const server = new McpServer({
  name: 'nodejs-getting-started',
  version: '1.0.0'
})

server.tool('health_check', 'Check the health of the Node.js app', {}, async () => {
  const appUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 5006}`
  try {
    const response = await fetch(`${appUrl}/health`)
    const body = await response.text()
    return {
      content: [{ type: 'text', text: `Status: ${response.status}, Body: ${body}` }]
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Health check failed: ${error.message}` }],
      isError: true
    }
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error('MCP server error:', error)
  process.exit(1)
})
