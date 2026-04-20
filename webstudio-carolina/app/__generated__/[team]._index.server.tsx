/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const TeamCollectionData_1: ResourceRequest = {
    name: "Team Collection Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query ExampleQuery($filters: OurTeamFiltersInput, $pagination: PaginationArg, $sort: [String]) {\n  ourTeams(filters: $filters, pagination: $pagination, sort: $sort) {\n    title\n    name\n    jobTitle\n    role\n    thumbnail {\n      url\n    }\n    bio\n  }\n}",
  "variables": {
  "filters": {
    "location": {
      "eq": "carolina"
    }
  },
  "pagination": {
    "limit": 500
  },
  "sort": "name",
},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["TeamCollectionData_1", TeamCollectionData_1],
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
    title: "Team – Exterior Home Remodelers | CAPITOL",
    description: "Meet our skilled team at CAPITOL. Family-owned, with a commitment to quality and customer satisfaction. Serving homeowners in North Carolina for 30+ years.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "roof-replacement-gaithersburg-4_iE7ZjmhHfYYjMRKMS_W2O.webp",
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
    