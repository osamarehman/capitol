/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { XmlNode as XmlNode } from "@webstudio-is/sdk-components-react";


      export const projectId = "5b897bfc-8b80-4b2a-bfed-79ac7ec37365";

      export const lastPublished = "2026-03-10T14:19:13.937Z";

      export const siteName = "Capitol Improvements";

      export const breakpoints = [{"id":"cAXOgWVeuCB3jDJaSpTIC"},{"id":"ENSxxr83hFXkB2uOvItht","maxWidth":991},{"id":"jRbIM0w-_5xst6S9c2XLZ","maxWidth":767},{"id":"86r6F2Lba-5RnsxO3lS8a","maxWidth":479}];

      export const favIconAsset: string | undefined =
        "64c9668b95320504f7298d3a_logo-fav_K_8rs1tKqjZ0oNR3Mm-J8.png";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        []

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
const system = _props.system;
let StaticSitemap = useResource("StaticSitemap_1")
let BlogSitemapData = useResource("BlogSitemapData_1")
let LandingPagesSitemapData = useResource("LandingPagesSitemapData_1")
let LocalPagesSitemapData = useResource("LocalPagesSitemapData_1")
let VideosSitemapData = useResource("VideosSitemapData_1")
let JHColorsSitemapData = useResource("JHColorsSitemapData_1")
let TimbertechColorsSitemapData = useResource("TimbertechColorsSitemapData_1")
return <XmlNode
tag={"urlset"}
xmlns={"http://www.sitemaps.org/schemas/sitemap/0.9"}>
{Object.entries(
  // @ts-ignore
  StaticSitemap?.data ?? {}
).map(([_key, StaticItem]: any) => {
  const index = Array.isArray(StaticSitemap?.data) ? Number(_key) : _key;
  return (
<Fragment key={index}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{system?.origin + (StaticItem?.path == '/' ? '' : StaticItem?.path)}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{StaticItem?.lastModified}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
{Object.entries(
  // @ts-ignore
  BlogSitemapData?.data?.data?.blog ?? {}
).map(([_key, DynamicItem]: any) => {
  const index_1 = Array.isArray(BlogSitemapData?.data?.data?.blog) ? Number(_key) : _key;
  return (
<Fragment key={index_1}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/blog/${DynamicItem?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem?.updatedAt}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
{Object.entries(
  // @ts-ignore
  LocalPagesSitemapData?.data?.data?.services ?? {}
).map(([_key, DynamicItem_2]: any) => {
  const index_2 = Array.isArray(LocalPagesSitemapData?.data?.data?.services) ? Number(_key) : _key;
  return (
<Fragment key={index_2}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/services/${DynamicItem_2?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem_2?.updatedAt}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
{Object.entries(
  // @ts-ignore
  VideosSitemapData?.data?.data?.videos ?? {}
).map(([_key, DynamicItem_3]: any) => {
  const index_3 = Array.isArray(VideosSitemapData?.data?.data?.videos) ? Number(_key) : _key;
  return (
<Fragment key={index_3}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/videos/${DynamicItem_3?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem_3?.updatedAt}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
{Object.entries(
  // @ts-ignore
  TimbertechColorsSitemapData?.data?.data?.timbertech ?? {}
).map(([_key, DynamicItem_5]: any) => {
  const index_4 = Array.isArray(TimbertechColorsSitemapData?.data?.data?.timbertech) ? Number(_key) : _key;
  return (
<Fragment key={index_4}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/timbertech-colors/${DynamicItem_5?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem_5?.updatedAt}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
</XmlNode>
}


      export { Page }
    