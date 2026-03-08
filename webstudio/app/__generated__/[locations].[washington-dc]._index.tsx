/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, Box as Box, Slot as Slot, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text, YouTube as YouTube, VimeoPreviewImage as VimeoPreviewImage, VimeoSpinner as VimeoSpinner, VimeoPlayButton as VimeoPlayButton } from "@webstudio-is/sdk-components-react";
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
let ServiceRecords = useResource("ServiceRecords_1")
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
src={"/uploads/capitol_improvements_logo_mui4_YFXS_Pv_M_Ej33_G1_Ey_WT_8932b99c78.svg"}
width={18}
height={12}
loading={"eager"}
className={`w-image cqsaj3r c11y8oun ctpsi40 c12l5srj`} />
<Image
src={"/uploads/capitol_improvements_logo_text_Il_Lf_LABIT_im_V1n_R5_Dx_Y3_f89681a688.svg"}
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
src={"/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_55ce0081f9.svg"}
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
src={"/uploads/phone_Nyqk_H_Sgvv_W_Cea_Yy_ZS_Zru_3ebca2ee02.svg"}
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
src={"/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_55ce0081f9.svg"}
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
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c53aqfr c3auquk c1nqn1pw cvbnc8e cvfl1ur c4ph8p6`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17crvds c1czy0yv c3u8caf c12qh1s1`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw co72if5 c1sq4bmy`}>
<h1
className={`w-element c6l7gor c140bhqz cn7k83s c1m8t9h7 c18klwyf c82qwqc c23qcws c1w9fs99 c5rv8xx c1lwn44j cl4dpup c1plys2`}>
{"best flat roofing and roofing company near you in washington, dc"}
</h1>
<h2
className={`w-element c1yzjm0o c1r3nuqs c1ihu3w4 c1pjr8f cq4o19h c1tdj1xa c4c2xkh cj9wc3m`}>
{"Capable."}
{""}
<br />
{""}
{"Experienced."}
{""}
<br />
{""}
{"Fair to you."}
</h2>
<p
className={`w-element c1g3mhtg c18v83wh c8d36da c82qwqc`}>
{"The family owned and family run team of roofing, flat roofing, and siding experts in Washington DC that are consistently "}
<Link
href={"/testimonials"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"rated as the best"}
</Link>
{" in our class for replacement "}
<Link
href={"/roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roofing"}
</Link>
{", roof repairs, "}
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
{"trim"}
</Link>
{", "}
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"decks"}
</Link>
{", and "}
<Link
href={"/doors"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"door replacements"}
</Link>
{". We provide quality products, expert installation, and lifetime manufacturer backed "}
<Link
href={"/warranty"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"warranties"}
</Link>
{". All for a fair price."}
</p>
</div>
</div>
<div
className={`w-element cnwi6s4 c1lq6pq8 cssmshv cxwe9q8 c12qh1s1`}>
<div
className={`w-element c1diokdk ch3nxmx c18hkk31 cjkauba cn87dm8 c1uhhf7h c1epvuph`}>
<Image
src={"/uploads/capitol_improvements_hero_img_FZH_Oqk_Ui_Fhym_VWE_Yj_Jhg4_82025eb746.webp"}
width={880}
height={430}
alt={"Compilation Video of the Capitol Improvements Team Completing Roofing, Siding, Window, Decks, Doors, and Gutter Installation Projects throughout DC, MD, and VA."}
loading={"eager"}
fetchPriority={"high"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c15bin8n c1xbhoju cnbug7k cgwe1hs c7xawzk cbyqy27 c1007gi3 c1a9ukpg c8fjv4x cvvhtep cjm2rxl c1ytvtu4 cgzewc9`} />
<div
className={`w-element c139pwc6 c15bin8n c1epvuph c1edz3f7 cjm2rxl c1ytvtu4 cgzewc9 ${"hero-video-wrapper"}`}>
<video
autoPlay={true}
muted={true}
playsInline={true}
preload={"auto"}
poster={"/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1768689432_662f3b433b72d65bdb7e82a5_65ca32dc202550e25648683a_Capitol_Improvements_Roofing_and_Siding_Contractors_poster_00001_iosgam_648e9de1e8.webp"}
className={`w-element c139pwc6 cjkauba cdmu5h7 ${"hero-video"}`}>
<source
src={"/uploads/ik_imagekit_io_einkpz9gr_65ca32dc202550e25648683a_Capitol_20_Improvements_20_20_Roofing_20and_20_Siding_20_Contractors_transcode_webm_ik_video_0a02644ba7.mp4_updatedAt_1765471677644"}
type={"video/webm"}
className={`w-element`} />
</video>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<Slot>
<Fragment_1>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1lbbsf4 c1hv9hoi c9hh9yd c1kffis9 c1ab5oob cnikeys c10k3jam cn0qaoo c5ymgey c6ca0h crn8utr c147y3ls c2p0cuk`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk c1ywbwet c1krf5e c139pwc6 c4ph8p6 c14e2i27 cyzinkh c18p9ucu cqfdoz0 c1gq5osj ciylvte c18oqc5x`}>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{"Get a free quote"}
</Link>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg ce6x08i c1lg7bh9 ciylvte c18oqc5x c1exxhe2`}>
<Image
src={"/uploads/consult_headshot_jason_U3uq_Lok_P5b_PF_Nyjndw_Pc_7e5448d3bc.webp"}
width={200}
height={200}
alt={"Project consultant Jason"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<Image
src={"/uploads/consult_headshot_lance_n9_Lu_S_Gqtb_ZJBC_5_K_Jv_YQ_48_986cc58ed1.webp"}
width={200}
height={200}
alt={"Project consultant Lance"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<div
className={`w-element c1numhkq c1a06u5s cw8j8n1`}>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
{"Jason & Lance"}
</p>
<p
className={`w-element`}>
{"Project Consultants Serving Gaithersburg"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</Fragment_1>
</Slot>
<section
className={`w-element cvfl1ur c1n33w2v c9u7chh casavvd clrop1m`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c1krf5e c1p4xat6 czr9sbv`}>
<p
className={`w-element cn7k83s ch7xx7z c18mkjfw cy4wmfd ci0xf01 c2j6eiv c1rpgfra`}>
{"HIGHLY CERTIFIED WITH INDUSTRY LEADERS"}
</p>
<Slot>
<div
className={`w-element c1numhkq c3auquk c1e084j5 ciqrl3a cvrapzf c1y3ergk c1t9puix cotdxso c1oxe5xw cles91e czr9sbv`}>
<Link
href={"https://www.gaf.com/en-us/roofing-contractors/residential/usa/md/bowie/capitol-improvements-llc-1005901"}
target={"_blank"}
className={`w-element c1hwvjgs`}>
<Image
src={"/uploads/gaf_logo_We_ITC_5p_Ape2_Cx61bwo3_OP_136c40af79.svg"}
width={128}
height={128}
alt={"GAF Master Elite logo. "}
loading={"lazy"}
className={`w-image c1b0n9b c1hwvjgs c9mjk8q czbu68a ccd9syo cqq3lvy cimel00 c14bdm71 cd614qx`} />
</Link>
<Link
href={"https://www.atlasroofing.com/find-a-contractor"}
target={"_blank"}
className={`w-element c1hwvjgs`}>
<Image
src={"/uploads/atlas_pro_logo_q_Voe_O_Fympg2_By5s8t30_w_4c8e4d7224.svg"}
width={122}
height={124}
alt={"Atlas Pro+ Logo."}
loading={"lazy"}
className={`w-image c1a7cejs c1hwvjgs c9mjk8q czbu68a c4pj8ns cqq3lvy cimel00 c14bdm71 cd614qx`} />
</Link>
<Link
href={"https://www.plygem.com/how-to-buy/"}
target={"_blank"}
className={`w-element c1hwvjgs`}>
<Image
src={"/uploads/plygem_logo_Qb_U2kz_Gy_Nyh5_D_Fh_F_Uq_Q_Lg_5b26e77fa1.svg"}
width={145}
height={124}
alt={"Mastic by Plygem logo. "}
loading={"lazy"}
className={`w-image c1bfg57x c1hwvjgs c9mjk8q czbu68a c4pj8ns cqq3lvy cimel00 c14bdm71 cd614qx`} />
</Link>
<Link
href={"https://www.mulehide.com/en-us/"}
target={"_blank"}
className={`w-element c1hwvjgs`}>
<Image
src={"/uploads/mule_hide_logo_DW_Oj97_Vdm9n_ZDJ_Upk_Gy_D8_a5cfdda907.svg"}
width={121}
height={118}
alt={"MuleHide logo. "}
loading={"lazy"}
className={`w-image cpn4g28 c1hwvjgs c9mjk8q czbu68a c49v2rs cqq3lvy c1r4lv1m cimel00 c1d88nal`} />
</Link>
<Link
href={"https://www.jameshardie.com/find-a-contractor/results/capitol-improvements-certified-installer-bowie/"}
target={"_blank"}
className={`w-element c1hwvjgs`}>
<Image
src={"/uploads/james_hardie_logo_C1_LC_6obnlrm346_Vy_U2_Gyg_7d5d8dec1d.svg"}
width={110}
height={122}
alt={"James Hardie logo."}
loading={"lazy"}
className={`w-image cq3pm48 c1hwvjgs c9mjk8q czbu68a c1lkaoym cqq3lvy c1ra9tgk cimel00 cd614qx`} />
</Link>
</div>
</Slot>
</div>
</div>
</div>
</section>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk co72if5 c9xtyeu c3g9oic cjsex2s c1kx9jzv cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 csaxcaf c1n30c32 cmy3513 cio262d cbnzrl8 c1b0raps cybbdyg c1br65qh cuhij4v c1xqmr1s`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 co72if5 c139pwc6 cjkauba c4ph8p6 c119v29c c13d76g4`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1s88tz3 c1w2yih2 c1rw16yv cyovuht c13g3obg`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Top-Rated Roofing Company and Windows & Door Replacement Company Near You in Washington, DC. "}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We provide residential "}
<Link
href={"/roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roofing"}
</Link>
{", "}
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"flat roofing"}
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
{" in Washington DC."}
</p>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Capitol Improvements Washington DC Flat Roofing |Roofing | Siding | Doors is a family-owned and operated roofing company serving DC's roofing needs. You can read our high reviews on "}
<span
className={`w-element`}>
{"Google"}
</span>
{", "}
<span
className={`w-element`}>
{"Angi"}
</span>
{", or the "}
<Link
href={"https://www.bbb.org/us/md/bowie/profile/roofing-contractors/capitol-improvements-llc-0241-235990374"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"BBB"}
</Link>
{"."}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1irdqs7 c139pwc6 c1ktc5gt c1sy8hn1 c5d3i40`}>
<Slot>
<Accordion
collapsible={true}
className={`w-accordion c1numhkq c1a06u5s c1irdqs7`}>
<AccordionItem
data-ws-index="0"
className={`w-item c1numhkq c1a06u5s`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv ${"AccordionTrigger Firebrick"}`}>
<Text
data-ws-tag="div"
className={`w-text`}>
{"Roofing"}
</Text>
<Box
className={`w-box cx79vvm c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"18\" height=\"12\" viewBox=\"0 0 18 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.232239 2.61611L2.00001 0.848343L9.11612 7.96446L16.2322 0.848343L18 2.61611L9.11612 11.5L0.232239 2.61611Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<Link
href={"/roofing/asphalt-roofing"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Asphalt Shingles"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/roofing/metal-roofing"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Metal"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Flat"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/roofing/commercial-roofing"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Commercial"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Roofing Overview"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item c1numhkq c1a06u5s`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv ${"AccordionTrigger Firebrick"}`}>
<Text
data-ws-tag="div"
className={`w-text`}>
{"Siding"}
</Text>
<Box
className={`w-box cx79vvm c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"18\" height=\"12\" viewBox=\"0 0 18 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.232239 2.61611L2.00001 0.848343L9.11612 7.96446L16.2322 0.848343L18 2.61611L9.11612 11.5L0.232239 2.61611Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<Link
href={"/siding/james-hardie"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"James Hardie"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/siding/vinyl"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Vinyl"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
<Link
href={"/siding"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c2j7e41 cd311gm c2t8vcs c1ablnwd c1cketyv c1e84ukw c1tn4ulv`}>
<p
className={`w-element`}>
{"Siding Overview"}
</p>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Link>
</AccordionContent>
</AccordionItem>
<Link
href={"/windows"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv`}>
<p
className={`w-element`}>
{"Windows"}
</p>
<HtmlEmbed
code={"<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Link>
<Link
href={"/gutters"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv`}>
<p
className={`w-element`}>
{"Gutters & Guards"}
</p>
<HtmlEmbed
code={"<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Link>
<Link
href={"/exterior-trim"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv`}>
<p
className={`w-element`}>
{"Exterior Trim"}
</p>
<HtmlEmbed
code={"<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Link>
<Link
href={"/decks-and-patios"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv`}>
<p
className={`w-element`}>
{"Decks & Patios"}
</p>
<HtmlEmbed
code={"<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Link>
<Link
href={"/doors"}
target={"_self"}
className={`w-element c1diokdk c3auquk clmr8fm c1numhkq c139pwc6 c1hgk76z cn7k83s cxfmh1z c1b0uj5i c82qwqc cacmu18 c1d7h9xn c1eu6l07 ctjj4no c1js20um c1ju8duk c1tn4ulv`}>
<p
className={`w-element`}>
{"Doors"}
</p>
<HtmlEmbed
code={"<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Link>
</Accordion>
</Slot>
</div>
</div>
</div>
</div>
</div>
</section>
<Slot>
<Fragment_1>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1lbbsf4 c1hv9hoi c9hh9yd c1kffis9 c1ab5oob cnikeys c10k3jam cn0qaoo c5ymgey c6ca0h crn8utr c147y3ls c2p0cuk`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk c1ywbwet c1krf5e c139pwc6 c4ph8p6 c14e2i27 cyzinkh c18p9ucu cqfdoz0 c1gq5osj ciylvte c18oqc5x`}>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{"Get a free quote"}
</Link>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg ce6x08i c1lg7bh9 ciylvte c18oqc5x c1exxhe2`}>
<Image
src={"/uploads/consult_headshot_jason_U3uq_Lok_P5b_PF_Nyjndw_Pc_7e5448d3bc.webp"}
width={200}
height={200}
alt={"Project consultant Jason"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<Image
src={"/uploads/consult_headshot_lance_n9_Lu_S_Gqtb_ZJBC_5_K_Jv_YQ_48_986cc58ed1.webp"}
width={200}
height={200}
alt={"Project consultant Lance"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<div
className={`w-element c1numhkq c1a06u5s cw8j8n1`}>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
{"Jason & Lance"}
</p>
<p
className={`w-element`}>
{"Project Consultants Serving Gaithersburg"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</Fragment_1>
</Slot>
<section
className={`w-element cvfl1ur`}>
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
src={"/uploads/Flat_Roofing_Services_in_Washington_DC_zbc_Z_Jx_GU_4_Ehaqwn_ZMG_8i_C_72b72e0b2f.webp"}
width={768}
height={1024}
alt={"Flat Roofing Services in Washington DC. TPO and Torch Down Modified Flat Roofing in DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Washington DC Flat Roofers & Flat Roof Repair in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Choosing the right roofing materials for your home in DC. "}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Not every roofer is a flat roofer. This is because "}
<b
className={`w-element`}>
{"flat roofing requires special training and tools"}
</b>
{". We are "}
<Link
href={"/locations/washington-dc"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Washington DC flat roofers near you"}
</Link>
{" that know how to do the job right. In Washington DC most roofs are flat roofs due to the prevalence of rowhouses and modern commercial buildings, which benefit from the additional interior space that flat roofs provide. "}
<Link
href={"/roofing/flat-roofing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Flat roofing"}
</Link>
{", typically made from materials like "}
<Link
href={"/blog/torch-down-roofing-guide-materials-installation-benefits-and-disadvantages"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"torch-down roofing"}
</Link>
{", modified bitumen, or EPDM rubber, require skilled waterproofing and specialty tools to prevent leaks from the region's frequent rain. Asphalt shingled roofs, though less common in D.C., are still found on some residential buildings and offer durability against seasonal changes."}
{""}
<br />
{""}
{""}
<br />
{""}
{"If you looking for a good roofer, good news you found the right "}
<Link
href={"/services/washington-dc-roofing-company-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Washington DC Roofing Company near you"}
</Link>
{". There is a reason not many contractors work in DC due to it's traffic, difficulty of install with cumbersome materials, but the good news is that we have the experience to get the job done right."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"/uploads/Siding_Installation_Washington_DC_1_t_c_CE_1n_Nfze_YB_Ev4_VSPBN_11b2683e19.webp"}
width={1500}
height={1000}
alt={"Siding Installation Services Washington DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Siding Company Near You in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"How to choose between vinyl or fiber cement siding?"}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"When it comes to a quality "}
<Link
href={"/services/washington-dc-siding-contractors-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Washington DC Siding Company near you"}
</Link>
{", fiber cement and solar defense vinyl siding are both top choices, each with its own benefits."}
{""}
<br />
{""}
{""}
<br />
{""}
{"James Hardie Fiber Cement is durable and resilient to the area’s crazy weather, humidity, temperature fluctuations and even fire hazards. It looks like traditional wood which is perfect for preserving the historic look of many DC neighborhoods."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Vinyl siding is more affordable and low maintenance, and it comes in many colors and styles. It resists moisture well for DC’s humid summers, but it is not as durable in extreme weather as fiber cement. For guidance on the best option for your home, consult with "}
<Link
href={"/locations/bowie"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roofing and siding contractors near you"}
</Link>
{"."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"Both have good insulation and curb appeal, it’s all about budget and look."}
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
src={"/uploads/Windows_and_Doors_in_Washington_DC_86j_H_Zf_DF_Rq9o_Ss_M_Qwq_P6_T_6a287dda83.webp"}
width={1248}
height={640}
alt={"Window Replacement and Doors in Washington DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Replacement Windows Contractors Serving Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Are there tax credits for replacement windows in Washington, DC?"}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Yes, Washington, DC residents may be eligible for tax credits and incentives to help offset the cost of new "}
<Link
href={"/services/washington-dc-window-replacement-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"window installation in Washington DC"}
</Link>
{" if the new windows are energy efficient."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Here are some common tax credits and programs that may apply:"}
{""}
<br />
{""}
{""}
<br />
{""}
{"Federal Residential Energy Efficient Property Credit:"}
{""}
<br />
{""}
{"The federal government offers a tax credit for energy efficient home improvements including windows that meet ENERGY STAR® requirements. For windows installed between 2023 and 2032 this credit covers 30% of the cost up to $600 per year. To qualify windows generally need to be ENERGY STAR® certified meaning they help reduce home energy use especially for heating and cooling."}
{""}
<br />
{""}
{""}
<br />
{""}
{"If you’re considering a window replacement check the specific eligibility requirements and consult a tax advisor to make sure you take full advantage of any credits or rebates that apply to your project."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"/uploads/Door_Installation_Washington_DC_gran_T_Jn_FO_5_Mp17tn_CUP_4_B_6ad1a2a8c6.webp"}
width={1500}
height={2000}
alt={"Door Installation in Washington DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Window & Door Installation Near You in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Front door styles and options guide. "}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"In Washington, D.C. you have many options for front doors especially when considering historic preservation or security."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Historic and Custom Doors"}
</b>
{""}
<br />
{""}
{"If your home is in a historic district, door replacements need approval to match the original style. Custom wood doors or reclaimed doors are popular choices that fit historic looks."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Fiberglass Doors"}
</b>
{""}
<br />
{""}
{"Fiberglass doors are energy efficient, low maintenance and versatile in design. They can mimic wood grain or be painted to match historic guidelines, a durable alternative to wood."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Security Doors"}
</b>
{""}
<br />
{""}
{"Steel and iron doors provide added security with styles that can fit historic looks. Fiberglass doors with reinforced cores or multi-point locking systems also offer high security without the traditional security door look."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Permit and Tax Incentives"}
</b>
{""}
<br />
{""}
{"Door replacements in historic districts need Historic Preservation Office approval. Both "}
<Link
href={"/services/washington-dc-front-door-replacement-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Washington DC Window and door installations"}
</Link>
{" qualify for energy efficiency rebates on select door upgrades, so that helps with the cost. Choose the right door and you’ll enhance both the style and security of your D.C. home."}
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
src={"/uploads/Deck_Building_Services_Washington_DC_Mp_Fqfyyw_Aw_S8_L_Ff_R1_Qs2u_8cdfffcba3.webp"}
width={4032}
height={3024}
alt={"Deck Building Services Washington DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Deck Builder Company Creating Custom Decks & Patios in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Considerations for your deck installation in Washington DC."}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"A few considerations your "}
<Link
href={"/services/washington-dc-deck-builders-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"deck builder in Washington DC"}
</Link>
{" should know:"}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"‍Permits and Regulations: Most decks require a permit from DCRA, and additional approvals if in a historic district. Zoning rules apply to height and property line setbacks."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"‍Weather Durability: Choose weather resistant materials like composite or treated wood and weatherproof finishes for DC’s climate."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"‍Design and Functionality: Choose a deck size and layout that fits your lifestyle and style that matches your home especially if in a historic area."}
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
{"We will build you a deck that is compliant, durable and meets your needs and DC regulations."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<Image
loading={"lazy"}
src={"/uploads/Seamless_Gutters_and_Gutter_Covers_in_Washington_DC_O4_Q0_JD_0_Uv8_Ve8rr_Zx9o2u_19ce42d49c.webp"}
width={3024}
height={4032}
alt={"Seamless Gutters and Gutter Cover Services in Washington DC"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Gutter Repair & Gutter Installation from a Licensed Gutter Contractor in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Historic gutter features or seamless gutters in DC. "}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
<Link
href={"/services/washington-dc-gutter-guards-gutters-near-you"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Seamless Gutter installation in Washington DC"}
</Link>
{" can match architectural details and historic charm:"}
{""}
<br />
{""}
{""}
<br />
{""}
{"‍Seamless Gutters: These custom gutters have a clean look that goes with historic facades. Copper seamless gutters, in particular, develop a patina over time and add character to row houses and brownstones."}
{""}
<br />
{""}
{""}
<br />
{""}
{"‍Half-Round Gutters: Seen on traditional or historic homes, half-round gutters add elegance and go with period architecture. They’re made from copper or aluminum and fit well with colonial and Victorian styles found in D.C."}
{""}
<br />
{""}
{""}
<br />
{""}
{"‍Decorative Downspouts and Brackets: For extra architectural detail consider ornate brackets, straps or decorative downspouts that add both form and function especially in historic neighborhoods."}
{""}
<br />
{""}
{"‍Custom Finishes: Specialty finishes or colors can match your home’s trim or other metalwork so you can maintain architectural consistency especially where historic preservation is a priority."}
{""}
<br />
{""}
{""}
<br />
{""}
{"These gutter styles and details match D.C.’s architectural character and historic integrity."}
</p>
</div>
</div>
</div>
<div
className={`w-element cb7wkl5 c1numhkq c3auquk co72if5 c18fd4vt c9tjkc5 c4ph8p6 c119v29c c13d76g4 c1lzxrwn c135vs31`}>
<div
className={`w-element c5ftqtp c1ux94pn cl4yxfz c12qh1s1`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c csv93dz c13g3obg`}>
<Image
loading={"lazy"}
src={"/uploads/Roofing_in_Washington_DC_wjxye_Ot_Yg_GDM_Tt_Dk_G_Lhgh_9704f5626c.webp"}
width={768}
height={863}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c15kiuw7 ch3nxmx cqbnnz9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Roofing Company Near You in Washington DC"}
</h2>
<h3
className={`w-element c1lsnlld c19fqb9a c82qwqc c1pjr8f cp0czxx c8mqd8h c13bl3hn`}>
{"Roofing in Washington DC is different than the suburbs."}
</h3>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
<Link
href={"/locations/washington-dc"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Washington DC Roofing Company"}
</Link>
{" that will do a good job is tough due to the urban density and strict permitting. Access to many buildings especially in older neighborhoods is difficult because of narrow streets, limited parking and tight spaces between buildings. Transporting materials and equipment to job sites is a logistical challenge. DC has strict building codes and historical preservation requirements especially in areas with landmarks or row houses so planning and approval processes are extensive. Roofing contractors have to navigate these regulations to get the permits which can add to the timeline and cost. All these factors make roofing in the nations capital more complicated than many other areas."}
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
className={`w-element c4vc9qx c9tjkc5 ckyl1t1 c7iyr7r cmpwmbp c1wq86sj c1n30c32`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx co72if5 c1sq4bmy c139pwc6 c13g3obg`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk co72if5 c1sq4bmy c139pwc6 c1owcyig c1ab5oob cnikeys c10k3jam cn0qaoo c1eprd4c c1xc1jzg c1txodcv`}>
<div
className={`w-element c1numhkq c1a06u5s c1t4g0yi c1krf5e c1bk25hu culorum chkf5md c1fnzz6a`}>
<h3
className={`w-element ctcx7mt c1qb2rp3 c82qwqc c61em0b c1251v1r c1emvlx c10k94yk`}>
{"Washington, DC"}
</h3>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
<Link
href={"https://www.google.com/maps?cid=10343029476848561348"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"1015 15th St NW #635"}
{""}
<br />
{""}
{"Washington, DC"}
</Link>
{""}
<br />
{""}
{"‍"}
{""}
<br />
{""}
<Link
href={"tel:4105870128"}
target={"_blank"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"410.587.0128"}
{""}
<br />
{""}
</Link>
<Link
href={"mailto:customerservice@improveitmd.com"}
target={"_blank"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"customerservice@improveitmd.com"}
</Link>
</p>
</div>
<div
className={`w-element cq7dbnh cw8j8n1 cl4dpup`}>
<div
className={`w-element ${"google-maps"}`}>
<HtmlEmbed
code={"<style>\n  .google-maps {\n    position: relative;\n    padding-bottom: 75%; \n    height: 0;\n    overflow: hidden; \n  }\n  .google-maps iframe {\n    position: absolute; \n    top: 0;\n    left: 0;\n    width: 100% !important;\n    height: 100% !important;\n  }\n</style>\n\n\n  \n  \n  \n    <div class=\"location_map\">\n    <iframe data-src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d388.11409275440866!2d-77.0344749339079!3d38.90311067286403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fb093fa9700f%3A0x8f89d2826cf3ecc4!2sCapitol%20Improvements%20DC!5e0!3m2!1sen!2sus!4v1712151609447!5m2!1sen!2sus\" width=\"400\" height=\"300\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>\n</div>\n<script>\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n    var observer = new IntersectionObserver(function(entries) {\n        // Loop through the entries\n        entries.forEach(entry => {\n            // Check if the element is visible\n            if (entry.isIntersecting) {\n                // Get the iframe\n                var iframe = entry.target;\n                // Set the src attribute from data-src\n                iframe.src = iframe.dataset.src;\n                // Unobserve the iframe after setting the src\n                observer.unobserve(iframe);\n            }\n        });\n    }, {\n        rootMargin: '100px' // Trigger the event 100px before the element comes into view\n    });\n\n    // Target all iframes that need to be lazily loaded\n    document.querySelectorAll('.location_map iframe').forEach(iframe => {\n        observer.observe(iframe);\n    });\n});\n\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<Slot>
<Fragment_1>
<section
className={`w-element cvfl1ur`}>
<HtmlEmbed
code={"<style>\n\n.service-area_toggle-link {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n  font-size: 1.375rem;\n  color: var(--foreground-primary);\n  font-weight: 400;\n  line-height: 1.3;\n  text-decoration: none;\n  border-bottom: 1px solid var(--foreground-primary);\n}\n\n.service-area_toggle-link.is--padding-small {\n  padding: 0.25rem 0;\n}\n\n.service-area_toggle-link h3 {\n  font-size: 1.375rem;\n  line-height: 1.3;\n  font-weight: 400;\n}\n\n.service-area_flex-center {\n  overflow: hidden;\n  position: relative;\n}\n\n\n\n\n\n/* Right column for the dynamic content */\n.service-area_right-col {\n  transition: opacity 0.5s ease-in-out; /* Smooth transition for the active screen */\n}\n\n\n/* Only apply to elements with data-screen attribute */\n[data-screen].hidden {\n  display: none;\n}\n\n[data-screen].active {\n  display: block;\n  opacity: 1;\n}\n\n/* Also handle data-structure=\"1\" if needed */\n[data-structure=\"1\"].hidden {\n  display: none;\n}\n  \n/* .hidden {\n  display: none;\n}\n\n\n.active {\n  display: block;\n  opacity: 1;\n} */\n\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c1czy0yv c17crvds`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk co72if5 c4vc9qx c4ph8p6 c119v29c c13d76g4 c1lzxrwn ${"service-area_flex-center"}`}>
<div
className={`w-element c1e3aa3w cyovuht c13g3obg`}>
<div
id={"map"}
className={`w-element c1598zzl c1gaefz7 cknnq3k`} />
</div>
<div
data-screen={"state"}
data-structure={"1"}
className={`w-element cjsex2s c1ru6es7 c1eb7rwy cyovuht c13g3obg c1lzxrwn c135vs31 ${"service-area_right-col hidden"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1603wqb c12a57ue c8hx4z3`}>
<div
className={`w-element c1numhkq c1a06u5s c3qgmhh`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Service Area"}
</h2>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"We serve Maryland, Washington DC, and Northern Virginia with our full line of services. As one of the DMV's highest rated roofing and siding contractors chances are we have a previous client near you."}
</p>
</div>
<div
className={`w-element`}>
<Link
structure-1={"md"}
className={`w-element c1numhkq c1diokdk c3auquk cd311gm c1hgk76z cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 c1eu6l07 ctjj4no c1js20um c1ju8duk`}>
<h3
className={`w-element cxfmh1z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Maryland"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
<Link
structure-1={"dc"}
className={`w-element c1numhkq c1diokdk c3auquk cd311gm c1hgk76z cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 c1eu6l07 ctjj4no c1js20um c1ju8duk`}>
<h3
className={`w-element cxfmh1z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Washington DC"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
<Link
structure-1={"va"}
className={`w-element c1numhkq c1diokdk c3auquk cd311gm c1hgk76z cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 c1eu6l07 ctjj4no c1js20um c1ju8duk`}>
<h3
className={`w-element cxfmh1z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Virginia"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
</div>
</div>
</div>
<div
data-screen={"county"}
data-structure={"2"}
className={`w-element c1qhbl4j cyovuht c13g3obg ${"service-area_right-col hidden"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 cgspg4o casp2qg`}>
<div
className={`w-element`}>
<Link
structure-2={"back"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 c82qwqc cacmu18`}>
<HtmlEmbed
code={"<svg width=\"12\" height=\"10\" viewBox=\"0 0 10 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.64189 -4.85254e-07L5.53743 0.763129L2.42792 3.44266L10 3.44266L10 4.55734L2.42792 4.55734L5.53744 7.23258L4.64189 8L6.03983e-07 4L4.64189 -4.85254e-07Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg c1b0uj5i c1w9fs99`}>
{"back"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1603wqb cc9twoz c9nnh43 c1xqmr1s`}>
<div
className={`w-element c1numhkq c1pit5s0 c3qgmhh cq757fs c1dudh4t c5u39qw c1a02o4h ckplu33 c1kioei4`}>
<Link
structure-2={"breadcrumb"}
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
data-breadcrumb={"state"}
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c82qwqc c1q2v3ep c1plys2`}>
{"Maryland"}
</h4>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c3auquk cjhli7i c15jf3ap c19y7s3q cw8j8n1`}>
<Link
structure-2={"link"}
className={`w-element c1numhkq c1diokdk c3auquk ckdtkkn c16j9hpi cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 cq757fs c1dudh4t c5u39qw c1a02o4h`}>
<h3
className={`w-element ch7xx7z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Heading"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
</div>
</div>
</div>
</div>
<div
data-screen={"city"}
data-structure={"3"}
className={`w-element c1qhbl4j cyovuht c13g3obg ${"service-area_right-col hidden"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 cgspg4o casp2qg`}>
<div
className={`w-element`}>
<Link
structure-3={"back"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 c82qwqc cacmu18`}>
<HtmlEmbed
code={"<svg width=\"12\" height=\"10\" viewBox=\"0 0 10 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.64189 -4.85254e-07L5.53743 0.763129L2.42792 3.44266L10 3.44266L10 4.55734L2.42792 4.55734L5.53744 7.23258L4.64189 8L6.03983e-07 4L4.64189 -4.85254e-07Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg c1b0uj5i c1w9fs99`}>
{"back"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1603wqb cc9twoz c9nnh43 c1xqmr1s`}>
<div
className={`w-element c1numhkq c1pit5s0 c3qgmhh cq757fs c1dudh4t c5u39qw c1a02o4h ckplu33 c1kioei4`}>
<Link
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
data-breadcrumb={"state"}
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c1euo10y c1q2v3ep c1plys2`}>
{"Maryland"}
</h4>
</Link>
<Link
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c82qwqc c1q2v3ep c1plys2`}>
{"/ "}
<span
data-breadcrumb={"county"}
className={`w-element`}>
{"Anne Arundel County"}
</span>
</h4>
</Link>
</div>
<div
className={`w-element cmsm1bz c18lza2c c15jf3ap c1omlw60 c3auquk c1txodcv curgy1m`}>
<Link
structure-3={"link"}
className={`w-element c1numhkq c1diokdk c3auquk ckdtkkn c16j9hpi cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 cq757fs c1dudh4t c5u39qw c1a02o4h`}>
<h3
className={`w-element ch7xx7z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Heading"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
</div>
</div>
</div>
</div>
<div
data-screen={"services"}
data-structure={"4"}
className={`w-element c1qhbl4j cyovuht c13g3obg ${"service-area_right-col hidden"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 cgspg4o casp2qg`}>
<div
className={`w-element`}>
<Link
structure-4={"back"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 c82qwqc cacmu18`}>
<HtmlEmbed
code={"<svg width=\"12\" height=\"10\" viewBox=\"0 0 10 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.64189 -4.85254e-07L5.53743 0.763129L2.42792 3.44266L10 3.44266L10 4.55734L2.42792 4.55734L5.53744 7.23258L4.64189 8L6.03983e-07 4L4.64189 -4.85254e-07Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg c1b0uj5i c1w9fs99`}>
{"back"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1603wqb cc9twoz c9nnh43 c1xqmr1s`}>
<div
className={`w-element c1numhkq c1pit5s0 c3qgmhh cq757fs c1dudh4t c5u39qw c1a02o4h ckplu33 c1kioei4`}>
<Link
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
data-breadcrumb={"state"}
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c1euo10y c1q2v3ep c1plys2`}>
{"Maryland"}
</h4>
</Link>
<Link
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c82qwqc c1q2v3ep c1plys2`}>
{"/ "}
<span
data-breadcrumb={"county"}
className={`w-element`}>
{"Annapolis"}
</span>
</h4>
</Link>
<Link
className={`w-element c7htweh c15lzzou c82qwqc cacmu18`}>
<h4
className={`w-element c1g3mhtg cxfmh1z c1b0uj5i c82qwqc c1q2v3ep c1plys2`}>
{"/ "}
<span
data-breadcrumb={"city"}
className={`w-element`}>
{"Annapolis"}
</span>
</h4>
</Link>
</div>
<div
className={`w-element c1a06u5s c1numhkq c3auquk cjhli7i c15jf3ap c19y7s3q cw8j8n1`}>
<Link
structure-4={"link"}
className={`w-element c1numhkq c1diokdk c3auquk ckdtkkn c16j9hpi cxfmh1z c1g3mhtg c1b0uj5i c82qwqc cacmu18 cq757fs c1dudh4t c5u39qw c1a02o4h`}>
<h3
className={`w-element ch7xx7z c1qb2rp3 c82qwqc c1g3mhtg c1emvlx`}>
{"Heading"}
</h3>
<HtmlEmbed
code={"<svg viewBox=\"0 0 10 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.35811 8.5L4.46256 7.73687L7.57208 5.05734L0 5.05734L0 3.94266L7.57208 3.94266L4.46256 1.26742L5.35811 0.5L10 4.5L5.35811 8.5Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed c1eflpw1 c1utj868 c1numhkq chxc8gf c1gjb1ow c33lsg8`} />
</Link>
</div>
</div>
</div>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cxz0ozl c3wvy91 c1qhbl4j cmi1mlx c1pwyg24 cedo3kb c1xq3yy7 c1rah8ho ${"loading-circle"}`}>
<div
className={`w-element c120nl7e cd04v2w cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"weather_widget_loader"}`} />
</div>
</div>
</div>
</div>
</div>
<div
className={`w-element c9te4zd`}>
<HtmlEmbed
code={`<script> const inputData= ${ServiceRecords?.data?.data} 
</script>`}
executeScriptOnCanvas={false}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script>\n// Service Area Widget - Strapi CMS Integration (v2 - Rewritten)\n// Usage: Include service_area_records.js (with inputData) before this script\n//\n// API Requirements:\n// /api/service-areas?populate[counties]=*&populate[serviceLinks][populate]=*&pagination[pageSize]=200\n\n// ============================================\n// DEBUG LOGGING\n// ============================================\nwindow.SAW_DEBUG = true; // Set to false to disable logging\n\nfunction log(category, message, data = null) {\n  if (!window.SAW_DEBUG) return;\n  const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);\n  const prefix = `[SAW ${timestamp}] [${category}]`;\n  if (data !== null) {\n    console.log(prefix, message, data);\n  } else {\n    console.log(prefix, message);\n  }\n}\n\nfunction logJourney(action, details = {}) {\n  if (!window.SAW_DEBUG) return;\n  console.log('%c[JOURNEY] ' + action, 'color: #0066cc; font-weight: bold;', details);\n}\n\n// ============================================\n// HELPER FUNCTIONS\n// ============================================\nfunction loadScript(src, callback) {\n  if (document.querySelector(`script[src=\"${src}\"]`)) {\n    if (callback) callback();\n    return;\n  }\n  var script = document.createElement('script');\n  script.type = 'text/javascript';\n  script.src = src;\n  script.onload = callback;\n  script.onerror = () => console.error('Failed to load script:', src);\n  document.head.appendChild(script);\n}\n\nfunction loadCSS(href, callback) {\n  if (document.querySelector(`link[href=\"${href}\"]`)) {\n    if (callback) callback();\n    return;\n  }\n  var link = document.createElement('link');\n  link.rel = 'stylesheet';\n  link.href = href;\n  link.onload = callback;\n  link.onerror = () => console.error('Failed to load CSS:', href);\n  document.head.appendChild(link);\n}\n\n// ============================================\n// MAIN WIDGET\n// ============================================\nloadScript('https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js', function() {\nloadCSS('https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css', function() {\n\nlog('INIT', 'Mapbox loaded, initializing widget');\n\nmapboxgl.accessToken = 'pk.eyJ1IjoiaW1wcm92ZWl0bWQiLCJhIjoiY2w1OXlhZ3BnMDAyMDNrcG9pdmU3OXNvcyJ9.8IKtnRJwbi7ss5MjeHGAkQ';\n\nvar map = new mapboxgl.Map({\n  container: 'map',\n  style: 'mapbox://styles/improveitmd/cluh2p7z500kb01ped3e43aw8',\n  center: [-77.041975, 38.894080],\n  zoom: 7\n});\n\n// ============================================\n// CENTRALIZED STATE\n// ============================================\nwindow.ServiceAreaWidget = {\n  data: [],\n  containers: {},\n  currentState: null,\n  currentCounty: null,\n  currentCity: null,\n  currentScreen: 'state',\n  initialized: false,\n\n  // State name mappings\n  stateNames: {\n    'MD': 'Maryland',\n    'DC': 'Washington DC',\n    'VA': 'Virginia'\n  },\n\n  // Bounding boxes\n  boundingBoxes: {\n    'MD': [-77.640982, 38.466804, -76.177053, 39.459565],\n    'DC': [-77.122999, 38.804398, -76.908765, 38.997306],\n    'VA': [-77.364261, 38.667188, -77.025908, 38.969815]\n  }\n};\n\nconst SAW = window.ServiceAreaWidget;\n\n// ============================================\n// DATA TRANSFORMATION\n// ============================================\nfunction transformStrapiData(strapiResponse) {\n  log('DATA', 'Transforming Strapi data');\n  let items = [];\n\n  try {\n    if (strapiResponse?.data?.data) {\n      items = strapiResponse.data.data;\n    } else if (Array.isArray(strapiResponse?.data)) {\n      items = strapiResponse.data;\n    } else if (Array.isArray(strapiResponse)) {\n      items = strapiResponse;\n    }\n  } catch (e) {\n    console.error('Error parsing Strapi response:', e);\n    return [];\n  }\n\n  log('DATA', `Found ${items.length} raw items`);\n\n  const transformed = items.map(item => {\n    let coordinates = null;\n    if (item.coordinatesLatLong && typeof item.coordinatesLatLong === 'string') {\n      const parts = item.coordinatesLatLong.split(',');\n      if (parts.length === 2) {\n        const lat = parseFloat(parts[0].trim());\n        const lng = parseFloat(parts[1].trim());\n        if (!isNaN(lat) && !isNaN(lng)) {\n          coordinates = [lat, lng];\n        }\n      }\n    }\n\n    const county = item.counties?.[0]?.name || '';\n    const serviceLinks = item.serviceLinks || {};\n\n    return {\n      city: item.title || '',\n      county: county,\n      state: item.state || '',\n      coordinates: coordinates,\n      cityZoomLevel: item.zoomLevel || 13,\n      slug: item.slug || '',\n      services: {\n        roofing: serviceLinks.roofing?.slug || null,\n        siding: serviceLinks.siding?.slug || null,\n        trims: serviceLinks.exteriorTrim?.slug || null,\n        decks: serviceLinks.decks?.slug || null,\n        windows: serviceLinks.windows?.slug || null,\n        gutters: serviceLinks.gutters?.slug || null,\n        doors: serviceLinks.doors?.slug || null,\n      }\n    };\n  }).filter(item => item.city && item.state);\n\n  log('DATA', `Transformed ${transformed.length} valid items`);\n\n  // Log data summary by state\n  const summary = {};\n  transformed.forEach(item => {\n    if (!summary[item.state]) summary[item.state] = { cities: 0, counties: new Set() };\n    summary[item.state].cities++;\n    if (item.county) summary[item.state].counties.add(item.county);\n  });\n  Object.keys(summary).forEach(state => {\n    summary[state].counties = Array.from(summary[state].counties);\n    log('DATA', `State ${state}: ${summary[state].cities} cities, ${summary[state].counties.length} counties`, summary[state].counties);\n  });\n\n  return transformed;\n}\n\n// ============================================\n// MAP FUNCTIONS\n// ============================================\nfunction flyToLocation(locationName, locationType, zoom = null, coordinates = null) {\n  const bbox = SAW.boundingBoxes[SAW.currentState] || SAW.boundingBoxes['MD'];\n\n  if (coordinates) {\n    log('MAP', `Flying to coordinates for ${locationName}`, coordinates);\n    const zoomLevel = zoom || (locationType === 'state' ? 7 : locationType === 'county' ? 9 : 13);\n    map.flyTo({\n      center: [coordinates[1], coordinates[0]], // [lng, lat]\n      zoom: zoomLevel,\n      essential: true\n    });\n  } else {\n    log('MAP', `Geocoding ${locationName}`);\n    const encodedName = encodeURIComponent(locationName);\n    const bboxStr = bbox.join(',');\n    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedName}.json?access_token=${mapboxgl.accessToken}&limit=1&bbox=${bboxStr}`;\n\n    fetch(url)\n      .then(r => r.json())\n      .then(data => {\n        if (data.features?.[0]) {\n          const coords = data.features[0].center;\n          const zoomLevel = zoom || (locationType === 'state' ? 7 : locationType === 'county' ? 10 : 13);\n          map.flyTo({ center: coords, zoom: zoomLevel, essential: true });\n        }\n      })\n      .catch(e => console.error('Geocoding error:', e));\n  }\n}\n\n// ============================================\n// CONTAINER MANAGEMENT\n// ============================================\nfunction getContainer(screenName, structureAttr) {\n  // Try cached first\n  if (SAW.containers[screenName]) {\n    log('CONTAINER', `Using cached container for ${screenName}`);\n    return SAW.containers[screenName];\n  }\n\n  // Find and cache\n  const selector = `[data-screen=\"${screenName}\"] [structure-${structureAttr}=\"link\"]`;\n  const linkElement = document.querySelector(selector);\n\n  if (linkElement) {\n    const container = linkElement.parentElement;\n    SAW.containers[screenName] = container;\n    log('CONTAINER', `Found and cached container for ${screenName}`);\n    return container;\n  }\n\n  log('CONTAINER', `WARNING: Container not found for ${screenName} with selector ${selector}`);\n  return null;\n}\n\n// ============================================\n// SCREEN MANAGEMENT\n// ============================================\nfunction showScreen(screenName) {\n  log('SCREEN', `Switching to screen: ${screenName}`);\n  SAW.currentScreen = screenName;\n\n  document.querySelectorAll('[data-screen]').forEach(screen => {\n    const name = screen.getAttribute('data-screen');\n    if (name === screenName) {\n      screen.classList.remove('hidden');\n      screen.classList.add('active');\n    } else {\n      screen.classList.add('hidden');\n      screen.classList.remove('active');\n    }\n  });\n}\n\n// ============================================\n// CREATE LINK ELEMENT\n// ============================================\nfunction createLinkElement(text, structureNum, dataAttrs = {}) {\n  const link = document.createElement('a');\n  link.className = \"service-area_toggle-link is--padding-small w-inline-block\";\n  link.setAttribute(`structure-${structureNum}`, 'link');\n  link.setAttribute('href', 'javascript:void(0);');\n\n  Object.keys(dataAttrs).forEach(key => {\n    link.setAttribute(`data-${key}`, dataAttrs[key]);\n  });\n\n  const linkText = document.createElement('h3');\n  linkText.className = \"service-area_link-text-small\";\n  linkText.textContent = text;\n  link.appendChild(linkText);\n\n  const logo = document.createElement('div');\n  logo.className = \"n-work_logo w-embed\";\n  logo.innerHTML = `<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n  </svg>`;\n  link.appendChild(logo);\n\n  return link;\n}\n\n// ============================================\n// NAVIGATION FUNCTIONS\n// ============================================\n\n// Show counties for a state\nfunction showCounties(stateCode) {\n  logJourney('SHOW_COUNTIES', { stateCode });\n\n  SAW.currentState = stateCode;\n  SAW.currentCounty = null;\n  SAW.currentCity = null;\n\n  const counties = [...new Set(\n    SAW.data\n      .filter(item => item.state === stateCode && item.county)\n      .map(item => item.county)\n  )].sort();\n\n  log('NAV', `Found ${counties.length} counties for ${stateCode}`, counties);\n\n  // Update breadcrumb\n  const breadcrumb = document.querySelector('[data-screen=\"county\"] [data-breadcrumb=\"state\"]');\n  if (breadcrumb) {\n    breadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;\n  }\n\n  // Get container\n  const container = getContainer('county', '2');\n  if (!container) {\n    console.error('County container not found!');\n    return;\n  }\n\n  container.innerHTML = '';\n\n  if (counties.length === 0) {\n    log('NAV', `No counties found for ${stateCode}, showing all cities directly`);\n    // Show cities directly if no counties\n    showAllCitiesForState(stateCode);\n    return;\n  }\n\n  counties.forEach(countyName => {\n    const link = createLinkElement(countyName, '2', { county: countyName, state: stateCode });\n    link.addEventListener('click', function(e) {\n      e.preventDefault();\n      e.stopPropagation();\n      const county = this.getAttribute('data-county');\n      const state = this.getAttribute('data-state');\n      logJourney('COUNTY_CLICKED', { county, state });\n      flyToLocation(county, 'county');\n      showCities(county, state);\n    });\n    container.appendChild(link);\n  });\n\n  showScreen('county');\n  flyToLocation(SAW.stateNames[stateCode], 'state', 8);\n}\n\n// Show all cities for a state (when no counties)\nfunction showAllCitiesForState(stateCode) {\n  logJourney('SHOW_ALL_CITIES_FOR_STATE', { stateCode });\n\n  SAW.currentState = stateCode;\n  SAW.currentCounty = null;\n\n  const cities = [...new Set(\n    SAW.data\n      .filter(item => item.state === stateCode)\n      .map(item => item.city)\n  )].sort();\n\n  log('NAV', `Found ${cities.length} cities for ${stateCode}`, cities);\n\n  // Update breadcrumb\n  const stateBreadcrumb = document.querySelector('[data-screen=\"city\"] [data-breadcrumb=\"state\"]');\n  if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;\n\n  const countyBreadcrumb = document.querySelector('[data-screen=\"city\"] [data-breadcrumb=\"county\"]');\n  if (countyBreadcrumb) {\n    countyBreadcrumb.textContent = '';\n    const countyLink = countyBreadcrumb.closest('a');\n    if (countyLink) countyLink.style.display = 'none';\n  }\n\n  const container = getContainer('city', '3');\n  if (!container) {\n    console.error('City container not found!');\n    return;\n  }\n\n  container.innerHTML = '';\n\n  cities.forEach(cityName => {\n    const link = createLinkElement(cityName, '3', { city: cityName, state: stateCode, county: '' });\n    link.addEventListener('click', function(e) {\n      e.preventDefault();\n      e.stopPropagation();\n      const city = this.getAttribute('data-city');\n      const state = this.getAttribute('data-state');\n      logJourney('CITY_CLICKED', { city, state, county: '' });\n\n      const cityData = SAW.data.find(item => item.city === city && item.state === state);\n      if (cityData?.coordinates) {\n        flyToLocation(city, 'city', cityData.cityZoomLevel, cityData.coordinates);\n      } else {\n        flyToLocation(city, 'city');\n      }\n      showServices(city, '', state);\n    });\n    container.appendChild(link);\n  });\n\n  showScreen('city');\n}\n\n// Show cities for a county\nfunction showCities(countyName, stateCode) {\n  logJourney('SHOW_CITIES', { countyName, stateCode });\n\n  SAW.currentState = stateCode;\n  SAW.currentCounty = countyName;\n  SAW.currentCity = null;\n\n  const cities = [...new Set(\n    SAW.data\n      .filter(item => item.state === stateCode && item.county === countyName)\n      .map(item => item.city)\n  )].sort();\n\n  log('NAV', `Found ${cities.length} cities for ${countyName}, ${stateCode}`, cities);\n\n  // Update breadcrumbs\n  const stateBreadcrumb = document.querySelector('[data-screen=\"city\"] [data-breadcrumb=\"state\"]');\n  if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;\n\n  const countyBreadcrumb = document.querySelector('[data-screen=\"city\"] [data-breadcrumb=\"county\"]');\n  if (countyBreadcrumb) {\n    countyBreadcrumb.textContent = countyName;\n    const countyLink = countyBreadcrumb.closest('a');\n    if (countyLink) countyLink.style.display = '';\n  }\n\n  const container = getContainer('city', '3');\n  if (!container) {\n    console.error('City container not found!');\n    return;\n  }\n\n  container.innerHTML = '';\n\n  cities.forEach(cityName => {\n    const link = createLinkElement(cityName, '3', { city: cityName, county: countyName, state: stateCode });\n    link.addEventListener('click', function(e) {\n      e.preventDefault();\n      e.stopPropagation();\n      const city = this.getAttribute('data-city');\n      const county = this.getAttribute('data-county');\n      const state = this.getAttribute('data-state');\n      logJourney('CITY_CLICKED', { city, county, state });\n\n      const cityData = SAW.data.find(item => item.city === city && item.state === state);\n      if (cityData?.coordinates) {\n        flyToLocation(city, 'city', cityData.cityZoomLevel, cityData.coordinates);\n      } else {\n        flyToLocation(city, 'city');\n      }\n      showServices(city, county, state);\n    });\n    container.appendChild(link);\n  });\n\n  showScreen('city');\n}\n\n// Show services for a city\nfunction showServices(cityName, countyName, stateCode) {\n  logJourney('SHOW_SERVICES', { cityName, countyName, stateCode });\n\n  SAW.currentState = stateCode;\n  SAW.currentCounty = countyName;\n  SAW.currentCity = cityName;\n\n  // Find city data\n  const cityData = SAW.data.find(item =>\n    item.city === cityName && item.state === stateCode\n  );\n\n  if (!cityData) {\n    log('NAV', `ERROR: No data found for city ${cityName} in ${stateCode}`);\n    console.error('No service data found for:', cityName, stateCode);\n    return;\n  }\n\n  log('NAV', `City data found`, cityData);\n\n  // Update breadcrumbs\n  const stateBreadcrumb = document.querySelector('[data-screen=\"services\"] [data-breadcrumb=\"state\"]');\n  if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;\n\n  const countyBreadcrumb = document.querySelector('[data-screen=\"services\"] [data-breadcrumb=\"county\"]');\n  if (countyBreadcrumb) {\n    if (countyName) {\n      countyBreadcrumb.textContent = countyName;\n      const countyLink = countyBreadcrumb.closest('a');\n      if (countyLink) countyLink.style.display = '';\n    } else {\n      countyBreadcrumb.textContent = '';\n      const countyLink = countyBreadcrumb.closest('a');\n      if (countyLink) countyLink.style.display = 'none';\n    }\n  }\n\n  const cityBreadcrumb = document.querySelector('[data-screen=\"services\"] [data-breadcrumb=\"city\"]');\n  if (cityBreadcrumb) {\n    // For DC, hide city breadcrumb since city = state\n    if (stateCode === 'DC') {\n      cityBreadcrumb.textContent = '';\n      const cityLink = cityBreadcrumb.closest('a');\n      if (cityLink) cityLink.style.display = 'none';\n    } else {\n      cityBreadcrumb.textContent = cityName;\n      const cityLink = cityBreadcrumb.closest('a');\n      if (cityLink) cityLink.style.display = '';\n    }\n  }\n\n  const container = getContainer('services', '4');\n  if (!container) {\n    console.error('Services container not found!');\n    return;\n  }\n\n  container.innerHTML = '';\n\n  // Add DC flat roofing first if DC\n  if (stateCode === 'DC') {\n    const flatRoofLink = document.createElement('a');\n    flatRoofLink.href = '/services/washington-dc-flat-roofing-company-near-you';\n    flatRoofLink.className = \"service-area_toggle-link is--padding-small w-inline-block\";\n    flatRoofLink.setAttribute('structure-4', 'link');\n\n    const h3 = document.createElement('h3');\n    h3.className = \"service-area_link-text-small\";\n    h3.textContent = \"Flat Roofing in Washington DC\";\n    flatRoofLink.appendChild(h3);\n\n    const div = document.createElement('div');\n    div.className = \"n-work_logo w-embed\";\n    div.innerHTML = `<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n    </svg>`;\n    flatRoofLink.appendChild(div);\n    container.appendChild(flatRoofLink);\n  }\n\n  // Add service links\n  const serviceNames = {\n    roofing: 'Roofing',\n    siding: 'Siding',\n    trims: 'Exterior Trim',\n    decks: 'Decks',\n    windows: 'Windows',\n    gutters: 'Gutters',\n    doors: 'Doors'\n  };\n\n  const services = cityData.services || {};\n  Object.keys(services).forEach(service => {\n    const slug = services[service];\n    if (!slug) return; // Skip services without links\n\n    const displayName = serviceNames[service] || service;\n    const link = document.createElement('a');\n    link.href = '/services/' + slug;\n    link.className = \"service-area_toggle-link is--padding-small w-inline-block\";\n    link.setAttribute('structure-4', 'link');\n\n    const linkText = document.createElement('h3');\n    linkText.className = \"service-area_link-text-small\";\n    linkText.textContent = `${displayName} in ${cityName}`;\n    link.appendChild(linkText);\n\n    const logo = document.createElement('div');\n    logo.className = \"n-work_logo w-embed\";\n    logo.innerHTML = `<svg width=\"18\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z\" fill=\"currentColor\"/>\n    </svg>`;\n    link.appendChild(logo);\n\n    container.appendChild(link);\n  });\n\n  showScreen('services');\n}\n\n// ============================================\n// STATE CLICK HANDLERS\n// ============================================\nfunction handleStateClick(stateCode) {\n  logJourney('STATE_CLICKED', { stateCode });\n\n  SAW.currentState = stateCode;\n\n  if (stateCode === 'DC') {\n    // DC: Go directly to services\n    log('NAV', 'DC selected - going directly to services');\n    flyToLocation('Washington DC', 'state', 10);\n    showServices('Washington DC', '', 'DC');\n  } else if (stateCode === 'VA') {\n    // VA: Show cities directly (no county data expected)\n    log('NAV', 'VA selected - checking for counties');\n    flyToLocation('Virginia', 'state', 9);\n    showCounties('VA');\n  } else if (stateCode === 'MD') {\n    // MD: Normal flow - show counties\n    log('NAV', 'MD selected - showing counties');\n    flyToLocation('Maryland', 'state', 8);\n    showCounties('MD');\n  }\n}\n\n// ============================================\n// BACK BUTTON HANDLERS\n// ============================================\nfunction handleBackClick() {\n  logJourney('BACK_CLICKED', {\n    currentScreen: SAW.currentScreen,\n    currentState: SAW.currentState,\n    currentCounty: SAW.currentCounty,\n    currentCity: SAW.currentCity\n  });\n\n  switch (SAW.currentScreen) {\n    case 'services':\n      if (SAW.currentState === 'DC') {\n        // DC: Go back to state selection\n        showScreen('state');\n        flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);\n      } else if (SAW.currentCounty) {\n        // Has county: go back to cities\n        showCities(SAW.currentCounty, SAW.currentState);\n      } else {\n        // No county: go back to counties\n        showCounties(SAW.currentState);\n      }\n      break;\n\n    case 'city':\n      showCounties(SAW.currentState);\n      break;\n\n    case 'county':\n      showScreen('state');\n      flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);\n      break;\n  }\n}\n\n// ============================================\n// BREADCRUMB HANDLERS\n// ============================================\nfunction handleBreadcrumbClick(type, name) {\n  logJourney('BREADCRUMB_CLICKED', { type, name });\n\n  switch (type) {\n    case 'state':\n      // For MD and VA, clicking state breadcrumb should show counties\n      // For DC, go back to state selection\n      if (name === 'MD' || name === 'VA') {\n        showCounties(name);\n      } else {\n        showScreen('state');\n        flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);\n      }\n      break;\n    case 'county':\n      showCities(name, SAW.currentState);\n      break;\n    case 'city':\n      // Already on services screen, city breadcrumb doesn't navigate\n      break;\n  }\n}\n\n// ============================================\n// INITIALIZATION\n// ============================================\nfunction initWidget() {\n  if (SAW.initialized) {\n    log('INIT', 'Widget already initialized, skipping');\n    return;\n  }\n\n  log('INIT', 'Initializing Service Area Widget');\n\n  // Load data\n  if (typeof inputData !== 'undefined' && inputData) {\n    SAW.data = transformStrapiData(inputData);\n    log('INIT', `Loaded ${SAW.data.length} service areas`);\n  } else {\n    console.error('No inputData found!');\n    return;\n  }\n\n  // Remove loading indicator\n  const loadingCircle = document.querySelector('.loading-circle');\n  if (loadingCircle) loadingCircle.remove();\n\n  // Setup state links (one-time)\n  document.querySelectorAll('[structure-1]').forEach(link => {\n    const stateCode = link.getAttribute('structure-1').toUpperCase();\n    link.removeAttribute('data-discover');\n    link.setAttribute('href', 'javascript:void(0)');\n\n    // Remove any existing listeners by cloning\n    const newLink = link.cloneNode(true);\n    link.parentNode.replaceChild(newLink, link);\n\n    newLink.addEventListener('click', function(e) {\n      e.preventDefault();\n      e.stopPropagation();\n      handleStateClick(stateCode);\n    });\n  });\n\n  // Setup back buttons (one-time)\n  document.querySelectorAll('[structure-2=\"back\"], [structure-3=\"back\"], [structure-4=\"back\"]').forEach(btn => {\n    btn.removeAttribute('data-discover');\n    btn.setAttribute('href', 'javascript:void(0)');\n\n    // Remove existing listeners by cloning\n    const newBtn = btn.cloneNode(true);\n    btn.parentNode.replaceChild(newBtn, btn);\n\n    newBtn.addEventListener('click', function(e) {\n      e.preventDefault();\n      e.stopPropagation();\n      handleBackClick();\n    });\n  });\n\n  // Setup breadcrumb links (one-time)\n  document.querySelectorAll('[data-breadcrumb]').forEach(breadcrumb => {\n    const link = breadcrumb.closest('a');\n    if (link) {\n      link.removeAttribute('data-discover');\n      link.setAttribute('href', 'javascript:void(0)');\n\n      // Clone to remove existing listeners\n      const newLink = link.cloneNode(true);\n      link.parentNode.replaceChild(newLink, link);\n\n      const newBreadcrumb = newLink.querySelector('[data-breadcrumb]');\n      newLink.addEventListener('click', function(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        const type = newBreadcrumb.getAttribute('data-breadcrumb');\n        let name = newBreadcrumb.textContent.trim();\n\n        // Convert state names to codes\n        if (name === 'Maryland') name = 'MD';\n        if (name === 'Washington DC') name = 'DC';\n        if (name === 'Virginia') name = 'VA';\n\n        handleBreadcrumbClick(type, name);\n      });\n    }\n  });\n\n  SAW.initialized = true;\n  showScreen('state');\n\n  log('INIT', 'Widget initialization complete');\n  logJourney('WIDGET_READY', { totalServiceAreas: SAW.data.length });\n}\n\n// Start initialization\nsetTimeout(initWidget, 100);\n\n// Export for debugging\nwindow.SAW = SAW;\nwindow.showCounties = showCounties;\nwindow.showCities = showCities;\nwindow.showServices = showServices;\n\n});\n});\n\n\n</script>"}
executeScriptOnCanvas={false}
clientOnly={true}
className={`w-html-embed`} />
{Object.entries(
  // @ts-ignore
  ServiceRecords?.data?.data ?? {}
).map(([_key, collectionItem]: any) => {
  const index = Array.isArray(ServiceRecords?.data?.data) ? Number(_key) : _key;
  return (
<Fragment key={index}>
<div
className={`w-element`}>
{(!!collectionItem?.serviceLinks?.roofing?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.roofing?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + ' ' +'Roofing'}
</Link>
}
{(!!collectionItem?.serviceLinks?.siding?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.siding?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + "Siding"}
</Link>
}
{(!!collectionItem?.serviceLinks?.windows?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.windows?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + "Windows"}
</Link>
}
{(!!collectionItem?.serviceLinks?.gutters?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.gutters?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + "Gutters"}
</Link>
}
{(!!collectionItem?.serviceLinks?.exteriorTrim?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.exteriorTrim?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + "Exterior Trim"}
</Link>
}
{(!!collectionItem?.serviceLinks?.decks?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.decks?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + " Decks"}
</Link>
}
{(!!collectionItem?.serviceLinks?.doors?.slug) &&
<Link
href={"/services/" + collectionItem?.serviceLinks?.doors?.slug}
className={`w-element c1hwvjgs`}>
{collectionItem?.title + " " + "Doors"}
</Link>
}
</div>
</Fragment>
)
})
}
</div>
</section>
</Fragment_1>
</Slot>
<section
className={`w-element cvfl1ur`}>
<HtmlEmbed
code={"<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css\">\n\n\n\n\n\n<style>\n.weather_card {\n  position: relative;\n  transform-style: preserve-3d;\n}\n\n</style>\n\n"}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n\n html { font-size: 1rem; }\n  @media screen and (max-width:1458px) { html { font-size: calc(0.4146145610278373rem + 0.6423982869379015vw); } }\n  @media screen and (max-width:991px) { html { font-size: 1rem; } }\n  @media screen and (max-width:479px) { html { font-size: 1rem; } }\n\n  .text-size-tiny {\n  \tfont-size: 12px !important;\n  }\n  \n  .weather_info-wrap, .text-size-small {\n  \tfont-size: 14px !important;\n  }\n  \n  .weather_rain-logo {\n  \twidth: 10px;\n    height: 10px;\n  }\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n\n.swiper-wrapper.is-weather {\n  max-width: 200px;\n}\n  \n.swiper-slide.is--weather {\n  max-width: 10.875rem;\n  margin-right: 0.875rem;\n}\n  \n.weather_card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.125rem 1.125rem 1.25rem;\n  background-color: white;\n  border-radius: 0.25rem;\n  border: 1px solid var(--white-smoke);\n  line-height: 1;\n}\n\n.weather_card-top {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.text-weight-semibold {\n  font-weight: 400;\n}\n\n.text-style-allcaps {\n  text-transform: uppercase;\n}\n\n.weather_rain-wrap {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.weather_rain-logo {\n  width: 0.625rem;\n  height: 0.625rem;\n  object-fit: contain;\n}\n\n.text-weight-medium {\n  font-weight: 500;\n}\n\n.text-size-tiny {\n  font-size: 0.75rem;\n}\n\n.weather_card-image {\n  width: 6.125rem;\n  height: 6.125rem;\n  object-fit: cover;\n}\n\n.weather_card-bottom {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.weather_card-bottom-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.text-size-xxmedium {\n  font-weight: 500;\n  font-size: 1.375rem;\n  letter-spacing: -0.44px;\n}\n\n.text-color-light-grey-4 {\n  color: var(--light-grey-4);\n}\n\n.text-size-small {\n  font-size: 0.875rem;\n}\n\n.letter-spacing-4 {\n  letter-spacing: 0.04em;\n}\n</style>"}
className={`w-html-embed`} />
<div
className={`w-element c4vc9qx c9tjkc5 c160jcl9 c258kff c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 cyqy40m c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 c1ywbwet c1krf5e c160jcl9 cgz3rjk c4vc9qx c9tjkc5 cpb747a c9w70qr c1slj1sw c51lxbl cvfl1ur c4ph8p6 cvrapzf c1gq5osj cufdnsv cwq5w9j c19p1lxn cjq2hl6 c1sah678`}>
<div
className={`w-element c1numhkq c1a06u5s ci47oyq cq9q6h0 c1whwcqd c139pwc6 csimcn0 c123c5vo c1ab5oob cnikeys c10k3jam cn0qaoo c1kssyyd c3nuxyf c258kff c1l4lw7o c5rv8xx czyae1i c19xkq3v c1hce33d c1oxe5xw c1t8xhs1 cuwoxsi c1t4xpm1 c13g3obg`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 co72if5 c1sq4bmy c18mkjfw cgsbbz0 cq9r5tw ci18zyn c1350r63`}>
<p
input-location={"city-county"}
className={`w-element c11e10p2 cxfmh1z c61em0b`}>
{"Weather in Washington, DC"}
</p>
<div
custom-alert={"alert-wrap"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 ckdtkkn c16j9hpi c15juhpz c1dv1s7b c1g3mhtg c1gbsy9l c1ixax5u c11qcg9b c1ab5oob cnikeys c10k3jam cn0qaoo cqg76kr ${"weather_info-wrap"}`}>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.666672 13.5L8.00001 0.833344L15.3333 13.5H0.666672ZM2.96667 12.1667H13.0333L8.00001 3.50001L2.96667 12.1667ZM8.00001 11.5C8.18889 11.5 8.34723 11.4361 8.47501 11.3083C8.60278 11.1806 8.66667 11.0222 8.66667 10.8333C8.66667 10.6445 8.60278 10.4861 8.47501 10.3583C8.34723 10.2306 8.18889 10.1667 8.00001 10.1667C7.81112 10.1667 7.65278 10.2306 7.52501 10.3583C7.39723 10.4861 7.33334 10.6445 7.33334 10.8333C7.33334 11.0222 7.39723 11.1806 7.52501 11.3083C7.65278 11.4361 7.81112 11.5 8.00001 11.5ZM7.33334 9.50001H8.66667V6.16668H7.33334V9.50001Z\" fill=\"#B70D0D\"/>\n</svg>"}
className={`w-html-embed`} />
<p
custom-alert={"div-text"}
className={`w-element`}>
{"Raining this week"}
</p>
</div>
</div>
<div
className={`w-element`}>
<div
className={`w-element ${"swiper is-weather"}`}>
<div
className={`w-element ${"swiper-wrapper is-weather"}`}>
</div>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c139pwc6 cmi1mlx ${"weather_loader"}`}>
<div
className={`w-element c120nl7e cd04v2w cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"weather_widget_loader"}`} />
</div>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1jp5l9m cccxyu9 c5ftqtp c1ux94pn c139pwc6 c1sstzge cpfqtmb czdyxvn c13g3obg c1gq5osj cufdnsv`}>
<div
className={`w-element c1numhkq c1a06u5s c1j3nit7 c1s88tz3`}>
<h2
className={`w-element c311sj2 ca98neh cnvsn5k`}>
{"Now would be a good time to leakproof your roof."}
</h2>
<div
className={`w-element c139pwc6 cr10thc c13g3obg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn`}>
{"Minor leaks can turn into major issues quickly. With wet season in Washington, DC lasting an average of 4.5 months out of the year, don’t wait until you have to replace more than your roof."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq cqilze0 c1diokdk ct0qrmw c1ywbwet c1s88tz3`}>
<Link_1
href={"/quote"}
target={"_self"}
className={`w-link c1lvj0n cjsex2s c1kx9jzv cacmu18 c1numhkq c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1xtbw9p c1g3mhtg ch7xx7z c1hd4o6l c1lks1ql c1owcyig c1f8uhde c1ab5oob cnikeys c10k3jam cn0qaoo c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c13qspjq c1cqma02 c1jvw4nv c1yhof13 c18klwyf c1p4xat6 ckecbya c18hkk31 c1g4ycq3 cahz6x0 cmchden c1ou92f6 cimel00 c805dql cba5e3y c12uktu2 c15gxmz4 c1up450v c1ka8hwj c1plys2`}>
{"Get a Free Roof Quote"}
</Link_1>
<Link
href={"/blog/managing-roof-leaks"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n c1603wqb c1g3mhtg c18klwyf ch7xx7z c82qwqc cacmu18`}>
<p
className={`w-element`}>
{"Tips to Manage Roof Leaks"}
</p>
<div
className={`w-element crlq1it ckjdari c1numhkq`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 18 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.1785 14.9669L8.90566 13.6941L14.6693 7.93052L8.90566 2.16692L10.1785 0.894123L17.2149 7.93052L10.1785 14.9669Z\" fill=\"black\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.341937 7.03065L15.5419 7.03065L15.5419 8.83065L0.341937 8.83065L0.341937 7.03065Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed`} />
</div>
</Link>
</div>
</div>
</div>
</div>
</div>
</section>
<Slot>
<Fragment_1>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1lbbsf4 c1hv9hoi c9hh9yd c1kffis9 c1ab5oob cnikeys c10k3jam cn0qaoo c5ymgey c6ca0h crn8utr c147y3ls c2p0cuk`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk c1ywbwet c1krf5e c139pwc6 c4ph8p6 c14e2i27 cyzinkh c18p9ucu cqfdoz0 c1gq5osj ciylvte c18oqc5x`}>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{"Get a free quote"}
</Link>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg ce6x08i c1lg7bh9 ciylvte c18oqc5x c1exxhe2`}>
<Image
src={"/uploads/consult_headshot_jason_U3uq_Lok_P5b_PF_Nyjndw_Pc_7e5448d3bc.webp"}
width={200}
height={200}
alt={"Project consultant Jason"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<Image
src={"/uploads/consult_headshot_lance_n9_Lu_S_Gqtb_ZJBC_5_K_Jv_YQ_48_986cc58ed1.webp"}
width={200}
height={200}
alt={"Project consultant Lance"}
loading={"lazy"}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
<div
className={`w-element c1numhkq c1a06u5s cw8j8n1`}>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
{"Jason & Lance"}
</p>
<p
className={`w-element`}>
{"Project Consultants Serving Gaithersburg"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</Fragment_1>
</Slot>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1pit5s0 c3qgmhh c1txodcv`}>
<div
className={`w-element c1epvuph c1oxoitn c139pwc6 cjkauba`}>
<YouTube
url={"https://youtu.be/FDU7V60c_5A?si=awgjC8wxTNDsdf6S"}
title={"Roofing Company Washington DC | Flat Roofers "}
loading={"lazy"}
showRelatedVideos={false}
showPreview={true}
className={`w-you-tube cdmu5h7 c1hwvjgs cn87dm8 c1uhhf7h cnbug7k c8fjv4x cmnqq0u c11xvf6k cvvhtep`}>
<VimeoPreviewImage
alt={"YouTube video preview image"}
sizes={"100vw"}
optimize={true}
className={`w-preview-image cnbug7k cdmu5h7 cfrqxly c139pwc6 cjkauba`} />
<VimeoSpinner
className={`w-spinner cnbug7k ccgl4y2 cag2zqh c16efw4k c10vpd2y cz1gmor c6yclp8`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"c765c5cf3__e2CRglijn891\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" viewBox=\"0 0 128 128\" fill=\"currentColor\" width=\"100%\" height=\"100%\" style=\"display: block;\"><style>@keyframes e2CRglijn892_tr__tr{0%{transform:translate(64px,64px) rotate(90deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}50%{transform:translate(64px,64px) rotate(810deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}to{transform:translate(64px,64px) rotate(1530deg)}}@keyframes e2CRglijn892_s_p{0%,to{stroke:#39fbbb}25%{stroke:#4a4efa}50%{stroke:#e63cfe}75%{stroke:#ffae3c}}@keyframes e2CRglijn892_s_do{0%{stroke-dashoffset:251.89}2.5%,52.5%{stroke-dashoffset:263.88;animation-timing-function:cubic-bezier(.42,0,.58,1)}25%,75%{stroke-dashoffset:131.945}to{stroke-dashoffset:251.885909}}#c765c5cf3__e2CRglijn892_tr{animation:e2CRglijn892_tr__tr 3000ms linear infinite normal forwards}#c765c5cf3__e2CRglijn892{animation-name:e2CRglijn892_s_p,e2CRglijn892_s_do;animation-duration:3000ms;animation-fill-mode:forwards;animation-timing-function:linear;animation-direction:normal;animation-iteration-count:infinite}</style><g id=\"c765c5cf3__e2CRglijn892_tr\" transform=\"translate(64,64) rotate(90)\"><circle id=\"c765c5cf3__e2CRglijn892\" r=\"42\" fill=\"none\" stroke=\"#39fbbb\" stroke-dasharray=\"263.89\" stroke-dashoffset=\"251.89\" stroke-linecap=\"round\" stroke-width=\"16\" transform=\"scale(-1,1) translate(0,0)\"/></g></svg>"}
className={`w-html-embed`} />
</VimeoSpinner>
<VimeoPlayButton
aria-label={"Play button"}
className={`w-play-button cnbug7k c15zxcfo c1d1mxpw ccgl4y2 cag2zqh c5ps8o0 crrlzdp c1numhkq c1diokdk ch3nxmx c13qspjq c1cqma02 c1yhof13 c1jvw4nv cw0d079 c1mpqvj6 c81ebuq c18kyhsr c1d7h9xn c1b94vpf cz6rnt2 cdophux clbdcxf c14vbcx7 cguk5n0`}>
<div
aria-hidden={true}
className={`w-element c13za7x0 c1hstsjx cp5p6r2 c1hcv8qd`}>
<HtmlEmbed
code={"<svg fill=\"#ffffff\" height=\"100%\" width=\"60%\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 460.114 460.114\" xml:space=\"preserve\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <g> <path d=\"M393.538,203.629L102.557,5.543c-9.793-6.666-22.468-7.372-32.94-1.832c-10.472,5.538-17.022,16.413-17.022,28.26v396.173 c0,11.846,6.55,22.721,17.022,28.26c10.471,5.539,23.147,4.834,32.94-1.832l290.981-198.087 c8.746-5.954,13.98-15.848,13.98-26.428C407.519,219.477,402.285,209.582,393.538,203.629z\"></path> </g> </g> </g></svg>"}
className={`w-html-embed`} />
</div>
</VimeoPlayButton>
</YouTube>
</div>
<div
className={`w-element c1epvuph c1oxoitn c139pwc6 cjkauba`}>
<YouTube
url={"https://youtu.be/YQvoMIjUP9E?si=iZUziqbl1FWgzqKp"}
title={"Windows Washington DC | Capitol Improvements - Roofing & Siding Contractors"}
loading={"lazy"}
showRelatedVideos={false}
showPreview={true}
className={`w-you-tube cdmu5h7 c1hwvjgs cn87dm8 c1uhhf7h cnbug7k c8fjv4x cmnqq0u c11xvf6k cvvhtep`}>
<VimeoPreviewImage
alt={"YouTube video preview image"}
sizes={"100vw"}
optimize={true}
className={`w-preview-image cnbug7k cdmu5h7 cfrqxly c139pwc6 cjkauba`} />
<VimeoSpinner
className={`w-spinner cnbug7k ccgl4y2 cag2zqh c16efw4k c10vpd2y cz1gmor c6yclp8`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"c765c5cf3__e2CRglijn891\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" viewBox=\"0 0 128 128\" fill=\"currentColor\" width=\"100%\" height=\"100%\" style=\"display: block;\"><style>@keyframes e2CRglijn892_tr__tr{0%{transform:translate(64px,64px) rotate(90deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}50%{transform:translate(64px,64px) rotate(810deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}to{transform:translate(64px,64px) rotate(1530deg)}}@keyframes e2CRglijn892_s_p{0%,to{stroke:#39fbbb}25%{stroke:#4a4efa}50%{stroke:#e63cfe}75%{stroke:#ffae3c}}@keyframes e2CRglijn892_s_do{0%{stroke-dashoffset:251.89}2.5%,52.5%{stroke-dashoffset:263.88;animation-timing-function:cubic-bezier(.42,0,.58,1)}25%,75%{stroke-dashoffset:131.945}to{stroke-dashoffset:251.885909}}#c765c5cf3__e2CRglijn892_tr{animation:e2CRglijn892_tr__tr 3000ms linear infinite normal forwards}#c765c5cf3__e2CRglijn892{animation-name:e2CRglijn892_s_p,e2CRglijn892_s_do;animation-duration:3000ms;animation-fill-mode:forwards;animation-timing-function:linear;animation-direction:normal;animation-iteration-count:infinite}</style><g id=\"c765c5cf3__e2CRglijn892_tr\" transform=\"translate(64,64) rotate(90)\"><circle id=\"c765c5cf3__e2CRglijn892\" r=\"42\" fill=\"none\" stroke=\"#39fbbb\" stroke-dasharray=\"263.89\" stroke-dashoffset=\"251.89\" stroke-linecap=\"round\" stroke-width=\"16\" transform=\"scale(-1,1) translate(0,0)\"/></g></svg>"}
className={`w-html-embed`} />
</VimeoSpinner>
<VimeoPlayButton
aria-label={"Play button"}
className={`w-play-button cnbug7k c15zxcfo c1d1mxpw ccgl4y2 cag2zqh c5ps8o0 crrlzdp c1numhkq c1diokdk ch3nxmx c13qspjq c1cqma02 c1yhof13 c1jvw4nv cw0d079 c1mpqvj6 c81ebuq c18kyhsr c1d7h9xn c1b94vpf cz6rnt2 cdophux clbdcxf c14vbcx7 cguk5n0`}>
<div
aria-hidden={true}
className={`w-element c13za7x0 c1hstsjx cp5p6r2 c1hcv8qd`}>
<HtmlEmbed
code={"<svg fill=\"#ffffff\" height=\"100%\" width=\"60%\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 460.114 460.114\" xml:space=\"preserve\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <g> <path d=\"M393.538,203.629L102.557,5.543c-9.793-6.666-22.468-7.372-32.94-1.832c-10.472,5.538-17.022,16.413-17.022,28.26v396.173 c0,11.846,6.55,22.721,17.022,28.26c10.471,5.539,23.147,4.834,32.94-1.832l290.981-198.087 c8.746-5.954,13.98-15.848,13.98-26.428C407.519,219.477,402.285,209.582,393.538,203.629z\"></path> </g> </g> </g></svg>"}
className={`w-html-embed`} />
</div>
</VimeoPlayButton>
</YouTube>
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element czziw4w`}>
<div
className={`w-element c1numhkq c1a06u5s c3qgmhh`}>
<h3
className={`w-element cw3m79e c1qb2rp3 c82qwqc cn7k83s c1emvlx`}>
{"Local Testimonial from Washington, DC"}
</h3>
<p
className={`w-element c1g3mhtg cn5qs21 c1b2b7rn chdomh6`}>
{"\"Lance and the team were great. We replaced the entire roof and it was completed professionally and efficiently over a two day span. With the harsh storms we’ve been having, I have peace of mind knowing that there will be no leaking inside of the house.\""}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1350r63 c1otj3om cn3kss c1kioei4`}>
<Image
src={"/uploads/rating_stars_CVEF_Pd3_QYWQ_Ugq_S_viwp_M_c1b7210fab.svg"}
width={110}
height={20}
alt={"5 stars logo."}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs c1mcsn9a c1lwlytk c1owcyig`} />
<p
className={`w-element`}>
{"Danielle Platt  "}
<Link
href={"https://g.co/kgs/g3St5t"}
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
{"READ MORE HOMEOWNER TESTIMONIALS >"}
</Link_1>
</div>
</div>
</div>
</div>
</section>
<Slot>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
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
</Slot>
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
<HtmlEmbed
code={"<script type=\"module\">\nconst videoWrap = document.querySelector(\".hero-video-wrapper\");\nconst video = videoWrap.querySelector(\".hero-video\");\nvideo.addEventListener(\"ended\", function () {\n  videoWrap.style.display = \"none\";\n});\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</Body>
}


      export { Page }
    