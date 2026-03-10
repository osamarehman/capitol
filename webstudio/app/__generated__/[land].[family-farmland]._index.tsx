/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text, Box as Box, Slot as Slot } from "@webstudio-is/sdk-components-react";
import { Link as Link, Link as Link_1, Body as Body } from "@webstudio-is/sdk-components-react-router";
import { NavigationMenu as NavigationMenu, NavigationMenuList as NavigationMenuList, NavigationMenuItem as NavigationMenuItem, NavigationMenuTrigger as NavigationMenuTrigger, NavigationMenuContent as NavigationMenuContent, NavigationMenuViewport as NavigationMenuViewport, Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent } from "@webstudio-is/sdk-components-react-radix";


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
return <Body
className={`w-element`}>
<Box
className={`w-box cnregu4 c3a6wb5 c14dzf92`}>
<Slot>
<Fragment_1>
<HtmlEmbed
code={"<style>  \n/* RESET */\n* {\n  margin: 0;\n  scroll-behavior: smooth;\n}\n\n/* Prevent events on closed sheet */\n.viewport-container {\n  pointer-events: none !important;\n}\n.viewport-container .menu-viewport[data-state=\"open\"] {\n  pointer-events: auto !important;\n}\nbody.menu-open {\n  overflow: hidden;\n}\n  \n/* ACCORDION ANIMATION  */\n.AccordionContent {\n  overflow: hidden;\n}\n.AccordionContent[data-state=\"open\"] {\n  animation: accordionSlideDown 300ms ease-out;\n}\n.AccordionContent[data-state=\"closed\"] {\n  animation: accordionSlideUp 300ms ease-out;\n}\n\n@keyframes accordionSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-accordion-content-height); }\n}\n\n@keyframes accordionSlideUp {\n  from { height: var(--radix-accordion-content-height); }\n  to { height: 0; }\n}\n\n/* Accordion Header active state color change */\n.AccordionTrigger {\n  transition: color 250ms ease; /* optional smooth fade */\n}\n\n.AccordionTrigger.Firebrick[data-state=\"open\"] {\n  color: var(--firebrick);\n}\n\n/* Accordion Cross Icon rotate  */\n.CrossIconLine {\n  transform-origin: center;\n  transform: rotate(0deg);\n  transition: transform 250ms ease;\n}\n\n.AccordionCross[data-state=\"open\"] .CrossIconLine {\n  transform: rotate(90deg);\n}\n\n  /* Responsive Map CSS  */\n.responsive-map {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%; /* 4:3 aspect ratio (480/640 = 0.75) */\n  overflow: hidden;\n}\n\n.responsive-map iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n/* For mobile portrait (smaller screens) */\n@media screen and (max-width: 768px) {\n  .responsive-map {\n    padding-bottom: 100%; /* Make it more square on mobile */\n    margin: 10px 0; /* Add some vertical spacing */\n  }\n}\n\n/* For very small screens */\n@media screen and (max-width: 480px) {\n  .responsive-map {\n    padding-bottom: 120%; /* Taller aspect ratio for very small screens */\n  }\n}\n  \n/* Asphalt Roofing product top row padding removal  */\n@media only screen and (max-width: 1279px) {\n\t.product-top-row {\n\t\tpadding-right: 0rem;\n\t}\n}\n  \n@media (max-width: 479px) {\n  .commercial-grid {\n    display: none !important;\n  }\n}\n\n/* class for display:none  */\n.is--hidden {\n  display: none;\n}\n.is--visible {\n  display: block;\n}\n\na {\n  color: var(--foreground-secondary);\n  text-decoration: none;\n}\n\n.dropdown-list.is-2,\n.dropdown-list.is-3 {\n  height: 0;\n  overflow: hidden;\n  transition: height 0.3s ease;\n}\n\n.nav {\n  contain: layout style;\n  will-change: transform;\n  backface-visibility: hidden;\n}\n  \n/* Menu open state */\nbody.is-nav-open {\n  overflow: hidden;\n}\n\nbody.is-nav-open .nav-menu {\n  display: block;\n}\n\nbody.is-nav-open .hamburger-line {\n  display: none;\n}\n\nbody.is-nav-open .nav-icon {\n  display: block;\n}\n</style>"}
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
className={`w-box cnbug7k cp1dmkc c137qtrl c1numhkq ch3nxmx cwpwdsd c15yzrzw cn87dm8 c1uhhf7h c1n7qu2 ${"viewport-container"}`}>
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
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4 ${"bg-overlay"}`} />
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
className={`w-element cwpwdsd c1dk4ika c1epvuph coqffc6 cyuxmdg cauq8n4 ${"bg-overlay"}`} />
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
id={"lp-hero"}
className={`w-element c1epvuph c1rgmp2`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s cc9ojx c1sjfwqi c139pwc6 c1msq9px c5ftqtp c1ux94pn c1epvuph c1edz3f7 c15kiuw7 ct0qrmw`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c18hkk31 c1dhbsa2`}>
<p
className={`w-element c18v83wh ce6x08i c1lvj0n c1kqoumg`}>
{"Licensed & Insured"}
</p>
<h1
className={`w-element c1r3nuqs c1ihu3w4 c1lvj0n c1tdj1xa c1yzjm0o ce6x08i c4c2xkh`}>
{"Land Clearing & Forestry Mulching"}
</h1>
</div>
<p
className={`w-element cn5qs21 c1b2b7rn c1lvj0n c1g3mhtg c13bl3hn`}>
{"Clear overgrown land, unwanted brush, and invasive trees with precision skid steer & mulching services."}
</p>
<Link
href={"tel:2403511470"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{"Text or Call (240) 351-1470"}
</Link>
</div>
</div>
</div>
</section>
<section
className={`w-element c1x5x5gp`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 c1u2ofx5 cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 cv9l525 cvzj4vi c1t9puix c1784h8b c135vs31 c1ypbuo2 c19p1lxn cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c8rh0h1 c13g3obg c1m1w9fz c1sy7qlo c1s19qlc crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Here To Serve."}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"At the heart of our work is a simple belief that being in a service business "}
<b
className={`w-element`}>
{"means serving one another. "}
</b>
{"We show up every day with a commitment to listen, care, and deliver. Our team takes pride in going the extra mile, because true success is measured by your satisfaction."}
</p>
</div>
<div
className={`w-element c139pwc6 cjhysm8 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/capitol_improvements_hero_img_FZH_Oqk_Ui_Fhym_VWE_Yj_Jhg4_82025eb746.webp"}
width={1920}
height={1013}
alt={""}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 cjhysm8 cjkauba c13g3obg c15vs04h c1k50foq cknnq3k`} />
</div>
</div>
</div>
</div>
</section>
<div
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<HtmlEmbed
code={"<!-- Forestry Mulching Quote Estimator — ZIP-only, FormSubmit email, 4 steps -->\n<div id=\"mulcher-app\" style=\"font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;\">\n  <style>\n    :root{ --space:14px; --radius:16px; --border:#e5e7eb; --muted:#6b7280; --ink:#111827; --bg:#ffffff; --brand:#111827; }\n    #mulcher-app * { box-sizing: border-box; }\n\n    /* Card */\n    .fm-card { max-width: 1080px; margin: 16px auto 24px; background:#fff; border:1px solid var(--border); border-radius:var(--radius); box-shadow: 0 8px 24px rgba(0,0,0,.06); overflow:hidden; }\n    .fm-header { padding:18px; background:linear-gradient(180deg,#111827,#1f2937); color:#fff; }\n    .fm-title { font-size: clamp(18px,2vw,24px); font-weight:700; }\n    .fm-sub { opacity:.9; font-size:12.5px; margin-top:6px; }\n\n    /* Stepper */\n    .steps { display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:12px 18px; background:#f9fafb; border-bottom:1px solid var(--border); }\n    .step { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--muted); }\n    .dot { width:26px; height:26px; border-radius:999px; border:2px solid var(--border); display:grid; place-items:center; background:#fff; font-weight:800; }\n    .step.active .dot{ border-color:var(--brand); background:var(--brand); color:#fff; }\n    .step.active { color:#111827; font-weight:800; }\n\n    /* Body: fixed min-height to avoid jumps */\n    .fm-body { padding:18px; display:grid; grid-template-columns:1fr; gap:16px; min-height: clamp(520px, 62vh, 680px); }\n\n    /* Inputs */\n    label { display:block; font-size:13px; font-weight:700; margin:2px 0 6px; color:#111827; }\n    select, input { width:100%; padding:14px; border:1px solid var(--border); border-radius:12px; font-size:16px; }\n    input::placeholder{ color:#9ca3af; }\n    .row { display:flex; gap:12px; }\n    .col { flex:1; }\n    .hint { font-size:12px; color:#6b7280; margin-top:6px; }\n    .fine { font-size:12px; color:#4b5563; }\n\n    /* Services */\n    .services-wrap { display:grid; grid-template-columns:1fr; gap:12px; }\n    @media(min-width:680px){ .services-wrap{ grid-template-columns: repeat(2,1fr);} }\n    @media(min-width:1100px){ .services-wrap{ grid-template-columns: repeat(3,1fr);} }\n    .service-card { border:1px solid var(--border); border-radius:14px; padding:14px; cursor:pointer; background:#fff; transition: box-shadow .15s, border-color .15s; display:flex; gap:12px; align-items:center; min-height:92px; }\n    .service-card:hover { box-shadow:0 8px 18px rgba(0,0,0,.06); }\n    .service-card.selected { border-color:#111827; box-shadow:0 8px 24px rgba(17,24,39,.12); }\n    .svc-ico { width:68px; height:68px; border-radius:12px; background:#f3f4f6; display:grid; place-items:center; flex:0 0 auto; }\n    .svc-title { font-weight:800; color:#111827; }\n    .svc-desc { font-size:12px; color:#6b7280; }\n\n    /* Add-ons */\n    .addons { display:grid; gap:10px; }\n    .addon { display:flex; align-items:center; gap:10px; font-size:15px; }\n    .addon input{ width:auto; accent-color:#111827; }\n\n    /* Results */\n    .result { padding:16px; background:#f3f4f6; border:1px dashed var(--border); border-radius:12px; margin-top:10px; }\n    .badge { display:inline-block; padding:6px 10px; border-radius:999px; font-size:14px; font-weight:800; background:#111827; color:#fff; }\n    .grid-3 { display:grid; gap:12px; grid-template-columns:1fr; }\n    @media(min-width:780px){ .grid-3{ grid-template-columns: repeat(3,1fr);} }\n    .muted { color:#6b7280; font-size:12.5px; }\n\n    /* Quote hero */\n    .quote-hero{ display:grid; gap:16px; grid-template-columns:1fr; padding:18px; border:1px solid var(--border); border-radius:16px; background:\n      radial-gradient(1200px 300px at 100% -20%, rgba(16,185,129,.08), transparent 60%),\n      linear-gradient(180deg, #ffffff, #f8fafc); }\n    @media(min-width:820px){ .quote-hero{ grid-template-columns: 1fr 260px; align-items:center; } }\n    .quote-amount{ font-weight:900; letter-spacing:.2px; font-size: clamp(22px,6.5vw,40px); }\n    .chips{ display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }\n    .chip{ display:inline-flex; align-items:center; gap:6px; padding:8px 10px; border:1px solid var(--border); border-radius:999px; font-size:12.5px; background:#fff; }\n    .cta-row{ margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; }\n    .hero-art{ width:100%; height:180px; border-radius:14px; background: linear-gradient(180deg,#ecfdf5,#f0fdf4); display:grid; place-items:center; border:1px solid var(--border); }\n    .hero-art svg{ width:90%; height:auto; max-height:160px; opacity:.95; }\n\n    /* Footer */\n    .fm-footer { padding:14px 18px 18px; background:#f9fafb; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:12px; }\n    .btn { display:inline-flex; align-items:center; justify-content:center; padding:14px 16px; border-radius:12px; border:1px solid #111827; background:#111827; color:#fff; font-weight:800; cursor:pointer; text-decoration:none; font-size:16px; }\n    .btn.secondary { background:#fff; color:#111827; }\n    .btn[aria-disabled=\"true\"] { opacity:.5; pointer-events:none; }\n    .actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:space-between; }\n\n    /* Multistep panes */\n    .step-pane { display:none; }\n    .step-pane.active { display:block; }\n\n    /* Mobile tweaks */\n    @media (max-width:560px){\n      .row{ flex-direction:column; }\n      .actions{ flex-direction:column-reverse; gap:12px; }\n      .actions .btn{ width:100%; }\n    }\n  </style>\n\n  <div class=\"fm-card\">\n    <div class=\"fm-header\">\n      <div class=\"fm-title\">Forestry Mulching — Quick Quote</div>\n      <div class=\"fm-sub\">Step 1: Location (MD/VA/NC) → Step 2: Details → Step 3: Info → Step 4: Quote</div>\n    </div>\n\n    <!-- Progress -->\n    <div class=\"steps\" id=\"progress\">\n      <div class=\"step\" data-step=\"1\"><div class=\"dot\">1</div> Location</div>\n      <div class=\"step\" data-step=\"2\"><div class=\"dot\">2</div> Details</div>\n      <div class=\"step\" data-step=\"3\"><div class=\"dot\">3</div> Info</div>\n      <div class=\"step\" data-step=\"4\"><div class=\"dot\">4</div> Quote</div>\n    </div>\n\n    <div class=\"fm-body\">\n      <!-- STEP 1: LOCATION -->\n      <section class=\"step-pane active\" id=\"step1\">\n        <label>Service Location</label>\n        <div class=\"row\">\n          <div class=\"col\">\n            <label for=\"zip\">ZIP code</label>\n            <input id=\"zip\" inputmode=\"numeric\" maxlength=\"5\" placeholder=\"e.g., 21401\">\n          </div>\n        </div>\n        <div class=\"hint\">We service <strong>MD, VA, NC</strong>. Enter your ZIP to estimate the mobilization fee.</div>\n      </section>\n\n      <!-- STEP 2: DETAILS -->\n      <section class=\"step-pane\" id=\"step2\">\n        <div>\n          <label id=\"serviceLabel\">Service type</label>\n          <div class=\"services-wrap\" id=\"services\" role=\"radiogroup\" aria-labelledby=\"serviceLabel\">\n            <!-- Land -->\n            <div class=\"service-card selected\" role=\"radio\" aria-checked=\"true\" data-value=\"land\" tabindex=\"0\">\n              <div class=\"svc-ico\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 64 64\" width=\"44\" height=\"44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <rect x=\"6\" y=\"38\" width=\"52\" height=\"10\" rx=\"2\" fill=\"#a7f3d0\"></rect>\n                  <path d=\"M8 48 L56 48 L48 56 L16 56 Z\" fill=\"#34d399\"></path>\n                  <circle cx=\"14\" cy=\"30\" r=\"6\" fill=\"#86efac\"></circle>\n                  <rect x=\"12.5\" y=\"24\" width=\"3\" height=\"12\" fill=\"#065f46\"></rect>\n                </svg>\n              </div>\n              <div class=\"svc-meta\"><div class=\"svc-title\">Land Clearing</div><div class=\"svc-desc\">Full vegetation removal.</div></div>\n            </div>\n            <!-- Brush -->\n            <div class=\"service-card\" role=\"radio\" aria-checked=\"false\" data-value=\"brush\" tabindex=\"0\">\n              <div class=\"svc-ico\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 64 64\" width=\"44\" height=\"44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <circle cx=\"20\" cy=\"32\" r=\"10\" fill=\"#bbf7d0\"></circle>\n                  <circle cx=\"36\" cy=\"28\" r=\"8\" fill=\"#86efac\"></circle>\n                  <circle cx=\"42\" cy=\"38\" r=\"9\" fill=\"#4ade80\"></circle>\n                  <rect x=\"30\" y=\"36\" width=\"4\" height=\"14\" fill=\"#065f46\"></rect>\n                </svg>\n              </div>\n              <div class=\"svc-meta\"><div class=\"svc-title\">Brush &amp; Underbrush</div><div class=\"svc-desc\">Thin understory and saplings.</div></div>\n            </div>\n            <!-- ROW -->\n            <div class=\"service-card\" role=\"radio\" aria-checked=\"false\" data-value=\"row\" tabindex=\"0\">\n              <div class=\"svc-ico\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 64 64\" width=\"44\" height=\"44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <rect x=\"28\" y=\"16\" width=\"8\" height=\"36\" rx=\"4\" fill=\"#d1fae5\"></rect>\n                  <circle cx=\"16\" cy=\"20\" r=\"6\" fill=\"#86efac\"></circle>\n                  <circle cx=\"48\" cy=\"24\" r=\"6\" fill=\"#86efac\"></circle>\n                  <path d=\"M32 16 C28 26, 36 38, 32 52\" stroke=\"#10b981\" stroke-width=\"3\" fill=\"none\"></path>\n                </svg>\n              </div>\n              <div class=\"svc-meta\"><div class=\"svc-title\">Trail / Right-of-Way</div><div class=\"svc-desc\">Clear access lanes.</div></div>\n            </div>\n            <!-- Storm -->\n            <div class=\"service-card\" role=\"radio\" aria-checked=\"false\" data-value=\"storm\" tabindex=\"0\">\n              <div class=\"svc-ico\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 64 64\" width=\"44\" height=\"44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <path d=\"M10 28 C24 18, 40 18, 54 28\" stroke=\"#34d399\" stroke-width=\"3\"></path>\n                  <path d=\"M12 36 C26 28, 38 28, 52 36\" stroke=\"#10b981\" stroke-width=\"3\"></path>\n                  <circle cx=\"20\" cy=\"40\" r=\"5\" fill=\"#a7f3d0\"></circle>\n                  <circle cx=\"44\" cy=\"30\" r=\"4\" fill=\"#86efac\"></circle>\n                </svg>\n              </div>\n              <div class=\"svc-meta\"><div class=\"svc-title\">Storm Damage &amp; Debris</div><div class=\"svc-desc\">Mulch downed trees/debris.</div></div>\n            </div>\n            <!-- Custom -->\n            <div class=\"service-card\" role=\"radio\" aria-checked=\"false\" data-value=\"custom\" tabindex=\"0\">\n              <div class=\"svc-ico\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 64 64\" width=\"44\" height=\"44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <path d=\"M24 20 L32 16 L40 20 L42 28 L40 36 L32 40 L24 36 L22 28 Z\" fill=\"#bbf7d0\"></path>\n                  <circle cx=\"32\" cy=\"28\" r=\"6\" fill=\"#10b981\"></circle>\n                  <path d=\"M46 40 C52 36, 56 36, 58 42 C52 44, 48 44, 46 40 Z\" fill=\"#34d399\"></path>\n                </svg>\n              </div>\n              <div class=\"svc-meta\"><div class=\"svc-title\">Custom / Other</div><div class=\"svc-desc\">Tell us your goal.</div></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\" style=\"margin-top:6px;\">\n          <div class=\"col\">\n            <label for=\"acres\">Acreage to clear</label>\n            <input id=\"acres\" inputmode=\"decimal\" type=\"number\" min=\"0.1\" step=\"0.1\" placeholder=\"e.g., 2.5\">\n          </div>\n          <div class=\"col\">\n            <label for=\"terrain\">Terrain</label>\n            <select id=\"terrain\">\n              <option value=\"flat\">Flat</option>\n              <option value=\"moderate\">Moderate</option>\n              <option value=\"hilly\">Hilly / Rough</option>\n            </select>\n          </div>\n        </div>\n\n        <div>\n          <label for=\"density\">Vegetation Density</label>\n          <select id=\"density\">\n            <option value=\"light\">Light</option>\n            <option value=\"medium\" selected=\"\">Medium</option>\n            <option value=\"heavy\">Heavy</option>\n            <option value=\"veryheavy\">Very Heavy</option>\n          </select>\n        </div>\n\n        <div>\n          <label>Optional Add-Ons (choose any)</label>\n          <div class=\"addons\">\n            <label class=\"addon\"><input type=\"checkbox\" id=\"haul\"> Hauling away mulch / debris <span class=\"muted\">(per acre)</span></label>\n            <label class=\"addon\"><input type=\"checkbox\" id=\"burn\"> Burn services <span class=\"muted\">(per acre; permits/weather dependent)</span></label>\n            <div class=\"row\">\n              <div class=\"col\">\n                <label for=\"stumps\">Stump grinding <span class=\"muted\">(# of stumps)</span></label>\n                <input id=\"stumps\" type=\"number\" min=\"0\" step=\"1\" placeholder=\"e.g., 10\">\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <!-- STEP 3: INFO -->\n      <section class=\"step-pane\" id=\"step3\">\n        <label>Your info</label>\n        <div class=\"hint\">Enter your contact info to reveal the range and enable the firm-quote link.</div>\n        <div class=\"row\" style=\"margin-top:6px;\">\n          <div class=\"col\"><input id=\"igName\" type=\"text\" placeholder=\"Your Name\" autocomplete=\"name\"></div>\n          <div class=\"col\"><input id=\"igPhone\" type=\"tel\" placeholder=\"(555) 555-5555\" autocomplete=\"tel\"></div>\n        </div>\n        <div class=\"fine\" style=\"margin-top:6px;\">We’ll use this to follow up if you request a firm quote. Standard SMS rates may apply.</div>\n      </section>\n\n      <!-- STEP 4: QUOTE -->\n      <section class=\"step-pane\" id=\"step4\">\n        <div class=\"quote-hero\">\n          <div class=\"hero-copy\">\n            <div class=\"quote-amount\" id=\"rangeDisplay\">Complete previous steps to see your range.</div>\n            <div id=\"rangeMid\" class=\"muted\"></div>\n            <div class=\"chips\">\n              <span id=\"chipService\" class=\"chip\">Service</span>\n              <span id=\"chipSize\" class=\"chip\">Acreage • Density • Terrain</span>\n              <span id=\"chipLoc\" class=\"chip\">ZIP</span>\n            </div>\n            <div class=\"cta-row\">\n              <a class=\"btn\" id=\"reqquoteTop\" href=\"#\" target=\"_blank\" rel=\"noopener\" aria-disabled=\"true\">Request Firm Quote →</a>\n            </div>\n          </div>\n          <div class=\"hero-art\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 640 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\">\n              <rect x=\"0\" y=\"250\" width=\"640\" height=\"110\" fill=\"#bbf7d0\"></rect>\n              <rect x=\"40\" y=\"270\" width=\"560\" height=\"24\" rx=\"6\" fill=\"#86efac\"></rect>\n              <g fill=\"#10b981\">\n                <circle cx=\"95\" cy=\"210\" r=\"24\"></circle>\n                <rect x=\"92\" y=\"210\" width=\"6\" height=\"40\" fill=\"#047857\"></rect>\n                <circle cx=\"150\" cy=\"200\" r=\"28\"></circle>\n                <rect x=\"147\" y=\"200\" width=\"6\" height=\"50\" fill=\"#047857\"></rect>\n              </g>\n              <g>\n                <rect x=\"360\" y=\"245\" width=\"120\" height=\"40\" rx=\"6\" fill=\"#111827\"></rect>\n                <rect x=\"390\" y=\"220\" width=\"72\" height=\"28\" rx=\"6\" fill=\"#111827\"></rect>\n                <circle cx=\"388\" cy=\"290\" r=\"16\" fill=\"#374151\"></circle>\n                <circle cx=\"453\" cy=\"290\" r=\"16\" fill=\"#374151\"></circle>\n                <rect x=\"480\" y=\"252\" width=\"60\" height=\"20\" rx=\"3\" fill=\"#6b7280\"></rect>\n              </g>\n              <circle cx=\"560\" cy=\"70\" r=\"28\" fill=\"#fde68a\"></circle>\n            </svg>\n          </div>\n        </div>\n\n        <div class=\"grid-3\" style=\"margin-top:12px;\">\n          <div class=\"result\">\n            <div class=\"label\" style=\"font-size:12px;letter-spacing:.08em;color:#065f46;font-weight:800;text-transform:uppercase;\">Work Cost</div>\n            <div id=\"workcost\"><span class=\"muted\">Depends on acres, terrain &amp; density.</span></div>\n          </div>\n          <div class=\"result\">\n            <div class=\"label\" style=\"font-size:12px;letter-spacing:.08em;color:#065f46;font-weight:800;text-transform:uppercase;\">Mobilization</div>\n            <div id=\"mobiz\"><span class=\"muted\">Enter ZIP.</span></div>\n          </div>\n          <div class=\"result\">\n            <div class=\"label\" style=\"font-size:12px;letter-spacing:.08em;color:#065f46;font-weight:800;text-transform:uppercase;\">Add-Ons</div>\n            <div id=\"addonsBox\"><span class=\"muted\">Select add-ons to see cost.</span></div>\n          </div>\n        </div>\n\n        <div class=\"fine\" style=\"margin-top:8px;\">These are ballpark estimates only — <strong>not a final bid</strong>. A site visit or satellite review is required for a firm quote. Add-ons like hauling and burns may require permits, disposal fees, and suitable weather; final pricing can change.</div>\n      </section>\n    </div>\n\n    <div class=\"fm-footer\">\n      <div class=\"actions\">\n        <button class=\"btn secondary\" id=\"prevBtn\" type=\"button\">← Back</button>\n        <button class=\"btn\" id=\"nextBtn\" type=\"button\">Next →</button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Hidden FormSubmit form + iframe (non-Webflow) -->\n  <form id=\"leadForm\" action=\"https://formsubmit.co/austin@improveitmd.com\" method=\"POST\" target=\"fs_iframe\" style=\"position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;\">\n    <input type=\"hidden\" name=\"_subject\" value=\"New Forestry Mulching Quote Lead\">\n    <input type=\"hidden\" name=\"_template\" value=\"table\">\n    <input type=\"hidden\" name=\"_captcha\" value=\"false\">\n    <input type=\"hidden\" name=\"_next\" value=\"about:blank\">\n    <input type=\"hidden\" name=\"source\" value=\"Webflow Quote Tool\">\n    <input type=\"hidden\" name=\"page_url\">\n    <input type=\"hidden\" name=\"timestamp\">\n    <input type=\"hidden\" name=\"name\">\n    <input type=\"hidden\" name=\"phone\">\n    <input type=\"hidden\" name=\"zip\">\n    <input type=\"hidden\" name=\"state\">\n    <input type=\"hidden\" name=\"service\">\n    <input type=\"hidden\" name=\"acres\">\n    <input type=\"hidden\" name=\"terrain\">\n    <input type=\"hidden\" name=\"density\">\n    <input type=\"hidden\" name=\"haul\">\n    <input type=\"hidden\" name=\"burn\">\n    <input type=\"hidden\" name=\"stumps\">\n    <input type=\"hidden\" name=\"mobilization_miles_one_way\">\n    <input type=\"hidden\" name=\"mobilization_fee\">\n    <input type=\"hidden\" name=\"work_cost\">\n    <input type=\"hidden\" name=\"addons_cost\">\n    <input type=\"hidden\" name=\"est_min\">\n    <input type=\"hidden\" name=\"est_mid\">\n    <input type=\"hidden\" name=\"est_max\">\n  </form>\n  <iframe id=\"fs_iframe\" name=\"fs_iframe\" style=\"display:none;\"></iframe>\n\n  <script>\n    const CONFIG = {\n      baseRatePerAcre: { land: 3500, brush: 2000, row: 2300, storm: 4000, custom: 3000 },\n      pricingAdjustmentPercent: 0,\n      minimumCharge: 1500,\n      terrainMult: { flat: 1.0, moderate: 1.15, hilly: 1.35 },\n      densityMult: { light: 0.85, medium: 1.0, heavy: 1.4, veryheavy: 1.8 },\n      acreageDiscounts: [\n        { min: 0, max: 1, discount: 0 },\n        { min: 1, max: 2, discount: 0 },\n        { min: 2, max: 5, discount: 0.05 },\n        { min: 5, max: 10, discount: 0.10 },\n        { min: 10, max: 999, discount: 0.15 }\n      ],\n      costPerMile: 1.75,               // roundtrip $/mile\n      baseLat: 38.811, baseLon: -76.640, roadFactor: 1.28, // origin: 20711\n      stateFallbackMiles: { MD: 50, VA: 150, NC: 300 },\n      milesByZip: { '21401': 10, '21061': 5, '20772': 25, '20711': 0 },\n      zipCentroids: {\n        '20711': { lat: 38.8110, lon: -76.6400 },\n        '21401': { lat: 38.9784, lon: -76.4922 },\n        '21061': { lat: 39.1640, lon: -76.6305 },\n        '20772': { lat: 38.8159, lon: -76.7500 }\n      },\n      addOns: { stump: { unitPrice: 75 }, haul: { pricePerAcre: 600 }, burn: { pricePerAcre: 300 } },\n      rangeBand: 0.12,\n      quoteEndpoint: 'https://www.improveitmd.com/quote',\n      quoteParamsBase: { page_referrer: 'home' }\n    };\n\n    const $ = id => document.getElementById(id);\n    const digits = s => String(s||'').replace(/\\D+/g,'');\n    const validPhone = p => digits(p).length >= 10;\n\n    function deriveStateFromZip(zip){\n      const z = digits(zip||''); if(z.length < 5) return null; const p = parseInt(z.slice(0,3),10);\n      if(p>=206 && p<=219) return 'MD';\n      if(p===201 || (p>=220 && p<=246)) return 'VA';\n      if(p>=270 && p<=289) return 'NC';\n      return null;\n    }\n\n    function toRad(d){ return d*Math.PI/180; }\n    function haversineMiles(lat1, lon1, lat2, lon2){\n      const R=3958.7613; const dLat=toRad(lat2-lat1); const dLon=toRad(lon2-lon1);\n      const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;\n      return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));\n    }\n\n    function estimateMiles({zip}){\n      if(zip && CONFIG.milesByZip[zip]!=null) return CONFIG.milesByZip[zip];\n      const cent = CONFIG.zipCentroids[zip];\n      if(cent){ return Math.round(haversineMiles(CONFIG.baseLat, CONFIG.baseLon, cent.lat, cent.lon) * CONFIG.roadFactor); }\n      const st = deriveStateFromZip(zip);\n      if(st) return CONFIG.stateFallbackMiles[st] || 150;\n      return 150;\n    }\n\n    function acreageDiscount(acres){\n      for(const row of CONFIG.acreageDiscounts){\n        if(acres>=row.min && acres<row.max) return row.discount;\n      }\n      return 0;\n    }\n\n    // Service selection\n    let selectedService = 'land';\n    const svcContainer = $('services');\n    function selectServiceCard(card){\n      if(!card) return;\n      [...svcContainer.querySelectorAll('.service-card')].forEach(c=>{\n        c.classList.remove('selected'); c.setAttribute('aria-checked','false');\n      });\n      card.classList.add('selected'); card.setAttribute('aria-checked','true');\n      selectedService = card.getAttribute('data-value');\n    }\n    svcContainer.addEventListener('click', (e)=>{ const card = e.target.closest('.service-card'); if(card){ selectServiceCard(card); } });\n    svcContainer.addEventListener('keydown', (e)=>{ if((e.key==='Enter' || e.key===' ') && e.target.closest('.service-card')){ e.preventDefault(); selectServiceCard(e.target.closest('.service-card')); } });\n\n    function effectiveBase(service){ const base = CONFIG.baseRatePerAcre[service] || CONFIG.baseRatePerAcre.custom; return base * (1 + (CONFIG.pricingAdjustmentPercent||0)); }\n    function computeWorkCost({service, acres, terrain, density}){\n      const base = effectiveBase(service);\n      let work = base * (acres || 0) * (CONFIG.terrainMult[terrain]||1) * (CONFIG.densityMult[density]||1);\n      if(acres < 1){ work = Math.max(work, CONFIG.minimumCharge); }\n      return work * (1 - acreageDiscount(acres));\n    }\n    function computeMobilization({zip}){\n      const oneWay = estimateMiles({zip});\n      const travel = oneWay * 2 * CONFIG.costPerMile;\n      return { oneWay, total: travel };\n    }\n    function computeAddOns({acres, stumps, haul, burn}){\n      let total = 0; const parts = [];\n      if(stumps > 0){ const c = stumps * CONFIG.addOns.stump.unitPrice; total += c; parts.push(`Stump grinding (${stumps}): $${c.toLocaleString()}`); }\n      if(haul){ const c = (acres>0? acres:0) * CONFIG.addOns.haul.pricePerAcre; total += c; parts.push(`Hauling (${acres||0} ac): $${c.toLocaleString()}`); }\n      if(burn){ const c = (acres>0? acres:0) * CONFIG.addOns.burn.pricePerAcre; total += c; parts.push(`Burn services (${acres||0} ac): $${c.toLocaleString()}`); }\n      return { total, parts };\n    }\n    function computeTotal(work, mob, add){\n      const subtotal = work + mob.total + add.total;\n      const b = CONFIG.rangeBand;\n      return { min: subtotal*(1-b), mid: subtotal, max: subtotal*(1+b) };\n    }\n    function buildQuoteUrl(params){\n      const url=new URL(CONFIG.quoteEndpoint);\n      const all={...CONFIG.quoteParamsBase,...params};\n      for(const k in all){ if(all[k]!=null && String(all[k]).length) url.searchParams.set(k, all[k]); }\n      return url.toString();\n    }\n\n    // Lead capture + email\n    const lead = { name:'', phone:'' };\n    let ownerNotified = false;\n    let emailSent = false;\n    const fsIframe = document.getElementById('fs_iframe');\n    if(fsIframe){ fsIframe.addEventListener('load', ()=>{ emailSent = true; }); } // marks success after HTML form POST\n\n    function prepareLeadPayload(){\n      const zip=($('zip').value||'').trim();\n      const acres=parseFloat($('acres').value||'0');\n      const terrain=$('terrain').value;\n      const density=$('density').value;\n      const service=selectedService;\n      const haul=$('haul').checked;\n      const burn=$('burn').checked;\n      const stumps=parseInt($('stumps').value||'0',10);\n      const work=computeWorkCost({service, acres, terrain, density});\n      const mob=computeMobilization({zip});\n      const add=computeAddOns({acres, stumps, haul, burn});\n      const total=computeTotal(work, mob, add);\n      const dstate = deriveStateFromZip(zip) || '';\n      return {\n        _subject: 'New Forestry Mulching Quote Lead',\n        _template: 'table',\n        _captcha: 'false',\n        _next: 'about:blank',\n        source: 'Webflow Quote Tool',\n        page_url: location.href,\n        timestamp: new Date().toISOString(),\n        name: lead.name,\n        phone: lead.phone,\n        zip, state: dstate,\n        service, acres, terrain, density,\n        haul: haul ? 'yes' : 'no', burn: burn ? 'yes' : 'no', stumps,\n        mobilization_miles_one_way: mob.oneWay,\n        mobilization_fee: Math.round(mob.total),\n        work_cost: Math.round(work),\n        addons_cost: Math.round(add.total),\n        est_min: Math.round(total.min),\n        est_mid: Math.round(total.mid),\n        est_max: Math.round(total.max)\n      };\n    }\n\n    function submitLead(payload){\n      const form = document.getElementById('leadForm');\n      if(!form) return;\n      for(const k in payload){\n        let input = form.querySelector(`[name=\"${k}\"]`);\n        if(!input){ input = document.createElement('input'); input.type='hidden'; input.name=k; form.appendChild(input); }\n        input.value = String(payload[k] ?? '');\n      }\n      try { HTMLFormElement.prototype.submit.call(form); } catch(e){ console.warn('Hidden form submit failed', e); }\n    }\n\n    function notifyOwner(){\n      submitLead(prepareLeadPayload());\n      // Optional ultra-safe fallback: try sendBeacon if available and iframe doesn't load fast\n      setTimeout(()=>{\n        if(!emailSent && navigator.sendBeacon){\n          const data = new Blob([JSON.stringify(prepareLeadPayload())], {type:'application/json'});\n          navigator.sendBeacon('https://formsubmit.co/ajax/austin@improveitmd.com', data);\n        }\n      }, 1200);\n    }\n\n    // Multistep\n    let currentStep = 1;\n    function setStep(n){\n      currentStep = Math.max(1, Math.min(4, n));\n      document.querySelectorAll('.step-pane').forEach((el,i)=>{ el.classList.toggle('active', (i+1)===currentStep); });\n      document.querySelectorAll('.steps .step').forEach(s=>{ s.classList.toggle('active', Number(s.getAttribute('data-step'))===currentStep); });\n      $('prevBtn').style.visibility = currentStep>1 ? 'visible' : 'hidden';\n      $('nextBtn').textContent = currentStep<4 ? 'Next →' : 'Recalculate';\n    }\n\n    function recalc(){\n      const zip=($('zip').value||'').trim();\n      const dstate = deriveStateFromZip(zip) || '';\n      const acres=parseFloat($('acres').value||'0');\n      const terrain=$('terrain').value;\n      const density=$('density').value;\n      const service=selectedService;\n      const haul=$('haul').checked;\n      const burn=$('burn').checked;\n      const stumps=parseInt($('stumps').value||'0',10);\n\n      const contactOK = !!(lead.name && validPhone(lead.phone));\n\n      const work=computeWorkCost({service, acres, terrain, density});\n      $('workcost').innerHTML = work>0 ? `<div><span class=\"badge\">$${work.toLocaleString()}</span></div>` : '<span class=\"muted\">Enter acres</span>';\n\n      const mob=computeMobilization({zip});\n      $('mobiz').innerHTML = `<div><strong>Mobilization:</strong> $${mob.total.toLocaleString()}</div><div class=\"muted\">Est. ${mob.oneWay} mi one-way</div>`;\n\n      const add=computeAddOns({acres, stumps, haul, burn});\n      $('addonsBox').innerHTML = add.total>0\n        ? `<div style=\"display:flex; justify-content:space-between; gap:8px; align-items:flex-start;\"><div>${add.parts.join('<br/>')}</div><div class=\"badge\">$${add.total.toLocaleString()}</div></div>`\n        : '<span class=\"muted\">No add-ons selected.</span>';\n\n      const total=computeTotal(work, mob, add);\n      if(work>0 && contactOK){\n        $('rangeDisplay').textContent = `$${Math.round(total.min).toLocaleString()} – $${Math.round(total.max).toLocaleString()}`;\n        $('rangeMid').textContent = `Mid: $${Math.round(total.mid).toLocaleString()}`;\n        const svcLabels = { land:'Land Clearing', brush:'Brush & Underbrush', row:'Trail / Right-of-Way', storm:'Storm Damage & Debris', custom:'Custom / Other' };\n        $('chipService').textContent = svcLabels[service] || 'Service';\n        $('chipSize').textContent = `${(acres||0)} ac • ${density} • ${terrain}`;\n        $('chipLoc').textContent = `${dstate ? dstate+' ' : ''}${zip}`;\n      } else {\n        $('rangeDisplay').textContent = 'Complete previous steps to see your range.';\n        $('rangeMid').textContent = '';\n        $('chipService').textContent = 'Service';\n        $('chipSize').textContent = 'Acreage • Density • Terrain';\n        $('chipLoc').textContent = 'ZIP';\n      }\n\n      const canSend = contactOK && zip.length===5 && acres>0;\n      const btnTop = $('reqquoteTop');\n      if(canSend){\n        const qp = { name: lead.name, phone: lead.phone, address: '', service, state: dstate, zip, acres, terrain, density, haul: haul?1:0, burn: burn?1:0, stumps: stumps||0, est_min: Math.round(total.min), est_mid: Math.round(total.mid), est_max: Math.round(total.max) };\n        const url = buildQuoteUrl(qp);\n        btnTop.href = url; btnTop.setAttribute('aria-disabled','false');\n      } else {\n        btnTop.href='#'; btnTop.setAttribute('aria-disabled','true');\n      }\n    }\n\n    // Buttons\n    $('nextBtn').addEventListener('click', ()=>{\n      if(currentStep===1){\n        const z = ($('zip').value||'').trim();\n        if(z.length!==5){ alert('Please enter a 5-digit ZIP within MD, VA, or NC.'); return; }\n        const autoState = deriveStateFromZip(z);\n        if(!autoState){ alert('That ZIP appears outside our service area (MD, VA, NC).'); return; }\n        setStep(2); return;\n      }\n      if(currentStep===2){\n        const acres=parseFloat($('acres').value||'0');\n        if(!(acres>0)){ alert('Please enter acreage to continue.'); return; }\n        setStep(3); return;\n      }\n      if(currentStep===3){\n        const n = ($('igName').value||'').trim(); const p = ($('igPhone').value||'').trim();\n        if(!n || !validPhone(p)){ alert('Please enter your name and a valid phone number.'); return; }\n        lead.name = n; lead.phone = p;\n        if(!ownerNotified){ ownerNotified = true; notifyOwner(); }\n        setStep(4); recalc(); return;\n      }\n      if(currentStep===4){ setStep(2); return; } // Recalculate → Step 2\n    });\n    $('prevBtn').addEventListener('click', ()=> setStep(currentStep-1));\n\n    // Live recalc on step 4 changes\n    ['zip','acres','terrain','density','haul','burn','stumps'].forEach(id=>{\n      const el = document.getElementById(id); if(!el) return;\n      el.addEventListener('input', ()=>{ if(currentStep===4) recalc(); });\n    });\n\n    // Backup: send on CTA click if not already sent\n    $('reqquoteTop').addEventListener('click', ()=>{ if(!ownerNotified){ ownerNotified = true; notifyOwner(); } });\n\n    // Init\n    setStep(1);\n  </script>\n</div>"}
className={`w-html-embed`} />
</div>
</div>
</div>
<section
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 c1u2ofx5 cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 cv9l525 cvzj4vi c1t9puix c1784h8b c135vs31 c1ypbuo2 c19p1lxn cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c8rh0h1 c13g3obg c1m1w9fz c1sy7qlo c1s19qlc crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Areas We Serve"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Proudly serving MD, VA, DC, and NC with licensed and insured forestry mulching services."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"MD Lic. #130628"}
{""}
<br />
{""}
{"DC Lic. #410519000037"}
{""}
<br />
{""}
{"VA Lic. #2705191231"}
{""}
<br />
{""}
{"NC Lic. #106653"}
</p>
</div>
<div
className={`w-element c139pwc6 cjhysm8 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1766961254_SERVICE_AREA_c1uolz_63b52f2d33.jpg"}
width={960}
height={1034}
alt={"Roofer being trained by Mule-Hide flat roof technician "}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 cjhysm8 cjkauba c13g3obg c15vs04h c1k50foq cknnq3k`} />
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 c1u2ofx5 cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 c84g20g cvzj4vi c1t9puix c1784h8b c135vs31 c1ypbuo2 c19p1lxn cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c8rh0h1 c13g3obg c1m1w9fz c1sy7qlo c1s19qlc crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Services We Offer"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
<b
className={`w-element`}>
{"🌲 Forestry Mulching "}
</b>
{"– Removes trees, brush, and vegetation in one pass—no hauling required."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"‍"}
<b
className={`w-element`}>
{"🪚 Lot & Land Clearing "}
</b>
{"– Ideal for builders, real estate prep, or agricultural use."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"‍"}
<b
className={`w-element`}>
{"🌪️ Storm Damage Cleanup "}
</b>
{"– Emergency removal of downed trees and debris after hurricanes or windstorms."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<b
className={`w-element`}>
{"🌿 Underbrush & Invasive Species Removal "}
</b>
{"– Reclaim usable land while preserving soil."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<b
className={`w-element`}>
{"🚜 Trail, Path, and Right-of-Way Clearing "}
</b>
{"– Maintain access roads, fence lines, utility paths."}
</p>
</div>
<div
className={`w-element c139pwc6 cjhysm8 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/Chat_GPT_Image_Aug_6_2025_10_53_34_PM_PKI_Fk_Ym_BY_2_F_8duqr_Ik5_7eec060e08.png"}
width={1536}
height={1024}
alt={"Foresting mulching"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 cjhysm8 cjkauba c13g3obg c15vs04h c1k50foq cknnq3k`} />
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element c1ogwt2d`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 c1u2ofx5 cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 cv9l525 cvzj4vi c1t9puix c1784h8b c135vs31 c1ypbuo2 c19p1lxn cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c8rh0h1 c13g3obg c1m1w9fz c1sy7qlo c1s19qlc crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"⚠️ Need Storm Cleanup Fast?"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We're equipped and ready for emergency debris removal. Skip the wait—we bring the equipment and the team to your property fast."}
</p>
<Link
href={"tel:2403511470"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx c17rwy3n c1603wqb c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s`}>
<span
className={`w-element`}>
{"Text or Call Me at (240) 351-1470"}
</span>
<HtmlEmbed
code={"<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.18182 11.9205L5.01136 10.7614L8.51705 7.25568H0V5.5625H8.51705L5.01136 2.0625L6.18182 0.897727L11.6932 6.40909L6.18182 11.9205Z\" fill=\"#00192E\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
</div>
<div
className={`w-element c139pwc6 cjhysm8 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/ci_storm_map_1_LAH_T_9a_H_Mr_FS_Ifafib_43e525db09.svg"}
width={320}
height={436}
alt={""}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 cjhysm8 cjkauba c13g3obg c15vs04h c1k50foq cknnq3k`} />
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element c1f8uhde`}>
<div
className={`w-element c4vc9qx c9tjkc5 ca0yaa4 csaaful c7iyr7r cmpwmbp cohupba c16dsrv cv6cudx ch9p0fl`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c1sq4bmy crfoyae c1hlt0za`}>
<div
className={`w-element c139pwc6 cwtw5f8`}>
<h2
className={`w-element c92kv7i c19fqb9a c1cxkcjg cn7k83s c1lwn44j c1fjww6l c1lvj0n c1emvlx`}>
<b
className={`w-element`}>
{"💬 Ready to Clear Your Land? "}
</b>
{"Call or Text 240-351-1470."}
</h2>
</div>
</div>
</div>
</div>
</section>
</Box>
<HtmlEmbed
code={"<script type=\"module\">\nconst urlParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());\ndocument.querySelectorAll('[prefill-param]').forEach(inputElement => {\n  const paramKey = inputElement.getAttribute('prefill-param');\n  if (paramKey && urlParams[paramKey]) {\n    inputElement.value = urlParams[paramKey];\n  }\n});\n</script>"}
className={`w-html-embed`} />
</Box>
</Body>
}


      export { Page }
    