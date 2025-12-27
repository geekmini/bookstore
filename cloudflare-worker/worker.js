/**
 * 藏书阁 Dify API 代理
 * 部署到 Cloudflare Workers，保护 API Key 不暴露
 */

// ============================================
// 配置：每本书的 API Key（在 Cloudflare 后台配置为环境变量）
// ============================================
// 环境变量名格式：BOOK_<book-id>_KEY
// 例如：BOOK_QI_TI_YUAN_LIU_KEY = "app-xxxxx"

const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';

// 允许访问的域名（你的 GitHub Pages 域名）
const ALLOWED_ORIGINS = [
  'https://geekmini.github.io',
  'http://localhost:3000',
  'http://localhost:60514',
  'http://127.0.0.1:3000',
];

// ============================================
// 主处理函数
// ============================================
export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // 只允许 POST 请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const origin = request.headers.get('Origin') || '';

      // 验证来源（生产环境启用）
      // if (!ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))) {
      //   return new Response('Forbidden', { status: 403 });
      // }

      // 解析请求体
      const body = await request.json();
      const { bookId, query, conversationId, user } = body;

      if (!bookId || !query) {
        return new Response(JSON.stringify({ error: 'Missing bookId or query' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 从环境变量获取 API Key
      // 将 book-id 转换为环境变量名：qi-ti-yuan-liu -> BOOK_QI_TI_YUAN_LIU_KEY
      const envKey = `BOOK_${bookId.toUpperCase().replace(/-/g, '_')}_KEY`;
      const apiKey = env[envKey];

      if (!apiKey) {
        console.error(`API key not found for book: ${bookId}, env key: ${envKey}`);
        return new Response(JSON.stringify({ error: 'Book not configured' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 调用 Dify API
      const difyResponse = await fetch(DIFY_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: query,
          response_mode: 'streaming',
          conversation_id: conversationId || '',
          user: user || 'anonymous',
        }),
      });

      if (!difyResponse.ok) {
        const errorText = await difyResponse.text();
        console.error('Dify API error:', difyResponse.status, errorText);
        return new Response(JSON.stringify({ error: 'API request failed' }), {
          status: difyResponse.status,
          headers: corsHeaders(origin),
        });
      }

      // 流式转发响应
      return new Response(difyResponse.body, {
        status: 200,
        headers: {
          ...corsHeaders(origin),
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};

// ============================================
// CORS 辅助函数
// ============================================
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function handleCORS(request) {
  const origin = request.headers.get('Origin') || '*';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
