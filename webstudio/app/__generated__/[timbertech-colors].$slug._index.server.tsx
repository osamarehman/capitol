/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
  const TimbertechColorData_1: ResourceRequest = {
    name: "Timbertech Color Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Timbertech($filters: TimbertechColorFiltersInput) {\n  timbertech(filters: $filters) {\n    altTextSliderImage1\n    altTextSliderImage2\n    altTextSliderImage3\n    colorBackground\n    colorDarkSwitch\n    colorDarkWhiteForSwatches\n    colorName\n    ctaImage1 {\n      url\n      alternativeText\n    }\n    ctaImage2 {\n      alternativeText\n      url\n    }\n    ctaName\n    ctaText\n    faqContent\n    featureHeadingText1\n    featureHeadingText2\n    featureHeadingText3\n    featureImage1 {\n      alternativeText\n      url\n    }\n    featureImage2 {\n      alternativeText\n      url\n    }\n    featureImage3 {\n      alternativeText\n      url\n    }\n    mainImage {\n      alternativeText\n      url\n    }\n    metaDescription\n    metaTitle\n    opengraphImage {\n      url\n    }\n    sliderDetail\n    sliderHeading\n    sliderImage1 {\n      alternativeText\n      url\n    }\n    sliderImage2 {\n      alternativeText\n      url\n    }\n    sliderImage3 {\n      alternativeText\n      url\n    }\n    sliderImage4 {\n      alternativeText\n      url\n    }\n    sliderImage5 {\n      alternativeText\n      url\n    }\n    sliderImage6 {\n      alternativeText\n      url\n    }\n    sliderOverlay\n    sliderText\n    slug\n    subHeading\n    title\n    videoSwitch\n    youtubeLink\n  }\n}",
  "variables": {
  "filters": {
    "slug": {
      "eq": system?.params?.slug
    }
  }
},
},
  }
  const TimbertechColorCollection_1: ResourceRequest = {
    name: "Timbertech Color Collection",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Timbertech {\n  timbertech {\n    colorName\n    mainImage {\n      url\n      alternativeText\n    }\n    slug\n  }\n}",
  "variables": {},
},
  }
  const _data = new Map<string, ResourceRequest>([
    ["TimbertechColorData_1", TimbertechColorData_1],
    ["TimbertechColorCollection_1", TimbertechColorCollection_1],
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
  let TimbertechColorData = resources.TimbertechColorData_1
  return {
    title: TimbertechColorData?.data?.data?.timbertech?.[0]?.metaTitle,
    description: TimbertechColorData?.data?.data?.timbertech?.[0]?.metaDescription,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "https://cms.improveitmd.com" + TimbertechColorData?.data?.data?.timbertech?.[0]?.opengraphImage?.url,
    status: TimbertechColorData?.data?.data?.timbertech?.[0]?.title ? 200 : 404,
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
    