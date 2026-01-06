export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [
        env('FRONTEND_URL', 'https://v2.improveitmd.com'),
        'https://v2.improveitmd.com',
        'https://improveitmd.com',
        'https://www.improveitmd.com',
        'http://localhost:3000',
      ],
      async handler(uid, { documentId, locale, status }) {
        const frontendUrl = env('FRONTEND_URL', 'https://v2.improveitmd.com');

        // Map content types to frontend routes
        const contentTypeRoutes = {
          'api::local-page.local-page': '/services',
          'api::local-pages-maryland.local-pages-maryland': '/maryland',
          'api::local-pages-virginium.local-pages-virginium': '/virginia',
          'api::city-local-page.city-local-page': '/city',
          'api::blog.blog': '/blog',
          'api::blog-alt-draft.blog-alt-draft': '/blog',
        };

        const basePath = contentTypeRoutes[uid] || '';
        const previewToken = env('PREVIEW_SECRET', 'preview-secret');

        return `${frontendUrl}${basePath}/preview?documentId=${documentId}&secret=${previewToken}${status === 'draft' ? '&draft=true' : ''}`;
      },
    },
  },
});
