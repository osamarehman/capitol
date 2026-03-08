/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed } from "@webstudio-is/sdk-components-react";


      export const projectId = "5b897bfc-8b80-4b2a-bfed-79ac7ec37365";

      export const lastPublished = "2026-03-07T22:43:38.864Z";

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
return <Body
className={`w-element`}>
<HtmlEmbed
executeScriptOnCanvas={true}
code={"<style>\n/* ── Pasadena Pins Section ── */\n.pins__section {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  gap: 2.5rem;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n/* Left column – text */\n.pins__content {\n  flex: 1 1 40%;\n  min-width: 0;\n}\n\n.pins__content h2 {\n  margin-top: 0;\n}\n\n/* Right column – map */\n.pins__map-wrapper {\n  flex: 1 1 55%;\n  min-width: 0;\n}\n\n/* Responsive iframe container (keeps 4:3 ratio) */\n.pins__map-embed {\n  position: relative;\n  width: 100%;\n  padding-bottom: 75%;\n  height: 0;\n  overflow: hidden;\n}\n\n.pins__map-embed iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n\n/* ── Mobile only (phones, NOT iPad) ── */\n@media (max-width: 640px) {\n  .pins__section {\n    flex-direction: column;\n  }\n\n  .pins__map-wrapper {\n    width: 100%;\n  }\n}\n  </style>"}
className={`w-html-embed`} />
<div
className={`w-element ${"pins__section"}`}>
<div
className={`w-element ${"pins__content"}`}>
<h2
className={`w-element`}>
{"📍 67+ Pasadena Homeowners Have Trusted Us for Roof Replacements, Expert Guidance, and Honest Recommendations"}
</h2>
<p
className={`w-element`}>
{"Each pin represents a Pasadena homeowner we've served. From waterfront homes in Riviera Beach and Lake Shore to inland neighborhoods like Green Haven and Country Place, we understand Pasadena's diverse home styles. We ensure compliance with HOA and community guidelines, matching architectural character and meeting neighborhood standards for smooth, compliant roof replacements built to last."}
</p>
</div>
<div
className={`w-element ${"pins__map-wrapper"}`}>
<div
className={`w-element ${"pins__map-embed"}`}>
<iframe
src={"https://www.google.com/maps/d/u/0/embed?mid=10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg&ehbc=2E312F&noprof=1&ll=39.126237,-76.510935&z=12"}
width={640}
height={480}
frameborder={"0"}
className={`w-element c1qnw4kb chs0aga c1bhis9c c1wpbnaf`} />
</div>
</div>
</div>
</Body>
}


      export { Page }
    