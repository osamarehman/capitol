/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  const action: ResourceRequest = {
    name: "action",
    url: "/forms/api/submit",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
    ],
  }
  const ServiceRecords_1: ResourceRequest = {
    name: "ServiceRecords",
    url: "/api/service-areas",
    searchParams: [
      { name: "pagination[pageSize]", value: "1000" },
      { name: "publicationState", value: "live" },
      { name: "populate[serviceLinks][populate][roofing][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][siding][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][exteriorTrim][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][decks][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][windows][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][gutters][fields][0]", value: "slug" },
      { name: "populate[serviceLinks][populate][doors][fields][0]", value: "slug" },
      { name: "populate[counties]", value: "*" },
    ],
    method: "get",
    headers: [
      { name: "Cache-Control", value: "max-age=3600" },
      { name: "Authorization", value: "Bearer ed9e44b5bc38724cc51ba5714afc310d06296a1e9713e9c1784b070871880894957cd7a9c646525b3604f92ffc9f469f415296c77006d3c1b691c037f2a5d8245a88968f6af5babbb40c7157086cff69807ca8190f3f917736eddcaed374d9ae716f0e05462c8bdc7b5417b70268e427dda4bb148943fac961226c8fabe09cfa" },
    ],
  }
  const _data = new Map<string, ResourceRequest>([
    ["ServiceRecords_1", ServiceRecords_1],
  ])
  const _action = new Map<string, ResourceRequest>([
    ["action", action],
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
    title: "CAPITOL - Windows & Doors | Roofing | Siding of Coastal Carolina",
    description: "Energy-efficient windows & doors, beautiful siding, and coastal strong roofing. Installed by Capitol's Family Owned & Family Run team in Wilmington NC.",
    excludePageFromSearch: false,
    language: undefined,
    socialImageAssetName: "capitol_improvements_hero_img_FZHOqkUiFhymVWEYjJhg4.webp",
    socialImageUrl: undefined,
    status: undefined,
    redirect: undefined,
    custom: [
    ],
  };
};


      type Params = Record<string, string | undefined>;
export const getRemixParams = ({ ...params }: Params): Params => {
  return params
}


      export const contactEmail = "support@improveitcarolina.com";
    