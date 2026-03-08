/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
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
  "query": "query JamesHardie($filters: JamesHardieColorFiltersInput) {\n  jamesHardie(filters: $filters) {\n    colorName\n    ctaName\n    altTextSliderImage1\n    altTextSliderImage2\n    altTextSliderImage3\n    colorBackground\n    colorDarkSwitch\n    colorDarkWhiteForSwatches\n    ctaImage1 {\n      alternativeText\n      url\n    }\n    ctaImage2 {\n      alternativeText\n      url\n    }\n    ctaText\n    customContent\n    faqContent\n    featureHeadingText1\n    featureHeadingText2\n    featureHeadingText3\n    featureImage1 {\n      alternativeText\n      url\n    }\n    featureImage2 {\n      alternativeText\n      url\n    }\n    featureImage3 {\n      alternativeText\n      url\n    }\n    mainImage {\n      alternativeText\n      url\n    }\n    metaDescription\n    metaTitle\n    opengraphImage {\n      alternativeText\n      url\n    }\n    sliderDetail\n    sliderHeading\n    sliderImage1 {\n      alternativeText\n      url\n    }\n    sliderImage2 {\n      url\n      alternativeText\n    }\n    sliderImage3 {\n      alternativeText\n      url\n    }\n    sliderImage4 {\n      alternativeText\n      url\n    }\n    sliderImage5 {\n      alternativeText\n      url\n    }\n    sliderImage6 {\n      alternativeText\n      url\n    }\n    sliderOverlay\n    sliderText\n    subHeading\n    title\n    youtubeLink\n    videoSwitch\n  }\n}",
  "variables": {
  "filters": {
    "slug": {
      "eq": system?.params?.slug
    }
  }
},
},
  }
  const JamesHardieCollectionData_1: ResourceRequest = {
    name: "James Hardie Collection Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query JamesHardie($pagination: PaginationArg) {\n  jamesHardie(pagination: $pagination) {\n    colorName\n    colorBackground\n    colorDarkWhiteForSwatches\n    slug\n  }\n}",
  "variables": {
  "pagination": {
    "limit": 100
  }
},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["JamesHardieColorData_1", JamesHardieColorData_1],
    ["JamesHardieCollectionData_1", JamesHardieCollectionData_1],
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
  let JamesHardieColorData = resources.JamesHardieColorData_1
  return {
    title: JamesHardieColorData?.data?.data?.jamesHardie?.[0]?.metaTitle,
    description: JamesHardieColorData?.data?.data?.jamesHardie?.[0]?.metaDescription,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "https://cms.improveitmd.com" + JamesHardieColorData?.data?.data?.jamesHardie?.[0]?.opengraphImage?.url,
    status: JamesHardieColorData?.data?.data?.jamesHardie?.[0]?.colorName ? 200 : 404,
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
    