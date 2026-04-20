/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { XmlNode as XmlNode } from "@webstudio-is/sdk-components-react";


      export const projectId = "e9d26a4a-0234-4db7-a6c3-69260646e3c8";

      export const lastPublished = "2026-04-14T14:53:07.434Z";

      export const siteName = "Capitol Family Exteriors - Roofing, Siding, Windows & Doors";

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
  BlogSitemapData?.data?.data?.carolinaBlog ?? {}
).map(([_key, DynamicItem]: any) => {
  const index_1 = Array.isArray(BlogSitemapData?.data?.data?.carolinaBlog) ? Number(_key) : _key;
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
  LandingPagesSitemapData?.data?.data?.carolinaLp ?? {}
).map(([_key, DynamicItem_1]: any) => {
  const index_2 = Array.isArray(LandingPagesSitemapData?.data?.data?.carolinaLp) ? Number(_key) : _key;
  return (
<Fragment key={index_2}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/lp/${DynamicItem_1?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem_1?.updatedAt}
</XmlNode>
</XmlNode>
</Fragment>
)
})
}
{(LocalPagesSitemapData?.data?.data?.carolinaServices?.length ? true : false) &&
<>
{Object.entries(
  // @ts-ignore
  LocalPagesSitemapData?.data?.data?.carolinaServices ?? {}
).map(([_key, DynamicItem_2]: any) => {
  const index_3 = Array.isArray(LocalPagesSitemapData?.data?.data?.carolinaServices) ? Number(_key) : _key;
  return (
<Fragment key={index_3}>
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
</>
}
{Object.entries(
  // @ts-ignore
  VideosSitemapData?.data?.data?.videos ?? {}
).map(([_key, DynamicItem_3]: any) => {
  const index_4 = Array.isArray(VideosSitemapData?.data?.data?.videos) ? Number(_key) : _key;
  return (
<Fragment key={index_4}>
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
  JHColorsSitemapData?.data?.data?.jamesHardie ?? {}
).map(([_key, DynamicItem_4]: any) => {
  const index_5 = Array.isArray(JHColorsSitemapData?.data?.data?.jamesHardie) ? Number(_key) : _key;
  return (
<Fragment key={index_5}>
<XmlNode
tag={"url"}>
<XmlNode
tag={"loc"}>
{`${system?.origin}/james-hardie-colors/${DynamicItem_4?.slug}`}
</XmlNode>
<XmlNode
tag={"lastmod"}>
{DynamicItem_4?.updatedAt}
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
  const index_6 = Array.isArray(TimbertechColorsSitemapData?.data?.data?.timbertech) ? Number(_key) : _key;
  return (
<Fragment key={index_6}>
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
    