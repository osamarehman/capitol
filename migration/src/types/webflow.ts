// Webflow API Types

export interface WebflowCollection {
  id: string;
  displayName: string;
  singularName: string;
  slug: string;
  fields: WebflowField[];
}

export interface WebflowField {
  id: string;
  type: WebflowFieldType;
  slug: string;
  displayName: string;
  isRequired: boolean;
  isEditable: boolean;
  validations?: Record<string, unknown>;
  metadata?: {
    collectionId?: string;
    options?: Array<{ id: string; name: string }>;
    [key: string]: unknown;
  };
}

export type WebflowFieldType =
  | 'PlainText'
  | 'RichText'
  | 'Number'
  | 'Switch'
  | 'DateTime'
  | 'Date'
  | 'Image'
  | 'MultiImage'
  | 'Video'
  | 'VideoLink'
  | 'File'
  | 'Link'
  | 'Email'
  | 'Phone'
  | 'Color'
  | 'Option'
  | 'Reference'
  | 'MultiReference'
  | 'User';

export interface WebflowItem {
  id: string;
  cmsLocaleId?: string;
  lastPublished?: string;
  lastUpdated?: string;
  createdOn?: string;
  isArchived?: boolean;
  isDraft?: boolean;
  fieldData: Record<string, unknown>;
}

export interface WebflowPagination {
  limit: number;
  offset: number;
  total: number;
}

export interface WebflowAssetInfo {
  url: string;
  filename: string;
  localPath: string;
  fieldSlug: string;
  itemId: string;
  collectionSlug: string;
  alt?: string;
}

export interface ExportResult {
  collectionId: string;
  collectionSlug: string;
  itemCount: number;
  items: WebflowItem[];
}
