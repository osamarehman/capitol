import {
  type MetaFunction,
  type LinksFunction,
  type LinkDescriptor,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type HeadersFunction,
  data,
  redirect,
  useLoaderData,
} from "react-router";
import {
  isLocalResource,
  loadResource,
  loadResources,
  formIdFieldName,
  formBotFieldName,
  cachedFetch,
} from "@webstudio-is/sdk/runtime";
import {
  ReactSdkContext,
  PageSettingsMeta,
  PageSettingsTitle,
} from "@webstudio-is/react-sdk/runtime";
import {
  projectId,
  Page,
  siteName,
  favIconAsset,
  pageFontAssets,
  pageBackgroundImageAssets,
  breakpoints,
} from "../__generated__/_index";
import {
  getResources,
  getPageMeta,
  getRemixParams,
  contactEmail,
} from "../__generated__/_index.server";
import * as constants from "../constants.mjs";
import css from "../__generated__/index.css?url";
import { sitemap } from "../__generated__/$resources.sitemap.xml";
import { assets } from "../__generated__/$resources.assets";

const customFetch: typeof fetch = (input, init) => {
  if (typeof input !== "string") {
    return cachedFetch(projectId, input, init);
  }

  if (isLocalResource(input, "sitemap.xml")) {
    // @todo: dynamic import sitemap ???
    const response = new Response(JSON.stringify(sitemap));
    response.headers.set("content-type", "application/json; charset=utf-8");
    return Promise.resolve(response);
  }

  if (isLocalResource(input, "current-date")) {
    const now = new Date();
    // Normalize to midnight UTC to prevent hydration mismatches
    const startOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const data = {
      iso: startOfDay.toISOString(),
      year: startOfDay.getUTCFullYear(),
      month: startOfDay.getUTCMonth() + 1, // 1-12 instead of 0-11
      day: startOfDay.getUTCDate(),
      timestamp: startOfDay.getTime(),
    };
    const response = new Response(JSON.stringify(data));
    response.headers.set("content-type", "application/json; charset=utf-8");
    return Promise.resolve(response);
  }

  if (isLocalResource(input, "assets")) {
    const response = new Response(JSON.stringify(assets));
    response.headers.set("content-type", "application/json; charset=utf-8");
    return Promise.resolve(response);
  }

  return cachedFetch(projectId, input, init);
};

