/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const StaticSitemap_1: ResourceRequest = {
    name: "Static Sitemap",
    url: "/$resources/sitemap.xml",
    searchParams: [
    ],
    method: "get",
    headers: [
    ],
  }
  const BlogSitemapData_1: ResourceRequest = {
    name: "Blog Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Blog($pagination: PaginationArg) {\n  blog(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const LandingPagesSitemapData_1: ResourceRequest = {
    name: "Landing Pages Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Lp($pagination: PaginationArg) {\n  lp(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const LocalPagesSitemapData_1: ResourceRequest = {
    name: "Local Pages Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Services($pagination: PaginationArg) {\n  services(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const VideosSitemapData_1: ResourceRequest = {
    name: "Videos Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Videos($pagination: PaginationArg) {\n  videos(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const JHColorsSitemapData_1: ResourceRequest = {
    name: "JH Colors Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query JamesHardie($pagination: PaginationArg) {\n  jamesHardie(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const TimbertechColorsSitemapData_1: ResourceRequest = {
    name: "Timbertech Colors Sitemap Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Timbertech($pagination: PaginationArg) {\n  timbertech(pagination: $pagination) {\n    slug\n    updatedAt\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 1000
  }
},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["StaticSitemap_1", StaticSitemap_1],
    ["BlogSitemapData_1", BlogSitemapData_1],
    ["LandingPagesSitemapData_1", LandingPagesSitemapData_1],
    ["LocalPagesSitemapData_1", LocalPagesSitemapData_1],
    ["VideosSitemapData_1", VideosSitemapData_1],
    ["JHColorsSitemapData_1", JHColorsSitemapData_1],
    ["TimbertechColorsSitemapData_1", TimbertechColorsSitemapData_1],
  ])
  const _action = new Map<string, ResourceRequest>([
  ])
  return { data: _data, action: _action }
}


      export const getPageMeta = ({
  system,
  resources,
}: {
  system: System;
  resources: Record<string, any>;
}): PageMeta => {
  return {
    title: "Sitemap",
    description: "",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: undefined,
    status: 200,
    redirect: "",
    custom: [
    ],
  };
};


      type Params = Record<string, string | undefined>;
export const getRemixParams = ({ ...params }: Params): Params => {
  return params
}


      export const contactEmail = "info@improveitmd.com";
    