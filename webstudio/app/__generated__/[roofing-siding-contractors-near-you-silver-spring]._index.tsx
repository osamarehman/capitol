/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, Box as Box, Slot as Slot, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text } from "@webstudio-is/sdk-components-react";
import { Link as Link, Link as Link_1, Body as Body } from "@webstudio-is/sdk-components-react-router";
import { NavigationMenu as NavigationMenu, NavigationMenuList as NavigationMenuList, NavigationMenuItem as NavigationMenuItem, NavigationMenuTrigger as NavigationMenuTrigger, NavigationMenuContent as NavigationMenuContent, NavigationMenuViewport as NavigationMenuViewport, Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent } from "@webstudio-is/sdk-components-react-radix";


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
<Slot>
<Fragment_1>
<HtmlEmbed
code={"<style>  \n/* RESET */\n* {\n  margin: 0;\n  scroll-behavior: smooth;\n}\n\n/* Prevent events on closed sheet */\n.viewport-container {\n  pointer-events: none !important;\n}\n.viewport-container .menu-viewport[data-state=\"open\"] {\n  pointer-events: auto !important;\n}\nbody.menu-open {\n  overflow: hidden;\n}\n  \n/* ACCORDION ANIMATION  */\n.AccordionContent {\n  overflow: hidden;\n}\n.AccordionContent[data-state=\"open\"] {\n  animation: accordionSlideDown 300ms ease-out;\n}\n.AccordionContent[data-state=\"closed\"] {\n  animation: accordionSlideUp 300ms ease-out;\n}\n\n@keyframes accordionSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-accordion-content-height); }\n}\n\n@keyframes accordionSlideUp {\n  from { height: var(--radix-accordion-content-height); }\n  to { height: 0; }\n}\n\n/* Accordion Header active state color change */\n.AccordionTrigger {\n  transition: color 250ms ease; /* optional smooth fade */\n}\n\n.AccordionTrigger.Firebrick[data-state=\"open\"] {\n  color: var(--firebrick);\n}\n\n/* Accordion Cross Icon rotate  */\n.CrossIconLine {\n  transform-origin: center;\n  transform: rotate(0deg);\n  transition: transform 250ms ease;\n}\n\n.AccordionCross[data-state=\"open\"] .CrossIconLine {\n  transform: rotate(90deg);\n}\n  \n/* READ MORE TRANSITION   */\n.read-more-content {\n  opacity: 0;\n  max-height: 0;\n  overflow: hidden;\n  transition: opacity 0.3s ease, max-height 0.3s ease;\n}\n\n.read-more-content.is-visible {\n  opacity: 1;\n  max-height: 500px;\n}\n\n  /* Responsive Map CSS  */\n.responsive-map {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%; /* 4:3 aspect ratio (480/640 = 0.75) */\n  overflow: hidden;\n}\n\n.responsive-map iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n/* For mobile portrait (smaller screens) */\n@media screen and (max-width: 768px) {\n  .responsive-map {\n    padding-bottom: 100%; /* Make it more square on mobile */\n    margin: 10px 0; /* Add some vertical spacing */\n  }\n}\n\n/* For very small screens */\n@media screen and (max-width: 480px) {\n  .responsive-map {\n    padding-bottom: 120%; /* Taller aspect ratio for very small screens */\n  }\n}\n  \n/* Asphalt Roofing product top row padding removal  */\n@media only screen and (max-width: 1279px) {\n\t.product-top-row {\n\t\tpadding-right: 0rem;\n\t}\n}\n\n  /* Commercial Roofing Paragraph & Grid reveal  */\n.commercial-grid {\n  display: none;\n}\n  \n.commercial-paragraph {\n  display: none;\n}\n\n.commercial-wrapper.is-expanded .commercial-paragraph {\n  display: block;\n}\n  \n.commercial-wrapper.is-expanded .commercial-grid {\n  display: grid;\n} \n  \n.commercial-wrapper.is-expanded .commercial-read-more {\n  display: none;\n}\n  \n@media (max-width: 479px) {\n  .commercial-grid {\n    display: none !important;\n  }\n}\n\n/* class for display:none  */\n.is--hidden {\n  display: none;\n}\n.is--visible {\n  display: block;\n}\n\na {\n  color: var(--foreground-secondary);\n  text-decoration: none;\n}\n\n.dropdown-list.is-2,\n.dropdown-list.is-3 {\n  height: 0;\n  overflow: hidden;\n  transition: height 0.3s ease;\n}\n\n.nav {\n  contain: layout style;\n  will-change: transform;\n  backface-visibility: hidden;\n}\n  \n/* Menu open state */\nbody.is-nav-open {\n  overflow: hidden;\n}\n\nbody.is-nav-open .nav-menu {\n  display: block !important;\n}\n\nbody.is-nav-open .hamburger-line {\n  display: none !important;\n}\n\nbody.is-nav-open .nav-icon {\n  display: block !important;\n}\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<nav
className={`w-element cuiybni c1epvuph c6hmdm4 cvfl1ur c1qdl0j2 c1di8kq6 c1t1bnxa cu6iurp`}>
<div
className={`w-element cs0io4s`}>
<div
className={`w-element c4vc9qx c9tjkc5 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn c7htweh c15lzzou`}>
<div
className={`w-element c1numhkq c3auquk`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cbwtdxr c2vb7ji`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M13.1168 8.4999V8.5499H13.1668H15.6668H15.7168V8.4999V7.4999V7.4499H15.6668H13.1668H13.1168V7.4999V8.4999ZM13.9703 13.3734L14.0103 13.4031L14.0402 13.3632L14.6402 12.5632L14.6703 12.5231L14.63 12.4931L12.6133 10.9931L12.5734 10.9634L12.5435 11.0032L11.9435 11.8032L11.9134 11.8434L11.9537 11.8734L13.9703 13.3734ZM12.5935 4.9799L12.6236 5.02001L12.6636 4.98982L14.6303 3.50648L14.6701 3.47646L14.6402 3.43656L14.0402 2.63656L14.0101 2.59646L13.9701 2.62665L12.0034 4.10998L11.9636 4.14001L11.9935 4.1799L12.5935 4.9799ZM4.45016 12.6666V12.7166H4.50016H5.50016H5.55016V12.6666V10.0499H6.31965L9.6411 12.0428L9.71683 12.0882V11.9999V3.9999V3.91159L9.6411 3.95702L6.31965 5.9499H3.3335C3.04261 5.9499 2.79374 6.05228 2.58981 6.25621C2.38588 6.46014 2.2835 6.70901 2.2835 6.9999V8.9999C2.2835 9.29079 2.38588 9.53966 2.58981 9.74359C2.79374 9.94751 3.04261 10.0499 3.3335 10.0499H4.45016V12.6666ZM10.2835 10.2332V10.3446L10.3667 10.2706C10.672 9.99926 10.9176 9.66879 11.1036 9.2798C11.2904 8.88926 11.3835 8.46237 11.3835 7.9999C11.3835 7.53743 11.2904 7.11054 11.1036 6.71999C10.9176 6.33101 10.672 6.00054 10.3667 5.72919L10.2835 5.65522V5.76656V10.2332ZM6.62579 8.95696L6.61395 8.9499H6.60016H3.3835V7.0499H6.60016H6.61395L6.62579 7.04283L8.61683 5.85463V10.1452L6.62579 8.95696Z\" fill=\"#00203B\" stroke=\"#575D62\" stroke-width=\"0.1\"/>\n</svg>"}
className={`w-html-embed c18bj3o3 c1lq6pq8 ce6x08i c1numhkq c1diokdk ch3nxmx c1eflpw1 c1utj868 c1atvmzl`} />
<Link
href={"/financing"}
target={"_self"}
className={`w-element c1gbsy9l c1jqias8 c1g3mhtg c82qwqc`}>
{"Offering financing as low as $99/mo"}
</Link>
</div>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cstbpo8 cei1sgf`}>
<Link_1
href={"/about"}
target={"_self"}
className={`w-link c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c1ayp6pz c23qcws cahz6x0 cmchden`}>
{"About"}
</Link_1>
<Link_1
href={"/testimonials"}
target={"_self"}
className={`w-link c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c1ayp6pz c23qcws cahz6x0 cmchden`}>
{"Testimonials"}
</Link_1>
<Link_1
href={"/gallery"}
target={"_self"}
className={`w-link c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c1ayp6pz c23qcws cahz6x0 cmchden`}>
{"Gallery"}
</Link_1>
<Link_1
href={"tel:3017696909"}
className={`w-link c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c1ayp6pz c23qcws cahz6x0 cmchden`}>
{"301.769.6909"}
</Link_1>
</div>
</div>
</div>
</div>
</div>
<div
className={`w-element c9te4zd c1k5oipc c147jfvk c1udh8tp c1k3tb45 ${"banner"}`}>
<div
className={`w-element c4vc9qx c9tjkc5 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn c5zgd1 c11b3qd4`}>
<Link
href={"/"}
target={"_self"}
className={`w-element c1k5oipc`}>
<div
className={`w-element c1osufuw c3sv84c c84c42r`}>
<Image
alt={"Logo Icon"}
src={"https://v2.improveitmd.com/uploads/capitol_improvements_logo_mui4_YFXS_Pv_M_Ej33_G1_Ey_WT_8932b99c78.svg"}
width={18}
height={12}
loading={"eager"}
className={`w-image cqsaj3r c11y8oun ctpsi40 c12l5srj`} />
<Image
src={"https://v2.improveitmd.com/uploads/capitol_improvements_logo_text_Il_Lf_LABIT_im_V1n_R5_Dx_Y3_f89681a688.svg"}
width={161}
height={8}
alt={"Logo Text"}
loading={"eager"}
className={`w-image cqsaj3r cc27qdi c1kebnjt`} />
</div>
</Link>
</div>
</div>
</div>
</nav>
<article
className={`w-element cuiybni c1epvuph cmhuipo c4ily4v c1r07he0 c189czh1 cl3mvj8 cvfl1ur caeqjir ${"nav is--standard"}`}>
<div
className={`w-element c4vc9qx c9tjkc5 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn c5zgd1 c11b3qd4`}>
<div
className={`w-element c1numhkq cqilze0 c1diokdk c3auquk c1r7jime c1hx6vht cfefbyo c1on9zr7 c2bn8b2`}>
<div
className={`w-element c1b5nqsw c1r4uzyb c1osufuw c4ph8p6 c84c42r c1k3tb45 c147jfvk c1s9relc c9te4zd ${"hamburger"}`}>
<div
className={`w-element cyovuht c1tyoc0q c1udh8tp cc6fx65 c1xkesxn covxtq8 c1k5oipc cosr4dw cyii4eg ${"hamburger-line"}`} />
<div
className={`w-element cyovuht c1tyoc0q c1udh8tp cc6fx65 c1xkesxn covxtq8 c1k5oipc cosr4dw cyii4eg ${"hamburger-line"}`} />
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 37 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M16.8029 3.26783L7.33589 12.7142L6.69403 13.3546H7.60076H36.125V16.6454H7.60076H6.693L7.3361 17.286L16.8035 26.7176L14.5325 28.971L0.530912 15L14.5333 1.02828L16.8029 3.26783Z\" fill=\"#00192E\" stroke=\"white\" stroke-width=\"0.75\"/>\n</svg>"}
className={`w-html-embed c1yi6im1 c1iqs9pl c1ja9yy8 cyl62nc c1ofjp3d c1gx6enw c1pmzlxn cs0io4s coxe3ep ${"nav-icon"}`} />
</div>
<div
className={`w-element c1yi6im1 c1iqs9pl c1ja9yy8 cyl62nc c1ofjp3d c1rexjbp c1kqjux0 cnods77 c1yt6hv7 cyovuht c1f2mehc cytrokv chsa5yh c7ubuhh c1qoad8z cs0io4s c140z207 c9te4zd ${"nav-menu"}`}>
<div
className={`w-element cyovuht cyshh4y cytrokv chsa5yh`}>
<Accordion
collapsible={true}
className={`w-accordion c1osufuw c4ph8p6 c14e2i27 cyzinkh c1pzwqin co5hy9p cyovuht cyshh4y`}>
<AccordionItem
data-ws-index="0"
className={`w-item c1unpg90 c1osufuw c4ph8p6 c14e2i27 cyzinkh c274fa8 crkv0em ci6bnwb cpij2xb`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c1imn7p5 c5zgd1 cf7c7lc c11b3qd4 c1pdjbsv c1g3mhtg clmr8fm c1domi2n c1tn4ulv cvvsggu c11rljqw c5d3i40 c1s19qlc cs196t2 cj1pg9y c1n958ae c1m75s0d c1s9relc cbjs37b`}>
<Text
className={`w-text`}>
{"Roofing"}
</Text>
<Box
className={`w-box cx79vvm c1utj868 c1eflpw1 c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au c1osufuw c3sv84c c1y3ergk`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1plv0j c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au c11b3qd4 cyovuht c1784h8b c1s19qlc ${"AccordionContent"}`}>
<div
className={`w-element cmsm1bz cx1xwkj c17jsdkn cyitx8x c1txodcv curgy1m c1hw8x15 c1teo9b4 ct5s339 c1qlkes2 c10kmxzf c1t7cp38 cqybwgu`}>
<Link
href={"/roofing/asphalt-roofing"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Asphalt Shingles"}
</Link>
<Link
href={"/roofing/metal-roofing"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Metal"}
</Link>
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Flat"}
</Link>
<Link
href={"/roofing/commercial-roofing"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Commercial"}
</Link>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Roofing Overview"}
</Link>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item c1unpg90 c1osufuw c4ph8p6 c14e2i27 cyzinkh c274fa8 crkv0em ci6bnwb cpij2xb`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c1imn7p5 c5zgd1 cf7c7lc c11b3qd4 c1pdjbsv c1g3mhtg clmr8fm c1domi2n c1tn4ulv cvvsggu c11rljqw c5d3i40 c1s19qlc cs196t2 cj1pg9y c1n958ae c1m75s0d c1s9relc cbjs37b`}>
<Text
className={`w-text`}>
{"Siding"}
</Text>
<Box
className={`w-box cx79vvm c1utj868 c1eflpw1 c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au c1osufuw c3sv84c c1y3ergk`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1plv0j c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au c11b3qd4 cyovuht c1784h8b c1s19qlc ${"AccordionContent"}`}>
<div
className={`w-element cmsm1bz cx1xwkj c17jsdkn cyitx8x c1txodcv curgy1m c1hw8x15 c1teo9b4 ct5s339 c1qlkes2 c10kmxzf c1t7cp38 cqybwgu`}>
<Link
href={"/siding/james-hardie"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"James Hardie"}
</Link>
<Link
href={"/siding/vinyl"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Vinyl"}
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element c1hwvjgs ckzre88 cj1pg9y cf93ewp c1m75s0d cvp5m4g`}>
{"Siding Overview"}
</Link>
</div>
</AccordionContent>
</AccordionItem>
<Link
href={"/gutters"}
target={"_self"}
className={`w-element c1hwvjgs cs196t2 cj1pg9y c1n958ae c1m75s0d cvp5m4g`}>
{"Gutters"}
</Link>
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element c1hwvjgs cs196t2 cj1pg9y c1n958ae c1m75s0d cvp5m4g`}>
{"Trim"}
</Link>
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element c1hwvjgs cs196t2 cj1pg9y c1n958ae c1m75s0d cvp5m4g`}>
{"Deck & Patios"}
</Link>
<Link
href={"/doors"}
target={"_self"}
className={`w-element c1hwvjgs cs196t2 cj1pg9y c1n958ae c1m75s0d cvp5m4g`}>
{"Doors"}
</Link>
<div
className={`w-element c1osufuw c4ph8p6 c14e2i27 cyzinkh ctakxvy cyovuht c1pzwqin co5hy9p c17bzoun c1uw2td2 cafm2i1 c19mbpcb c1tdossk`}>
<AccordionItem
data-ws-index="2"
className={`w-item c1unpg90 c1osufuw c4ph8p6 c14e2i27 cyzinkh c274fa8 crkv0em ci6bnwb cpij2xb`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c1imn7p5 c5zgd1 cf7c7lc c11b3qd4 c1pdjbsv c1g3mhtg clmr8fm c1domi2n c1tn4ulv cvvsggu c11rljqw c5d3i40 c1s19qlc cd6l4a6 cj1pg9y c1n958ae cmadmrr c1s9relc cbjs37b`}>
<Text
className={`w-text`}>
{"Gallery & Resources"}
</Text>
<Box
className={`w-box cx79vvm c1utj868 c1eflpw1 c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au c1osufuw c3sv84c c1y3ergk c9yxi90 clvvacb`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1plv0j c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au c11b3qd4 cyovuht c1784h8b c1s19qlc ${"AccordionContent"}`}>
<div
className={`w-element cmsm1bz cx1xwkj c17jsdkn cyitx8x c1txodcv curgy1m c1hw8x15 cqfdoz0 c1porcss c1qlkes2 c10kmxzf c1t7cp38 cqybwgu`}>
<Link
href={"/gallery"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Gallery"}
</Link>
<Link
href={"/financing"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Financing"}
</Link>
<Link
href={"/warranty"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Warranty"}
</Link>
<Link
href={"/blog"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Blog"}
</Link>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item c1unpg90 c1osufuw c4ph8p6 c14e2i27 cyzinkh c274fa8 crkv0em ci6bnwb cpij2xb`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c1imn7p5 c5zgd1 cf7c7lc c11b3qd4 c1pdjbsv c1g3mhtg clmr8fm c1domi2n c1tn4ulv cvvsggu c11rljqw c5d3i40 c1s19qlc cd6l4a6 cj1pg9y c1n958ae cmadmrr c1s9relc cbjs37b`}>
<Text
className={`w-text`}>
{"About Us"}
</Text>
<Box
className={`w-box cx79vvm c1utj868 c1eflpw1 c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au c1osufuw c3sv84c c1y3ergk c9yxi90 clvvacb`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1plv0j c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au c11b3qd4 cyovuht c1784h8b c1s19qlc ${"AccordionContent"}`}>
<div
className={`w-element cmsm1bz cx1xwkj c17jsdkn cyitx8x c1txodcv curgy1m c1hw8x15 cqfdoz0 c1porcss c1qlkes2 c10kmxzf c1t7cp38 cqybwgu`}>
<Link
href={"/about"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"About"}
</Link>
<Link
href={"/team"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Team"}
</Link>
<Link
href={"/testimonials"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Testimonials"}
</Link>
<Link
href={"/contact"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Contact"}
</Link>
</div>
</AccordionContent>
</AccordionItem>
<Link
href={"/"}
target={"_self"}
className={`w-element c1hwvjgs cd6l4a6 cj1pg9y cf93ewp cmadmrr cvp5m4g`}>
{"Home"}
</Link>
</div>
</Accordion>
</div>
</div>
<Link
href={"/"}
className={`w-element c1hwvjgs c18bj3o3 c1lq6pq8 c1owcyig cxf38v0 c1epvuph cl3mvj8 cs0io4s`}>
<Image
src={"https://v2.improveitmd.com/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_55ce0081f9.svg"}
width={151}
height={30}
alt={""}
loading={"eager"}
fetchPriority={"high"}
className={`w-image cxf38v0 crv3s27 c1mcsn9a czbu68a cs6j6mk`} />
</Link>
<NavigationMenu
className={`w-navigation-menu c1diokdk ct0qrmw c10lolld c1irdqs7 c1ux94pn cs0io4s`}>
<NavigationMenuList
className={`w-menu-list c1numhkq cnwi6s4 cxte6uv c1owwlzw c1tib7p7 c53aqfr ct0qrmw c10lolld c1irdqs7 c1emsk8a cycldzd`}>
<NavigationMenuItem
data-ws-index="0"
className={`w-menu-item`}>
<NavigationMenuTrigger>
<Button
className={`w-button c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1ryk5rj cjkauba cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
<Text
className={`w-text c1hwvjgs`}>
{"Roofing"}
</Text>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1o5abpq ckmtqrf c1vyxdsx cwhac3e ce2idg c1rpiv5h c1ynqduu`} />
</Button>
</NavigationMenuTrigger>
<NavigationMenuContent
className={`w-menu-content`}>
<div
className={`w-element cvfl1ur`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c1i6fwir c1aj2slg cn87dm8 c1uhhf7h c1nige7o c1txodcv c1t86vhp`}>
<Link
href={"/roofing/asphalt-roofing"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Asphalt Shingles"}
</Link>
<Link
href={"/roofing/metal-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Metal"}
</Link>
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Flat"}
</Link>
<Link
href={"/roofing/commercial-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Commercial"}
</Link>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c4p5z3a ci76nr6 cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
<span
className={`w-element`}>
{"Roofing Overview"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M21.295 12L20.0015 10.8553L24.493 6.83601H0V5.16399H24.493L20.0015 1.15113L21.295 0L28 6L21.295 12Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx ckgpx2x c1bm6nma`} />
</Link>
</div>
</div>
</div>
<div
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4 ${"bg-overlay"}`} />
</NavigationMenuContent>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="1"
className={`w-menu-item`}>
<NavigationMenuTrigger>
<Button
className={`w-button c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km cjkauba cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
<Text
className={`w-text`}>
{"Siding"}
</Text>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1o5abpq ckmtqrf c1vyxdsx cwhac3e ce2idg c1rpiv5h c1ynqduu`} />
</Button>
</NavigationMenuTrigger>
<NavigationMenuContent
className={`w-menu-content`}>
<div
className={`w-element cvfl1ur`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c1i6fwir c1aj2slg cn87dm8 c1uhhf7h c1nige7o c1txodcv c1t86vhp`}>
<Link
href={"/siding/james-hardie"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cowdr5m c1so0jtm cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"James Hardie"}
</Link>
<Link
href={"/siding/vinyl"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cowdr5m c1so0jtm cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Vinyl"}
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c4p5z3a ci76nr6 cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
<span
className={`w-element`}>
{"Siding Overview"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M21.295 12L20.0015 10.8553L24.493 6.83601H0V5.16399H24.493L20.0015 1.15113L21.295 0L28 6L21.295 12Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx ckgpx2x c1bm6nma`} />
</Link>
</div>
</div>
</div>
<div
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4 ${"bg-overlay"}`} />
</NavigationMenuContent>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="2"
className={`w-menu-item`}>
<Link_1
href={"/windows"}
target={"_self"}
className={`w-link c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
{"Windows"}
</Link_1>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="3"
className={`w-menu-item`}>
<Link_1
href={"/gutters"}
target={"_self"}
className={`w-link c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
{"Gutters"}
</Link_1>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="4"
className={`w-menu-item`}>
<Link_1
href={"/exterior-trim"}
target={"_self"}
className={`w-link c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
{"Trim"}
</Link_1>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="5"
className={`w-menu-item`}>
<Link_1
href={"/decks-and-patios"}
target={"_self"}
className={`w-link c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
{"Deck & Patios"}
</Link_1>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="6"
className={`w-menu-item`}>
<Link_1
href={"/doors"}
target={"_self"}
className={`w-link c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
{"Doors"}
</Link_1>
</NavigationMenuItem>
</NavigationMenuList>
<Box
className={`w-box cnbug7k cp1dmkc c137qtrl c1numhkq ch3nxmx cwpwdsd c1n7qu2 c15yzrzw cn87dm8 c1uhhf7h ${"viewport-container"}`}>
<NavigationMenuViewport
className={`w-menu-viewport c1epvuph c1n7qu2 cwpwdsd c15yzrzw ${"menu-viewport"}`} />
</Box>
</NavigationMenu>
<div
className={`w-element c1numhkq c53aqfr ct0qrmw cfcahn6 c1hx6vht c1epvuph c6hmdm4 c1jn3g1o crrgqm2 c1k3tb45 c147jfvk`}>
<Link_1
href={"tel:3017696909"}
className={`w-link c1lvj0n c19ftcvs c1vqewwo cacmu18 c9te4zd c1u81kxm c1v2l8nt c53aqfr ct0qrmw c1lzjd2w cn7k83s c1d8rs8t cwr9gsc c1ehmfnq c1owcyig c1ryk5rj csubbc2 ccmxen3 c1obobqc c1wygun7 c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c8d36da cv3rgxc cahz6x0 cmchden c1amh7xl cimel00 c1b6be7c c1842oze c12uktu2 c15gxmz4 c1up450v c1ka8hwj c1plys2 ckkl2uw cchbu1a c1lgs1h6 c1osufuw`}>
<Image
src={"https://v2.improveitmd.com/uploads/phone_Nyqk_H_Sgvv_W_Cea_Yy_ZS_Zru_3ebca2ee02.svg"}
width={16}
height={16}
alt={"Phone icon"}
loading={"eager"}
className={`w-image c1rpiv5h c1ynqduu`} />
</Link_1>
<Link_1
href={"/quote"}
target={"_self"}
className={`w-link cekr8vl cyzpk7y cm1pdbc cacmu18 crv3s27 c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w c1g3mhtg c1ayp6pz c1ojdguz cy8kgz2 c1owcyig c1ryk5rj csubbc2 ccmxen3 c1obobqc c1wygun7 c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c8d36da c1s8fcmc c1p4xat6 c7mkn1n cahz6x0 cmchden cxelgob cimel00 c805dql cdubd0c c5wc26g c4egqsl c12uktu2 c15gxmz4 c1up450v c1ka8hwj c1plys2 c14u3pz9 c1kw2xmj c15i5s1m c18iqfv2`}>
{"Get Free Quote"}
</Link_1>
</div>
<div
className={`w-element c139pwc6 cw6436c cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 cl3mvj8 cq7peu4`} />
</div>
</div>
</div>
</article>
<nav
className={`w-element c1g1r0no cvfl1ur c139pwc6 c1jjyqa4 cvvhtep c8fjv4x c116lgfv cp2pdtk c1vse6xq c1cukx3 c3su6au c10ukf2h c1lenlhl c1rp6s1w csvveix cjvrt4 caeqjir cs0io4s ${"nav is--sticky"}`}>
<div
className={`w-element c4vc9qx c9tjkc5 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn c5zgd1 c11b3qd4`}>
<div
className={`w-element c1numhkq cqilze0 c1diokdk c3auquk c1r7jime c1hx6vht cfefbyo c1on9zr7 c2bn8b2`}>
<Link
href={"/"}
className={`w-element c1hwvjgs c18bj3o3 c1lq6pq8 c1owcyig cxf38v0 c1epvuph cl3mvj8 cs0io4s`}>
<Image
src={"https://v2.improveitmd.com/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_55ce0081f9.svg"}
width={151}
height={30}
alt={"Logo"}
loading={"eager"}
className={`w-image cxf38v0 crv3s27 c1mcsn9a czbu68a cs6j6mk`} />
</Link>
<NavigationMenu
className={`w-navigation-menu c1diokdk ct0qrmw c10lolld c1irdqs7 c1ux94pn cs0io4s`}>
<NavigationMenuList
className={`w-menu-list c1numhkq cnwi6s4 cxte6uv c1owwlzw c1tib7p7 c53aqfr ct0qrmw c10lolld c1irdqs7 c1emsk8a cycldzd`}>
<NavigationMenuItem
data-ws-index="0"
className={`w-menu-item`}>
<NavigationMenuTrigger>
<Button
className={`w-button c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1ryk5rj cjkauba cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
<Text
className={`w-text c1hwvjgs`}>
{"Services"}
</Text>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1o5abpq ckmtqrf c1vyxdsx cwhac3e ce2idg c1rpiv5h c1ynqduu`} />
</Button>
</NavigationMenuTrigger>
<NavigationMenuContent
className={`w-menu-content`}>
<div
className={`w-element cvfl1ur cn87dm8 c1uhhf7h`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cvfl1ur c1nige7o`}>
<div
className={`w-element`}>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c1i6fwir c1aj2slg cn87dm8 c1uhhf7h c60ws42 c1r2737e cgtmmxo c1cukx3 c3su6au c1txodcv c1t86vhp ${"dropdown-list is-1"}`}>
<div
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2 ${"plus-link is-2"}`}>
<span
className={`w-element cauq8n4`}>
{"Roofing"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7 3.82481e-08L7 14\" stroke=\"black\" stroke-width=\"2\"/>\n<line x1=\"14\" y1=\"7.125\" x2=\"-7.64949e-08\" y2=\"7.125\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1nu7j0d c1bm6nma c1diokdk ch3nxmx`} />
</div>
<div
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2 ${"plus-link is-3"}`}>
<span
className={`w-element cauq8n4`}>
{"Siding"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7 3.82481e-08L7 14\" stroke=\"black\" stroke-width=\"2\"/>\n<line x1=\"14\" y1=\"7.125\" x2=\"-7.64949e-08\" y2=\"7.125\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1nu7j0d c1bm6nma c1diokdk ch3nxmx`} />
</div>
<Link
href={"/windows"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Windows"}
</Link>
<Link
href={"/gutters"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Gutters"}
</Link>
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Trim"}
</Link>
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Decks & Patios"}
</Link>
<Link
href={"/doors"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Doors"}
</Link>
</div>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c1i6fwir c1aj2slg cn87dm8 c1uhhf7h c60ws42 c1r2737e cgtmmxo c1cukx3 c3su6au c1txodcv c1t86vhp ${"dropdown-list is-2"}`}>
<div
className={`w-element c11b3qd4 c1numhkq c1diokdk ct0qrmw c1g3mhtg c1d8rs8t chxc8gf cspait9 c4p5z3a ci76nr6 coq26t5 c2rpov5 chpt3u ca3fvi7`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n c1603wqb chxc8gf c1d7h9xn ${"back-link is-1"}`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.70496 0.500002L7.99852 1.6447L3.50699 5.66399L28 5.66399L28 7.33601L3.50699 7.33601L7.99852 11.3489L6.70496 12.5L1.38281e-06 6.5L6.70496 0.500002Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx c1nu7j0d c1bm6nma cauq8n4`} />
<p
className={`w-element cauq8n4`}>
{"All services"}
</p>
</div>
</div>
<Link
href={"/roofing/asphalt-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Asphalt Roofing"}
</Link>
<Link
href={"/roofing/metal-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Metal Roofing"}
</Link>
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Flat Roofing"}
</Link>
<Link
href={"/roofing/commercial-roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Commercial Roofing"}
</Link>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c4p5z3a ci76nr6 cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
<span
className={`w-element`}>
{"Roofing Overview"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M21.295 12L20.0015 10.8553L24.493 6.83601H0V5.16399H24.493L20.0015 1.15113L21.295 0L28 6L21.295 12Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1nu7j0d c1bm6nma c1diokdk ch3nxmx`} />
</Link>
</div>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c1i6fwir c1aj2slg cn87dm8 c1uhhf7h c60ws42 c1r2737e cgtmmxo c1cukx3 c3su6au c1txodcv c1t86vhp ${"dropdown-list is-3"}`}>
<div
className={`w-element c11b3qd4 c1numhkq c1diokdk ct0qrmw c1g3mhtg c1d8rs8t chxc8gf cspait9 c4p5z3a ci76nr6 coq26t5 c2rpov5 chpt3u ca3fvi7`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n c1603wqb chxc8gf c1d7h9xn ${"back-link is-2"}`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.70496 0.500002L7.99852 1.6447L3.50699 5.66399L28 5.66399L28 7.33601L3.50699 7.33601L7.99852 11.3489L6.70496 12.5L1.38281e-06 6.5L6.70496 0.500002Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx c1nu7j0d c1bm6nma cauq8n4`} />
<p
className={`w-element cauq8n4`}>
{"All services"}
</p>
</div>
</div>
<Link
href={"/siding/james-hardie"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cowdr5m c1so0jtm cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"James Hardie Siding"}
</Link>
<Link
href={"/siding/vinyl"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cowdr5m c1so0jtm cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Vinyl Siding"}
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c4p5z3a ci76nr6 cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
<span
className={`w-element`}>
{"Siding Overview"}
</span>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 28 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M21.295 12L20.0015 10.8553L24.493 6.83601H0V5.16399H24.493L20.0015 1.15113L21.295 0L28 6L21.295 12Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed c1numhkq c1nu7j0d c1bm6nma c1diokdk ch3nxmx`} />
</Link>
</div>
</div>
</div>
</div>
</div>
<div
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4`} />
</NavigationMenuContent>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="1"
className={`w-menu-item`}>
<NavigationMenuTrigger>
<Button
className={`w-button c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km cjkauba cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
<Text
className={`w-text`}>
{"About"}
</Text>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1o5abpq ckmtqrf c1vyxdsx cwhac3e ce2idg c1rpiv5h c1ynqduu`} />
</Button>
</NavigationMenuTrigger>
<NavigationMenuContent
className={`w-menu-content`}>
<div
className={`w-element cvfl1ur`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cvfl1ur c1nige7o`}>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c13gen24 cn87dm8 c1uhhf7h c1txodcv c1t86vhp`}>
<Link
href={"/about"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"About"}
</Link>
<Link
href={"/team"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Team"}
</Link>
<Link
href={"/testimonials"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Testimonials"}
</Link>
</div>
</div>
</div>
</div>
<div
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4`} />
</NavigationMenuContent>
</NavigationMenuItem>
<NavigationMenuItem
data-ws-index="2"
className={`w-menu-item`}>
<NavigationMenuTrigger>
<Button
className={`w-button c82qwqc c1numhkq cacmu18 c1g3mhtg c1diokdk ct0qrmw ciffqr1 csd3qkx c1ehmfnq cwr9gsc c15ai560 c1ch8bq c1epvuph cl3mvj8 c1s8fcmc c52c9e5 c1hano35 c1z0avtf c1dih41b c1rgg99s cgtmmxo c1cukx3 c1r2737e c3su6au c1d7h9xn c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km cjkauba cahz6x0 cmchden cxzxhbd cwwh2w3 cs196t2 cj1pg9y c1m75s0d c1g6i14v`}>
<Text
className={`w-text`}>
{"Gallery & Resources"}
</Text>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 3.5L5 7.5L9 3.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed c1o5abpq ckmtqrf c1vyxdsx cwhac3e ce2idg c1rpiv5h c1ynqduu`} />
</Button>
</NavigationMenuTrigger>
<NavigationMenuContent
className={`w-menu-content`}>
<div
className={`w-element cvfl1ur`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cvfl1ur c1nige7o`}>
<div
className={`w-element cmsm1bz cstbpo8 cei1sgf c13gen24 cn87dm8 c1uhhf7h c1txodcv c1t86vhp`}>
<Link
href={"/gallery"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Gallery"}
</Link>
<Link
href={"/financing"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Financing"}
</Link>
<Link
href={"/warranty"}
target={"_self"}
className={`w-element chxc8gf c1numhkq cacmu18 c1g3mhtg c1diokdk c3auquk cfcahn6 c1hx6vht c139pwc6 c1d8rs8t c1b2b7rn cspait9 c52c9e5 c1hano35 c1z0avtf c1dih41b c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au cgrnuxo cepejyx cahz6x0 cmchden c17g1svm cv0jsgj c23isvc c95n8c2`}>
{"Warranty"}
</Link>
</div>
</div>
</div>
</div>
<div
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4`} />
</NavigationMenuContent>
</NavigationMenuItem>
</NavigationMenuList>
<Box
className={`w-box cnbug7k cp1dmkc c137qtrl c1numhkq ch3nxmx cwpwdsd c1n7qu2 c15yzrzw cn87dm8 c1uhhf7h ${"viewport-container"}`}>
<NavigationMenuViewport
className={`w-menu-viewport c1epvuph c1n7qu2 cwpwdsd c15yzrzw c1vw8sg2 c1rp6s1w c1j9ucwl cjvrt4 ${"menu-viewport"}`} />
</Box>
</NavigationMenu>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1j3nit7 c1s88tz3 c1epvuph c6hmdm4 c1jn3g1o crrgqm2 c1k3tb45 c147jfvk`}>
<Link_1
href={"tel:3017696909"}
target={"_blank"}
className={`w-link crv3s27 c82qwqc ch7xx7z cacmu18 c1jhz2vv`}>
{"301.769.6909"}
</Link_1>
<Link_1
href={"/quote"}
target={"_self"}
className={`w-link cekr8vl cyzpk7y cm1pdbc cacmu18 crv3s27 c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w c1g3mhtg c1ayp6pz c1ojdguz cy8kgz2 c1owcyig c1ryk5rj csubbc2 ccmxen3 c1obobqc c1wygun7 c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c8d36da c1s8fcmc c1p4xat6 c7mkn1n cahz6x0 cmchden cxelgob cimel00 c805dql cdubd0c c5wc26g c4egqsl c12uktu2 c15gxmz4 c1up450v c1ka8hwj c1plys2 c14u3pz9 c1kw2xmj c15i5s1m c18iqfv2`}>
{"Get Free Quote"}
</Link_1>
</div>
</div>
</div>
</div>
</nav>
<HtmlEmbed
code={"<script type=\"module\">\nconst observer = new MutationObserver(() => {\n  const isMenuOpen = !!document.querySelector('.menu-viewport');\n  document.body.classList.toggle('menu-open', isMenuOpen);\n});\n\nobserver.observe(document.body, {\n  childList: true,\n  subtree: true\n});\n</script>\n<script type=\"module\">\ntry {\n  if (window.innerWidth >= 991) {\n    const standardNav = document.querySelector(\".nav.is--standard\");\n    const stickyNav = document.querySelector(\".nav.is--sticky\");\n\n    if (!standardNav || !stickyNav) throw new Error(\"Standard or Sticky navigation elements not found.\");\n\n    stickyNav.style.position = 'fixed';\n    stickyNav.style.top = '0';\n    stickyNav.style.left = '0';\n    stickyNav.style.right = '0';\n    stickyNav.style.willChange = 'transform';\n    stickyNav.style.transition = 'transform 0.3s ease-out';\n    stickyNav.style.transform = 'translateY(-101%)';\n    stickyNav.style.WebkitTransform = 'translateY(-101%)';\n\n    const switchPoint = 150;\n    let lastScrollPosition = window.scrollY;\n    let ticking = false;\n\n    function applyNavState() {\n      const currentScrollPosition = window.scrollY;\n\n      if (Math.abs(currentScrollPosition - lastScrollPosition) > 5 || currentScrollPosition === 0) {\n        if (currentScrollPosition > switchPoint) {\n          standardNav.style.visibility = 'hidden';\n          stickyNav.style.pointerEvents = 'auto';\n          requestAnimationFrame(() => {\n            stickyNav.style.transform = 'translateY(0%)';\n            stickyNav.style.WebkitTransform = 'translateY(0%)';\n          });\n        } else {\n          standardNav.style.visibility = 'visible';\n          stickyNav.style.pointerEvents = 'none';\n          requestAnimationFrame(() => {\n            stickyNav.style.transform = 'translateY(-101%)';\n            stickyNav.style.WebkitTransform = 'translateY(-101%)';\n          });\n        }\n        lastScrollPosition = currentScrollPosition;\n      }\n      ticking = false;\n    }\n\n    function setNavState() {\n      applyNavState();\n    }\n\n    window.addEventListener(\"scroll\", () => {\n      if (!ticking) {\n        requestAnimationFrame(applyNavState);\n        ticking = true;\n      }\n    }, { passive: true });\n\n    document.body.addEventListener(\"click\", () => {\n      requestAnimationFrame(setNavState);\n    });\n\n    let resizeTimeout;\n    window.addEventListener('resize', () => {\n      clearTimeout(resizeTimeout);\n      resizeTimeout = setTimeout(() => {\n        if (window.innerWidth < 991) {\n          standardNav.style.visibility = 'visible';\n          stickyNav.style.transform = 'translateY(-101%)';\n          stickyNav.style.WebkitTransform = 'translateY(-101%)';\n        }\n      }, 250);\n    }, { passive: true });\n  }\n} catch (error) {\n  console.error(error.message);\n}\n</script>\n<script type=\"module\">\ndocument.body.addEventListener('click', (e) => {\n  if (e.target.matches('.plus-link.is-2')) {\n    const mainList = document.querySelector('.dropdown-list.is-1');\n    const subList2 = document.querySelector('.dropdown-list.is-2');\n    if (!mainList || !subList2) return;\n    mainList.style.height = '0';\n    mainList.style.overflow = 'hidden';\n    subList2.style.height = subList2.scrollHeight + 'px';\n    subList2.style.overflow = 'visible';\n  }\n\n  if (e.target.matches('.plus-link.is-3')) {\n    const mainList = document.querySelector('.dropdown-list.is-1');\n    const subList3 = document.querySelector('.dropdown-list.is-3');\n    if (!mainList || !subList3) return;\n    mainList.style.height = '0';\n    mainList.style.overflow = 'hidden';\n    subList3.style.height = subList3.scrollHeight + 'px';\n    subList3.style.overflow = 'visible';\n  }\n\n  if (e.target.matches('.back-link.is-1')) {\n    const mainList = document.querySelector('.dropdown-list.is-1');\n    const subList2 = document.querySelector('.dropdown-list.is-2');\n    if (!mainList || !subList2) return;\n    subList2.style.height = '0';\n    subList2.style.overflow = 'hidden';\n    mainList.style.height = mainList.scrollHeight + 'px';\n    mainList.style.overflow = 'visible';\n  }\n\n  if (e.target.matches('.back-link.is-2')) {\n    const mainList = document.querySelector('.dropdown-list.is-1');\n    const subList3 = document.querySelector('.dropdown-list.is-3');\n    if (!mainList || !subList3) return;\n    subList3.style.height = '0';\n    subList3.style.overflow = 'hidden';\n    mainList.style.height = mainList.scrollHeight + 'px';\n    mainList.style.overflow = 'visible';\n  }\n});\n</script>\n\n<!-- 4. Hamburger + custom menu -->\n<script type=\"module\">\ndocument.addEventListener('click', (e) => {\n  const backIcon = e.target.closest('.nav-icon');\n  const hamburger = e.target.closest('.hamburger');\n\n  if (backIcon && document.body.classList.contains('is-nav-open')) {\n    document.body.classList.remove('is-nav-open');\n    return;\n  }\n\n  if (hamburger && !document.body.classList.contains('is-nav-open')) {\n    document.body.classList.add('is-nav-open');\n    return;\n  }\n});\n  document.addEventListener('mouseover', (e) => {\n  if (e.target.closest('.bg-overlay')) {\n    document.body.classList.remove('is-nav-open');\n  }\n});\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Fragment_1>
</Slot>
<Box
tag={"main"}
className={`w-box c1cgr5pa`}>
<section
className={`w-element cvfl1ur c1n33w2v c9u7chh casavvd clrop1m`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c5ftqtp c1ux94pn c139pwc6 c1acxxi0`}>
<div
className={`w-element c1numhkq c3auquk c1nqn1pw cvbnc8e c4ph8p6`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17crvds c1czy0yv c3u8caf c12qh1s1`}>
<h1
className={`w-element c1q4209f c19fqb9a c1pjr8f coiaw8t cl197ma`}>
{"Roofing & Siding Contractors in Silver Spring, MD Near You."}
</h1>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We'll get the job done right."}
{""}
<br />
{""}
{""}
<br />
{""}
{"We're exterior home remodeling professionals providing quality products, expert installation, and lifetime manufacturer backed warranties. All for a fair price."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Each home in Silver Spring, MD will have different characteristics and technical challenges depending on the age of construction."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Rest assured, we have been serving homeowners in Montgomery County, MD for over 30+ years by replacing "}
<Link
href={"/roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roofs"}
</Link>
{", "}
<Link
href={"/siding"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"siding"}
</Link>
{", "}
<Link
href={"/windows"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"windows"}
</Link>
{", "}
<Link
href={"/gutters"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"gutters"}
</Link>
{", "}
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"exterior trim"}
</Link>
{", "}
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"decks"}
</Link>
{", "}
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"patios"}
</Link>
{", and "}
<Link
href={"/doors"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"doors"}
</Link>
{"."}
</p>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{"Get a free quote"}
</Link>
</div>
<div
className={`w-element cssmshv cxwe9q8 c12qh1s1`}>
<Image
src={"https://v2.improveitmd.com/uploads/home_reviews_section_img_MZ_8_H2_Bc6yj_Fnyhr96_Mf_GR_a5851b4e29.webp"}
width={960}
height={1490}
alt={"Installing new siding on ladder."}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba cxwe9q8 c1ys3o5i cfb7av6`} />
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element cvfl1ur c1n33w2v c9u7chh casavvd clrop1m`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c5ftqtp c1ux94pn c139pwc6 c1acxxi0`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk co72if5 c4ph8p6 c119v29c c13d76g4`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1pvb9sj cd6izue c1j3nit7 c1s88tz3 cyovuht c13g3obg c1br65qh`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Services we offer near Silver Spring MD"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We offer our full line of services to families in Silver Spring MD, providing replacement services for "}
<Link
href={"/roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roofs"}
</Link>
{", "}
<Link
href={"/siding"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"siding"}
</Link>
{", "}
<Link
href={"/windows"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"windows"}
</Link>
{", "}
<Link
href={"/gutters"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"gutters"}
</Link>
{", "}
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"exterior trim"}
</Link>
{", "}
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"decks"}
</Link>
{", "}
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"patios"}
</Link>
{", and "}
<Link
href={"/doors"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"doors"}
</Link>
{"."}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1irdqs7 c1sy8hn1 c139pwc6 czbu68a c5d3i40`}>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Roofing"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Siding"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/windows"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Windows"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/gutters"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Gutters & Guards"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Exterior Trim"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Decks & Patios"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/doors"}
target={"_self"}
className={`w-element c1numhkq c1diokdk c3auquk c1hgk76z c1g3mhtg c309ipl cacmu18 c82qwqc c1d7h9xn cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au c1eu6l07 ctjj4no cbtevxf c1ju8duk cml7cty`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l`}>
{"Doors"}
</p>
<HtmlEmbed
code={"<svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
</div>
</div>
</div>
<div
className={`w-element c4vc9qx c9tjkc5 c876kpt cw6z3e9 c7iyr7r cmpwmbp csaxcaf c1n30c32 c7uvk8q cwsled4`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cb7wkl5 c1numhkq c3auquk co72if5 c18fd4vt c9tjkc5 c4ph8p6 c119v29c c13d76g4 c1lzxrwn c135vs31`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Roofing_in_Silver_Spring_Maryland_y_Ij6_M22k_MF_Te_C2_Wq_Qo_SLV_9793d04ef4.webp"}
width={1200}
height={630}
alt={"Roofing in Silver Spring Maryland"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Roofing Installation Services"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Fast and professional roofing services for Silver Spring. We provide fast roofing solutions to protect your home or business in Silver Spring, Maryland. From quick repairs and full roof replacements to new installations and gutter services, our team ensures durable, high-quality results. Licensed and insured, we specialize in addressing your roofing needs with expert care and premium materials. Whether you’re dealing with storm damage or planning a new project, we’re here to help."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Siding_Contractors_in_Silver_Spring_Maryland_CY_Gy_Eq_Cvu_ad_N_Xy6eub_Xs_1712192c04.webp"}
width={1200}
height={630}
alt={"Silver Spring Maryland Siding Replacement Contractor"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Siding Replacement Services"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Refresh and protect your home with our professional siding replacement services. We offer durable, high-quality materials in a variety of styles and colors to enhance your home’s appearance and energy efficiency. Our skilled team ensures a seamless installation process, giving your property a fresh, polished look that lasts. Contact us today for a free estimate!"}
</p>
</div>
</div>
</div>
</div>
</div>
<div
className={`w-element c4vc9qx c9tjkc5 c876kpt cw6z3e9 c7iyr7r cmpwmbp csaxcaf c1n30c32 c7uvk8q cwsled4`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cb7wkl5 c1numhkq c3auquk co72if5 c18fd4vt c9tjkc5 c4ph8p6 c119v29c c13d76g4 c1lzxrwn c135vs31`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Window_Replacement_in_Silver_Spring_MD_JS_9s6ykk_Ur_D_Xym_LU_0_Cu_T_4de4d41c72.webp"}
width={1200}
height={630}
alt={"Window Replacement in Silver Spring MD"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Replacement Window Services in Silver Spring."}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Upgrade your home with our energy-efficient window replacement services. Our window installations are only high-performance windows designed to reduce energy costs while enhancing your home's comfort and style. With a range of modern designs and durable materials, our expert team ensures a flawless installation that boosts curb appeal and efficiency."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Seamless_Gutters_in_Silver_Spring_Maryland_o1_BBB_Hc_TLAAD_Uj8xhu_mb_308d749e65.webp"}
width={1200}
height={630}
alt={"Seamless Gutters in Silver Spring Maryland"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Seamless Gutters and Gutter Cover Installation Services"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Protect your home from water damage with our seamless gutter installation services. Installation of custom-fit gutters that provide efficient drainage and a sleek, polished look. Built for durability and low maintenance, our seamless gutters help safeguard your foundation, roof, and landscaping. Contact us today for a free estimate!"}
</p>
</div>
</div>
</div>
</div>
</div>
<div
className={`w-element c4vc9qx c9tjkc5 c876kpt cw6z3e9 c7iyr7r cmpwmbp csaxcaf c1n30c32 c7uvk8q cwsled4`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cb7wkl5 c1numhkq c3auquk co72if5 c18fd4vt c9tjkc5 c4ph8p6 c119v29c c13d76g4 c1lzxrwn c135vs31`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Deck_Builders_Silver_Spring_Maryland_d0_Q5_A9r27m_Ohxq_MO_MQ_31_9ad02b4a6e.webp"}
width={1200}
height={630}
alt={"Deck Builders Silver Spring Maryland"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Composite Deck Building Services"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Transform your outdoor space with our professional deck installation services in Silver Spring, Maryland. Creating custom decks that blend functionality and style, using high-quality materials to ensure durability and beauty. Whether you envision a cozy retreat or a spacious area for entertaining, our skilled team brings your vision to life. Contact us today for a free consultation!"}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Front_Door_Replacement_in_Silver_Spring_Maryland_lv_Id_Icn_V_Ydm_G_y_T8h_Z_ic_5324a8e645.webp"}
width={1200}
height={630}
alt={"Front Door Replacement in Silver Spring Maryland"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Front Door Installation Services"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Upgrade your home’s curb appeal and security with our front door installation services in Silver Spring, Maryland. Offering a wide selection of stylish, durable, and energy-efficient doors to suit your taste and budget. Our expert team ensures a flawless installation, enhancing your home’s entryway and value. Contact us today for a free estimate!"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c5ftqtp c1ux94pn c139pwc6 c1acxxi0`}>
<div
className={`w-element czziw4w`}>
<div
className={`w-element c1numhkq c1a06u5s c3qgmhh`}>
<h3
className={`w-element cw3m79e c1qb2rp3 c82qwqc cn7k83s c1emvlx`}>
{"Local review from Silver Spring Maryland"}
</h3>
<p
className={`w-element c1g3mhtg cn5qs21 c1b2b7rn chdomh6`}>
{"\"I’ve been working with the Capitol Improvements for more than a year (thanks to covid, supply chains, and homebuyers program) and we finally got our roof installed earlier this year. I could not be happier with the end product and the CI team. Everyone we interacted with was helpful and professional. I couldn’t recommend them more!\""}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1350r63 c1otj3om cn3kss c1kioei4`}>
<Image
src={"https://v2.improveitmd.com/uploads/rating_stars_CVEF_Pd3_QYWQ_Ugq_S_viwp_M_c1b7210fab.svg"}
width={110}
height={20}
alt={"5 stars logo."}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs c1mcsn9a c1lwlytk c1owcyig`} />
<p
className={`w-element`}>
{"Karen Christian, "}
<Link
href={"https://g.co/kgs/iEnHuW"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Review"}
</Link>
</p>
</div>
<Link_1
href={"/testimonials"}
target={"_self"}
className={`w-link cvljm31 crv3s27 cacmu18 cn7k83s cyc4l41 c1d7h9xn c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden cdvg2t`}>
{"READ MORE REVIEWS >"}
</Link_1>
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c5ftqtp c1ux94pn c139pwc6 c1acxxi0`}>
<div
className={`w-element cknz90 cd6izue c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 ctb46rv c12fmqv1 ctcfpb7 csaxcaf c1n30c32 cnods77 c1yt6hv7 cmy3513 cio262d cuwoxsi c1t4xpm1 chp5dab c1l9wte3`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cql9qfl c1s88tz3 c9slfh6 c1txodcv c18a8z5x cgdr2qp czr9sbv c1q7r9n8 c4ph8p6 c14e2i27 cyzinkh`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1s88tz3 c1j3nit7`}>
<h2
className={`w-element c1q4209f c19fqb9a c1pjr8f coiaw8t cl197ma`}>
{"Let's start your project"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We'll answer your questions and get you what you need to get your project done right."}
</p>
</div>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s c5g53jj cimel00`}>
{"Get a free quote"}
</Link>
</div>
</div>
</div>
</div>
</section>
</Box>
<Slot>
<Fragment_1>
<Box
tag={"footer"}
id={"contact"}
className={`w-box cvfl1ur cwpgog4 c9u7chh cud6z1z clrop1m`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb c19wzbh8 c7iyr7r cmpwmbp c5v4dmg`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 c17crvds c1cgy1k1 chradd5 ciqrl3a cyyof5h c1t9puix c19koxyq`}>
<div
className={`w-element c1numhkq c1a06u5s c17crvds c1czy0yv cyovuht`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c3qgmhh c9nda8s c1oxtvvd c84c42r cwxdxon cyovuht c1atvmzl c1350r63 c62ogy3`}>
<p
className={`w-element c1gbsy9l c19fqb9a c82qwqc c181l3p8`}>
{"© 2024 Capitol Improvements."}
</p>
<p
className={`w-element c1gbsy9l c19fqb9a c82qwqc cia3a62`}>
{"MHIC 130628 | DC 410519000037 | VA 2705191231 "}
</p>
<div
className={`w-element c1numhkq c15kiuw7 ct0qrmw c1pit5s0 c1ojdguz cw8j8n1 cjnxd6d`}>
<Link
href={"https://www.facebook.com/improveitmd"}
target={"_blank"}
className={`w-element c156ohex crv3s27 c138ghqs c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au c1gmaf10`}>
<HtmlEmbed
code={"<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_9_165)\">\n<path d=\"M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z\" fill=\"currentColor\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_9_165\">\n<rect width=\"16\" height=\"16\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx c1eflpw1 c1utj868 c1xsy0xh`} />
</Link>
<Link
href={"https://www.youtube.com/@capitolimprovements"}
target={"_blank"}
className={`w-element c156ohex crv3s27 c138ghqs c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au c1gmaf10`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_9_167)\">\n<path d=\"M19.8008 9.03516C19.8008 9.03516 19.6055 7.65625 19.0039 7.05078C18.2422 6.25391 17.3906 6.25 17 6.20312C14.2031 6 10.0039 6 10.0039 6H9.99609C9.99609 6 5.79688 6 3 6.20312C2.60938 6.25 1.75781 6.25391 0.996094 7.05078C0.394531 7.65625 0.203125 9.03516 0.203125 9.03516C0.203125 9.03516 0 10.6563 0 12.2734V13.7891C0 15.4062 0.199219 17.0273 0.199219 17.0273C0.199219 17.0273 0.394531 18.4063 0.992187 19.0117C1.75391 19.8086 2.75391 19.7813 3.19922 19.8672C4.80078 20.0195 10 20.0664 10 20.0664C10 20.0664 14.2031 20.0586 17 19.8594C17.3906 19.8125 18.2422 19.8086 19.0039 19.0117C19.6055 18.4063 19.8008 17.0273 19.8008 17.0273C19.8008 17.0273 20 15.4102 20 13.7891V12.2734C20 10.6563 19.8008 9.03516 19.8008 9.03516ZM7.93359 15.6289V10.0078L13.3359 12.8281L7.93359 15.6289Z\" fill=\"currentColor\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_9_167\">\n<rect width=\"100%\" height=\"100%\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>"}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx cwfh8jw c8mcv34 c1xsy0xh`} />
</Link>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c139pwc6 cjkauba c184q1bs c13g3obg`}>
<div
className={`w-element c1numhkq c1a06u5s c16xjt02 c1e3sjlf`}>
<p
className={`w-element c1gbsy9l c82qwqc`}>
{"“The service we received from the initial meeting with Mitch, Seth and Pat was amazing! We were informed of every bit of information throughout the entire process. The installation was also professional, on time and swift.”"}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n c1603wqb`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 91 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7.34786 1.48663C7.4319 1.1987 7.83978 1.1987 7.92382 1.48663L9.28716 6.15741C9.32452 6.28538 9.44183 6.37336 9.57515 6.37336L14.05 6.37336C14.3327 6.37336 14.4585 6.72879 14.2386 6.90662L10.565 9.87769C10.471 9.95377 10.4318 10.0789 10.4657 10.195L11.8555 14.9567C11.9379 15.2388 11.6074 15.4588 11.3789 15.274L7.82449 12.3993C7.71447 12.3103 7.55722 12.3103 7.44719 12.3993L3.89277 15.274C3.66423 15.4588 3.33378 15.2388 3.41614 14.9567L4.806 10.195C4.83989 10.0789 4.80073 9.95377 4.70667 9.87769L1.03307 6.90662C0.813201 6.72879 0.938942 6.37336 1.22173 6.37336L5.69653 6.37336C5.82984 6.37336 5.94716 6.28538 5.98452 6.15741L7.34786 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M24.2741 1.48663C24.3581 1.1987 24.766 1.1987 24.85 1.48663L26.2134 6.15741C26.2507 6.28538 26.368 6.37336 26.5014 6.37336L30.9762 6.37336C31.2589 6.37336 31.3847 6.72879 31.1648 6.90662L27.4912 9.87769C27.3972 9.95377 27.358 10.0789 27.3919 10.195L28.7818 14.9567C28.8641 15.2388 28.5337 15.4588 28.3051 15.274L24.7507 12.3993C24.6407 12.3103 24.4834 12.3103 24.3734 12.3993L20.819 15.274C20.5904 15.4588 20.26 15.2388 20.3423 14.9567L21.7322 10.195C21.7661 10.0789 21.7269 9.95377 21.6329 9.87769L17.9593 6.90662C17.7394 6.72879 17.8652 6.37336 18.1479 6.37336L22.6227 6.37336C22.7561 6.37336 22.8734 6.28538 22.9107 6.15741L24.2741 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M41.2003 1.48663C41.2843 1.1987 41.6922 1.1987 41.7762 1.48663L43.1396 6.15741C43.1769 6.28538 43.2943 6.37336 43.4276 6.37336L47.9024 6.37336C48.1852 6.37336 48.3109 6.72879 48.091 6.90662L44.4174 9.87769C44.3234 9.95377 44.2842 10.0789 44.3181 10.195L45.708 14.9567C45.7903 15.2388 45.4599 15.4588 45.2313 15.274L41.6769 12.3993C41.5669 12.3103 41.4096 12.3103 41.2996 12.3993L37.7452 15.274C37.5167 15.4588 37.1862 15.2388 37.2686 14.9567L38.6584 10.195C38.6923 10.0789 38.6531 9.95377 38.5591 9.87769L34.8855 6.90662C34.6656 6.72879 34.7914 6.37336 35.0741 6.37336L39.549 6.37336C39.6823 6.37336 39.7996 6.28538 39.8369 6.15741L41.2003 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M58.1265 1.48663C58.2106 1.1987 58.6185 1.1987 58.7025 1.48663L60.0658 6.15741C60.1032 6.28538 60.2205 6.37336 60.3538 6.37336L64.8286 6.37336C65.1114 6.37336 65.2372 6.72879 65.0173 6.90662L61.3437 9.87769C61.2496 9.95377 61.2105 10.0789 61.2444 10.195L62.6342 14.9567C62.7166 15.2388 62.3861 15.4588 62.1576 15.274L58.6032 12.3993C58.4932 12.3103 58.3359 12.3103 58.2259 12.3993L54.6715 15.274C54.4429 15.4588 54.1125 15.2388 54.1948 14.9567L55.5847 10.195C55.6186 10.0789 55.5794 9.95377 55.4854 9.87769L51.8118 6.90662C51.5919 6.72879 51.7176 6.37336 52.0004 6.37336L56.4752 6.37336C56.6085 6.37336 56.7259 6.28538 56.7632 6.15741L58.1265 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M75.0528 1.48663C75.1368 1.1987 75.5447 1.1987 75.6287 1.48663L76.9921 6.15741C77.0294 6.28538 77.1467 6.37336 77.28 6.37336L81.7548 6.37336C82.0376 6.37336 82.1634 6.72879 81.9435 6.90662L78.2699 9.87769C78.1758 9.95377 78.1367 10.0789 78.1706 10.195L79.5604 14.9567C79.6428 15.2388 79.3123 15.4588 79.0838 15.274L75.5294 12.3993C75.4194 12.3103 75.2621 12.3103 75.1521 12.3993L71.5977 15.274C71.3691 15.4588 71.0387 15.2388 71.121 14.9567L72.5109 10.195C72.5448 10.0789 72.5056 9.95377 72.4116 9.87769L68.738 6.90662C68.5181 6.72879 68.6438 6.37336 68.9266 6.37336L73.4014 6.37336C73.5347 6.37336 73.6521 6.28538 73.6894 6.15741L75.0528 1.48663Z\" fill=\"#FBBC04\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx ctittuf c1ovmx1o`} />
<p
className={`w-element c1gbsy9l c1g3mhtg c12n66pl`}>
{"John T, "}
<Link
target={"_blank"}
href={"https://maps.app.goo.gl/1V8v97hcVYFfrdZb8?g_st=ic"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Review"}
</Link>
</p>
</div>
</div>
<div
className={`w-element caqpu94 cfpk3a8 c139pwc6 cw6436c ccgjom2`} />
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg c1lg7bh9 c1kioei4`}>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"5.0 Rating"}
</p>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"445 Reviews"}
</p>
<Link
href={"/testimonials"}
target={"_self"}
className={`w-element cprvrz2 c1hwvjgs cacmu18 c1ezjj73 cahz6x0 cmchden`}>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"See more testimonials"}
</p>
</Link>
</div>
</div>
</div>
<div
className={`w-element c1numhkq c15kiuw7 ct0qrmw c9b0cnn cqsaj3r c1lg7bh9 cles91e cm1f838 cw8j8n1`}>
<div
className={`w-element c1numhkq c1a06u5s c38sprm cktayxe ckm36hk`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Services"}
</p>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Roofing"}
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Siding"}
</Link>
<Link
href={"/windows"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Windows"}
</Link>
<Link
href={"/gutters"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Gutters"}
</Link>
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Trim"}
</Link>
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Decks & Patios"}
</Link>
<Link
href={"/doors"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Doors"}
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c38sprm cktayxe ckm36hk`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Company"}
</p>
<Link
href={"/about"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"About Us"}
</Link>
<Link
href={"/team"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Our Team"}
</Link>
<Link
href={"/service-areas"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Service Area"}
</Link>
<Link
href={"/locations"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Locations"}
</Link>
<Link
href={"/testimonials"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Testimonials"}
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c38sprm cktayxe ckm36hk`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Resources"}
</p>
<Link
href={"/gallery"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Gallery"}
</Link>
<Link
href={"/financing"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Financing"}
</Link>
<Link
href={"/warranty"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Warranty"}
</Link>
<Link
href={"/blog"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Blog"}
</Link>
<Link
href={"/contact"}
target={"_self"}
className={`w-element c82qwqc c1hwvjgs cacmu18 c1ezjj73 c1pbbqh7 cswno9y c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden c1xsy0xh`}>
{"Contact"}
</Link>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s cucbkc3 c82qwqc ciqrl3a c14e2i27 c1y3ergk ct6ryly c6p48t0 cw8j8n1`}>
<div
className={`w-element c1numhkq c1a06u5s c1irdqs7 cf8e5pr`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Bowie Headquarters"}
</p>
<p
className={`w-element ch7xx7z`}>
{"12606 Hillmeade Station Dr."}
{""}
<br />
{""}
{"Bowie, MD 20720"}
{""}
<br />
{""}
<Link
href={"tel:3017696909"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"301.769.6909"}
</Link>
</p>
<Link
href={"https://share.google/1sIvDWDALSZTorUNn"}
target={"_blank"}
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg cqilze0 c1lg7bh9 c1kioei4`}>
<div
href={"https://share.google/1sIvDWDALSZTorUNn"}
className={`w-element c1numhkq c1eflpw1 cqq3lvy c1diokdk ch3nxmx`}>
<svg
viewBox={"-3 0 262 262"}
xmlns={"http://www.w3.org/2000/svg"}
preserveAspectRatio={"xMidYMid"}
fill={"#000000"}
className={`w-element`}>
<g
id={"SVGRepo_bgCarrier"}
strokeWidth={"0"}
className={`w-element`} />
<g
id={"SVGRepo_tracerCarrier"}
strokeLinecap={"round"}
strokeLinejoin={"round"}
className={`w-element`} />
<g
id={"SVGRepo_iconCarrier"}
className={`w-element`}>
<path
d={"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"}
fill={"#4285F4"}
className={`w-element`} />
<path
d={"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"}
fill={"#34A853"}
className={`w-element`} />
<path
d={"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"}
fill={"#FBBC05"}
className={`w-element`} />
<path
d={"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"}
fill={"#EB4335"}
className={`w-element`} />
</g>
</svg>
</div>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"5.0 Rating"}
</p>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"221 Reviews"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1irdqs7 cf8e5pr`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Gaithersburg Branch"}
</p>
<p
className={`w-element ch7xx7z`}>
{"7916 Plum Creek Dr."}
{""}
<br />
{""}
{"Gaithersburg, MD 20879"}
{""}
<br />
{""}
<Link
href={"tel:3017696991"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"301.769.6991"}
</Link>
</p>
<Link
href={"https://share.google/Vffum73yhooXPXPvw"}
target={"_blank"}
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg cqilze0 c1lg7bh9 c1kioei4`}>
<div
href={"https://share.google/Vffum73yhooXPXPvw"}
className={`w-element c1numhkq c1eflpw1 cqq3lvy c1diokdk ch3nxmx`}>
<svg
viewBox={"-3 0 262 262"}
xmlns={"http://www.w3.org/2000/svg"}
preserveAspectRatio={"xMidYMid"}
fill={"#000000"}
className={`w-element`}>
<g
id={"SVGRepo_bgCarrier"}
strokeWidth={"0"}
className={`w-element`} />
<g
id={"SVGRepo_tracerCarrier"}
strokeLinecap={"round"}
strokeLinejoin={"round"}
className={`w-element`} />
<g
id={"SVGRepo_iconCarrier"}
className={`w-element`}>
<path
d={"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"}
fill={"#4285F4"}
className={`w-element`} />
<path
d={"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"}
fill={"#34A853"}
className={`w-element`} />
<path
d={"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"}
fill={"#FBBC05"}
className={`w-element`} />
<path
d={"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"}
fill={"#EB4335"}
className={`w-element`} />
</g>
</svg>
</div>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"5.0 Rating"}
</p>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"157 Reviews"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1irdqs7 cf8e5pr`}>
<p
className={`w-element c14s91he c18mkjfw c82qwqc cn7k83s`}>
{"Washington DC Branch"}
</p>
<p
className={`w-element ch7xx7z`}>
{"1015 15th St NW #635,"}
{""}
<br />
{""}
{"Washington, DC 20005"}
{""}
<br />
{""}
<Link
href={"tel:4105870128"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"410.587.0128"}
</Link>
</p>
<Link
href={"https://share.google/qihLqbCG1CYdOwtzJ"}
target={"_blank"}
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg cqilze0 c1lg7bh9 c1kioei4`}>
<div
href={"https://share.google/qihLqbCG1CYdOwtzJ"}
className={`w-element c1numhkq c1eflpw1 cqq3lvy c1diokdk ch3nxmx`}>
<svg
viewBox={"-3 0 262 262"}
xmlns={"http://www.w3.org/2000/svg"}
preserveAspectRatio={"xMidYMid"}
fill={"#000000"}
className={`w-element`}>
<g
id={"SVGRepo_bgCarrier"}
strokeWidth={"0"}
className={`w-element`} />
<g
id={"SVGRepo_tracerCarrier"}
strokeLinecap={"round"}
strokeLinejoin={"round"}
className={`w-element`} />
<g
id={"SVGRepo_iconCarrier"}
className={`w-element`}>
<path
d={"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"}
fill={"#4285F4"}
className={`w-element`} />
<path
d={"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"}
fill={"#34A853"}
className={`w-element`} />
<path
d={"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"}
fill={"#FBBC05"}
className={`w-element`} />
<path
d={"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"}
fill={"#EB4335"}
className={`w-element`} />
</g>
</svg>
</div>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"5.0 Rating"}
</p>
<p
className={`w-element ch7xx7z c82qwqc`}>
{"67 Reviews"}
</p>
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</Box>
<Slot>
<Fragment_1>
<HtmlEmbed
code={"<script>(function(factory){if(typeof define===\"function\"&&define.amd){define(factory)}else if(typeof module!==\"undefined\"&&module.exports){module.exports=factory()}else{window.enterView=factory.call(this)}})((()=>{const lib=({selector:selector,enter:enter=(()=>{}),exit:exit=(()=>{}),progress:progress=(()=>{}),offset:offset=0,once:once=false})=>{let raf=null;let ticking=false;let elements=[];let height=0;function setupRaf(){raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){return setTimeout(callback,1e3/60)}}function getOffsetHeight(){if(offset&&typeof offset===\"number\"){const fraction=Math.min(Math.max(0,offset),1);return height-fraction*height}return height}function updateHeight(){const cH=document.documentElement.clientHeight;const wH=window.innerHeight||0;height=Math.max(cH,wH)}function updateScroll(){ticking=false;const targetFromTop=getOffsetHeight();elements=elements.filter((el=>{const{top:top,bottom:bottom,height:height}=el.getBoundingClientRect();const entered=top<targetFromTop;const exited=bottom<targetFromTop;if(entered&&!el.__ev_entered){enter(el);el.__ev_progress=0;progress(el,el.__ev_progress);if(once)return false}else if(!entered&&el.__ev_entered){el.__ev_progress=0;progress(el,el.__ev_progress);exit(el)}if(entered&&!exited){const delta=(targetFromTop-top)/height;el.__ev_progress=Math.min(1,Math.max(0,delta));progress(el,el.__ev_progress)}if(entered&&exited&&el.__ev_progress!==1){el.__ev_progress=1;progress(el,el.__ev_progress)}el.__ev_entered=entered;return true}));if(!elements.length){window.removeEventListener(\"scroll\",onScroll,true);window.removeEventListener(\"resize\",onResize,true);window.removeEventListener(\"load\",onLoad,true)}}function onScroll(){if(!ticking){ticking=true;raf(updateScroll)}}function onResize(){updateHeight();updateScroll()}function onLoad(){updateHeight();updateScroll()}function selectionToArray(selection){const len=selection.length;const result=[];for(let i=0;i<len;i+=1){result.push(selection[i])}return result}function selectAll(selector,parent=document){if(typeof selector===\"string\"){return selectionToArray(parent.querySelectorAll(selector))}else if(selector instanceof NodeList){return selectionToArray(selector)}else if(selector instanceof Array){return selector}}function setupElements(){elements=selectAll(selector)}function setupEvents(){window.addEventListener(\"resize\",onResize,true);window.addEventListener(\"scroll\",onScroll,true);window.addEventListener(\"load\",onLoad,true);onResize()}function init(){if(!selector){console.error(\"must pass selector\");return false}setupElements();if(!elements||!elements.length){console.error(\"no els found\");return false}setupRaf();setupEvents();updateScroll()}init()};return lib}));</script>"}
executeScriptOnCanvas={false}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n:root {\n  --ani-duration: var(--duration-default, .2s);\n  --ani-delay: 0s;\n  --ani-slide-offset: 20%;\n  --ani-zoom-in-scale: 1;\n  --ani-zoom-out-scale: .85;\n  --ani-flip-rotate: 30deg;\n  --ani-easing: var(--easing-default, ease);\n  --ani-fill-mode: forwards;\n}\n[data-ani]:not([data-ani-children]),[data-ani-children]:not([data-ani-progress])>*{animation-duration:var(--ani-duration);animation-delay:var(--ani-delay);animation-timing-function:var(--ani-easing);animation-fill-mode:var(--ani-fill-mode);opacity:0}[data-ani-progress]:not([data-ani-children]),[data-ani-children]:not([data-ani])>*{transition-property:opacity,transform;transition-duration:var(--ani-duration);transition-timing-function:var(--ani-easing);opacity:0}\n@keyframes fadeIn{from{opacity:0}\nto{opacity:1}}\n@keyframes fadeOut{from{opacity:1}\nto{opacity:0}}[data-ani-children][data-ani='fade']>.in,[data-ani='fade']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation-name:fadeIn}[data-ani-children][data-ani='fade']>.out,[data-ani='fade']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation-name:fadeOut}\n@keyframes slideIn{from{opacity:0;translate:var(--ani-slide-transform)}\nto{opacity:1;translate:none}}\n@keyframes slideOut{from{opacity:1;translate:none}\nto{opacity:0;translate:var(--ani-slide-transform)}}[data-ani-children][data-ani|='slide']>.in,[data-ani|='slide']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation-name:slideIn}[data-ani-children][data-ani|='slide']>.out,[data-ani|='slide']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation-name:slideOut}[data-ani='slide-up']{--ani-slide-transform:0 var(--ani-slide-offset)}[data-ani='slide-down']{--ani-slide-transform:0 calc(-1*var(--ani-slide-offset))}[data-ani='slide-left']{--ani-slide-transform:var(--ani-slide-offset)}[data-ani='slide-right']{--ani-slide-transform:calc(-1*var(--ani-slide-offset))}\n@keyframes zoomIn{from{opacity:0;scale:var(--ani-zoom-out-scale)}\nto{opacity:1;scale:1}}\n@keyframes zoomOut{from{opacity:1;scale:1}\nto{opacity:0;scale:var(--ani-zoom-in-scale)}}[data-ani-children][data-ani='zoom']>.in,[data-ani|='zoom']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation-name:zoomIn}[data-ani-children][data-ani='zoom']>.out,[data-ani|='zoom']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation-name:zoomOut}[data-ani-children][data-ani-progress='zoom']>*,[data-ani-progress='zoom']:not([data-ani-children]){transform:scale(var(--ani-zoom-out-scale))}\n@keyframes flipInY{from{rotate:y var(--ani-flip-rotate);perspective:2000px;opacity:0}\nto{rotate:y 0;opacity:1}}\n@keyframes flipOutY{from{rotate:y 0;opacity:1}\nto{perspective:2000px;rotate:y var(--ani-flip-rotate);opacity:0}}\n@keyframes flipInX{from{perspective:2000px;rotate:x var(--ani-flip-rotate);opacity:0}\nto{rotate:x 0;opacity:1}}\n@keyframes flipOutX{from{rotate:x 0;opacity:1}\nto{perspective:2000px;rotate:x var(--ani-flip-rotate);opacity:0}}[data-ani-children][data-ani='flip-y']>.in,[data-ani='flip-y']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation-name:flipInY}[data-ani-children][data-ani='flip-x']>.in,[data-ani='flip-x']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation-name:flipInX}[data-ani-children][data-ani='flip-y']>.out,[data-ani='flip-y']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation-name:flipOutY}[data-ani-children][data-ani='flip-x']>.out,[data-ani='flip-x']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation-name:flipOutX}\n@keyframes expandDown{from{height:0}\nto{height:var(--newHeight)}}\n@keyframes expandUp{from{height:var(--newHeight)}\nto{height:0}}[data-ani='expand'],[data-ani='expand'][data-state='open'],[data-ani='expand'].in{--newHeight:var(--custom-height,var(--radix-accordion-content-height,var(--radix-collapsible-content-height,100%)));overflow:hidden;opacity:1}[data-ani-children][data-ani='expand']>.in,[data-ani='expand']:where(.in:not([data-state]),[data-state$='open'],[data-state='active']){animation:expandDown var(--ani-duration)var(--ani-easing)}[data-ani-children][data-ani='expand']>.out,[data-ani='expand']:where(.out:not([data-state]),[data-state='closed'],[data-state='inactive']){animation:expandUp var(--ani-duration)var(--ani-easing)}\n@media(prefers-reduced-motion:reduce){[data-ani]:not([data-ani-children]),[data-ani-progress]:not([data-ani-children]),[data-ani-children]>*{opacity:1;transform:none;animation:none;rotate:none;scale:none;translate:none}}\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\nconst config = {\n\tintersectionOffset: 0.2,\n\tintersectionOnce: true,\n\tprogressOffset: 0,\n\tprogressOnce: false,\n};\nfunction e({trigger:e,selector:r,offset:n,once:s}){const a=\"progress\"===e;return enterView({selector:r,enter:e=>!a&&t(e,\"in\",\"out\"),exit:e=>!a&&t(e,\"out\",\"in\"),progress:(e,t)=>a&&function(e,t){e.style.opacity=t,e.style.transform=function(e,t){const r=e.parentElement,n=r&&r.hasAttribute(\"data-ani-progress\")?r.getAttribute(\"data-ani-progress\"):e.getAttribute(\"data-ani-progress\"),s=parseFloat(getComputedStyle(e).getPropertyValue(\"--ani-slide-offset\"))||0,a=parseFloat(getComputedStyle(e).getPropertyValue(\"--ani-flip-rotate\"))||0,o=1-(1-t)*(1-parseFloat(getComputedStyle(e).getPropertyValue(\"--ani-zoom-out-scale\"))||1);switch(n){case\"slide-up\":return`translateY(${(1-t)*s}px)`;case\"slide-down\":return`translateY(-${(1-t)*s}px)`;case\"slide-left\":return`translateX(${(1-t)*s}px)`;case\"slide-right\":return`translateX(-${(1-t)*s}px)`;case\"flip-x\":return`rotateX(${(1-t)*a}deg)`;case\"flip-y\":return`rotateY(${(1-t)*a}deg)`;case\"zoom\":return`scale(${o})`;default:return\"none\"}}(e,t)}(e,t),offset:n,once:s})}function t(e,t,r){e.classList.add(t),e.classList.remove(r)}function r(e,t){const r=`[${e}]${t?'[data-ani-children=\"true\"] > *':':not([data-ani-children=\"true\"])'}`;return Array.from(document.querySelectorAll(r))}const n=[...r(\"data-ani\"),...r(\"data-ani\",!0)],s=[...r(\"data-ani-progress\"),...r(\"data-ani-progress\",!0)];n.length&&e({trigger:\"intersection\",selector:n,offset:config.intersectionOffset,once:config.intersectionOnce}),s.length&&e({trigger:\"progress\",selector:s,offset:config.progressOffset,once:config.progressOnce});\n</script>"}
executeScriptOnCanvas={false}
clientOnly={true}
className={`w-html-embed`} />
</Fragment_1>
</Slot>
</Fragment_1>
</Slot>
</Box>
</Body>
}


      export { Page }
    