export const loader = async (arg: LoaderFunctionArgs) => {
  const url = new URL(arg.request.url);
  const host =
    arg.request.headers.get("x-forwarded-host") ||
    arg.request.headers.get("host") ||
    "";
  url.host = host;
  url.protocol = "https";

  const params = getRemixParams(arg.params);
  const system = {
    params,
    search: Object.fromEntries(url.searchParams),
    origin: url.origin,
    pathname: url.pathname,
  };

  const resources = await loadResources(
    customFetch,
    getResources({ system }).data
  );
  const pageMeta = getPageMeta({ system, resources });

  if (pageMeta.redirect) {
    const status =
      pageMeta.status === 301 || pageMeta.status === 302
        ? pageMeta.status
        : 302;
    throw redirect(pageMeta.redirect, status);
  }

  // typecheck
  arg.context.EXCLUDE_FROM_SEARCH satisfies boolean;

  if (arg.context.EXCLUDE_FROM_SEARCH) {
    pageMeta.excludePageFromSearch = arg.context.EXCLUDE_FROM_SEARCH;
  }

  return data(
    {
      host,
      url: url.href,
      system,
      resources,
      pageMeta,
    },
    // No way for current information to change, so add cache for 10 minutes
    // In case of CRM Data, this should be set to 0
    {
      status: pageMeta.status,
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    }
  );
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=0, must-revalidate",
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const metas: ReturnType<MetaFunction> = [];
  if (data === undefined) {
    return metas;
  }

  const origin = `https://${data.host}`;

  // [inject-schemas] JSON-LD structured data
  metas.push({
    "script:ld+json": {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "Capitol Improvements",
          "url": "https://www.improveitmd.com"
        },
        {
          "@type": [
            "HomeAndConstructionBusiness",
            "RoofingContractor",
            "GeneralContractor"
          ],
          "@id": "https://www.improveitmd.com/#corporation",
          "name": "Capitol Improvements",
          "url": "https://www.improveitmd.com",
          "logo": "https://v2.improveitmd.com/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_893ebd2848.svg",
          "image": "https://v2.improveitmd.com/uploads/capitol_improvements_logo_main_Nd_E_Tm_Jnbu_Uj_H_Kf4_92i4_893ebd2848.svg",
          "telephone": "+1-301-769-6909",
          "email": "support@improveitmd.com",
          "priceRange": "$",
          "slogan": "Capable. Experienced. Fair to you.",
          "description": "Capitol Improvements is a family-owned exterior remodeling company serving Maryland, DC, and Virginia since 2010. What sets us apart: we run dedicated specialist crews for each trade — expert roofers, expert siding installers, expert window and door installers, expert deck builders, and expert gutter crews — all under one roof. Founded by Pat Jewell, whose 30+ years of industry experience and connections built the best team in the region. GAF Master Elite, Atlas Pro Plus, FORTIFIED, MuleHide TPO Certified, James Hardie Preferred, TimberTech Platinum, and Provia Door & Window certified.",
          "foundingDate": "2010",
          "founder": {
            "@type": "Person",
            "@id": "https://www.improveitmd.com/#patjewell",
            "name": "Pat Jewell",
            "jobTitle": "Owner & Founder",
            "description": "Pat Jewell has 30+ years of experience in the exterior remodeling industry. He founded Capitol Improvements in 2010, leveraging his deep industry knowledge and relationships to assemble the best remodeling team in the Maryland, DC, and Virginia area."
          },
          "award": [
            "GAF Master Elite Certified Contractor",
            "Atlas Pro Plus Certified Contractor",
            "FORTIFIED Roofing Certified Contractor",
            "MuleHide Certified TPO Roofing Contractor",
            "James Hardie Preferred Partner",
            "TimberTech Platinum Certified Contractor",
            "Provia Door & Window Certified Contractor"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "license",
              "name": "MHIC 130628"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Exterior Remodeling Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Residential Roofing",
                  "description": "Dedicated roofing crew — GAF Master Elite, Atlas Pro Plus, and FORTIFIED certified. GAF Timberline and Atlas Scotchgard Protector shingles, metal roofing, storm damage replacement.",
                  "url": "https://www.improveitmd.com/roofing"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "TPO Flat Roofing",
                  "description": "Dedicated flat roofing crew — MuleHide Certified TPO contractor. TPO and EPDM single-ply membrane systems for commercial and residential low-slope roofs.",
                  "url": "https://www.improveitmd.com/roofing/flat-roofing"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Siding Installation",
                  "description": "Dedicated siding crew — James Hardie Preferred Partner. Fiber cement, vinyl, and engineered wood siding.",
                  "url": "https://www.improveitmd.com/siding"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Window Replacement",
                  "description": "Dedicated window and door crew — Provia Certified. ENERGY STAR windows in double-hung, casement, bay, bow, slider, and picture styles.",
                  "url": "https://www.improveitmd.com/windows"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Entry Door Installation",
                  "description": "Dedicated window and door crew — Provia Certified. Fiberglass, steel, storm doors, patio doors, and French doors.",
                  "url": "https://www.improveitmd.com/doors"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Seamless Gutter Installation",
                  "description": "Dedicated gutter crew — seamless aluminum gutters, gutter guards, and fascia board replacement.",
                  "url": "https://www.improveitmd.com/gutters"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Exterior Trim",
                  "description": "Fascia, soffit, rake boards, corner boards, and window trim in wood, PVC, and composite.",
                  "url": "https://www.improveitmd.com/exterior-trim"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Deck & Patio Construction",
                  "description": "Dedicated deck crew — TimberTech Platinum certified. Composite, Ipe hardwood, rooftop decks, and flagstone patios.",
                  "url": "https://www.improveitmd.com/decks-and-patios"
                }
              }
            ]
          },
          "knowsAbout": [
            "Residential Roofing",
            "Roof Replacement",
            "Roof Repair",
            "Metal Roofing",
            "Asphalt Shingles",
            "GAF Timberline",
            "Atlas Roofing",
            "Atlas StormMaster Shingles",
            "Scotchgard Protector Shingles",
            "FORTIFIED Roof",
            "Commercial Flat Roofing",
            "TPO Roofing",
            "EPDM Roofing",
            "MuleHide TPO Roofing",
            "Flat Roof Installation",
            "Flat Roof Repair",
            "Low-Slope Roofing",
            "Single-Ply Membrane Roofing",
            "Siding Installation",
            "James Hardie Fiber Cement",
            "HardiePlank",
            "Vinyl Siding",
            "Window Replacement",
            "Provia Windows",
            "Energy Efficient Windows",
            "ENERGY STAR Windows",
            "Double-Hung Windows",
            "Casement Windows",
            "Bay Windows",
            "Door Installation",
            "Entry Door Replacement",
            "Fiberglass Doors",
            "Steel Doors",
            "Provia Doors",
            "Storm Door Installation",
            "Patio Door Replacement",
            "Seamless Gutters",
            "Gutter Guard Installation",
            "LeafFilter",
            "Exterior Trim",
            "Fascia",
            "Soffit",
            "Rake Board",
            "Deck Building",
            "Composite Decking",
            "TimberTech",
            "Ipe Hardwood Decks",
            "Flagstone Patios"
          ],
          "areaServed": [
            {
              "@type": "State",
              "name": "Maryland"
            },
            {
              "@type": "State",
              "name": "Virginia"
            },
            {
              "@type": "State",
              "name": "District of Columbia"
            }
          ],
          "subOrganization": [
            {
              "@type": [
                "HomeAndConstructionBusiness",
                "RoofingContractor"
              ],
              "name": "Capitol Improvements - Roofing Company & Siding Contractor",
              "@id": "https://www.improveitmd.com/#bowie-hq",
              "description": "Bowie Headquarters led by founder Pat Jewell.",
              "employee": {
                "@id": "https://www.improveitmd.com/#patjewell"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "12606 Hillmeade Station Dr.",
                "addressLocality": "Bowie",
                "addressRegion": "MD",
                "postalCode": "20720",
                "addressCountry": "US"
              },
              "telephone": "+1-301-769-6909",
              "sameAs": [
                "https://maps.google.com/?cid=16068834676004648914"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "221"
              }
            },
            {
              "@type": [
                "HomeAndConstructionBusiness",
                "GeneralContractor",
                "RoofingContractor"
              ],
              "name": "Capitol Improvements - Gaithersburg Roofing Company & Siding Contractors",
              "@id": "https://www.improveitmd.com/#gaithersburg-branch",
              "description": "Gaithersburg branch managed by Lance Jewell.",
              "employee": {
                "@type": "Person",
                "name": "Lance Jewell",
                "jobTitle": "Branch Manager"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "7916 Plum Creek Dr.",
                "addressLocality": "Gaithersburg",
                "addressRegion": "MD",
                "postalCode": "20879",
                "addressCountry": "US"
              },
              "telephone": "+1-301-769-6991",
              "sameAs": [
                "https://maps.google.com/?cid=15586620389309298581"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "157"
              }
            },
            {
              "@type": [
                "HomeAndConstructionBusiness",
                "RoofingContractor"
              ],
              "name": "Capitol Improvements Washington DC - Roofing | Siding | Doors",
              "@id": "https://www.improveitmd.com/#dc-branch",
              "description": "DC and Northern Virginia branch managed by Austin Jewell.",
              "employee": {
                "@type": "Person",
                "name": "Austin Jewell",
                "jobTitle": "Branch Manager"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1015 15th St NW #635",
                "addressLocality": "Washington",
                "addressRegion": "DC",
                "postalCode": "20005",
                "addressCountry": "US"
              },
              "telephone": "+1-410-587-0128",
              "sameAs": [
                "https://maps.google.com/?cid=2475724944710896218"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "67"
              }
            }
          ]
        }
      ]
    }
  });

  return metas;
};

