/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text, Box as Box, Slot as Slot, Input as Input } from "@webstudio-is/sdk-components-react";
import { Link as Link, Link as Link_1, Body as Body, RemixForm as RemixForm, Form as Form } from "@webstudio-is/sdk-components-react-router";
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
const system = _props.system;
let [formState, set$formState] = useVariableState<any>("initial")
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
className={`w-element c1pnp6sy c1epvuph c1rgmp2 cqrpm5z`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s cc9ojx c1sjfwqi c139pwc6 c1msq9px c5ftqtp c1ux94pn c1epvuph c1edz3f7`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c18hkk31 c1dhbsa2`}>
<p
className={`w-element c1gcrf2e ce6x08i c1lvj0n c1pjr8f c1kqoumg cqvhq7s`}>
{"A holistic approach to pest control"}
</p>
<h1
className={`w-element c1r3nuqs c1ihu3w4 c1lvj0n c1tdj1xa c1yzjm0o ce6x08i c4c2xkh`}>
{"Managing Pests Sustainably"}
</h1>
</div>
<p
className={`w-element cn5qs21 c1b2b7rn c1lvj0n c1g3mhtg c13bl3hn`}>
{"Integrated Pest Management (IPM) combines biological, cultural, and chemical practices to manage pests effectively while minimizing environmental impact. This approach promotes the use of natural predators and resistant crop varieties."}
</p>
<RemixForm
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element`}>
<div
className={`w-element c1numhkq c1gai7u9 ci18zyn c1pw0a7u c1wmyomx c1350r63 c1l89g9c`}>
<Input
name={"Name"}
placeholder={"First name"}
type={"text"}
required={true}
autoComplete={"name"}
className={`w-element crv3s27 c73a05r csqiyoq c1d8rs8t cvfl1ur c2yws97 c1qporyx c1n5kit4 cb5io3 ccyk6v6 c14dduqk c1rkvowt c5sm30w c1u0ihi0 crmy72m c1q789z0 cix4cc0 cw8j8n1`} />
<Input
name={"Phone Number"}
placeholder={"Phone number"}
type={"tel"}
required={true}
autoComplete={"tel"}
className={`w-element crv3s27 c73a05r csqiyoq c1d8rs8t cvfl1ur c2yws97 c1qporyx c1n5kit4 cb5io3 ccyk6v6 c14dduqk c1rkvowt c5sm30w c1u0ihi0 crmy72m c1q789z0 cix4cc0 cw8j8n1`} />
<Input
name={"UTM Keyword 4"}
type={"hidden"}
required={true}
id={"UTM-Keyword-4"}
prefill-param={"utm_keyword"}
className={`w-element crv3s27 c73a05r csqiyoq c1d8rs8t cvfl1ur c2yws97 c1qporyx c1n5kit4 cb5io3 ccyk6v6 c14dduqk c1rkvowt c9b9vw4 cg961le`} />
<HtmlEmbed
code={"<input type='hidden' name='Page slug' value='" + (system?.pathname || "") + "'>"}
className={`w-html-embed`} />
<button
type={"submit"}
className={`w-element c1lvj0n c1t6vvls cpxswal cacmu18 crv3s27 c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w cn7k83s c1d8rs8t c7igqzz c1kpks3o c1owcyig c1wzdku csubbc2 ccmxen3 c1obobqc c1wygun7 cklylkh ccmjg3u cs7fyoi c165ti52 c1ak0qqx c13qspjq c1cqma02 c1jvw4nv c1yhof13 c8d36da cahz6x0 cmchden c1y5uzmj cl4dpup c5g53jj cba5e3y cw8j8n1 celyf79 c15vsij5 ctsgeyf coc0ri1`}>
{"Get Free Quote"}
</button>
</div>
<div
className={`w-element c1oowk3p c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au cdr1ysj c9te4zd ca17eyv ${"form-success"}`}>
<p
className={`w-element c1p4xat6`}>
{"Thank you! Your submission has been received!"}
</p>
</div>
<div
className={`w-element clif6a6 c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au cdr1ysj c9te4zd ca17eyv ${"form-error"}`}>
<p
className={`w-element c1p4xat6`}>
{"Oops! Something went wrong while submitting the form."}
</p>
</div>
<Slot>
<HtmlEmbed
code={"<script>\ndocument.addEventListener(\n  \"submit\",\n  async function (e) {\n    const form = e.target;\n    if (!form.matches(\"[data-api-endpoint]\")) return;\n    // 🔑 Block Webstudio's default submit\n    e.preventDefault();\n    e.stopImmediatePropagation();\n    const endpoint = form.dataset.apiEndpoint;\n    const success = form.querySelector(\".form-success\");\n    const error = form.querySelector(\".form-error\");\n    const submitBtn = form.querySelector(\"[type='submit']\");\n    success?.classList.remove(\"is--visible\");\n    error?.classList.remove(\"is--visible\");\n    submitBtn?.setAttribute(\"disabled\", \"true\");\n    const formData = new FormData(form);\n    try {\n      if (!endpoint || endpoint === \"placeholder\") {\n        await new Promise(resolve => setTimeout(resolve, 600));\n      } else {\n        // Convert FormData to JSON object\n        const formDataObj = {};\n        for (let [key, value] of formData.entries()) {\n          formDataObj[key] = value;\n        }\n        \n        const response = await fetch(endpoint, {\n          method: \"POST\",\n          headers: {\n            'Content-Type': 'application/json',\n            'Origin': window.location.origin\n          },\n          body: JSON.stringify(formDataObj)\n        });\n        if (!response.ok) throw new Error(\"Request failed\");\n      }\n      form.reset();\n      success?.classList.add(\"is--visible\");\n      success?.focus();\n      // 🔹 Hide success message after 1500ms\n      setTimeout(() => {\n        success?.classList.remove(\"is--visible\");\n      }, 1500);\n    } catch (err) {\n      error?.classList.add(\"is--visible\");\n      console.error(err);\n    } finally {\n      submitBtn?.removeAttribute(\"disabled\");\n    }\n  },\n  true // 🔑 capture phase — DO NOT REMOVE\n);\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Slot>
</RemixForm>
<p
className={`w-element cn5qs21 c1b2b7rn c1lvj0n c1g3mhtg c13bl3hn`}>
{"Our calls are friendly, brief, and focused on serving you."}
</p>
</div>
</div>
</div>
</section>
<div
className={`w-element c1x5x5gp`}>
<HtmlEmbed
code={"<script src=\"https://cdn.tailwindcss.com\"></script>\n\n  <script>\n    tailwind.config = {\n      theme: {\n        extend: {\n          animation: {\n            'spin': 'spin 0.8s linear infinite',\n            'skeleton': 'skeleton 1.4s infinite ease',\n            'fade-in': 'fadeIn 0.3s ease-in-out',\n            'slide-up': 'slideUp 0.3s ease-out'\n          },\n          keyframes: {\n            skeleton: {\n              '0%': { backgroundPosition: '100% 50%' },\n              '100%': { backgroundPosition: '0 50%' }\n            },\n            fadeIn: {\n              '0%': { opacity: '0' },\n              '100%': { opacity: '1' }\n            },\n            slideUp: {\n              '0%': { transform: 'translateY(10px)', opacity: '0' },\n              '100%': { transform: 'translateY(0)', opacity: '1' }\n            }\n          }\n        }\n      }\n    }\n  </script>\n\n<div id=\"cash-offer-mount\"></div>\n  \n <script>\n(() => {\n  class CashOfferWidget extends HTMLElement {\n    constructor() {\n      super();\n      this.config = {\n        attom: {\n          baseUrl: 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile',\n          apiKey: 'b85343b5943dcc6079dcec580100ff32',\n          timeout: 10000\n        },\n        cache: {\n          ttl: 24 * 60 * 60 * 1000,\n          keyPrefix: 'attom_property_',\n          maxRetries: 2\n        },\n        defaults: {\n          offerFraction: 0.70,\n          closeDays: 14,\n          agentCommission: 7,\n          sellerConcessions: 3,\n          closingCosts: 1.5,\n          repairs: 12500,\n          holdingDays: 120,\n          monthlyBurn: 850,\n          staging: 1800\n        }\n      };\n      this.state = {\n        assessed: null,\n        source: 'assessed',\n        market: null,\n        estimated: null,\n        cashOffer: null,\n        agentNet: null,\n        isLoading: false\n      };\n    }\n\n    connectedCallback() {\n      const root = this.attachShadow({ mode: 'open' });\n      root.innerHTML = this.getTemplate();\n      this.initializeElements(root);\n      this.bindEvents();\n      this.populateStates();\n      this.loadFromLocalStorage();\n    }\n\n    getTemplate() {\n      return `\n        <link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\">\n        <style>\n          .skeleton {\n            background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);\n            animation: skeleton 1.4s infinite ease;\n            background-size: 400% 100%;\n          }\n          @keyframes skeleton {\n            0% { background-position: 100% 50%; }\n            100% { background-position: 0 50%; }\n          }\n          .loading-spinner::after {\n            content: \"\";\n            position: absolute;\n            right: 12px;\n            width: 16px;\n            height: 16px;\n            border: 2px solid transparent;\n            border-top: 2px solid currentColor;\n            border-radius: 50%;\n            animation: spin 0.8s linear infinite;\n          }\n          @keyframes spin {\n            to { transform: rotate(360deg); }\n          }\n        </style>\n\n        <div class=\"max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-gray-900\">\n          <div class=\"grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8\">\n            <!-- Main Content -->\n            <div class=\"lg:col-span-2\">\n              <div class=\"bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden\">\n                <div class=\"p-6 sm:p-8\">\n                  <!-- Header -->\n                  <div class=\"mb-6\">\n                    <div class=\"inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold mb-4\">\n                      <svg class=\"w-4 h-4 mr-2 text-green-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                        <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path>\n                      </svg>\n                      Fast Cash • No Fees • Close in <span id=\"closeDaysLabel\">14</span> Days\n                    </div>\n                    <h1 class=\"text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3\">\n                      Get Your Instant Cash Offer\n                    </h1>\n                    <p class=\"text-lg text-gray-600 leading-relaxed\">\n                      Enter your property details. We'll calculate a fair cash offer based on your assessed value and show why cash beats listing with an agent.\n                    </p>\n                  </div>\n\n                  <!-- Step 1: Property Details -->\n                  <div id=\"step1\" class=\"step space-y-6\">\n                    <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                      <div class=\"space-y-2\">\n                        <label for=\"addr1\" class=\"block text-sm font-semibold text-gray-700\">Street Address</label>\n                        <input id=\"addr1\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base\" placeholder=\"123 Main St\" required autocomplete=\"address-line1\">\n                        <div id=\"addr1-error\" class=\"error-message hidden text-red-600 text-sm\" role=\"alert\"></div>\n                      </div>\n                      <div class=\"space-y-2\">\n                        <label for=\"city\" class=\"block text-sm font-semibold text-gray-700\">City</label>\n                        <input id=\"city\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base\" placeholder=\"City\" required autocomplete=\"address-level2\">\n                        <div id=\"city-error\" class=\"error-message hidden text-red-600 text-sm\" role=\"alert\"></div>\n                      </div>\n                    </div>\n\n                    <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                      <div class=\"space-y-2\">\n                        <label for=\"state\" class=\"block text-sm font-semibold text-gray-700\">State</label>\n                        <select id=\"state\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base bg-white\" required autocomplete=\"address-level1\">\n                          <option value=\"\" disabled selected>Select State</option>\n                        </select>\n                        <div id=\"state-error\" class=\"error-message hidden text-red-600 text-sm\" role=\"alert\"></div>\n                      </div>\n                      <div class=\"space-y-2\">\n                        <label for=\"zip\" class=\"block text-sm font-semibold text-gray-700\">ZIP Code</label>\n                        <input id=\"zip\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base\" inputmode=\"numeric\" pattern=\"^\\\\d{5}(-\\\\d{4})?$\" placeholder=\"12345\" required autocomplete=\"postal-code\">\n                        <div id=\"zip-error\" class=\"error-message hidden text-red-600 text-sm\" role=\"alert\"></div>\n                      </div>\n                    </div>\n\n                    <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                      <div class=\"space-y-2\">\n                        <label for=\"days\" class=\"block text-sm font-semibold text-gray-700\">Days to Close (Cash)</label>\n                        <select id=\"days\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base bg-white\">\n                          <option value=\"7\">7 days</option>\n                          <option value=\"14\" selected>14 days</option>\n                          <option value=\"21\">21 days</option>\n                          <option value=\"30\">30 days</option>\n                        </select>\n                      </div>\n                      <input id=\"offerPct\" type=\"hidden\" value=\"0.70\">\n                    </div>\n\n                    <button id=\"findVal\" class=\"w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-gray-300 relative\">\n                      <span class=\"btn-text\">Get My Cash Offer</span>\n                    </button>\n\n                    <div id=\"err1\" class=\"error-message hidden text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200\" role=\"alert\"></div>\n                    <div id=\"cache-info\" class=\"hidden text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-200\"></div>\n\n                    <!-- Manual Entry -->\n                    <details id=\"manualWrap\" class=\"bg-gray-50 rounded-xl p-4 border border-gray-200\">\n                      <summary class=\"cursor-pointer font-semibold text-gray-700 hover:text-gray-900 transition-colors\">Can't find it? Enter your assessed value manually</summary>\n                      <div class=\"mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                        <div class=\"space-y-2\">\n                          <label for=\"manualAssessed\" class=\"block text-sm font-semibold text-gray-700\">Current Assessed Value (USD)</label>\n                          <input id=\"manualAssessed\" class=\"w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base\" type=\"number\" min=\"0\" step=\"1000\" placeholder=\"e.g., 425000\">\n                          <p class=\"text-sm text-gray-600\">Enter your current assessed value to calculate your cash offer</p>\n                        </div>\n                        <div class=\"flex flex-col justify-end\">\n                          <button id=\"useManual\" class=\"bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200\">Calculate My Offer</button>\n                          <div id=\"findHelp\" class=\"hidden text-sm text-gray-600 mt-2\"></div>\n                        </div>\n                      </div>\n                    </details>\n\n                    <!-- Preview Results -->\n                    <div id=\"preResult\" class=\"hidden space-y-6 animate-fade-in\">\n                      <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4\">\n                        <div class=\"bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 text-center\">\n                          <div class=\"text-2xl sm:text-3xl font-black text-green-600\" id=\"cashOfferDisplayPre\">$—</div>\n                          <div class=\"text-sm text-green-700 font-medium mt-1\">\n                            Your Cash Offer\n                            <span class=\"inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-1\">based on assessed value</span>\n                          </div>\n                        </div>\n                        <div class=\"bg-gray-50 border border-gray-200 rounded-xl p-4 text-center\">\n                          <div class=\"text-2xl sm:text-3xl font-black text-gray-700\" id=\"marketDisplayPre\">$—</div>\n                          <div class=\"text-sm text-gray-600 font-medium mt-1\">Market/Estimate (if available)</div>\n                        </div>\n                        <div class=\"bg-blue-50 border border-blue-200 rounded-xl p-4 text-center\">\n                          <div class=\"text-2xl sm:text-3xl font-black text-blue-600\" id=\"speedDisplayPre\">14 days</div>\n                          <div class=\"text-sm text-blue-700 font-medium mt-1\">Typical Cash Close</div>\n                        </div>\n                      </div>\n                      <button id=\"toStep2\" class=\"w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02]\">\n                        See Cash vs Agent Comparison\n                      </button>\n                    </div>\n                  </div>\n\n                  <!-- Step 2: Comparison -->\n                  <div id=\"step2\" class=\"step hidden space-y-6 animate-slide-up\">\n                    <!-- KPI Cards -->\n                    <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-4\">\n                      <div class=\"bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 text-center relative overflow-hidden\">\n                        <div class=\"absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-full -mr-8 -mt-8 opacity-50\"></div>\n                        <div class=\"relative\">\n                          <div class=\"text-3xl sm:text-4xl font-black text-green-600 mb-2\" id=\"cashOfferDisplay\">$—</div>\n                          <div class=\"text-sm text-green-700 font-semibold\">\n                            Your Cash Offer\n                            <span class=\"block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1\">based on assessed value</span>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"hidden bg-gray-50 border border-gray-200 rounded-xl p-6 text-center\">\n                        <div class=\"text-3xl sm:text-4xl font-black text-gray-700 mb-2\" id=\"agentNetDisplay\">$—</div>\n                        <div class=\"text-sm text-gray-600 font-semibold\">\n                          You'd Net with an Agent\n                          <span class=\"block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1\">after all costs</span>\n                        </div>\n                      </div>\n                      <div class=\"hidden bg-red-50 border border-red-200 rounded-xl p-6 text-center\">\n                        <div class=\"text-3xl sm:text-4xl font-black text-red-600 mb-2\" id=\"savingsDisplay\">$—</div>\n                        <div class=\"text-sm text-red-700 font-semibold\">\n                          Cash Advantage\n                          <span class=\"block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1\">time + money saved</span>\n                        </div>\n                      </div>\n                    </div>\n\n                    <!-- Progress Bars -->\n                    <div class=\"space-y-4\">\n                      <div>\n                        <div class=\"flex justify-between items-center mb-2\">\n                          <span class=\"font-bold text-gray-700\">Cash in Hand</span>\n                          <span id=\"cashBarVal\" class=\"font-bold text-green-600\">$—</span>\n                        </div>\n                        <div class=\"w-full bg-gray-200 rounded-full h-4 overflow-hidden\">\n                          <div id=\"cashBar\" class=\"bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500 ease-out\" style=\"width: 0%\"></div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <!-- Timeline -->\n                    <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n                      <div class=\"bg-green-50 border border-green-200 rounded-xl p-4\">\n                        <div class=\"font-bold text-green-800 mb-1\">Cash Timeline:</div>\n                        <div class=\"text-green-700\"><span id=\"daysFast\">14</span> days → certainty, no showings</div>\n                      </div>\n                      <div class=\"bg-orange-50 border border-orange-200 rounded-xl p-4\">\n                        <div class=\"font-bold text-orange-800 mb-1\">Listing Timeline:</div>\n                        <div class=\"text-orange-700\"><span id=\"daysListLabel\">120</span> days typical → holding costs rack up</div>\n                      </div>\n                    </div>\n\n                    <!-- Detailed Breakdown -->\n                    <div class=\"bg-white border border-gray-200 rounded-xl p-6\">\n                      <h3 class=\"text-xl font-black text-gray-900 mb-4\">What do you really keep selling through a realtor? Is it worth the hassle?</h3>\n                      \n                      <details class=\"mb-6\">\n                        <summary class=\"cursor-pointer font-semibold text-gray-700 hover:text-gray-900 transition-colors mb-4\">Adjust Assumptions</summary>\n                        <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4\">\n                          <div class=\"space-y-2\">\n                            <label for=\"listPrice\" class=\"block text-sm font-semibold text-gray-700\">Expected Contract Price</label>\n                            <input id=\"listPrice\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" step=\"1000\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"feeAgent\" class=\"block text-sm font-semibold text-gray-700\">Agent Commission (%)</label>\n                            <input id=\"feeAgent\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" max=\"15\" step=\"0.1\" value=\"7\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"feeConcessions\" class=\"block text-sm font-semibold text-gray-700\">Seller Concessions (%)</label>\n                            <input id=\"feeConcessions\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" max=\"10\" step=\"0.1\" value=\"3\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"feeRepairs\" class=\"block text-sm font-semibold text-gray-700\">Repairs & Prep ($)</label>\n                            <input id=\"feeRepairs\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" step=\"100\" value=\"12500\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"feeClosing\" class=\"block text-sm font-semibold text-gray-700\">Closing Costs (%)</label>\n                            <input id=\"feeClosing\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" max=\"5\" step=\"0.1\" value=\"1.5\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"daysList\" class=\"block text-sm font-semibold text-gray-700\">Holding Time (days)</label>\n                            <input id=\"daysList\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" step=\"1\" value=\"120\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"holdingBurn\" class=\"block text-sm font-semibold text-gray-700\">Monthly Burn ($)</label>\n                            <input id=\"holdingBurn\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" step=\"50\" value=\"850\">\n                          </div>\n                          <div class=\"space-y-2\">\n                            <label for=\"feeStaging\" class=\"block text-sm font-semibold text-gray-700\">Staging/Cleaning ($)</label>\n                            <input id=\"feeStaging\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm\" type=\"number\" min=\"0\" step=\"50\" value=\"1800\">\n                          </div>\n                        </div>\n                        <button id=\"recalc\" class=\"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors\">Recalculate</button>\n                      </details>\n\n                      <!-- Cost Breakdown Table -->\n                      <div class=\"overflow-x-auto\">\n                        <table class=\"w-full border-collapse\">\n                          <thead>\n                            <tr class=\"border-b-2 border-gray-200\">\n                              <th class=\"text-left py-3 px-2 font-bold text-gray-700\">Line Item</th>\n                              <th class=\"text-right py-3 px-2 font-bold text-gray-700\">Amount</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"lineItems\" class=\"divide-y divide-gray-100\"></tbody>\n                          <tfoot class=\"border-t-2 border-gray-200\">\n                            <tr>\n                              <th class=\"text-left py-3 px-2 font-bold text-gray-900\">Total Costs</th>\n                              <th id=\"totalCosts\" class=\"text-right py-3 px-2 font-bold text-red-600\">$—</th>\n                            </tr>\n                            <tr>\n                              <th class=\"text-left py-3 px-2 font-bold text-gray-900\">Net to Seller (Agent)</th>\n                              <th id=\"netAgent\" class=\"text-right py-3 px-2 font-bold text-green-600\">$—</th>\n                            </tr>\n                          </tfoot>\n                        </table>\n                      </div>\n                      <p class=\"text-sm text-gray-600 mt-4 leading-relaxed\">These are realistic higher-end costs to show the true expense of traditional selling. Actual costs may vary.</p>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- Sidebar -->\n            <div class=\"lg:col-span-1\">\n              <div class=\"bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6\">\n                <h2 class=\"text-xl font-black text-gray-900 mb-4\">Why sellers choose cash</h2>\n                <ul class=\"space-y-3 mb-6\">\n                  <li class=\"flex items-start\">\n                    <svg class=\"w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                      <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path>\n                    </svg>\n                    <span class=\"font-semibold text-gray-700\">No fees or commissions</span>\n                  </li>\n                  <li class=\"flex items-start\">\n                    <svg class=\"w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                      <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path>\n                    </svg>\n                    <span class=\"font-semibold text-gray-700\"><strong>As-is</strong> (skip repairs and showings)</span>\n                  </li>\n                  <li class=\"flex items-start\">\n                    <svg class=\"w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                      <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path>\n                    </svg>\n                    <span class=\"font-semibold text-gray-700\"><strong>You pick the date</strong> (as fast as <span id=\"closeDaysCopy\">14</span> days)</span>\n                  </li>\n                  <li class=\"flex items-start\">\n                    <svg class=\"w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                      <path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z\" clip-rule=\"evenodd\"></path>\n                    </svg>\n                    <span class=\"font-semibold text-gray-700\"><strong>Certainty</strong> (no financing fall-throughs)</span>\n                  </li>\n                </ul>\n                \n                <div class=\"bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6\">\n                  <div class=\"text-sm font-bold text-blue-700 mb-2\">Next Step</div>\n                  <h3 class=\"text-lg font-black text-blue-900 mb-2\">Lock your firm cash offer</h3>\n                  <p class=\"text-blue-700 text-sm mb-4\">We'll confirm details and schedule a quick walk-through.</p>\n                  <a href=\"/contact\" class=\"block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-center transition-all duration-200 transform hover:scale-[1.02]\">\n                    Request an Inspection\n                  </a>\n                </div>\n                \n                <p class=\"text-xs text-gray-500 mt-4 text-center\">Estimates only. Not a commitment to purchase.</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      `;\n    }\n\n    initializeElements(root) {\n      this.$ = (sel) => root.querySelector(sel);\n      this.$$ = (sel) => root.querySelectorAll(sel);\n    }\n\n    generateCacheKey(address1, city, state, zip) {\n      const normalized = `${address1}_${city}_${state}_${zip}`\n        .toLowerCase()\n        .replace(/[^a-z0-9]/g, '_')\n        .replace(/_+/g, '_')\n        .replace(/^_|_$/g, '');\n      return `${this.config.cache.keyPrefix}${normalized}`;\n    }\n\n    getFromCache(cacheKey) {\n      try {\n        const cached = localStorage.getItem(cacheKey);\n        if (!cached) return null;\n\n        const { data, timestamp } = JSON.parse(cached);\n        const now = Date.now();\n        \n        if (now - timestamp > this.config.cache.ttl) {\n          localStorage.removeItem(cacheKey);\n          return null;\n        }\n\n        return { data, age: now - timestamp };\n      } catch (error) {\n        console.warn('Cache read error:', error);\n        return null;\n      }\n    }\n\n    setCache(cacheKey, data) {\n      try {\n        const cacheEntry = {\n          data,\n          timestamp: Date.now()\n        };\n        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));\n      } catch (error) {\n        console.warn('Cache write error:', error);\n        this.clearOldCache();\n      }\n    }\n\n    clearOldCache() {\n      try {\n        const keys = Object.keys(localStorage);\n        const now = Date.now();\n        keys.forEach(key => {\n          if (key.startsWith(this.config.cache.keyPrefix)) {\n            try {\n              const cached = JSON.parse(localStorage.getItem(key));\n              if (now - cached.timestamp > this.config.cache.ttl) {\n                localStorage.removeItem(key);\n              }\n            } catch (e) {\n              localStorage.removeItem(key);\n            }\n          }\n        });\n      } catch (error) {\n        console.warn('Cache cleanup error:', error);\n      }\n    }\n\n    saveFormState() {\n      try {\n        const formState = {\n          addr1: this.$('#addr1').value,\n          city: this.$('#city').value,\n          state: this.$('#state').value,\n          zip: this.$('#zip').value,\n          days: this.$('#days').value,\n          timestamp: Date.now()\n        };\n        localStorage.setItem('cash_offer_form_state', JSON.stringify(formState));\n      } catch (error) {\n        console.warn('Form state save error:', error);\n      }\n    }\n\n    loadFromLocalStorage() {\n      try {\n        const saved = localStorage.getItem('cash_offer_form_state');\n        if (!saved) return;\n\n        const { addr1, city, state, zip, days, timestamp } = JSON.parse(saved);\n        \n        if (Date.now() - timestamp < this.config.cache.ttl) {\n          if (addr1) this.$('#addr1').value = addr1;\n          if (city) this.$('#city').value = city;\n          if (state) this.$('#state').value = state;\n          if (zip) this.$('#zip').value = zip;\n          if (days) this.$('#days').value = days;\n        }\n      } catch (error) {\n        console.warn('Form state load error:', error);\n      }\n    }\n\n    money(n) {\n      return Number.isFinite(n) ? \n        n.toLocaleString(undefined, {style: 'currency', currency: 'USD', maximumFractionDigits: 0}) : \n        \"$—\";\n    }\n\n    toNum(v) {\n      const num = Number(v);\n      return Number.isFinite(num) ? Math.round(num) : null;\n    }\n\n    normStreet(s) {\n      return (s || \"\")\n        .replace(/\\s+/g, \" \")\n        .trim()\n        .replace(/\\s+(Apt\\.?|Apartment|Unit|#)\\s*[\\w-]+/i, '');\n    }\n\n    validateInput(value, type) {\n      switch(type) {\n        case 'address':\n          return value && value.trim().length >= 3;\n        case 'city':\n          return value && value.trim().length >= 2;\n        case 'state':\n          return value && value.length === 2;\n        case 'zip':\n          return value && /^\\d{5}(-\\d{4})?$/.test(value.trim());\n        default:\n          return true;\n      }\n    }\n\n    showFieldError(fieldId, message) {\n      const field = this.$(`#${fieldId}`);\n      const errorDiv = this.$(`#${fieldId}-error`);\n      \n      if (field) {\n        field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');\n        field.classList.remove('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');\n      }\n      if (errorDiv) {\n        errorDiv.textContent = message;\n        errorDiv.classList.remove('hidden');\n      }\n    }\n\n    clearFieldError(fieldId) {\n      const field = this.$(`#${fieldId}`);\n      const errorDiv = this.$(`#${fieldId}-error`);\n      \n      if (field) {\n        field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');\n        field.classList.add('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');\n      }\n      if (errorDiv) {\n        errorDiv.classList.add('hidden');\n      }\n    }\n\n    clearAllErrors() {\n      ['addr1', 'city', 'state', 'zip'].forEach(fieldId => {\n        this.clearFieldError(fieldId);\n      });\n      this.$('#err1').classList.add('hidden');\n    }\n\n    setLoading(isLoading) {\n      this.state.isLoading = isLoading;\n      const btn = this.$('#findVal');\n      const btnText = this.$('.btn-text');\n      \n      if (isLoading) {\n        btn.classList.add('loading-spinner', 'opacity-75', 'cursor-not-allowed');\n        btn.disabled = true;\n        btnText.textContent = 'Calculating Your Offer...';\n      } else {\n        btn.classList.remove('loading-spinner', 'opacity-75', 'cursor-not-allowed');\n        btn.disabled = false;\n        btnText.textContent = 'Get My Cash Offer';\n      }\n    }\n\n    async attomApiCall(address1, address2, retryCount = 0) {\n      const controller = new AbortController();\n      const timeoutId = setTimeout(() => controller.abort(), this.config.attom.timeout);\n\n      try {\n        const params = new URLSearchParams({\n          address1: address1.trim(),\n          address2: address2.trim()\n        });\n        \n        const response = await fetch(`${this.config.attom.baseUrl}?${params}`, {\n          headers: { \n            'Accept': 'application/json',\n            'apikey': this.config.attom.apiKey\n          },\n          signal: controller.signal\n        });\n        \n        clearTimeout(timeoutId);\n        \n        if (!response.ok) {\n          throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n        }\n        \n        const data = await response.json();\n        \n        if (!data?.property || !Array.isArray(data.property) || data.property.length === 0) {\n          return { ok: false, error: 'No property data found' };\n        }\n        \n        const property = data.property[0];\n        const assessment = property?.assessment;\n        \n        if (!assessment) {\n          return { ok: false, error: 'No assessment data available' };\n        }\n\n        const result = {\n          ok: true,\n          assessed: this.toNum(assessment.assessed?.assdTtlValue),\n          market: this.toNum(assessment.market?.mktTtlValue),\n          estimated: this.toNum(assessment.appraised?.apprTtlValue),\n          apn: property.identifier?.apn || null,\n          fips: property.identifier?.fips || null,\n          address_used: property.address?.oneLine || null,\n          source: 'attom'\n        };\n\n        return result;\n        \n      } catch (error) {\n        clearTimeout(timeoutId);\n        \n        if (error.name === 'AbortError') {\n          return { ok: false, error: 'Request timeout' };\n        }\n        \n        console.error('ATTOM API Error:', error);\n        console.error('Request details:', { address1, address2, retryCount });\n        console.error('Response status:', error.status || 'N/A');\n        \n        if (retryCount < this.config.cache.maxRetries) {\n          console.log(`Retrying API call (attempt ${retryCount + 2}/${this.config.cache.maxRetries + 1})...`);\n          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));\n          return this.attomApiCall(address1, address2, retryCount + 1);\n        }\n        \n        return { ok: false, error: error.message, details: { status: error.status, type: error.name } };\n      }\n    }\n\n    async lookupProperty(addr1, city, state, zip) {\n      const cacheKey = this.generateCacheKey(addr1, city, state, zip);\n      \n      const cached = this.getFromCache(cacheKey);\n      if (cached) {\n        const ageHours = Math.floor(cached.age / (1000 * 60 * 60));\n        this.$('#cache-info').innerHTML = `<span class=\"inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full\">Cached ${ageHours}h ago</span>`;\n        this.$('#cache-info').classList.remove('hidden');\n        return cached.data;\n      }\n\n      const address1 = this.normStreet(addr1);\n      const address2 = `${city}, ${state} ${zip}`;\n      \n      const result = await this.attomApiCall(address1, address2);\n      \n      if (result.ok) {\n        this.setCache(cacheKey, result);\n        this.$('#cache-info').classList.add('hidden');\n      }\n      \n      return result;\n    }\n\n    calculateCashOffer(assessed, fraction) {\n      return (!assessed || !isFinite(assessed)) ? null : Math.round(assessed * fraction);\n    }\n\n    calculateAgentNet(listPrice, config) {\n      const {\n        pctAgent = this.config.defaults.agentCommission,\n        pctConcessions = this.config.defaults.sellerConcessions,\n        pctClosing = this.config.defaults.closingCosts,\n        repairs = this.config.defaults.repairs,\n        daysHolding = this.config.defaults.holdingDays,\n        monthlyBurn = this.config.defaults.monthlyBurn,\n        staging = this.config.defaults.staging\n      } = config;\n\n      const feeAgent = listPrice * (pctAgent / 100);\n      const feeConcessions = listPrice * (pctConcessions / 100);\n      const feeClosing = listPrice * (pctClosing / 100);\n      const holdingCosts = (daysHolding / 30) * monthlyBurn;\n      \n      const totalCosts = feeAgent + feeConcessions + feeClosing + repairs + staging + holdingCosts;\n      const net = Math.max(0, listPrice - totalCosts);\n      \n      return {\n        net: Math.round(net),\n        totalCosts: Math.round(totalCosts),\n        lines: [\n          ['Agent commission', -feeAgent],\n          ['Seller concessions', -feeConcessions],\n          ['Closing costs', -feeClosing],\n          ['Repairs & prep', -repairs],\n          ['Staging/cleaning/photos', -staging],\n          [`Holding costs (${daysHolding} days)`, -holdingCosts]\n        ]\n      };\n    }\n\n    updateProgressBars(cashAmount, agentAmount) {\n      const maxAmount = Math.max(cashAmount || 0, agentAmount || 0, 1);\n      \n      const cashBar = this.$('#cashBar');\n      const cashBarVal = this.$('#cashBarVal');\n      \n      const cashPercent = (100 * (cashAmount || 0) / maxAmount);\n      \n      cashBar.style.width = cashPercent + '%';\n      cashBarVal.textContent = this.money(cashAmount);\n    }\n\n    populateLineItems(lines) {\n      const tbody = this.$('#lineItems');\n      tbody.innerHTML = '';\n      \n      lines.forEach(([label, amount]) => {\n        const row = document.createElement('tr');\n        const isNegative = amount < 0;\n        row.innerHTML = `\n          <td class=\"py-2 px-2 text-gray-700\">${label}</td>\n          <td class=\"py-2 px-2 text-right font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'}\">\n            ${isNegative ? '-' : ''}${this.money(Math.abs(amount))}\n          </td>\n        `;\n        tbody.appendChild(row);\n      });\n    }\n\n    recalculate() {\n      const assessed = this.state.assessed;\n      if (!assessed) return;\n\n      const offerFraction = parseFloat(this.$('#offerPct').value || this.config.defaults.offerFraction);\n      const cashOffer = this.calculateCashOffer(assessed, offerFraction);\n      this.state.cashOffer = cashOffer;\n\n      let listPrice = parseFloat(this.$('#listPrice').value);\n      if (!isFinite(listPrice)) {\n        // Use market value with 10% markup, or estimated with 15% markup, or assessed with 25% markup\n        if (this.state.market) {\n          listPrice = this.state.market * 1.10;\n        } else if (this.state.estimated) {\n          listPrice = this.state.estimated * 1.15;\n        } else {\n          listPrice = assessed * 1.25;\n        }\n        this.$('#listPrice').value = Math.round(listPrice || 0);\n      }\n\n      const agentConfig = {\n        pctAgent: parseFloat(this.$('#feeAgent').value || this.config.defaults.agentCommission),\n        pctConcessions: parseFloat(this.$('#feeConcessions').value || this.config.defaults.sellerConcessions),\n        pctClosing: parseFloat(this.$('#feeClosing').value || this.config.defaults.closingCosts),\n        repairs: parseFloat(this.$('#feeRepairs').value || this.config.defaults.repairs),\n        daysHolding: parseFloat(this.$('#daysList').value || this.config.defaults.holdingDays),\n        monthlyBurn: parseFloat(this.$('#holdingBurn').value || this.config.defaults.monthlyBurn),\n        staging: parseFloat(this.$('#feeStaging').value || this.config.defaults.staging)\n      };\n\n      const agentResult = this.calculateAgentNet(listPrice, agentConfig);\n      this.state.agentNet = agentResult.net;\n\n      const cashAdvantage = Math.max(0, cashOffer - agentResult.net);\n\n      this.$('#cashOfferDisplay').textContent = this.money(cashOffer);\n      this.$('#agentNetDisplay').textContent = this.money(agentResult.net);\n      this.$('#savingsDisplay').textContent = this.money(cashAdvantage);\n      this.$('#totalCosts').textContent = this.money(-agentResult.totalCosts);\n      this.$('#netAgent').textContent = this.money(agentResult.net);\n\n      this.populateLineItems(agentResult.lines);\n      this.updateProgressBars(cashOffer, agentResult.net);\n\n      this.$('#daysFast').textContent = this.$('#days').value;\n      this.$('#daysListLabel').textContent = this.$('#daysList').value;\n    }\n\n    populateStates() {\n      const states = [\n        \"MD\", \"WV\", \"PA\", \"VA\", \"NC\", \"SC\", \"TN\", \"GA\"\n      ];\n      \n      const stateSelect = this.$('#state');\n      states.forEach(state => {\n        const option = document.createElement('option');\n        option.value = state;\n        option.textContent = state;\n        stateSelect.appendChild(option);\n      });\n    }\n\n    showHelpInfo(stateCode) {\n      const helpEl = this.$('#findHelp');\n      if (!helpEl) return;\n\n      if (stateCode === 'MD') {\n        helpEl.innerHTML = 'Maryland: use the state\\'s <a href=\"https://sdat.dat.maryland.gov/\" target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 hover:text-blue-800 underline\">Real Property Search</a> to find your assessed value for an accurate cash offer.';\n      } else {\n        helpEl.textContent = 'Tip: search your county assessor/tax site for \"real property search\" or \"assessed value\" to get an accurate cash offer.';\n      }\n      helpEl.classList.remove('hidden');\n    }\n\n    async handlePropertyLookup() {\n      this.clearAllErrors();\n      \n      const addr1 = this.normStreet(this.$('#addr1').value || '');\n      const city = (this.$('#city').value || '').trim();\n      const state = (this.$('#state').value || '').trim();\n      const zip = (this.$('#zip').value || '').trim();\n\n      let hasErrors = false;\n      if (!this.validateInput(addr1, 'address')) {\n        this.showFieldError('addr1', 'Please enter a valid street address');\n        hasErrors = true;\n      }\n      if (!this.validateInput(city, 'city')) {\n        this.showFieldError('city', 'Please enter a valid city');\n        hasErrors = true;\n      }\n      if (!this.validateInput(state, 'state')) {\n        this.showFieldError('state', 'Please select a state');\n        hasErrors = true;\n      }\n      if (!this.validateInput(zip, 'zip')) {\n        this.showFieldError('zip', 'Please enter a valid ZIP code');\n        hasErrors = true;\n      }\n\n      if (hasErrors) return;\n\n      this.saveFormState();\n\n      this.setLoading(true);\n      this.$('#preResult').classList.remove('hidden');\n      this.$('#cashOfferDisplayPre').innerHTML = '<div class=\"skeleton h-8 rounded\"></div>';\n      this.$('#marketDisplayPre').innerHTML = '<div class=\"skeleton h-8 rounded\"></div>';\n      this.$('#speedDisplayPre').textContent = this.$('#days').value + ' days';\n\n      if (state) this.showHelpInfo(state);\n\n      try {\n        const data = await this.lookupProperty(addr1, city, state, zip);\n\n        if (!data || !data.ok) {\n          this.$('#preResult').classList.add('hidden');\n          this.$('#err1').textContent = 'Couldn\\'t find your property. Please enter your assessed value manually to get your cash offer.';\n          this.$('#err1').classList.remove('hidden');\n          this.$('#manualWrap').open = true;\n          return;\n        }\n\n        const assessed = this.toNum(data.assessed);\n        const market = this.toNum(data.market);\n        const estimated = this.toNum(data.estimated);\n\n        if (isFinite(assessed)) {\n          this.state.assessed = assessed;\n          this.state.source = 'assessed';\n        } else if (isFinite(market)) {\n          this.state.assessed = Math.round(market * 0.90);\n          this.state.source = 'market';\n        } else if (isFinite(estimated)) {\n          this.state.assessed = Math.round(estimated * 0.85);\n          this.state.source = 'estimated';\n        } else {\n          throw new Error('No valid property values found');\n        }\n\n        this.state.market = isFinite(market) ? market : null;\n        this.state.estimated = isFinite(estimated) ? estimated : null;\n\n        const offerFraction = parseFloat(this.$('#offerPct').value || this.config.defaults.offerFraction);\n        const cashOffer = this.calculateCashOffer(this.state.assessed, offerFraction);\n\n        this.$('#cashOfferDisplayPre').textContent = this.money(cashOffer);\n        this.$('#marketDisplayPre').textContent = (this.state.market ?? this.state.estimated) ? \n          this.money(this.state.market ?? this.state.estimated) : '—';\n\n        this.$('#closeDaysLabel').textContent = this.$('#days').value;\n        this.$('#closeDaysCopy').textContent = this.$('#days').value;\n        \n        this.$('#toStep2').focus();\n\n      } catch (error) {\n        this.$('#preResult').classList.add('hidden');\n        this.$('#err1').textContent = 'Unable to calculate offer automatically. Please enter your assessed value manually to get your cash offer.';\n        this.$('#err1').classList.remove('hidden');\n        this.$('#manualWrap').open = true;\n        console.error('Property lookup error:', error);\n      } finally {\n        this.setLoading(false);\n      }\n    }\n\n    bindEvents() {\n      this.$('#findVal').addEventListener('click', () => {\n        this.handlePropertyLookup();\n      });\n\n      this.$('#useManual').addEventListener('click', () => {\n        const value = parseFloat(this.$('#manualAssessed').value);\n        if (!isFinite(value) || value <= 0) {\n          this.$('#err1').textContent = 'Please enter a valid assessed value to calculate your cash offer';\n          this.$('#err1').classList.remove('hidden');\n          return;\n        }\n\n        this.state.assessed = Math.round(value);\n        this.state.source = 'manual';\n        this.state.market = null;\n        this.state.estimated = null;\n\n        const offerFraction = parseFloat(this.$('#offerPct').value || this.config.defaults.offerFraction);\n        const cashOffer = this.calculateCashOffer(this.state.assessed, offerFraction);\n\n        this.$('#preResult').classList.remove('hidden');\n        this.$('#cashOfferDisplayPre').textContent = this.money(cashOffer);\n        this.$('#marketDisplayPre').textContent = '—';\n        this.$('#err1').classList.add('hidden');\n        this.$('#toStep2').focus();\n      });\n\n      this.$('#toStep2').addEventListener('click', () => {\n        this.$('#step1').classList.add('hidden');\n        this.$('#step2').classList.remove('hidden');\n        this.recalculate();\n      });\n\n      this.$('#days').addEventListener('change', () => {\n        const days = this.$('#days').value;\n        this.$('#closeDaysLabel').textContent = days;\n        this.$('#closeDaysCopy').textContent = days;\n        this.$('#speedDisplayPre').textContent = days + ' days';\n      });\n\n      this.$('#recalc').addEventListener('click', () => {\n        this.recalculate();\n      });\n\n      ['addr1', 'city', 'state', 'zip', 'days'].forEach(id => {\n        const element = this.$(`#${id}`);\n        if (element) {\n          element.addEventListener('input', () => {\n            this.clearFieldError(id);\n            this.saveFormState();\n          });\n          element.addEventListener('change', () => {\n            this.saveFormState();\n          });\n        }\n      });\n\n      ['addr1', 'city', 'zip'].forEach(id => {\n        this.$(`#${id}`).addEventListener('keypress', (e) => {\n          if (e.key === 'Enter') {\n            e.preventDefault();\n            this.handlePropertyLookup();\n          }\n        });\n      });\n\n      this.$('#manualAssessed').addEventListener('keypress', (e) => {\n        if (e.key === 'Enter') {\n          e.preventDefault();\n          this.$('#useManual').click();\n        }\n      });\n    }\n  }\n\n  if (!customElements.get('cash-offer-widget')) {\n    customElements.define('cash-offer-widget', CashOfferWidget);\n  }\n\n  const mount = document.getElementById('cash-offer-mount');\n  if (mount) {\n    mount.innerHTML = '<cash-offer-widget></cash-offer-widget>';\n  }\n})();\n</script>"}
className={`w-html-embed crv3s27`} />
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk ckjs5zd c1rxyz1p c1d5qtqw cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 c4ph8p6 c1lzxrwn c1784h8b`}>
<div
className={`w-element c197qtjq cjkauba c18bj3o3 c1lq6pq8 c1numhkq cyovuht`}>
<Image
loading={"eager"}
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1766962257_IMG_2487_preview_lfkifq_22ce256158.jpg"}
width={1920}
height={1013}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
<div
className={`w-element c1numhkq c15kiuw7 ch3nxmx c1j3nit7 c1s88tz3 c11b3qd4 c139pwc6 c1a06u5s c1f2q1qr c1sy7qlo c1ypbuo2 c13g3obg c19p1lxn c1hlt0za crfoyae`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"We Continue The Story"}
</h2>
<div
className={`w-element c1numhkq c1fwtlol`}>
<p
className={`w-element c1g3mhtg cn5qs21 c1b2b7rn c82qwqc`}>
{"Our commitment to you is that we will not flip the farm but rather make an investment into continuing the story. "}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
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
{"A lifetime warranty requires a lifetime of training."}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We meet the highest standard in continual training to offer you manufacturer backed warranties for your home. All of our services include a limited or transferrable lifetime warranty."}
</p>
<Link
href={"/farmlands/integrated-pest-management#lp-hero"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx c17rwy3n c1603wqb c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s`}>
<span
className={`w-element`}>
{"Get Your Free Quote"}
</span>
<HtmlEmbed
code={"<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.18182 11.9205L5.01136 10.7614L8.51705 7.25568H0V5.5625H8.51705L5.01136 2.0625L6.18182 0.897727L11.6932 6.40909L6.18182 11.9205Z\" fill=\"#00192E\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
</div>
<div
className={`w-element c139pwc6 cjhysm8 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/warranty_section_img_Gw_Ij3_EN_Icdl_O_Noso_Iv_S5g_5697de5e8a.webp"}
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
className={`w-element c1f8uhde`}>
<div
className={`w-element c4vc9qx c9tjkc5 ca0yaa4 csaaful c7iyr7r cmpwmbp cohupba c16dsrv cv6cudx ch9p0fl`}>
<div
className={`w-element c139pwc6 c5ftqtp c1ux94pn cz2xurt`}>
<div
className={`w-element c1numhkq c1a06u5s c1sq4bmy crfoyae c1hlt0za`}>
<div
className={`w-element c139pwc6 cwtw5f8`}>
<h2
className={`w-element c92kv7i c19fqb9a c1cxkcjg cn7k83s c1lwn44j c1fjww6l c1lvj0n c1emvlx`}>
{"Get cash for your land today. Text or Call Me at 240-351-1470"}
</h2>
</div>
<Slot>
<Fragment_1>
<Form
state={formState}
onStateChange={(state: any) => {
formState = state
set$formState(formState)
}}
encType={"application/x-www-form-urlencoded"}
action={"action"}
className={`w-webhook-form c139pwc6 cwtw5f8`}>
{(formState === 'initial' || formState === 'error') &&
<div
className={`w-element`}>
<div
className={`w-element c1numhkq c1gai7u9 ci18zyn c1pw0a7u c1wmyomx c1350r63 c1l89g9c`}>
<Input
name={"Name"}
placeholder={"First name"}
type={"text"}
required={true}
autoComplete={"name"}
className={`w-element crv3s27 c73a05r csqiyoq c1d8rs8t cvfl1ur c2yws97 c1qporyx c1n5kit4 cb5io3 ccyk6v6 c14dduqk c1rkvowt c5sm30w c1u0ihi0 crmy72m c1q789z0 cix4cc0 cw8j8n1`} />
<Input
name={"Phone Number"}
placeholder={"Phone number"}
type={"tel"}
required={true}
autoComplete={"tel"}
className={`w-element crv3s27 c73a05r csqiyoq c1d8rs8t cvfl1ur c2yws97 c1qporyx c1n5kit4 cb5io3 ccyk6v6 c14dduqk c1rkvowt c5sm30w c1u0ihi0 crmy72m c1q789z0 cix4cc0 cw8j8n1`} />
<Input
type={"hidden"}
name={"page_referrer"}
data-element={"page_referrer"}
className={`w-element c5zgd1 c1mndhrk c12bgjgz c2j7e41 c128c779 c82qwqc c2yws97 c1qporyx c1n5kit4 cb5io3 c1d8rs8t c8d36da c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au czyae1i cg961le c1pz91w4 c1ndojgn cdmtq07 cn4267s c2bl8aw c19c13sp ckg1xra csoc2z6 c166spsr c1rkvowt c1bebdmu c16cu4eh`} />
<button
type={"submit"}
className={`w-element c1lvj0n c1t6vvls cpxswal cacmu18 crv3s27 c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w cn7k83s c1d8rs8t c7igqzz c1kpks3o c1owcyig c1wzdku csubbc2 ccmxen3 c1obobqc c1wygun7 cklylkh ccmjg3u cs7fyoi c165ti52 c1ak0qqx c13qspjq c1cqma02 c1jvw4nv c1yhof13 c8d36da cahz6x0 cmchden c1y5uzmj cl4dpup c5g53jj cba5e3y cw8j8n1 celyf79 c15vsij5 ctsgeyf coc0ri1`}>
{"Get Free Quote"}
</button>
</div>
</div>
}
{(formState === 'success') &&
<div
className={`w-element c1oowk3p c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au c1numhkq c1diokdk ch3nxmx c1p4xat6 ca17eyv`}>
{"Thank you! Your submission has been received!"}
</div>
}
{(formState === 'error') &&
<div
className={`w-element clif6a6 c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au cdr1ysj c1numhkq c1diokdk ch3nxmx c1p4xat6 ca17eyv`}>
{"Oops! Something went wrong while submitting the form."}
</div>
}
</Form>
</Fragment_1>
</Slot>
</div>
</div>
</div>
</section>
</Box>
<div
className={`w-element c1f8uhde cwpgog4 c9u7chh cud6z1z clrop1m`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb c19wzbh8 c7iyr7r cmpwmbp c5v4dmg`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk ckjs5zd cmvloo2 c1pfgp4h ciqrl3a c13d76g4 c19koxyq`}>
<div
className={`w-element c1numhkq c1e084j5 c1czy0yv c84c42r cyovuht c1350r63 c9chho4`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1bloln8 c1tqdex0 c84c42r cyovuht c7kupny`}>
<p
className={`w-element c1gbsy9l c19fqb9a c1lvj0n c181l3p8`}>
{"© 2024 Capitol Improvements"}
</p>
</div>
</div>
<div
className={`w-element c1numhkq co72if5 cucbkc3 c3sv84c cyzinkh ciqrl3a ct6ryly c6p48t0 cw8j8n1`}>
<p
className={`w-element c1gbsy9l c19fqb9a c1lvj0n c181l3p8`}>
{"Serving Maryland & Washington DC."}
</p>
</div>
</div>
</div>
</div>
</div>
<Slot>
<Fragment_1>
</Fragment_1>
</Slot>
</Box>
</Body>
}


      export { Page }
    