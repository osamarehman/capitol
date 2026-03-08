/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, Box as Box, Slot as Slot, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text } from "@webstudio-is/sdk-components-react";
import { Link as Link, Link as Link_1, Body as Body } from "@webstudio-is/sdk-components-react-router";
import { NavigationMenu as NavigationMenu, NavigationMenuList as NavigationMenuList, NavigationMenuItem as NavigationMenuItem, NavigationMenuTrigger as NavigationMenuTrigger, NavigationMenuContent as NavigationMenuContent, NavigationMenuViewport as NavigationMenuViewport, Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent, Tabs as Tabs, TabsList as TabsList, TabsTrigger as TabsTrigger, TabsContent as TabsContent } from "@webstudio-is/sdk-components-react-radix";


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
code={"<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css\">\n<script src=\"https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js\"></script>\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css\">\n<script src=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js\"></script>\n\n<style>\n.swiper.is-gallery { display: none; }\n@media (max-width: 479px) { .swiper.is-gallery { display: block; } }\n.glightbox-container { display: flex; justify-content: center; align-items: center; }\n.glightbox-container .gslider { position: fixed; }\n.glightbox-clean .gclose,\n.glightbox-clean .gnext,\n.glightbox-clean .gprev,\n.glightbox-clean .gclose:hover,\n.glightbox-clean .gnext:hover,\n.glightbox-clean .gprev:hover {\n  background-color: transparent;\n  transition: opacity 250ms;\n}\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
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
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c876kpt cw6z3e9 c7iyr7r cmpwmbp csaxcaf c1n30c32 c7uvk8q cwsled4`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cb7wkl5 c1numhkq c3auquk co72if5 c4ph8p6 c119v29c c13d76g4`}>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3 c139pwc6 c1bijp3c c13g3obg`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw`}>
<Link
href={"/roofing"}
target={"_self"}
className={`w-element cprvrz2 c1numhkq cacmu18 c1ezjj73 c1diokdk ct0qrmw c1ym9r0h cahz6x0 cmchden`}>
<Image
src={"https://v2.improveitmd.com/uploads/back_arrow_7ct_Ki_1_M_Fxgf_Dopuj_Oirn_1324e03b80.svg"}
width={13}
height={12}
alt={"Back arrow icon."}
loading={"eager"}
className={`w-image c3hv8l5 c1hwvjgs cdmu5h7 czbu68a cr7f20h`} />
<p
className={`w-element ch7xx7z c1v90cn6 c82qwqc c1lwn44j c1fjww6l cn7k83s`}>
{" Back to Roofing"}
</p>
</Link>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1s88tz3`}>
<h1
className={`w-element cixr02m c1rfqsq6 ckecbya c82qwqc c4c2xkh`}>
{"Asphalt Roofing"}
</h1>
<p
className={`w-element cn5qs21 c1b2b7rn c82qwqc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Asphalt shingles provide long-lasting value. With a variety of styles and colors, we’re able to refresh your existing style with high quality materials and lifetime warranties."}
</p>
</div>
</div>
<div
className={`w-element c5zgd1 c139pwc6 c1hmvws`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1irdqs7`}>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l cn7k83s`}>
{"Table of Contents"}
</p>
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={"/roofing/asphalt-roofing#photo-gallery"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Photo Gallery"}
</Link>
</li>
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={"/roofing/asphalt-roofing#a-leak-proof-roof"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"A Leak-Proof Roof"}
</Link>
</li>
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={"/roofing/asphalt-roofing#lifetime-warranty"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Lifetime Warranty"}
</Link>
</li>
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={"/roofing/asphalt-roofing#shingle-options"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Shingle Options"}
</Link>
</li>
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={"/roofing/asphalt-roofing#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing"}
</Link>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
<section
id={"photo-gallery"}
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1 c1lw2btb`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element cmsm1bz c1pit5s0 c3qgmhh c1omlw60 c1txodcv curgy1m c10bzxv c7hl7p0`}>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_6_0fdc9391ae.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
alt={"A after photo of an asphalt shingled roof installed in Maryland."}
loading={"eager"}
src={"https://v2.improveitmd.com/uploads/WM_6_0fdc9391ae.WEBP"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_3_ad1bb957ad.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
alt={"Installation photos of a new GAF Timberline HDZ Shakewood color roof. "}
loading={"eager"}
src={"https://v2.improveitmd.com/uploads/WM_3_ad1bb957ad.WEBP"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_5_7d9bb74dcb.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_5_7d9bb74dcb.WEBP"}
width={742}
height={506}
alt={"capitol improvements Image"}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_4_55995d8770.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/hero_roofing_img_blj_LZC_6_Xm_HLT_7_BC_Eq_A_Lb_ed0ff83837.jpg"}
width={2560}
height={968}
alt={"Crew carrying plywood to the roof. "}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_1_1030f7e05e.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_1_1030f7e05e.WEBP"}
width={1600}
height={1200}
alt={"Drone photo of new roof installation in Germantown, MD."}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
<Link
data-gallery={"gallery"}
href={"https://v2.improveitmd.com/uploads/WM_2_282a6cc7b3.WEBP"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_2_282a6cc7b3.WEBP"}
width={1200}
height={647}
alt={"Photo of a mixed shingled and flat roof in DC. "}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c139pwc6 cn87dm8 c1uhhf7h c1epvuph c1lzjd2w c9te4zd c10gaxzd ${"swiper is-gallery"}`}>
<div
className={`w-element c1numhkq c139pwc6 ${"swiper-wrapper is-gallery"}`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/roofing_img_mMaI36eZ1gBTzeG8-9zAr.webp"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/roofing_img_m_Ma_I36e_Z1g_B_Tze_G8_9z_Ar_ad9f7def80.webp"}
width={742}
height={506}
alt={"A after photo of an asphalt shingled roof installed in Maryland."}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/crew_roofing_asphalt_shingles_v098SFpQhpwEd-YiNtzta.webp"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/crew_roofing_asphalt_shingles_v098_S_Fp_Qhpw_Ed_Yi_Ntzta_63cca05445.webp"}
width={832}
height={928}
alt={"Installation photos of a new GAF Timberline HDZ Shakewood color roof. "}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/roofing_asphalt_esQbhNuhcJU3WM9bC7FTB.webp"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/roofing_asphalt_es_Qbh_Nuhc_JU_3_WM_9b_C7_FTB_201eac4db7.webp"}
width={742}
height={506}
alt={"capitol improvements Image"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/hero_roofing_img_bljLZC6XmHLT7BCEqALb_.jpg"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/hero_roofing_img_blj_LZC_6_Xm_HLT_7_BC_Eq_A_Lb_4607e5af3d.jpg"}
width={2560}
height={968}
alt={"Crew carrying plywood to the roof. "}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/roof_replacement_gaithersburg_N0B562_h29lrYpN2AAt88.webp"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/roof_replacement_gaithersburg_N0_B562_h29lr_Yp_N2_A_At88_a42f9c3f52.webp"}
width={1600}
height={1200}
alt={"Drone photo of new roof installation in Germantown, MD."}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c1epvuph c18pmdjw c1dz6v9s ${"swiper-slide"}`}>
<Link
data-gallery={"gallery-mobile"}
href={"/assets/atlas_pinnacle_pristing_roofing_mjqbDKkpYlbctkLg_5LSZ.webp"}
className={`w-element c1numhkq ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/atlas_pinnacle_pristing_roofing_mjqb_D_Kkp_Ylbctk_Lg_5_LSZ_0045d30660.webp"}
width={1200}
height={647}
alt={"Photo of a mixed shingled and flat roof in DC. "}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c14ixlc6 cis9rsd cknnq3k`} />
</Link>
</div>
</div>
</div>
</div>
</div>
</section>
<section
id={"a-leak-proof-roof"}
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c876kpt c19wzbh8 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c1jp5l9m cccxyu9 c17khrm5 cx6nag7 cd6izue cc9twoz cvfl1ur c1e31mqg c1ypbuo2 cnods77 c1yt6hv7 cyyof5h c1t9puix cuwoxsi c1t4xpm1 c19p1lxn`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 c1czy0yv c17crvds cn83qn8 c4ph8p6 c1lzxrwn cyovuht ${"product-top-row"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1g6iued c7r3o1f cd311gm c5d3i40 cyovuht cgsbbz0 cq9r5tw`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"A Leak-Proof Roof"}
</h2>
<div
className={`w-element c139pwc6 csxrgfj c13g3obg`}>
<p
className={`w-element c1d8rs8t c1b2b7rn c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{"Your roof is more than just shingles. We carefully inspect and install the entire roofing system that exceeds local building code to keep your home insulated, beautiful, and secure."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Each part of a roofing system is designed to bolster a weak point of your roofing architecture, reinforcing areas which are susceptible to leaking."}
</p>
</div>
</div>
<div
className={`w-element c1c47xlj c139pwc6 c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/lifetime_roofing_system_u_Um_BH_Ejzxm_O5_Uz4_Rgf_GY_a94e159b48.webp"}
width={1532}
height={1376}
alt={"Lifetime roofing system illustration"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c1ux94pn c63b5q4 c1784h8b`} />
</div>
</div>
<Accordion
collapsible={true}
className={`w-accordion c1numhkq cz28oyv c8xypon c4ph8p6 cqfdoz0`}>
<div
className={`w-element c1numhkq c1a06u5s c1pit5s0 c3qgmhh c1uclgp3 cyovuht`}>
<AccordionItem
data-ws-index="0"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"01"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Wood Deck"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"A solid wooden base is needed for nailing and creating a strong foundation for the layers of your roof. Removing old roofing materials allows us to address problems such as rotten wood or cracked boards, leaving a strong deck to install your new roof onto."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"02"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Flashing"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Flashing is used to seal and protect joints in a building from water penetration by directing the flow of water away from vulnerable areas. Varieties of flashing which may be used include step, apron, and counter flashing."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"03"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Leak Barrier"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Ice & Water Shield is a 100% watertight membrane that protects your home from extreme weather events that try to drive rain into your home. It is installed at the eaves, valleys, chimney, vents, and skylights, ensuring your roof is completely sealed and protected."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"04"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Deck Protection"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Synthetic underlayment provides an extra layer of protection between your shingles and roof deck. This water resistant layer is lighter and stronger than traditional felt, keeping your roof durable as it wicks moisture away."}
</p>
</div>
</AccordionContent>
</AccordionItem>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1pit5s0 c3qgmhh c1uclgp3 cyovuht`}>
<AccordionItem
data-ws-index="4"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"05"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Drip Edge"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Drip edge is an added layer of waterproofing installed around the roof line. This piece of aluminum ensures no damage occurs beneath shingles by sealing and protecting the roof deck from water rollback and driving rains."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="5"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"06"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Starter Shingles"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Pre-cut starter strip shingles speed up installation while helping prevent shingle blow-off. These shingles include factory-applied adhesive strips, which ensure enhanced wind resistance and a uniform finish to your roof."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="6"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"07"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Lifetime Shingles"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Shingles are vital and the first line of defense in keeping your home protected from the forces of nature. All of our shingles are covered by a Lifetime Warranty, so you can have peace of mind knowing your home is protected."}
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="7"
className={`w-item cniq5v2 c7o4d43 c93dq2c c1x03pn0 c16gkglq cyovuht`}>
<AccordionHeader
className={`w-item-header c1numhkq`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq c1diokdk c3auquk c1pit5s0 c3qgmhh cnwi6s4 cxte6uv c1owwlzw c1d7h9xn cvtl69h c1tn4ulv ${"AccordionCross"}`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1pit5s0 c3qgmhh`}>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"08"}
</Text>
<Text
className={`w-text cn7k83s cxfmh1z c73m4y9 ckecbya c82qwqc`}>
{"Attic Ventilation"}
</Text>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cdllpq2 c18lsh9j c1epvuph`}>
<div
className={`w-element cnb803a cjkauba cnbug7k c1fpx1ml ${"CrossIconLine"}`} />
<div
className={`w-element c139pwc6 curn72k cnbug7k c1fpx1ml`} />
</div>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h ${"AccordionContent Cross"}`}>
<div
className={`w-element c7htweh`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"A ridge vent along with ridge cap shingles are installed to help remove excess heat and moisture from your attic. These variables could cause premature aging of your roofing system, but attic ventilation works to prevent this."}
</p>
</div>
</AccordionContent>
</AccordionItem>
</div>
</Accordion>
</div>
</div>
</div>
</section>
<section
id={"lifetime-warranty"}
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk co72if5 c185jzsb cjoeshh c1u2ofx5 c19wk7qn cvfl1ur c4ph8p6 c14e2i27 c1t9puix csaxcaf c1n30c32 cnods77 c1yt6hv7 cmy3513 cio262d cuwoxsi c1t4xpm1 c7uvk8q c1br65qh cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c8rh0h1 c1s19qlc c1m1w9fz c1sy7qlo c13g3obg crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Lifetime warranties from the best."}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We meet the highest standard in continual training to offer you "}
<Link
href={"/warranty"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"manufacturer backed warranties"}
</Link>
{". All our roofing projects include a transferrable lifetime warranty."}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ch3nxmx c3qgmhh c139pwc6 c1bkmg5n c13g3obg`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1bovvx6 c1e32zli c876kpt c1h1hq7o c19wzbh8 cjsex2s c139pwc6 c1cpslk3 c1cf96bh c1cczgcx c1kyon4n c1bfl1ip c1rbv5h6 czyae1i c1350r63 cjxf3k8 ckllmit c1efecqs cmx9i5 c15gxmz4 c1exxhe2`}>
<div
className={`w-element c1numhkq ch3nxmx c1b0n9b c1owcyig c1izmw4d`}>
<Link
href={"https://www.gaf.com/en-us/roofing-contractors/residential/usa/md/bowie/capitol-improvements-llc-1005901"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 c1p4xat6 cahz6x0 cmchden`}>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Master_Elite_logo_IXAG_1i_C4u55_D4_F_0_XD_Vw_C_b21122fa64.svg"}
width={118}
height={118}
alt={"GAF Master Elite logo signifying our certified installer status. "}
loading={"lazy"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a c5rq1pv`} />
</Link>
</div>
<p
className={`w-element ch7xx7z c8d36da c82qwqc c1lwn44j c1fjww6l`}>
<b
className={`w-element`}>
{"GAF Roofing"}
</b>
{""}
<br />
{""}
{"50 Year Material & Labor"}
{""}
<br />
{""}
{"25 Year Workmanship"}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1bovvx6 c1e32zli c876kpt c1h1hq7o c19wzbh8 cjsex2s c139pwc6 c1cpslk3 c1cf96bh c1cczgcx c1kyon4n c1bfl1ip c1rbv5h6 czyae1i c1350r63 cjxf3k8 ckllmit c1efecqs cmx9i5 c15gxmz4 c1exxhe2`}>
<div
className={`w-element c1numhkq ch3nxmx c1b0n9b c1owcyig c1izmw4d`}>
<Image
src={"https://v2.improveitmd.com/uploads/atlas_platinum_logo_Vm_Kf_BXGH_Zlq_Tz6bn_B_Qm1w_75cf398ac0.svg"}
width={102}
height={104}
alt={"Atlas Pro+ Platinum Logo."}
loading={"lazy"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a c5rq1pv`} />
</div>
<p
className={`w-element ch7xx7z c8d36da c82qwqc c1lwn44j c1fjww6l`}>
<b
className={`w-element`}>
{"Atlas Roofing"}
</b>
{""}
<br />
{""}
{"50 Year Material & Labor"}
{""}
<br />
{""}
{"7 Year Workmanship"}
</p>
</div>
</div>
</div>
</div>
</div>
</section>
<section
id={"shingle-options"}
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s cd38l1u c162lc76 c1wmki9e cx6nag7 cc9twoz cvfl1ur c1e31mqg c1ypbuo2 cnods77 c1yt6hv7 cwq5w9j c19p1lxn cuwoxsi c1t4xpm1`}>
<div
className={`w-element c1numhkq c1a06u5s cj1o4tp c1q4fbwg`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"The Industry’s Best 2 Shingles"}
</h2>
<div
className={`w-element cs3r3mw`}>
<p
className={`w-element c1d8rs8t c1b2b7rn cy60nkm c1lwn44j c1fjww6l c1g3mhtg`}>
{"We’ve simplified the selection process for you. These are the two shingles we recommend to our customers everyday."}
</p>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c8xypon`}>
<div
className={`w-element c1numhkq c1a06u5s cd5ljz csjndnx cjxj442 cwoyb2f ce5vhrg c1ku6fsh c1epvuph crs08xf cnods77 c1yt6hv7 c17bzoun cuwoxsi c1t4xpm1 c1hce33d c1oxe5xw cljixpu`}>
<div
className={`w-element c1numhkq c1a06u5s c1sjfwqi cc9ojx c1e3aa3w cyovuht`}>
<div
className={`w-element c1numhkq c1a06u5s`}>
<h3
className={`w-element c92kv7i c19fqb9a c1cxkcjg c1g3mhtg c1lwn44j c1fjww6l c1emvlx`}>
{"Atlas Pinnacle Pristine"}
</h3>
<p
className={`w-element c1g3mhtg c1gbsy9l c8d36da c1w9fs99`}>
{"With 3M Scotchgard Protector"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s clyq9ux ckjs1ij`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw ckjs1ij clyq9ux c18klwyf chxc8gf c1vgwqmx`}>
<HtmlEmbed
code={"<svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 6L4.5 9.5L9.5 0.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg`}>
{"Scotchgard Streak Proof"}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw ckjs1ij clyq9ux c18klwyf chxc8gf c1vgwqmx`}>
<HtmlEmbed
code={"<svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 6L4.5 9.5L9.5 0.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg`}>
{"Best Quality & Long-term Aesthetic"}
</p>
</div>
</div>
</div>
<div
className={`w-element c1e3aa3w cyovuht`}>
<Tabs
value={"0"}
className={`w-tabs`}>
<TabsList
className={`w-tabs-list c1numhkq c1joqzpq c1svm01r cyitx8x cqilze0 c1txodcv curgy1m cx3wx9c c18cwd1z c9dbsxh c1dddblu c19t5wsu`}>
<TabsTrigger
data-ws-index="0"
data-tab-id={"atlas-1"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_10_26599d0638.WEBP"}
alt={"Pinnacle Pristine Majestic Shake"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="1"
data-tab-id={"atlas-2"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_5_7e57a7e12d.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Tan Mist"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="2"
data-tab-id={"atlas-3"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_6_c7a0ec2ce9.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Sunset"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="3"
data-tab-id={"atlas-4"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_13_70201b0d55.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Copper Canyon"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="4"
data-tab-id={"atlas-5"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Black Shadow"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="5"
data-tab-id={"atlas-6"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_2_1de2e21b35.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Woodland Green"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="6"
data-tab-id={"atlas-7"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_4_8aaf5f9e7e.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Weathered Shadow"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="7"
data-tab-id={"atlas-8"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_7_5890bcaf2c.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Summer Storm"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="8"
data-tab-id={"atlas-9"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_1_f02d9b325a.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Morning Harvest"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="9"
data-tab-id={"atlas-10"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_11_5aecd35a61.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Heatherblend"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="10"
data-tab-id={"atlas-11"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_14_f6c147d81f.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Coastal Granite"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="11"
data-tab-id={"atlas-12"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_15_09a3120383.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Burnt Hickory"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="12"
data-tab-id={"atlas-13"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_12_0f027af509.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Hearthstone"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="13"
data-tab-id={"atlas-14"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_3_ebfb44657c.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Weathered Wood"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="14"
data-tab-id={"atlas-15"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_9_9251f4162f.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Oyster Shell"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="15"
data-tab-id={"atlas-16"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Pewter"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
</TabsList>
<div
className={`w-element cxz0ozl c3wvy91 c1x5xbjr c11ubq38 cnbug7k c4wcauq cmhuipo c19wpft8 c9i7viq c1c1sfe3 cyovuht cjm2rxl cknnq3k`}>
<TabsContent
data-ws-index="0"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba ${"tab-pane"}`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_10_26599d0638.WEBP"}
data-tab={"atlas-1"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_10_26599d0638.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Majestic Shake"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Majestic Shake"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="1"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba ${"tab-pane"}`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_5_7e57a7e12d.WEBP"}
data-tab={"atlas-2"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_5_7e57a7e12d.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Tan Mist"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Tan Mist"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="2"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_6_c7a0ec2ce9.WEBP"}
data-tab={"atlas-3"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_6_c7a0ec2ce9.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Sunset"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Sunset"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="3"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_13_70201b0d55.WEBP"}
data-tab={"atlas-4"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_13_70201b0d55.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Copper Canyon"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Copper Canyon"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="4"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
data-tab={"atlas-5"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Black Shadow"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Black Shadow"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="5"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_2_1de2e21b35.WEBP"}
data-tab={"atlas-6"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_2_1de2e21b35.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Woodland Green"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Woodland Green"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="6"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_4_8aaf5f9e7e.WEBP"}
data-tab={"atlas-7"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_4_8aaf5f9e7e.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Weathered Shadow"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Weathered Shadow"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="7"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_7_5890bcaf2c.WEBP"}
data-tab={"atlas-8"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_7_5890bcaf2c.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Summer Storm"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Summer Storm"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="8"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_1_f02d9b325a.WEBP"}
data-tab={"atlas-9"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_1_f02d9b325a.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Morning Harvest"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Morning Harvest"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="9"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_11_5aecd35a61.WEBP"}
data-tab={"atlas-10"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_11_5aecd35a61.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Heatherblend"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Heatherblend"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="10"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_14_f6c147d81f.WEBP"}
data-tab={"atlas-11"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_14_f6c147d81f.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Coastal Granite"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Coastal Granite"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="11"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_15_09a3120383.WEBP"}
data-tab={"atlas-12"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_15_09a3120383.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Burnt Hickory"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Burnt Hickory"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="12"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_12_0f027af509.WEBP"}
data-tab={"atlas-13"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_12_0f027af509.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Hearthstone"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Hearthstone"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="13"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_3_ebfb44657c.WEBP"}
data-tab={"atlas-14"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_3_ebfb44657c.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Weathered Wood"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Weathered Wood"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="14"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_9_9251f4162f.WEBP"}
data-tab={"atlas-15"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_9_9251f4162f.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Oyster Shell"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Oyster"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="15"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
data-tab={"atlas-16"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_eeaca0a6ed.WEBP"}
width={1005}
height={1005}
alt={"Pinnacle Pristine Pewter"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/Scotchgard_Mn_O_Ds_IU_6u_Mm4bu_gmz_D46_d2fb7381bf.svg"}
width={104}
height={78}
alt={"Scotchgard logo"}
className={`w-image c16o0ff7 c1hwvjgs cdmu5h7 czbu68a cmlmlsv cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Pewter"}
</p>
</div>
</div>
</div>
</TabsContent>
</div>
</Tabs>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s cd5ljz csjndnx cjxj442 cwoyb2f ce5vhrg c1ku6fsh c1epvuph crs08xf cnods77 c1yt6hv7 c17bzoun cuwoxsi c1t4xpm1 c1hce33d c1oxe5xw cljixpu`}>
<div
className={`w-element c1numhkq c1a06u5s c1sjfwqi cc9ojx c1e3aa3w cyovuht`}>
<div
className={`w-element c1numhkq c1a06u5s`}>
<h3
className={`w-element c92kv7i c19fqb9a c1cxkcjg c1g3mhtg c1lwn44j c1fjww6l c1emvlx`}>
{"GAF Timberline HDZ"}
</h3>
<p
className={`w-element c1g3mhtg c1gbsy9l c8d36da c1w9fs99`}>
{"(INCLUDING TIMBERLINE UHDZ)"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s clyq9ux ckjs1ij`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw ckjs1ij clyq9ux c18klwyf chxc8gf c1vgwqmx`}>
<HtmlEmbed
code={"<svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 6L4.5 9.5L9.5 0.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg`}>
{"LayerLock™ Technology"}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw ckjs1ij clyq9ux c18klwyf chxc8gf c1vgwqmx`}>
<HtmlEmbed
code={"<svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1 6L4.5 9.5L9.5 0.5\" stroke=\"black\" stroke-width=\"2\"/>\n</svg>"}
className={`w-html-embed`} />
<p
className={`w-element c1g3mhtg`}>
{"Best Lifetime Warranty"}
</p>
</div>
</div>
</div>
<div
className={`w-element c1e3aa3w cyovuht`}>
<Tabs
value={"0"}
className={`w-tabs`}>
<TabsList
className={`w-tabs-list c1numhkq c1joqzpq c1svm01r cyitx8x cqilze0 c1txodcv curgy1m cx3wx9c c18cwd1z c1dddblu c9dbsxh c19t5wsu`}>
<TabsTrigger
data-ws-index="0"
data-tab-id={"gaf-1"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_6_881f186a8f.WEBP"}
alt={"GAF Patriot Red"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="1"
data-tab-id={"gaf-2"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_9_a53b0456a5.WEBP"}
alt={"GAF Hickory"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="2"
data-tab-id={"gaf-3"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_4_b027de8d18.WEBP"}
alt={"GAF Shakewood"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="3"
data-tab-id={"gaf-4"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_2_dad05733ed.WEBP"}
alt={"GAF Weathered Wood"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="4"
data-tab-id={"gaf-5"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_10_29f435e554.WEBP"}
alt={"GAF Fox Hollow Gray"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="5"
data-tab-id={"gaf-6"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_13_8a28ec842c.WEBP"}
alt={"GAF Barkwood"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="6"
data-tab-id={"gaf-7"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_12_ad33cea215.WEBP"}
alt={"GAF Biscayne Blue"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="7"
data-tab-id={"gaf-8"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_7ab0224026.WEBP"}
alt={"GAF Hunter Green"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="8"
data-tab-id={"gaf-9"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_1_936efdaf4d.WEBP"}
alt={"GAF Williamsburg Slate"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="9"
data-tab-id={"gaf-10"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_5_c571763e58.WEBP"}
alt={"GAF Pewter Gray"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="10"
data-tab-id={"gaf-11"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_7_c1f58ec520.WEBP"}
alt={"GAF Mission Brown"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="11"
data-tab-id={"gaf-12"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_3_bac9555abf.WEBP"}
alt={"GAF Slate"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
<TabsTrigger
data-ws-index="12"
data-tab-id={"gaf-13"}
className={`w-tab-trigger cc9m297 clz6t72 c1ryk5rj c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn cvtl69h cyovuht celyf79 ckpkyrq c4s19ss`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_11_a17cf15d61.WEBP"}
alt={"GAF Charcoal"}
loading={"lazy"}
width={1005}
height={1005}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</TabsTrigger>
</TabsList>
<div
className={`w-element cxz0ozl c3wvy91 c1x5xbjr c11ubq38 cnbug7k c4wcauq cmhuipo c19wpft8 c9i7viq c1c1sfe3 cyovuht cjm2rxl cknnq3k`}>
<TabsContent
data-ws-index="0"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba ${"tab-pane"}`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_6_881f186a8f.WEBP"}
data-tab={"gaf-1"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_6_881f186a8f.WEBP"}
width={1005}
height={1005}
alt={"GAF Patriot Red"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Patriot Red"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="1"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba ${"tab-pane"}`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_9_a53b0456a5.WEBP"}
data-tab={"gaf-2"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_9_a53b0456a5.WEBP"}
width={1005}
height={1005}
alt={"GAF Hickory"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Hickory"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="2"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_4_b027de8d18.WEBP"}
data-tab={"gaf-3"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_4_b027de8d18.WEBP"}
width={1005}
height={1005}
alt={"GAF Shakewood"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Shakewood"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="3"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_2_dad05733ed.WEBP"}
data-tab={"gaf-4"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_2_dad05733ed.WEBP"}
width={1005}
height={1005}
alt={"GAF Weathered Wood"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Weathered Wood"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="4"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_10_29f435e554.WEBP"}
data-tab={"gaf-5"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_10_29f435e554.WEBP"}
width={1005}
height={1005}
alt={"GAF Fox Hollow Gray"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Fox Hollow Gray"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="5"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_13_8a28ec842c.WEBP"}
data-tab={"gaf-6"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_13_8a28ec842c.WEBP"}
width={1005}
height={1005}
alt={"GAF Barkwood"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Barkwood"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="6"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_12_ad33cea215.WEBP"}
data-tab={"gaf-7"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_12_ad33cea215.WEBP"}
width={1005}
height={1005}
alt={"GAF Biscayne Blue"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Biscayne Blue"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="7"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_8_7ab0224026.WEBP"}
data-tab={"gaf-8"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_8_7ab0224026.WEBP"}
width={1005}
height={1005}
alt={"GAF Hunter Green"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Hunter Green"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="8"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_1_936efdaf4d.WEBP"}
data-tab={"gaf-9"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_1_936efdaf4d.WEBP"}
width={1005}
height={1005}
alt={"GAF Williamsburg Slate"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Williamsburg Slate"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="9"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_5_c571763e58.WEBP"}
data-tab={"gaf-10"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_5_c571763e58.WEBP"}
width={1005}
height={1005}
alt={"GAF Pewter Gray"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Pewter Gray"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="10"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_7_c1f58ec520.WEBP"}
data-tab={"gaf-11"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_7_c1f58ec520.WEBP"}
width={1005}
height={1005}
alt={"GAF Mission Brown"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Mission Brown"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="11"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_3_bac9555abf.WEBP"}
data-tab={"gaf-12"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_3_bac9555abf.WEBP"}
width={1005}
height={1005}
alt={"GAF Slate"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Slate"}
</p>
</div>
</div>
</div>
</TabsContent>
<TabsContent
data-ws-index="12"
className={`w-tab-content c1da6u5y c1upof9w c139pwc6 cjkauba`}>
<div
className={`w-element c139pwc6 cjkauba c1epvuph`}>
<Link
href={"https://v2.improveitmd.com/uploads/WM_11_a17cf15d61.WEBP"}
data-tab={"gaf-13"}
className={`w-element c1numhkq c139pwc6 cjkauba ${"glightbox"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/WM_11_a17cf15d61.WEBP"}
width={1005}
height={1005}
alt={"GAF Charcoal"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_b15be2aba4.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c9i7viq c4wcauq c1r07he0 c1dufz1a c1tj1u8y c13fgfc4 c15gxmz4 c1rd81kf`} />
<div
className={`w-element c1numhkq c1diokdk c3auquk c1joqzpq c1svm01r c1x71vgz cmazgdu c1mndhrk c2j7e41 cnbug7k c1vue08o c4ily4v c19wpft8 c189czh1 c1g3mhtg c1gbsy9l c6010nj c1lvj0n c1vgwqmx c1nu77pt c1jyyt23 c1nnsgto c13zf6d8 c1emolb3`}>
<div
className={`w-element c1numhkq c1mawer5 cqbng2l`}>
<p
className={`w-element c1w9fs99`}>
{"Charcoal"}
</p>
</div>
</div>
</div>
</TabsContent>
</div>
</Tabs>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1epvuph c1nu77pt c1t561u7 ccsg5nn cisippn`}>
<div
className={`w-element cp47n90 c1k26eho cl4dpup`}>
<Image
src={"https://v2.improveitmd.com/uploads/grand_canyon_mission_brown_Xf_XF_Iwd8w_Mt_N2v_M02_L_Jr_59d4f01144.webp"}
width={1329}
height={990}
alt={"grand canyon mission brown"}
loading={"lazy"}
className={`w-image c139pwc6 c1numhkq cdmu5h7 czbu68a c1hcwvbj cknnq3k`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1sq4bmy co72if5 cb8p2gr c4vc9qx c1lvj0n c1yt6hv7 c16vx5be cl4dpup c1t4xpm1 cuwoxsi cwq5w9j c19p1lxn`}>
<div
className={`w-element c1numhkq c1a06u5s c1joqzpq c1svm01r c1b9a0zw`}>
<h2
className={`w-element c92kv7i c19fqb9a c1cxkcjg c1lwn44j c1fjww6l c1pjr8f c1rjplas c1emvlx c1nxn35q`}>
{"GAF Designer Shingles"}
</h2>
<p
className={`w-element c1d8rs8t c1b2b7rn c1lvj0n c1lwn44j c1fjww6l c1g3mhtg`}>
{"Interested in a more distinct look? We offer Designer shingles from GAF, covered by the best Lifetime Warranty."}
</p>
</div>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1svm01r c1joqzpq c16ywooc cvxyhye cyy7snz c3xuimg ch7xx7z c18klwyf ckecbya c1g3mhtg c1lvj0n c1ryk5rj c1ab5oob cnikeys c10k3jam cn0qaoo c1wejst9 cacmu18 crk6taj`}>
<p
className={`w-element`}>
{"Get a Free Roofing Quote"}
</p>
</Link>
</div>
<Image
src={"https://v2.improveitmd.com/uploads/GAF_Lifetime_Badge_5_U_H4_Fz_Zhllvzi_Zp_Rj_GKP_f3643916ae.svg"}
width={102}
height={102}
alt={"capitol improvements Image"}
className={`w-image c1uwvjnr c1hwvjgs cdmu5h7 czbu68a c1g241l0 cnbug7k cdof9f0 c1n0ty85 c4wcauq c1r07he0 cs0io4s`} />
</div>
</div>
</div>
</section>
<section
id={"financing"}
className={`w-element`}>
<div
className={`w-element c4vc9qx c9tjkc5 c5zgd1 c11b3qd4 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 c1u2ofx5 cvfl1ur c1jyyt23 c1nnsgto c13zf6d8 c1emolb3 c1x4khyv cvzj4vi c1t9puix c1784h8b c135vs31 c1ypbuo2 c19p1lxn cles91e czr9sbv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ch3nxmx c1s88tz3 c15lzzou c139pwc6 c1sstzge c13g3obg c1m1w9fz c1sy7qlo c1s19qlc crfoyae cuwoxsi c4fmmfv c147y3ls`}>
<Image
src={"https://v2.improveitmd.com/uploads/logo_enerbank_KYZ_9_Wocf_Ri88302llq_G7_Q_c02a952618.svg"}
width={713}
height={111}
alt={"Enerbank USA financing logo."}
className={`w-image c9slfh6 c1r9455y c18hkk31 c1pmjbur c1mcsn9a`} />
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Offering Roof Financing. Financing Made Easy."}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"You won't pay a dime until the project is completed, with payments as low as $99/month."}
<sup
className={`w-element`}>
{"1"}
</sup>
{" Getting approved is quick and easy."}
</p>
<Link_1
href={"/financing"}
target={"_self"}
className={`w-link cvljm31 crv3s27 cacmu18 cn7k83s cyc4l41 c1d7h9xn c8a9tkm c1r2737e cgtmmxo c1cukx3 c3su6au cahz6x0 cmchden cdvg2t`}>
{"LEARN MORE >"}
</Link_1>
</div>
<div
className={`w-element c139pwc6 cjhysm8 cjkauba c13g3obg`}>
<Image
src={"https://v2.improveitmd.com/uploads/video_thumbnail_img_jica_ILCYK_2_M1f_BB_2_Cw_Kg9_e531a9140f.webp"}
width={960}
height={1034}
alt={""}
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
className={`w-element c4vc9qx c9tjkc5 c876kpt c19wzbh8 c7iyr7r cmpwmbp`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk c1f8uhde c4ph8p6 cvrapzf`}>
<div
className={`w-element c1numhkq c1a06u5s cybup0g cb8nekp c1l286af caml8u7 c13lo6ff c1lvj0n c1e31mqg c17bzoun cnods77 c1yt6hv7 cyovuht ctnnc8f c1lqh6n6 cuwoxsi c1t4xpm1 c1t8xhs1`}>
<div
className={`w-element c1td9nc9`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Take the next step, we’re here to help."}
</h2>
</div>
<div
className={`w-element c1numhkq cdyc65v c3auquk c4ph8p6 c14e2i27 cf9gg3a c1rmdt35`}>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1lks1ql c1hd4o6l c1egcz5d c15cyzzt ckrq2bq cxzv1vz c1numhkq c1diokdk ch3nxmx ch7xx7z c18klwyf cn7k83s c1p4xat6 c1lvj0n cacmu18 ckecbya c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 c10iz0pl c5g53jj`}>
{"Get My Free Roof Quote"}
</Link>
<Image
src={"https://v2.improveitmd.com/uploads/melinda_text_desktop_Gg_Ns_VOP_Rr_G_Uya0ufdepno_77f53880fe.svg"}
width={242}
height={53}
alt={"reference to video"}
loading={"lazy"}
className={`w-image c19y7s3q c1hwvjgs cdmu5h7 czbu68a cromxr1 cs0io4s`} />
<Image
src={"https://v2.improveitmd.com/uploads/melinda_text_tablet_Ku_XY_Mxj_Ey_x7_XM_4we_PRK_0_44d28a35c2.svg"}
width={241}
height={91}
alt={"reference to video"}
loading={"lazy"}
className={`w-image c19y7s3q c9te4zd cdmu5h7 czbu68a cromxr1 c1k5oipc c1784h8b c1cm7ux2`} />
</div>
</div>
<div
className={`w-element cqdbcb3 cuxa4wk c1epvuph cyovuht cjm2rxl`}>
<HtmlEmbed
code={"<!-- Structured Data -->\n    <script type=\"application/ld+json\">\n    {\n        \"@context\": \"http://schema.org\",\n        \"@type\": \"VideoObject\",\n        \"name\": \"Capitol Improvements - How we serve you\",\n        \"description\": \"Capitol Improvements - Melinda explaining how we serve you.\",\n        \"thumbnailUrl\": \"https://v2.improveitmd.com/uploads/res_cloudinary_com_dzpsjw2sr_video_upload_v1704354067_cap_720_d658cb80fe.jpg\",\n        \"uploadDate\": \"2024-02-15T08:00:00+08:00\",\n        \"duration\": \"PT15S\",\n        \"contentUrl\": \"https://v2.improveitmd.com/uploads/res_cloudinary_com_dzpsjw2sr_video_upload_v1704354067_cap_720_c429c64ce9.mp4\",\n        \"embedUrl\": \"https://www.improveitmd.com/roofing/asphalt-roofing#player\"\n    }\n    </script>\n\n<style>\n\nvideo {\n\twidth: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n</style>\n\n<video class=\"home-hero_bg-video\" id=\"player\" playsinline=\"\" data-poster=\"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1765841583_melinda_screenshot_zyrdl7_3073e36a0b.webp\" poster=\"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1765841583_melinda_screenshot_zyrdl7_3073e36a0b.webp\" alt=\"Melinda explaining how we serve you\">\n  <source src=\"https://v2.improveitmd.com/uploads/res_cloudinary_com_dzpsjw2sr_video_upload_v1704354067_cap_720_c429c64ce9.mp4\" type=\"video/mp4\">\n</video>"}
className={`w-html-embed crv3s27 cf74k5w c139pwc6 cjkauba`} />
<div
className={`w-element cnbug7k cmhuipo c4ily4v c19wpft8 c189czh1 c1svemqh c139pwc6 cjkauba c1numhkq c1diokdk ch3nxmx c1d7h9xn ${"playButton"}`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 78 92\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M78 46L3.38793e-06 91.0333L7.32487e-06 0.966675L78 46Z\" fill=\"white\"/>\n</svg>"}
className={`w-html-embed crv3s27 c37errb cvhg4ad`} />
</div>
</div>
</div>
</div>
</div>
</section>
<Slot>
<section
className={`w-element cvfl1ur cqg1o4l cukg97e clvgs5x c1aqir95`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c1sq4bmy`}>
<div
className={`w-element cmsm1bz c17rwy3n c1603wqb c1omlw60 c53aqfr c1klx7ez cg8hn1l c1txodcv curgy1m chq2lkg c10bzxv`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c10lolld c1irdqs7 c876kpt c15sicby c1mndhrk c2j7e41 c1hmvws c1cf96bh c14t23m0 c9cac79 c100pd8v cd2qqyb cq9r5tw c8iul0y cybbdyg cljixpu cu8qcns c4fmmfv`}>
<Image
src={"https://v2.improveitmd.com/uploads/hammer_icon_Qe5fs_L_Vi_ZJKU_Ec_Q9y_Ty_C_e8a4aebe38.svg"}
width={48}
height={48}
alt={"hammer icon"}
loading={"lazy"}
className={`w-image ci9ixvi c1hwvjgs c1mcsn9a czbu68a c1f3bifo`} />
<div
className={`w-element c1numhkq c1a06u5s cavbvoj csq2xwp c1p4xat6`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc cn7k83s cwcnurz c1emvlx`}>
{"30+ Years’ Experience"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Thousands of satisfied home owners across Maryland and DC."}
</p>
<Link
href={"/testimonials"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c309ipl ckecbya cahz6x0 cmchden`}>
{"Learn more"}
</Link>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c10lolld c1irdqs7 c876kpt c15sicby c1mndhrk c2j7e41 c1hmvws c1cf96bh c14t23m0 c9cac79 c100pd8v cd2qqyb cq9r5tw c8iul0y cybbdyg cljixpu cu8qcns c4fmmfv`}>
<Image
src={"https://v2.improveitmd.com/uploads/badge_icon_TW_5j8_S_Yw_W_5_CM_Pq_Oq_Nty_A_79de0c77d1.svg"}
width={33}
height={42}
alt={"certified badge icon"}
loading={"lazy"}
className={`w-image ci9ixvi c1hwvjgs c1mcsn9a czbu68a c1f3bifo`} />
<div
className={`w-element c1numhkq c1a06u5s cavbvoj csq2xwp c1p4xat6`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc cn7k83s cwcnurz c1emvlx`}>
{"Lifetime Warranties"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Highly certified with Atlas, GAF, Timbertech, James Hardie, & more."}
</p>
<Link
href={"/warranty"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c309ipl ckecbya cahz6x0 cmchden`}>
{"Learn more"}
</Link>
</div>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c10lolld c1irdqs7 c876kpt c15sicby c1mndhrk c2j7e41 c1hmvws c1cf96bh c14t23m0 c9cac79 c100pd8v cd2qqyb cq9r5tw c8iul0y cybbdyg cljixpu cu8qcns c4fmmfv`}>
<Image
src={"https://v2.improveitmd.com/uploads/holding_house_icon_Bpd_Wko_E_Zz_G_Boh0d_D3_H_8b_afcd53221a.svg"}
width={43}
height={42}
alt={"holding house icon"}
loading={"lazy"}
className={`w-image ci9ixvi c1hwvjgs c1mcsn9a czbu68a c1f3bifo`} />
<div
className={`w-element c1numhkq c1a06u5s cavbvoj csq2xwp c1p4xat6`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc cn7k83s cwcnurz c1emvlx`}>
{"Value Focused"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"A family team proud to deliver excellence at a fair price."}
</p>
<Link
href={"/about"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1g3mhtg c309ipl ckecbya cahz6x0 cmchden`}>
{"Learn more"}
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</Slot>
<Slot>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s co72if5 c1sq4bmy c876kpt c11b3qd4 c1u2ofx5 chpf5dw cp7sh9x cnods77 c1yt6hv7 cwq5w9j c1t4xpm1 cuwoxsi`}>
<div
className={`w-element`}>
<h2
className={`w-element c1lsnlld c19fqb9a cnvsn5k c1lwn44j c1fjww6l c1pjr8f c82qwqc cp0czxx c1rjplas c8mqd8h c13bl3hn`}>
{"Trusted by local homeowners."}
</h2>
</div>
<div
className={`w-element c139pwc6 cn87dm8 c1uhhf7h c1epvuph ${"swiper is-testimonials"}`}>
<div
className={`w-element c1numhkq c139pwc6 ${"swiper-wrapper"}`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w cfw3go9 culorum ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"My husband and I met with Pat Jewell and he was such a pleasure to work with. Very knowledgeable and kind. We felt comfortable with this company."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 c1renoap cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"K"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"Kelly, "}
<Link
href={"https://maps.app.goo.gl/3SKFjKLAosLxysRW6"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Reviews"}
</Link>
</p>
</div>
</div>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w culorum cfw3go9 ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"We are very pleased with the work that Capitol Improvements did and we would highly recommend and use them again in the future."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 ciscaz8 cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"C"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"Carlos, "}
<Link
target={"_blank"}
href={"#"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Yelp Reviews"}
</Link>
</p>
</div>
</div>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w culorum cfw3go9 ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"They had the most competitive prices and did not try and upsell. Their teams are efficient, professional, very clean, and on time."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 c3xsh6t cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"V"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"Veronica, "}
<Link
href={"https://maps.app.goo.gl/185AaCdrt7GUsxx18"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Reviews"}
</Link>
</p>
</div>
</div>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w culorum cfw3go9 ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"Seth and install team were organized and project went smoothly. Entire team was responsive and kept in touch throughout the process."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 c1renoap cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"R"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"R Mayo, "}
<Link
href={"https://maps.app.goo.gl/WiHbtfuun1aaFrZs7"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Reviews"}
</Link>
</p>
</div>
</div>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w culorum cfw3go9 ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"They replaced my roof including skylights in April 2023 and I am very satisfied. Melinda as my first contact was very professional and got me on the schedule quickly."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 ciscaz8 cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"Y"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"Yasmin, "}
<Link
href={"https://maps.app.goo.gl/oVkAE15JjPaXUGgh8"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Reviews"}
</Link>
</p>
</div>
</div>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8 c139pwc6 c12iyjon c1l4lw7o c5rv8xx c1lzjd2w culorum cfw3go9 ${"swiper-slide"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1ndq9wg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn c1a4drig chdomh6`}>
{"It was easy to work with Pat to get a quote. We did both a roof on our house and our shed, we also had new gutters put on our den. The crew was very hardworking and efficient."}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c17rwy3n`}>
<p
className={`w-element c1numhkq c1diokdk ch3nxmx ckjdari c1ovmx1o c1s18yzb c1b2b7rn c1lvj0n c1w9fs99 c3xsh6t cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
{"A"}
</p>
<p
className={`w-element c1g3mhtg ch7xx7z c12n66pl`}>
{"Ariana, "}
<Link
href={"https://maps.app.goo.gl/UuZvw4b9wULAnf419"}
target={"_blank"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Google Reviews"}
</Link>
</p>
</div>
</div>
</div>
</div>
<div
className={`w-element c1numhkq c1diokdk c1nt8u3l c17rwy3n c1603wqb cdr1ysj c1xm6nsa`}>
<div
className={`w-element ci9ixvi c1f3bifo c1numhkq c1diokdk ch3nxmx c1d7h9xn ${"prev-btn"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/left_arrow_rq_Ggn_PWCLFE_5c_Ne_R9s_SY_a3293dd997.svg"}
width={40}
height={40}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
</div>
<div
className={`w-element ci9ixvi c1f3bifo c1numhkq c1diokdk ch3nxmx c1d7h9xn ${"next-btn"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/right_arrow_k_ONH_Xzp_Ven_L2ueo21v_N_8445a3c199.svg"}
width={40}
height={40}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a`} />
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</Slot>
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk co72if5 cb7wkl5 c4ph8p6 c13d76g4 c119v29c`}>
<div
className={`w-element c1numhkq c1a06u5s c1sjfwqi c139pwc6`}>
<p
className={`w-element c309ipl c1v90cn6 c82qwqc c1lwn44j c1fjww6l c1ezjj73`}>
{"Common Questions"}
</p>
<Accordion
collapsible={true}
className={`w-accordion c1numhkq c1a06u5s c1irdqs7`}>
<AccordionItem
data-ws-index="0"
className={`w-item c11b3qd4 c1co09t2 c1eu6l07 ctjj4no cbtevxf c1ju8duk`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1tn4ulv`}>
<Text
className={`w-text cn7k83s ch7xx7z c8d36da c82qwqc`}>
{"How long do asphalt shingles last?"}
</Text>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Most shingles installed now are Architectural shingles. They will come with a manufacturer backed 50yr material and labor warranty if installed by a certified installer that can register your warranty with the manufacturer. "}
<Link
href={"/warranty"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"View Warranties"}
</Link>
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item c11b3qd4 c1co09t2 c1eu6l07 ctjj4no cbtevxf c1ju8duk`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1tn4ulv`}>
<Text
className={`w-text cn7k83s ch7xx7z c8d36da c82qwqc`}>
{"What warranty and financing do you offer?"}
</Text>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We offer the best manufacture backed warranties for all of our services. Up to 50-year transferrable warranties for roof replacements. "}
<Link
href={"/warranty"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"View warranties"}
</Link>
{""}
<br />
{""}
{""}
<br />
{""}
{"Our partnership with EnerBank USA lets us offer our clients no money down financing as low as $99 per month. "}
<Link
href={"/financing"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"View financing"}
</Link>
</p>
</div>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item c11b3qd4 c1co09t2 c1eu6l07 ctjj4no cbtevxf c1ju8duk`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1tn4ulv`}>
<Text
className={`w-text cn7k83s ch7xx7z c8d36da c82qwqc`}>
{"How long does it take to get my roof?"}
</Text>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"After an in-home visit and the project quote is accepted, most roofs are installed within 1-2 weeks. A "}
<Link
href={"/locations/bowie"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roof replacement in maryland"}
</Link>
{" is no different than one in Virginia. the only difference is a "}
<Link
href={"/locations/washington-dc"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"roof replacement in Washington DC"}
</Link>
{" takes more time due to the specialty roofing normally associated with row homes in the District. The installation of your roof generally takes 1 day. "}
<Link
href={"/gallery"}
target={"_self"}
className={`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"View Gallery"}
</Link>
</p>
</div>
</AccordionContent>
</AccordionItem>
</Accordion>
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
<HtmlEmbed
code={"<script type=\"module\">\nnew Swiper(\".swiper.is-gallery\", { loop: true, slidesPerView: \"auto\", speed: 500 });\nnew Swiper(\".swiper.is-testimonials\", {\n  loop: false, speed: 500, grabCursor: true, slidesPerView: \"auto\",\n  navigation: { prevEl: \".prev-btn\", nextEl: \".next-btn\" },\n  breakpoints: {\n    768: { slidesPerView: \"auto\", spaceBetween: 48 },\n    992: { slidesPerView: \"auto\", spaceBetween: 88 },\n  },\n});\n\nconst playButton = document.querySelector(\".playButton\");\nconst video = document.getElementById(\"player\");\nif (playButton && video) {\n  playButton.addEventListener(\"click\", function () { video.play(); playButton.style.display = \"none\"; });\n  video.addEventListener(\"ended\", function () { playButton.style.display = \"flex\"; });\n  video.addEventListener(\"click\", function () { video.pause(); playButton.style.display = \"flex\"; });\n}\n\nGLightbox({ selector: '.glightbox:not([data-tab])' });\n\nconst tabLightboxes = {};\n\nfunction initTabLightbox(tabId) {\n  const selector = `.glightbox[data-tab=\"${tabId}\"]`;\n  if (!document.querySelectorAll(selector).length) return;\n  if (tabLightboxes[tabId]) return;\n  tabLightboxes[tabId] = GLightbox({ selector });\n}\n\ndocument.querySelectorAll('[role=\"tab\"][aria-selected=\"true\"]').forEach(tab => {\n  initTabLightbox(tab.getAttribute('data-tab-id'));\n});\n\ndocument.querySelectorAll('[role=\"tabpanel\"]').forEach(panel => {\n  const triggerId = panel.getAttribute('aria-labelledby');\n  const trigger = document.getElementById(triggerId);\n  if (!trigger) return;\n  const tabId = trigger.getAttribute('data-tab-id');\n  if (!tabId) return;\n\n  new MutationObserver(() => {\n    if (panel.getAttribute('data-state') === 'active') {\n      initTabLightbox(tabId);\n    }\n  }).observe(panel, { attributes: true, attributeFilter: ['data-state'] });\n});\n\n// Safety net: always prevent default on tab lightbox links\n// and open the lightbox manually if it's ready, or init then open\ndocument.addEventListener('click', e => {\n  const link = e.target.closest('.glightbox[data-tab]');\n  if (!link) return;\n  e.preventDefault();\n  const tabId = link.getAttribute('data-tab');\n  if (!tabLightboxes[tabId]) {\n    initTabLightbox(tabId);\n  }\n  if (tabLightboxes[tabId]) {\n    tabLightboxes[tabId].open(link);\n  }\n});\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</Body>
}


      export { Page }
    