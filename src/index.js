/**
 * YuFun Home — Cloudflare Workers 入口
 * 将请求代理到 ASSETS 绑定，提供静态文件服务
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 将请求交给 ASSETS 绑定处理（匹配 wrangler.toml 中 assets 目录下的文件）
    const response = await env.ASSETS.fetch(request);

    // 如果 404 且不是根路径，尝试返回 index.html 下的路由（SPA 兼容，暂不启用）
    // if (response.status === 404 && !url.pathname.startsWith('/assets/')) {
    //   return env.ASSETS.fetch(new Request(new URL('/', url), request));
    // }

    return response;
  },
};