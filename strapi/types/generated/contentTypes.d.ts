import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBlogAltDraftBlogAltDraft
  extends Struct.CollectionTypeSchema {
  collectionName: 'blog_alt';
  info: {
    description: 'Migrated from Webflow collection: Blog alt (draft)s';
    displayName: 'Blog alt (draft)s';
    pluralName: 'blog-alt';
    singularName: 'blog-alt-draft';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    authorTemp: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-alt-draft.blog-alt-draft'
    > &
      Schema.Attribute.Private;
    mainImage: Schema.Attribute.Media<'images'>;
    postBody: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    postSummary: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    publishedDateShown: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    summaryCallout: Schema.Attribute.Text;
    thumbnailImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogPostBlogPost extends Struct.CollectionTypeSchema {
  collectionName: 'blog';
  info: {
    description: 'Migrated from Webflow collection: Blog Posts';
    displayName: 'Blog Posts';
    pluralName: 'blog';
    singularName: 'blog-post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    authorTemp: Schema.Attribute.Text;
    blogImage: Schema.Attribute.Media<'images'>;
    blogImageAltTag: Schema.Attribute.Text;
    blogSummary: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    calc: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isCalcCommercial: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-post.blog-post'
    > &
      Schema.Attribute.Private;
    openGraphImage: Schema.Attribute.Media<'images'>;
    postBody: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    postSummary: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    publishedDateShown: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weatherWidget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    weatherWidgetLocation: Schema.Attribute.Text;
    weatherWidgetRightParagraphText: Schema.Attribute.Text;
  };
}

export interface ApiCashForLandCashForLand extends Struct.CollectionTypeSchema {
  collectionName: 'farmlands';
  info: {
    description: 'Migrated from Webflow collection: CASH FOR LANDs';
    displayName: 'CASH FOR LANDs';
    pluralName: 'farmlands';
    singularName: 'cash-for-land';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundVideoDoors: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    backgroundVideoFlatRoofing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    displayRoofingHeroBackgroundVideo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureText: Schema.Attribute.Text;
    footerAddress: Schema.Attribute.Text;
    header: Schema.Attribute.Text;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    images3: Schema.Attribute.Media<'images', true>;
    imgAltText: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::cash-for-land.cash-for-land'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    subhead: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCityLocalPageCityLocalPage
  extends Struct.CollectionTypeSchema {
  collectionName: 'city';
  info: {
    description: 'Migrated from Webflow collection: City Local Pages';
    displayName: 'City Local Pages';
    pluralName: 'city';
    singularName: 'city-local-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    altTextForKeywordImage: Schema.Attribute.Text;
    altTextForProjectImage1: Schema.Attribute.Text;
    altTextForProjectImage2: Schema.Attribute.Text;
    altTextForProjectImage3: Schema.Attribute.Text;
    buttonTextConsultantCta: Schema.Attribute.Text;
    buttonTextHeaderCta: Schema.Attribute.Text;
    communityDescription: Schema.Attribute.Text;
    communityGuidelinesRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    communityHeadline: Schema.Attribute.Text;
    communityImage: Schema.Attribute.Media<'images'>;
    communityImageAltText: Schema.Attribute.Text;
    consultantTitleDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    echoRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer10: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer11: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer12: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer13: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer14: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer15: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer8: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer9: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqQuestion1: Schema.Attribute.Text;
    faqQuestion10: Schema.Attribute.Text;
    faqQuestion11: Schema.Attribute.Text;
    faqQuestion12: Schema.Attribute.Text;
    faqQuestion13: Schema.Attribute.Text;
    faqQuestion14: Schema.Attribute.Text;
    faqQuestion15: Schema.Attribute.Text;
    faqQuestion2: Schema.Attribute.Text;
    faqQuestion3: Schema.Attribute.Text;
    faqQuestion4: Schema.Attribute.Text;
    faqQuestion5: Schema.Attribute.Text;
    faqQuestion6: Schema.Attribute.Text;
    faqQuestion7: Schema.Attribute.Text;
    faqQuestion8: Schema.Attribute.Text;
    faqQuestion9: Schema.Attribute.Text;
    galleryMultiImages: Schema.Attribute.Media<'images', true>;
    googleReviewLink: Schema.Attribute.String;
    h1Hangline: Schema.Attribute.Text;
    headerDescription: Schema.Attribute.Text;
    headerVideo: Schema.Attribute.String;
    headerVideoCode: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::city-local-page.city-local-page'
    > &
      Schema.Attribute.Private;
    localReviewHeader: Schema.Attribute.Text;
    locationContactDetails: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locationImprovementsRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mainStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mapDescriptionText: Schema.Attribute.Text;
    mapHeaderText: Schema.Attribute.Text;
    mapLocation: Schema.Attribute.Enumeration<
      ['Bowie', 'Pasadena', 'Gaithersburg', 'Crownsville']
    >;
    mapSection: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    nameOfReviewer: Schema.Attribute.Text;
    openGraphDescription: Schema.Attribute.Text;
    openGraphImageUrl: Schema.Attribute.Media<'images'>;
    openGraphTitle: Schema.Attribute.Text;
    projectConsultant1Image: Schema.Attribute.Media<'images'>;
    projectConsultant2Image: Schema.Attribute.Media<'images'>;
    projectConsultantName: Schema.Attribute.Text;
    projectConsultantTitle: Schema.Attribute.Text;
    projectImage1: Schema.Attribute.Media<'images'>;
    projectImage2: Schema.Attribute.Media<'images'>;
    projectImage3: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    recentProjectDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    recentProjectHangline: Schema.Attribute.Text;
    recentProjectHeadline: Schema.Attribute.Text;
    recentProjectKeywordImage: Schema.Attribute.Media<'images'>;
    residentialCalc: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    residentialCalcHeader: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    reviewText: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    secondaryStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    servicesBodyText: Schema.Attribute.Text;
    servicesModal1: Schema.Attribute.Text;
    servicesModal2: Schema.Attribute.Text;
    servicesModal3: Schema.Attribute.Text;
    servicesModal4: Schema.Attribute.Text;
    servicesModal5: Schema.Attribute.Text;
    servicesModal6: Schema.Attribute.Text;
    servicesModal7: Schema.Attribute.Text;
    servicesModalDesc1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalHeading: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    supportingTextRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    testimonialVideo: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weatherWidget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    weatherWidgetLocationText: Schema.Attribute.Text;
    weatherWidgetRightHeader: Schema.Attribute.Text;
    weatherWidgetRightParagraphText: Schema.Attribute.Text;
  };
}

export interface ApiClearingBusinessClearingBusiness
  extends Struct.CollectionTypeSchema {
  collectionName: 'land';
  info: {
    description: 'Migrated from Webflow collection: CLEARING BUSINESSes';
    displayName: 'CLEARING BUSINESSes';
    pluralName: 'land';
    singularName: 'clearing-business';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundVideoFlatRoofing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    displayRoofingHeroBackgroundVideo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureText: Schema.Attribute.Text;
    footerAddress: Schema.Attribute.Text;
    header: Schema.Attribute.Text;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    images3: Schema.Attribute.Media<'images', true>;
    imgAltText: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::clearing-business.clearing-business'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    subhead: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCodeSnippetCodeSnippet extends Struct.CollectionTypeSchema {
  collectionName: 'code_snippets';
  info: {
    description: 'Store reusable code snippets (JS, CSS, HTML, JSON)';
    displayName: 'Code Snippets';
    pluralName: 'code-snippets';
    singularName: 'code-snippet';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    codeType: Schema.Attribute.Enumeration<
      [
        'javascript',
        'css',
        'html',
        'json',
        'schema-markup',
        'tracking',
        'other',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'javascript'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isGlobal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::code-snippet.code-snippet'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.Enumeration<
      ['head', 'body-start', 'body-end', 'inline', 'none']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    pages: Schema.Attribute.Text;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJamesHardieColorJamesHardieColor
  extends Struct.CollectionTypeSchema {
  collectionName: 'james_hardie';
  info: {
    description: 'Migrated from Webflow collection: James Hardie Colors';
    displayName: 'James Hardie Colors';
    pluralName: 'james-hardie';
    singularName: 'james-hardie-color';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    altTextSliderImage1: Schema.Attribute.Text;
    altTextSliderImage2: Schema.Attribute.Text;
    altTextSliderImage3: Schema.Attribute.Text;
    classicCollection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    colorBackground: Schema.Attribute.String;
    colorDarkSwitch: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    colorDarkWhiteForSwatches: Schema.Attribute.String;
    colorName: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaImage1: Schema.Attribute.Media<'images'>;
    ctaImage2: Schema.Attribute.Media<'images'>;
    ctaName: Schema.Attribute.Text;
    ctaText: Schema.Attribute.Text;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureImage1: Schema.Attribute.Media<'images'>;
    featureImage2: Schema.Attribute.Media<'images'>;
    featureImage3: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::james-hardie-color.james-hardie-color'
    > &
      Schema.Attribute.Private;
    magnoliaCollection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    mainImage: Schema.Attribute.Media<'images'>;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.Text;
    opengraphImage: Schema.Attribute.Media<'images'>;
    opengraphImageUrl2: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    sliderDetail: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    sliderHeading: Schema.Attribute.Text;
    sliderImage1: Schema.Attribute.Media<'images'>;
    sliderImage2: Schema.Attribute.Media<'images'>;
    sliderImage3: Schema.Attribute.Media<'images'>;
    sliderImage4: Schema.Attribute.Media<'images'>;
    sliderImage5: Schema.Attribute.Media<'images'>;
    sliderImage6: Schema.Attribute.Media<'images'>;
    sliderOverlay: Schema.Attribute.String;
    sliderText: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    subHeading: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoSwitch: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    youtubeLink: Schema.Attribute.String;
  };
}

export interface ApiLandingPageLandingPage extends Struct.CollectionTypeSchema {
  collectionName: 'lp';
  info: {
    description: 'Migrated from Webflow collection: Landing Pages';
    displayName: 'Landing Pages';
    pluralName: 'lp';
    singularName: 'landing-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundVideoDoors: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    backgroundVideoFlatRoofing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    displayRoofingHeroBackgroundVideo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureText: Schema.Attribute.Text;
    footerAddress: Schema.Attribute.Text;
    header: Schema.Attribute.Text;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    images3: Schema.Attribute.Media<'images', true>;
    imgAltText: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::landing-page.landing-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    subhead: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLocalPageLocalPage extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    description: 'Migrated from Webflow collection: Local Pages';
    displayName: 'Local Pages';
    pluralName: 'services';
    singularName: 'local-page';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    'content-manager': {
      visible: true;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    altTextForKeywordImage: Schema.Attribute.Text;
    altTextForProjectImage1: Schema.Attribute.Text;
    altTextForProjectImage2: Schema.Attribute.Text;
    altTextForProjectImage3: Schema.Attribute.Text;
    buttonTextConsultantCta: Schema.Attribute.Text;
    buttonTextHeaderCta: Schema.Attribute.Text;
    communityGuidelinesRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    consultantTitleDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    echoRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer10: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer11: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer12: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer13: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer14: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer15: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer8: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer9: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqQuestion1: Schema.Attribute.Text;
    faqQuestion10: Schema.Attribute.Text;
    faqQuestion11: Schema.Attribute.Text;
    faqQuestion12: Schema.Attribute.Text;
    faqQuestion13: Schema.Attribute.Text;
    faqQuestion14: Schema.Attribute.Text;
    faqQuestion15: Schema.Attribute.Text;
    faqQuestion2: Schema.Attribute.Text;
    faqQuestion3: Schema.Attribute.Text;
    faqQuestion4: Schema.Attribute.Text;
    faqQuestion5: Schema.Attribute.Text;
    faqQuestion6: Schema.Attribute.Text;
    faqQuestion7: Schema.Attribute.Text;
    faqQuestion8: Schema.Attribute.Text;
    faqQuestion9: Schema.Attribute.Text;
    galleryMultiImages: Schema.Attribute.Media<'images', true>;
    googleReviewLink: Schema.Attribute.String;
    h1Hangline: Schema.Attribute.Text;
    headerDescription: Schema.Attribute.Text;
    headerVideo: Schema.Attribute.String;
    headerVideoCode: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::local-page.local-page'
    > &
      Schema.Attribute.Private;
    localReviewHeader: Schema.Attribute.Text;
    locationContactDetails: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locationImprovementsRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mainStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mapDescriptionText: Schema.Attribute.Text;
    mapHeaderText: Schema.Attribute.Text;
    mapLocation: Schema.Attribute.Enumeration<
      ['Bowie', 'Pasadena', 'Gaithersburg', 'Crownsville']
    >;
    mapSection: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    nameOfReviewer: Schema.Attribute.Text;
    openGraphDescription: Schema.Attribute.Text;
    openGraphImageUrl: Schema.Attribute.Media<'images'>;
    openGraphTitle: Schema.Attribute.Text;
    projectConsultant1Image: Schema.Attribute.Media<'images'>;
    projectConsultant2Image: Schema.Attribute.Media<'images'>;
    projectConsultantName: Schema.Attribute.Text;
    projectConsultantTitle: Schema.Attribute.Text;
    projectImage1: Schema.Attribute.Media<'images'>;
    projectImage2: Schema.Attribute.Media<'images'>;
    projectImage3: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    recentProjectDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    recentProjectHangline: Schema.Attribute.Text;
    recentProjectHeadline: Schema.Attribute.Text;
    recentProjectKeywordImage: Schema.Attribute.Media<'images'>;
    residentialCalc: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    residentialCalcHeader: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    reviewText: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    secondaryStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    servicesBodyText: Schema.Attribute.Text;
    servicesModal1: Schema.Attribute.Text;
    servicesModal2: Schema.Attribute.Text;
    servicesModal3: Schema.Attribute.Text;
    servicesModal4: Schema.Attribute.Text;
    servicesModal5: Schema.Attribute.Text;
    servicesModal6: Schema.Attribute.Text;
    servicesModalDesc1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalHeading: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    supportingTextRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    testimonialVideo: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weatherWidget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    weatherWidgetLocationText: Schema.Attribute.Text;
    weatherWidgetRightHeader: Schema.Attribute.Text;
    weatherWidgetRightParagraphText: Schema.Attribute.Text;
  };
}

export interface ApiLocalPagesMarylandLocalPagesMaryland
  extends Struct.CollectionTypeSchema {
  collectionName: 'maryland';
  info: {
    description: 'Migrated from Webflow collection: Local Pages - Marylands';
    displayName: 'Local Pages - Marylands';
    pluralName: 'maryland';
    singularName: 'local-pages-maryland';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    altTextForKeywordImage: Schema.Attribute.Text;
    altTextForProjectImage1: Schema.Attribute.Text;
    altTextForProjectImage2: Schema.Attribute.Text;
    altTextForProjectImage3: Schema.Attribute.Text;
    buttonTextConsultantCta: Schema.Attribute.Text;
    buttonTextHeaderCta: Schema.Attribute.Text;
    communityDescription: Schema.Attribute.Text;
    communityGuidelinesRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    communityHeadline: Schema.Attribute.Text;
    communityImage: Schema.Attribute.Media<'images'>;
    communityImageAltText: Schema.Attribute.Text;
    consultantTitleDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    echoRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer10: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer11: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer12: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer13: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer14: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer15: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer8: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer9: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqQuestion1: Schema.Attribute.Text;
    faqQuestion10: Schema.Attribute.Text;
    faqQuestion11: Schema.Attribute.Text;
    faqQuestion12: Schema.Attribute.Text;
    faqQuestion13: Schema.Attribute.Text;
    faqQuestion14: Schema.Attribute.Text;
    faqQuestion15: Schema.Attribute.Text;
    faqQuestion2: Schema.Attribute.Text;
    faqQuestion3: Schema.Attribute.Text;
    faqQuestion4: Schema.Attribute.Text;
    faqQuestion5: Schema.Attribute.Text;
    faqQuestion6: Schema.Attribute.Text;
    faqQuestion7: Schema.Attribute.Text;
    faqQuestion8: Schema.Attribute.Text;
    faqQuestion9: Schema.Attribute.Text;
    galleryMultiImages: Schema.Attribute.Media<'images', true>;
    googleReviewLink: Schema.Attribute.String;
    h1Hangline: Schema.Attribute.Text;
    headerDescription: Schema.Attribute.Text;
    headerVideo: Schema.Attribute.String;
    headerVideoCode: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::local-pages-maryland.local-pages-maryland'
    > &
      Schema.Attribute.Private;
    localReviewHeader: Schema.Attribute.Text;
    locationContactDetails: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locationImprovementsRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mainStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mapDescriptionText: Schema.Attribute.Text;
    mapHeaderText: Schema.Attribute.Text;
    mapLocation: Schema.Attribute.Enumeration<
      ['Bowie', 'Pasadena', 'Gaithersburg', 'Crownsville']
    >;
    mapSection: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    nameOfReviewer: Schema.Attribute.Text;
    openGraphDescription: Schema.Attribute.Text;
    openGraphImageUrl: Schema.Attribute.Media<'images'>;
    openGraphTitle: Schema.Attribute.Text;
    projectConsultant1Image: Schema.Attribute.Media<'images'>;
    projectConsultant2Image: Schema.Attribute.Media<'images'>;
    projectConsultantName: Schema.Attribute.Text;
    projectConsultantTitle: Schema.Attribute.Text;
    projectImage1: Schema.Attribute.Media<'images'>;
    projectImage2: Schema.Attribute.Media<'images'>;
    projectImage3: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    recentProjectDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    recentProjectHangline: Schema.Attribute.Text;
    recentProjectHeadline: Schema.Attribute.Text;
    recentProjectKeywordImage: Schema.Attribute.Media<'images'>;
    residentialCalc: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    residentialCalcHeader: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    reviewText: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    secondaryStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    servicesBodyText: Schema.Attribute.Text;
    servicesModal1: Schema.Attribute.Text;
    servicesModal2: Schema.Attribute.Text;
    servicesModal3: Schema.Attribute.Text;
    servicesModal4: Schema.Attribute.Text;
    servicesModal5: Schema.Attribute.Text;
    servicesModal6: Schema.Attribute.Text;
    servicesModal7: Schema.Attribute.Text;
    servicesModalDesc1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalHeading: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    supportingTextRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    testimonialVideo: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weatherWidget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    weatherWidgetLocationText: Schema.Attribute.Text;
    weatherWidgetRightHeader: Schema.Attribute.Text;
    weatherWidgetRightParagraphText: Schema.Attribute.Text;
  };
}

export interface ApiLocalPagesVirginiumLocalPagesVirginium
  extends Struct.CollectionTypeSchema {
  collectionName: 'virginia';
  info: {
    description: 'Migrated from Webflow collection: Local Pages - Virginia';
    displayName: 'Local Pages - Virginia';
    pluralName: 'virginia';
    singularName: 'local-pages-virginium';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    altTextForKeywordImage: Schema.Attribute.Text;
    altTextForProjectImage1: Schema.Attribute.Text;
    altTextForProjectImage2: Schema.Attribute.Text;
    altTextForProjectImage3: Schema.Attribute.Text;
    buttonTextConsultantCta: Schema.Attribute.Text;
    buttonTextHeaderCta: Schema.Attribute.Text;
    communityDescription: Schema.Attribute.Text;
    communityGuidelinesRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    communityHeadline: Schema.Attribute.Text;
    communityImage: Schema.Attribute.Media<'images'>;
    communityImageAltText: Schema.Attribute.Text;
    consultantTitleDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    echoRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer10: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer11: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer12: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer13: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer14: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer15: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer8: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqAnswer9: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faqQuestion1: Schema.Attribute.Text;
    faqQuestion10: Schema.Attribute.Text;
    faqQuestion11: Schema.Attribute.Text;
    faqQuestion12: Schema.Attribute.Text;
    faqQuestion13: Schema.Attribute.Text;
    faqQuestion14: Schema.Attribute.Text;
    faqQuestion15: Schema.Attribute.Text;
    faqQuestion2: Schema.Attribute.Text;
    faqQuestion3: Schema.Attribute.Text;
    faqQuestion4: Schema.Attribute.Text;
    faqQuestion5: Schema.Attribute.Text;
    faqQuestion6: Schema.Attribute.Text;
    faqQuestion7: Schema.Attribute.Text;
    faqQuestion8: Schema.Attribute.Text;
    faqQuestion9: Schema.Attribute.Text;
    galleryMultiImages: Schema.Attribute.Media<'images', true>;
    googleReviewLink: Schema.Attribute.String;
    h1Hangline: Schema.Attribute.Text;
    headerDescription: Schema.Attribute.Text;
    headerVideo: Schema.Attribute.String;
    headerVideoCode: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::local-pages-virginium.local-pages-virginium'
    > &
      Schema.Attribute.Private;
    localReviewHeader: Schema.Attribute.Text;
    locationContactDetails: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locationImprovementsRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mainStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mapDescriptionText: Schema.Attribute.Text;
    mapHeaderText: Schema.Attribute.Text;
    mapLocation: Schema.Attribute.Enumeration<
      ['Bowie', 'Pasadena', 'Gaithersburg', 'Crownsville']
    >;
    mapSection: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    nameOfReviewer: Schema.Attribute.Text;
    openGraphDescription: Schema.Attribute.Text;
    openGraphImageUrl: Schema.Attribute.Media<'images'>;
    openGraphTitle: Schema.Attribute.Text;
    projectConsultant1Image: Schema.Attribute.Media<'images'>;
    projectConsultant2Image: Schema.Attribute.Media<'images'>;
    projectConsultantName: Schema.Attribute.Text;
    projectConsultantTitle: Schema.Attribute.Text;
    projectImage1: Schema.Attribute.Media<'images'>;
    projectImage2: Schema.Attribute.Media<'images'>;
    projectImage3: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    recentProjectDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    recentProjectHangline: Schema.Attribute.Text;
    recentProjectHeadline: Schema.Attribute.Text;
    recentProjectKeywordImage: Schema.Attribute.Media<'images'>;
    residentialCalc: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    residentialCalcHeader: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    reviewText: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    secondaryStoryRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    seoMetaDescription: Schema.Attribute.Text;
    seoTitleTag: Schema.Attribute.Text;
    servicesBodyText: Schema.Attribute.Text;
    servicesModal1: Schema.Attribute.Text;
    servicesModal2: Schema.Attribute.Text;
    servicesModal3: Schema.Attribute.Text;
    servicesModal4: Schema.Attribute.Text;
    servicesModal5: Schema.Attribute.Text;
    servicesModal6: Schema.Attribute.Text;
    servicesModal7: Schema.Attribute.Text;
    servicesModalDesc1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc4: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc5: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc6: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalDesc7: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    servicesModalHeading: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    supportingTextRichText: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    testimonialVideo: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weatherWidget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    weatherWidgetLocationText: Schema.Attribute.Text;
    weatherWidgetRightHeader: Schema.Attribute.Text;
    weatherWidgetRightParagraphText: Schema.Attribute.Text;
  };
}

export interface ApiReviewtestimonialReviewtestimonial
  extends Struct.CollectionTypeSchema {
  collectionName: 'review_testimonials';
  info: {
    description: 'Migrated from Webflow collection: Review/Testimonials';
    displayName: 'Review/Testimonials';
    pluralName: 'review-testimonials';
    singularName: 'reviewtestimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::reviewtestimonial.reviewtestimonial'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    reviewDate: Schema.Attribute.Text;
    reviewerImage: Schema.Attribute.Media<'images'>;
    reviewerName: Schema.Attribute.Text;
    reviewLink: Schema.Attribute.String;
    reviewText: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSaleSale extends Struct.CollectionTypeSchema {
  collectionName: 'sales';
  info: {
    description: 'Migrated from Webflow collection: Sales';
    displayName: 'Sales';
    pluralName: 'sales';
    singularName: 'sale';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::sale.sale'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceAreaCityServiceAreaCity
  extends Struct.CollectionTypeSchema {
  collectionName: 'service_area_cities';
  info: {
    description: 'Migrated from Webflow collection: Service Area Cities';
    displayName: 'Service Area Cities';
    pluralName: 'service-area-cities';
    singularName: 'service-area-city';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cityZoomLevel: Schema.Attribute.Decimal;
    cordinatesLatLong: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-area-city.service-area-city'
    > &
      Schema.Attribute.Private;
    map: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceAreaCountyServiceAreaCounty
  extends Struct.CollectionTypeSchema {
  collectionName: 'service_area_counties';
  info: {
    description: 'Migrated from Webflow collection: Service Area Counties';
    displayName: 'Service Area Counties';
    pluralName: 'service-area-counties';
    singularName: 'service-area-county';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-area-county.service-area-county'
    > &
      Schema.Attribute.Private;
    map: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    state: Schema.Attribute.Enumeration<['MD', 'DC', 'VA']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTimbertechColorTimbertechColor
  extends Struct.CollectionTypeSchema {
  collectionName: 'timbertech';
  info: {
    description: 'Migrated from Webflow collection: Timbertech Colors';
    displayName: 'Timbertech Colors';
    pluralName: 'timbertech';
    singularName: 'timbertech-color';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    altTextSliderImage1: Schema.Attribute.Text;
    altTextSliderImage2: Schema.Attribute.Text;
    altTextSliderImage3: Schema.Attribute.Text;
    classicCollection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    colorBackground: Schema.Attribute.String;
    colorDarkSwitch: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    colorDarkWhiteForSwatches: Schema.Attribute.String;
    colorName: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaImage1: Schema.Attribute.Media<'images'>;
    ctaImage2: Schema.Attribute.Media<'images'>;
    ctaName: Schema.Attribute.Text;
    ctaText: Schema.Attribute.Text;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText1: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText2: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureHeadingText3: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    featureImage1: Schema.Attribute.Media<'images'>;
    featureImage2: Schema.Attribute.Media<'images'>;
    featureImage3: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::timbertech-color.timbertech-color'
    > &
      Schema.Attribute.Private;
    magnoliaCollection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    mainImage: Schema.Attribute.Media<'images'>;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.Text;
    opengraphImage: Schema.Attribute.Media<'images'>;
    opengraphImageUrl2: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    schemaMarkup: Schema.Attribute.Text;
    sliderDetail: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    sliderHeading: Schema.Attribute.Text;
    sliderImage1: Schema.Attribute.Media<'images'>;
    sliderImage2: Schema.Attribute.Media<'images'>;
    sliderImage3: Schema.Attribute.Media<'images'>;
    sliderImage4: Schema.Attribute.Media<'images'>;
    sliderImage5: Schema.Attribute.Media<'images'>;
    sliderImage6: Schema.Attribute.Media<'images'>;
    sliderOverlay: Schema.Attribute.String;
    sliderText: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    subHeading: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoSwitch: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    youtubeLink: Schema.Attribute.String;
  };
}

export interface ApiVideoVideo extends Struct.CollectionTypeSchema {
  collectionName: 'videos';
  info: {
    description: 'Migrated from Webflow collection: Videos';
    displayName: 'Videos';
    pluralName: 'videos';
    singularName: 'video';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    customHtml: Schema.Attribute.Text;
    faqContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::video.video'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    punchLine: Schema.Attribute.Text;
    schemaMarkup: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoCopy: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    videoLink: Schema.Attribute.String;
    videoShortDescription: Schema.Attribute.Text;
    videoThumbnail: Schema.Attribute.Media<'images'>;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::blog-alt-draft.blog-alt-draft': ApiBlogAltDraftBlogAltDraft;
      'api::blog-post.blog-post': ApiBlogPostBlogPost;
      'api::cash-for-land.cash-for-land': ApiCashForLandCashForLand;
      'api::city-local-page.city-local-page': ApiCityLocalPageCityLocalPage;
      'api::clearing-business.clearing-business': ApiClearingBusinessClearingBusiness;
      'api::code-snippet.code-snippet': ApiCodeSnippetCodeSnippet;
      'api::james-hardie-color.james-hardie-color': ApiJamesHardieColorJamesHardieColor;
      'api::landing-page.landing-page': ApiLandingPageLandingPage;
      'api::local-page.local-page': ApiLocalPageLocalPage;
      'api::local-pages-maryland.local-pages-maryland': ApiLocalPagesMarylandLocalPagesMaryland;
      'api::local-pages-virginium.local-pages-virginium': ApiLocalPagesVirginiumLocalPagesVirginium;
      'api::reviewtestimonial.reviewtestimonial': ApiReviewtestimonialReviewtestimonial;
      'api::sale.sale': ApiSaleSale;
      'api::service-area-city.service-area-city': ApiServiceAreaCityServiceAreaCity;
      'api::service-area-county.service-area-county': ApiServiceAreaCountyServiceAreaCounty;
      'api::timbertech-color.timbertech-color': ApiTimbertechColorTimbertechColor;
      'api::video.video': ApiVideoVideo;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
