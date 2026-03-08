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
    title: "About Us | Capitol Improvements Roofing & Siding in MD, Washington DC and Virginia",
    description: "Capitol Improvements is family owned and operated, serving homeowners 30+ years. We provide roofing, flat roofing, siding, windows, gutters, decks & patios, and entry doors to homeowners in Maryland, Washington DC, and Virginia.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "capitol-improvements-team_austin-truck_mEvWMcGcDfBshT0adLNU9.webp",
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
    