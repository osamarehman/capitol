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
    title: "Roof Cost Estimator | Find Out How Much Your Roof Costs",
    description: "Discover your roofing costs, instantly, with our calculator. As Washington DC and Maryland's leading roofer, we ensure transparent pricing.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "Roofing-Cost-Calculator-How-Much-Does-A-New-Roof-Cost_xlVB3X3uGS3XFa0xqaaWR.png",
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
    