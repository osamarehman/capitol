/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, RemixForm as RemixForm, Link as Link } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, HtmlEmbed as HtmlEmbed, Slot as Slot, Fragment as Fragment_1, Input as Input, Image as Image, Text as Text } from "@webstudio-is/sdk-components-react";
import { Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent } from "@webstudio-is/sdk-components-react-radix";


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
        ["roof_flat_aTdTXJd_HCxIKXlaOMN3E.webp","metal-roof-5_SIEt_4s5tEq-lB-kJi-T5.webp","roof_HDZ_Pw3BD18kjouU7zv7ejJsA.webp"]

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-element`}>
<Box
className={`w-box cnregu4 c3a6wb5`}>
<Slot>
<div
className={`w-element cv4mf0f`}>
<HtmlEmbed
clientOnly={true}
code={"<script src=\"https://code.jquery.com/jquery-3.7.1.min.js\" integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\" crossorigin=\"anonymous\"></script>\n\n<script src=\"https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js\">\n\n</script>\n<script src=\"https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js\">\n\n</script>\n<script src=\"https://uploads-ssl.webflow.com/6287b31efad93805832a2f6e/62de4ba563185e28ce6dea35_draw.txt\">\n\n</script>\n<script src=\"https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js\">\n\n</script>\n<script>\n!function(e){if(\"object\"==typeof exports&&\"undefined\"!=typeof module)module.exports=e();else if(\"function\"==typeof define&&define.amd)define([],e);else{var t;t=\"undefined\"!=typeof window?window:\"undefined\"!=typeof global?global:\"undefined\"!=typeof self?self:this,t.DrawRectangle=e()}}(function(){return function(){function e(t,n,o){function i(r,l){if(!n[r]){if(!t[r]){var s=\"function\"==typeof require&&require;if(!l&&s)return s(r,!0);if(a)return a(r,!0);var u=new Error(\"Cannot find module '\"+r+\"'\");throw u.code=\"MODULE_NOT_FOUND\",u}var d=n[r]={exports:{}};t[r][0].call(d.exports,function(e){return i(t[r][1][e]||e)},d,d.exports,e,t,n,o)}return n[r].exports}for(var a=\"function\"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}return e}()({1:[function(e,t,n){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var o={enable:function(e){setTimeout(function(){e.map&&e.map.doubleClickZoom&&e._ctx&&e._ctx.store&&e._ctx.store.getInitialConfigValue&&e._ctx.store.getInitialConfigValue(\"doubleClickZoom\")&&e.map.doubleClickZoom.enable()},0)},disable:function(e){setTimeout(function(){e.map&&e.map.doubleClickZoom&&e.map.doubleClickZoom.disable()},0)}},i={onSetup:function(e){var t=this.newFeature({type:\"Feature\",properties:{},geometry:{type:\"Polygon\",coordinates:[[]]}});return this.addFeature(t),this.clearSelectedFeatures(),o.disable(this),this.updateUIClasses({mouse:\"add\"}),this.setActionableState({trash:!0}),{rectangle:t}},onClick:function(e,t){e.startPoint&&e.startPoint[0]!==t.lngLat.lng&&e.startPoint[1]!==t.lngLat.lat&&(this.updateUIClasses({mouse:\"pointer\"}),e.endPoint=[t.lngLat.lng,t.lngLat.lat],this.changeMode(\"simple_select\",{featuresId:e.rectangle.id}));var n=[t.lngLat.lng,t.lngLat.lat];e.startPoint=n},onMouseMove:function(e,t){e.startPoint&&(e.rectangle.updateCoordinate(\"0.0\",e.startPoint[0],e.startPoint[1]),e.rectangle.updateCoordinate(\"0.1\",t.lngLat.lng,e.startPoint[1]),e.rectangle.updateCoordinate(\"0.2\",t.lngLat.lng,t.lngLat.lat),e.rectangle.updateCoordinate(\"0.3\",e.startPoint[0],t.lngLat.lat),e.rectangle.updateCoordinate(\"0.4\",e.startPoint[0],e.startPoint[1]))},onKeyUp:function(e,t){if(27===t.keyCode)return this.changeMode(\"simple_select\")},onStop:function(e){o.enable(this),this.updateUIClasses({mouse:\"none\"}),this.activateUIButton(),void 0!==this.getFeature(e.rectangle.id)&&(e.rectangle.removeCoordinate(\"0.4\"),e.rectangle.isValid()?this.map.fire(\"draw.create\",{features:[e.rectangle.toGeoJSON()]}):(this.deleteFeature([e.rectangle.id],{silent:!0}),this.changeMode(\"simple_select\",{},{silent:!0})))},toDisplayFeatures:function(e,t,n){var o=t.properties.id===e.rectangle.id;return t.properties.active=o?\"true\":\"false\",o?e.startPoint?n(t):void 0:n(t)},onTrash:function(e){this.deleteFeature([e.rectangle.id],{silent:!0}),this.changeMode(\"simple_select\")}};n.default=i},{}]},{},[1])(1)});\n\n</script>\n\n<script>\n\nif (typeof styles === 'undefined') {\n    window.styles = (portColor) => {\n      // Your existing styles function code here\n       return [\n    {\n      id: 'gl-draw-polygon-fill-inactive',\n      type: 'fill',\n      filter: ['all', ['==', 'active', 'false'],\n        ['==', '$type', 'Polygon'],\n        ['!=', 'mode', 'static']\n      ],\n      paint: {\n        'fill-color': portColor,\n        'fill-outline-color': portColor,\n        'fill-opacity': 0.3\n      }\n    },\n    {\n      id: 'gl-draw-polygon-fill-active',\n      type: 'fill',\n      filter: ['all', ['==', 'active', 'true'],\n        ['==', '$type', 'Polygon']\n      ],\n      paint: {\n        'fill-color': portColor,\n        'fill-outline-color': portColor,\n        'fill-opacity': 0\n      }\n    },\n    {\n      id: 'gl-draw-polygon-stroke-inactive',\n      type: 'line',\n      filter: ['all', ['==', 'active', 'false'],\n        ['==', '$type', 'Polygon'],\n        ['!=', 'mode', 'static']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': '#3bb2d0',\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-polygon-stroke-active',\n      type: 'line',\n      filter: ['all', ['==', 'active', 'true'],\n        ['==', '$type', 'Polygon']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': portColor,\n        'line-dasharray': [0.2, 2],\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-line-inactive',\n      type: 'line',\n      filter: ['all', ['==', 'active', 'false'],\n        ['==', '$type', 'LineString'],\n        ['!=', 'mode', 'static']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': '#3bb2d0',\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-line-active',\n      type: 'line',\n      filter: ['all', ['==', '$type', 'LineString'],\n        ['==', 'active', 'true']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': portColor,\n        'line-dasharray': [0.2, 2],\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-point-point-stroke-inactive',\n      type: 'circle',\n      filter: ['all', ['==', 'active', 'false'],\n        ['==', '$type', 'Point'],\n        ['==', 'meta', 'feature'],\n        ['!=', 'mode', 'static']\n      ],\n      paint: {\n        'circle-radius': 15,\n        'circle-opacity': 1,\n        'circle-color': '#fff'\n      }\n    },\n    {\n      id: 'gl-draw-point-inactive',\n      type: 'circle',\n      filter: ['all', ['==', 'active', 'false'],\n        ['==', '$type', 'Point'],\n        ['==', 'meta', 'feature'],\n        ['!=', 'mode', 'static']\n      ],\n      paint: {\n        'circle-radius': 3,\n        'circle-color': '#3bb2d0'\n      }\n    },\n    {\n      id: 'gl-draw-point-stroke-active',\n      type: 'circle',\n      filter: ['all', ['==', '$type', 'Point'],\n        ['==', 'active', 'true'],\n        ['!=', 'meta', 'midpoint']\n      ],\n      paint: {\n        'circle-radius': 7,\n        'circle-color': '#fff'\n      }\n    },\n    {\n      id: 'gl-draw-point-active',\n      type: 'circle',\n      filter: ['all', ['==', '$type', 'Point'],\n        ['!=', 'meta', 'midpoint'],\n        ['==', 'active', 'true']\n      ],\n      paint: {\n        'circle-radius': 5,\n        'circle-color': portColor\n      }\n    },\n    {\n      id: 'gl-draw-polygon-fill-static',\n      type: 'fill',\n      filter: ['all', ['==', 'mode', 'static'],\n        ['==', '$type', 'Polygon']\n      ],\n      paint: {\n        'fill-color': '#404040',\n        'fill-outline-color': '#404040',\n        'fill-opacity': 0.1\n      }\n    },\n    {\n      id: 'gl-draw-polygon-stroke-static',\n      type: 'line',\n      filter: ['all', ['==', 'mode', 'static'],\n        ['==', '$type', 'Polygon']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': '#404040',\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-line-static',\n      type: 'line',\n      filter: ['all', ['==', 'mode', 'static'],\n        ['==', '$type', 'LineString']\n      ],\n      layout: {\n        'line-cap': 'round',\n        'line-join': 'round'\n      },\n      paint: {\n        'line-color': '#404040',\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-point-static',\n      type: 'circle',\n      filter: ['all', ['==', 'mode', 'static'],\n        ['==', '$type', 'Point']\n      ],\n      paint: {\n        'circle-radius': 5,\n        'circle-color': '#404040'\n      }\n    },\n    {\n      id: 'gl-draw-polygon-color-picker',\n      type: 'fill',\n      filter: ['all', ['==', '$type', 'Polygon'],\n        ['has', 'user_portColor']\n      ],\n      paint: {\n        'fill-color': ['get', 'user_portColor'],\n        'fill-outline-color': ['get', 'user_portColor'],\n        'fill-opacity': 0.5\n      }\n    },\n    {\n      id: 'gl-draw-line-color-picker',\n      type: 'line',\n      filter: ['all', ['==', '$type', 'LineString'],\n        ['has', 'user_portColor']\n      ],\n      paint: {\n        'line-color': ['get', 'user_portColor'],\n        'line-width': 2\n      }\n    },\n    {\n      id: 'gl-draw-point-color-picker',\n      type: 'circle',\n      filter: ['all', ['==', '$type', 'Point'],\n        ['has', 'user_portColor']\n      ],\n      paint: {\n        'circle-radius': 3,\n        'circle-color': ['get', 'user_portColor']\n      }\n    },\n    {\n      id: 'gl-draw-polygon-midpoint-stroke',\n      type: 'circle',\n      filter: ['all', ['==', '$type', 'Point'],\n        ['==', 'meta', 'midpoint']\n      ],\n      paint: {\n        'circle-radius': 6,\n        'circle-color': '#e3641f'\n      }\n    },\n    {\n      id: 'gl-draw-polygon-midpoint',\n      type: 'circle',\n      filter: ['all', ['==', '$type', 'Point'],\n        ['==', 'meta', 'midpoint']\n      ],\n      paint: {\n        'circle-radius': 4,\n        'circle-color': '#44484a'\n      }\n    },\n    {\n      id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',\n      type: 'circle',\n      filter: ['all', ['==', 'meta', 'vertex'],\n        ['==', '$type', 'Point'],\n        ['!=', 'mode', 'static']\n      ],\n      paint: {\n        'circle-radius': 8, // outer circle\n        'circle-color': '#e3641f'\n      }\n    },\n    {\n      id: 'gl-draw-polygon-and-line-vertex-inactive',\n      type: 'circle',\n      filter: ['all', ['==', 'meta', 'vertex'],\n        ['==', '$type', 'Point'],\n        ['!=', 'mode', 'static']\n      ],\n      paint: {\n        'circle-radius': 6, // inner circle\n        'circle-color': '#44484a'\n      }\n    },\n  ]\n    };\n  }\n\n\n</script>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<script>\n\nconst CONFIG = {\n  mapboxToken: 'pk.eyJ1IjoiaW1wcm92ZWl0bWQiLCJhIjoiY2w1OXlhZ3BnMDAyMDNrcG9pdmU3OXNvcyJ9.8IKtnRJwbi7ss5MjeHGAkQ',\n  apiKey: 'bdc_7a3c280817af44a2952336e349e70525',\n  allowedRegions: ['Maryland', 'Washington', 'Virginia'],\n  apiEndpoint: 'https://forms.improveitmd.com/api/submit'\n};\n\nconst PRICING = {\n  Asphalt: [5.00, 7.50],\n  Silicone: [10, 17],\n  TPO: [12, 19],\n  Standard: [5.00, 7.50]\n};\n\n// ============================================\n// STATE MANAGEMENT\n// ============================================\nclass AppState {\n  constructor() {\n    this.flowType = null;\n    this.addressSearched = {};\n    this.materialSelected = null;\n    this.uniqueId = this.generateUniqueCode();\n    this.addCount = 0;\n  }\n\n  generateUniqueCode() {\n    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n    return Array.from({ length: 6 }, () => \n      characters.charAt(Math.floor(Math.random() * characters.length))\n    ).join('');\n  }\n}\n\nconst appState = new AppState();\n\n// ============================================\n// UTILITY FUNCTIONS\n// ============================================\nconst utils = {\n  scrollToTop() {\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  },\n\n  formatNumber(num) {\n    return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n  },\n\n  showElement(selector) {\n    document.querySelector(selector)?.classList.remove('is--hidden');\n  },\n\n  hideElement(selector) {\n    document.querySelector(selector)?.classList.add('is--hidden');\n  },\n\n  extractAddressComponents(response) {\n    if (!response?.features?.length) return null;\n\n    const feature = response.features[0];\n    const components = {\n      short_address: '',\n      city: '',\n      state: '',\n      zip: ''\n    };\n\n    if (feature.address && feature.text) {\n      components.short_address = `${feature.address} ${feature.text}`;\n    }\n\n    feature.context?.forEach(context => {\n      if (context.id.startsWith('place.')) components.city = context.text;\n      else if (context.id.startsWith('region.')) components.state = context.text;\n      else if (context.id.startsWith('postcode.')) components.zip = context.text;\n    });\n\n    return components;\n  },\n\n  async validatePhoneNumber(phone) {\n    const apiUrl = `https://api-bdc.net/data/phone-number-validate?number=${encodeURIComponent(phone)}&countryCode=us&localityLanguage=en&key=${CONFIG.apiKey}`;\n    \n    try {\n      const response = await fetch(apiUrl);\n      const data = await response.json();\n      return data.isValid;\n    } catch (error) {\n      console.error('Phone validation error:', error);\n      return false;\n    }\n  }\n};\n\n// ============================================\n// MAPBOX INITIALIZATION\n// ============================================\nclass MapboxManager {\n  constructor() {\n    if (!mapboxgl.accessToken) {\n      mapboxgl.accessToken = CONFIG.mapboxToken;\n    }\n  }\n\n  initializeGeocoder(container, geocodeWrapper, geocodeLoader) {\n    const geocoder = new MapboxGeocoder({\n      accessToken: mapboxgl.accessToken,\n      countries: 'us',\n      filter: (item) => {\n        return item.context?.some(i => \n          CONFIG.allowedRegions.includes(i.text) && i.id.split('.').shift() === 'region'\n        );\n      },\n      mapboxgl: mapboxgl\n    });\n\n    geocoder.addTo(container);\n    geocodeLoader.style.display = 'none';\n    container.style.display = 'block';\n\n    // Set placeholder\n    const input = geocodeWrapper.querySelector('.mapboxgl-ctrl-geocoder--input');\n    if (input) input.placeholder = 'Type your street address';\n\n    // Handle loading state\n    geocoder.on('loading', () => {\n      $(container).css('margin-bottom', '40vh');\n    });\n\n    // Handle results\n    geocoder.on('result', (e) => {\n      $(container).css('margin-bottom', '0');\n      this.handleGeocoderResult(e, geocodeWrapper);\n    });\n\n    return geocoder;\n  }\n\n  handleGeocoderResult(e, geocodeWrapper) {\n    const { place_name: fullAddress, geometry, context } = e.result;\n    const addressComponents = {};\n\n    context?.forEach(ctx => {\n      if (ctx.id.startsWith('place.')) addressComponents.city = ctx.text;\n      else if (ctx.id.startsWith('region.')) addressComponents.state = ctx.text;\n      else if (ctx.id.startsWith('postcode.')) addressComponents.zip = ctx.text;\n    });\n\n    if (appState.flowType === 'single') {\n      appState.addressSearched[1] = {\n        address: fullAddress,\n        coordinates: geometry.coordinates,\n        short_address: addressComponents\n      };\n    } else {\n      const addressNumber = geocodeWrapper.querySelector('[data-elem=\"add-sus\"]')?.textContent.trim();\n      appState.addressSearched[addressNumber] = {\n        address: fullAddress,\n        coordinates: geometry.coordinates,\n        short_address: addressComponents\n      };\n    }\n\n    this.showSizeScreen();\n  }\n\n  showSizeScreen() {\n    utils.scrollToTop();\n    \n    if (appState.flowType === 'multiple') {\n      utils.hideElement('[data-elem=\"geocoder-wrap\"]');\n      utils.showElement('[data-elem=\"multi-map-wrap\"]');\n    } else {\n      utils.showElement('[data-elem=\"size-wrap\"]');\n      utils.hideElement('[data-elem=\"geocoder-wrap\"]');\n    }\n\n    this.processAddresses();\n  }\n\n  processAddresses() {\n    Object.entries(appState.addressSearched).forEach(([key, addressInfo], index) => {\n      const { coordinates } = addressInfo;\n      const mapContainer = `map${key.trim()}`;\n      const containerEle = document.getElementById(mapContainer);\n\n      if (containerEle) {\n        setTimeout(() => {\n          this.initMap(\n            coordinates[0], \n            coordinates[1], \n            mapContainer, \n            coordinates, \n            addressInfo, \n            key.trim()\n          );\n        }, 500 * Number(key.trim()));\n      }\n    });\n  }\n\n  initMap(lng, lat, mapContainer, coordinates, addressInfo, mapKey) {\n    const mapParentNode = document.querySelector(`#${mapContainer}`).parentNode;\n    const infoWrap = mapParentNode.querySelector('.info_wrap');\n    const addressText = infoWrap?.children[0];\n    const searchedArea = infoWrap?.children[1];\n    const mapControlWrap = mapParentNode.querySelector('.map__info');\n    const mapControlPrompt1 = mapControlWrap?.querySelector('[data-button=\"prompt-1\"]');\n    const mapControlEdit = mapControlPrompt1?.querySelector('[data-elem=\"adjust\"]');\n    const mapControlReset = mapControlPrompt1?.querySelector('[data-elem=\"reset-polygon\"]');\n\n    if (addressText) addressText.textContent = addressInfo.address;\n\n    // Create map instance\n    const map = new mapboxgl.Map({\n      container: mapContainer,\n      style: 'mapbox://styles/improveitmd/cl5jie1h3002814p935vxte0t',\n      center: [lng, lat],\n      zoom: 19,\n      minZoom: 16\n    });\n\n    // Reverse geocode function\n    const reverseGeocode = (lat, lng, callback) => {\n      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;\n\n      fetch(url)\n        .then(response => response.json())\n        .then(data => {\n          if (data?.features?.length > 0) {\n            const addressFull = utils.extractAddressComponents(data);\n            appState.addressSearched[mapKey].address_info = addressFull;\n            callback(data.features[0].place_name);\n          } else {\n            callback('Address not found');\n          }\n        })\n        .catch(error => {\n          console.error('Reverse geocoding error:', error);\n          callback('Error retrieving address');\n        });\n    };\n\n    // Calculate centroid\n    const getCentroid = (polygon) => {\n      let totalArea = 0;\n      let centroidX = 0;\n      let centroidY = 0;\n      const points = polygon.geometry.coordinates[0];\n\n      for (let i = 0; i < points.length - 1; i++) {\n        const [x1, y1] = points[i];\n        const [x2, y2] = points[i + 1];\n        const trapezoidArea = (x1 * y2 - x2 * y1);\n        \n        totalArea += trapezoidArea;\n        centroidX += (x1 + x2) * trapezoidArea;\n        centroidY += (y1 + y2) * trapezoidArea;\n      }\n\n      totalArea *= 0.5;\n      centroidX = centroidX / (6 * totalArea);\n      centroidY = centroidY / (6 * totalArea);\n\n      return { lat: centroidY, lng: centroidX };\n    };\n\n    // Create bounding box polygon\n    const createBoundingBox = (center) => {\n      const point = map.project(center);\n      const val = 83; // Size for ~1000 sq ft\n\n      const points = [\n        [point.x - val, point.y + val],\n        [point.x + val, point.y + val],\n        [point.x + val, point.y - val],\n        [point.x - val, point.y - val],\n        [point.x - val, point.y + val]\n      ];\n\n      const lngLatCoordinates = points.map(p => {\n        const { lng, lat } = map.unproject(p);\n        return [lng, lat];\n      });\n\n      return {\n        type: \"Feature\",\n        geometry: {\n          type: \"Polygon\",\n          coordinates: [lngLatCoordinates]\n        },\n        properties: {\n          underground: \"false\",\n          extrude: \"true\",\n          height: 10,\n          min_height: 0,\n          type: \"building\"\n        },\n        id: 'new_polygon'\n      };\n    };\n\n    // Custom static mode (no interaction)\n    const staticMode = {\n      onSetup: function(opts) {\n        return { count: opts.count || 0 };\n      },\n      toDisplayFeatures: function(state, geojson, display) {\n        display(geojson);\n      }\n    };\n\n    // Custom polygon creation mode\n    const createPolygonMode = {\n      onSetup: function(opts) {\n        return { count: opts.count || 0 };\n      },\n      onClick: function(state, e) {\n        const features = map.queryRenderedFeatures(e.point);\n        const displayProperties = ['geometry', 'polygon', 'features', 'type', 'properties', 'id', 'layer', 'source', 'sourceLayer', 'state'];\n        \n        const displayFeatures = features.map(feat => {\n          const displayFeat = {};\n          displayProperties.forEach(prop => {\n            displayFeat[prop] = feat[prop];\n          });\n          return displayFeat;\n        });\n\n        const polygon = this.newFeature(displayFeatures[0]);\n        this.addFeature(polygon);\n      },\n      onTap: function(state, e) {\n        this.onClick(state, e);\n      },\n      toDisplayFeatures: function(state, geojson, display) {\n        display(geojson);\n      }\n    };\n\n    // Initialize MapboxDraw\n    const draw = new MapboxDraw({\n      userProperties: true,\n      styles: this.getDrawStyles('#00F17F'),\n      displayControlsDefault: false,\n      defaultMode: 'lots_of_points',\n      modes: Object.assign({\n        lots_of_points: createPolygonMode,\n        static_mode: staticMode,\n      }, MapboxDraw.modes)\n    });\n\n    map.addControl(draw);\n\n    // Update area display\n    const updateArea = (areaElement) => {\n      const data = draw.getAll();\n      if (!data.features.length) return;\n\n      const area = turf.area(data);\n      const areaInFeet = area * 10.763911105;\n      const roundedArea = Math.round(areaInFeet);\n\n      if (areaElement) {\n        areaElement.textContent = `${utils.formatNumber(roundedArea)} ft²`;\n      }\n\n      // Update state\n      appState.addressSearched[mapKey].areaInFeet = roundedArea;\n      appState.addressSearched[mapKey].areaInMeter = Math.round(area);\n    };\n\n    // Update address on polygon change\n    const updateAddress = () => {\n      const data = draw.getAll();\n      if (!data.features.length) return;\n\n      const centroid = getCentroid(data.features[0]);\n      \n      reverseGeocode(centroid.lat, centroid.lng, (address) => {\n        appState.addressSearched[mapKey].address = address;\n        appState.addressSearched[mapKey].coordinates = centroid;\n\n        if (addressText) {\n          addressText.textContent = address;\n        }\n      });\n    };\n\n    // Map load event\n    map.on('load', () => {\n      const point = map.project(coordinates);\n      const width = 50;\n      const height = 50;\n\n      const bbox = [\n        [point.x - width / 2, point.y - height / 2],\n        [point.x + width / 2, point.y + height / 2]\n      ];\n\n      const features = map.queryRenderedFeatures(bbox);\n      const buildingFeatures = features.filter(f => f.layer.id === 'building');\n\n      if (buildingFeatures.length > 0) {\n        // Building found - add it and set to static mode\n        const feature = buildingFeatures[0];\n        const displayFeat = {};\n        ['geometry', 'type', 'properties', 'id'].forEach(prop => {\n          displayFeat[prop] = feature[prop];\n        });\n\n        draw.add(displayFeat);\n        const data = draw.getAll();\n        \n        setTimeout(() => {\n          draw.changeMode('static_mode', {\n            featureId: data.features[0].id\n          });\n        }, 1000);\n      } else {\n        // No building - create bounding box and allow editing\n        draw.add(createBoundingBox(coordinates));\n        const data = draw.getAll();\n        \n        setTimeout(() => {\n          draw.changeMode('direct_select', {\n            featureId: data.features[0].id\n          });\n        }, 1000);\n      }\n\n      updateArea(searchedArea);\n    });\n\n    // Map events\n    map.on('draw.update', () => {\n      updateArea(searchedArea);\n      updateAddress();\n    });\n\n    map.on('idle', () => {\n      map.resize();\n    });\n\n    // Edit button handler\n    const handleEdit = () => {\n      const data = draw.getAll();\n      if (!data.features.length) return;\n\n      const polygonLength = data.features[0].geometry.coordinates[0].length;\n\n      if (polygonLength <= 35) {\n        draw.changeMode('direct_select', {\n          featureId: data.features[0].id\n        });\n      } else {\n        // Polygon too complex - reset to bounding box\n        draw.deleteAll();\n        draw.add(createBoundingBox(coordinates));\n        const newData = draw.getAll();\n        \n        setTimeout(() => {\n          draw.changeMode('direct_select', {\n            featureId: newData.features[0].id\n          });\n        }, 1000);\n      }\n    };\n\n    // Reset button handler\n    const handleReset = () => {\n      draw.deleteAll();\n      draw.add(createBoundingBox(coordinates));\n      const data = draw.getAll();\n      \n      draw.changeMode('direct_select', {\n        featureId: data.features[0].id\n      });\n    };\n\n    // Continue button handler\n    const handleContinue = () => {\n      utils.scrollToTop();\n      \n      if (appState.flowType === 'single') {\n        utils.hideElement('[data-elem=\"size-wrap\"]');\n        utils.showElement('[data-elem=\"material-wrap\"]');\n      } else {\n        utils.hideElement('[data-elem=\"multi-map-wrap\"]');\n        utils.showElement('[data-elem=\"material-wrap\"]');\n      }\n    };\n\n    // Next button for multi-flow\n    const nextButton2nd = document.querySelector('[data-elem=\"2nd-next-button\"]');\n    nextButton2nd?.addEventListener('click', handleContinue);\n\n    // Attach event listeners based on flow type\n    if (appState.flowType === 'multiple') {\n      mapControlEdit?.addEventListener('click', handleEdit);\n      mapControlReset?.addEventListener('click', handleReset);\n    } else {\n      document.querySelector('#editBtn')?.addEventListener('click', handleEdit);\n      document.querySelector('#continue')?.addEventListener('click', handleContinue);\n      document.querySelector('#proceed')?.addEventListener('click', handleContinue);\n      document.querySelector('#resetBtn')?.addEventListener('click', handleReset);\n    }\n\n    // Check for polygon and switch to static mode when ready\n    const checkPolygon = () => {\n      const data = draw.getAll();\n      if (data.features.length === 1) {\n        draw.changeMode('static_mode');\n        clearInterval(intervalFn);\n      }\n    };\n\n    const intervalFn = setInterval(checkPolygon, 200);\n  }\n\n  // Helper method for draw styles\n  getDrawStyles(color) {\n    return [\n      {\n        'id': 'gl-draw-polygon-fill-inactive',\n        'type': 'fill',\n        'filter': ['all',\n          ['==', 'active', 'false'],\n          ['==', '$type', 'Polygon'],\n          ['!=', 'mode', 'static']\n        ],\n        'paint': {\n          'fill-color': color,\n          'fill-outline-color': color,\n          'fill-opacity': 0.3\n        }\n      },\n      {\n        'id': 'gl-draw-polygon-fill-active',\n        'type': 'fill',\n        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],\n        'paint': {\n          'fill-color': color,\n          'fill-outline-color': color,\n          'fill-opacity': 0.3\n        }\n      },\n      {\n        'id': 'gl-draw-polygon-stroke-inactive',\n        'type': 'line',\n        'filter': ['all',\n          ['==', 'active', 'false'],\n          ['==', '$type', 'Polygon'],\n          ['!=', 'mode', 'static']\n        ],\n        'layout': {\n          'line-cap': 'round',\n          'line-join': 'round'\n        },\n        'paint': {\n          'line-color': color,\n          'line-width': 2\n        }\n      },\n      {\n        'id': 'gl-draw-polygon-stroke-active',\n        'type': 'line',\n        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],\n        'layout': {\n          'line-cap': 'round',\n          'line-join': 'round'\n        },\n        'paint': {\n          'line-color': color,\n          'line-width': 2\n        }\n      },\n      {\n        'id': 'gl-draw-line-inactive',\n        'type': 'line',\n        'filter': ['all',\n          ['==', 'active', 'false'],\n          ['==', '$type', 'LineString'],\n          ['!=', 'mode', 'static']\n        ],\n        'layout': {\n          'line-cap': 'round',\n          'line-join': 'round'\n        },\n        'paint': {\n          'line-color': color,\n          'line-width': 2\n        }\n      },\n      {\n        'id': 'gl-draw-line-active',\n        'type': 'line',\n        'filter': ['all',\n          ['==', '$type', 'LineString'],\n          ['==', 'active', 'true']\n        ],\n        'layout': {\n          'line-cap': 'round',\n          'line-join': 'round'\n        },\n        'paint': {\n          'line-color': color,\n          'line-width': 2\n        }\n      },\n      {\n        'id': 'gl-draw-polygon-and-line-vertex-inactive',\n        'type': 'circle',\n        'filter': ['all',\n          ['==', 'meta', 'vertex'],\n          ['==', '$type', 'Point'],\n          ['!=', 'mode', 'static']\n        ],\n        'paint': {\n          'circle-radius': 5,\n          'circle-color': '#fff'\n        }\n      },\n      {\n        'id': 'gl-draw-polygon-and-line-vertex-active',\n        'type': 'circle',\n        'filter': ['all',\n          ['==', 'meta', 'vertex'],\n          ['==', '$type', 'Point']\n        ],\n        'paint': {\n          'circle-radius': 7,\n          'circle-color': color\n        }\n      }\n    ];\n  }\n}\n\n// ============================================\n// FLOW MANAGEMENT\n// ============================================\nclass FlowManager {\n  constructor() {\n    this.mapboxManager = new MapboxManager();\n  }\n\n  init() {\n    const singleOption = document.querySelector('[data-elem=\"single-option\"]');\n    const multiOption = document.querySelector('[data-elem=\"multi-option\"]');\n\n    singleOption?.addEventListener('click', () => this.showFlow('single'));\n    multiOption?.addEventListener('click', () => this.showFlow('multiple'));\n\n    this.setupMaterialSelection();\n    this.setupFormSubmission();\n  }\n\n  showFlow(type) {\n    appState.flowType = type;\n    utils.hideElement('[data-elem=\"first-screen\"]');\n\n    if (type === 'single') {\n      utils.showElement('[data-elem=\"2nd-screen-single\"]');\n      document.querySelector('[data-elem=\"2nd-screen-multi\"]')?.remove();\n      this.initializeSingleGeocoder();\n    } else {\n      utils.showElement('[data-elem=\"2nd-screen-multi\"]');\n      document.querySelector('[data-elem=\"2nd-screen-single\"]')?.remove();\n      this.initializeMultiGeocoders();\n    }\n  }\n\n  initializeSingleGeocoder() {\n    const wrapper = document.querySelector('[data-elem=\"2nd-screen-single\"]');\n    const geocodeWrap = wrapper?.querySelector('[data-elem=\"geocoder-wrap\"]');\n    const geocoder = geocodeWrap?.querySelector('[data-elem=\"geocoder\"]');\n    const loader = geocodeWrap?.querySelector('.geocoder_loader');\n\n    if (geocoder && loader) {\n      this.mapboxManager.initializeGeocoder(geocoder, geocodeWrap, loader);\n    }\n  }\n\n  initializeMultiGeocoders() {\n    const wrapper = document.querySelector('[data-elem=\"2nd-screen-multi\"]');\n    const geocodeWraps = wrapper?.querySelectorAll('[data-elem=\"geocode-wrap\"]');\n\n    geocodeWraps?.forEach(wrap => {\n      const geocoder = wrap.querySelector('[data-elem=\"geocoder\"]');\n      const loader = wrap.querySelector('.geocoder_loader');\n\n      if (geocoder && loader) {\n        this.mapboxManager.initializeGeocoder(geocoder, wrap, loader);\n      }\n    });\n  }\n\n  setupMaterialSelection() {\n    // Use event delegation\n    document.addEventListener('click', (e) => {\n      const radio = e.target.closest('input[name=\"material\"]');\n      if (!radio) return;\n\n      appState.materialSelected = radio.value;\n      this.updatePricing();\n      utils.hideElement('[data-elem=\"material-wrap\"]');\n      utils.showElement('[data-elem=\"form-wrap\"]');\n    });\n  }\n\n  updatePricing() {\n    const wasteFactor = appState.materialSelected === 'TPO' ? 1 : 1.10;\n    \n    Object.entries(appState.addressSearched).forEach(([key, data]) => {\n      const sqFoot = Number(data.areaInFeet);\n      const materialCalc = ((sqFoot * wasteFactor) * 0.10) + (sqFoot * wasteFactor);\n      const rates = PRICING[appState.materialSelected] || PRICING.Standard;\n      \n      let [lowRate, highRate] = rates;\n      let extraCharge = sqFoot <= 1000 ? 1000 : 0;\n\n      data.lowPrice = (materialCalc * lowRate) + extraCharge;\n      data.highPrice = (materialCalc * highRate) + extraCharge;\n    });\n  }\n\n  setupFormSubmission() {\n    document.addEventListener('submit', async (e) => {\n      const form = e.target.closest('[data-form=\"commercial\"]');\n      if (!form) return;\n\n      e.preventDefault();\n\n      const phone = form.querySelector('[data-elem=\"phone\"]')?.value;\n      const name = form.querySelector('[data-elem=\"name\"]')?.value;\n      \n      if (!phone || !name) return;\n\n      const cleanPhone = phone.replace(/\\D/g, '');\n      const isValid = await utils.validatePhoneNumber(cleanPhone);\n\n      if (!isValid) {\n        alert('Please enter a valid phone number');\n        return;\n      }\n\n      // Submit form data\n      await this.submitFormData(name, phone);\n      \n      // Show results\n      utils.hideElement('[data-elem=\"form-wrap\"]');\n      utils.showElement('[data-elem=\"results-wrap-multi\"]');\n      this.displayResults();\n    });\n  }\n\n  async submitFormData(name, phone) {\n    const fields = {\n      name,\n      phone,\n      id: appState.uniqueId,\n      selected_material: appState.materialSelected\n    };\n\n    let totalAreaFt = 0;\n    let totalAreaMt = 0;\n\n    // Add address data\n    Object.entries(appState.addressSearched).forEach(([key, data]) => {\n      fields[`address_${key}`] = data.address;\n      fields[`area_ft_${key}`] = data.areaInFeet;\n      fields[`area_mt_${key}`] = data.areaInMeter;\n      totalAreaFt += Number(data.areaInFeet);\n      totalAreaMt += Number(data.areaInMeter);\n    });\n\n    fields.total_area_ft = utils.formatNumber(totalAreaFt);\n    fields.total_area_mt = totalAreaMt.toFixed(1);\n\n    // Send as JSON to API\n    try {\n      const response = await fetch(CONFIG.apiEndpoint, {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n          'Origin': window.location.origin\n        },\n        body: JSON.stringify(fields)\n      });\n\n      if (!response.ok) throw new Error('Request failed');\n      \n      const result = await response.json();\n      console.log('Success:', result);\n    } catch (error) {\n      console.error('Submission error:', error);\n    }\n  }\n\n  displayResults() {\n    utils.scrollToTop();\n\n    // Set material title\n    const materialMap = {\n      'Silicone': 'Silicone Roof Coating',\n      'TPO': 'TPO Flat Roofing',\n      'Asphalt': 'Asphalt Roofing',\n      'Standard': 'Standard Roofing'\n    };\n\n    const priceTag = document.querySelector('[data-elem=\"material-selected\"]');\n    if (priceTag) {\n      priceTag.textContent = materialMap[appState.materialSelected] || materialMap.Standard;\n    }\n\n    // Clone and populate address pricing\n    const template = document.querySelector('[data-elem=\"address-pricing-wrap\"]');\n    const parent = template?.parentNode;\n    \n    if (!template || !parent) return;\n\n    template.remove();\n\n    Object.values(appState.addressSearched).forEach(data => {\n      const clone = template.cloneNode(true);\n      clone.querySelector('[data-elem=\"results-address\"]').textContent = data.address;\n      clone.querySelector('[data-elem=\"lowPrice\"]').textContent = utils.formatNumber(Math.round(data.lowPrice));\n      clone.querySelector('[data-elem=\"highPrice\"]').textContent = utils.formatNumber(Math.round(data.highPrice));\n      parent.appendChild(clone);\n    });\n\n    // Set unique ID for second form\n    document.querySelector('#second-form-id')?.setAttribute('value', appState.uniqueId);\n  }\n}\n\n// ============================================\n// INITIALIZATION\n// ============================================\ndocument.addEventListener('DOMContentLoaded', () => {\n  const flowManager = new FlowManager();\n  flowManager.init();\n});\n\n</script>"}
className={`w-html-embed`} />
</div>
</Slot>
<HtmlEmbed
code={"<style>\n/* RESET */\n* {\n  margin: 0;\n  scroll-behavior: smooth;\n}\n\n/* Prevent events on closed sheet */\n.viewport-container {\n  pointer-events: none !important;\n}\n.viewport-container .menu-viewport[data-state=\"open\"] {\n  pointer-events: auto !important;\n}\n\n\n/* COLLAPSIBLE ANIMATION  */\n.CollapsibleContent {\n  overflow: hidden;\n}\n.CollapsibleContent[data-state=\"open\"] {\n  animation: collapseSlideDown 300ms ease;\n}\n.CollapsibleContent[data-state=\"closed\"] {\n  animation: collapseSlideUp 300ms ease;\n}\n\n@keyframes collapseSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-collapsible-content-height); }\n}\n\n@keyframes collapseSlideUp {\n  from { height: var(--radix-collapsible-content-height); }\n  to { height: 0; }\n}\n\n\n/* ACCORDION ANIMATION  */\n.AccordionContent {\n  overflow: hidden;\n}\n.AccordionContent[data-state=\"open\"] {\n  animation: accordionSlideDown 300ms ease-out;\n}\n.AccordionContent[data-state=\"closed\"] {\n  animation: accordionSlideUp 300ms ease-out;\n}\n\n@keyframes accordionSlideDown {\n  from { height: 0; }\n  to { height: var(--radix-accordion-content-height); }\n}\n\n@keyframes accordionSlideUp {\n  from { height: var(--radix-accordion-content-height); }\n  to { height: 0; }\n}\n\n/* Accordion Header active state color change */\n.AccordionTrigger {\n  transition: color 250ms ease; /* optional smooth fade */\n}\n\n.AccordionTrigger.Firebrick[data-state=\"open\"] {\n  color: var(--firebrick);\n}\n\n/* Accordion Cross Icon rotate  */\n.CrossIconLine {\n  transform-origin: center;\n  transform: rotate(0deg);\n  transition: transform 250ms ease;\n}\n\n.AccordionCross[data-state=\"open\"] .CrossIconLine {\n  transform: rotate(90deg);\n}\n  \n/* READ MORE TRANSITION   */\n.read-more-content {\n  opacity: 0;\n  max-height: 0;\n  overflow: hidden;\n  transition: opacity 0.3s ease, max-height 0.3s ease;\n}\n\n.read-more-content.is-visible {\n  opacity: 1;\n  max-height: 500px;\n}\n\n /* Collapsible Chevron rotate on open  */\n.CollapsibleChevron {\n  transition: transform 250ms ease;\n}\n\n.CollapsibleTrigger[data-state=\"open\"] .CollapsibleChevron {\n  transform: rotate(180deg);\n}\n\n  /* Responsive Map CSS  */\n.responsive-map {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%; /* 4:3 aspect ratio (480/640 = 0.75) */\n  overflow: hidden;\n}\n\n.responsive-map iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important;\n  border: 0;\n}\n/* For mobile portrait (smaller screens) */\n@media screen and (max-width: 768px) {\n  .responsive-map {\n    padding-bottom: 100%; /* Make it more square on mobile */\n    margin: 10px 0; /* Add some vertical spacing */\n  }\n}\n\n/* For very small screens */\n@media screen and (max-width: 480px) {\n  .responsive-map {\n    padding-bottom: 120%; /* Taller aspect ratio for very small screens */\n  }\n}\n  \n/* Asphalt Roofing product top row padding removal  */\n@media only screen and (max-width: 1279px) {\n\t.product-top-row {\n\t\tpadding-right: 0rem;\n\t}\n}\n\n  /* Commercial Roofing Paragraph & Grid reveal  */\n.commercial-grid {\n  display: none;\n}\n  \n.commercial-paragraph {\n  display: none;\n}\n\n.commercial-wrapper.is-expanded .commercial-paragraph {\n  display: block;\n}\n  \n.commercial-wrapper.is-expanded .commercial-grid {\n  display: grid;\n} \n  \n.commercial-wrapper.is-expanded .commercial-read-more {\n  display: none;\n}\n  \n@media (max-width: 479px) {\n  .commercial-grid {\n    display: none !important;\n  }\n}\n\n/* class for display:none  */\n.is--hidden {\n  display: none;\n}\n  \n</style>"}
clientOnly={true}
className={`w-html-embed`} />
<Box
tag={"main"}
className={`w-box`}>
<Slot>
<Fragment_1>
<section
className={`w-element`}>
<div
className={`w-element cv4mf0f`}>
<HtmlEmbed
clientOnly={true}
code={"<style>\n\n\n.mapboxgl-map {\n    font: 12px/20px Helvetica Neue, Arial, Helvetica, sans-serif;\n    overflow: hidden;\n    position: relative;\n    -webkit-tap-highlight-color: rgb(0 0 0/0);\n}\n.mapboxgl-canvas {\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n.mapboxgl-map:-webkit-full-screen {\n    width: 100%;\n    height: 100%;\n}\n.mapboxgl-canary {\n    background-color: salmon;\n}\n.mapboxgl-canvas-container.mapboxgl-interactive,\n.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass {\n    cursor: grab;\n    -webkit-user-select: none;\n    user-select: none;\n}\n.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer {\n    cursor: pointer;\n}\n.mapboxgl-canvas-container.mapboxgl-interactive:active,\n.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active {\n    cursor: grabbing;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas {\n    touch-action: pan-x pan-y;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,\n.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas {\n    touch-action: pinch-zoom;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan\n    .mapboxgl-canvas {\n    touch-action: none;\n}\n.mapboxgl-ctrl-bottom-left,\n.mapboxgl-ctrl-bottom-right,\n.mapboxgl-ctrl-top-left,\n.mapboxgl-ctrl-top-right {\n    position: absolute;\n    pointer-events: none;\n    z-index: 2;\n}\n.mapboxgl-ctrl-top-left {\n    top: 0;\n    left: 0;\n}\n.mapboxgl-ctrl-top-right {\n    top: 0;\n    right: 0;\n}\n.mapboxgl-ctrl-bottom-left {\n    bottom: 0;\n    left: 0;\n}\n.mapboxgl-ctrl-bottom-right {\n    right: 0;\n    bottom: 0;\n}\n.mapboxgl-ctrl {\n    clear: both;\n    pointer-events: auto;\n    transform: translate(0);\n}\n.mapboxgl-ctrl-top-left .mapboxgl-ctrl {\n    margin: 10px 0 0 10px;\n    float: left;\n}\n.mapboxgl-ctrl-top-right .mapboxgl-ctrl {\n    margin: 10px 10px 0 0;\n    float: right;\n}\n.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {\n    margin: 0 0 10px 10px;\n    float: left;\n}\n.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {\n    margin: 0 10px 10px 0;\n    float: right;\n}\n.mapboxgl-ctrl-group {\n    border-radius: 4px;\n    background: #fff;\n}\n.mapboxgl-ctrl-group:not(:empty) {\n    box-shadow: 0 0 0 2px rgb(0 0 0/10%);\n}\n@media (-ms-high-contrast: active) {\n    .mapboxgl-ctrl-group:not(:empty) {\n        box-shadow: 0 0 0 2px ButtonText;\n    }\n}\n.mapboxgl-ctrl-group button {\n    width: 29px;\n    height: 29px;\n    display: block;\n    padding: 0;\n    outline: none;\n    border: 0;\n    box-sizing: border-box;\n    background-color: transparent;\n    cursor: pointer;\n    overflow: hidden;\n}\n.mapboxgl-ctrl-group button + button {\n    border-top: 1px solid #ddd;\n}\n.mapboxgl-ctrl button .mapboxgl-ctrl-icon {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background-repeat: no-repeat;\n    background-position: 50%;\n}\n@media (-ms-high-contrast: active) {\n    .mapboxgl-ctrl-icon {\n        background-color: transparent;\n    }\n    .mapboxgl-ctrl-group button + button {\n        border-top: 1px solid ButtonText;\n    }\n}\n.mapboxgl-ctrl-attrib-button:focus,\n.mapboxgl-ctrl-group button:focus {\n    box-shadow: 0 0 2px 2px rgb(0 150 255/100%);\n}\n.mapboxgl-ctrl button:disabled {\n    cursor: not-allowed;\n}\n.mapboxgl-ctrl button:disabled .mapboxgl-ctrl-icon {\n    opacity: 0.25;\n}\n.mapboxgl-ctrl-group button:first-child {\n    border-radius: 4px 4px 0 0;\n}\n.mapboxgl-ctrl-group button:last-child {\n    border-radius: 0 0 4px 4px;\n}\n.mapboxgl-ctrl-group button:only-child {\n    border-radius: inherit;\n}\n.mapboxgl-ctrl button:not(:disabled):hover {\n    background-color: rgb(0 0 0/5%);\n}\n.mapboxgl-ctrl-group button:focus:focus-visible {\n    box-shadow: 0 0 2px 2px rgb(0 150 255/100%);\n}\n.mapboxgl-ctrl-group button:focus:not(:focus-visible) {\n    box-shadow: none;\n}\n.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E %3C/svg%3E\");\n}\n@media (-ms-high-contrast: active) {\n    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E %3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E %3C/svg%3E\");\n    }\n    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E %3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E %3C/svg%3E\");\n    }\n}\n@media (-ms-high-contrast: black-on-white) {\n    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23000'%3E %3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E %3C/svg%3E\");\n    }\n    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23000'%3E %3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E %3C/svg%3E\");\n    }\n}\n.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E %3C/svg%3E\");\n}\n@media (-ms-high-contrast: active) {\n    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E %3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E %3C/svg%3E\");\n    }\n    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E %3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E %3C/svg%3E\");\n    }\n}\n@media (-ms-high-contrast: black-on-white) {\n    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23000'%3E %3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E %3C/svg%3E\");\n    }\n    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23000'%3E %3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E %3C/svg%3E\");\n    }\n}\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n\n.mapboxgl-ctrl.mapboxgl-ctrl-attrib {\n    padding: 0 5px;\n    background-color: rgb(255 255 255/50%);\n    margin: 0;\n}\n\n@media screen {\n    .mapboxgl-ctrl-attrib.mapboxgl-compact {\n        min-height: 20px;\n        padding: 2px 24px 2px 0;\n        margin: 10px;\n        position: relative;\n        background-color: #fff;\n        border-radius: 12px;\n    }\n    .mapboxgl-ctrl-attrib.mapboxgl-compact-show {\n        padding: 2px 28px 2px 8px;\n        visibility: visible;\n    }\n    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact-show,\n    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact-show {\n        padding: 2px 8px 2px 28px;\n        border-radius: 12px;\n    }\n    .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-inner {\n        display: none;\n    }\n    .mapboxgl-ctrl-attrib-button {\n        display: none;\n        cursor: pointer;\n        position: absolute;\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E %3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E %3C/svg%3E\");\n        background-color: rgb(255 255 255/50%);\n        width: 24px;\n        height: 24px;\n        box-sizing: border-box;\n        border-radius: 12px;\n        outline: none;\n        top: 0;\n        right: 0;\n        border: 0;\n    }\n    .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl-attrib-button,\n    .mapboxgl-ctrl-top-left .mapboxgl-ctrl-attrib-button {\n        left: 0;\n    }\n    .mapboxgl-ctrl-attrib.mapboxgl-compact-show .mapboxgl-ctrl-attrib-inner,\n    .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-button {\n        display: block;\n    }\n    .mapboxgl-ctrl-attrib.mapboxgl-compact-show .mapboxgl-ctrl-attrib-button {\n        background-color: rgb(0 0 0/5%);\n    }\n    .mapboxgl-ctrl-bottom-right > .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        bottom: 0;\n        right: 0;\n    }\n    .mapboxgl-ctrl-top-right > .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        top: 0;\n        right: 0;\n    }\n    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        top: 0;\n        left: 0;\n    }\n    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        bottom: 0;\n        left: 0;\n    }\n}\n@media screen and (-ms-high-contrast: active) {\n    .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' fill='%23fff'%3E %3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E %3C/svg%3E\");\n    }\n}\n@media screen and (-ms-high-contrast: black-on-white) {\n    .mapboxgl-ctrl-attrib.mapboxgl-compact:after {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E %3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E %3C/svg%3E\");\n    }\n}\n\n\n.mapboxgl-ctrl-attrib a {\n    color: rgb(0 0 0/75%);\n    text-decoration: none;\n}\n.mapboxgl-ctrl-attrib a:hover {\n    color: inherit;\n    text-decoration: underline;\n}\n.mapboxgl-ctrl-attrib .mapbox-improve-map {\n    font-weight: 700;\n    margin-left: 2px;\n}\n.mapboxgl-attrib-empty {\n    display: none;\n}\n\n.mapboxgl-ctrl-scale {\n    background-color: rgb(255 255 255/75%);\n    font-size: 10px;\n    border: 2px solid #333;\n    border-top: #333;\n    padding: 0 5px;\n    color: #333;\n    box-sizing: border-box;\n    white-space: nowrap;\n}\n.mapboxgl-popup {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: flex;\n    will-change: transform;\n    pointer-events: none;\n}\n\n.mapboxgl-popup-anchor-top,\n.mapboxgl-popup-anchor-top-left,\n.mapboxgl-popup-anchor-top-right {\n    flex-direction: column;\n}\n.mapboxgl-popup-anchor-bottom,\n.mapboxgl-popup-anchor-bottom-left,\n.mapboxgl-popup-anchor-bottom-right {\n    flex-direction: column-reverse;\n}\n.mapboxgl-popup-anchor-left {\n    flex-direction: row;\n}\n.mapboxgl-popup-anchor-right {\n    flex-direction: row-reverse;\n}\n.mapboxgl-popup-tip {\n    width: 0;\n    height: 0;\n    border: 10px solid transparent;\n    z-index: 1;\n}\n.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {\n    align-self: center;\n    border-top: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {\n    align-self: flex-start;\n    border-top: none;\n    border-left: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {\n    align-self: flex-end;\n    border-top: none;\n    border-right: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {\n    align-self: center;\n    border-bottom: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {\n    align-self: flex-start;\n    border-bottom: none;\n    border-left: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {\n    align-self: flex-end;\n    border-bottom: none;\n    border-right: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {\n    align-self: center;\n    border-left: none;\n    border-right-color: #fff;\n}\n.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {\n    align-self: center;\n    border-right: none;\n    border-left-color: #fff;\n}\n.mapboxgl-popup-close-button {\n    position: absolute;\n    right: 0;\n    top: 0;\n    border: 0;\n    border-radius: 0 3px 0 0;\n    cursor: pointer;\n    background-color: transparent;\n}\n.mapboxgl-popup-close-button:hover {\n    background-color: rgb(0 0 0/5%);\n}\n.mapboxgl-popup-content {\n    position: relative;\n    background: #fff;\n    border-radius: 3px;\n    box-shadow: 0 1px 2px rgb(0 0 0/10%);\n    padding: 10px 10px 15px;\n    pointer-events: auto;\n}\n.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content {\n    border-top-left-radius: 0;\n}\n.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content {\n    border-top-right-radius: 0;\n}\n.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content {\n    border-bottom-left-radius: 0;\n}\n.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content {\n    border-bottom-right-radius: 0;\n}\n.mapboxgl-popup-track-pointer {\n    display: none;\n}\n.mapboxgl-popup-track-pointer * {\n    pointer-events: none;\n    user-select: none;\n}\n.mapboxgl-map:hover .mapboxgl-popup-track-pointer {\n    display: flex;\n}\n.mapboxgl-map:active .mapboxgl-popup-track-pointer {\n    display: none;\n}\n.mapboxgl-marker {\n    position: absolute;\n    top: 0;\n    left: 0;\n    will-change: transform;\n    opacity: 1;\n    transition: opacity 0.2s;\n}\n.mapboxgl-user-location-dot,\n.mapboxgl-user-location-dot:before {\n    background-color: #1da1f2;\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n}\n.mapboxgl-user-location-dot:before {\n    content: \"\";\n    position: absolute;\n    animation: mapboxgl-user-location-dot-pulse 2s infinite;\n}\n.mapboxgl-user-location-dot:after {\n    border-radius: 50%;\n    border: 2px solid #fff;\n    content: \"\";\n    height: 19px;\n    left: -2px;\n    position: absolute;\n    top: -2px;\n    width: 19px;\n    box-sizing: border-box;\n    box-shadow: 0 0 3px rgb(0 0 0/35%);\n}\n.mapboxgl-user-location-show-heading .mapboxgl-user-location-heading {\n    width: 0;\n    height: 0;\n}\n.mapboxgl-user-location-show-heading .mapboxgl-user-location-heading:after,\n.mapboxgl-user-location-show-heading .mapboxgl-user-location-heading:before {\n    content: \"\";\n    border-bottom: 7.5px solid #4aa1eb;\n    position: absolute;\n}\n.mapboxgl-user-location-show-heading .mapboxgl-user-location-heading:before {\n    border-left: 7.5px solid transparent;\n    transform: translateY(-28px) skewY(-20deg);\n}\n.mapboxgl-user-location-show-heading .mapboxgl-user-location-heading:after {\n    border-right: 7.5px solid transparent;\n    transform: translate(7.5px, -28px) skewY(20deg);\n}\n@keyframes mapboxgl-user-location-dot-pulse {\n    0% {\n        transform: scale(1);\n        opacity: 1;\n    }\n    70% {\n        transform: scale(3);\n        opacity: 0;\n    }\n    to {\n        transform: scale(1);\n        opacity: 0;\n    }\n}\n.mapboxgl-user-location-dot-stale {\n    background-color: #aaa;\n}\n.mapboxgl-user-location-dot-stale:after {\n    display: none;\n}\n.mapboxgl-user-location-accuracy-circle {\n    background-color: rgba(29, 161, 242, 0.2);\n    width: 1px;\n    height: 1px;\n    border-radius: 100%;\n}\n.mapboxgl-crosshair,\n.mapboxgl-crosshair .mapboxgl-interactive,\n.mapboxgl-crosshair .mapboxgl-interactive:active {\n    cursor: crosshair;\n}\n.mapboxgl-boxzoom {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    background: #fff;\n    border: 2px dotted #202020;\n    opacity: 0.5;\n}\n@media print {\n    .mapbox-improve-map {\n        display: none;\n    }\n}\n.mapboxgl-scroll-zoom-blocker,\n.mapboxgl-touch-pan-blocker {\n    color: #fff;\n    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,\n        sans-serif;\n    justify-content: center;\n    text-align: center;\n    position: absolute;\n    display: flex;\n    align-items: center;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgb(0 0 0/70%);\n    opacity: 0;\n    pointer-events: none;\n    transition: opacity 0.75s ease-in-out;\n    transition-delay: 1s;\n}\n.mapboxgl-scroll-zoom-blocker-show,\n.mapboxgl-touch-pan-blocker-show {\n    opacity: 1;\n    transition: opacity 0.1s ease-in-out;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-pan-blocker-override.mapboxgl-scrollable-page,\n.mapboxgl-canvas-container.mapboxgl-touch-pan-blocker-override.mapboxgl-scrollable-page\n    .mapboxgl-canvas {\n    touch-action: pan-x pan-y;\n}\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n\n@media (-ms-high-contrast: black-on-white) {\n    a.mapboxgl-ctrl-logo {\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E %3Cdefs%3E %3Cpath id='logo' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E %3Cpath id='text' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E %3C/defs%3E %3Cmask id='clip'%3E %3Crect x='0' y='0' width='100%25' height='100%25' fill='white'/%3E %3Cuse xlink:href='%23logo'/%3E %3Cuse xlink:href='%23text'/%3E %3C/mask%3E %3Cg id='outline' opacity='1' stroke='%23fff' stroke-width='3' fill='%23fff'%3E %3Ccircle mask='url(%23clip)' cx='11.5' cy='11.5' r='9.25'/%3E %3Cuse xlink:href='%23text' mask='url(%23clip)'/%3E %3C/g%3E %3Cg id='fill' opacity='1' fill='%23000'%3E %3Cuse xlink:href='%23logo'/%3E %3Cuse xlink:href='%23text'/%3E %3C/g%3E %3C/svg%3E\");\n    }\n}\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder *,\n.mapboxgl-ctrl-geocoder *:after,\n.mapboxgl-ctrl-geocoder *:before {\n  box-sizing: border-box;\n}\n\n.mapboxgl-ctrl-geocoder {\n  font-size: 18px;\n  line-height: 24px;\n  font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  position: relative;\n  background-color: #fff;\n  width: 100%;\n  min-width: 240px;\n  z-index: 1;\n  border-radius: 4px;\n  transition: width .25s, min-width .25s;\n}\n\n.mapboxgl-ctrl-geocoder--input {\n  font: inherit;\n  width: 100%;\n  border: 0;\n  background-color: transparent;\n  margin: 0;\n  height: 50px;\n  color: #404040; /* fallback */\n  color: rgba(0, 0, 0, 0.75);\n  padding: 6px 45px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.mapboxgl-ctrl-geocoder--input::-ms-clear {\n  display: none; /* hide input clear button in IE */\n}\n\n.mapboxgl-ctrl-geocoder--input:focus {\n  color: #404040; /* fallback */\n  color: rgba(0, 0, 0, 0.75);\n  outline: 0;\n  box-shadow: none;\n  outline: thin dotted;\n}\n\n.mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--pin-right > * {\n  z-index: 2;\n  position: absolute;\n  right: 8px;\n  top: 7px;\n  display: none;\n}\n\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder .suggestions {\n  box-shadow: 0 0 10px 2px rgba(0,0,0,.1);\n}\n\n/* Collapsed */\n.mapboxgl-ctrl-geocoder.mapboxgl-ctrl-geocoder--collapsed {\n  width: 50px;\n  min-width: 50px;\n  transition: width .25s, min-width .25s;\n}\n\n/* Suggestions */\n.mapboxgl-ctrl-geocoder .suggestions {\n  background-color: #fff;\n  border-radius: 4px;\n  left: 0;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  width: 100%;\n  top: 110%; /* fallback */\n  top: calc(100% + 6px);\n  z-index: 1000;\n  overflow: hidden;\n  font-size: 15px;\n}\n\n.mapboxgl-ctrl-bottom-left .suggestions,\n.mapboxgl-ctrl-bottom-right .suggestions {\n  top: auto;\n  bottom: 100%;\n}\n\n.mapboxgl-ctrl-geocoder .suggestions > li > a {\n  cursor: default;\n  display: block;\n  padding: 6px 12px;\n  color: #404040;\n}\n\n.mapboxgl-ctrl-geocoder .suggestions > .active > a,\n.mapboxgl-ctrl-geocoder .suggestions > li > a:hover {\n  color: #404040;\n  background-color: #f3f3f3;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.mapboxgl-ctrl-geocoder--suggestion-title {\n  font-weight: bold;\n}\n\n.mapboxgl-ctrl-geocoder--suggestion-title,\n.mapboxgl-ctrl-geocoder--suggestion-address {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n/* Icons */\n.mapboxgl-ctrl-geocoder--icon {\n  display: inline-block;\n  vertical-align: middle;\n  speak: none;\n  fill: #757575;\n  top: 15px;\n}\n\n.mapboxgl-ctrl-geocoder--icon-search {\n  position: absolute;\n  top: 13px;\n  left: 12px;\n  width: 23px;\n  height: 23px;\n}\n\n.mapboxgl-ctrl-geocoder--button {\n  padding: 0;\n  margin: 0;\n  border: none;\n  cursor: pointer;\n  background: #fff;\n  line-height: 1;\n}\n\n.mapboxgl-ctrl-geocoder--icon-close {\n  width: 20px;\n  height: 20px;\n  margin-top: 8px;\n  margin-right: 3px;\n}\n\n.mapboxgl-ctrl-geocoder--button:hover .mapboxgl-ctrl-geocoder--icon-close {\n  fill: #909090;\n}\n\n.mapboxgl-ctrl-geocoder--icon-geolocate {\n  width: 22px;\n  height: 22px;\n  margin-top: 6px;\n  margin-right: 3px;\n}\n\n\n.mapboxgl-ctrl-geocoder--icon-loading {\n  width: 26px;\n  height: 26px;\n  margin-top: 5px;\n  margin-right: 0px;\n  -moz-animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n  -webkit-animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n  animation: rotate 0.8s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);\n}\n\n.mapboxgl-ctrl-geocoder--powered-by {\n  display: block;\n  float: left;\n  padding: 6px 12px;\n  padding-bottom: 9px;\n  font-size: 13px;\n}\n\n.mapboxgl-ctrl-geocoder--powered-by a {\n  color: #909090;\n}\n\n.mapboxgl-ctrl-geocoder--powered-by a:not(:hover) {\n  text-decoration: none;  \n}\n\n\n/* Animation */\n@-webkit-keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n/* Media queries*/\n@media screen and (min-width: 640px) {\n\n  .mapboxgl-ctrl-geocoder.mapboxgl-ctrl-geocoder--collapsed {\n    width: 36px;\n    min-width: 36px;\n  }\n\n  .mapboxgl-ctrl-geocoder {\n    width: 33.3333%;\n    font-size: 15px;\n    line-height: 20px;\n    max-width: 360px;\n  }\n  .mapboxgl-ctrl-geocoder .suggestions {\n    font-size: 13px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon {\n    top: 8px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-close {\n    width: 16px;\n    height: 16px;\n    margin-top: 3px;\n    margin-right: 0;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-geolocate {\n    width: 18px;\n    height: 18px;\n    margin-top: 2px;\n    margin-right: 0;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-search {\n    left: 7px;\n    width: 20px;\n    height: 20px;\n  }\n\n  .mapboxgl-ctrl-geocoder--input {\n    height: 36px;\n    padding: 6px 35px;\n  }\n\n  .mapboxgl-ctrl-geocoder--icon-loading {\n    width: 26px;\n    height: 26px;\n    margin-top: -2px;\n    margin-right: -5px;\n  }\n\n  .mapbox-gl-geocoder--error{\n    color:#909090;\n    padding: 6px 12px;\n    font-size: 16px;\n    text-align: center;\n  }\n\n  .mapboxgl-ctrl-geocoder--powered-by {\n    font-size: 11px !important;\n  }\n}\n\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n.mapbox-gl-draw_ctrl-bottom-left,\n.mapbox-gl-draw_ctrl-top-left {\n    margin-left: 0;\n    border-radius: 0 4px 4px 0;\n}\n.mapbox-gl-draw_ctrl-top-right,\n.mapbox-gl-draw_ctrl-bottom-right {\n    margin-right: 0;\n    border-radius: 4px 0 0 4px;\n}\n.mapbox-gl-draw_ctrl-draw {\n    background-color: rgba(0, 0, 0, 0.75);\n    border-color: rgba(0, 0, 0, 0.9);\n}\n.mapbox-gl-draw_ctrl-draw > button {\n    border-color: rgba(0, 0, 0, 0.9);\n    color: rgba(255, 255, 255, 0.5);\n    width: 30px;\n    height: 30px;\n}\n.mapbox-gl-draw_ctrl-draw > button:hover {\n    background-color: rgba(0, 0, 0, 0.85);\n    color: rgba(255, 255, 255, 0.75);\n}\n.mapbox-gl-draw_ctrl-draw > button.active,\n.mapbox-gl-draw_ctrl-draw > button.active:hover {\n    background-color: rgba(0, 0, 0, 0.95);\n    color: #fff;\n}\n.mapbox-gl-draw_ctrl-draw-btn {\n    background-repeat: no-repeat;\n    background-position: center;\n}\n.mapbox-gl-draw_point {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJtYXJrZXIuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTYiICAgICBpbmtzY2FwZTpjeD0iMTQuMTY0MjUzIiAgICAgaW5rc2NhcGU6Y3k9IjguODg1NzIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0iZmFsc2UiICAgICB1bml0cz0icHgiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NTEiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjA4IiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjE5MCIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkMTk3MTUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhMTkxNzIiPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGUgLz4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZyAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwMzIuMzYyMikiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgZD0ibSAzNiwxMDQwLjM2MjIgYyA2ZS02LDMuMzA5MyAtNS45ODg2MTIsMTAgLTUuOTg4NjEyLDEwIDAsMCAtNS45OTg3NzYsLTYuNjY4IC02LjAxMTM0NSwtOS45NzcyIC0wLjAxMjU3LC0zLjMwOTIgMi42NTY1NzYsLTYuMDAzOSA1Ljk2NTc5MiwtNi4wMjI3IDMuMzA5MTg5LC0wLjAxOSA2LjAwODg0LDIuNjQ1MiA2LjAzMzk5Miw1Ljk1NDMiICAgICAgIGlkPSJwYXRoMTI1NjEiICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2Nzc2MiIC8+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDM0LjAwMDExNSwxMDQwLjM2MjIgYyAtNWUtNiwyLjIwNjIgLTMuOTkyNTIzLDcuMDAwMSAtMy45OTI1MjMsNy4wMDAxIDAsMCAtMy45OTkyOTEsLTQuNzc4NyAtNC4wMDc2NzksLTYuOTg0OSAtMC4wMDg0LC0yLjIwNjIgMS43NzEwODIsLTQuMDAyNyAzLjk3NzMxLC00LjAxNTMgMi4yMDYyMSwtMC4wMTMgNC4wMDYwMzcsMS43NjM1IDQuMDIyNzc3LDMuOTY5NyIgICAgICAgaWQ9InBhdGgxMjU2MyIgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Ik0gOS45NjY3OTY5LDEwMTQuMzYyMiBDIDYuNjU3NTgwOSwxMDE0LjM4MSAzLjk4NzQzLDEwMTcuMDc2NCA0LDEwMjAuMzg1NiBjIDAuMDEyNTY5LDMuMzA5MiA2LjAxMTcxOSw4Ljk3NjYgNi4wMTE3MTksOC45NzY2IDAsMCA1Ljk4ODI4NywtNS42OTA3IDUuOTg4MjgxLC05IGwgMCwtMC4wNDUgYyAtMC4wMjUxNSwtMy4zMDkxIC0yLjcyNDAxNCwtNS45NzQxIC02LjAzMzIwMzEsLTUuOTU1MSB6IG0gMC4wMDk3NywyIGMgMi4yMDYyMDYxLC0wLjAxMyA0LjAwNjY5MzEsMS43NjI2IDQuMDIzNDMzMSwzLjk2ODggbCAwLDAuMDMxIGMgLTVlLTYsMi4yMDYyIC0zLjk5MjE4OCw2IC0zLjk5MjE4OCw2IDAsMCAtMy45OTk0MjQsLTMuNzc4MiAtNC4wMDc4MTIsLTUuOTg0NCAtMC4wMDg0LC0yLjIwNjIgMS43NzAzMzQ1LC00LjAwMyAzLjk3NjU2MjUsLTQuMDE1NiB6IiAgICAgICBpZD0icGF0aDEyNTY4IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzY3NjY2Njc2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lIiAgICAgICBkPSJNIDEwIDIgQyA2LjY4NjI5MiAyIDQgNC42ODYzIDQgOCBDIDQgMTEuMzEzNyAxMCAxNyAxMCAxNyBDIDEwIDE3IDE2IDExLjMxMzcgMTYgOCBDIDE2IDQuNjg2MyAxMy4zMTM3MDggMiAxMCAyIHogTSAxMCA0IEMgMTIuMDcxMDY4IDQgMTMuNzUgNS42Nzg5IDEzLjc1IDcuNzUgQyAxMy43NSA5LjIwNTMyNzggMTEuOTMxMTEgMTEuNjQ0MzkzIDEwLjgzMDA3OCAxMyBMIDkuMTY5OTIxOSAxMyBDIDguMDY4ODkwMyAxMS42NDQzOTMgNi4yNSA5LjIwNTMyNzggNi4yNSA3Ljc1IEMgNi4yNSA1LjY3ODkgNy45Mjg5MzIgNCAxMCA0IHogIiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiICAgICAgIGlkPSJwYXRoMTczMDUiIC8+ICA8L2c+PC9zdmc+);\n}\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n.mapbox-gl-draw_polygon {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJzcXVhcmUuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IiAgICAgaW5rc2NhcGU6Y3g9IjExLjY4MTYzNCIgICAgIGlua3NjYXBlOmN5PSI5LjI4NTcxNDMiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC41O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Im0gNSwxMDM5LjM2MjIgMCw2IDIsMiA2LDAgMiwtMiAwLC02IC0yLC0yIC02LDAgeiBtIDMsMCA0LDAgMSwxIDAsNCAtMSwxIC00LDAgLTEsLTEgMCwtNCB6IiAgICAgICBpZD0icmVjdDc3OTciICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjIiAvPiAgICA8Y2lyY2xlICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBpZD0icGF0aDQzNjQiICAgICAgIGN4PSI2IiAgICAgICBjeT0iMTA0Ni4zNjIyIiAgICAgICByPSIyIiAvPiAgICA8Y2lyY2xlICAgICAgIGlkPSJwYXRoNDM2OCIgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjYwMDAwMDAyO21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGN4PSIxNCIgICAgICAgY3k9IjEwNDYuMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBpZD0icGF0aDQzNzAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBjeD0iNiIgICAgICAgY3k9IjEwMzguMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNjAwMDAwMDI7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgaWQ9InBhdGg0MzcyIiAgICAgICBjeD0iMTQiICAgICAgIGN5PSIxMDM4LjM2MjIiICAgICAgIHI9IjIiIC8+ICA8L2c+PC9zdmc+);\n}\n.mapbox-gl-draw_line {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJsaW5lLnN2ZyI+ICA8ZGVmcyAgICAgaWQ9ImRlZnMxOTE2OSIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOnpvb209IjE2IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjg5ODc3NSIgICAgIGlua3NjYXBlOmN5PSI5LjU4OTAxNTIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEzLjUsMTAzNS44NjIyIGMgLTEuMzgwNzEyLDAgLTIuNSwxLjExOTMgLTIuNSwyLjUgMCwwLjMyMDggMC4wNDYxNCwwLjYyNDQgMC4xNTYyNSwwLjkwNjMgbCAtMy43NSwzLjc1IGMgLTAuMjgxODM2LC0wLjExMDIgLTAuNTg1NDIxLC0wLjE1NjMgLTAuOTA2MjUsLTAuMTU2MyAtMS4zODA3MTIsMCAtMi41LDEuMTE5MyAtMi41LDIuNSAwLDEuMzgwNyAxLjExOTI4OCwyLjUgMi41LDIuNSAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTAuMzIwOCAtMC4wNDYxNCwtMC42MjQ0IC0wLjE1NjI1LC0wLjkwNjIgbCAzLjc1LC0zLjc1IGMgMC4yODE4MzYsMC4xMTAxIDAuNTg1NDIxLDAuMTU2MiAwLjkwNjI1LDAuMTU2MiAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTEuMzgwNyAtMS4xMTkyODgsLTIuNSAtMi41LC0yLjUgeiIgICAgICAgaWQ9InJlY3Q2NDY3IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPiAgPC9nPjwvc3ZnPg==);\n}\n.mapbox-gl-draw_undo {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9bpVIrgnYQcchQnSyIioiTVqEIFUKt0KqDyUv/oElDkuLiKLgWHPxZrDq4OOvq4CoIgj8gTo5Oii5S4n1JoUWMFx7v47x7Du/dB/jrZaaaHWOAqllGKhEXMtlVIfiKboTgQx9mJGbqc6KYhGd93VMn1V2MZ3n3/Vk9Ss5kgE8gnmW6YRFvEE9tWjrnfeIIK0oK8TnxqEEXJH7kuuzyG+eCw36eGTHSqXniCLFQaGO5jVnRUIkniaOKqlG+P+OywnmLs1qusuY9+QvDOW1lmeu0hpDAIpYgQoCMKkoow0KMdo0UEyk6j3v4Bx2/SC6ZXCUwciygAhWS4wf/g9+zNfMT425SOA50vtj2xzAQ3AUaNdv+PrbtxgkQeAautJa/UgemP0mvtbToEdC7DVxctzR5D7jcAQaedMmQHClAy5/PA+9n9E1ZoP8WCK25c2ue4/QBSNOskjfAwSEwUqDsdY93d7XP7d+e5vx+AF61cp9ZKFDPAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5AsKARkNvR+d0wAAAQpJREFUOMvt1K1OA0EUBeAPUoLAEFpHw0MgAInGIngEPAqBBEJ4A4IqPwIUSTcoBEkNPAQOHAUDKahibpNJs7vdhgoEJ5nMztw7J7N3zrn8dUyVxJawhRXM4x2PuMJzFfJL3GAOx/hGP2d84RC1UYSdOPCWHP5AGyfIYj2ItUeRdoZucoaFoZw6WknOwTiEGWYLclvJ7zeLCO9y6rVbkFvHZ+TspIG0BttYTtZ93BcQdiO2gdUiwqcYVfEScyPdnP6Fhhdjfp0EYQPr8f0wCYddRI17Za+cYg+nOTps4DxRwX4Vss0hp2ThlNtEKpWcMsAMjkq83Iub1cbtNs3oNmvRbbrRba4TyfyDH2GoVKMjQkxWAAAAAElFTkSuQmCC);\n}\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n.mapbox-gl-draw_trash {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgaWQ9InN2ZzU3MzgiICAgdmVyc2lvbj0iMS4xIiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTErZGV2ZWwrb3N4bWVudSByMTI5MTEiICAgc29kaXBvZGk6ZG9jbmFtZT0idHJhc2guc3ZnIiAgIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZGVmcyAgICAgaWQ9ImRlZnM1NzQwIiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMjIuNjI3NDE3IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjEyODE4NCIgICAgIGlua3NjYXBlOmN5PSI4Ljg0NjEzMDciICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTAzMyIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIyMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQ1NzQ2IiAgICAgICBlbXBzcGFjaW5nPSI1IiAgICAgICB2aXNpYmxlPSJ0cnVlIiAgICAgICBlbmFibGVkPSJ0cnVlIiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45OTk5OTk4MjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEwLDEwMzUuNzc0MyBjIC0wLjc4NDkyNTMsOGUtNCAtMS40OTY4Mzc2LDAuNDYwNiAtMS44MjAzMTI1LDEuMTc1OCBsIC0zLjE3OTY4NzUsMCAtMSwxIDAsMSAxMiwwIDAsLTEgLTEsLTEgLTMuMTc5Njg4LDAgYyAtMC4zMjM0NzUsLTAuNzE1MiAtMS4wMzUzODcsLTEuMTc1IC0xLjgyMDMxMiwtMS4xNzU4IHogbSAtNSw0LjU4NzkgMCw3IGMgMCwxIDEsMiAyLDIgbCA2LDAgYyAxLDAgMiwtMSAyLC0yIGwgMCwtNyAtMiwwIDAsNS41IC0xLjUsMCAwLC01LjUgLTMsMCAwLDUuNSAtMS41LDAgMCwtNS41IHoiICAgICAgIGlkPSJyZWN0MjQzOS03IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiIC8+ICA8L2c+PC9zdmc+);\n}\n.mapbox-gl-draw_uncombine {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0idW5jb21iaW5lLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczU3NDAiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQ0MTAzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDE4NCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjMwMDMiCiAgICAgICB5MT0iMTAiCiAgICAgICB4Mj0iMzAxNyIKICAgICAgIHkyPSIxMCIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSwyLjYxNzE4NzRlLTYpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MTAzIj4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3A0MTA1IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eTowOyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDQxMDciIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IgogICAgIGlua3NjYXBlOmN4PSItMTAuMjczOTQ2IgogICAgIGlua3NjYXBlOmN5PSI2LjkzMDM0NCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjIwNzgiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTA1NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iOTAwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyOTYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBzaG93Z3VpZGVzPSJmYWxzZSIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiCiAgICAgaW5rc2NhcGU6YmJveC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LW5vZGVzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vdGhlcnM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtbm9kZXM9ImZhbHNlIj4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBpZD0iZ3JpZDU3NDYiCiAgICAgICBlbXBzcGFjaW5nPSIyIgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiCiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiCiAgICAgICBzcGFjaW5neD0iMC41cHgiCiAgICAgICBzcGFjaW5neT0iMC41cHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIG9wYWNpdHk9IjAuMDU4ODIzNTMiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgIGQ9Ik0gMTIuMDA1ODU5IDIgQyAxMS43NTAzNiAyIDExLjQ5NDYwNSAyLjA5NzE4NyAxMS4yOTg4MjggMi4yOTI5Njg4IEwgMTAuMzAyNzM0IDMuMjg5MDYyNSBDIDkuOTExMTgwNCAzLjY4MDYyNiA5LjkxMTE4MDQgNC4zMTE1NjE1IDEwLjMwMjczNCA0LjcwMzEyNSBMIDExLjMwMjczNCA1LjcwMTE3MTkgQyAxMS42OTQyODggNi4wOTI3MzU0IDEyLjMyMzI5IDYuMDkyNzM1NCAxMi43MTQ4NDQgNS43MDExNzE5IEwgMTMuNzEwOTM4IDQuNzA1MDc4MSBDIDE0LjEwMjQ5MSA0LjMxMzUxNDYgMTQuMTAyNDkxIDMuNjgyNTc5MSAxMy43MTA5MzggMy4yOTEwMTU2IEwgMTIuNzEyODkxIDIuMjkyOTY4OCBDIDEyLjUxNzExNCAyLjA5NzE4NyAxMi4yNjEzNTkgMiAxMi4wMDU4NTkgMiB6IE0gMTYuMDAxOTUzIDUuOTk0MTQwNiBDIDE1Ljc0NjQ2MyA1Ljk5NDE0MDYgMTUuNDkwNjkyIDYuMDkzMjczNSAxNS4yOTQ5MjIgNi4yODkwNjI1IEwgMTQuMjk4ODI4IDcuMjg1MTU2MiBDIDEzLjkwNzI4OSA3LjY3NjczNDIgMTMuOTA3Mjg5IDguMzA1Njg3NyAxNC4yOTg4MjggOC42OTcyNjU2IEwgMTUuMjk2ODc1IDkuNjk3MjY1NiBDIDE1LjY4ODQxNCAxMC4wODg4NDQgMTYuMzE5Mzk4IDEwLjA4ODg0NCAxNi43MTA5MzggOS42OTcyNjU2IEwgMTcuNzA3MDMxIDguNzAxMTcxOSBDIDE4LjA5ODU3MSA4LjMwOTU5MzkgMTguMDk4NTcxIDcuNjc4Njg3MyAxNy43MDcwMzEgNy4yODcxMDk0IEwgMTYuNzA4OTg0IDYuMjg5MDYyNSBDIDE2LjUxMzIxNSA2LjA5MzI3MzUgMTYuMjU3NDQzIDUuOTk0MTQwNiAxNi4wMDE5NTMgNS45OTQxNDA2IHogTSA5IDcgQyA4IDcgOCA4IDguNSA4LjUgQyA4LjgzMzMzMyA4LjgzMzMgOS41IDkuNSA5LjUgOS41IEwgOC41IDEwLjUgQyA4LjUgMTAuNSA4IDExIDguNSAxMS41IEMgOSAxMiA5LjUgMTEuNSA5LjUgMTEuNSBMIDEwLjUgMTAuNSBMIDExLjUgMTEuNSBDIDEyIDEyIDEzIDEyIDEzIDExIEwgMTMgNyBMIDkgNyB6IE0gNC4wNDg4MjgxIDEwLjAwMTk1MyBDIDMuNzkzMzA4NyAxMC4wMDE5NTMgMy41Mzc1ODkxIDEwLjA5OTEyOSAzLjM0MTc5NjkgMTAuMjk0OTIyIEwgMi4yOTg4MjgxIDExLjMzNzg5MSBDIDEuOTA3MjQzNyAxMS43Mjk0NzYgMS45MDcyNDM3IDEyLjM2MDM2OCAyLjI5ODgyODEgMTIuNzUxOTUzIEwgNy4yNDgwNDY5IDE3LjcwMTE3MiBDIDcuNjM5NjMxMyAxOC4wOTI3NTcgOC4yNzA1MjUgMTguMDkyNzU3IDguNjYyMTA5NCAxNy43MDExNzIgTCA5LjcwNTA3ODEgMTYuNjU4MjAzIEMgMTAuMDk2NjYzIDE2LjI2NjYxOCAxMC4wOTY2NjMgMTUuNjM1NzI2IDkuNzA1MDc4MSAxNS4yNDQxNDEgTCA0Ljc1NTg1OTQgMTAuMjk0OTIyIEMgNC41NjAwNjcyIDEwLjA5OTEyOSA0LjMwNDM0NzUgMTAuMDAxOTUzIDQuMDQ4ODI4MSAxMC4wMDE5NTMgeiAiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiCiAgICAgICBpZD0icmVjdDkxOTgiIC8+CiAgPC9nPgo8L3N2Zz4K);\n}\n\n\n</style>"}
className={`w-html-embed`} />
<HtmlEmbed
clientOnly={true}
code={"<style>\n.mapbox-gl-draw_combine {\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwIgogICBoZWlnaHQ9IjIwIgogICBpZD0ic3ZnNTczOCIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iY29tYmluZS5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM1NzQwIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDEwMyIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQxODQiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIHgxPSIzMDAzIgogICAgICAgeTE9IjEwIgogICAgICAgeDI9IjMwMTciCiAgICAgICB5Mj0iMTAiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEsMi42MTcxODc0ZS02KSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDEwMyI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wNDEwNSIgLz4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MDsiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3A0MTA3IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjE2IgogICAgIGlua3NjYXBlOmN4PSIyLjQyMzAwNiIKICAgICBpbmtzY2FwZTpjeT0iMTIuMTczMTY1IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMjA3OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDU0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSI5MDAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjI5NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIHNob3dndWlkZXM9ImZhbHNlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOmJib3gtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6b2JqZWN0LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLW90aGVycz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6c25hcC1ub2Rlcz0iZmFsc2UiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNTc0NiIKICAgICAgIGVtcHNwYWNpbmc9IjIiCiAgICAgICB2aXNpYmxlPSJ0cnVlIgogICAgICAgZW5hYmxlZD0idHJ1ZSIKICAgICAgIHNuYXB2aXNpYmxlZ3JpZGxpbmVzb25seT0idHJ1ZSIKICAgICAgIHNwYWNpbmd4PSIwLjVweCIKICAgICAgIHNwYWNpbmd5PSIwLjVweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4wNTg4MjM1MyIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE1NzQzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0xMDMyLjM2MjIpIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAxMi4wNTA3ODEgMiBDIDExLjc5NTI2MiAyIDExLjUzOTU0MiAyLjA5NzE3NjIgMTEuMzQzNzUgMi4yOTI5Njg4IEwgMTAuMjk4ODI4IDMuMzM3ODkwNiBDIDkuOTA3MjQzNyAzLjcyOTQ3NTcgOS45MDcyNDM3IDQuMzYwMzY4IDEwLjI5ODgyOCA0Ljc1MTk1MzEgTCAxNS4yNDgwNDcgOS43MDExNzE5IEMgMTUuNjM5NjMxIDEwLjA5Mjc1NyAxNi4yNzA1MjUgMTAuMDkyNzU3IDE2LjY2MjEwOSA5LjcwMTE3MTkgTCAxNy43MDcwMzEgOC42NTYyNSBDIDE4LjA5ODYxNiA4LjI2NDY2NDkgMTguMDk4NjE2IDcuNjMzNzcyNiAxNy43MDcwMzEgNy4yNDIxODc1IEwgMTIuNzU3ODEyIDIuMjkyOTY4OCBDIDEyLjU2MjAyIDIuMDk3MTc2MiAxMi4zMDYzMDEgMiAxMi4wNTA3ODEgMiB6IE0gOCA4IEMgNyA4IDcgOSA3LjUgOS41IEMgNy44MzMzMzMgOS44MzMzIDguNSAxMC41IDguNSAxMC41IEwgNy41IDExLjUgQyA3LjUgMTEuNSA3IDEyIDcuNSAxMi41IEMgOCAxMyA4LjUgMTIuNSA4LjUgMTIuNSBMIDkuNSAxMS41IEwgMTAuNSAxMi41IEMgMTEgMTMgMTIgMTMgMTIgMTIgTCAxMiA4IEwgOCA4IHogTSA0IDEwLjAwMzkwNiBDIDMuNzQ0NTEgMTAuMDAzOTA2IDMuNDkwNjkxNiAxMC4xMDMwMzkgMy4yOTQ5MjE5IDEwLjI5ODgyOCBMIDIuMjk4ODI4MSAxMS4yOTQ5MjIgQyAxLjkwNzI4ODggMTEuNjg2NSAxLjkwNzI4ODggMTIuMzE1NDUzIDIuMjk4ODI4MSAxMi43MDcwMzEgTCAzLjI5Njg3NSAxMy43MDcwMzEgQyAzLjY4ODQxNDQgMTQuMDk4NjA5IDQuMzE5Mzk4MSAxNC4wOTg2MDkgNC43MTA5Mzc1IDEzLjcwNzAzMSBMIDUuNzA3MDMxMiAxMi43MTA5MzggQyA2LjA5ODU3MDYgMTIuMzE5MzYgNi4wOTg1NzA2IDExLjY4ODQ1MyA1LjcwNzAzMTIgMTEuMjk2ODc1IEwgNC43MDcwMzEyIDEwLjI5ODgyOCBDIDQuNTExMjYxNiAxMC4xMDMwMzkgNC4yNTU0OSAxMC4wMDM5MDYgNCAxMC4wMDM5MDYgeiBNIDcuOTk2MDkzOCAxNCBDIDcuNzQwNTk0MiAxNCA3LjQ4NDgzOTUgMTQuMDk3MTg3IDcuMjg5MDYyNSAxNC4yOTI5NjkgTCA2LjI5NDkyMTkgMTUuMjg5MDYyIEMgNS45MDMzNjc5IDE1LjY4MDYyNiA1LjkwMzM2NzkgMTYuMzExNTYxIDYuMjk0OTIxOSAxNi43MDMxMjUgTCA3LjI5Mjk2ODggMTcuNzAxMTcyIEMgNy42ODQ1MjI3IDE4LjA5MjczNSA4LjMxMzUyNDIgMTguMDkyNzM1IDguNzA1MDc4MSAxNy43MDExNzIgTCA5LjcwMTE3MTkgMTYuNzA1MDc4IEMgMTAuMDkyNzI2IDE2LjMxMzUxNSAxMC4wOTI3MjYgMTUuNjg0NTMyIDkuNzAxMTcxOSAxNS4yOTI5NjkgTCA4LjcwMzEyNSAxNC4yOTI5NjkgQyA4LjUwNzM0OCAxNC4wOTcxODcgOC4yNTE1OTMzIDE0IDcuOTk2MDkzOCAxNCB6ICIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMTAzMi4zNjIyKSIKICAgICAgIGlkPSJyZWN0OTE5OCIgLz4KICA8L2c+Cjwvc3ZnPgo=);\n}\n\n.mapboxgl-map.mouse-pointer .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: pointer;\n}\n.mapboxgl-map.mouse-move .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mouse-add .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: crosshair;\n}\n.mapboxgl-map.mouse-move.mode-direct_select\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: grab;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n}\n.mapboxgl-map.mode-direct_select.feature-vertex.mouse-move\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mode-direct_select.feature-midpoint.mouse-pointer\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: cell;\n}\n.mapboxgl-map.mode-direct_select.feature-feature.mouse-move\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: move;\n}\n.mapboxgl-map.mode-static.mouse-pointer\n    .mapboxgl-canvas-container.mapboxgl-interactive {\n    cursor: grab;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n}\n.mapbox-gl-draw_boxselect {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    background: rgba(0, 0, 0, 0.1);\n    border: 2px dotted #fff;\n    opacity: 0.5;\n}\n\n</style>"}
className={`w-html-embed`} />
</div>
<HtmlEmbed
clientOnly={true}
code={"<style>\n[data-elem=\"geocoder\"]{\nz-index: 1;\nmargin: 0px;\n}\n\n\n.mapboxgl-ctrl-geocoder {\nheight: 52px;\nmin-width: 100%!important;\nmin-height: 100%!important;\nbox-shadow: none!important;\n}\n\n.mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-search {\nwidth: auto;\nheight: 24px;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\ntop: 12px!important;\nmargin-left: 4px;\nmargin-top: 2px;\n}\n\ninput.mapboxgl-ctrl-geocoder {\nmin-width: 100%;\nmin-height: 100%;\n}\n\ninput.mapboxgl-ctrl-geocoder--input {\nheight: 100%;\nwidth: 100%;\nborder-radius: 4px;\nborder-bottom-color: #128547;\nborder-bottom-style: solid;\nborder-bottom-width: 2px;\nborder-left-color: #128547;\nborder-left-style: solid;\nborder-left-width: 2px;\nborder-right-color: #128547;\nborder-right-style: solid;\nborder-right-width: 2px;\nborder-top-color: #128547;\nborder-top-style: solid;\nborder-top-width: 2px;\nfont-size: 16px;\noutline: 0!important;\n\n}\n\ninput:focus {\nborder-color: #0ab966;\noutline: 0!important;\n}\n#lowestMonthly, #highestMonthly {\nfont-weight: bold;\n}\n\n.geocoder_loader {\n\tborder-bottom-color: transparent;\n\tdisplay: inline-block;\n\tanimation: rotation 1s linear infinite;\n}\n\n@keyframes rotation {\n\t0% {\n\t\ttransform: rotate(0deg);\n\t}\n\t100% {\n\t\ttransform: rotate(360deg);\n\t}\n}\n\n\n\n</style>"}
className={`w-html-embed`} />
<header
className={`w-element c1numhkq c1a06u5s c1diokdk c3auquk cjkauba c1jfyw8e`}>
<div
className={`w-element c1numhkq c53aqfr ch3nxmx c1a06u5s c185jzsb c1ogwt2d c1owcyig ccsg5nn cgdr2qp c1ly50l3 cmc7riw cw0i6m3 c1tzq9xg`}>
<div
data-elem={"first-screen"}
className={`w-element c139pwc6 cddrwcl c1ctfqgt c1wbdu8a`}>
<h1
className={`w-element c4xmdlm c15olmt5 c1pfgp4h c1mndzy8 cwlvzsq cb0siy c1vgwqmx c1p4xat6 c1ct08ed chliyde`}>
{"Find Out How Much Your Commercial Roof Costs?"}
</h1>
<h2
className={`w-element c1gcrf2e c19fqb9a c1cxkcjg c1pjr8f c1p4xat6 c1mndzy8 c1a8olzx cl197ma c1qz94dz c9em76i c1nxn35q`}>
{"Select your Property Type"}
</h2>
<RemixForm
method={"post"}
id={"single-form"}
className={`w-element`}>
<div
id={"email-form"}
className={`w-element`}>
<div
className={`w-element cmsm1bz cvgbedo c1r2z4fo c169xs8a c16d4u2h ch3nxmx c1diokdk cn1ywmu c1txodcv curgy1m c182kuy7 c1dqrbr9`}>
<label
htmlFor={"single"}
id={"label-single"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"property-prompt"}
value={"single"}
id={"single"}
data-elem={"single-option"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph c1segsg8 cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c3lejsx ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Single Property"}
</span>
</label>
<label
htmlFor={"multiple"}
id={"label-multiple"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"property-prompt"}
value={"multiple"}
id={"multiple"}
data-elem={"multi-option"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph c1xhvavq cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c3lejsx ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x cn7k83s ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Multiple Properties"}
</span>
</label>
<HtmlEmbed
code={"<style>\n.radio:checked + .radio-image,\n.radio:hover + .radio-image {\n  filter: brightness(100%);\n}\n</style>"}
className={`w-html-embed`} />
</div>
</div>
</RemixForm>
</div>
<div
data-elem={"2nd-screen-single"}
className={`w-element c139pwc6 c1owcyig ${"is--hidden"}`}>
<div
data-elem={"geocoder-wrap"}
className={`w-element c1numhkq c1diokdk c3auquk c1a06u5s c139pwc6 c1cunrri c1e4sgmk c1g4ou9b c3gou43 c1wbdu8a c1ma3j39 ca5v07y ${"geocoder__wrap"}`}>
<h2
className={`w-element cwlvzsq cb0siy c1vgwqmx c1lwn44j c1pfgp4h c4xmdlm c15olmt5 c1mndzy8 c1p4xat6 c1rjplas ceq13bv c1ct08ed chliyde`}>
{"Single Property"}
</h2>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"49\" viewBox=\"0 0 30 49\" fill=\"none\">\n  <path d=\"M13.5858 48.4142C14.3668 49.1953 15.6332 49.1953 16.4142 48.4142L29.1421 35.6863C29.9232 34.9052 29.9232 33.6389 29.1421 32.8579C28.3611 32.0768 27.0948 32.0768 26.3137 32.8579L15 44.1716L3.68629 32.8579C2.90524 32.0768 1.63891 32.0768 0.857866 32.8579C0.0768171 33.6389 0.0768171 34.9052 0.857866 35.6863L13.5858 48.4142ZM13 8.74228e-08L13 47L17 47L17 -8.74228e-08L13 8.74228e-08Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed`} />
<h3
className={`w-element c1g3mhtg c4ijzwc c18mkjfw c1vgwqmx c1p4xat6 c16gn7ol c1mndzy8 c1wp480m c1pfgp4h c7zt1vs ckq2phi clycue7 c1s59rie`}>
{"What's your address?"}
</h3>
<div
className={`w-element c1sdqiq6 cbpcpoz crv3s27 cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"geocoder_loader"}`} />
<div
data-elem={"geocoder"}
className={`w-element c139pwc6 cjkauba c1y9x0uu c9te4zd`} />
<HtmlEmbed
code={"<style>\n.is--hidden {\n  display: none;\n}\n</style>"}
className={`w-html-embed`} />
<div
className={`w-element c139pwc6 cjkauba cvcvidj c1lzjd2w c1epvuph c9nw4u8 cagmsft`}>
<Image
src={"https://cms.improveitmd.com/uploads/search_icon_grey_2_KR_Phgsf3_Mq_Ywy_OF_3_JX_Ub_511fc3b834.svg"}
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
className={`w-element c14s91he c1hic3qd c6zkp93 c1vgwqmx cearg2n ${"text-block-2 is--hidden"}`}>
<Link
href={"#"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"continue"}
</Link>
</p>
</div>
<div
data-elem={"size-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c13g3obg c8lozzs c1g4ou9b c3gou43 c1ka8hwj c18z6qun c1ma3j39 ca5v07y ${"is--hidden"}`}>
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
src={"https://cms.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_a6b24bc82f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"https://cms.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_422d313934.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_a6b24bc82f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"https://cms.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_a6b24bc82f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c19i8jsr`} />
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
src={"https://cms.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_422d313934.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_422d313934.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
id={"map1"}
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
data-elem={"material-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c13g3obg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"is--hidden"}`}>
<div
data-element={"prompt-1"}
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
src={"https://cms.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_6a1d0430d8.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"https://cms.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_a6b24bc82f.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com/uploads/circle_grey_2_5j_Fzta9_Vk_T_Jxxl1_O_Qk_D_422d313934.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Asphalt"}
</span>
</label>
<label
htmlFor={"silicone"}
id={"label-silicone"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"silicone"}
id={"silicone"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph ckm8etu cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Silicone Roof Coating"}
</span>
</label>
<label
htmlFor={"TPO"}
id={"label-tpo"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"TPO"}
id={"tpo"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph cpzejbj cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Flat TPO"}
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
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
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
data-elem={"form-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri czvtnxg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"is--hidde"}`}>
<div
data-element={"prompt-1"}
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
src={"https://cms.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_6a1d0430d8.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"https://cms.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_6a1d0430d8.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com/uploads/check_fill_t_Qn_Po_WF_842_Qz_Jop_BB_5w6c_6a1d0430d8.svg"}
width={24}
height={24}
alt={""}
data-icon={"filled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<Image
loading={"lazy"}
src={"https://cms.improveitmd.com/uploads/circle_green_72pq_Hq_P6_Xm_Mru_2_O_Gt_Kg7_a6b24bc82f.svg"}
width={24}
height={24}
alt={""}
data-icon={"unfilled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
id={"single-prop"}
data-form={"commercial"}
className={`w-element cqbnnz9`}>
<h2
className={`w-element c1jyvd5g c1rxl3x cakyt4y c1mndzy8 c18bwt63 ckecbya c1cwbm0l cfxkkks c1ns9r0m cxyjskp cgjldxo`}>
{"Finish with your info and see price results instantly."}
</h2>
<RemixForm
id={"wf-form-Single-Prop-2"}
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element`}>
<div
className={`w-element c1numhkq c3auquk c13g3obg c1350r63 cl4dpup c1txodcv cyx0g81 cfbrk2z`}>
<Input
id={"name-multi"}
name={"Name"}
type={"text"}
placeholder={"Your name"}
required={true}
data-elem={"name"}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<Input
id={"phone-multi"}
name={"Phone"}
type={"tel"}
placeholder={"Phone"}
required={true}
minLength={10}
data-elem={"phone"}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<HtmlEmbed
code={"<input type=\"hidden\" data-elem=\"storm-damange\" value=\"No\">"}
className={`w-html-embed`} />
<button
type={"submit"}
data-elem={"submit"}
className={`w-element c1ofez6z c9djrgv c18hkk31 c1jiyfml c1g3mhtg c1fhsgtb c8d36da c1lvj0n c1n4271i c1nmokvj c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn crv3s27 cvtl69h c1f445le c1ipiex8 c1554q0w cir68kq c1ef6u0e culorum cl4dpup`}>
{"SEE RESULTS NOW"}
</button>
</div>
</RemixForm>
</div>
<HtmlEmbed
code={"<script>\n\ndocument.addEventListener('DOMContentLoaded', (event) => {\n// Clear custom validity when the user starts to correct the input\n/*\n['phone-yes', 'phone-no'].forEach(fieldId => {\n    document.getElementById(fieldId).addEventListener('input', function() {\n        this.setCustomValidity('');\n    }); })\n    */\n$(\"[data-icon='filled']\").hide()\n$(\"[data-form='commercial']\").hide()\n//$(\"[data-form='damage-no']\").hide()\n\n$('input[name=\"Damage\"]').click(function () {\n    if ($(this).val() === \"Yes.\") {\n        $(\"[data-form='commercial']\").show();\n        $(\"input[type=hidden]\").val('Yes');\n        $(\"[data-element='insurance-wrap']\").hide();\n        //$(\"[data-form='damage-no']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    } else {\n        $(\"[data-form='commercial']\").show();\n        $(\"[data-element='insurance-wrap']\").hide();\n                $(\"input[type=hidden]\").val('No');\n\n        //$(\"[data-form='damage-yes']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    }\n});\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
data-elem={"results-wrap-multi"}
className={`w-element c1numhkq c1a06u5s c3auquk c1p0m755 c139pwc6 c1cunrri cidlv9n c14e2i27 c1rt95ji c5a8cr6 ciylvte c619udc ${"is--hidden"}`}>
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
className={`w-element c1numhkq c1kssyyd c3nuxyf cxlc9gr c15sicby c11q9q0a cddo8ff c1uemp3r ccaufd5 c1umnxkx c1a06u5s c4ph8p6 cnods77 c1yt6hv7 cyyof5h c1t9puix c1qcj66c c1sw8x31 cles91e czr9sbv cu8qcns c4fmmfv cybbdyg cljixpu`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c1numhkq c1a06u5s c17rwy3n c1603wqb cy60nkm c1vgwqmx`}>
<p
className={`w-element c1gbsy9l c1jqias8`}>
{"Price range for "}
<span
data-elem={"material-selected"}
className={`w-element`}>
{"Asphalt Shingles"}
</span>
</p>
<div
data-elem={"address-pricing-wrap"}
className={`w-element c1numhkq c1a06u5s c1pit5s0 c3qgmhh`}>
<p
data-elem={"results-address"}
className={`w-element c309ipl`}>
{"Address"}
</p>
<p
className={`w-element c1gcrf2e cpdrt5z c1pjr8f`}>
{"$"}
<span
data-elem={"lowPrice"}
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
data-elem={"highPrice"}
className={`w-element`}>
{"12,400"}
</span>
</p>
</div>
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
href={"/quote"}
target={"_self"}
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
href={"/quote"}
target={"_self"}
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
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1e3sjlf c16xjt02 c5zgd1 c1hd4o6l c11q9q0a cddo8ff czbonp3 cce8wht c1sb614n cnods77 c1yt6hv7 cu8qcns c4fmmfv ${"results_top-bottom is--hidden"}`}>
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
src={"https://cms.improveitmd.com/uploads/ci_storm_map_1_LAH_T_9a_H_Mr_FS_Ifafib_c87409d6d5.svg"}
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
id={"Name-5"}
name={"Name"}
placeholder={"Name"}
required={true}
type={"text"}
data-field={"name"}
className={`w-element c1rbcgj0 cniq5v2 c15ai560 c1ch8bq c1x9vsvi c1gbsy9l c19x9ksz cy60nkm c1vgwqmx c9gf47x c1upa51b cg8y2lt ctvlq9m cwa1yh5 c1y8ksq2 c1fmjy5t c9x9jza c1d5w6j7 cry5m16 cjprnnz ccy7w4l c9lszw4 cd89h47 c1kreka c30x0kf c15rree9 cos8g46 c1bc2t9 chioh6o cmtckwo`} />
<Input
id={"Phone-3"}
name={"Phone"}
placeholder={"Phone"}
required={true}
type={"tel"}
data-field={"phone"}
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
src={"https://cms.improveitmd.com/uploads/Vector_i_O_Xi_YD_Iao_B_Xz9_Wh9_Cj2_K_691ae9ea37.svg"}
width={60}
height={62}
alt={""}
className={`w-image c1sd6lnu c1hwvjgs cdmu5h7 czbu68a c1x1zhvf`} />
</div>
</div>
</div>
</div>
</div>
<div
data-elem={"2nd-screen-multi"}
className={`w-element ${"is--hidden"}`}>
<div
data-elem={"geocoder-wrap"}
className={`w-element c1numhkq c1diokdk c3auquk c1a06u5s c139pwc6 c1cunrri c1e4sgmk c1g4ou9b c3gou43 c1wbdu8a c1ma3j39 ca5v07y ${"geocoder__wrap"}`}>
<h2
className={`w-element cwlvzsq cb0siy c1vgwqmx c1lwn44j c1pfgp4h c4xmdlm c15olmt5 c1mndzy8 c1p4xat6 c1rjplas ceq13bv c1ct08ed chliyde`}>
{"Multiple Properties"}
</h2>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"49\" viewBox=\"0 0 30 49\" fill=\"none\">\n  <path d=\"M13.5858 48.4142C14.3668 49.1953 15.6332 49.1953 16.4142 48.4142L29.1421 35.6863C29.9232 34.9052 29.9232 33.6389 29.1421 32.8579C28.3611 32.0768 27.0948 32.0768 26.3137 32.8579L15 44.1716L3.68629 32.8579C2.90524 32.0768 1.63891 32.0768 0.857866 32.8579C0.0768171 33.6389 0.0768171 34.9052 0.857866 35.6863L13.5858 48.4142ZM13 8.74228e-08L13 47L17 47L17 -8.74228e-08L13 8.74228e-08Z\" fill=\"black\"/>\n</svg>"}
className={`w-html-embed`} />
<div
data-elem={"geocode-wrap"}
className={`w-element c1numhkq c1a06u5s c1diokdk c1nt8u3l cdxqbrh c139pwc6 c103rere c1cm3ox3`}>
<h3
data-field={"multi-address-text"}
className={`w-element c1g3mhtg c4ijzwc c18mkjfw c1vgwqmx c1p4xat6 c16gn7ol c1mndzy8 c1wp480m c1pfgp4h c7zt1vs ckq2phi clycue7 c1s59rie`}>
{"What's your address"}
<sup
data-elem={"add-sus"}
className={`w-element`}>
{"1 "}
</sup>
{"?"}
</h3>
<div
className={`w-element c1sdqiq6 cbpcpoz crv3s27 cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"geocoder_loader"}`} />
<p
className={`w-element c14s91he c1hic3qd c6zkp93 c1vgwqmx cearg2n ${"text-block-2 is--hidden"}`}>
<Link
href={"#"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"continue"}
</Link>
</p>
<div
data-elem={"geocoder"}
className={`w-element c139pwc6 cjkauba c1y9x0uu c9te4zd`} />
</div>
<div
data-elem={"geocode-wrap"}
className={`w-element c1numhkq c1a06u5s c1diokdk c1nt8u3l cdxqbrh c139pwc6 c103rere c1cm3ox3`}>
<h3
data-field={"multi-address-text"}
className={`w-element c1g3mhtg c4ijzwc c18mkjfw c1vgwqmx c1p4xat6 c16gn7ol c1mndzy8 c1wp480m c1pfgp4h c7zt1vs ckq2phi clycue7 c1s59rie`}>
{"What's your address"}
<sup
data-elem={"add-sus"}
className={`w-element`}>
{"2 "}
</sup>
{"?"}
</h3>
<div
className={`w-element c1sdqiq6 cbpcpoz crv3s27 cw0d079 c1mpqvj6 c18kyhsr c81ebuq cpvaxa ${"geocoder_loader"}`} />
<p
className={`w-element c14s91he c1hic3qd c6zkp93 c1vgwqmx cearg2n ${"text-block-2 is--hidden"}`}>
<Link
href={"#"}
className={`w-element c82qwqc c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`}>
{"continue"}
</Link>
</p>
<div
data-elem={"geocoder"}
className={`w-element c139pwc6 cjkauba c1y9x0uu c9te4zd`} />
</div>
<div
data-elem={"multi-prop-last"}
className={`w-element c1numhkq c1a06u5s c1diokdk ch3nxmx c1lstedc c139pwc6`}>
<button
data-elem={"multi-next-button-1"}
className={`w-element c1lvj0n c1t6vvls cpxswal cacmu18 c1numhkq c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w c1pjr8f ch7xx7z c5mb4u7 cx6mbsi ca9fo5a c1nmokvj c1inzmra c5ifbpp caaxdnm cdtjoju c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c13qspjq c1cqma02 c1jvw4nv c1yhof13 c18mkjfw c1o3a6u c1mu3xge cahz6x0 cmchden cfsvlg c10iz0pl c5g53jj cba5e3y cw8j8n1 celyf79 ce7eq67 c1iedw11 c1plys2`}>
{"Next"}
</button>
<div
data-field={"multi-geocode-add"}
className={`w-element c1numhkq c1a06u5s c1diokdk ch3nxmx c139pwc6`}>
<h3
data-field={"multi-address-text"}
className={`w-element c1g3mhtg c4ijzwc c18mkjfw c1vgwqmx c1p4xat6 c16gn7ol c1mndzy8 c1wp480m c1pfgp4h c7zt1vs ckq2phi clycue7 c1s59rie`}>
{"Have another address?"}
</h3>
<Link
href={"#"}
data-elem={"add-new-add"}
className={`w-element c1o5abpq c1diokdk ch3nxmx c18hkk31 c1owcyig c1d7h9xn`}>
<Image
src={"/assets/add_12080026_Vvqm2mfaWw1av6re0h2cF.png"}
width={512}
height={512}
alt={""}
loading={"lazy"}
className={`w-image c1qoclw0 c1hwvjgs cdmu5h7 czbu68a c1owcyig`} />
</Link>
</div>
</div>
</div>
<div
data-elem={"multi-map-wrap"}
className={`w-element c1numhkq c1diokdk ch3nxmx c1a06u5s corkoda ct8i6vm c1lubjeg c1h63euj ${"is--hidden"}`}>
<div
data-elem={"multi-size-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c1numhkq c1a06u5s c1diokdk c3auquk c13g3obg c8lozzs c1g4ou9b c3gou43 c1ka8hwj c18z6qun c1ma3j39 ca5v07y`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cu2kdg8 c139pwc6 c1txodcv c18a8z5x c13gb9an c14rh8tu c1fjl1d4 cimibkh c4vcdpw c1jhvg8i c16iqon5 ${"estimator__topbar is--pad"}`} />
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
src={"/assets/circle_green_72pqHqP6XmMru-2OGtKg7.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
className={`w-element cgw13qo c1owcyig c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx crv3s27 ${"map_container"}`}>
<div
data-element={"prompt-2"}
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt-2"}`}>
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
src={"/assets/circle_green_72pqHqP6XmMru-2OGtKg7.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c19i8jsr`} />
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
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
data-field={"map-container"}
className={`w-element cgw13qo c1owcyig`}>
<div
id={"map1"}
data-elem={"map"}
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
data-button={"prompt-1"}
className={`w-element c1numhkq c3auquk c1pit5s0 c3qgmhh c1txodcv cl4dpup c19hxin1 ${"prompt__buttons"}`}>
<Link
data-elem={"reset-polygon"}
href={"#"}
className={`w-element c1numhkq c1t07noa c1a06u5s c1diokdk ch3nxmx c123nk4a cgdwgpj cdfm6cp c68ft1t c1lzjd2w c144x14e c1hic3qd c1mndzy8 c61em0b cacmu18 c1ryk5rj c1787cam cjmfysa c1no8he2 cdubd0c cl4dpup`}>
{"Reset Polygon"}
</Link>
<Link
data-elem={"adjust"}
href={"#"}
className={`w-element c1numhkq c1diokdk ch3nxmx c1lzjd2w c4nx8a8 c1f8ee6y c5este cut5nle ch7xx7z c8d36da cacmu18 c150bkmj ccqa9kw c2yws97 c1qporyx c1n5kit4 cb5io3 c7kupny c1qp0l1p c7pwpdo cl4dpup`}>
{"Adjust"}
</Link>
</div>
</div>
</div>
</div>
<HtmlEmbed
code={"<script>\ndocument.addEventListener('DOMContentLoaded', (event) => {\n$(\"[data-element='prompt-2']\").hide()\n$(\"[data-button='prompt-2']\").hide()\n\n$(\"#editBtn\").click(function () {\n    $(\"[data-element='prompt-1']\").hide()\n    $(\"[data-button='prompt-1']\").hide()\n    $(\"[data-button='prompt-2']\").show()\n    $(\"[data-element='prompt-2']\").show()\n})\n\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
data-elem={"multi-size-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c1numhkq c1a06u5s c1diokdk c3auquk c13g3obg c8lozzs c1g4ou9b c3gou43 c1ka8hwj c18z6qun c1ma3j39 ca5v07y`}>
<div
className={`w-element c1numhkq c1diokdk ch3nxmx cu2kdg8 c139pwc6 c1txodcv c18a8z5x c13gb9an c14rh8tu c1fjl1d4 cimibkh c4vcdpw c1jhvg8i c16iqon5 ${"estimator__topbar is--pad"}`} />
<div
className={`w-element cgw13qo c1owcyig c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx crv3s27 ${"map_container"}`}>
<div
data-element={"prompt-2"}
className={`w-element c1numhkq c1diokdk c3auquk cos49l8 c1txodcv c18a8z5x cmka1oc c1arvnkf c1iksoao c16y6e4p ciylvte ${"prompt-2"}`}>
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
src={"/assets/circle_green_72pqHqP6XmMru-2OGtKg7.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c19i8jsr`} />
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
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 cgvpcq3`}>
{"Insurance"}
</p>
</div>
</div>
</div>
<div
data-field={"map-container"}
className={`w-element cgw13qo c1owcyig`}>
<div
id={"map2"}
data-elem={"map"}
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
data-button={"prompt-1"}
className={`w-element c1numhkq c3auquk c1pit5s0 c3qgmhh c1txodcv cl4dpup c19hxin1 ${"prompt__buttons"}`}>
<Link
data-elem={"reset-polygon"}
href={"#"}
className={`w-element c1numhkq c1t07noa c1a06u5s c1diokdk ch3nxmx c123nk4a cgdwgpj cdfm6cp c68ft1t c1lzjd2w c144x14e c1hic3qd c1mndzy8 c61em0b cacmu18 c1ryk5rj c1787cam cjmfysa c1no8he2 cdubd0c cl4dpup`}>
{"Reset Polygon"}
</Link>
<Link
data-elem={"adjust"}
href={"#"}
className={`w-element c1numhkq c1diokdk ch3nxmx c1lzjd2w c4nx8a8 c1f8ee6y c5este cut5nle ch7xx7z c8d36da cacmu18 c150bkmj ccqa9kw c2yws97 c1qporyx c1n5kit4 cb5io3 c7kupny c1qp0l1p c7pwpdo cl4dpup`}>
{"Adjust"}
</Link>
</div>
</div>
</div>
</div>
<HtmlEmbed
code={"<script>\ndocument.addEventListener('DOMContentLoaded', (event) => {\n$(\"[data-element='prompt-2']\").hide()\n$(\"[data-button='prompt-2']\").hide()\n\n$(\"#editBtn\").click(function () {\n    $(\"[data-element='prompt-1']\").hide()\n    $(\"[data-button='prompt-1']\").hide()\n    $(\"[data-button='prompt-2']\").show()\n    $(\"[data-element='prompt-2']\").show()\n})\n\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<button
data-elem={"2nd-next-button"}
className={`w-element c1lvj0n c1t6vvls cpxswal cacmu18 c1numhkq c1u81kxm c1v2l8nt c1diokdk ch3nxmx c1lzjd2w c1pjr8f ch7xx7z c5mb4u7 cx6mbsi ca9fo5a c1nmokvj c1inzmra c5ifbpp caaxdnm cdtjoju c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c13qspjq c1cqma02 c1jvw4nv c1yhof13 c18mkjfw c1o3a6u c1mu3xge cahz6x0 cmchden cfsvlg c10iz0pl c5g53jj cba5e3y cw8j8n1 celyf79 ce7eq67 c1iedw11 c1plys2`}>
{"Continue To Select Your Materials"}
</button>
</div>
<div
data-elem={"material-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri c1udcfnb c13g3obg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"is--hidden"}`}>
<div
data-element={"prompt-1"}
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
src={"/assets/check_fill_tQnPoWF842QzJopBB5w6c.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"/assets/circle_green_72pqHqP6XmMru-2OGtKg7.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"/assets/circle_grey_2-5jFzta9VkTJxxl1OQkD.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Asphalt"}
</span>
</label>
<label
htmlFor={"silicone"}
id={"label-silicone"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"silicone"}
id={"silicone"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph ckm8etu cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Silicone Roof Coating"}
</span>
</label>
<label
htmlFor={"TPO"}
id={"label-tpo"}
className={`w-element c1numhkq cdyc65v ct0qrmw c139pwc6 csz3km6 c1epvuph c1ryk5rj c1rvbvnt c837vh1 c1fa1rj5 cf50fwx c1d7h9xn`}>
<Input
type={"radio"}
name={"material"}
value={"TPO"}
id={"tpo"}
className={`w-element c139pwc6 cjkauba cnbug7k cgwe1hs c13qspjq c1cqma02 c1jvw4nv c1yhof13 c1d7h9xn c1uqq2pr c1mzjf6g ${"radio"}`} />
<div
className={`w-element c139pwc6 cjkauba c1epvuph cpzejbj cfl3b43 clf6gxr c1rvbvnt c837vh1 c1fa1rj5 cf50fwx cn3acoi c1lradul cmmvh06 c5r8ecx cpmlyxd c1r2737e cgtmmxo c1cukx3 c3su6au cssvpg7 c1dxs9tj ${"radio-image"}`} />
<span
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
{"Flat TPO"}
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
className={`w-element cnbug7k c1dtt862 c1e9a5r9 c1rxl3x c61em0b ciav3dk c1jgbj34 c1lvj0n cqhx45d ce6x08i c1i6iusr c69143i cdmkm0y cxr71cz c1k6jc8w cw97iio`}>
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
data-elem={"form-wrap"}
className={`w-element c1p0m755 c139pwc6 c1cunrri czvtnxg c1g4ou9b c3gou43 c619udc c1ma3j39 ca5v07y ${"is--hidden"}`}>
<div
data-element={"prompt-1"}
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
src={"/assets/check_fill_tQnPoWF842QzJopBB5w6c.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
src={"/assets/check_fill_tQnPoWF842QzJopBB5w6c.svg"}
width={24}
height={24}
alt={""}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<p
className={`w-element c1fys859 clh8nk7 cjl1vg1 c9vdfns`}>
{"Material"}
</p>
</div>
<div
className={`w-element c1numhkq c1a06u5s c1diokdk ct0qrmw c169jguh c1gijf1r c1epvuph c1edz3f7`}>
<Image
loading={"lazy"}
src={"/assets/check_fill_tQnPoWF842QzJopBB5w6c.svg"}
width={24}
height={24}
alt={""}
data-icon={"filled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
<Image
loading={"lazy"}
src={"/assets/circle_green_72pqHqP6XmMru-2OGtKg7.svg"}
width={24}
height={24}
alt={""}
data-icon={"unfilled"}
className={`w-image c139pwc6 c1hwvjgs cdmu5h7 c8bhanq ce6x08i c1bxcui0 c19i8jsr`} />
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
id={"single-prop"}
data-form={"commercial"}
className={`w-element cqbnnz9`}>
<h2
className={`w-element c1jyvd5g c1rxl3x cakyt4y c1mndzy8 c18bwt63 ckecbya c1cwbm0l cfxkkks c1ns9r0m cxyjskp cgjldxo`}>
{"Finish with your info and see price results instantly."}
</h2>
<RemixForm
id={"wf-form-Single-Prop-2"}
data-api-endpoint={"https://forms.improveitmd.com/api/submit"}
action={"javascript:void(0)"}
className={`w-element`}>
<div
className={`w-element c1numhkq c3auquk c13g3obg c1350r63 cl4dpup c1txodcv cyx0g81 cfbrk2z`}>
<Input
id={"name-multi"}
name={"Name"}
type={"text"}
placeholder={"Your name"}
required={true}
data-elem={"name"}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<Input
id={"phone-multi"}
name={"Phone"}
type={"tel"}
placeholder={"Phone"}
required={true}
minLength={10}
data-elem={"phone"}
className={`w-element c1pvyjtw c122ebly cgdwgpj c68ft1t c3479dk c1jiyfml c1lzjd2w c9slfh6 ch7xx7z c8d36da cgxlank cl3fyte c8jw8du c3srv1f cu1n9xe c1ouj8is cip3dn2 c1l3w6s8 c2yws97 c1qporyx c1n5kit4 cb5io3 cnwi6s4 c1lq6pq8 c2pp7ru c1qk8gsb c8c8l7g c1dqx44u cde7xzu c1q789z0 cix4cc0 c69juqd c1554q0w cir68kq`} />
<HtmlEmbed
code={"<input type=\"hidden\" data-elem=\"storm-damange\" value=\"No\">"}
className={`w-html-embed`} />
<button
type={"submit"}
data-elem={"submit"}
className={`w-element c1ofez6z c9djrgv c18hkk31 c1jiyfml c1g3mhtg c1fhsgtb c8d36da c1lvj0n c1n4271i c1nmokvj c2yws97 c1qporyx c1n5kit4 cb5io3 c13qspjq c1cqma02 c1jvw4nv c1yhof13 cv0jqge cq3iv3s cja6q2j czdv9km c1rgg99s c1r2737e cgtmmxo c1cukx3 c3su6au c1d7h9xn crv3s27 cvtl69h c1f445le c1ipiex8 c1554q0w cir68kq c1ef6u0e culorum cl4dpup`}>
{"SEE RESULTS NOW"}
</button>
</div>
</RemixForm>
</div>
<HtmlEmbed
code={"<script>\n\ndocument.addEventListener('DOMContentLoaded', (event) => {\n// Clear custom validity when the user starts to correct the input\n/*\n['phone-yes', 'phone-no'].forEach(fieldId => {\n    document.getElementById(fieldId).addEventListener('input', function() {\n        this.setCustomValidity('');\n    }); })\n    */\n$(\"[data-icon='filled']\").hide()\n$(\"[data-form='commercial']\").hide()\n//$(\"[data-form='damage-no']\").hide()\n\n$('input[name=\"Damage\"]').click(function () {\n    if ($(this).val() === \"Yes.\") {\n        $(\"[data-form='commercial']\").show();\n        $(\"input[type=hidden]\").val('Yes');\n        $(\"[data-element='insurance-wrap']\").hide();\n        //$(\"[data-form='damage-no']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    } else {\n        $(\"[data-form='commercial']\").show();\n        $(\"[data-element='insurance-wrap']\").hide();\n                $(\"input[type=hidden]\").val('No');\n\n        //$(\"[data-form='damage-yes']\").hide();\n        $(\"[data-icon='filled']\").show();\n        $(\"[data-icon='unfilled']\").hide();\n    }\n});\n})\n</script>"}
clientOnly={true}
className={`w-html-embed`} />
</div>
<div
data-elem={"results-wrap-multi"}
className={`w-element c1numhkq c1a06u5s c3auquk c1p0m755 c139pwc6 c1cunrri cidlv9n c14e2i27 c1rt95ji c5a8cr6 ciylvte c619udc ${"is--hidden"}`}>
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
className={`w-element c1numhkq c1kssyyd c3nuxyf cxlc9gr c15sicby c11q9q0a cddo8ff c1uemp3r ccaufd5 c1umnxkx c1a06u5s c4ph8p6 cnods77 c1yt6hv7 cyyof5h c1t9puix c1qcj66c c1sw8x31 cles91e czr9sbv cu8qcns c4fmmfv cybbdyg cljixpu`}>
<div
className={`w-element c18bj3o3 c1lq6pq8 c1numhkq c1a06u5s c17rwy3n c1603wqb cy60nkm c1vgwqmx`}>
<p
className={`w-element c1gbsy9l c1jqias8`}>
{"Price range for "}
<span
data-elem={"material-selected"}
className={`w-element`}>
{"Asphalt Shingles"}
</span>
</p>
<div
data-elem={"address-pricing-wrap"}
className={`w-element c1numhkq c1a06u5s c1pit5s0 c3qgmhh czb1yr6 c1agn991 c1h3ixjh chbaoi8 c1ghmn0`}>
<p
data-elem={"results-address"}
className={`w-element c309ipl`}>
{"Address"}
</p>
<p
className={`w-element c1gcrf2e cpdrt5z c1pjr8f`}>
{"$"}
<span
data-elem={"lowPrice"}
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
data-elem={"highPrice"}
className={`w-element`}>
{"12,400"}
</span>
</p>
</div>
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
href={"/quote"}
target={"_self"}
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
href={"/quote"}
target={"_self"}
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
className={`w-element c1numhkq c1a06u5s c15kiuw7 ct0qrmw c1e3sjlf c16xjt02 c5zgd1 c1hd4o6l c11q9q0a cddo8ff czbonp3 cce8wht c1sb614n cnods77 c1yt6hv7 cu8qcns c4fmmfv ${"results_top-bottom is--hidden"}`}>
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
src={"/assets/ci_storm-map_1_-LAH--T-9aHMrFSIfafib.svg"}
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
id={"Name-5"}
name={"Name"}
placeholder={"Name"}
required={true}
type={"text"}
data-field={"name"}
className={`w-element c1rbcgj0 cniq5v2 c15ai560 c1ch8bq c1x9vsvi c1gbsy9l c19x9ksz cy60nkm c1vgwqmx c9gf47x c1upa51b cg8y2lt ctvlq9m cwa1yh5 c1y8ksq2 c1fmjy5t c9x9jza c1d5w6j7 cry5m16 cjprnnz ccy7w4l c9lszw4 cd89h47 c1kreka c30x0kf c15rree9 cos8g46 c1bc2t9 chioh6o cmtckwo`} />
<Input
id={"Phone-3"}
name={"Phone"}
placeholder={"Phone"}
required={true}
type={"tel"}
data-field={"phone"}
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
src={"/assets/Vector_iOXiYDIaoBXz9-Wh9Cj2K.svg"}
width={60}
height={62}
alt={""}
className={`w-image c1sd6lnu c1hwvjgs cdmu5h7 czbu68a c1x1zhvf`} />
</div>
</div>
</div>
</div>
</div>
</div>
</header>
</section>
</Fragment_1>
</Slot>
</Box>
</Box>
</Body>
}


      export { Page }
    