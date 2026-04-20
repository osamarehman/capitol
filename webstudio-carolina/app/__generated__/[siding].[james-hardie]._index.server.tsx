/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const JamesHardieColorData_1: ResourceRequest = {
    name: "James Hardie Color Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query JamesHardie($pagination: PaginationArg) {\n  jamesHardie(pagination: $pagination) {\n    colorBackground\n    colorName\n    slug\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 100
  }
},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["JamesHardieColorData_1", JamesHardieColorData_1],
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
    title: "James Hardie Siding Installation in Wilmington NC | CAPITOL Windows & Siding | Roofing | Siding of Wilmington",
    description: "CAPITOL installs James Hardie siding in Wilmington, NC. Durable, coastal-resistant fiber cement siding with HOA approval. Free estimates.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "IMGL6315_2_1_(1)_20B4E2Uz5MkCpM_EfRdBE.png",
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


      export const contactEmail = "support@improveitcarolina.com";
    