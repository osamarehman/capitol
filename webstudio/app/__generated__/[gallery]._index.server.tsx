/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  const Gallery_1: ResourceRequest = {
    name: "Gallery",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a" },
    ],
    body: {
  "query": " {\n    galleries {\n      documentId\n      title\n      slug\n      altMain\n      altImg1\n      altImg2\n      altImg3\n      altImg4\n      altImg5\n      altImg6\n      altImg7\n      main {\n        url\n        alternativeText\n        width\n        height\n      }\n      image1 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image2 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image3 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image4 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image5 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image6 {\n        url\n        alternativeText\n        width\n        height\n      }\n      image7 {\n        url\n        alternativeText\n        width\n        height\n      }\n    }\n  }",
  "variables": {},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["Gallery_1", Gallery_1],
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
    title: "Gallery – Exterior Home Remodeling | Capitol Improvements",
    description: "See our local project gallery in Maryland and DC. Capitol Improvements offers Roofs, Siding, Gutters, Windows, Trim, Decks, Patios, and Doors.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "crew_flat-roof_crMXnHGZM8jFDO_2bFwIG.webp",
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
    