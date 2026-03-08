/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Image as Image, HtmlEmbed as HtmlEmbed } from "@webstudio-is/sdk-components-react";


      export const projectId = "5b897bfc-8b80-4b2a-bfed-79ac7ec37365";

      export const lastPublished = "2026-03-08T02:54:27.839Z";

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
<Box
className={`w-box cnregu4 c3a6wb5 c14dzf92`}>
<HtmlEmbed
code={"<style>\n/* RESET */\n* {\n  margin: 0;\n  scroll-behavior: smooth;\n}\n\n/* Prevent events on closed sheet */\n.viewport-container {\n  pointer-events: none !important;\n}\n.viewport-container .menu-viewport[data-state=\"open\"] {\n  pointer-events: auto !important;\n}\n\n\n/* COLLAPSIBLE ANIMATION  */\n.CollapsibleContent {\n  overflow: hidden;\n}\n.CollapsibleContent[data-state=\"open\"] {\n  animation: collapseSlideDown 300ms ease;\n}\n.CollapsibleContent[data-state=\"closed\"] {\n  animation: collapseSlideUp 300ms ease;\n}\n\n@keyframes collapseSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-collapsible-content-height); }\n}\n\n@keyframes collapseSlideUp {\n  from { height: var(--radix-collapsible-content-height); }\n  to { height: 0; }\n}\n\n\n/* ACCORDION ANIMATION  */\n.AccordionContent {\n  overflow: hidden;\n}\n.AccordionContent[data-state=\"open\"] {\n  animation: accordionSlideDown 300ms ease-out;\n}\n.AccordionContent[data-state=\"closed\"] {\n  animation: accordionSlideUp 300ms ease-out;\n}\n\n@keyframes accordionSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-accordion-content-height); }\n}\n\n@keyframes accordionSlideUp {\n  from { height: var(--radix-accordion-content-height); }\n  to { height: 0; }\n}\n\n/* Accordion Header active state color change */\n.AccordionTrigger {\n  transition: color 250ms ease; /* optional smooth fade */\n}\n\n.AccordionTrigger.Firebrick[data-state=\"open\"] {\n  color: var(--firebrick);\n}\n\n/* Accordion Cross Icon rotate  */\n.CrossIconLine {\n  transform-origin: center;\n  transform: rotate(0deg);\n  transition: transform 250ms ease;\n}\n\n.AccordionCross[data-state=\"open\"] .CrossIconLine {\n  transform: rotate(90deg);\n}\n  \n/* READ MORE TRANSITION   */\n.read-more-content {\n  opacity: 0;\n  max-height: 0;\n  overflow: hidden;\n  transition: opacity 0.3s ease, max-height 0.3s ease;\n}\n\n.read-more-content.is-visible {\n  opacity: 1;\n  max-height: 500px;\n}\n\n /* Collapsible Chevron rotate on open  */\n.CollapsibleChevron {\n  transition: transform 250ms ease;\n}\n\n.CollapsibleTrigger[data-state=\"open\"] .CollapsibleChevron {\n  transform: rotate(180deg);\n}\n\n  /* Responsive Map CSS  */\n.responsive-map {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%; /* 4:3 aspect ratio (480/640 = 0.75) */\n  overflow: hidden;\n}\n\n.responsive-map iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n/* For mobile portrait (smaller screens) */\n@media screen and (max-width: 768px) {\n  .responsive-map {\n    padding-bottom: 100%; /* Make it more square on mobile */\n    margin: 10px 0; /* Add some vertical spacing */\n  }\n}\n\n/* For very small screens */\n@media screen and (max-width: 480px) {\n  .responsive-map {\n    padding-bottom: 120%; /* Taller aspect ratio for very small screens */\n  }\n}\n  \n/* Asphalt Roofing product top row padding removal  */\n@media only screen and (max-width: 1279px) {\n\t.product-top-row {\n\t\tpadding-right: 0rem;\n\t}\n}\n\n  /* Commercial Roofing Paragraph & Grid reveal  */\n.commercial-grid {\n  display: none;\n}\n  \n.commercial-paragraph {\n  display: none;\n}\n\n.commercial-wrapper.is-expanded .commercial-paragraph {\n  display: block;\n}\n  \n.commercial-wrapper.is-expanded .commercial-grid {\n  display: grid;\n} \n  \n.commercial-wrapper.is-expanded .commercial-read-more {\n  display: none;\n}\n  \n@media (max-width: 479px) {\n  .commercial-grid {\n    display: none !important;\n  }\n}\n\n/* class for display:none  */\n.is--hidden {\n  display: none !important;\n  opacity: 0 !important;\n}\n  \n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<Box
tag={"main"}
className={`w-box`}>
<section
className={`w-element cvfl1ur c1numhkq c1diokdk ct0qrmw c1n7qu2 c14bfkzs c2p0cuk c147y3ls c1ph8jf0`}>
<Link
href={"/"}
target={"_self"}
className={`w-element`}>
<Image
loading={"eager"}
src={"/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_893ebd2848.svg"}
width={151}
height={30}
alt={""}
className={`w-image ceghofj c1hwvjgs cdmu5h7 c9slfh6 c1owcyig cnbug7k c1sz7ez0 c1r07he0 c1ue90yj cdof9f0 c1g0t43v ck0fi31 c1k715v cz0r4uk c1fofbrv`} />
</Link>
<div
className={`w-element cfvvllw cjkauba c1epvuph cmhuipo c1sz7ez0 c19wpft8 c189czh1 c5ozyfh cqsaj3r`}>
<Image
loading={"eager"}
src={"/uploads/capitol_improvements_crew_quote_1_G91_YMAG_Cf_Ll_MKH_8_HOX_3_6ab72cf935.webp"}
width={896}
height={1400}
alt={"Tear off photos of a new siding project. "}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
<div
className={`w-element cnwi6s4 c1lq6pq8 cjkauba cz1fvrn c1numhkq c1a06u5s c1diokdk ch3nxmx c1ru6es7 cbnvoex cuhij4v c1xqmr1s c13g3obg`}>
<div
className={`w-element c1numhkq c1a06u5s c10csl85 c6pynps cvfl1ur c1i2t266 c1w4abcz cj1xwpe cpdrg3g cdgwtk4 c1q3szmi c1lzxrwn c135vs31 c147y3ls c2p0cuk c12uktu2 c2tzieg cr1k71u`}>
<h1
className={`w-element c92kv7i c19fqb9a c1cxkcjg c1pjr8f c1lwn44j c1fjww6l c1rjplas c1emvlx`}>
{"We've received your request, thank you!"}
</h1>
<div
className={`w-element c139pwc6 c5zgd1`} />
<p
className={`w-element cn5qs21 c1v90cn6 c12n66pl c1lwn44j c1fjww6l c1rjplas`}>
{"We'll be calling you soon to hear about your project and schedule an in-home appointment."}
{""}
<br />
{""}
{""}
<br />
{""}
{"For immediate assitance call us directly at "}
<Link
href={"tel:3017696909"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"301.769.6909"}
</Link>
</p>
<div
className={`w-element c185jzsb c139pwc6`} />
<div
className={`w-element c139pwc6 c5zgd1`} />
</div>
</div>
</section>
</Box>
</Box>
</Body>
}


      export { Page }
    