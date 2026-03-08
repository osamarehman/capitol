/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  const _data = new Map<string, ResourceRequest>([
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
    title: "Locations – Maryland, Washington DC, and Virginia | Capitol Improvements",
    description: "Capitol Improvements provides quality exterior remodeling services in Maryland, Washington DC, and Virginia. Locations in Bowie, Gaithersburg, Crownsville, & Washington, DC. Free estimates.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "capitol_improvements_hero_img_FZHOqkUiFhymVWEYjJhg4.webp",
    socialImageUrl: undefined,
    status: undefined,
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
    