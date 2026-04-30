/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
  const BlogsData_1: ResourceRequest = {
    name: "Blogs Data",
    url: "/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query CarolinaBlog($filters: CarolinaBlogPostFiltersInput) {\n  carolinaBlog(filters: $filters) {\n    title\n    slug\n    schemaMarkup\n    publishedDateShown\n    authorTemp\n    postSummary\n    blogImage {\n      url\n    }\n    blogImageAltTag\n    blogSummary\n    calc\n    openGraphImage {\n      url\n    }\n    weatherWidget\n    weatherWidgetLocation\n    weatherWidgetRightParagraphText\n    isCalcCommercial\n  }\n}",
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
    ["BlogsData_1", BlogsData_1],
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
  let BlogsData = resources.BlogsData_1
  return {
    title: BlogsData?.data?.data?.carolinaBlog?.[0]?.title,
    description: BlogsData?.data?.data?.carolinaBlog?.[0]?.postSummary,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "https://improveitcarolina.com" + (BlogsData?.data?.data?.carolinaBlog?.[0]?.openGraphImage?.url || ""),
    status: BlogsData?.data?.data?.carolinaBlog?.[0]?.title ? 200 : 404,
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
    