export default ({ env }) => ({
  // CKEditor 5 - full-featured rich text editor with image support
  ckeditor5: {
    enabled: true,
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
      sizeLimit: 10 * 1024 * 1024, // 10mb
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
  // SEO Plugin - creates SEO components with meta tags and social media previews
  // seo: {
  //   enabled: true,
  // },
  // Sitemap Plugin - generates dynamic XML sitemaps
  // 'strapi-5-sitemap-plugin': {
  //   enabled: true,
  // },
  // GraphQL Plugin - adds GraphQL endpoint at /graphql
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      landingPage: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
});
