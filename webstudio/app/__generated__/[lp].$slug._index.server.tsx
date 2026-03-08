/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
  const LandingPagesData_1: ResourceRequest = {
    name: "Landing Pages Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Lp($filters: LandingPageFiltersInput) {\n  lp(filters: $filters) {\n    title\n    slug\n    schemaMarkup\n    customHtml\n    customContent\n    faqContent\n    subhead\n    header\n    featureText\n    seoTitleTag\n    seoMetaDescription\n    displayRoofingHeroBackgroundVideo\n    backgroundVideoFlatRoofing\n    backgroundVideoDoors\n    heroBackgroundImage {\n      url\n    }\n    footerAddress\n    images3 {\n      url\n    }\n  }\n}",
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
    ["LandingPagesData_1", LandingPagesData_1],
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
  let LandingPagesData = resources.LandingPagesData_1
  return {
    title: LandingPagesData?.data?.data?.lp?.[0]?.title,
    description: LandingPagesData?.data?.data?.lp?.[0]?.seoMetaDescription,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "",
    status: LandingPagesData?.data?.data?.lp?.[0]?.title ? 200 : 404,
    redirect: "",
    custom: [
      {
        property: "title",
        content: "",
      },
    ],
  };
};


      type Params = Record<string, string | undefined>;
export const getRemixParams = ({ ...params }: Params): Params => {
  return params
}


      export const contactEmail = "info@improveitmd.com";
    