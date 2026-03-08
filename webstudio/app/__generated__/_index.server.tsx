/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  const action: ResourceRequest = {
    name: "action",
    url: "https://forms.improveitmd.com/api/submit",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
    ],
  }
  const _data = new Map<string, ResourceRequest>([
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
    title: "Capitol Improvements | MD, Washington DC, and Virginia | Roofing, Flat Roofing, Siding, Windows, Gutters, Exterior Trim, Decks, Doors",
    description: "Capitol Improvements is Maryland, Washington DC, and Virginia's family owned and family run exterior remodeling company. A roofing company, flat roofer, siding contractor, replacement window contractor, gutter installer, exterior trim contractor, deck builder, and entry door replacement company. ",
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


      export const contactEmail = "info@improveitmd.com";
    