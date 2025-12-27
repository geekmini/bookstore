/**
 * 藏书阁 Dify API 代理
 * 部署到 Cloudflare Workers，保护 API Key 不暴露
 *
 * 架构：单个 Dify App + 多知识库
 * - 只需配置一个环境变量：DIFY_API_KEY
 * - 通过 inputs 传递书籍上下文，Dify 根据上下文检索对应知识库
 */

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
      const { bookId, bookTitle, query, conversationId, user } = body;

      if (!bookId || !query) {
        return new Response(JSON.stringify({ error: 'Missing bookId or query' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 使用单一 API Key
      const apiKey = env.DIFY_API_KEY;

      if (!apiKey) {
        console.error('DIFY_API_KEY not configured');
        return new Response(JSON.stringify({ error: 'API not configured' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 调用 Dify API，通过 inputs 传递书籍上下文
      const difyResponse = await fetch(DIFY_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            book_id: bookId,
            book_title: bookTitle || bookId,
          },
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
