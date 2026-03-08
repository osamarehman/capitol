/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, Box as Box, Slot as Slot, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button, Text as Text, Input as Input, YouTube as YouTube, VimeoPreviewImage as VimeoPreviewImage, VimeoSpinner as VimeoSpinner, VimeoPlayButton as VimeoPlayButton, Textarea as Textarea } from "@webstudio-is/sdk-components-react";
import { Link as Link, Link as Link_1, RemixForm as RemixForm, Body as Body, Form as Form } from "@webstudio-is/sdk-components-react-router";
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
        ["roof_flat_aTdTXJd_HCxIKXlaOMN3E.webp","metal-roof-5_SIEt_4s5tEq-lB-kJi-T5.webp","roof_HDZ_Pw3BD18kjouU7zv7ejJsA.webp"]

      

      const Page = (_props: { system: any; }) => {
const system = _props.system;
let LocalPagesData = useResource("LocalPagesData_1")
let [formState, set$formState] = useVariableState<any>("initial")
return <Body
className={`w-element`}>
<Box
className={`w-box cnregu4 c3a6wb5 c14dzf92`}>
<HtmlEmbed
code={"<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css\">\n<script src=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js\"></script>\n<style>\n.swiper-slide.is-service { width: 30%; margin-right: 1rem; }\n.swiper.is-service {\n  display: none;\n}\n@media (max-width: 991px) { .swiper-slide.is-service { width: 49%; }\n.swiper.is-service {\ndisplay: block;\n} }\n@media (max-width: 479px) { .swiper-slide.is-service { width: 100%; } }\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.schemaMarkup}
clientOnly={true}
className={`w-html-embed c9te4zd`} />
<HtmlEmbed
code={"<style>\n  figcaption {\n    text-align: center;\n  }\n  \n/* ----- FAQs Rich Text ----- */\n.faqs-inner-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 1.75rem;\n}\n\n.faqs-title {\n  font-size: 1.25rem;\n  font-weight: 800;\n  line-height: 1.35;\n  color: var(--foreground-primary);\n}\n\n.faqs-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.faqs-item {\n  padding-bottom: 1rem;\n  border-bottom: 0.1rem solid var(--foreground-border);\n}\n\n/* Hide the radio button */\n.faqs-checkbox {\n  display: none;\n}\n\n/* Label acts as clickable question wrapper */\n.faqs-question-wrapper {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n  user-select: none;\n}\n\n.faqs-question {\n  font-size: 1rem;\n  font-weight: 600;\n  line-height: 1.5;\n  margin: 0;\n}\n\n.faqs-chevron-wrapper {\n  width: 1.5rem;\n  height: 1.5rem;\n  flex-shrink: 0;\n  flex-grow: 0;\n  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Content hidden by default */\n.faqs-content {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), \n              opacity 300ms ease;\n}\n\n.faqs-answer-wrapper {\n  padding-top: 0.75rem;\n  padding-right: 5%;\n}\n\n.faqs-answer {\n  font-size: 1rem;\n  line-height: 1.35;\n  color: var(--foreground-muted);\n  margin: 0;\n}\n\n/* When radio is checked, show content */\n.faqs-checkbox:checked + .faqs-question-wrapper + .faqs-content {\n  max-height: 2000px;\n}\n\n/* Rotate chevron when checked */\n.faqs-checkbox:checked + .faqs-question-wrapper .faqs-chevron-wrapper {\n  transform: rotate(180deg);\n}  \n  /* ----- Why Choose Us Rich Text ----- */\n\n  .features-header-wrapper {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding-bottom: 2rem;\n    text-align: center;\n  }\n  .features-list {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 3rem;\n    justify-content: center;\n  }\n  .features-item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1.25rem;\n    width: 100%;\n    max-width: 20rem;\n    text-align: center;\n  }\n  .item-text-wrapper {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .features-icon {\n    width: auto;\n    max-width: 5rem;\n    height: 3rem;\n    object-fit: contain;\n    display: block;\n  }\n  @media screen and (max-width: 991px) {\n    .features-list {\n      gap: 2rem;\n    }\n  }\n  .features-content-wrapper {\n    padding-top: 2rem;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    gap: 2.5rem;\n  }\n  .features-image-wrapper {\n    display: flex;\n    flex-direction: row;\n    gap: 2rem;\n    align-items: end;\n  }\n  .certification-image {\n    width: 100%;\n    object-fit: cover;\n    display: block;\n  }\n  .features-caption {\n    text-align: center;\n    font-size: 0.875rem;\n  }\n  .features_image-block {\n    display: flex;\n    width: 100%;\n    flex-direction: column;\n    gap: 1rem;\n    align-items: center;\n    justify-content: center;\n  }\n  @media screen and (max-width: 767px) {\n    .features-content-wrapper {\n      gap: 2rem;\n    }\n  }\n  @media screen and (max-width: 991px) {\n    .features-image-wrapper {\n      flex-direction: column;\n    }\n    .features_image-block {\n     width: 100%;\n    }\n  }\n\n    /* ----- Warranty Table ----- */\n\n    .table-wrapper {\n      max-height: 39rem;\n      overflow: auto;\n      border: 1px solid #e5e7eb;\n      border-radius: 8px;\n      width: 100%;\n      overflow-wrap: anywhere;\n    }\n\n    .warranty-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 1rem;\n    }\n\n    .warranty-table thead th {\n      position: sticky;\n      top: 0;\n      background: #f9fafb;\n      text-align: left;\n      font-weight: 600;\n      padding: 1rem 1rem;\n      border-bottom: 1px solid #e5e7eb;\n      z-index: 1;\n    }\n\n    .warranty-table td {\n      padding: 1rem;\n      border-bottom: 1px solid #f0f0f0;\n      text-align: left;\n    }\n\n    .warranty-table tbody tr:hover {\n      background-color: #f5f7fa;\n    }\n\n    @media screen and (max-width: 767px) {\n      .warranty-table {\n        font-size: 0.875rem;\n      }\n\n      .warranty-table thead {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border: 0;\n      }\n\n      .warranty-table tbody tr {\n        display: flex;\n        flex-direction: column;\n        border-bottom: 1px solid #f0f0f0;\n      }\n\n      .warranty-table tbody tr:last-child {\n        border-bottom: none;\n      }\n\n      .warranty-table tbody tr:hover {\n        background-color: #f5f7fa;\n      }\n\n      .warranty-table td {\n        display: flex;\n        gap: 0.5rem;\n        padding: 0.3rem 1rem;\n        border-bottom: none;\n        align-items: baseline;\n      }\n\n      .warranty-table td:nth-child(3) { order: 1; }\n      .warranty-table td:nth-child(1) { order: 2; }\n      .warranty-table td:nth-child(2) { order: 3; }\n\n      .warranty-table td:nth-child(3) {\n        font-weight: 700;\n        font-size: 0.9375rem;\n        padding: 0.85rem 1rem 0.6rem calc(1rem - 3px);\n        border-bottom: 1px solid #e5e7eb;\n        margin-bottom: 0.35rem;\n        border-left: 3px solid #6b7280;\n      }\n\n      .warranty-table td:nth-child(3)::before {\n        display: none;\n      }\n\n      .warranty-table td:nth-child(2) {\n        padding-bottom: 0.85rem;\n      }\n\n      .warranty-table td[data-label]::before {\n        content: attr(data-label);\n        font-size: 0.7rem;\n        font-weight: 700;\n        letter-spacing: 0.05em;\n        text-transform: uppercase;\n        color: #6b7280;\n        white-space: nowrap;\n        flex-shrink: 0;\n        min-width: 5.5rem;\n      }\n    }\n\n  /* ----- Inspection Table ----- */\n\n    .inspection-table-wrapper {\n      max-height: 39rem;\n      overflow: auto;\n      border: 1px solid #e5e7eb;\n      border-radius: 8px;\n      width: 100%;\n      overflow-wrap: break-word;\n    }\n\n    .inspection-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 1rem;\n    }\n\n    .inspection-table thead th {\n      position: sticky;\n      top: 0;\n      background: #f9fafb;\n      text-align: left;\n      font-weight: 600;\n      padding: 1rem;\n      border-bottom: 1px solid #e5e7eb;\n      z-index: 1;\n    }\n\n    .inspection-table td {\n      padding: 1rem;\n      border-bottom: 1px solid #f0f0f0;\n      text-align: left;\n    }\n\n    .inspection-table tbody tr:hover {\n      background-color: #f5f7fa;\n    }\n\n    @media screen and (max-width: 767px) {\n      .inspection-table {\n        font-size: 0.875rem;\n      }\n\n      .inspection-table thead {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border: 0;\n      }\n\n      .inspection-table tbody tr {\n        display: block;\n        border-bottom: 1px solid #f0f0f0;\n      }\n\n      .inspection-table tbody tr:last-child {\n        border-bottom: none;\n      }\n\n      .inspection-table tbody tr:hover {\n        background-color: #f5f7fa;\n      }\n\n      .inspection-table td {\n        display: flex;\n        gap: 0.5rem;\n        padding: 0.3rem 1rem;\n        border-bottom: none;\n      }\n\n      .inspection-table td:first-child {\n        font-weight: 700;\n        font-size: 0.9375rem;\n        padding: 0.85rem 1rem 0.6rem calc(1rem - 3px);\n        border-bottom: 1px solid #e5e7eb;\n        margin-bottom: 0.35rem;\n        border-left: 3px solid #6b7280;\n      }\n\n      .inspection-table td:first-child::before {\n        display: none;\n      }\n\n      .inspection-table td[data-label] {\n        align-items: baseline;\n      }\n\n      .inspection-table td[data-label]::before {\n        content: attr(data-label);\n        font-size: 0.7rem;\n        font-weight: 700;\n        letter-spacing: 0.05em;\n        text-transform: uppercase;\n        color: #6b7280;\n        white-space: nowrap;\n        flex-shrink: 0;\n        min-width: 4.75rem;\n      }\n\n      .inspection-table td[data-label=\"Notes\"] {\n        flex-direction: column;\n        gap: 0.2rem;\n        padding-bottom: 0.85rem;\n        color: #374151;\n        font-style: italic;\n      }\n\n      .inspection-table td[data-label=\"Notes\"]::before {\n        min-width: unset;\n      }\n    }\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n  .help-modal.is-active {\n    opacity: 1;\n    pointer-events: auto;\n    height: 100%;\n  }\n</style>\n\n"}
clientOnly={true}
className={`w-html-embed`} />
{(LocalPagesData?.data?.data?.services?.[0]?.residentialCalc ? true : false) &&
<Slot>
<Fragment_1>
{(true
) &&
<div
className={`w-element c9te4zd`}>
<HtmlEmbed
code={"<style>\n\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder *,\n.mapboxgl-ctrl-geocoder *:after,\n.mapboxgl-ctrl-geocoder *:before {\n  box-sizing: border-box;\n}\n\n.mapboxgl-ctrl-geocoder {\n  font-size: 18px;\n  line-height: 24px;\n  font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  position: relative;\n  background-color: #fff;\n  width: 100%;\n  min-width: 240px;\n  z-index: 1;\n  border-radius: 4px;\n  transition: width .25s, min-width .25s;\n}\n\n.mapboxgl-ctrl-geocoder--input {\n  font: inherit;\n  width: 100%;\n  border: 0;\n  background-color: transparent;\n  margin: 0;\n  height: 50px;\n  color: #404040; /* fallback */\n  color: rgba(0, 0, 0, 0.75);\n  padding: 6px 45px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.mapboxgl-ctrl-geocoder--input::-ms-clear {\n  display: none; /* hide input clear button in IE */\n}\n\n.mapboxgl-ctrl-geocoder--input:focus {\n  color: #404040; /* fallback */\n  color: rgba(0, 0, 0, 0.75);\n  outline: 0;\n  box-shadow: none;\n  outline: thin dotted;\n}\n\n.mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--pin-right > * {\n  z-index: 2;\n  position: absolute;\n  right: 8px;\n  top: 7px;\n  display: none;\n}\n\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder .suggestions {\n  box-shadow: 0 0 10px 2px rgba(0,0,0,.1);\n}\n\n/* Collapsed */\n.mapboxgl-ctrl-geocoder.mapboxgl-ctrl-geocoder--collapsed {\n  width: 50px;\n  min-width: 50px;\n  transition: width .25s, min-width .25s;\n}\n\n/* Suggestions */\n.mapboxgl-ctrl-geocoder .suggestions {\n  background-color: #fff;\n  border-radius: 4px;\n  left: 0;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  width: 100%;\n  top: 110%; /* fallback */\n  top: calc(100% + 6px);\n  z-index: 1000;\n  overflow: hidden;\n  font-size: 15px;\n}\n\n.mapboxgl-ctrl-bottom-left .suggestions,\n.mapboxgl-ctrl-bottom-right .suggestions {\n  top: auto;\n  bottom: 100%;\n}\n\n.mapboxgl-ctrl-geocoder .suggestions > li > a {\n  cursor: default;\n  display: block;\n  padding: 6px 12px;\n  color: #404040;\n}\n\n.mapboxgl-ctrl-geocoder .suggestions > .active > a,\n.mapboxgl-ctrl-geocoder .suggestions > li > a:hover {\n  color: #404040;\n  background-color: #f3f3f3;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.mapboxgl-ctrl-geocoder--suggestion-title {\n  font-weight: bold;\n}\n\n.mapboxgl-ctrl-geocoder--suggestion-title,\n.mapboxgl-ctrl-geocoder--suggestion-address {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n/* Icons */\n.mapboxgl-ctrl-geocoder--icon {\n  display: inline-block;\n  vertical-align: middle;\n  speak: none;\n  fill: #757575;\n  top: 15px;\n}\n\n.mapboxgl-ctrl-geocoder--icon-search {\n  position: absolute;\n  top: 13px;\n  left: 12px;\n  width: 23px;\n  height: 23px;\n}\n\n.mapboxgl-ctrl-geocoder--button {\n  padding: 0;\n  margin: 0;\n  border: none;\n  cursor: pointer;\n  background: #fff;\n  line-height: 1;\n}\n\n.mapboxgl-ctrl-geocoder--icon-close {\n  width: 20px;\n  height: 20px;\n  margin-top: 8px;\n  margin-right: 3px;\n}\n\n.mapboxgl-ctrl-geocoder--button:hover .mapboxgl-ctrl-geocoder--icon-close {\n  fill: #909090;\n}\n\n.mapboxgl-ctrl-geocoder--icon-geolocate {\n  width: 22px;\n  height: 22px;\n  margin-top: 6px;\n  margin-right: 3px;\n}\n\n\n.mapboxgl-ctrl-geocoder--icon-loading {\n  width: 26px;\n  height: 26px;\n  margin-top: 5px;\n  margin-right: 0px;\n  -moz-animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n  -webkit-animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n  animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n}\n\n.mapboxgl-ctrl-geocoder--powered-by {\n  display: block;\n  float: left;\n  padding: 6px 12px;\n  padding-bottom: 9px;\n  font-size: 13px;\n}\n\n.mapboxgl-ctrl-geocoder--powered-by a {\n  color: #909090;\n}\n\n.mapboxgl-ctrl-geocoder--powered-by a:not(:hover) {\n  text-decoration: none;  \n}\n\n\n/* Animation */\n@-webkit-keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n/* Media queries*/\n@media screen and (min-width: 640px) {\n\n  .mapboxgl-ctrl-geocoder.mapboxgl-ctrl-geocoder--collapsed {\n    width: 36px;\n    min-width: 36px;\n  }\n\n  .mapboxgl-ctrl-geocoder {\n    width: 33.3333%;\n    font-size: 15px;\n    line-height: 20px;\n    max-width: 360px;\n  }\n  .mapboxgl-ctrl-geocoder .suggestions {\n    font-size: 13px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon {\n    top: 8px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-close {\n    width: 16px;\n    height: 16px;\n    margin-top: 3px;\n    margin-right: 0;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-geolocate {\n    width: 18px;\n    height: 18px;\n    margin-top: 2px;\n    margin-right: 0;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-search {\n    left: 7px;\n    width: 20px;\n    height: 20px;\n  }\n\n  .mapboxgl-ctrl-geocoder--input {\n    height: 36px;\n    padding: 6px 35px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-loading {\n    width: 26px;\n    height: 26px;\n    margin-top: -2px;\n    margin-right: -5px;\n  }\n\n  .mapbox-gl-geocoder--error{\n    color:#909090;\n    padding: 6px 12px;\n    font-size: 16px;\n    text-align: center;\n  }\n\n  .mapboxgl-ctrl-geocoder--powered-by {\n    font-size: 11px !important;\n  }\n}\n\n\n</style><div class=\"styles-embed-5 w-embed\"><style>\n.mapbox-gl-draw_ctrl-bottom-left,\n.mapbox-gl-draw_ctrl-top-left {\n    margin-left: 0;\n    border-radius: 0 4px 4px 0;\n}\n.mapbox-gl-draw_ctrl-top-right,\n.mapbox-gl-draw_ctrl-bottom-right {\n    margin-right: 0;\n    border-radius: 4px 0 0 4px;\n}\n.mapbox-gl-draw_ctrl-draw {\n    background-color: rgba(0, 0, 0, 0.75);\n    border-color: rgba(0, 0, 0, 0.9);\n}\n.mapbox-gl-draw_ctrl-draw > button {\n    border-color: rgba(0, 0, 0, 0.9);\n    color: rgba(255, 255, 255, 0.5);\n    width: 30px;\n    height: 30px;\n}\n.mapbox-gl-draw_ctrl-draw > button:hover {\n    background-color: rgba(0, 0, 0, 0.85);\n    color: rgba(255, 255, 255, 0.75);\n}\n.mapbox-gl-draw_ctrl-draw > button.active,\n.mapbox-gl-draw_ctrl-draw > button.active:hover {\n    background-color: rgba(0, 0, 0, 0.95);\n    color: #fff;\n}\n.mapbox-gl-draw_ctrl-draw-btn {\n    background-repeat: no-repeat;\n    background-position: center;\n}\n.mapbox-gl-draw_point {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJtYXJrZXIuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTYiICAgICBpbmtzY2FwZTpjeD0iMTQuMTY0MjUzIiAgICAgaW5rc2NhcGU6Y3k9IjguODg1NzIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0iZmFsc2UiICAgICB1bml0cz0icHgiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NTEiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjA4IiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjE5MCIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkMTk3MTUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhMTkxNzIiPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGUgLz4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZyAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwMzIuMzYyMikiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgZD0ibSAzNiwxMDQwLjM2MjIgYyA2ZS02LDMuMzA5MyAtNS45ODg2MTIsMTAgLTUuOTg4NjEyLDEwIDAsMCAtNS45OTg3NzYsLTYuNjY4IC02LjAxMTM0NSwtOS45NzcyIC0wLjAxMjU3LC0zLjMwOTIgMi42NTY1NzYsLTYuMDAzOSA1Ljk2NTc5MiwtNi4wMjI3IDMuMzA5MTg5LC0wLjAxOSA2LjAwODg0LDIuNjQ1MiA2LjAzMzk5Miw1Ljk1NDMiICAgICAgIGlkPSJwYXRoMTI1NjEiICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2Nzc2MiIC8+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDM0LjAwMDExNSwxMDQwLjM2MjIgYyAtNWUtNiwyLjIwNjIgLTMuOTkyNTIzLDcuMDAwMSAtMy45OTI1MjMsNy4wMDAxIDAsMCAtMy45OTkyOTEsLTQuNzc4NyAtNC4wMDc2NzksLTYuOTg0OSAtMC4wMDg0LC0yLjIwNjIgMS43NzEwODIsLTQuMDAyNyAzLjk3NzMxLC00LjAxNTMgMi4yMDYyMSwtMC4wMTMgNC4wMDYwMzcsMS43NjM1IDQuMDIyNzc3LDMuOTY5NyIgICAgICAgaWQ9InBhdGgxMjU2MyIgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Ik0gOS45NjY3OTY5LDEwMTQuMzYyMiBDIDYuNjU3NTgwOSwxMDE0LjM4MSAzLjk4NzQzLDEwMTcuMDc2NCA0LDEwMjAuMzg1NiBjIDAuMDEyNTY5LDMuMzA5MiA2LjAxMTcxOSw4Ljk3NjYgNi4wMTE3MTksOC45NzY2IDAsMCA1Ljk4ODI4NywtNS42OTA3IDUuOTg4MjgxLC05IGwgMCwtMC4wNDUgYyAtMC4wMjUxNSwtMy4zMDkxIC0yLjcyNDAxNCwtNS45NzQxIC02LjAzMzIwMzEsLTUuOTU1MSB6IG0gMC4wMDk3NywyIGMgMi4yMDYyMDYxLC0wLjAxMyA0LjAwNjY5MzEsMS43NjI2IDQuMDIzNDMzMSwzLjk2ODggbCAwLDAuMDMxIGMgLTVlLTYsMi4yMDYyIC0zLjk5MjE4OCw2IC0zLjk5MjE4OCw2IDAsMCAtMy45OTk0MjQsLTMuNzc4MiAtNC4wMDc4MTIsLTUuOTg0NCAtMC4wMDg0LC0yLjIwNjIgMS43NzAzMzQ1LC00LjAwMyAzLjk3NjU2MjUsLTQuMDE1NiB6IiAgICAgICBpZD0icGF0aDEyNTY4IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzY3NjY2Njc2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lIiAgICAgICBkPSJNIDEwIDIgQyA2LjY4NjI5MiAyIDQgNC42ODYzIDQgOCBDIDQgMTEuMzEzNyAxMCAxNyAxMCAxNyBDIDEwIDE3IDE2IDExLjMxMzcgMTYgOCBDIDE2IDQuNjg2MyAxMy4zMTM3MDggMiAxMCAyIHogTSAxMCA0IEMgMTIuMDcxMDY4IDQgMTMuNzUgNS42Nzg5IDEzLjc1IDcuNzUgQyAxMy43NSA5LjIwNTMyNzggMTEuOTMxMTEgMTEuNjQ0MzkzIDEwLjgzMDA3OCAxMyBMIDkuMTY5OTIxOSAxMyBDIDguMDY4ODkwMyAxMS42NDQzOTMgNi4yNSA5LjIwNTMyNzggNi4yNSA3Ljc1IEMgNi4yNSA1LjY3ODkgNy45Mjg5MzIgNCAxMCA0IHogIiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiICAgICAgIGlkPSJwYXRoMTczMDUiIC8+ICA8L2c+PC9zdmc+);\n}\n\n</style></div><div class=\"styles-embed-6 w-embed\"><style>\n.mapbox-gl-draw_polygon {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJzcXVhcmUuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IiAgICAgaW5rc2NhcGU6Y3g9IjExLjY4MTYzNCIgICAgIGlua3NjYXBlOmN5PSI5LjI4NTcxNDMiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC41O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Im0gNSwxMDM5LjM2MjIgMCw2IDIsMiA2LDAgMiwtMiAwLC02IC0yLC0yIC02LDAgeiBtIDMsMCA0LDAgMSwxIDAsNCAtMSwxIC00LDAgLTEsLTEgMCwtNCB6IiAgICAgICBpZD0icmVjdDc3OTciICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjIiAvPiAgICA8Y2lyY2xlICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBpZD0icGF0aDQzNjQiICAgICAgIGN4PSI2IiAgICAgICBjeT0iMTA0Ni4zNjIyIiAgICAgICByPSIyIiAvPiAgICA8Y2lyY2xlICAgICAgIGlkPSJwYXRoNDM2OCIgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjYwMDAwMDAyO21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGN4PSIxNCIgICAgICAgY3k9IjEwNDYuMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBpZD0icGF0aDQzNzAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBjeD0iNiIgICAgICAgY3k9IjEwMzguMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNjAwMDAwMDI7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgaWQ9InBhdGg0MzcyIiAgICAgICBjeD0iMTQiICAgICAgIGN5PSIxMDM4LjM2MjIiICAgICAgIHI9IjIiIC8+ICA8L2c+PC9zdmc+);\n}\n.mapbox-gl-draw_line {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJsaW5lLnN2ZyI+ICA8ZGVmcyAgICAgaWQ9ImRlZnMxOTE2OSIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOnpvb209IjE2IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjg5ODc3NSIgICAgIGlua3NjYXBlOmN5PSI5LjU4OTAxNTIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEzLjUsMTAzNS44NjIyIGMgLTEuMzgwNzEyLDAgLTIuNSwxLjExOTMgLTIuNSwyLjUgMCwwLjMyMDggMC4wNDYxNCwwLjYyNDQgMC4xNTYyNSwwLjkwNjMgbCAtMy43NSwzLjc1IGMgLTAuMjgxODM2LC0wLjExMDIgLTAuNTg1NDIxLC0wLjE1NjMgLTAuOTA2MjUsLTAuMTU2MyAtMS4zODA3MTIsMCAtMi41LDEuMTE5MyAtMi41LDIuNSAwLDEuMzgwNyAxLjExOTI4OCwyLjUgMi41LDIuNSAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTAuMzIwOCAtMC4wNDYxNCwtMC42MjQ0IC0wLjE1NjI1LC0wLjkwNjIgbCAzLjc1LC0zLjc1IGMgMC4yODE4MzYsMC4xMTAxIDAuNTg1NDIxLDAuMTU2MiAwLjkwNjI1LDAuMTU2MiAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTEuMzgwNyAtMS4xMTkyODgsLTIuNSAtMi41LC0yLjUgeiIgICAgICAgaWQ9InJlY3Q2NDY3IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPiAgPC9nPjwvc3ZnPg==);\n}\n.mapbox-gl-draw_undo {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9bpVIrgnYQcchQnSyIioiTVqEIFUKt0KqDyUv/oElDkuLiKLgWHPxZrDq4OOvq4CoIgj8gTo5Oii5S4n1JoUWMFx7v47x7Du/dB/jrZaaaHWOAqllGKhEXMtlVIfiKboTgQx9mJGbqc6KYhGd93VMn1V2MZ3n3/Vk9Ss5kgE8gnmW6YRFvEE9tWjrnfeIIK0oK8TnxqEEXJH7kuuzyG+eCw36eGTHSqXniCLFQaGO5jVnRUIkniaOKqlG+P+OywnmLs1qusuY9+QvDOW1lmeu0hpDAIpYgQoCMKkoow0KMdo0UEyk6j3v4Bx2/SC6ZXCUwciygAhWS4wf/g9+zNfMT425SOA50vtj2xzAQ3AUaNdv+PrbtxgkQeAautJa/UgemP0mvtbToEdC7DVxctzR5D7jcAQaedMmQHClAy5/PA+9n9E1ZoP8WCK25c2ue4/QBSNOskjfAwSEwUqDsdY93d7XP7d+e5vx+AF61cp9ZKFDPAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5AsKARkNvR+d0wAAAQpJREFUOMvt1K1OA0EUBeAPUoLAEFpHw0MgAInGIngEPAqBBEJ4A4IqPwIUSTcoBEkNPAQOHAUDKahibpNJs7vdhgoEJ5nMztw7J7N3zrn8dUyVxJawhRXM4x2PuMJzFfJL3GAOx/hGP2d84RC1UYSdOPCWHP5AGyfIYj2ItUeRdoZucoaFoZw6WknOwTiEGWYLclvJ7zeLCO9y6rVbkFvHZ+TspIG0BttYTtZ93BcQdiO2gdUiwqcYVfEScyPdnP6Fhhdjfp0EYQPr8f0wCYddRI17Za+cYg+nOTps4DxRwX4Vss0hp2ThlNtEKpWcMsAMjkq83Iub1cbtNs3oNmvRbbrRba4TyfyDH2GoVKMjQkxWAAAAAElFTkSuQmCC);\n}\n\n</style></div><div class=\"styles-embed-7 w-embed\"><style>\n.mapbox-gl-draw_trash {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgaWQ9InN2ZzU3MzgiICAgdmVyc2lvbj0iMS4xIiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTErZGV2ZWwrb3N4bWVudSByMTI5MTEiICAgc29kaXBvZGk6ZG9jbmFtZT0idHJhc2guc3ZnIiAgIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZGVmcyAgICAgaWQ9ImRlZnM1NzQwIiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMjIuNjI3NDE3IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjEyODE4NCIgICAgIGlua3NjYXBlOmN5PSI4Ljg0NjEzMDciICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTAzMyIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIyMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQ1NzQ2IiAgICAgICBlbXBzcGFjaW5nPSI1IiAgICAgICB2aXNpYmxlPSJ0cnVlIiAgICAgICBlbmFibGVkPSJ0cnVlIiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45OTk5OTk4MjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEwLDEwMzUuNzc0MyBjIC0wLjc4NDkyNTMsOGUtNCAtMS40OTY4Mzc2LDAuNDYwNiAtMS44MjAzMTI1LDEuMTc1OCBsIC0zLjE3OTY4NzUsMCAtMSwxIDAsMSAxMiwwIDAsLTEgLTEsLTEgLTMuMTc5Njg4LDAgYyAtMC4zMjM0NzUsLTAuNzE1MiAtMS4wMzUzODcsLTEuMTc1IC0xLjgyMDMxMiwtMS4xNzU4IHogbSAtNSw0LjU4NzkgMCw3IGMgMCwxIDEsMiAyLDIgbCA2LDAgYyAxLDAgMiwtMSAyLC0yIGwgMCwtNyAtMiwwIDAsNS41IC0xLjUsMCAwLC01LjUgLTMsMCAwLDUuNSAtMS41LDAgMCwtNS41IHoiICAgICAgIGlkPSJyZWN0MjQzOS03IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiIC8+ICA8L2c+PC9zdmc+);\n}\n.mapbox-gl-draw_uncombine {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0idW5jb21iaW5lLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczU3NDAiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQ0MTAzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDE4NCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjMwMDMiCiAgICAgICB5MT0iMTAiCiAgICAgICB4Mj0iMzAxNyIKICAgICAgIHkyPSIxMCIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSwyLjYxNzE4NzRlLTYpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MTAzIj4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3A0MTA1IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowOyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDQxMDciIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IgogICAgIGlua3NjYXBlOmN4PSItMTAuMjczOTQ2IgogICAgIGlua3NjYXBlOmN5PSI2LjkzMDM0NCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjIwNzgiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTA1NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iOTAwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyOTYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBzaG93Z3VpZGVzPSJmYWxzZSIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiCiAgICAgaW5rc2NhcGU6YmJveC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LW5vZGVzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vdGhlcnM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtbm9kZXM9ImZhbHNlIj4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBpZD0iZ3JpZDU3NDYiCiAgICAgICBlbXBzcGFjaW5nPSIyIgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiCiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiCiAgICAgICBzcGFjaW5neD0iMC41cHgiCiAgICAgICBzcGFjaW5neT0iMC41cHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIG9wYWNpdHk9IjAuMDU4ODIzNTMiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgIGQ9Ik0gMTIuMDA1ODU5IDIgQyAxMS43NTAzNiAyIDExLjQ5NDYwNSAyLjA5NzE4NyAxMS4yOTg4MjggMi4yOTI5Njg4IEwgMTAuMzAyNzM0IDMuMjg5MDYyNSBDIDkuOTExMTgwNCAzLjY4MDYyNiA5LjkxMTE4MDQgNC4zMTE1NjE1IDEwLjMwMjczNCA0LjcwMzEyNSBMIDExLjMwMjczNCA1LjcwMTE3MTkgQyAxMS42OTQyODggNi4wOTI3MzU0IDEyLjMyMzI5IDYuMDkyNzM1NCAxMi43MTQ4NDQgNS43MDExNzE5IEwgMTMuNzEwOTM4IDQuNzA1MDc4MSBDIDE0LjEwMjQ5MSA0LjMxMzUxNDYgMTQuMTAyNDkxIDMuNjgyNTc5MSAxMy43MTA5MzggMy4yOTEwMTU2IEwgMTIuNzEyODkxIDIuMjkyOTY4OCBDIDEyLjUxNzExNCAyLjA5NzE4NyAxMi4yNjEzNTkgMiAxMi4wMDU4NTkgMiB6IE0gMTYuMDAxOTUzIDUuOTk0MTQwNiBDIDE1Ljc0NjQ2MyA1Ljk5NDE0MDYgMTUuNDkwNjkyIDYuMDkzMjczNSAxNS4yOTQ5MjIgNi4yODkwNjI1IEwgMTQuMjk4ODI4IDcuMjg1MTU2MiBDIDEzLjkwNzI4OSA3LjY3NjczNDIgMTMuOTA3Mjg5IDguMzA1Njg3NyAxNC4yOTg4MjggOC42OTcyNjU2IEwgMTUuMjk2ODc1IDkuNjk3MjY1NiBDIDE1LjY4ODQxNCAxMC4wODg4NDQgMTYuMzE5Mzk4IDEwLjA4ODg0NCAxNi43MTA5MzggOS42OTcyNjU2IEwgMTcuNzA3MDMxIDguNzAxMTcxOSBDIDE4LjA5ODU3MSA4LjMwOTU5MzkgMTguMDk4NTcxIDcuNjc4Njg3MyAxNy43MDcwMzEgNy4yODcxMDk0IEwgMTYuNzA4OTg0IDYuMjg5MDYyNSBDIDE2LjUxMzIxNSA2LjA5MzI3MzUgMTYuMjU3NDQzIDUuOTk0MTQwNiAxNi4wMDE5NTMgNS45OTQxNDA2IHogTSA5IDcgQyA4IDcgOCA4IDguNSA4LjUgQyA4LjgzMzMzMyA4LjgzMzMgOS41IDkuNSA5LjUgOS41IEwgOC41IDEwLjUgQyA4LjUgMTAuNSA4IDExIDguNSAxMS41IEMgOSAxMiA5LjUgMTEuNSA5LjUgMTEuNSBMIDEwLjUgMTAuNSBMIDExLjUgMTEuNSBDIDEyIDEyIDEzIDEyIDEzIDExIEwgMTMgNyBMIDkgNyB6IE0gNC4wNDg4MjgxIDEwLjAwMTk1MyBDIDMuNzkzMzA4NyAxMC4wMDE5NTMgMy41Mzc1ODkxIDEwLjA5OTEyOSAzLjM0MTc5NjkgMTAuMjk0OTIyIEwgMi4yOTg4MjgxIDExLjMzNzg5MSBDIDEuOTA3MjQzNyAxMS43Mjk0NzYgMS45MDcyNDM3IDEyLjM2MDM2OCAyLjI5ODgyODEgMTIuNzUxOTUzIEwgNy4yNDgwNDY5IDE3LjcwMTE3MiBDIDcuNjM5NjMxMyAxOC4wOTI3NTcgOC4yNzA1MjUgMTguMDkyNzU3IDguNjYyMTA5NCAxNy43MDExNzIgTCA5LjcwNTA3ODEgMTYuNjU4MjAzIEMgMTAuMDk2NjYzIDE2LjI2NjYxOCAxMC4wOTY2NjMgMTUuNjM1NzI2IDkuNzA1MDc4MSAxNS4yNDQxNDEgTCA0Ljc1NTg1OTQgMTAuMjk0OTIyIEMgNC41NjAwNjcyIDEwLjA5OTEyOSA0LjMwNDM0NzUgMTAuMDAxOTUzIDQuMDQ4ODI4MSAxMC4wMDE5NTMgeiAiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiCiAgICAgICBpZD0icmVjdDkxOTgiIC8+CiAgPC9nPgo8L3N2Zz4K);\n}\n\n\n</style></div><div class=\"styles-embed-8 w-embed\"><style>\n.mapbox-gl-draw_combine {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iY29tYmluZS5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM1NzQwIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDEwMyIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQxODQiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIHgxPSIzMDAzIgogICAgICAgeTE9IjEwIgogICAgICAgeDI9IjMwMTciCiAgICAgICB5Mj0iMTAiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEsMi42MTcxODc0ZS02KSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDEwMyI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wNDEwNSIgLz4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MDsiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3A0MTA3IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjE2IgogICAgIGlua3NjYXBlOmN4PSIyLjQyMzAwNiIKICAgICBpbmtzY2FwZTpjeT0iMTIuMTczMTY1IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMjA3OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDU0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSI5MDAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjI5NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIHNob3dndWlkZXM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOmJib3gtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6b2JqZWN0LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLW90aGVycz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6c25hcC1ub2Rlcz0iZmFsc2UiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNTc0NiIKICAgICAgIGVtcHNwYWNpbmc9IjIiCiAgICAgICB2aXNpYmxlPSJ0cnVlIgogICAgICAgZW5hYmxlZD0idHJ1ZSIKICAgICAgIHNuYXB2aXNpYmxlZ3JpZGxpbmVzb25seT0idHJ1ZSIKICAgICAgIHNwYWNpbmd4PSIwLjVweCIKICAgICAgIHNwYWNpbmd5PSIwLjVweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4wNTg4MjM1MyIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE1NzQzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0xMDMyLjM2MjIpIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAxMi4wNTA3ODEgMiBDIDExLjc5NTI2MiAyIDExLjUzOTU0MiAyLjA5NzE3NjIgMTEuMzQzNzUgMi4yOTI5Njg4IEwgMTAuMjk4ODI4IDMuMzM3ODkwNiBDIDkuOTA3MjQzNyAzLjcyOTQ3NTcgOS45MDcyNDM3IDQuMzYwMzY4IDEwLjI5ODgyOCA0Ljc1MTk1MzEgTCAxNS4yNDgwNDcgOS43MDExNzE5IEMgMTUuNjM5NjMxIDEwLjA5Mjc1NyAxNi4yNzA1MjUgMTAuMDkyNzU3IDE2LjY2MjEwOSA5LjcwMTE3MTkgTCAxNy43MDcwMzEgOC42NTYyNSBDIDE4LjA5ODYxNiA4LjI2NDY2NDkgMTguMDk4NjE2IDcuNjMzNzcyNiAxNy43MDcwMzEgNy4yNDIxODc1IEwgMTIuNzU3ODEyIDIuMjkyOTY4OCBDIDEyLjU2MjAyIDIuMDk3MTc2MiAxMi4zMDYzMDEgMiAxMi4wNTA3ODEgMiB6IE0gOCA4IEMgNyA4IDcgOSA3LjUgOS41IEMgNy44MzMzMzMgOS44MzMzIDguNSAxMC41IDguNSAxMC41IEwgNy41IDExLjUgQyA3LjUgMTEuNSA3IDEyIDcuNSAxMi41IEMgOCAxMyA4LjUgMTIuNSA4LjUgMTIuNSBMIDkuNSAxMS41IEwgMTAuNSAxMi41IEMgMTEgMTMgMTIgMTMgMTIgMTIgTCAxMiA4IEwgOCA4IHogTSA0IDEwLjAwMzkwNiBDIDMuNzQ0NTEgMTAuMDAzOTA2IDMuNDkwNjkxNiAxMC4xMDMwMzkgMy4yOTQ5MjE5IDEwLjI5ODgyOCBMIDIuMjk4ODI4MSAxMS4yOTQ5MjIgQyAxLjkwNzI4ODggMTEuNjg2NSAxLjkwNzI4ODggMTIuMzE1NDUzIDIuMjk4ODI4MSAxMi43MDcwMzEgTCAzLjI5Njg3NSAxMy43MDcwMzEgQyAzLjY4ODQxNDQgMTQuMDk4NjA5IDQuMzE5Mzk4MSAxNC4wOTg2MDkgNC43MTA5Mzc1IDEzLjcwNzAzMSBMIDUuNzA3MDMxMiAxMi43MTA5MzggQyA2LjA5ODU3MDYgMTIuMzE5MzYgNi4wOTg1NzA2IDExLjY4ODQ1MyA1LjcwNzAzMTIgMTEuMjk2ODc1IEwgNC43MDcwMzEyIDEwLjI5ODgyOCBDIDQuNTExMjYxNiAxMC4xMDMwMzkgNC4yNTU0OSAxMC4wMDM5MDYgNCAxMC4wMDM5MDYgeiBNIDcuOTk2MDkzOCAxNCBDIDcuNzQwNTk0MiAxNCA3LjQ4NDgzOTUgMTQuMDk3MTg3IDcuMjg5MDYyNSAxNC4yOTI5NjkgTCA2LjI5NDkyMTkgMTUuMjg5MDYyIEMgNS45MDMzNjc5IDE1LjY4MDYyNiA1LjkwMzM2NzkgMTYuMzExNTYxIDYuMjk0OTIxOSAxNi43MDMxMjUgTCA3LjI5Mjk2ODggMTcuNzAxMTcyIEMgNy42ODQ1MjI3IDE4LjA5MjczNSA4LjMxMzUyNDIgMTguMDkyNzM1IDguNzA1MDc4MSAxNy43MDExNzIgTCA5LjcwMTE3MTkgMTYuNzA1MDc4IEMgMTAuMDkyNzI2IDE2LjMxMzUxNSAxMC4wOTI3MjYgMTUuNjg0NTMyIDkuNzAxMTcxOSAxNS4yOTI5NjkgTCA4LjcwMzEyNSAxNC4yOTI5NjkgQyA4LjUwNzM0OCAxNC4wOTcxODcgOC4yNTE1OTMzIDE0IDcuOTk2MDkzOCAxNCB6ICIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMTAzMi4zNjIyKSIKICAgICAgIGlkPSJyZWN0OTE5OCIgLz4KICA8L2c+Cjwvc3ZnPgo=);\n}\n\n.mapboxgl-map.mouse-pointer .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: pointer;\n}\n.mapboxgl-map.mouse-move .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mouse-add .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: crosshair;\n}\n.mapboxgl-map.mouse-move.mode-direct_select\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: grab;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n}\n.mapboxgl-map.mode-direct_select.feature-vertex.mouse-move\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mode-direct_select.feature-midpoint.mouse-pointer\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: cell;\n}\n.mapboxgl-map.mode-direct_select.feature-feature.mouse-move\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mode-static.mouse-pointer\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: grab;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n}\n.mapbox-gl-draw_boxselect {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    background: rgba(0, 0, 0, 0.1);\n    border: 2px dotted #fff;\n    opacity: 0.5;\n}\n\n</style></div>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
}
</Fragment_1>
</Slot>
}
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
id={"hero"}
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk c1nqn1pw cvbnc8e c4ph8p6`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 c185jzsb ct0qrmw c1j3nit7 c1e32zli c3u8caf c13g3obg`}>
<div
className={`w-element c1numhkq c15kiuw7 ct0qrmw c1a06u5s c1sjfwqi`}>
<h1
className={`w-element c6l7gor c140bhqz cn7k83s c1d8rs8t c8d36da c82qwqc cky4m2u c1w9fs99 c5rv8xx c1lwn44j cl4dpup c1plys2`}>
{LocalPagesData?.data?.data?.services?.[0]?.seoTitleTag

}
</h1>
<h2
className={`w-element c9aekss cw419ez c1tdj1xa c1yzjm0o c1lwn44j c1fjww6l c1lpaktx cj9wc3m`}>
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
{LocalPagesData?.data?.data?.services?.[0]?.headerDescription}
</p>
</div>
<Link
href={"/quote"}
target={"_self"}
className={`w-element c1numhkq c1diokdk ch3nxmx ciot89f c20rkyc c9su8v5 c1idbwr4 c7htweh c15lzzou ckrq2bq cxzv1vz c1d8rs8t c8d36da c1rcbzmj cacmu18 c1p4xat6 c1wzdku c2yws97 c1qporyx c1n5kit4 cb5io3 cn7k83s cimel00 c5g53jj`}>
{LocalPagesData?.data?.data?.services?.[0]?.buttonTextHeaderCta}
</Link>
</div>
<div
className={`w-element cnwi6s4 c1lq6pq8 cqq3lvy cz2xurt c8k1zf0 c13g3obg cr1k71u cbqs0w2`}>
<YouTube
url={LocalPagesData?.data?.data?.services?.[0]?.headerVideo}
loading={"eager"}
showRelatedVideos={false}
className={`w-you-tube cqq3lvy cdmu5h7 ccaufd5 c1umnxkx cce8wht c1sb614n c1hwvjgs c139pwc6 czbu68a cjkauba cn87dm8 c1uhhf7h c1epvuph`}>
<VimeoPreviewImage
alt={"YouTube video preview image"}
sizes={"100vw"}
optimize={true}
loading={"eager"}
src={"https://v2.improveitmd.com/uploads/Capitol_Improvements_Finished_Photos_exzt5u_90611f8ed2.webp"}
fetchPriority={"high"}
className={`w-preview-image cnbug7k cdmu5h7 cfrqxly c139pwc6 cjkauba csabcfw c1w2t8ro c1gjvd20 c1w2te30`} />
<VimeoSpinner
className={`w-spinner cnbug7k ccgl4y2 cag2zqh c16efw4k c10vpd2y cz1gmor c6yclp8`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"c765c5cf3__e2CRglijn891\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" viewBox=\"0 0 128 128\" fill=\"currentColor\" width=\"100%\" height=\"100%\" style=\"display: block;\"><style>@keyframes e2CRglijn892_tr__tr{0%{transform:translate(64px,64px) rotate(90deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}50%{transform:translate(64px,64px) rotate(810deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}to{transform:translate(64px,64px) rotate(1530deg)}}@keyframes e2CRglijn892_s_p{0%,to{stroke:#39fbbb}25%{stroke:#4a4efa}50%{stroke:#e63cfe}75%{stroke:#ffae3c}}@keyframes e2CRglijn892_s_do{0%{stroke-dashoffset:251.89}2.5%,52.5%{stroke-dashoffset:263.88;animation-timing-function:cubic-bezier(.42,0,.58,1)}25%,75%{stroke-dashoffset:131.945}to{stroke-dashoffset:251.885909}}#c765c5cf3__e2CRglijn892_tr{animation:e2CRglijn892_tr__tr 3000ms linear infinite normal forwards}#c765c5cf3__e2CRglijn892{animation-name:e2CRglijn892_s_p,e2CRglijn892_s_do;animation-duration:3000ms;animation-fill-mode:forwards;animation-timing-function:linear;animation-direction:normal;animation-iteration-count:infinite}</style><g id=\"c765c5cf3__e2CRglijn892_tr\" transform=\"translate(64,64) rotate(90)\"><circle id=\"c765c5cf3__e2CRglijn892\" r=\"42\" fill=\"none\" stroke=\"#39fbbb\" stroke-dasharray=\"263.89\" stroke-dashoffset=\"251.89\" stroke-linecap=\"round\" stroke-width=\"16\" transform=\"scale(-1,1) translate(0,0)\"/></g></svg>"}
clientOnly={true}
className={`w-html-embed`} />
</VimeoSpinner>
<VimeoPlayButton
aria-label={"Play button"}
className={`w-play-button cnbug7k c15zxcfo c1d1mxpw ccgl4y2 cag2zqh c5ps8o0 crrlzdp c1numhkq c1diokdk ch3nxmx c13qspjq c1cqma02 c1yhof13 c1jvw4nv cw0d079 c1mpqvj6 c81ebuq c18kyhsr c1d7h9xn c1b94vpf cz6rnt2`}>
<div
aria-hidden={true}
className={`w-element c13za7x0 c1hstsjx`}>
<HtmlEmbed
code={"<svg fill=\"#ffffff\" height=\"100%\" width=\"60%\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 460.114 460.114\" xml:space=\"preserve\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <g> <path d=\"M393.538,203.629L102.557,5.543c-9.793-6.666-22.468-7.372-32.94-1.832c-10.472,5.538-17.022,16.413-17.022,28.26v396.173 c0,11.846,6.55,22.721,17.022,28.26c10.471,5.539,23.147,4.834,32.94-1.832l290.981-198.087 c8.746-5.954,13.98-15.848,13.98-26.428C407.519,219.477,402.285,209.582,393.538,203.629z\"></path> </g> </g> </g></svg>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
</VimeoPlayButton>
</YouTube>
</div>
</div>
<div
className={`w-element c185jzsb c139pwc6`} />
</div>
</div>
</section>
<div
id={"toc"}
className={`w-element cvfl1ur cwlh68t`}>
<div
className={`w-element c4vc9qx c9tjkc5 cknz90 cd6izue c7iyr7r cmpwmbp cwq5w9j c19p1lxn cp7sh9x c1ypbuo2`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk ckjs5zd cmvloo2 c139pwc6 c4ph8p6 cvrapzf c1oxe5xw c1hce33d`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1irdqs7 c1uclgp3 cyovuht`}>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c61em0b`}>
{"Table of Contents"}
</p>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Roof Repair & Replacement"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.residentialCalc) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#calc-cc"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Instant Roof Price Calculator"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Roofs Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#warranty"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Roof Warranty Comparison"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.weatherWidget) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#weather"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Weather"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Siding Repair & Replacement"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Homes Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Window Styles & Replacement"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Windows Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Entry & Sliding Glass Doors"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Doors Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Deck Building & Repair"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Decks Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "gutter") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Gutter Building & Replacement"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Gutters Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "trim") &&
<ul
className={`w-element cdbkbxd c13tkoq5 c1mh6fes c5mfm02 cn5qs21 c1numhkq c1a06u5s c15kiuw7 ct0qrmw c17rwy3n c1603wqb`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#services"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Complete Services List: Trim Repair & Replacement"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#why-choose-us"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#case-study-1"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{LocalPagesData?.data?.data?.services?.[0]?.city + " Project Spotlight"}
</Link>
</li>
}
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#financing"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Financing & Easy Payment Plans"}
</Link>
</li>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Map: " + LocalPagesData?.data?.data?.services?.[0]?.city + " Neighbors We’ve Served"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#owners-served"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Areas We Serve in " + LocalPagesData?.data?.data?.services?.[0]?.city}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#inspection"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Local Trims Serviced & Inspected"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#office"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"Our Local Office"}
</Link>
</li>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<li
className={`w-element cnwp191 cn5qs21 c1v90cn6 c1g3mhtg ctwiwm6 cpqexmi cqf3joj c4vhohm`}>
<Link
href={system?.params?.slug + "#hoa"}
target={"_self"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"HOA Directory & Community Guidelines"}
</Link>
</li>
}
</ul>
}
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.faqsRichText ? true : false) &&
<div
className={`w-element c1uclgp3 cyovuht`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.faqsRichText}
clientOnly={true}
className={`w-html-embed c1numhkq`}>
</HtmlEmbed>
</div>
}
</div>
</div>
</div>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectKeywordImage ? true : false) &&
<section
id={"recent-project"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c19wzbh8 c7iyr7r cmpwmbp c11tsnyu c164730d`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s ckjs5zd cmvloo2`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c1a06u5s c1i2t266 c1w4abcz cj1xwpe cpdrg3g c17crvds c1czy0yv c1epvuph c1qimg6p cip7j3i c13d76g4 c1fy1qpm c1rxa3re c147y3ls c2p0cuk`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c139pwc6`}>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ct0qrmw c1s88tz3 c1j3nit7 c139pwc6`}>
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectHangline ? true : false) &&
<h2
className={`w-element c1g3mhtg c309ipl ca98neh ckecbya`}>
{LocalPagesData?.data?.data?.services?.[0]?.recentProjectHangline}
</h2>
}
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectKeywordImage?.url ? true : false) &&
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.recentProjectKeywordImage?.url}
alt={LocalPagesData?.data?.data?.services?.[0]?.altTextForKeywordImage}
className={`w-image c139pwc6 c1owcyig c1epvuph`} />
}
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
}
<div
id={"services"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c5zgd1 c1mndhrk c11b3qd4 ctcfpb7 c1numhkq c15kiuw7 c3auquk c1j3nit7 c1s88tz3 c1dn43oe c1ab5oob cnikeys c10k3jam cn0qaoo c4ph8p6 c1t9puix c1fuza05`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1lbbsf4 cd6izue c1pvb9sj cyovuht c13g3obg c1fy1qpm c1mx5icy`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesTitleDescription}
clientOnly={true}
className={`w-html-embed c1tm0t1i c1ib9ypd cjzablv cyl4kdh cto9k25 c56odag c1hqutl1 cjx1ika c1xpbze2 c1c9efyk c1stgdk8 c8qrtxl c1sl5awa c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn`}>
</HtmlEmbed>
</div>
<div
className={`w-element cnwi6s4 c1lq6pq8 c1numhkq c1a06u5s c1diokdk ch3nxmx c1lbbsf4 c12fmqv1 cc29gav ctcfpb7 cjkauba c14b5x9o c19uxmdw cvfl1ur c1ab5oob cnikeys c10k3jam cn0qaoo cyovuht c7pwpdo c13g3obg czdtdk8 c1mx5icy c1y2rwbr`}>
<Accordion
collapsible={true}
className={`w-accordion c1numhkq c1a06u5s c1irdqs7 c139pwc6 czbu68a`}>
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal1 ? true : false) &&
<AccordionItem
data-ws-index="0"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal1}
</h3>
</div>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc1}
clientOnly={true}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal2 ? true : false) &&
<AccordionItem
data-ws-index="1"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal2}
</h3>
</div>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc2}
clientOnly={true}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal3 ? true : false) &&
<AccordionItem
data-ws-index="2"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal3}
</h3>
</div>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc3}
clientOnly={true}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal4 ? true : false) &&
<AccordionItem
data-ws-index="3"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal4}
</h3>
</div>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc4}
clientOnly={true}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal5 ? true : false) &&
<AccordionItem
data-ws-index="4"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal5}
</h3>
</div>
<Box
className={`w-box cx79vvm c4pie2e c2shfwq c1lq6pq8 c60ws42 c1x35ah3 c1fof65s c1kl0qlc c3su6au`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 15.375L6 9.37505L7.075 8.30005L12 13.25L16.925 8.32505L18 9.40005L12 15.375Z\" fill=\"currentColor\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cn87dm8 c1uhhf7h c60ws42 c1wwn73i c1fof65s c1kl0qlc c3su6au ${"AccordionContent"}`}>
<div
className={`w-element c7u9bg8 cd311gm`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc5}
clientOnly={true}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
{(LocalPagesData?.data?.data?.services?.[0]?.servicesModal6 ? true : false) &&
<AccordionItem
data-ws-index="5"
className={`w-item c11b3qd4 c1co09t2`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
className={`w-item-trigger c1numhkq cnwi6s4 cxte6uv c1owwlzw c1diokdk c3auquk clmr8fm c139pwc6 c1d7h9xn cq4o19h c1hgk76z cqhp7pz c7h2haz c11sfhdp c1f36xcm copsr3e c1tn4ulv`}>
<div
className={`w-element`}>
<h3
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l c1g3mhtg`}>
{LocalPagesData?.data?.data?.services?.[0]?.servicesModal6}
</h3>
</div>
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
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.servicesModalDesc6}
className={`w-html-embed cqrls8h c1ib9ypd cja62bv cyl4kdh cto9k25`}>
</HtmlEmbed>
</div>
</AccordionContent>
</AccordionItem>
}
</Accordion>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 c1siv9z0 cbnzrl8 cl4dpup`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
clientOnly={true}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
<div
id={"why-choose-us"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType !== "gutter" && "trim") &&
<div
className={`w-element c1numhkq c1a06u5s c1sq4bmy c1diokdk ct0qrmw`}>
<div
className={`w-element c1numhkq`}>
<Image
src={"https://v2.improveitmd.com/uploads/Capitol_Improvements_Finished_Photos_cropped_nhgndu_784c811e7d.webp"}
loading={"lazy"}
alt={"family photo"}
className={`w-image c139pwc6 c1hwvjgs c9mjk8q czbu68a csabcfw c1w2t8ro c1w2te30 c1gjvd20`} />
</div>
<div
className={`w-element ${"features-header-wrapper"}`}>
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1rjplas cl197ma c1nxn35q`}>
{"Why " + LocalPagesData?.data?.data?.services?.[0]?.city + " Homeowners Choose Us"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Certified installers, local know-how, and warranties that protect your investment."}
</p>
</div>
<div
className={`w-element ${"features-list"}`}>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
href={"https://www.gaf.com/en-us/roofing-contractors/residential/usa/md/bowie/capitol-improvements-llc-1005901"}
target={"_blank"}
className={`w-element ${"features-item"}`}>
<Link
href={"https://www.gaf.com/en-us/roofing-contractors/residential/usa/md/bowie/capitol-improvements-llc-1005901"}
target={"_blank"}
className={`w-element`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Gaf_Master_Elite_kvteks_b9dc66ccb9.webp"}
className={`w-image ${"features-icon"}`} />
</Link>
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"GAF Master Elite Certified"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Top 3% of roofing contractors nationwide"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
href={"https://www.jameshardie.com/find-a-contractor/results/capitol-improvements-certified-installer-bowie/"}
target={"_blank"}
className={`w-element ${"features-item"}`}>
<Link
href={"https://www.jameshardie.com/find-a-contractor/results/capitol-improvements-certified-installer-bowie/"}
target={"_blank"}
className={`w-element`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/James_Hardie_Preferred_rarr7e_14beaacd36.webp"}
className={`w-image ${"features-icon"}`} />
</Link>
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"James Hardie Preferred Partner"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Authorized to install James Hardie fiber cement siding"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element ${"features-item"}`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Board_Pro_Platnium_ebzeqm_5420537416.png"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"TimberTech Platinum Certified"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"The highest recognition level offered to TimberTech contractors"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element ${"features-item"}`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Pro_Via_b4qh0r_b2df4e557b.webp"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"ProVia Certified Installers"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Trained and certified to install ProVia products to manufacturer standards"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/FORTIFIED_logo_program_01_1024x485_uehkpv_306668b9e6.png"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"FORTIFIED Roofing Certified"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"One of the few Maryland contractors certified for high-wind roofing systems"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/five_star_rating_icon_1_plpmjl_5296dfc541.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"5-Star Rated for Hardie Siding"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"The only Preferred Contractor locally with a perfect rating"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/five_star_rating_icon_1_plpmjl_5296dfc541.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"One of the ONLY 5-Star Rated TimberTech Contractors"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"One of the ONLY 5 stars rated for TimberTech deck installations and service"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/five_star_rating_icon_1_plpmjl_5296dfc541.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"A True 5-Star Rating"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We maintain a true 5 star rating online because we do quality work and genuinely care about our customers"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/hammer_icon_haniri_bdc66cb771.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Regional Expertise"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Understanding of Maryland's diverse climate zones and building requirements"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1767916686_hammer_icon_haniri_bb09faeabe.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Proven Installation Specialists"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Detail-driven workmanship on every siding project"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/hammer_icon_haniri_bdc66cb771.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Expert TimberTech Installers"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Trained and experienced in TimberTech composite and PVC decking systems"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/hammer_icon_haniri_bdc66cb771.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Precision Installation"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Installed correctly to prevent drafts, leaks, and long-term issues"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/badge_icon_hljgdo_10525f9c42.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Manufacturer-Backed Warranties"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Offering extended warranty coverage through GAF certification"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1767916685_badge_icon_hljgdo_1f6c00d73f.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Chosen by Local Homeowners"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Known for reliability, communication, and results"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/badge_icon_hljgdo_10525f9c42.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Trusted Local Contractor"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Serving homeowners with dependable craftsmanship and honest service"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/badge_icon_hljgdo_10525f9c42.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Manufacturer-Backed Warranties"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Strong warranties that protect your investment"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/holding_house_icon_lxtzdg_9806500b66.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Quality Materials"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Using premium roofing products suited to Maryland conditions"}
</p>
</div>
</div>
}
<div
className={`w-element ${"features-item"}`}>
<svg
height={"200px"}
width={"200px"}
version={"1.1"}
id={"_x32_"}
xmlns={"http://www.w3.org/2000/svg"}
xlink={"http://www.w3.org/1999/xlink"}
viewBox={"0 0 512 512"}
space={"preserve"}
fill={"#000000"}
stroke={"#000000"}
className={`w-element ${"features-icon"}`}>
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
<HtmlEmbed
code={"<style type=\"text/css\"> .st0{fill:rgb(0 25 46 / 1);} </style>"}
className={`w-html-embed`} />
<g
className={`w-element`}>
<path
d={"M255.366,141.046c-7.4,3.583-14.732,8.548-21.533,15.357c-34.091,34.098-65.081,65.088-65.081,65.088 l0.013,0.02c-0.185,0.186-0.371,0.338-0.557,0.53c-8.824,8.831-9.174,22.909-1.025,32.146c0.323,0.371,0.668,0.736,1.025,1.086 c9.161,9.174,24.036,9.196,33.232,0l35.797-35.797c6.176,2.263,12.248,3.583,18.074,4.243c7.937,0.88,15.392,0.55,22.022-0.385 c16.162-2.29,14.47-1.623,23.844-4.704c9.353-3.068,19.862-9.354,19.862-9.354l6.362,6.355 c0.701,0.681,16.919,16.925,25.192,25.185c1.465,1.471,2.709,2.682,3.542,3.549c0.956,0.997,2.022,1.719,2.682,2.682l41.278,41.279 c11.898-13.35,25.488-33.232,23.81-56.058L320.763,129.14C320.763,129.14,285.062,126.589,255.366,141.046z"}
className={`w-element ${"st0"}`} />
<path
d={"M261.115,394.362c-9.134-9.147-23.961-9.147-33.101,0l-6.794,6.794c9.119-9.132,9.112-23.926-0.021-33.066 c-9.14-9.126-23.947-9.126-33.087,0.007c9.14-9.133,9.14-23.94,0-33.087c-9.133-9.148-23.947-9.133-33.087,0 c9.14-9.133,9.14-23.947,0-33.095c-9.134-9.132-23.947-9.132-33.088,0.014l-20.46,20.453c-9.14,9.147-9.14,23.947,0,33.094 c9.133,9.134,23.941,9.134,33.08,0c-9.14,9.134-9.14,23.947,0,33.087c9.147,9.133,23.954,9.133,33.094,0 c-9.14,9.133-9.14,23.941,0,33.088c9.14,9.133,23.947,9.133,33.088,0l6.802-6.809c-9.119,9.147-9.113,23.94,0.02,33.081 c9.14,9.132,23.947,9.132,33.088,0l20.467-20.468C270.248,418.302,270.248,403.495,261.115,394.362z"}
className={`w-element ${"st0"}`} />
<path
d={"M507.987,178.28L387.543,57.822c-5.351-5.337-14.002-5.337-19.339,0l-38.631,38.63 c-5.337,5.337-5.337,13.989,0,19.333l120.458,120.451c5.33,5.35,13.996,5.35,19.326,0l38.63-38.638 C513.338,192.276,513.338,183.624,507.987,178.28z M473.655,204.992c-5.75,5.736-15.048,5.736-20.777,0 c-5.735-5.743-5.735-15.041,0-20.777c5.729-5.736,15.027-5.736,20.777,0C479.391,189.951,479.384,199.249,473.655,204.992z"}
className={`w-element ${"st0"}`} />
<path
d={"M182.417,99.864l-38.624-38.63c-5.336-5.337-13.995-5.337-19.332,0L4.003,181.691 c-5.337,5.323-5.337,13.989,0,19.319l38.631,38.644c5.33,5.331,14.002,5.331,19.325,0l120.458-120.458 C187.761,113.859,187.761,105.207,182.417,99.864z M59.118,208.403c-5.736,5.729-15.04,5.729-20.777,0 c-5.735-5.742-5.735-15.041,0-20.777c5.736-5.735,15.041-5.735,20.777,0C64.854,193.362,64.854,202.66,59.118,208.403z"}
className={`w-element ${"st0"}`} />
<path
d={"M397.528,312.809l-7.468-7.482l-72.509-72.509l-4.883,2.166l-5.316,1.919l-0.384,0.117 c-0.936,0.296-9.684,2.971-26.932,5.412c-9.12,1.273-18.156,1.431-26.904,0.434c-3.459-0.385-6.898-0.95-10.296-1.692 l-27.757,27.744c-16.678,16.678-43.836,16.678-60.514,0c-0.585-0.591-1.149-1.19-1.671-1.781l-0.179-0.2 c-10.529-11.939-13.204-28.28-8.252-42.461l10.673-16.609l-0.02-0.02l65.081-65.074c2.647-2.641,5.426-5.103,8.314-7.428 c-20.281-3.982-37.296-2.806-37.296-2.806L88.093,235.679c-1.389,18.988,11.651,39.799,20.928,51.952 c16.692-15.963,43.239-15.756,59.641,0.654c6.107,6.1,9.952,13.617,11.574,21.498c7.895,1.637,15.406,5.475,21.513,11.582 c6.107,6.114,9.952,13.631,11.575,21.519c7.888,1.623,15.412,5.46,21.513,11.568c4.078,4.078,7.152,8.783,9.222,13.817 c11.1-0.137,22.242,4.016,30.688,12.455c16.65,16.636,16.643,43.733,0,60.363l-6.809,6.822l3.411,3.412 c9.148,9.147,23.954,9.147,33.095,0c9.14-9.134,9.14-23.947,0-33.088l6.808,6.83c9.147,9.133,23.947,9.133,33.087,0 c9.14-9.147,9.147-23.954,0-33.101c9.147,9.147,23.947,9.147,33.087,0c9.134-9.126,9.154-23.94,0-33.088 c9.154,9.148,23.954,9.148,33.088,0c9.147-9.132,9.147-23.947,0-33.08L397.528,312.809z"}
className={`w-element ${"st0"}`} />
</g>
</g>
</svg>
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Family Owned. Family Operated."}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Built and run by the people behind it. Focused on serving our community, not wall street investors"}
</p>
</div>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/holding_house_icon_lxtzdg_9806500b66.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Built with James Hardie Materials"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Authentic products engineered for durability and protection"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/holding_house_icon_lxtzdg_9806500b66.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Premium Materials"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"We install genuine TimberTech products built for long-term performance"}
</p>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element ${"features-item"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/holding_house_icon_lxtzdg_9806500b66.svg"}
loading={"lazy"}
className={`w-image ${"features-icon"}`} />
<div
className={`w-element ${"item-text-wrapper"}`}>
<h3
className={`w-element c309ipl c1qb2rp3 c82qwqc c61em0b cwcnurz c1emvlx`}>
{"Energy-Efficient Performance"}
</h3>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Advanced glass and insulation designed to improve comfort and reduce energy costs"}
</p>
</div>
</div>
}
</div>
<div
className={`w-element ${"features-content-wrapper"}`}>
<div
className={`w-element c139pwc6 c1numhkq c1diokdk ch3nxmx co72if5 c1sq4bmy ciqrl3a`}>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<div
className={`w-element cht8odh c139pwc6 cn87dm8 c1uhhf7h c1numhkq c1diokdk ch3nxmx`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1767278930_2026_MASTER_ELITE_CERTIFICATE_ey6dcz_11a99efab0.jpg"}
loading={"lazy"}
alt={"2026 GAF Master Elite Certification for Capitol Improvements"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a cjkauba c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p`} />
</div>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"2026 GAF Master Elite Certification for Capitol Improvements"}
</p>
</div>
}
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<div
className={`w-element cht8odh c139pwc6 cn87dm8 c1uhhf7h c1numhkq c1diokdk ch3nxmx`}>
<Image
src={"https://v2.improveitmd.com/uploads/straightened_image_f6d9787376.jpeg"}
loading={"lazy"}
alt={"2026 BBB Certificate of Commendation for Capitol Improvements"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a cjkauba c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p`} />
</div>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"BBB Certification for Capitol Improvements"}
</p>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "siding") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/Whats_App_Image_2026_02_05_at_10_34_06_AM_aay5kl_ac71577c9f.jpg"}
loading={"lazy"}
alt={"Screenshot showing Capitol Improvmeents is one of the only 5-star James Hardie partner in the contractor alliance program."}
className={`w-image c139pwc6 c1hwvjgs c9mjk8q czbu68a c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p ${"certification-image"}`} />
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"5-Star Rated for Hardie Siding"}
</p>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "deck") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<Image
src={"https://v2.improveitmd.com/uploads/Whats_App_Image_2026_02_05_at_10_34_02_AM_cropped_dp8tdb_addb4c692e.jpg"}
loading={"lazy"}
alt={"5 stars rated for TimberTech deck installations and service"}
className={`w-image c139pwc6 c1hwvjgs c9mjk8q czbu68a c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p ${"certification-image"}`} />
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"5 stars rated for TimberTech deck installations and service"}
</p>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<div
className={`w-element cht8odh c139pwc6 cn87dm8 c1uhhf7h c1numhkq c1diokdk ch3nxmx`}>
<Image
src={"https://v2.improveitmd.com/uploads/Pro_Via_Certificate_Fitted_Crop_yosl1x_605ebb4d17.jpg"}
loading={"lazy"}
alt={"Image of our Provia Window Certification good until August 2029"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a cjkauba c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p`} />
</div>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Image of our Provia Window Certification good until August 2029"}
</p>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<div
className={`w-element cht8odh c139pwc6 cn87dm8 c1uhhf7h c1numhkq c1diokdk ch3nxmx`}>
<Image
src={"https://v2.improveitmd.com/uploads/Fortified_Certificate_g11ept_e6f662f857.jpg"}
loading={"lazy"}
alt={"2026 Fortified Roofing Certification for Capitol Improvements"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a cjkauba c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p`} />
</div>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"2026 Fortified Roofing Certification for Capitol Improvements"}
</p>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "door" || LocalPagesData?.data?.data?.services?.[0]?.serviceType === "window") &&
<div
className={`w-element c1p4xat6 ${"features_image-block"}`}>
<div
className={`w-element cht8odh c139pwc6 cn87dm8 c1uhhf7h c1numhkq c1diokdk ch3nxmx`}>
<Image
src={"https://v2.improveitmd.com/uploads/Pro_Via_Certificate_2_fitted_crop_mr5dfd_b46623ab5f.jpg"}
loading={"lazy"}
alt={"Image of our Provia Window Certification good until August 2029"}
className={`w-image c18hkk31 c1hwvjgs c9mjk8q czbu68a cjkauba c1i2t266 c1w4abcz cj1xwpe cpdrg3g c1qimg6p`} />
</div>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l`}>
{"Image of our Provia Window Certification good until August 2029"}
</p>
</div>
}
</div>
<blockquote
className={`w-element ${"features-caption"}`}>
{"© 2026 Captiol Improvements"}
</blockquote>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cl4dpup`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
}
</div>
</div>
</div>
{(!!LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription) &&
<div
id={"case-study-1"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c1a06u5s c1i2t266 c1w4abcz cj1xwpe cpdrg3g c17crvds c1czy0yv c1epvuph c1qimg6p cip7j3i c13d76g4 c1fy1qpm c1rxa3re c147y3ls c2p0cuk`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c139pwc6`}>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ct0qrmw c1s88tz3 c1j3nit7 c139pwc6`}>
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage1?.url ? true : false) &&
<div
className={`w-element c1numhkq c3auquk c1pit5s0 c3qgmhh c139pwc6 ckijpy8 c1txodcv c5wc26g cs0io4s`}>
<div
className={`w-element c139pwc6 cjkauba c1numhkq`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage1?.url}
alt={LocalPagesData?.data?.data?.services?.[0]?.altTextForProjectImage1}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba c5rq1pv`} />
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage2?.url ? true : false) &&
<div
className={`w-element c139pwc6 cjkauba c1numhkq`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage2?.url}
alt={LocalPagesData?.data?.data?.services?.[0]?.altTextForProjectImage2}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba c5rq1pv`} />
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage3?.url ? true : false) &&
<div
className={`w-element c139pwc6 cjkauba c1numhkq`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage3?.url}
alt={LocalPagesData?.data?.data?.services?.[0]?.altTextForProjectImage3}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba c5rq1pv`} />
</div>
}
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage1?.url ? true : false) &&
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1d5qtqw c1epvuph cvfl1ur ${"swiper is-service"}`}>
<div
className={`w-element c1epvuph ${"swiper-wrapper"}`}>
<div
className={`w-element cqdbcb3 c36uo35 ${"swiper-slide is-service"}`}>
<Image
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage1?.url}
width={768}
height={832}
alt={"Copper colored metal roof in Gaithersburg, MD. "}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage2?.url ? true : false) &&
<div
className={`w-element cqdbcb3 c36uo35 ${"swiper-slide is-service"}`}>
<Image
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage2?.url}
width={768}
height={832}
alt={"Brown metal standing seam roof installed in Millersville, MD."}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.projectImage3?.url ? true : false) &&
<div
className={`w-element cqdbcb3 c36uo35 ${"swiper-slide is-service"}`}>
<Image
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectImage3?.url}
width={768}
height={832}
alt={"A detached shed with a green standing seam metal roof. "}
loading={"eager"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
}
</div>
<div
className={`w-element cec7hv2 c1diokdk ct0qrmw cnbug7k cmhuipo c1sz7ez0 c19wpft8 c189czh1 cayoy73 c1numhkq c1mndhrk c1d7h9xn ${"arrow-prev"}`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"><path d=\"M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z\" fill=\"currentColor\" '=\"\"></path></svg>"}
className={`w-html-embed c1lvj0n`} />
</div>
<div
className={`w-element cec7hv2 c1diokdk ct0qrmw cnbug7k cmhuipo cmnqq0u c19wpft8 c4wcauq c1numhkq c1mndhrk c1d7h9xn ${"arrow-next"}`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"><path d=\"M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z\" fill=\"currentColor\" '=\"\"></path></svg>"}
className={`w-html-embed c1lvj0n`} />
</div>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription ? true : false) &&
<div
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.recentProjectDescription}
clientOnly={true}
className={`w-html-embed c1a06u5s c1numhkq c1tm0t1i c1ib9ypd cja62bv c3ltsqc c9je6mn c56odag c1hqutl1 cjx1ika c1fru7rn c157qrpw c1stgdk8 c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz c8d8zdt cqm3vtw cnwe5rt c12p9wau cc3fg0r c1aepyir c1giflz1 c1un2ooj c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn c1d6mxg3 c1lm8j52 cnhfllf chjdpw9 c1pepvkm cs52kbd c1oh1ckg c1tfgo8d c4hp6bu cq7cy6g c3ov2p9`}>
</HtmlEmbed>
</div>
}
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 c1siv9z0`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.residentialCalc ? true : false) &&
<section
id={"calc-cc"}
className={`w-element cvfl1ur c2ifgan c1huz57e ${"is-green"}`}>
<HtmlEmbed
code={"<style>\n.is-green {\n  background-color: rgb(230 244 230 / 1);\n}\n  \n#geocoder{\nz-index: 1;\nmargin: 0px;\n}\n\n.mapboxgl-ctrl-geocoder {\nheight: 52px;\nmin-width: 100%!important;\nmin-height: 100%!important;\nbox-shadow: none!important;\n}\n\n.mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-search {\nwidth: auto;\nheight: 24px;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\ntop: 12px!important;\nmargin-left: 4px;\nmargin-top: 2px;\n}\n\ninput.mapboxgl-ctrl-geocoder {\nmin-width: 100%;\nmin-height: 100%;\n}\n\ninput.mapboxgl-ctrl-geocoder--input {\nheight: 100%;\nwidth: 100%;\nborder-radius: 4px;\nborder-bottom-color: #128547;\nborder-bottom-style: solid;\nborder-bottom-width: 2px;\nborder-left-color: #128547;\nborder-left-style: solid;\nborder-left-width: 2px;\nborder-right-color: #128547;\nborder-right-style: solid;\nborder-right-width: 2px;\nborder-top-color: #128547;\nborder-top-style: solid;\nborder-top-width: 2px;\nfont-size: 16px;\noutline: 0!important;\n\n}\n\ninput:focus {\nborder-color: #0ab966;\noutline: 0!important;\n}\n  \n#lowestMonthly, #highestMonthly {\nfont-weight: bold;\n}\n\n.geocoder_loader {\n\tborder-bottom-color: transparent !important;\n\tdisplay: inline-block;\n\tanimation: rotation 1s linear infinite !important;\n}\n\n@keyframes rotation {\n\t0% {\n\t\ttransform: rotate(0deg);\n\t}\n\t100% {\n\t\ttransform: rotate(360deg);\n\t}\n}\n</style>"}
className={`w-html-embed`} />
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 c5ftqtp c1ux94pn c70q66u c1numhkq c1a06u5s c53aqfr ch3nxmx`}>
<div
data-element={"geocoder-wrap"}
className={`w-element c1numhkq c1diokdk c3auquk c1a06u5s c1j3nit7 c1s88tz3 ${"geocoder__wrap"}`}>
<div
className={`w-element c1numhkq c1a06u5s c1p4xat6`}>
{(LocalPagesData?.data?.data?.[0]?.residentialCalcHeader === null ? true : false) &&
<h2
className={`w-element c1q4209f ca98neh cnvsn5k c1lwn44j c1fjww6l c1ve0prg cl197ma c1nxn35q`}>
<b
className={`w-element`}>
{"How Much Does a New Roof Cost? Use Our Instant Estimator To Find Out!"}
</b>
</h2>
}
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.residentialCalcHeader}
className={`w-html-embed c1tm0t1i c1ib9ypd cja62bv ck7sefv ck5t6k3 cbddvez cp277i2 cgqh2e c1xn7soa cx3jmfe cnwe5rt`}>
</HtmlEmbed>
</div>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"49\" viewBox=\"0 0 30 49\" fill=\"none\">\n  <path d=\"M13.5858 48.4142C14.3668 49.1953 15.6332 49.1953 16.4142 48.4142L29.1421 35.6863C29.9232 34.9052 29.9232 33.6389 29.1421 32.8579C28.3611 32.0768 27.0948 32.0768 26.3137 32.8579L15 44.1716L3.68629 32.8579C2.90524 32.0768 1.63891 32.0768 0.857866 32.8579C0.0768171 33.6389 0.0768171 34.9052 0.857866 35.6863L13.5858 48.4142ZM13 8.74228e-08L13 47L17 47L17 -8.74228e-08L13 8.74228e-08Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed`} />
<h3
className={`w-element c1g3mhtg c4ijzwc c18mkjfw c1vgwqmx c1p4xat6`}>
{"What's your address?"}
</h3>
<div
className={`w-element ca9fo5a`}>
<div
className={`w-element c1sdqiq6 cbpcpoz c1hwvjgs cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"geocoder_loader"}`} />
<div
id={"geocoder"}
className={`w-element c139pwc6 cjkauba c1y9x0uu c9te4zd`} />
</div>
<HtmlEmbed
code={"<style>\n.is--hidden {\n  display: none;\n}\n</style>"}
className={`w-html-embed`} />
<div
className={`w-element c139pwc6 cjkauba cvcvidj c1lzjd2w c1epvuph c9nw4u8 c9te4zd cagmsft`}>
<Image
src={"https://v2.improveitmd.com/uploads/search_icon_grey_2_KR_Phgsf3_Mq_Ywy_OF_3_JX_Ub_375d129398.svg"}
width={18}
height={18}
alt={"search icon"}
loading={"lazy"}
className={`w-image c139pwc6 c9te4zd cdmu5h7 czbu68a cjbrpt5 cnbug7k ck16jqu cixwgt9 c1r07he0 c1sz7ez0 c1edz3f7 c1k2ys7c cons3u5 ${"icon-absolute"}`} />
<search
className={`w-element c139pwc6 ${"search is--hidden"}`}>
<Input
type={"search"}
id={"search"}
placeholder={"Type your street address"}
className={`w-element c1vfcewx cu07q3l csbccvi c3mj6m4 c1130jsx c1sakqqc c8d36da cskfpgs czs7314 c1vpn826 ccvl4bl cah2wi2 cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c1fe83lo c2x8fqk card98i c1h610f4 cc94fo5 culorum cl4dpup ch8gn31`} />
<button
type={"submit"}
className={`w-element c9te4zd`}>
{"Search"}
</button>
</search>
<div
id={"result"}
className={`w-element ${"is--hidden"}`} />
</div>
<p
className={`w-element c14s91he c1hic3qd c6zkp93 c1vgwqmx cearg2n ${"14px_text is--light"}`}>
{"For Maryland, Northern Virginia, and DC residents only."}
</p>
</div>
<Slot>
<Fragment_1>
<div
data-element={"size-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c13g3obg c8lozzs c1g4ou9b c3gou43 c1ka8hwj c18z6qun c1ma3j39 ca5v07y ${"map__wrap is--hidden"}`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cu2kdg8 c139pwc6 c1txodcv c18a8z5x c13gb9an c14rh8tu c1fjl1d4 cimibkh c4vcdpw c1jhvg8i c16iqon5 ${"estimator__topbar is--pad"}`} />
<div
className={`w-element cgw13qo c1owcyig c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx crv3s27 ${"map_container"}`}>
<div
data-element={"prompt-1"}
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt"}`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cjhli7i c15jf3ap c1ymq8p2 c1rjplas csp9rjz cunjrta cyw22sp c21pbot c5lgbye c1mj3xme`}>
<h2
className={`w-element cakyt4y c18bwt63 c1mndzy8`}>
{"Is your roof covered in green?"}
</h2>
<p
className={`w-element c1hi1vvu c1hic3qd cjl1vg1 cltlf0q`}>
{"Click continue below, or click adjust if needed."}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c14if4po c1x44cjl cg0lu56 c1p0m755 c1epvuph czphx6q culr909 csgzb5o c6kdftu`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_8756e34c1f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Address"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ch3nxmx c17s72gd cnbug7k cw6436c cxiuqxr`}>
<div
className={`w-element c1g2c0ij c1x5xbjr c1jewze7 c9slfh6 c9nw4u8 cnbug7k c1pmjbur c1knp2fb ccqa9kw c10iz0pl`} />
<div
className={`w-element c1g2c0ij c1eb7rwy c1jewze7 c9slfh6 c9nw4u8 cnbug7k c156ohex c1knp2fb cn0tah1 c10iz0pl`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_06ffd00864.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_06ffd00864.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
data-element={"prompt-2"}
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt"}`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cjhli7i c15jf3ap c1ymq8p2 c1rjplas csp9rjz cunjrta cyw22sp c21pbot c5lgbye c1mj3xme`}>
<h2
className={`w-element cakyt4y c18bwt63 c1p8o3vn`}>
{"Click and drag the dots to match your roof."}
</h2>
<p
className={`w-element c1hi1vvu c1hic3qd cjl1vg1 cltlf0q`}>
{"A dot should align with each outer corner of your roof. After outlining, click continue."}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c14if4po c1x44cjl cg0lu56 c1p0m755 c1epvuph czphx6q culr909 csgzb5o c6kdftu`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_8756e34c1f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Address"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ch3nxmx c17s72gd cnbug7k cw6436c cxiuqxr`}>
<div
className={`w-element c1g2c0ij c1x5xbjr c1jewze7 c9slfh6 c9nw4u8 cnbug7k c1pmjbur c1knp2fb ccqa9kw c10iz0pl`} />
<div
className={`w-element c1g2c0ij c1eb7rwy c1jewze7 c9slfh6 c9nw4u8 cnbug7k c156ohex c1knp2fb cn0tah1 c10iz0pl`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_06ffd00864.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_06ffd00864.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
id={"map"}
className={`w-element c4xfxm c9ql0pv c2yws97 c1qporyx c1n5kit4 cb5io3 ${"mapbox"}`} />
<div
className={`w-element c1numhkq c1pit5s0 c3qgmhh ckbxne c1ale344 c1ckqd9i com5h1u ${"info_wrap"}`}>
<p
id={"searched_add"}
className={`w-element c1fhsgtb c1hic3qd cltlf0q cjl1vg1 c1r0cdvi`}>
{"12606 Hillmeade Station Dr, Bowie, MD 20720"}
</p>
<p
id={"calc"}
className={`w-element c1fhsgtb c1hic3qd cltlf0q cjl1vg1 c1r0cdvi`}>
{"1,581 ft"}
<sup
className={`w-element`}>
{"2"}
</sup>
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk c1nt8u3l czq6n9n c1jlg5gj c14xlkgz c1txodcv c11moyw2 c6lhjnb cojlapo`}>
<div
data-button={"prompt-2"}
className={`w-element c1numhkq c3auquk c1pit5s0 c3qgmhh c1txodcv cl4dpup c19hxin1 ${"prompt__buttons"}`}>
<button
id={"resetBtn"}
className={`w-element c1numhkq c1t07noa c1a06u5s c1diokdk ch3nxmx c123nk4a cgdwgpj cdfm6cp c68ft1t c1lzjd2w c144x14e c1hic3qd c1mndzy8 c61em0b cacmu18 c1ryk5rj c1787cam c13qspjq c1cqma02 c1jvw4nv c1yhof13 cjmfysa c1no8he2 cdubd0c cl4dpup`}>
{"Reset Polygon"}
</button>
<button
id={"continue"}
className={`w-element c1numhkq c1diokdk ch3nxmx corn16x c4nx8a8 c1f8ee6y c5este cut5nle ch7xx7z c8d36da cacmu18 c150bkmj ccqa9kw c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 c7kupny c1qp0l1p c7pwpdo cl4dpup`}>
{"Continue"}
</button>
</div>
<div
data-button={"prompt-1"}
className={`w-element c1numhkq c3auquk c1pit5s0 c3qgmhh c1txodcv cl4dpup c19hxin1 ${"prompt__buttons"}`}>
<button
id={"editBtn"}
className={`w-element c1numhkq c1t07noa c1a06u5s c1diokdk ch3nxmx c123nk4a cgdwgpj cdfm6cp c68ft1t c1lzjd2w c144x14e c1hic3qd c1mndzy8 c61em0b cacmu18 c1ryk5rj c1787cam c13qspjq c1cqma02 c1jvw4nv c1yhof13 cjmfysa c1no8he2 cdubd0c cl4dpup`}>
{"Adjust"}
</button>
<button
id={"proceed"}
className={`w-element c1numhkq c1diokdk ch3nxmx corn16x c4nx8a8 c1f8ee6y c5este cut5nle ch7xx7z c8d36da cacmu18 c150bkmj ccqa9kw c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 c7kupny c1qp0l1p c7pwpdo cl4dpup`}>
{"Yes, looks good"}
</button>
</div>
</div>
</div>
<HtmlEmbed
code={"<script>\ndocument.addEventListener('DOMContentLoaded', (event) => {\n$(\"[data-element='prompt-2']\").hide()\n$(\"[data-button='prompt-2']\").hide()\n\n$(\"#editBtn\").click(function () {\n    $(\"[data-element='prompt-1']\").hide()\n    $(\"[data-button='prompt-1']\").hide()\n    $(\"[data-button='prompt-2']\").show()\n    $(\"[data-element='prompt-2']\").show()\n})\n\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
data-element={"material-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c13g3obg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"material__wrap is--hidden"}`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt"}`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cjhli7i c15jf3ap c1ymq8p2 c1rjplas csp9rjz cunjrta cyw22sp c21pbot c5lgbye c1mj3xme`}>
<h2
className={`w-element cakyt4y c18bwt63 c1mndzy8`}>
{"Which material for your new roof?"}
</h2>
<p
className={`w-element c1hi1vvu c1hic3qd cjl1vg1 cltlf0q`}>
{"You can compare prices on the results page."}
</p>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c14if4po c1x44cjl cg0lu56 c1p0m755 c1epvuph czphx6q culr909 csgzb5o c6kdftu`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_d4fa60a6e6.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Address"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ch3nxmx c17s72gd cnbug7k cw6436c cxiuqxr`}>
<div
className={`w-element c1g2c0ij c1x5xbjr c1jewze7 c9slfh6 c9nw4u8 cnbug7k c1pmjbur c1knp2fb ccqa9kw c10iz0pl`} />
<div
className={`w-element c1g2c0ij c1eb7rwy c1jewze7 c9slfh6 c9nw4u8 cnbug7k c156ohex c1knp2fb ccqa9kw c10iz0pl`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_8756e34c1f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_06ffd00864.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
className={`w-element cgw13qo c1owcyig c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx`}>
<RemixForm
method={"post"}
id={"email-form"}
className={`w-element`}>
<div
className={`w-element`}>
<div
className={`w-element cmsm1bz cvgbedo c1r2z4fo c169xs8a c16d4u2h ch3nxmx c1diokdk cn1ywmu c1txodcv curgy1m c182kuy7 c1dqrbr9`}>
<label
htmlFor={"asphalt"}
id={"label-asphalt"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"Asphalt Shingle"}
id={"asphalt"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph csnds9c cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Asphalt Shingle"}
</span>
</label>
<label
htmlFor={"metal"}
id={"label-metal"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"Metal"}
id={"metal"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph ckm8etu cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Metal"}
</span>
</label>
<label
htmlFor={"flat"}
id={"label-flat"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"Flat"}
id={"flat"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph cpzejbj cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Flat"}
</span>
</label>
<label
htmlFor={"unsure"}
id={"label-unsure"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"Unsure / Standard"}
id={"unsure"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1j4pimd ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Unsure / Standard"}
</span>
</label>
<HtmlEmbed
code={"<style>\n.radio:checked + .radio-image,\n.radio:hover + .radio-image {\n  filter: brightness(100%);\n}\n</style>"}
className={`w-html-embed`} />
</div>
</div>
</RemixForm>
</div>
</div>
<div
data-element={"form-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri czvtnxg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"form__wrap is--hidden"}`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt"}`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cjhli7i c15jf3ap c1ymq8p2 c1rjplas csp9rjz cunjrta cyw22sp c21pbot c5lgbye c1mj3xme`}>
<h2
className={`w-element cakyt4y c18bwt63 c1mndzy8 ckecbya`}>
{"Has your roof experienced storm damage?"}
</h2>
</div>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c14if4po c1x44cjl cg0lu56 c1p0m755 c1epvuph czphx6q culr909 csgzb5o c6kdftu`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_d4fa60a6e6.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Address"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c53aqfr ch3nxmx c17s72gd cnbug7k cw6436c cxiuqxr`}>
<div
className={`w-element c1g2c0ij c1x5xbjr c1jewze7 c9slfh6 c9nw4u8 cnbug7k c1pmjbur c1knp2fb ccqa9kw c10iz0pl`} />
<div
className={`w-element c1g2c0ij c1eb7rwy c1jewze7 c9slfh6 c9nw4u8 cnbug7k c156ohex c1knp2fb ccqa9kw c10iz0pl`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_d4fa60a6e6.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_d4fa60a6e6.svg"}
width={24}
height={24}
alt={""}
data-icon={"filled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_8756e34c1f.svg"}
width={24}
height={24}
alt={""}
data-icon={"unfilled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 cvfl1ur`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<RemixForm
id={"wf-form-Storm-Damage"}
method={"post"}
className={`w-element c1numhkq c1a06u5s cjhli7i c15jf3ap`}>
<label
htmlFor={"Yes"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1lirukn c1wcfh9a c18235qm c2yws97 c1qporyx c1n5kit4 cb5io3 c1d7h9xn c150dn9r ckgfv3d c8zqfcg c15ykkd2 cicqioc c1l530lc c45y5sp cxqiud9 c1436p51 cqjnobk c3z3u4p`}>
<Input
type={"radio"}
id={"Yes"}
value={"Yes."}
name={"Damage"}
className={`w-element czm7dhe c1k7fq7j c1ryk5rj c1fe83lo c2x8fqk card98i c1h610f4 cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c1v2ieai cgtt3pl c16k3ajt cfrvdsv c19w3x37`} />
<span
className={`w-element c18twroo c1sakqqc cy60nkm c1w5tpv0`}>
{"Yes."}
</span>
</label>
<label
htmlFor={"I-m-not-sure"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1lirukn c1wcfh9a c18235qm c2yws97 c1qporyx c1n5kit4 cb5io3 c1d7h9xn c150dn9r ckgfv3d c8zqfcg c15ykkd2 cicqioc c1l530lc c45y5sp cxqiud9 c1436p51 cqjnobk c3z3u4p`}>
<Input
type={"radio"}
id={"I-m-not-sure"}
value={"I'm not sure."}
name={"Damage"}
className={`w-element czm7dhe c1k7fq7j c1ryk5rj c1fe83lo c2x8fqk card98i c1h610f4 cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c1v2ieai cgtt3pl c16k3ajt cfrvdsv c19w3x37`} />
<span
className={`w-element c18twroo c1sakqqc cy60nkm c1w5tpv0`}>
{"I'm not sure."}
</span>
</label>
</RemixForm>
<div
data-element={"insurance-wrap"}
className={`w-element c1lirukn c1wcfh9a c1ruoq79 c1tk8jsa ccr73r6 c6e9qen clfz32x ccaufd5 c1umnxkx cce8wht c1sb614n c1numhkq c1g4im4e c1wda1nk c12693l3 c142t5w6`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c1numhkq c1diokdk ch3nxmx c1a06u5s`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\">\n  <path d=\"M25 46L22 43L25 40L28 43L25 46ZM18.1 43L16 40.9L21.9 35L24 37.1L18.1 43ZM31 40L28 37L31 34L34 37L31 40ZM13 40L10 37L13 34L16 37L13 40ZM15 32C11.9667 32 9.375 30.925 7.225 28.775C5.075 26.625 4 24.0333 4 21C4 18.2333 4.91667 15.8167 6.75 13.75C8.58333 11.6833 10.85 10.4667 13.55 10.1C14.6167 8.2 16.075 6.70833 17.925 5.625C19.775 4.54167 21.8 4 24 4C27 4 29.6083 4.95833 31.825 6.875C34.0417 8.79167 35.3833 11.1833 35.85 14.05C38.15 14.25 40.0833 15.2 41.65 16.9C43.2167 18.6 44 20.6333 44 23C44 25.5 43.125 27.625 41.375 29.375C39.625 31.125 37.5 32 35 32H15ZM15 28H35C36.4 28 37.5833 27.5167 38.55 26.55C39.5167 25.5833 40 24.4 40 23C40 21.6 39.5167 20.4167 38.55 19.45C37.5833 18.4833 36.4 18 35 18H32V16C32 13.8 31.2167 11.9167 29.65 10.35C28.0833 8.78333 26.2 8 24 8C22.4 8 20.9417 8.43333 19.625 9.3C18.3083 10.1667 17.3167 11.3333 16.65 12.8L16.15 14H14.9C13 14.0667 11.375 14.775 10.025 16.125C8.675 17.475 8 19.1 8 21C8 22.9333 8.68333 24.5833 10.05 25.95C11.4167 27.3167 13.0667 28 15 28Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed crv3s27 c1p0m755 ciylvte c18oqc5x`} />
</div>
<p
className={`w-element c1gbsy9l c8d36da c115nxwc c1lwn44j c1fjww6l cs1ntyv c13v5fwq cubqgcw`}>
{"Your homeowners insurance may cover your roof replacement if your home has sustained damage within the past 2 years."}
</p>
</div>
<div
data-form={"damage-yes"}
className={`w-element cqbnnz9`}>
<h2
className={`w-element c1jyvd5g c1rxl3x cakyt4y c1mndzy8 c18bwt63 ckecbya c1cwbm0l cfxkkks c1ns9r0m cxyjskp cgjldxo`}>
{"Finish with your info and see price results instantly."}
</h2>
<RemixForm
id={"wf-form-Damage-Form-Yes"}
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element`}>
<div
className={`w-element c1numhkq c3auquk c13g3obg c1350r63 cl4dpup c1txodcv cyx0g81 cfbrk2z`}>
<Input
id={"name-yes"}
name={"Name"}
type={"text"}
placeholder={"Your name"}
required={true}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<Input
id={"phone-yes"}
name={"Phone"}
type={"tel"}
placeholder={"Phone"}
required={true}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<HtmlEmbed
code={"<input type=\"hidden\" name=\"Urgency\" value=\"ASAP\">"}
className={`w-html-embed`} />
<button
type={"submit"}
data-button={"submit-yes"}
className={`w-element c1ofez6z c9djrgv c18hkk31 c1jiyfml c1g3mhtg c1fhsgtb c8d36da c1lvj0n c1n4271i c1nmokvj c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn crv3s27 cvtl69h c1f445le c1ipiex8 c1554q0w cir68kq c1ef6u0e culorum cl4dpup`}>
{"SEE RESULTS NOW"}
</button>
</div>
</RemixForm>
</div>
<div
data-form={"damage-no"}
className={`w-element cqbnnz9`}>
<h2
className={`w-element c1jyvd5g c1rxl3x cakyt4y c1mndzy8 c18bwt63 ckecbya c1cwbm0l cfxkkks c1ns9r0m cxyjskp cgjldxo`}>
{"Finish with your info and see price results instantly."}
</h2>
<RemixForm
id={"wf-form-Damage-Form-Not-sure"}
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element`}>
<div
className={`w-element c1numhkq c3auquk c13g3obg c1350r63 cl4dpup c1txodcv cyx0g81 cfbrk2z`}>
<Input
id={"name-no"}
name={"Name"}
type={"text"}
placeholder={"Your name"}
required={true}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<Input
id={"phone-no"}
name={"Phone"}
type={"tel"}
placeholder={"Phone"}
required={true}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<HtmlEmbed
code={"<input type=\"hidden\" name=\"Urgency\" value=\"Month\">"}
className={`w-html-embed`} />
<button
type={"submit"}
data-button={"submit-no"}
className={`w-element c1ofez6z c9djrgv c18hkk31 c1jiyfml c1g3mhtg c1fhsgtb c8d36da c1lvj0n c1n4271i c1nmokvj c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn crv3s27 cvtl69h c1f445le c1ipiex8 c1554q0w cir68kq c1ef6u0e culorum cl4dpup`}>
{"SEE RESULTS NOW"}
</button>
</div>
</RemixForm>
</div>
<HtmlEmbed
code={"<script>\n\ndocument.addEventListener('DOMContentLoaded', (event) => {\n// Clear custom validity when the user starts to correct the input\n['phone-yes', 'phone-no'].forEach(fieldId => {\n    document.getElementById(fieldId).addEventListener('input', function() {\n        this.setCustomValidity('');\n    }); })\n$(\"[data-icon='filled']\").hide()\n$(\"[data-form='damage-yes']\").hide()\n$(\"[data-form='damage-no']\").hide()\n\n$('input[name=\"Damage\"]').click(function () {\n    if ($(this).val() === \"Yes.\") {\n        $(\"[data-form='damage-yes']\").show();\n        $(\"[data-element='insurance-wrap']\").hide();\n        $(\"[data-form='damage-no']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    } else {\n        $(\"[data-form='damage-no']\").show();\n        $(\"[data-element='insurance-wrap']\").hide();\n        $(\"[data-form='damage-yes']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    }\n});\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
data-element={"results-wrap"}
className={`w-element c1numhkq c1a06u5s c3auquk c1p0m755 c139pwc6 c1cunrri cidlv9n c14e2i27 c1rt95ji c5a8cr6 ciylvte c619udc ${"results__wrap is--hidden"}`}>
<div
className={`w-element c1o75pf5 cu3gno0`}>
<h2
className={`w-element c18v83wh ca98neh c1mndzy8 c1tdj1xa`}>
{"Your results are below!"}
</h2>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1pit5s0 c3qgmhh`}>
<div
className={`w-element ccaufd5 c1umnxkx cce8wht c1sb614n cgysc0l`}>
<div
className={`w-element c1numhkq c1kssyyd c3nuxyf cxlc9gr c15sicby c11q9q0a cddo8ff c1uemp3r ccaufd5 c1umnxkx c4ph8p6 cnods77 c1yt6hv7 cyyof5h c1t9puix c1qcj66c c1sw8x31 cles91e czr9sbv cu8qcns c4fmmfv cybbdyg cljixpu`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c1numhkq c1a06u5s c17rwy3n c1603wqb cy60nkm c1vgwqmx`}>
<p
className={`w-element c1gbsy9l`}>
{"Price range for "}
<span
id={"selected-opt"}
className={`w-element`}>
{"Asphalt Shingles"}
</span>
</p>
<p
className={`w-element c1gcrf2e cpdrt5z c1pjr8f`}>
{"$"}
<span
id={"lowPrice"}
className={`w-element`}>
{"7,200"}
</span>
{" "}
<span
className={`w-element c6q3qo8`}>
{"to"}
</span>
{" $"}
<span
id={"highPrice"}
className={`w-element`}>
{"12,400"}
</span>
</p>
</div>
<Accordion
collapsible={true}
value={"0"}
className={`w-accordion c1numhkq c1a06u5s c1pit5s0 c3qgmhh c53aqfr ch3nxmx c139pwc6`}>
<AccordionItem
data-ws-index="0"
className={`w-item c139pwc6 c1unpg90`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
data-question={"1"}
className={`w-item-trigger c1gbsy9l c18mkjfw c1vgwqmx cuselzj c1ezjj73 c1d7h9xn`}>
<Text
className={`w-text c1hwvjgs c1jqias8`}>
{"Why the range in price?"}
</Text>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
data-answer={"1"}
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1lx03va c1mndzy8 ${"AccordionContent"}`}>
<span
className={`w-element c1jkmits`}>
{"Aside from square footage, slope, and complexity of your roof, there are other price factors such as quality of materials, if your roofer is using all required materials, the type of warranty you are getting from the manufacturer, and if your roofer is a skilled or unskilled installer. "}
<Link
className={`w-element cacmu18 c1mndzy8 c1pjr8f`}>
{"Click here"}
</Link>
{" to get an exact quote from us, the team at Capitol Improvements. Quotes are Free and good for 12 Months."}
</span>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item c139pwc6 c1unpg90`}>
<AccordionHeader
className={`w-item-header`}>
<AccordionTrigger
data-question={"2"}
data-scroll-time={".5"}
className={`w-item-trigger c1gbsy9l c18mkjfw c1vgwqmx cuselzj c1ezjj73 c1d7h9xn`}>
<Text
className={`w-text c1hwvjgs c1jqias8`}>
{"How do I get an exact quote?"}
</Text>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
data-answer={"2"}
className={`w-item-content cn87dm8 c1uhhf7h c1gbsy9l c1lx03va c1mndzy8 ${"AccordionContent"}`}>
<span
className={`w-element c1jkmits`}>
{"One of our roofing experts here at Capitol Improvements needs to see your roof to give an exact quote. "}
<Link
className={`w-element cacmu18 c1pjr8f c1mndzy8`}>
{"Click here"}
</Link>
{" to schedule a free inspection with one of our roofing experts, here at Capitol Improvements. Quotes are Free and good for 12 Months."}
</span>
</AccordionContent>
</AccordionItem>
</Accordion>
</div>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1e3sjlf c16xjt02 c5zgd1 c1hd4o6l c11q9q0a cddo8ff czbonp3 cce8wht c1sb614n cnods77 c1yt6hv7 cu8qcns c4fmmfv`}>
<div
className={`w-element c1numhkq c1a06u5s cxh1pea cggbgh3`}>
<p
className={`w-element c1gbsy9l c1smf1ff cy60nkm c1vgwqmx`}>
{"Your monthly payment could be "}
<span
className={`w-element`}>
<b
className={`w-element`}>
{"$"}
</b>
</span>
<span
id={"lowestMonthly"}
className={`w-element`}>
{"99"}
</span>
{" to "}
<span
className={`w-element`}>
<b
className={`w-element`}>
{"$"}
</b>
</span>
<span
id={"highestMonthly"}
className={`w-element`}>
{"124"}
</span>
{"."}
</p>
<p
className={`w-element c1gbsy9l c1smf1ff cy60nkm c1vgwqmx`}>
{"Based on "}
<span
id={"apr"}
className={`w-element`}>
{"8.99"}
</span>
{"% APR for "}
<span
id={"months"}
className={`w-element`}>
{"144"}
</span>
{" months, no money down financing."}
</p>
<Link
href={"/financing"}
target={"_self"}
className={`w-element cy60nkm c1uaxhv2 c1jqias8 c1ezjj73 c1s18yzb c1l6xfy9 c1vgwqmx cahz6x0 cmchden`}>
{"Learn about 0% APR for 24 months"}
</Link>
</div>
</div>
</div>
<div
data-field={"second-form-block"}
className={`w-element c1numhkq c3auquk c1ibjhy0 c163g466 cn87dm8 c1uhhf7h clfz32x ccaufd5 c1umnxkx cce8wht c1sb614n c1txodcv c1qcj66c c1sw8x31 cd83qw7 cles91e czr9sbv cljixpu`}>
<div
className={`w-element c139pwc6 c17jzp58 c1numhkq culorum`}>
<Image
src={"https://v2.improveitmd.com/uploads/ci_storm_map_1_LAH_T_9a_H_Mr_FS_Ifafib_43e525db09.svg"}
width={320}
height={436}
alt={""}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a c1ul3kv9 c1gaefz7 c14qslfi`} />
</div>
<div
className={`w-element c1numhkq c53aqfr ch3nxmx c1a06u5s cc9ojx c1sjfwqi c12fmqv1 c139pwc6 c1s18yzb cbrwx7z cnods77 c107zzx5 c9nnh43 cu8qcns c4fmmfv`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cj1o4tp c1q4fbwg c55elb3 c9chho4`}>
<p
className={`w-element c4ijzwc ctp3e66 c1pjr8f c1mndzy8 c1vgwqmx c1icumtr`}>
{"Let’s find out if your home will qualify for a roof covered by insurance."}
</p>
<p
className={`w-element c1gbsy9l c1smf1ff c1ezjj73 cy60nkm c1vgwqmx`}>
{"Enter accurate information to schedule your free storm damage inspection."}
</p>
</div>
<div
data-field={"second-form-block"}
className={`w-element`}>
<RemixForm
id={"wf-form-second-form"}
data-field={"second-form"}
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element c1numhkq c1a06u5s`}>
<Input
id={"Name-3"}
name={"Name"}
placeholder={"Name"}
required={true}
type={"text"}
className={`w-element c1rbcgj0 cniq5v2 c15ai560 c1ch8bq c1x9vsvi c1gbsy9l c19x9ksz cy60nkm c1vgwqmx c9gf47x c1upa51b cg8y2lt ctvlq9m cwa1yh5 c1y8ksq2 c1fmjy5t c9x9jza c1d5w6j7 cry5m16 cjprnnz ccy7w4l c9lszw4 cd89h47 c1kreka c30x0kf c15rree9 cos8g46 c1bc2t9 chioh6o cmtckwo`} />
<Input
id={"Phone"}
name={"Phone"}
placeholder={"Phone"}
required={true}
type={"tel"}
className={`w-element c1rbcgj0 cniq5v2 c15ai560 c1ch8bq c1x9vsvi c1gbsy9l c19x9ksz cy60nkm c1vgwqmx c9gf47x c1upa51b cg8y2lt ctvlq9m cwa1yh5 c1y8ksq2 c1fmjy5t c9x9jza c1d5w6j7 cry5m16 cjprnnz ccy7w4l c9lszw4 cd89h47 c1kreka c30x0kf c15rree9 cos8g46 c1bc2t9 chioh6o cmtckwo`} />
<HtmlEmbed
code={"<input type=\"hidden\" value=\"\" id=\"second-form-id\" name=\"id\" data-field=\"id\" >"}
className={`w-html-embed`} />
<button
type={"submit"}
className={`w-element crv3s27 c1rbcgj0 cniq5v2 c1mndhrk c2j7e41 c1s18yzb cbrwx7z c1lvj0n c1o3a6u c1w9fs99 c1nmokvj c1d5w6j7 cry5m16 cjprnnz ccy7w4l c13qspjq c1cqma02 c1jvw4nv c1yhof13`}>
{"Schedule Free Inspection"}
</button>
</RemixForm>
</div>
</div>
</div>
<div
id={"quote"}
data-block={"2nd-form-success"}
className={`w-element c1numhkq c15kiuw7 c3auquk co72if5 c1sq4bmy c1fsqn2a c1uct8s0 c11q9q0a cddo8ff clfz32x ccaufd5 c1umnxkx cce8wht c1sb614n cnods77 c1yt6hv7 cu8qcns c4fmmfv cybbdyg cljixpu cj9he9d ${"is--hidden"}`}>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cj1o4tp c1q4fbwg`}>
<p
className={`w-element c4ijzwc ctp3e66 c1mndzy8 c1vgwqmx c1pjr8f c1icumtr`}>
{"We’ll check weather data to see if your roof could be covered by insurance."}
</p>
<p
className={`w-element c139pwc6 cb5ahwu c61em0b ch7xx7z c1d9r31b ckecbya c115nxwc`}>
{"Melinda will call you to schedule your exact price quote, and if storm data in your area is found, she’ll notify you to schedule a free storm damage inspection. We’ll be with you in every step of the process."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Have questions? Call us directly at "}
<Link
href={"tel:3017696909"}
target={"_blank"}
className={`w-element c1mndzy8`}>
{"301.769.6909"}
</Link>
</p>
</div>
<div
className={`w-element c18bj3o3 c1lq6pq8`}>
<Image
loading={"lazy"}
src={"https://v2.improveitmd.com/uploads/Vector_i_O_Xi_YD_Iao_B_Xz9_Wh9_Cj2_K_e1edb10d97.svg"}
width={60}
height={62}
alt={""}
className={`w-image c1sd6lnu c1hwvjgs cdmu5h7 czbu68a c1x1zhvf`} />
</div>
</div>
</div>
</div>
</Fragment_1>
</Slot>
</div>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1cv7vjb cisippn c1v5rwvs czgy4gb`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
<Link
href={"/roofing-cost-calculator#calc"}
target={"_blank"}
className={`w-element c9te4zd`} />
</section>
}
{(LocalPagesData?.data?.data?.services?.[0]?.residentialCalc && LocalPagesData?.data?.data?.services?.[0]?.projectConsultantName ? true : false) &&
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
{LocalPagesData?.data?.data?.services?.[0]?.buttonTextConsultantCta}
</Link>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg ce6x08i c1lg7bh9 ciylvte c18oqc5x c1exxhe2`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectConsultant1Image?.url}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
{(LocalPagesData?.data?.data?.services?.[0]?.projectConsultant2Image ? true : false) &&
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectConsultant2Image?.url}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
}
<div
className={`w-element c1numhkq c1a06u5s cw8j8n1`}>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
{LocalPagesData?.data?.data?.services?.[0]?.projectConsultantName}
</p>
<p
className={`w-element`}>
{LocalPagesData?.data?.data?.services?.[0]?.projectConsultantTitle}
</p>
<p
className={`w-element c1a4drig`}>
{"🤝 Here to Serve, Not to Sell"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
}
<div
id={"financing"}
className={`w-element c185jzsb cc29gav c5fy17v cf16085 c2ifgan c19xkq3v c1siv9z0`}>
<Slot>
<section
className={`w-element c1n0v2ht`}>
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
{"Financing made easy."}
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
src={"https://v2.improveitmd.com/uploads/video_thumbnail_img_jica_ILCYK_2_M1f_BB_2_Cw_Kg9_7b3e36d901.webp"}
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
</Slot>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn czgy4gb`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<div
id={"owners-served"}
className={`w-element cvfl1ur c1numhkq c1a06u5s c1ywbwet c1krf5e c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c17crvds c1czy0yv c139pwc6 c1a06u5s c1ab5oob cnikeys c10k3jam cn0qaoo c1eprd4c c13g3obg`}>
<div
className={`w-element c1numhkq c53aqfr c3auquk co72if5 c1sq4bmy c139pwc6 c1owcyig c1a06u5s cip7j3i c1txodcv c1tnetov c6ca0h crn8utr c1huz57e c1bhqxx9 c4ph8p6 c1fy1qpm`}>
<div
className={`w-element c1numhkq c1a06u5s ckjs5zd cmvloo2 c5rv8xx c13g3obg cyyof5h c1t9puix cafizek cjwhuc`}>
<div
id={"clients-we-served"}
className={`w-element`}>
<HtmlEmbed
executeScriptOnCanvas={true}
code={"<style>\n/* ── Pasadena Pins Section ── */\n.pins__section, .pins_section {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 2.5rem;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n/* Left column – text */\n.pins__content, .pinscontent {\n  width: 45%;\n}\n\n.pins__content h2, .pinscontent h2 {\n  margin-top: 0;\n}\n\n/* Right column – map */\n.pins__map-wrapper, .pinsmap-wrapper {\n  width: 55%;\n}\n\n/* Responsive iframe container (keeps 4:3 ratio) */\n.pins__map-embed, .pins_map-embed {\n  position: relative;\n  width: 100%;\n  padding-bottom: 75%;\n  height: 0;\n  overflow: hidden;\n}\n\n.pins__map-embed iframe, .pins_map-embed iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n\n/* ── Mobile only (phones, NOT iPad) ── */\n@media (max-width: 991px) {\n  .pins__section, .pins_section {\n    flex-direction: column;\n    text-align: center;\n  }\n\n  .pins__map-wrapper, .pinsmap-wrapper {\n    width: 100%;\n  }\n\n  .pins__content, .pinscontent {\n    width: 100%;\n  }\n}\n  </style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n  .pins_btm-section {\n    text-align: center;\n  }\n  .pins_list {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    padding: 0.5rem 0rem;\n  }\n  \n  .pins_item {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0.5rem 1rem;\n    border: 0.08rem solid var(--white-smoke);\n    border-radius: 50vw;\n    gap: 0.5rem;\n  }\n  \n  .pins_item img {\n    width: 1rem;\n    aspect-ratio: 1;\n    object-fit: contain;\n    flex-shrink: 0;\n    flex-grow: 0;\n  }\n\n  .pins_tagline {\n    font-size: 1.25rem;\n    line-height: 1;\n    text-transform: uppercase;\n    font-weight: 600;\n    letter-spacing: 0.02em;\n    padding-bottom: 1rem;\n    padding-top: 2rem;\n  }\n\n  .pins_text {\n    font-size: 1.25rem;\n    padding-bottom: 2.5rem;\n    text-wrap: pretty;\n  }\n\n  @media screen and (max-width: 767px) {\n    .pins_text {\n      font-size: 1.125rem;\n      padding-bottom: 1.5rem;\n    }\n    .pins_tagline {\n      font-size: 1.125rem;\n    }\n    .pins_item {\n      font-size: 0.875rem;\n      padding: 0.5rem 0.75rem;\n    }\n    .pins_item img {\n      width: 0.875rem;\n    }\n  }\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.mapSection}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1tm0t1i c1ib9ypd cja62bv c1mn90qt cto9k25 cjtn485 cef43o0 c56odag c1hqutl1 cjx1ika c1xpbze2 clu1n36 c1stgdk8 c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz c153cwae cvg0xz4 cnwe5rt c1g0q2tv c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn ch6vhru c1qmiivc c1oh1ckg c1tfgo8d c4hp6bu cvahi2z chfjkpk c1dqk3pb`}>
</HtmlEmbed>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 cl4dpup c1siv9z0`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText) &&
<div
id={"inspection"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.inspectionRichText}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1diokdk ct0qrmw c1p4xat6 c1tm0t1i c1ib9ypd cja62bv cyl4kdh c11g9vlk caymbcs c1ggzxqz c56odag c1hqutl1 cjx1ika c1xpbze2 cmzxqq1 c1hmuqnq c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz czf048v cqm3vtw cnwe5rt`}>
</HtmlEmbed>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 c1siv9z0 cbnzrl8`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapSection ? true : false) &&
<div
id={"office"}
className={`w-element cvfl1ur c1numhkq c1a06u5s c1ywbwet c1krf5e c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx c17crvds c1czy0yv c139pwc6 c1a06u5s c1ab5oob cnikeys c10k3jam cn0qaoo c1eprd4c c13g3obg`}>
<div
className={`w-element c1numhkq c1diokdk c3auquk co72if5 c1sq4bmy ct3lduy c9tjkc5 c139pwc6 c1owcyig c5p4jmz cxlc9gr c15sicby c1txodcv c1bhqxx9 c4ph8p6 c1fy1qpm c1mx5icy`}>
<div
className={`w-element c1numhkq c1a06u5s c5rv8xx cz1fvrn chkf5md c1fnzz6a c13g3obg`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.locationContactDetails}
clientOnly={true}
className={`w-html-embed c1osufuw c4ph8p6 c1tm0t1i c1ib9ypd cja62bv cyl4kdh c1arayfx c56odag c1hqutl1 cjx1ika c1xpbze2 c1c9efyk c1stgdk8 c8qrtxl c1sl5awa cpmri50 c1dclps4 cceb48 c153cwae cvg0xz4 ccie6uv cpuxt6d c18xm0jy c1g0q2tv c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn ch6vhru c1qmiivc c1oh1ckg c1tfgo8d c4hp6bu cvahi2z chfjkpk c1dqk3pb`}>
</HtmlEmbed>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.mapLocation ? true : false) &&
<div
className={`w-element c1uclgp3 c1p0m755 cw8j8n1 cyovuht`}>
<div
className={`w-element ${"google-maps"}`}>
{(LocalPagesData?.data?.data?.services?.[0]?.mapLocation === "Bowie" ? true : false) &&
<HtmlEmbed
code={"<style>\n  .google-maps {\n    position: relative;\n    padding-bottom: 75%;\n    height: 0;\n    overflow: hidden;\n  }\n  .google-maps iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    height: 100% !important;\n  }\n</style>\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99244.08605965743!2d-76.93804442882538!3d38.98387565313168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7e986ccef8cc1%3A0x8e7de710ab0c45a4!2sCapitol%20Improvements%20-%20Roofing%20Company%20%26%20Siding%20Contractor!5e0!3m2!1sen!2s!4v1771944493852!5m2!1sen!2s\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"}
clientOnly={true}
className={`w-html-embed crv3s27`} />
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapLocation === "Gaithersburg" ? true : false) &&
<HtmlEmbed
code={"<style>\n  .google-maps {\n    position: relative;\n    padding-bottom: 75%;\n    height: 0;\n    overflow: hidden;\n  }\n  .google-maps iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    height: 100% !important;\n  }\n</style>\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d98935.79699754386!2d-77.17569438224847!3d39.20327315711973!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7d565ce980233%3A0x47fe7af6b303633!2sCapitol%20Improvements%20-%20Gaithersburg%20Roofing%20Company%20%26%20Siding%20Contractors!5e0!3m2!1sen!2s!4v1771944609163!5m2!1sen!2s\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"}
clientOnly={true}
className={`w-html-embed crv3s27`} />
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapLocation === "Pasadena" ? true : false) &&
<HtmlEmbed
code={"<style>\n  .google-maps {\n    position: relative;\n    padding-bottom: 75%;\n    height: 0;\n    overflow: hidden;\n  }\n  .google-maps iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    height: 100% !important;\n  }\n</style>\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d776.2282323676271!2d-77.03522886248693!3d38.90310638681177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fb093fa9700f%3A0x8f89d2826cf3ecc4!2sCapitol%20Improvements%20Washington%20DC%20-%20Roofing%20%7C%20Siding%20%7C%20Doors!5e0!3m2!1sen!2s!4v1771944704788!5m2!1sen!2s\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"}
clientOnly={true}
className={`w-html-embed crv3s27`} />
}
{(LocalPagesData?.data?.data?.services?.[0]?.mapLocation === "Crownsville" ? true : false) &&
<HtmlEmbed
code={"<style>\n  .google-maps {\n    position: relative;\n    padding-bottom: 75%;\n    height: 0;\n    overflow: hidden;\n  }\n  .google-maps iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100% !important;\n    height: 100% !important;\n  }\n</style>\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d211029.49566401!2d-77.9271834!3d34.2654865!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fbef4083e96d%3A0xe4e49bdfc9f3e338!2sCAPITOL%20-%20Windows%20%26%20Doors%20%7C%20Roofing%20%7C%20Siding!5e0!3m2!1sen!2s!4v1771944764766!5m2!1sen!2s\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"}
clientOnly={true}
className={`w-html-embed crv3s27`} />
}
</div>
</div>
}
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 c1siv9z0 cl4dpup`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
</div>
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.tableRichText && LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
id={"warranty"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c1a06u5s c17crvds c1czy0yv`}>
{(LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element cw8j8n1 c1t4o1ie cu3gno0 cha1kui`}>
<HtmlEmbed
code={"<style>\n  .gaf-table-wrapper {\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n.gaf-wrapper {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: white;\n  background-color: #d10202;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 2rem;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n\n.gaf-logo {\n  border: 3px solid white;\n  padding: 1rem 0.5rem;\n  font-size: 2rem;\n}\n\n.gaf-table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.gaf-table td {\n  border: 1px solid black;\n}\n\n.gaf-table thead {\n  background-color: lightgrey;\n  border: 1px solid lightgrey;\n}\n\n.gaf-table th {\n  padding: 0.5rem;\n}\n\n.gaf-table th img {\n  width: 7rem;\n  height: 7rem;\n  object-fit: contain;\n  display: inline;\n}\n\n.gaf-header {\n  font-size: 1.125rem;\n  line-height: 1.1;\n  font-weight: 700;\n  text-align: left;\n  padding: 1rem 0.5rem;\n}\n\n.header-subtext {\n  font-size: 0.75rem;\n  font-weight: 400;\n  margin-top: 0.25rem;\n}\n\n.gaf-subheader {\n  font-size: 0.9375rem;\n  font-weight: 500;\n  padding: 1rem 0.5rem;\n}\n\n.system-cell, .silver-cell, .golden-cell {\n  font-size: 0.875rem;\n  padding: 1rem 0.5rem;\n  font-weight: 400;\n  text-align: center;\n}\n\n.system-cell, .golden-cell {\n  background-color: #f5f7fa;\n}\n\n.system-cell {\n  color: #022170;\n}\n\n.silver-cell {\n  color: grey;\n}\n\n.golden-cell {\n  color: #998c28;\n}\n\n.table-data-subtext {\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  color: #666;\n}\n\n.gaf-span {\n  font-size: 0.875rem;\n  padding: 1rem 0.5rem;\n  font-weight: 400;\n  text-align: center;\n}\n\n.gaf-header.is-download {\n  text-align: center;\n}\n\n.gaf-button {\n  font-size: 1rem;\n  text-decoration: underline;\n  color: inherit;\n}\n\n.gaf-points-wrapper {\n  font-size: 0.75rem;\n  line-height: 1.6;\n  padding: 1rem;\n  color: #666;\n}\n\n\n@media screen and (max-width: 767px) {\n  .gaf-wrapper {\n    padding: 1.5rem 1rem;\n    font-size: 1.25rem;\n    gap: 1rem;\n    flex-direction: column;\n  }\n  \n  .gaf-logo {\n    font-size: 1.5rem;\n    padding: 0.75rem 0.5rem;\n  }\n  \n  .gaf-table th img {\n    width: 3.5rem;\n    height: 3.5rem;\n  }\n  \n  .gaf-header {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  \n  .gaf-subheader {\n    font-size: 0.7rem;\n    padding: 0.5rem 0.25rem;\n  }\n  \n  .system-cell, .silver-cell, .golden-cell {\n    font-size: 0.7rem;\n    padding: 0.5rem 0.25rem;\n  }\n  \n  .table-data-subtext {\n    font-size: 0.6rem;\n  }\n  \n  .gaf-span {\n    font-size: 0.7rem;\n    padding: 0.5rem 0.25rem;\n  }\n  \n  .gaf-points-wrapper {\n    font-size: 0.65rem;\n    padding: 0.75rem;\n  }\n  \n  .gaf-table th {\n    padding: 0.25rem;\n  }\n  \n  .gaf-button {\n    font-size: 0.85rem;\n  }\n}\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<div
className={`w-element ${"gaf-wrapper"}`}>
<div
className={`w-element ${"gaf-logo"}`}>
{"GAF"}
</div>
<h2
className={`w-element`}>
{"Warranty Comparison Guide"}
</h2>
</div>
<div
className={`w-element ${"gaf-table-wrapper"}`}>
<table
className={`w-element ${"gaf-table"}`}>
<thead
className={`w-element`}>
<tr
className={`w-element`}>
<th
className={`w-element`} />
<th
className={`w-element`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1771257650_GAF_Logo_Brand_Symbol_PNG_ztffy2_7dd1310bae.webp"}
alt={"system plus limited warranty"}
loading={"lazy"}
className={`w-image`} />
</th>
<th
className={`w-element`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1771257650_GAF_Logo_Distinctive_Design_PNG_laplle_1bd4713523.webp"}
alt={"silver pledge limited warranty"}
loading={"lazy"}
className={`w-image`} />
</th>
<th
className={`w-element`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1771257651_GAF_Logo_Design_Element_PNG_ushtwa_ad54e6bc53.webp"}
alt={"golden pledge limited warranty"}
loading={"lazy"}
className={`w-image`} />
</th>
</tr>
</thead>
<tbody
className={`w-element`}>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Who can install?"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"Certified, Certified Plus™, and Master Elite® Contractors*"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
{"Certified Plus™ and Master Elite® Contractors*"}
</td>
<td
className={`w-element ${"golden-cell"}`}>
{"Master Elite® Contractors*"}
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"GAF Lifetime† Shingles Warranty Term"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"Lifetime†"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
{"Lifetime†"}
</td>
<td
className={`w-element ${"golden-cell"}`}>
{"Lifetime†"}
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"GAF Accessories† Warranty Term"}
</td>
<td
className={`w-element ${"system-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 years)"}
</div>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 years)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 years)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Up-front Coverage Period§"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"50 yrs."}
</td>
<td
className={`w-element ${"silver-cell"}`}>
{"50 yrs."}
</td>
<td
className={`w-element ${"golden-cell"}`}>
{"50 yrs."}
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Covers Roofing System?"}
</td>
<td
className={`w-element ${"system-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(All GAF products)"}
</div>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(All GAF products)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(All GAF products)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Cost of Installation Labor Included?"}
</td>
<td
className={`w-element ${"system-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 yrs.)"}
</div>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 yrs.)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Lifetime†"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Prorated after 50 yrs.)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Misapplication of GAF Shingles and Accessories?"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"No**"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"10 yrs."}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Coverage provided and backed by GAF)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"25/30 yrs."}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Coverage provided and backed by GAF)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Misapplication of Covered Flashings?"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"No**"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"10 yrs."}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Coverage provided and backed by GAF)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"25/30 yrs."}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(Coverage provided and backed by GAF)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Disposal Costs Included? (When necessary)"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"No"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(If necessary for covered claim)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(If necessary for covered claim)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Tear-off Costs Included? (When necessary)"}
</td>
<td
className={`w-element ${"system-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(If necessary for covered claim)"}
</div>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(If necessary for covered claim)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(If necessary for covered claim)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Warranty Transferable for Free?†"}
</td>
<td
className={`w-element ${"system-cell"}`}>
{"Yes"}
</td>
<td
className={`w-element ${"silver-cell"}`}>
{"Yes"}
</td>
<td
className={`w-element ${"golden-cell"}`}>
{"Yes"}
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
<span
className={`w-element`}>
{"Good Housekeeping Protection on Roofing System? "}
</span>
</td>
<td
className={`w-element ${"system-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(U.S. Only)"}
</div>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(U.S. Only)"}
</div>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<span
className={`w-element`}>
{"Yes"}
</span>
<br
className={`w-element`} />
<div
className={`w-element ${"table-data-subtext"}`}>
{"(U.S. Only)"}
</div>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Algae Protection"}
</td>
<td
colSpan={3}
className={`w-element ${"gaf-span"}`}>
<span
className={`w-element`}>
{"Contractors certified by GAF can offer you a 30-Year StainGuard Plus PRO™ or 25-Year StainGuard Plus™ Algae Protection Limited Warranty†† with 15-year Non-Prorated Smart Choice® Protection (vs. typical 10-year Smart Choice® Protection Period). ‡‡"}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" Coverage only available on appropriately labeled products."}
</span>
</td>
</tr>
<tr
className={`w-element`}>
<td
className={`w-element ${"gaf-subheader"}`}>
{"Sample Warranty"}
</td>
<td
className={`w-element ${"system-cell"}`}>
<Link
href={"https://www.gaf.com/en-us/document-library/documents/warranties/gaf-system-plus-limited-warranty-reswt162-legal-sample.pdf"}
target={"_blank"}
className={`w-element ${"gaf-button"}`}>
{"Download"}
</Link>
</td>
<td
className={`w-element ${"silver-cell"}`}>
<Link
href={"https://www.gaf.com/en-us/document-library/documents/warranties/gaf-silver-pledge-limited-warranty-reswt210-legal-sample.pdf"}
target={"_blank"}
className={`w-element ${"gaf-button"}`}>
{"Download"}
</Link>
</td>
<td
className={`w-element ${"golden-cell"}`}>
<Link
href={"https://www.gaf.com/en-us/document-library/documents/warranties/golden-pledge-limited-warranty-legal-sample-reswt161l.pdf"}
target={"_blank"}
className={`w-element ${"gaf-button"}`}>
{"Download"}
</Link>
</td>
</tr>
</tbody>
</table>
</div>
<div
className={`w-element ${"gaf-points-wrapper"}`}>
<span
className={`w-element`}>
{"* Contractors enrolled in GAF certification programs are not employees or agents of GAF, and GAF does not control or otherwise supervise these independent businesses. Contractors may receive benefits, such as loyalty rewards points and discounts on marketing tools from GAF for participating in the program and offering GAF enhanced warranties, which require the use of a minimum amount of GAF products. Your dealings with a Contractor, and any services they provide to you, are subject to the Contractor Terms of Use. Visit gaf.com/gaf-contractor-terms-of-use for details."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" † See applicable warranty for complete coverage and restrictions. The word “Lifetime” refers to the length of coverage provided by the GAF Shingle & Accessory Limited Warranty, GAF Roofing System Limited Warranty, System Plus Limited Warranty, Silver Pledge™ Limited Warranty, or Golden Pledge® Limited Warranty as applicable, and means as long as the original individual owner(s) of a single-family detached residence [or eligible second owner(s)] owns the property where the qualifying GAF products are installed. For owners/structures not meeting the above criteria, Lifetime coverage is not applicable. Lifetime coverage on shingles requires the use of GAF Lifetime shingles only. See the GAF Shingle & Accessory Limited Warranty for complete coverage and restrictions. Visit gaf.com/LRS for qualifying GAF products. Lifetime coverage on shingles and accessories requires the use of any GAF Lifetime shingle and at least 3 qualifying GAF accessories. See the GAF Roofing System Limited Warranty for complete coverage and restrictions. For installations not eligible for the GAF Roofing System Limited Warranty, see the GAF Shingle & Accessory Limited Warranty. Visit gaf.com/LRS for qualifying GAF products."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" ‡ When installed with Lifetime shingles in the field of the roof; Otherwise coverage term is 25 years."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" §Up-Front Coverage Period refers to the crucial period of time following installation of the GAF Products during which the coverage provided for in this limited warranty is non-prorated. After the Smart Choice® Protection Period specified above, the remedy provided for in this warranty may be different than that provided for during the Smart Choice® Protection Period, and any remedy will be reduced to reflect the use you have received from your GAF Products."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" ** Some limited workmanship coverage may be available through your contractor."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" †† 25-year StainGuard Plus™ Algae Protection Limited Warranty and 30-year StainGuard Plus PRO™ Algae Protection Limited Warranty against blue-green algae discoloration is available only on products sold in packages bearing the StainGuard Plus™ or StainGuard Plus PRO™ logo. See GAF Shingle & Accessory Limited Warranty for complete coverage and restrictions, and qualifying products."}
</span>
<br
className={`w-element`} />
<span
className={`w-element`}>
{" ‡‡ 15-year Smart Choice® Protection Period for StainGuard Plus™ Algae Protection Limited Warranty and StainGuard Plus PRO™ Algae Protection Limited Warranty only available through GAF certified contractors in connection with an enhanced warranty. See System Plus, Silver Pledge™ or Golden Pledge® Limited Warranty for complete coverage and restrictions, and qualifying products."}
</span>
</div>
</div>
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.tableRichText && LocalPagesData?.data?.data?.services?.[0]?.serviceType === "roofing") &&
<div
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.tableRichText}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1diokdk ct0qrmw c1p4xat6 c1tm0t1i c1ib9ypd cja62bv cyl4kdh c1jug6p4 caymbcs c1ggzxqz c56odag c1hqutl1 cjx1ika c1xpbze2 c1c9efyk c1hmuqnq c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz czf048v cqm3vtw cnwe5rt`}>
</HtmlEmbed>
</div>
}
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cl4dpup`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.mainStoryRichText ? true : false) &&
<div
id={"case-study-2"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c1a06u5s c1i2t266 c1w4abcz cj1xwpe cpdrg3g c17crvds c1czy0yv c1epvuph c1qimg6p cip7j3i c13d76g4 c1fy1qpm c1rxa3re c147y3ls c2p0cuk`}>
<div
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.mainStoryRichText}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1tm0t1i c1ib9ypd cja62bv c3ltsqc c9je6mn c56odag c1hqutl1 cjx1ika c1xpbze2 c157qrpw c1stgdk8 c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz cqm3vtw c9n0pka cnwe5rt cwt2ut7 crv95h5 c6l8mg0 cewzneq c1ysbvmi c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn c1lm8j52 c1oh1ckg c1tfgo8d c4hp6bu c1oy6yi c1ch996j`}>
</HtmlEmbed>
{(LocalPagesData?.data?.data?.services?.[0]?.galleryMultiImages ? true : false) &&
<div
className={`w-element cmsm1bz c1pit5s0 c3qgmhh c1omlw60 cdr1ysj c1txodcv curgy1m c7zt1vs c1oig250 c10bzxv`}>
{Object.entries(
  // @ts-ignore
  LocalPagesData?.data?.data?.services?.[0]?.galleryMultiImages ?? {}
).map(([_key, galleryMultiCollectionItem]: any) => {
  const index = Array.isArray(LocalPagesData?.data?.data?.services?.[0]?.galleryMultiImages) ? Number(_key) : _key;
  return (
<Fragment key={index}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + galleryMultiCollectionItem?.url}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a ckijpy8 c5wc26g`} />
</Fragment>
)
})
}
</div>
}
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cl4dpup cekmvq0 c1siv9z0`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
{(LocalPagesData?.data?.data?.services?.[0]?.secondaryStoryRichText ? true : false) &&
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c1a06u5s c1i2t266 c1w4abcz cj1xwpe cpdrg3g c17crvds c1czy0yv c1epvuph c1qimg6p cip7j3i c13d76g4 c1fy1qpm c1rxa3re c147y3ls c2p0cuk`}>
<div
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.secondaryStoryRichText}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1t8xhs1 c1tm0t1i c1ib9ypd cja62bv c3ltsqc c9je6mn c56odag c1hqutl1 cjx1ika c1fru7rn c157qrpw c1stgdk8 c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz cqm3vtw cnwe5rt c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn c1d6mxg3 c1lm8j52 cnhfllf chjdpw9 c1oh1ckg c1tfgo8d c4hp6bu c1oy6yi c1ch996j`}>
</HtmlEmbed>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa ci9ixvi c1f3bifo c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed`} />
</Link>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.supportingTextRichText ? true : false) &&
<div
className={`w-element c1numhkq c15kiuw7 c3auquk c1a06u5s c1i2t266 c1w4abcz cj1xwpe cpdrg3g c17crvds c1czy0yv c1epvuph c1qimg6p cip7j3i c13d76g4 c1fy1qpm c1rxa3re c147y3ls c2p0cuk`}>
<div
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.supportingTextRichText}
clientOnly={true}
className={`w-html-embed c1numhkq c1a06u5s c1t8xhs1 c1tm0t1i c1ib9ypd cja62bv c3ltsqc c9je6mn c56odag c1hqutl1 cjx1ika c1fru7rn c157qrpw c1stgdk8 c8qrtxl c1sl5awa cbddvez cp277i2 cgqh2e c1tb6avz cqm3vtw cnwe5rt c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn c1oh1ckg c1tfgo8d c4hp6bu c1oy6yi c1ch996j`}>
</HtmlEmbed>
</div>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa ci9ixvi c1f3bifo c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed`} />
</Link>
</div>
}
</div>
</div>
</div>
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.weatherWidget) &&
<section
id={"weather"}
className={`w-element cvfl1ur c2ifgan`}>
<HtmlEmbed
code={"<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css\">\n\n"}
clientOnly={true}
className={`w-html-embed`} />
{(true
) &&
<HtmlEmbed
code={"<style>\n\n.swiper-wrapper.is-weather {\n  max-width: 200px;\n}\n  \n.swiper-slide.is--weather {\n  max-width: 10.875rem;\n  margin-right: 0.875rem;\n}\n  \n.weather_card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.125rem 1.125rem 1.25rem;\n  background-color: white;\n  border-radius: 0.25rem;\n  border: 1px solid var(--white-smoke);\n  line-height: 1;\n}\n\n.weather_card-top {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.text-weight-semibold {\n  font-weight: 400;\n}\n\n.text-style-allcaps {\n  text-transform: uppercase;\n}\n\n.weather_rain-wrap {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.weather_rain-logo {\n  width: 0.625rem;\n  height: 0.625rem;\n  object-fit: contain;\n}\n\n.text-weight-medium {\n  font-weight: 500;\n}\n\n.text-size-tiny {\n  font-size: 0.75rem;\n}\n\n.weather_card-image {\n  width: 6.125rem;\n  height: 6.125rem;\n  object-fit: cover;\n}\n\n.weather_card-bottom {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.weather_card-bottom-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.text-size-xxmedium {\n  font-weight: 500;\n  font-size: 1.375rem;\n  letter-spacing: -0.44px;\n}\n\n.text-color-light-grey-4 {\n  color: var(--light-grey-4);\n}\n\n.text-size-small {\n  font-size: 0.875rem;\n}\n\n.letter-spacing-4 {\n  letter-spacing: 0.04em;\n}\n\n  \n.weather_card {\n  position: relative;\n  transform-style: preserve-3d;\n}\n\n  \n.weather_widget_loader {\n    border-bottom-color: transparent;\n    animation: rotation 1s linear infinite;\n    }\n\n    @keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n    } \n\n  \n html { font-size: 1rem; }\n  @media screen and (max-width:1458px) { html { font-size: calc(0.4146145610278373rem + 0.6423982869379015vw); } }\n  @media screen and (max-width:991px) { html { font-size: 1rem; } }\n  @media screen and (max-width:479px) { html { font-size: 1rem; } }\n\n  .text-size-tiny {\n  \tfont-size: 12px !important;\n  }\n  \n  .weather_info-wrap, .text-size-small {\n  \tfont-size: 14px !important;\n  }\n  \n  .weather_rain-logo {\n  \twidth: 10px;\n    height: 10px;\n  }\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.weatherWidget) &&
<HtmlEmbed
code={"<style>\n\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.weatherWidget) &&
<HtmlEmbed
code={"<style>\n\n.swiper-wrapper.is-weather {\n  max-width: 200px;\n}\n  \n.swiper-slide.is--weather {\n  max-width: 10.875rem;\n  margin-right: 0.875rem;\n}\n  \n.weather_card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.125rem 1.125rem 1.25rem;\n  background-color: white;\n  border-radius: 0.25rem;\n  border: 1px solid var(--white-smoke);\n  line-height: 1;\n}\n\n.weather_card-top {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.text-weight-semibold {\n  font-weight: 400;\n}\n\n.text-style-allcaps {\n  text-transform: uppercase;\n}\n\n.weather_rain-wrap {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.weather_rain-logo {\n  width: 0.625rem;\n  height: 0.625rem;\n  object-fit: contain;\n}\n\n.text-weight-medium {\n  font-weight: 500;\n}\n\n.text-size-tiny {\n  font-size: 0.75rem;\n}\n\n.weather_card-image {\n  width: 6.125rem;\n  height: 6.125rem;\n  object-fit: cover;\n}\n\n.weather_card-bottom {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.weather_card-bottom-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: start;\n}\n\n.text-size-xxmedium {\n  font-weight: 500;\n  font-size: 1.375rem;\n  letter-spacing: -0.44px;\n}\n\n.text-color-light-grey-4 {\n  color: var(--light-grey-4);\n}\n\n.text-size-small {\n  font-size: 0.875rem;\n}\n\n.letter-spacing-4 {\n  letter-spacing: 0.04em;\n}\n\n  \n.weather_card {\n  position: relative;\n  transform-style: preserve-3d;\n}\n\n  \n.weather_widget_loader {\n    border-bottom-color: transparent;\n    animation: rotation 1s linear infinite;\n    }\n\n    @keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n    } \n\n  \n html { font-size: 1rem; }\n  @media screen and (max-width:1458px) { html { font-size: calc(0.4146145610278373rem + 0.6423982869379015vw); } }\n  @media screen and (max-width:991px) { html { font-size: 1rem; } }\n  @media screen and (max-width:479px) { html { font-size: 1rem; } }\n\n  .text-size-tiny {\n  \tfont-size: 12px !important;\n  }\n  \n  .weather_info-wrap, .text-size-small {\n  \tfont-size: 14px !important;\n  }\n  \n  .weather_rain-logo {\n  \twidth: 10px;\n    height: 10px;\n  }\n</style>"}
clientOnly={true}
className={`w-html-embed`} />
}
{(!!LocalPagesData?.data?.data?.services?.[0]?.weatherWidget) &&
<div
className={`w-element c4vc9qx c9tjkc5 c160jcl9 c258kff c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 cyqy40m c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 c1ywbwet c1krf5e c4vc9qx c9tjkc5 cpb747a c9w70qr c1slj1sw c51lxbl cvfl1ur c4ph8p6 cvrapzf c1gq5osj cufdnsv cjq2hl6 c1sah678`}>
<div
className={`w-element c1numhkq c1a06u5s ci47oyq cq9q6h0 c1whwcqd c139pwc6 csimcn0 c123c5vo c1ab5oob cnikeys c10k3jam cn0qaoo c1kssyyd c3nuxyf c258kff c1l4lw7o c5rv8xx czyae1i c19xkq3v c1hce33d c1oxe5xw c1t8xhs1 cuwoxsi c1t4xpm1 c13g3obg`}>
<div
className={`w-element c1numhkq c3auquk c15kiuw7 co72if5 c1sq4bmy c18mkjfw cgsbbz0 cq9r5tw ci18zyn c1350r63`}>
<p
input-location={"city-county"}
className={`w-element c11e10p2 cxfmh1z c61em0b`}>
{LocalPagesData?.data?.data?.services?.[0]?.weatherWidgetLocationText}
</p>
<div
custom-alert={"alert-wrap"}
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 ckdtkkn c16j9hpi c15juhpz c1dv1s7b c1g3mhtg c1gbsy9l c1ixax5u c11qcg9b c1ab5oob cnikeys c10k3jam cn0qaoo cqg76kr ${"weather_info-wrap"}`}>
<HtmlEmbed
code={"<svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.666672 13.5L8.00001 0.833344L15.3333 13.5H0.666672ZM2.96667 12.1667H13.0333L8.00001 3.50001L2.96667 12.1667ZM8.00001 11.5C8.18889 11.5 8.34723 11.4361 8.47501 11.3083C8.60278 11.1806 8.66667 11.0222 8.66667 10.8333C8.66667 10.6445 8.60278 10.4861 8.47501 10.3583C8.34723 10.2306 8.18889 10.1667 8.00001 10.1667C7.81112 10.1667 7.65278 10.2306 7.52501 10.3583C7.39723 10.4861 7.33334 10.6445 7.33334 10.8333C7.33334 11.0222 7.39723 11.1806 7.52501 11.3083C7.65278 11.4361 7.81112 11.5 8.00001 11.5ZM7.33334 9.50001H8.66667V6.16668H7.33334V9.50001Z\" fill=\"#B70D0D\"/>\n</svg>"}
clientOnly={true}
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
className={`w-element c1ve3r8j ca98neh cnvsn5k c4c2xkh c9vrei2`}>
{LocalPagesData?.data?.data?.services?.[0]?.weatherWidgetRightHeader}
</h2>
<div
className={`w-element c139pwc6 cr10thc c13g3obg`}>
<p
className={`w-element c1g3mhtg c1d8rs8t c1b2b7rn`}>
{LocalPagesData?.data?.data?.services?.[0]?.weatherWidgetRightParagraphText}
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
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 cl4dpup c1siv9z0`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
}
</section>
}
{(LocalPagesData?.data?.data?.services?.[0]?.weatherWidget && LocalPagesData?.data?.data?.services?.[0]?.projectConsultantName ? true : false) &&
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
{LocalPagesData?.data?.data?.services?.[0]?.buttonTextConsultantCta}
</Link>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw cj1o4tp c1q4fbwg ce6x08i c1lg7bh9 ciylvte c18oqc5x c1exxhe2`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectConsultant1Image?.url}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
{(LocalPagesData?.data?.data?.services?.[0]?.projectConsultant2Image ? true : false) &&
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com" + LocalPagesData?.data?.data?.services?.[0]?.projectConsultant2Image?.url}
className={`w-image cfgaftm c1hwvjgs cdmu5h7 czbu68a ce6x08i c155pijp cn87dm8 c1uhhf7h c14dc6x6 cr4tyxq c1n4uvdf cuos2rc ceghu2f c18bj3o3 c1lq6pq8`} />
}
<div
className={`w-element c1numhkq c1a06u5s cw8j8n1`}>
<p
className={`w-element c1g3mhtg c309ipl ca98neh c14hko07 cltntbw`}>
{LocalPagesData?.data?.data?.services?.[0]?.projectConsultantName}
</p>
<p
className={`w-element`}>
{LocalPagesData?.data?.data?.services?.[0]?.projectConsultantTitle}
</p>
<p
className={`w-element c1a4drig`}>
{"🤝 Here to Serve, Not to Sell"}
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
}
{(LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText ? true : false) &&
<div
id={"hoa"}
className={`w-element cvfl1ur c2ifgan`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
id={"community-resources"}
className={`w-element`}>
<HtmlEmbed
code={LocalPagesData?.data?.data?.services?.[0]?.communityGuidelinesRichText}
clientOnly={true}
className={`w-html-embed c1tm0t1i c1ib9ypd cja62bv c186p1g5 c1arayfx c56odag c1hqutl1 cjx1ika c1xpbze2 c1c9efyk c1stgdk8 c8qrtxl c1sl5awa c1kiin2a cp277i2 cgqh2e cpevizx c8kohks c8d8zdt c1uhuwt4 cnwe5rt c1g0q2tv c5p8d3r c1hwtjer c13ws34x camd7ly c1pz8w7n cbln8bn ch6vhru c10h9ocv c1oh1ckg c1tfgo8d c4hp6bu cvahi2z chfjkpk c1dqk3pb`}>
</HtmlEmbed>
<Link
href={system?.params?.slug + "#toc"}
className={`w-element cnbug7k c1n6bl5k c1yt5cpa c9te4zd c1diokdk ch3nxmx c82qwqc c1t86vhp cihk981 chm73lv cm25hmt c1v5rwvs c1cv7vjb cisippn cekmvq0 c1siv9z0 cl4dpup`}>
<p
className={`w-element cn5qs21 c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Table"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0`} />
</Link>
</div>
</div>
</div>
</div>
}
{(LocalPagesData?.data?.data?.services?.[0]?.reviewText ? true : false) &&
<section
className={`w-element cvfl1ur`}>
<div
className={`w-element c4vc9qx c9tjkc5 c185jzsb cc29gav c7iyr7r cmpwmbp c19xkq3v c1t8xhs1`}>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn`}>
<div
className={`w-element c1numhkq c18j2ji4 c1t8yvgy c1diokdk ct0qrmw c4ph8p6 c119v29c c13d76g4 c1mpktj7 c182jog4`}>
{(LocalPagesData?.data?.data?.services?.[0]?.testimonialVideo ? true : false) &&
<div
className={`w-element c6majsq cn87dm8 c1uhhf7h cnwi6s4 c1lq6pq8 c1i2t266 c1w4abcz cj1xwpe cpdrg3g cxctrq c13g3obg cyovuht`}>
<YouTube
url={LocalPagesData?.data?.data?.services?.[0]?.testimonialVideo}
loading={"lazy"}
showPreview={true}
showRelatedVideos={false}
className={`w-you-tube cdmu5h7 c1numhkq c139pwc6 czbu68a cjkauba cn87dm8 c1uhhf7h c1epvuph cqq3lvy`}>
<VimeoPreviewImage
alt={"YouTube video preview image"}
sizes={"100vw"}
optimize={true}
loading={"eager"}
className={`w-preview-image cnbug7k cdmu5h7 cfrqxly c139pwc6 cjkauba`} />
<VimeoSpinner
className={`w-spinner cnbug7k ccgl4y2 cag2zqh c16efw4k c10vpd2y cz1gmor c6yclp8`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"c765c5cf3__e2CRglijn891\" shape-rendering=\"geometricPrecision\" text-rendering=\"geometricPrecision\" viewBox=\"0 0 128 128\" fill=\"currentColor\" width=\"100%\" height=\"100%\" style=\"display: block;\"><style>@keyframes e2CRglijn892_tr__tr{0%{transform:translate(64px,64px) rotate(90deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}50%{transform:translate(64px,64px) rotate(810deg);animation-timing-function:cubic-bezier(.42,0,.58,1)}to{transform:translate(64px,64px) rotate(1530deg)}}@keyframes e2CRglijn892_s_p{0%,to{stroke:#39fbbb}25%{stroke:#4a4efa}50%{stroke:#e63cfe}75%{stroke:#ffae3c}}@keyframes e2CRglijn892_s_do{0%{stroke-dashoffset:251.89}2.5%,52.5%{stroke-dashoffset:263.88;animation-timing-function:cubic-bezier(.42,0,.58,1)}25%,75%{stroke-dashoffset:131.945}to{stroke-dashoffset:251.885909}}#c765c5cf3__e2CRglijn892_tr{animation:e2CRglijn892_tr__tr 3000ms linear infinite normal forwards}#c765c5cf3__e2CRglijn892{animation-name:e2CRglijn892_s_p,e2CRglijn892_s_do;animation-duration:3000ms;animation-fill-mode:forwards;animation-timing-function:linear;animation-direction:normal;animation-iteration-count:infinite}</style><g id=\"c765c5cf3__e2CRglijn892_tr\" transform=\"translate(64,64) rotate(90)\"><circle id=\"c765c5cf3__e2CRglijn892\" r=\"42\" fill=\"none\" stroke=\"#39fbbb\" stroke-dasharray=\"263.89\" stroke-dashoffset=\"251.89\" stroke-linecap=\"round\" stroke-width=\"16\" transform=\"scale(-1,1) translate(0,0)\"/></g></svg>"}
className={`w-html-embed`} />
</VimeoSpinner>
<VimeoPlayButton
aria-label={"Play button"}
className={`w-play-button cnbug7k c15zxcfo c1d1mxpw ccgl4y2 cag2zqh c5ps8o0 crrlzdp c1numhkq c1diokdk ch3nxmx c13qspjq c1cqma02 c1yhof13 c1jvw4nv cw0d079 c1mpqvj6 c81ebuq c18kyhsr c1d7h9xn c1b94vpf cz6rnt2`}>
<div
aria-hidden={true}
className={`w-element c13za7x0 c1hstsjx`}>
<HtmlEmbed
code={"<svg fill=\"#ffffff\" height=\"100%\" width=\"60%\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 460.114 460.114\" xml:space=\"preserve\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <g> <path d=\"M393.538,203.629L102.557,5.543c-9.793-6.666-22.468-7.372-32.94-1.832c-10.472,5.538-17.022,16.413-17.022,28.26v396.173 c0,11.846,6.55,22.721,17.022,28.26c10.471,5.539,23.147,4.834,32.94-1.832l290.981-198.087 c8.746-5.954,13.98-15.848,13.98-26.428C407.519,219.477,402.285,209.582,393.538,203.629z\"></path> </g> </g> </g></svg>"}
className={`w-html-embed`} />
</div>
</VimeoPlayButton>
</YouTube>
</div>
}
<div
className={`w-element c1numhkq c1a06u5s c3qgmhh czziw4w c13g3obg cyovuht`}>
<h3
className={`w-element cw3m79e c1qb2rp3 c82qwqc cn7k83s c1emvlx`}>
{LocalPagesData?.data?.data?.services?.[0]?.localReviewHeader}
</h3>
<p
className={`w-element c1g3mhtg cn5qs21 c1b2b7rn chdomh6`}>
{LocalPagesData?.data?.data?.services?.[0]?.reviewText}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h`}>
<HtmlEmbed
code={"<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 91 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7.34786 1.48663C7.4319 1.1987 7.83978 1.1987 7.92382 1.48663L9.28716 6.15741C9.32452 6.28538 9.44183 6.37336 9.57515 6.37336L14.05 6.37336C14.3327 6.37336 14.4585 6.72879 14.2386 6.90662L10.565 9.87769C10.471 9.95377 10.4318 10.0789 10.4657 10.195L11.8555 14.9567C11.9379 15.2388 11.6074 15.4588 11.3789 15.274L7.82449 12.3993C7.71447 12.3103 7.55722 12.3103 7.44719 12.3993L3.89277 15.274C3.66423 15.4588 3.33378 15.2388 3.41614 14.9567L4.806 10.195C4.83989 10.0789 4.80073 9.95377 4.70667 9.87769L1.03307 6.90662C0.813201 6.72879 0.938942 6.37336 1.22173 6.37336L5.69653 6.37336C5.82984 6.37336 5.94716 6.28538 5.98452 6.15741L7.34786 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M24.2741 1.48663C24.3581 1.1987 24.766 1.1987 24.85 1.48663L26.2134 6.15741C26.2507 6.28538 26.368 6.37336 26.5014 6.37336L30.9762 6.37336C31.2589 6.37336 31.3847 6.72879 31.1648 6.90662L27.4912 9.87769C27.3972 9.95377 27.358 10.0789 27.3919 10.195L28.7818 14.9567C28.8641 15.2388 28.5337 15.4588 28.3051 15.274L24.7507 12.3993C24.6407 12.3103 24.4834 12.3103 24.3734 12.3993L20.819 15.274C20.5904 15.4588 20.26 15.2388 20.3423 14.9567L21.7322 10.195C21.7661 10.0789 21.7269 9.95377 21.6329 9.87769L17.9593 6.90662C17.7394 6.72879 17.8652 6.37336 18.1479 6.37336L22.6227 6.37336C22.7561 6.37336 22.8734 6.28538 22.9107 6.15741L24.2741 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M41.2003 1.48663C41.2843 1.1987 41.6922 1.1987 41.7762 1.48663L43.1396 6.15741C43.1769 6.28538 43.2943 6.37336 43.4276 6.37336L47.9024 6.37336C48.1852 6.37336 48.3109 6.72879 48.091 6.90662L44.4174 9.87769C44.3234 9.95377 44.2842 10.0789 44.3181 10.195L45.708 14.9567C45.7903 15.2388 45.4599 15.4588 45.2313 15.274L41.6769 12.3993C41.5669 12.3103 41.4096 12.3103 41.2996 12.3993L37.7452 15.274C37.5167 15.4588 37.1862 15.2388 37.2686 14.9567L38.6584 10.195C38.6923 10.0789 38.6531 9.95377 38.5591 9.87769L34.8855 6.90662C34.6656 6.72879 34.7914 6.37336 35.0741 6.37336L39.549 6.37336C39.6823 6.37336 39.7996 6.28538 39.8369 6.15741L41.2003 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M58.1265 1.48663C58.2106 1.1987 58.6185 1.1987 58.7025 1.48663L60.0658 6.15741C60.1032 6.28538 60.2205 6.37336 60.3538 6.37336L64.8286 6.37336C65.1114 6.37336 65.2372 6.72879 65.0173 6.90662L61.3437 9.87769C61.2496 9.95377 61.2105 10.0789 61.2444 10.195L62.6342 14.9567C62.7166 15.2388 62.3861 15.4588 62.1576 15.274L58.6032 12.3993C58.4932 12.3103 58.3359 12.3103 58.2259 12.3993L54.6715 15.274C54.4429 15.4588 54.1125 15.2388 54.1948 14.9567L55.5847 10.195C55.6186 10.0789 55.5794 9.95377 55.4854 9.87769L51.8118 6.90662C51.5919 6.72879 51.7176 6.37336 52.0004 6.37336L56.4752 6.37336C56.6085 6.37336 56.7259 6.28538 56.7632 6.15741L58.1265 1.48663Z\" fill=\"#FBBC04\"/>\n<path d=\"M75.0528 1.48663C75.1368 1.1987 75.5447 1.1987 75.6287 1.48663L76.9921 6.15741C77.0294 6.28538 77.1467 6.37336 77.28 6.37336L81.7548 6.37336C82.0376 6.37336 82.1634 6.72879 81.9435 6.90662L78.2699 9.87769C78.1758 9.95377 78.1367 10.0789 78.1706 10.195L79.5604 14.9567C79.6428 15.2388 79.3123 15.4588 79.0838 15.274L75.5294 12.3993C75.4194 12.3103 75.2621 12.3103 75.1521 12.3993L71.5977 15.274C71.3691 15.4588 71.0387 15.2388 71.121 14.9567L72.5109 10.195C72.5448 10.0789 72.5056 9.95377 72.4116 9.87769L68.738 6.90662C68.5181 6.72879 68.6438 6.37336 68.9266 6.37336L73.4014 6.37336C73.5347 6.37336 73.6521 6.28538 73.6894 6.15741L75.0528 1.48663Z\" fill=\"#FBBC04\"/>\n</svg>"}
clientOnly={true}
className={`w-html-embed c1numhkq c1diokdk ch3nxmx ctittuf c1ovmx1o`} />
<p
className={`w-element`}>
{LocalPagesData?.data?.data?.services?.[0]?.nameOfReviewer}
</p>
<p
className={`w-element`}>
<Link
href={LocalPagesData?.data?.data?.services?.[0]?.googleReviewLink}
target={"_blank"}
className={`w-element`}>
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
}
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
{"Let's Talk About Your Roof."}
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
<Link
href={"#"}
className={`w-element cvfl1ur c1n6bl5k c1yt5cpa c1numhkq c1diokdk c1nt8u3l c82qwqc c1ym9r0h c1bloln8 c14dduqk`}>
<p
className={`w-element ch7xx7z c1v90cn6 c115nxwc c1lwn44j c1fjww6l c7qz4xx`}>
{"Scroll to Top"}
</p>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\">\n  <path d=\"M342.6 105.4C330.1 92.9 309.8 92.9 297.3 105.4L137.3 265.4C124.8 277.9 124.8 298.2 137.3 310.7C149.8 323.2 170.1 323.2 182.6 310.7L320 173.3L457.4 310.6C469.9 323.1 490.2 323.1 502.7 310.6C515.2 298.1 515.2 277.8 502.7 265.3L342.7 105.3zM502.6 457.4L342.6 297.4C330.1 284.9 309.8 284.9 297.3 297.4L137.3 457.4C124.8 469.9 124.8 490.2 137.3 502.7C149.8 515.2 170.1 515.2 182.6 502.7L320 365.3L457.4 502.6C469.9 515.1 490.2 515.1 502.7 502.6C515.2 490.1 515.2 469.8 502.7 457.3z\" fill=\"currentColor\"/></svg>"}
className={`w-html-embed c12i83wc c1onu9mc c1f8l5h0 c2shfwq c4pie2e crv3s27`} />
</Link>
</Box>
<div
className={`w-element c1jjyqa4 c1azofqw c86uodh cw0d079 c1mpqvj6 c18kyhsr c81ebuq cwa1yh5 c1y8ksq2 c1fmjy5t c9x9jza ccsc2xu ck5h0q2 c1r2jdu0 cs3ojqv ckdtkkn cdgcmie c16j9hpi c1bksvz7 cvfl1ur c1d7h9xn c1numhkq c1diokdk ch3nxmx cxlpeob c17rwy3n c1603wqb c9dibem ckgfv3d c8zqfcg c15ykkd2 cicqioc c8d335a cnberr9 c9fg0m0 c1q9fa8h c13rsw49 ${"help-widget"}`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c1epvuph`}>
<div
className={`w-element cw0d079 c1mpqvj6 c18kyhsr c81ebuq c120nl7e cd04v2w cn87dm8 c1uhhf7h ckain9p c1c6zaej cmbwngm`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1767999431_image_1765439388559_Tj_I_Qt4_VU_tcapds_b177766c8e.png"}
loading={"eager"}
fetchPriority={"high"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba`} />
</div>
<div
className={`w-element cnbug7k c1n7frul c1eflpw1 c1utj868 c1tlc0tf c1tlezuv cw0d079 c1mpqvj6 c18kyhsr c81ebuq cks5k15 cqpn0l cob172h`} />
</div>
<div
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw cjaexq6 cbo9gzw`}>
<p
className={`w-element c1gbsy9l c18klwyf c82qwqc c1lwn44j c1fjww6l c61em0b cy75sie`}>
{"Need Help?"}
</p>
<div
className={`w-element c1numhkq c1diokdk ct0qrmw c1ym9r0h c1bloln8 c1s18yzb cxhk38t c18mkjfw c1ivlk8p`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-phone w-2.5 h-2.5 md:w-3 md:h-3\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path></svg>"}
clientOnly={true}
className={`w-html-embed c1numhkq cwhac3e ca5hkfn c1diokdk ch3nxmx`} />
<p
className={`w-element`}>
{"Talk to a real person"}
</p>
</div>
</div>
</div>
<div
className={`w-element c1jjyqa4 c8fjv4x cmnqq0u c11xvf6k cvvhtep c139pwc6 c196971d cvfl1ur c1bw7gys c1numhkq c1diokdk ch3nxmx c11sf6j5 c1skqvd7 ckgfv3d c8zqfcg c15ykkd2 cicqioc cauq8n4 ${"help-modal"}`}>
<div
className={`w-element cnbug7k c1p7o4bx c1azofqw c120nl7e cd04v2w c1numhkq c1diokdk ch3nxmx cn87dm8 c1uhhf7h c82qwqc c1d7h9xn c1c6zaej cmbwngm c1nw4yri cnberr9 ${"close-btn"}`}>
<HtmlEmbed
code={"<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke-width=\"0\"></g><g stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g> <path fill=\"currentColor\" clip-rule=\"evenodd\" d=\"M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z\"></path> </g></svg>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
className={`w-element c139pwc6 caeuris c5ftqtp c1ux94pn c9tjkc5 c4vc9qx c6ca0h crn8utr`}>
<div
className={`w-element c1numhkq c1a06u5s c1j3nit7 c1s88tz3 c1diokdk ct0qrmw`}>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c1p4xat6 c1rjplas`}>
<div
className={`w-element ce8qyo9 cm2j0bx c1epvuph cqq3lvy cn87dm8 c1uhhf7h cw0d079 c1mpqvj6 c18kyhsr c81ebuq`}>
<Image
src={"https://v2.improveitmd.com/uploads/res_cloudinary_com_ddeeo6usc_image_upload_v1767999431_image_1765439388559_Tj_I_Qt4_VU_tcapds_b177766c8e.png"}
loading={"lazy"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 czbu68a cjkauba cnbug7k c8fjv4x cmnqq0u c11xvf6k cvvhtep c4au5p3 c1h4wkid c6pwqi8 c185qbt7`} />
</div>
<h2
className={`w-element cw3m79e c1qb2rp3 c82qwqc cn7k83s c1aq90ed cqal8fd`}>
{"Questions? Talk to an Expert"}
</h2>
<p
className={`w-element c309ipl c1v90cn6 c115nxwc csa7kl8 c1fjww6l`}>
{"Our team is available to help you understand your options."}
</p>
<Link
href={"tel:+18082501188"}
className={`w-element c1numhkq c309ipl c5heytn c17rwy3n c1603wqb c4izu12 cpl1gtw c1diokdk ct0qrmw c1d7h9xn cacmu18`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-phone w-6 h-6 md:w-8 md:h-8 text-primary\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path></svg>"}
className={`w-html-embed`} />
<p
className={`w-element`}>
{"+1 (808) 250-1188"}
</p>
</Link>
<p
className={`w-element c1s18yzb c18mkjfw csa7kl8`}>
{"Mon–Fri 9am–6pm EST"}
</p>
</div>
<p
className={`w-element c18v83wh c1v90cn6 c82qwqc c1lwn44j c1fjww6l c61em0b`}>
{"OR"}
</p>
<h2
className={`w-element cw3m79e c1qb2rp3 c82qwqc cn7k83s c1emvlx`}>
{"Fill out a form."}
</h2>
<Form
state={formState}
onStateChange={(state: any) => {
formState = state
set$formState(formState)
}}
action={"action"}
encType={"application/x-www-form-urlencoded"}
data-submit={"api"}
className={`w-webhook-form c139pwc6`}>
{(formState === 'initial' || formState === 'error') &&
<div
className={`w-element c1numhkq c1a06u5s cx1xwkj c17jsdkn cnhbbr7 c1ux94pn c5ftqtp`}>
<Input
placeholder={"Your name*"}
type={"text"}
name={"Name"}
required={true}
className={`w-element c5zgd1 c1mndhrk c12bgjgz c2j7e41 c128c779 c82qwqc c2yws97 c1qporyx c1n5kit4 cb5io3 c1d8rs8t c8d36da c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au czyae1i cg961le c1pz91w4 c1ndojgn cdmtq07 cn4267s c2bl8aw c19c13sp ckg1xra csoc2z6 c166spsr c1rkvowt c1bebdmu c16cu4eh`} />
<Input
placeholder={"Phone number*"}
type={"tel"}
name={"Phone"}
required={true}
className={`w-element c5zgd1 c1mndhrk c12bgjgz c2j7e41 c128c779 c82qwqc c2yws97 c1qporyx c1n5kit4 cb5io3 c1d8rs8t c8d36da c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au czyae1i cg961le c1pz91w4 c1ndojgn cdmtq07 cn4267s c2bl8aw c19c13sp ckg1xra csoc2z6 c166spsr c1rkvowt c1bebdmu c16cu4eh`} />
<Input
type={"hidden"}
name={"page_referrer"}
data-element={"page_referrer"}
className={`w-element c5zgd1 c1mndhrk c12bgjgz c2j7e41 c128c779 c82qwqc c2yws97 c1qporyx c1n5kit4 cb5io3 c1d8rs8t c8d36da c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au czyae1i cg961le c1pz91w4 c1ndojgn cdmtq07 cn4267s c2bl8aw c19c13sp ckg1xra csoc2z6 c166spsr c1rkvowt c1bebdmu c16cu4eh`} />
<Textarea
placeholder={"Anything you want us to know?"}
name={"Comments"}
className={`w-element c5zgd1 c1mndhrk c12bgjgz c2j7e41 c128c779 c1d8rs8t c8d36da cp0czxx c2yws97 c1qporyx c1n5kit4 cb5io3 c1h94pli c1r2737e cgtmmxo c1cukx3 c3su6au c82qwqc czyae1i cg961le c2bl8aw c19c13sp ckg1xra csoc2z6 c1pz91w4 c1ndojgn cdmtq07 cn4267s c1bebdmu c16cu4eh c166spsr c1rkvowt`} />
<button
type={"submit"}
className={`w-element c1numhkq c1diokdk ch3nxmx c5zgd1 c11b3qd4 c1kx9jzv cjsex2s ckrq2bq c1d8rs8t c1lvj0n cacmu18 c1f8uhde c2yws97 c1qporyx c1n5kit4 cb5io3 czbqxih ckgfv3d c8zqfcg c15ykkd2 cicqioc c1d7h9xn cn7k83s c8d36da cl4dpup c5g53jj c1ou92f6 cw07ppl`}>
{"Submit"}
</button>
</div>
}
{(formState === 'success') &&
<div
className={`w-element c1oowk3p c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au c1numhkq c1diokdk ch3nxmx c1p4xat6 c1ux94pn c5ftqtp c139pwc6 c1rxl3x ca17eyv`}>
{"Thank you. We'll be calling you soon."}
</div>
}
{(formState === 'error') &&
<div
className={`w-element clif6a6 c1d8rs8t c1g3mhtg cw943sw cpa35s2 c1r2737e cgtmmxo c1cukx3 c3su6au cdr1ysj c1numhkq c1diokdk ch3nxmx c1p4xat6 c5ftqtp c1ux94pn c139pwc6 c1rxl3x ca17eyv`}>
<span
className={`w-element`}>
{"Oops! Something went wrong."}
</span>
</div>
}
</Form>
</div>
</div>
</div>
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
<Slot>
<Fragment_1>
</Fragment_1>
</Slot>
<HtmlEmbed
code={`<div id='local-page-config' style='display:none' aria-hidden='true'
    data-weather-enabled="` + LocalPagesData?.data?.data?.services?.[0]?.weatherWidget + `"
    data-weather-location="` + LocalPagesData?.data?.data?.services?.[0]?.weatherWidgetLocationText + `"></div>`}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\nconst body = document.body;\nconst helpWidget = document.querySelector(\".help-widget\");\nconst helpModal = document.querySelector(\".help-modal\");\nconst formModal = document.querySelector(\".form-modal\");\nconst closeBtn = document.querySelector(\".close-btn\");\nconst formLink = document.querySelector(\".form-link\");\nconst backBtn = document.querySelector(\".back-btn\");\nconst modals = [helpModal, formModal].filter(Boolean);\n\nfunction updateBodyScroll() {\n  const isAnyModalActive = modals.some(modal => modal.classList.contains(\"is-active\"));\n  body.style.overflow = isAnyModalActive ? \"hidden\" : \"\";\n}\n\nhelpWidget?.addEventListener(\"click\", () => {\n  helpModal?.classList.add(\"is-active\");\n  updateBodyScroll();\n});\ncloseBtn?.addEventListener(\"click\", () => {\n  helpModal?.classList.remove(\"is-active\");\n  updateBodyScroll();\n});\nformLink?.addEventListener(\"click\", () => {\n  formModal?.classList.add(\"is-active\");\n  updateBodyScroll();\n});\nbackBtn?.addEventListener(\"click\", () => {\n  formModal?.classList.remove(\"is-active\");\n  updateBodyScroll();\n});\n\nconst observer = new MutationObserver(updateBodyScroll);\nmodals.forEach(modal => {\n  observer.observe(modal, { attributes: true, attributeFilter: [\"class\"] });\n});\n\nupdateBodyScroll();\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\nnew Swiper('.swiper.is-service', {\n  loop: false,\n  speed: 500,\n  grabCursor: true,\n  slidesPerView: 'auto',\n  navigation: { prevEl: '.arrow-prev', nextEl: '.arrow-next' },\n});\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</Box>
</Body>
}


      export { Page }
    