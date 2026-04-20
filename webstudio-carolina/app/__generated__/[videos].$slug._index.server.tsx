/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
  const VideosData_1: ResourceRequest = {
    name: "Videos Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Videos($filters: VideoFiltersInput) {\n  videos(filters: $filters) {\n    faqContent\n    videoCopy\n    videoLink\n    videoShortDescription\n    videoThumbnail {\n      url\n      alternativeText\n    }\n    title\n    punchLine\n  }\n}",
  "variables": {
  "filters": {
    "slug": {
      "eq": system?.params?.slug
    }
  }
},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["VideosData_1", VideosData_1],
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
  let VideosData = resources.VideosData_1
  return {
    title: VideosData?.data?.data?.videos?.[0]?.title,
    description: VideosData?.data?.data?.videos?.[0]?.videoShortDescription,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "https://cms.improveitmd.com" + (VideosData?.data?.data?.videos?.[0]?.videoThumbnail?.url || ""),
    status: VideosData?.data?.data?.videos?.[0]?.title ? 200 : 404,
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
    