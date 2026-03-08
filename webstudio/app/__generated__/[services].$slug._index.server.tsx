/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
export const getResources = (_props: { system: System }) => {
  let AuthorizationKey = "bearer 2f79fba05c22dd06392d641ad9b8dd4feaf5333ac3f42d7b827386176ef0ed9b8c2a40237ab51c91013633e852bc037bfa95a69381dbb50437789bd1147ae920618951af63b747e4dca84f14d968ec051ffeff267ab7177533d9d301398938524013240f4bd4f71f4c4078a3c544ab10dd0ece8503e5fa6c36bcd4be5de0963a"
  const system = _props.system
  const LocalPagesData_1: ResourceRequest = {
    name: "Local Pages Data",
    url: "https://cms.improveitmd.com/graphql",
    searchParams: [
    ],
    method: "post",
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Authorization", value: AuthorizationKey },
    ],
    body: {
  "query": "query Services($filters: LocalPageFiltersInput) {\n  services(filters: $filters) {\n    title\n    serviceType\n    city\n    state\n    seoTitleTag\n    seoMetaDescription\n    h1Hangline\n    headerDescription\n    buttonTextHeaderCta\n    headerVideo\n    recentProjectHangline\n    recentProjectKeywordImage {\n      url\n    }\n    altTextForKeywordImage\n    projectImage1 {\n      url\n    }\n    altTextForProjectImage1\n    projectImage2 {\n      url\n    }\n    altTextForProjectImage2\n    projectImage3 {\n      url\n    }\n    altTextForProjectImage3\n    recentProjectDescription\n    mainStoryRichText\n    secondaryStoryRichText\n    residentialCalcHeader\n    mapSection\n    servicesModal1\n    servicesModalDesc1\n    servicesModal2\n    servicesModalDesc2\n    servicesModal3\n    servicesModalDesc3\n    servicesModal4\n    servicesModalDesc4\n    servicesModal5\n    servicesModalDesc5\n    servicesModal6\n    servicesModalDesc6\n    weatherWidgetLocationText\n    weatherWidgetRightHeader\n    weatherWidgetRightParagraphText\n    projectConsultant1Image {\n      url\n    }\n    projectConsultant2Image {\n      url\n    }\n    projectConsultantName\n    projectConsultantTitle\n    buttonTextConsultantCta\n    mapLocation\n    locationContactDetails\n    communityGuidelinesRichText\n    localReviewHeader\n    reviewText\n    nameOfReviewer\n    googleReviewLink\n    openGraphImageUrl {\n      url\n    }\n    schemaMarkup\n    customHtml\n    customContent\n    residentialCalc\n    weatherWidget\n    whyChooseUsRichText\n    areasWeServeRichText\n    servicesTitleDescription\n    faqsRichText\n    tableRichText\n    serviceType\n    testimonialVideo\n    inspectionRichText\n    galleryMultiImages {\n      url\n    }\n    schemaMarkup\n  }\n}",
  "variables": {
  "filters": {
    "slug": {
      "eq": system?.params?.slug
    }
  }
},
},
  }
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
    ["LocalPagesData_1", LocalPagesData_1],
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
  let LocalPagesData = resources.LocalPagesData_1
  return {
    title: LocalPagesData?.data?.data?.services?.[0]?.seoTitleTag

,
    description: LocalPagesData?.data?.data?.services?.[0]?.seoMetaDescription,
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: undefined,
    socialImageUrl: "https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.openGraphImageUrl?.url,
    status: LocalPagesData?.data?.data?.services?.[0]?.title ? 200 : 404,
    redirect: "",
    custom: [
      {
        property: "og:title",
        content: LocalPagesData?.data?.data?.services?.[0]?.seoTitleTag

,
      },
    ],
  };
};


      type Params = Record<string, string | undefined>;
export const getRemixParams = ({ ...params }: Params): Params => {
  return params
}


      export const contactEmail = "info@improveitmd.com";
    