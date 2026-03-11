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
} from "../__generated__/[roofing]._index";
import {
  getResources,
  getPageMeta,
  getRemixParams,
  contactEmail,
} from "../__generated__/[roofing]._index.server";
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
          "@type": "Service",
          "@id": "https://improveitmd.com/roofing#service",
          "name": "Roofing Services - Capitol Improvements",
          "url": "https://improveitmd.com/roofing",
          "serviceType": "Roofing",
          "description": "GAF Master Elite and Atlas Pro Plus certified roofing contractor replacing and repairing roofs in Maryland, DC, and Virginia. GAF Timberline and Atlas Scotchgard Protector shingles, metal roofing, and TPO flat roofing with lifetime warranty options.",
          "brand": [
            {
              "@type": "Brand",
              "name": "GAF",
              "url": "https://www.gaf.com"
            },
            {
              "@type": "Brand",
              "name": "Atlas Roofing",
              "url": "https://www.atlasroofing.com"
            }
          ],
          "provider": {
            "@id": "https://improveitmd.com/#corporation"
          },
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
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Roofing Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Asphalt Shingle Roof Replacement",
                  "description": "GAF Timberline HDZ and Atlas Scotchgard Protector shingles with lifetime limited warranties. Available in 50+ colors."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Atlas Scotchgard Protector Shingle Roof",
                  "description": "Atlas shingles with 3M Scotchgard Protector — resists black streaks caused by algae for a cleaner-looking roof over time."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Metal Roofing Installation",
                  "description": "Standing seam and metal shingle roofing for superior longevity and energy efficiency."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "TPO Flat Roof Installation",
                  "description": "MuleHide Certified TPO single-ply membrane flat roofing for commercial and residential low-slope roofs."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Roof Repair",
                  "description": "Emergency and non-emergency roof repairs including leak detection, shingle replacement, and flashing repair."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Storm Damage Roof Replacement",
                  "description": "Insurance-assisted roof replacement following storm, hail, or wind damage."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "FORTIFIED Roof Certification",
                  "description": "IBHS FORTIFIED Home designation for enhanced storm resistance and potential insurance discounts."
                }
              }
            ]
          },
          "offers": {
            "@type": "Offer",
            "priceRange": "$"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://improveitmd.com/roofing#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does a roof replacement take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most residential roof replacements take 1–2 days depending on roof size, pitch, and complexity. We typically complete jobs in a single day for standard homes."
              }
            },
            {
              "@type": "Question",
              "name": "What roofing brands do you use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We are both a GAF Master Elite and Atlas Pro Plus certified contractor. We primarily install GAF Timberline HDZ shingles and Atlas Scotchgard Protector shingles, both offering lifetime limited warranties and algae resistance."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer financing for roof replacements?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We offer financing starting from $99/month. We can discuss financing options during your free estimate."
              }
            },
            {
              "@type": "Question",
              "name": "What is a FORTIFIED roof?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "FORTIFIED is a designation from the Insurance Institute for Business & Home Safety (IBHS) that certifies your roof meets enhanced construction standards for storm resistance. It can qualify homeowners for insurance discounts."
              }
            },
            {
              "@type": "Question",
              "name": "Do you serve Maryland, DC, and Virginia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We have three branch offices covering all of Maryland, Washington DC, and Northern Virginia. See our service areas page for specific cities."
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
