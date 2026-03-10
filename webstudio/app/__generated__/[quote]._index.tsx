/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Form as Form } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Image as Image, HtmlEmbed as HtmlEmbed, Input as Input, Textarea as Textarea } from "@webstudio-is/sdk-components-react";


      export const projectId = "5b897bfc-8b80-4b2a-bfed-79ac7ec37365";

      export const lastPublished = "2026-03-10T15:02:01.614Z";

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
let [formState, set$formState] = useVariableState<any>("initial")
return <Body
className={`w-element cn87dm8 c1uhhf7h`}>
<Box
className={`w-box cnregu4 c3a6wb5 c14dzf92`}>
<HtmlEmbed
code={"<style>\n/* RESET */\n* {\n  margin: 0;\n  scroll-behavior: smooth;\n}\n\n/* Prevent events on closed sheet */\n.viewport-container {\n  pointer-events: none !important;\n}\n.viewport-container .menu-viewport[data-state=\"open\"] {\n  pointer-events: auto !important;\n}\n\n\n/* COLLAPSIBLE ANIMATION  */\n.CollapsibleContent {\n  overflow: hidden;\n}\n.CollapsibleContent[data-state=\"open\"] {\n  animation: collapseSlideDown 300ms ease;\n}\n.CollapsibleContent[data-state=\"closed\"] {\n  animation: collapseSlideUp 300ms ease;\n}\n\n@keyframes collapseSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-collapsible-content-height); }\n}\n\n@keyframes collapseSlideUp {\n  from { height: var(--radix-collapsible-content-height); }\n  to { height: 0; }\n}\n\n\n/* ACCORDION ANIMATION  */\n.AccordionContent {\n  overflow: hidden;\n}\n.AccordionContent[data-state=\"open\"] {\n  animation: accordionSlideDown 300ms ease-out;\n}\n.AccordionContent[data-state=\"closed\"] {\n  animation: accordionSlideUp 300ms ease-out;\n}\n\n@keyframes accordionSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-accordion-content-height); }\n}\n\n@keyframes accordionSlideUp {\n  from { height: var(--radix-accordion-content-height); }\n  to { height: 0; }\n}\n\n/* Accordion Header active state color change */\n.AccordionTrigger {\n  transition: color 250ms ease; /* optional smooth fade */\n}\n\n.AccordionTrigger.Firebrick[data-state=\"open\"] {\n  color: var(--firebrick);\n}\n\n/* Accordion Cross Icon rotate  */\n.CrossIconLine {\n  transform-origin: center;\n  transform: rotate(0deg);\n  transition: transform 250ms ease;\n}\n\n.AccordionCross[data-state=\"open\"] .CrossIconLine {\n  transform: rotate(90deg);\n}\n  \n/* READ MORE TRANSITION   */\n.read-more-content {\n  opacity: 0;\n  max-height: 0;\n  overflow: hidden;\n  transition: opacity 0.3s ease, max-height 0.3s ease;\n}\n\n.read-more-content.is-visible {\n  opacity: 1;\n  max-height: 500px;\n}\n\n /* Collapsible Chevron rotate on open  */\n.CollapsibleChevron {\n  transition: transform 250ms ease;\n}\n\n.CollapsibleTrigger[data-state=\"open\"] .CollapsibleChevron {\n  transform: rotate(180deg);\n}\n\n  /* Responsive Map CSS  */\n.responsive-map {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%; /* 4:3 aspect ratio (480/640 = 0.75) */\n  overflow: hidden;\n}\n\n.responsive-map iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n/* For mobile portrait (smaller screens) */\n@media screen and (max-width: 768px) {\n  .responsive-map {\n    padding-bottom: 100%; /* Make it more square on mobile */\n    margin: 10px 0; /* Add some vertical spacing */\n  }\n}\n\n/* For very small screens */\n@media screen and (max-width: 480px) {\n  .responsive-map {\n    padding-bottom: 120%; /* Taller aspect ratio for very small screens */\n  }\n}\n  \n/* Asphalt Roofing product top row padding removal  */\n@media only screen and (max-width: 1279px) {\n\t.product-top-row {\n\t\tpadding-right: 0rem;\n\t}\n}\n\n  /* Commercial Roofing Paragraph & Grid reveal  */\n.commercial-grid {\n  display: none;\n}\n  \n.commercial-paragraph {\n  display: none;\n}\n\n.commercial-wrapper.is-expanded .commercial-paragraph {\n  display: block;\n}\n  \n.commercial-wrapper.is-expanded .commercial-grid {\n  display: grid;\n} \n  \n.commercial-wrapper.is-expanded .commercial-read-more {\n  display: none;\n}\n  \n@media (max-width: 479px) {\n  .commercial-grid {\n    display: none !important;\n  }\n}\n\n/* class for display:none  */\n.is--hidden {\n  display: none !important;\n  opacity: 0 !important;\n}\n  \n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n  // Fill page_referrer field\n  var pageReferrer = document.referrer || '';\n  var inputField = document.querySelector('input[name=\"page_referrer\"]');\n  \n  if (inputField && pageReferrer) {\n    inputField.value = pageReferrer;\n  }\n  \n  // Auto-redirect after successful submission\n  const form = document.querySelector('form[data-state]');\n  \n  if (!form) return;\n  \n  const observer = new MutationObserver(function(mutations) {\n    mutations.forEach(function(mutation) {\n      if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {\n        if (form.getAttribute('data-state') === 'success') {\n          window.location.href = '/quote-requested';\n          observer.disconnect();\n        }\n      }\n    });\n  });\n  \n  observer.observe(form, { \n    attributes: true,\n    attributeFilter: ['data-state']\n  });\n});\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</Body>
}


      export { Page }
    