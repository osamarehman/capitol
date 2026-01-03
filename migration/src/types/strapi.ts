// Strapi 5 Types

export interface StrapiSchema {
  kind: 'collectionType' | 'singleType';
  collectionName: string;
  info: {
    singularName: string;
    pluralName: string;
    displayName: string;
    description?: string;
  };
  options: {
    draftAndPublish: boolean;
  };
  pluginOptions?: Record<string, unknown>;
  attributes: Record<string, StrapiAttribute>;
}

export type StrapiAttributeType =
  | 'string'
  | 'text'
  | 'richtext'
  | 'email'
  | 'password'
  | 'integer'
  | 'biginteger'
  | 'float'
  | 'decimal'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'time'
  | 'json'
  | 'enumeration'
  | 'media'
  | 'relation'
  | 'uid'
  | 'component'
  | 'dynamiczone';

export interface StrapiAttribute {
  type: StrapiAttributeType;
  required?: boolean;
  unique?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  default?: unknown;
  private?: boolean;
  configurable?: boolean;
  // Enumeration
  enum?: string[];
  // Media
  multiple?: boolean;
  allowedTypes?: ('images' | 'files' | 'videos' | 'audios')[];
  // Relation
  relation?: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany';
  target?: string;
  inversedBy?: string;
  mappedBy?: string;
  // UID
  targetField?: string;
  // Component
  component?: string;
  repeatable?: boolean;
  // Regex validation
  regex?: string;
}

export interface StrapiEntry {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  [key: string]: unknown;
}

export interface StrapiUploadedFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
}

export interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

export interface AssetMapping {
  localPath: string;
  webflowUrl: string;
  strapiId: number;
  strapiUrl: string;
  alt?: string;
}