export const links: LinksFunction = () => {
  const result: LinkDescriptor[] = [];

  result.push({
    rel: "stylesheet",
    href: css,
  });

  if (favIconAsset) {
    result.push({
      rel: "icon",
      href: constants.imageLoader({
        src: `${constants.assetBaseUrl}${favIconAsset}`,
        // width,height must be multiple of 48 https://developers.google.com/search/docs/appearance/favicon-in-search
        width: 144,
        height: 144,
        fit: "pad",
        quality: 100,
        format: "auto",
      }),
      type: undefined,
    });
  }

  for (const asset of pageFontAssets) {
    result.push({
      rel: "preload",
      href: `${constants.assetBaseUrl}${asset}`,
      as: "font",
      crossOrigin: "anonymous",
    });
  }

  for (const backgroundImageAsset of pageBackgroundImageAssets) {
    result.push({
      rel: "preload",
      href: `${constants.assetBaseUrl}${backgroundImageAsset}`,
      as: "image",
    });
  }

  return result;
};

const getRequestHost = (request: Request): string =>
  request.headers.get("x-forwarded-host") || request.headers.get("host") || "";

export const action = async ({
  request,
  context,
}: ActionFunctionArgs): Promise<
  { success: true } | { success: false; errors: string[] }
> => {
  try {
    const url = new URL(request.url);
    url.host = getRequestHost(request);

    const formData = await request.formData();

    const system = {
      params: {},
      search: {},
      origin: url.origin,
      pathname: url.pathname,
    };

    const resourceName = formData.get(formIdFieldName);
    let resource =
      typeof resourceName === "string"
        ? getResources({ system }).action.get(resourceName)
        : undefined;

    const formBotValue = formData.get(formBotFieldName);

    if (formBotValue == null || typeof formBotValue !== "string") {
      throw new Error("Form bot field not found");
    }

    // Skip timestamp validation for Brave browser
    // Brave Shields blocks matchMedia fingerprinting detection used in bot protection
    // See: https://github.com/brave/brave-browser/issues/46541
    if (formBotValue !== "brave") {
      const submitTime = parseInt(formBotValue, 16);
      // Assumes that the difference between the server time and the form submission time,
      // including any client-server time drift, is within a 5-minute range.
      // Note: submitTime might be NaN because formBotValue can be any string used for logging purposes.
      // Example: `formBotValue: jsdom`, or `formBotValue: headless-env`
      if (
        Number.isNaN(submitTime) ||
        Math.abs(Date.now() - submitTime) > 1000 * 60 * 5
      ) {
        throw new Error(`Form bot value invalid ${formBotValue}`);
      }
    }

    formData.delete(formIdFieldName);
    formData.delete(formBotFieldName);

    if (resource) {
      resource.body = Object.fromEntries(formData);
    } else {
      if (contactEmail === undefined) {
        throw new Error("Contact email not found");
      }

      resource = context.getDefaultActionResource?.({
        url,
        projectId,
        contactEmail,
        formData,
      });
    }

    if (resource === undefined) {
      throw Error("Resource not found");
    }
    const { ok, statusText } = await loadResource(fetch, resource);
    if (ok) {
      return { success: true };
    }
    return { success: false, errors: [statusText] };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
};

const Outlet = () => {
  const { system, resources, url, pageMeta, host } =
    useLoaderData<typeof loader>();
  return (
    <ReactSdkContext.Provider
      value={{
        ...constants,
        resources,
        breakpoints,
        onError: console.error,
      }}
    >
      {/* Use the URL as the key to force scripts in HTML Embed to reload on dynamic pages */}
      <Page key={url} system={system} />
      <PageSettingsMeta
        url={url}
        pageMeta={pageMeta}
        host={host}
        siteName={siteName}
        imageLoader={constants.imageLoader}
        assetBaseUrl={constants.assetBaseUrl}
      />
      <PageSettingsTitle>{pageMeta.title}</PageSettingsTitle>
    </ReactSdkContext.Provider>
  );
};

export default Outlet;
