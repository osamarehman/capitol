/**
 * Capitol Improvements — Global Site Script
 * Single optimized script for the entire improveitmd.com website.
 *
 * Modules (each has early return if DOM elements missing):
 *   1. Video LCP poster preloading
 *   2. (removed — help widget now inline in Webstudio)
 *   3. Weather widget (Mapbox geocoding + NOAA forecast + Swiper)
 *   4. (removed — nav code now inline in Webstudio)
 *   5. Lazy-load Google Maps iframes (/locations/* pages)
 *   6. Roofing cost calculator (/roofing-cost-calculator)
 *   7. Commercial roof calculator (/commercial-roof-cost-calculator)
 *   8. Swipers + GLightbox (gallery, testimonials, service sliders, lightbox galleries)
 *   9. Blog sidebar TOC + enterView scroll animations (blog posts)
 *  10. (removed — service area widget now inline in Webstudio)
 *  11. Phone input masking (any page with phone fields)
 *  12. Generic form submission handler (any form with data-submit="api")
 *
 * Usage in Webstudio:
 *   <script type="module" src="https://improveitmd.com/global.js"></script>
 *
 * CMS data contract — bind these data-* attributes to Strapi fields on a hidden element:
 *   <div id="local-page-config" style="display:none" aria-hidden="true"
 *     data-weather-enabled="{weatherWidget}"
 *     data-weather-location="{weatherWidgetLocationText}"
 *   ></div>
 */

// ===========================================================================
// CONFIG READER
// ===========================================================================
function getPageConfig() {
  const el = document.getElementById('local-page-config');
  if (!el) return null;
  return {
    weatherEnabled: el.dataset.weatherEnabled === 'true',
    weatherLocation: el.dataset.weatherLocation || '',
  };
}

// ===========================================================================
// 1. VIDEO LCP PRELOADER + SAFARI SOURCE-TYPE FIX
// ===========================================================================

// Safari rejects <source type="video/webm"> — if the actual file extension
// is .mp4 (or the URL contains .mp4) but the type says webm, fix it at
// runtime so Safari can play the video.  Also handles the reverse case.
(function fixVideoSourceTypes() {
  const typeByExt = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/mp4', '.ogg': 'video/ogg' };
  document.querySelectorAll('video source').forEach((source) => {
    const src = (source.getAttribute('src') || '').split('?')[0].toLowerCase();
    const declared = (source.getAttribute('type') || '').toLowerCase();
    if (!src || !declared) return;
    for (const [ext, mime] of Object.entries(typeByExt)) {
      if (src.includes(ext) && declared !== mime) {
        source.setAttribute('type', mime);
        // Force the parent video to re-evaluate sources
        const video = source.closest('video');
        if (video) video.load();
        break;
      }
    }
  });
})();

function initVideoPreloader() {
  const video = document.querySelector('video[data-lcp-video]');
  if (!video) return null;

  const poster = video.getAttribute('poster');
  if (!poster) return null;

  if (document.querySelector(`link[data-lcp-preload][href="${CSS.escape(poster)}"]`)) return null;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = poster;
  link.fetchPriority = 'high';
  link.dataset.lcpPreload = '';
  document.head.appendChild(link);

  return () => link.remove();
}

// ===========================================================================
// 2. HELP WIDGET / MODAL — removed (now inline in Webstudio)
// ===========================================================================

// ===========================================================================
// 3. WEATHER WIDGET
// ===========================================================================
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaW1wcm92ZWl0bWQiLCJhIjoiY2w1OXlhZ3BnMDAyMDNrcG9pdmU3OXNvcyJ9.8IKtnRJwbi7ss5MjeHGAkQ';

const WEATHER_ICONS = {
  'Sunny': 'https://cms.improveitmd.com/uploads/weather_sunny_c332fa771e.svg',
  'Partly Sunny': 'https://cms.improveitmd.com/uploads/weather_partly_sunny_7df1204a00.svg',
  'Cloudy': 'https://cms.improveitmd.com/uploads/weather_cloudy_224c9662f6.svg',
  'Rain': 'https://cms.improveitmd.com/uploads/weather_rain_bca30e7d44.png',
  'Thunderstorms': 'https://cms.improveitmd.com/uploads/weather_thunderstorm_530844c8c4.svg',
  'Winter Mix': 'https://cms.improveitmd.com/uploads/weather_winter_mix_0544b9c8ae.svg',
  'Windy': 'https://cms.improveitmd.com/uploads/weather_windy_cc0bac28ee.svg',
  'Hail': 'https://cms.improveitmd.com/uploads/weather_hail_20caa9aecb.svg',
  'Snow': 'https://cms.improveitmd.com/uploads/weather_snow_b95b7e775f.svg',
  'Fog': 'https://cms.improveitmd.com/uploads/weather_fog_48d499fa1c.svg',
  'Moon': 'https://cms.improveitmd.com/uploads/weather_moon_5698df72d6.svg',
  'Partly Moon': 'https://cms.improveitmd.com/uploads/weather_partly_moon_19811a328a.svg',
};

const PRECIPITATION_ICONS = {
  snow: 'https://cms.improveitmd.com/uploads/weather_snowflake_92164b02e3.svg',
  rain: 'https://cms.improveitmd.com/uploads/weather_water_drop_4bbe7a8445.svg',
};

const ICON_PATTERNS = [
  { pattern: /rain showers then sunny/i, key: 'Rain' },
  { pattern: /clear skies|clear|mostly clear/i, key: 'Sunny' },
  { pattern: /partly cloudy|partly sunny/i, key: 'Partly Sunny' },
  { pattern: /cloudy/i, key: 'Cloudy' },
  { pattern: /light rain|rain showers|rain/i, key: 'Rain' },
  { pattern: /light snow|snow showers/i, key: 'Snow' },
  { pattern: /heavy rain|rain storm/i, key: 'Rain' },
  { pattern: /thunderstorms|rain and lightning|scattered thunderstorms|isolated thunderstorms/i, key: 'Thunderstorms' },
  { pattern: /winter mix|rain and snow|rain and ice|sleet/i, key: 'Winter Mix' },
  { pattern: /windy|high winds/i, key: 'Windy' },
  { pattern: /hail/i, key: 'Hail' },
  { pattern: /snow|areas of blowing snow/i, key: 'Snow' },
  { pattern: /fog|foggy/i, key: 'Fog' },
];

function selectWeatherIcon(forecast) {
  if (!forecast) return WEATHER_ICONS['Sunny'];
  const lower = forecast.toLowerCase();
  for (const { pattern, key } of ICON_PATTERNS) {
    if (pattern.test(lower)) return WEATHER_ICONS[key] || WEATHER_ICONS['Sunny'];
  }
  return WEATHER_ICONS['Sunny'];
}

function selectPrecipitationIcon(forecast) {
  if (!forecast) return PRECIPITATION_ICONS.rain;
  return /snow|snowy/i.test(forecast) ? PRECIPITATION_ICONS.snow : PRECIPITATION_ICONS.rain;
}

async function fetchJson(url, signal) {
  const res = await fetch(url, {
    signal,
    headers: { 'User-Agent': '(improveitmd.com, support@improveitmd.com)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function processForecast(periods) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const summaries = {};
  const firstDay = dayNames[new Date(periods[0].startTime).getDay()];

  for (const period of periods) {
    const name = period.name.toLowerCase();
    if (name === 'today' || name === 'this afternoon') period.name = firstDay;
    if (name === 'tonight' || name === 'overnight') period.name = `${firstDay} Night`;

    const dayKey = period.name.replace(' Night', '');
    if (!summaries[dayKey]) summaries[dayKey] = { day: dayKey, dayPeriod: null, nightPeriod: null };

    if (period.isDaytime) summaries[dayKey].dayPeriod = period;
    else summaries[dayKey].nightPeriod = period;
  }

  return Object.values(summaries).map(({ day, dayPeriod, nightPeriod }) => {
    const abbrev = day.substring(0, 3).toUpperCase();
    const highTemp = dayPeriod?.temperature ?? 0;
    const lowTemp = nightPeriod?.temperature ?? (highTemp - 22);
    const dayPrecip = dayPeriod?.probabilityOfPrecipitation?.value ?? 0;
    const nightPrecip = nightPeriod?.probabilityOfPrecipitation?.value ?? 0;
    const highPrecipitation = Math.max(dayPrecip, nightPrecip);
    const dayForecast = dayPeriod?.shortForecast || nightPeriod?.shortForecast || '';
    const nightForecast = nightPeriod?.shortForecast || '';

    let weatherIcon;
    if (highPrecipitation >= 20) {
      const combined = `${dayForecast} ${nightForecast}`.toLowerCase();
      if (combined.includes('snow') && combined.includes('rain')) weatherIcon = WEATHER_ICONS['Winter Mix'];
      else if (combined.includes('snow')) weatherIcon = WEATHER_ICONS['Snow'];
      else if (combined.includes('rain')) weatherIcon = WEATHER_ICONS['Rain'];
      else if (combined.includes('thunderstorms')) weatherIcon = WEATHER_ICONS['Thunderstorms'];
      else weatherIcon = selectWeatherIcon(dayForecast);
    } else {
      weatherIcon = selectWeatherIcon(dayForecast);
    }

    const shortForecast = dayForecast
      .replace(/\b(Slight|Chance|Mostly|Areas of|Scattered|Isolated)\b/gi, '')
      .trim();

    return {
      day: abbrev,
      highTemp,
      lowTemp,
      highPrecipitation,
      precipitationIcon: selectPrecipitationIcon(dayForecast),
      weatherIcon,
      shortForecast,
      isNight: highTemp === 0,
    };
  });
}

function renderWeatherSlides(data) {
  const wrapper = document.querySelector('.swiper-wrapper.is-weather');
  if (!wrapper) return;

  wrapper.innerHTML = data.map((item) => `
    <div class="swiper-slide is--weather">
      <div class="weather_card ${item.isNight ? 'is-night' : 'is-day'}">
        <div class="weather_card-top">
          <div class="text-weight-semibold text-style-allcaps">${item.day}</div>
          <div class="weather_rain-wrap">
            <img src="${item.precipitationIcon}" loading="lazy" width="10" height="10" alt="Precipitation" class="weather_rain-logo dayPrecipitation">
            <div class="dayPrecipitation text-size-tiny text-weight-medium">${item.highPrecipitation}%</div>
          </div>
        </div>
        <div class="weather_card-middle">
          <img src="${item.weatherIcon}" loading="lazy" width="98" height="98" alt="${item.shortForecast}" class="weather_card-image dayCondition">
        </div>
        <div class="weather_card-bottom">
          <div class="weather_card-bottom-top ${item.isNight ? 'is-night' : 'is-day'}">
            <div class="highTemp text-size-xxmedium">${item.highTemp}°</div>
            <div class="lowTemp text-size-xxmedium text-color-light-grey-4">${item.lowTemp}°</div>
          </div>
          <div class="dayShortForecast text-size-small text-weight-semibold letter-spacing-4 text-style-allcaps">${item.shortForecast}</div>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelector('.weather_loader')?.style.setProperty('display', 'none');
}

function handleWeatherAlerts(data) {
  const wrap = document.querySelector('[custom-alert="alert-wrap"]');
  const textDiv = document.querySelector('[custom-alert="div-text"]');

  if (!data?.features?.length) {
    if (wrap) wrap.style.display = 'none';
    return;
  }

  const eventMsg = data.features[0]?.properties?.event || 'Weather Alert';
  if (wrap && textDiv) {
    wrap.style.display = 'flex';
    textDiv.textContent = eventMsg;
  }
}

function initWeatherSwiper() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.swiper.is-weather', { loop: false, slidesPerView: 'auto' });
}

function initWeatherWidget(config) {
  if (!config.weatherEnabled) return null;

  const locationEl = document.querySelector('[input-location="city-county"]');
  const location = config.weatherLocation
    || locationEl?.textContent?.toLowerCase().replace('weather in ', '').trim()
    || '';

  if (!location) return null;

  const controller = new AbortController();
  const { signal } = controller;

  const timeout = setTimeout(() => {
    const loader = document.querySelector('.weather_loader');
    if (loader && loader.style.display !== 'none') {
      loader.innerHTML = '<p class="text-size-small">Weather data unavailable</p>';
    }
  }, 10000);

  (async () => {
    try {
      const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}&country=US&limit=1`;
      const geoData = await fetchJson(geoUrl, signal);
      const coords = geoData?.features?.[0]?.geometry?.coordinates;
      if (!coords?.length) return;

      const [longitude, latitude] = coords;

      // weather.gov only covers the US (incl. Alaska, Hawaii, territories)
      if (latitude < 17 || latitude > 72 || longitude < -180 || longitude > -64) return;

      const [pointsData, alertData] = await Promise.all([
        fetchJson(`https://api.weather.gov/points/${latitude},${longitude}`, signal),
        fetchJson(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`, signal),
      ]);

      handleWeatherAlerts(alertData);

      const forecastUrl = pointsData?.properties?.forecast;
      if (!forecastUrl) return;

      const forecastData = await fetchJson(forecastUrl, signal);
      const periods = forecastData?.properties?.periods;
      if (!periods?.length) return;

      const processed = processForecast(periods);
      renderWeatherSlides(processed);
      initWeatherSwiper();
      clearTimeout(timeout);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('[weather]', err);
    }
  })();

  return () => {
    controller.abort();
    clearTimeout(timeout);
  };
}

// ===========================================================================
// 4. NAVIGATION — removed (now inline in Webstudio)
// ===========================================================================

// ===========================================================================
// 5. LAZY-LOAD GOOGLE MAPS (location pages)
// ===========================================================================
function initLazyMaps() {
  const iframes = document.querySelectorAll('.location_map iframe[data-src]');
  if (!iframes.length) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  }, { rootMargin: '100px' });

  iframes.forEach((iframe) => observer.observe(iframe));

  return () => observer.disconnect();
}

// ===========================================================================
// 6. ROOFING COST CALCULATOR
// ===========================================================================

// --- Storage utilities ---
function MakeStore(underlying, prefix) {
  const mkKey = (key) => `${prefix}.${key}`;
  return {
    get: (key) => {
      const val = underlying.getItem(mkKey(key));
      if (val === undefined || val === null) return val;
      try { return JSON.parse(val); } catch { return val; }
    },
    set: (key, value) => underlying.setItem(mkKey(key), JSON.stringify(value)),
    del: (key) => underlying.removeItem(mkKey(key)),
  };
}

const DataStore = MakeStore(window.localStorage, '__capitol_session');
const UtmStore = MakeStore(window.sessionStorage, '__capitol_utm');

// --- UTM / Lead-source tracking ---
const SOURCE_MAP = {
  google_lsa: 'Google Local Service Ads',
  gmb: 'Google My Business',
  yelp: 'Yelp',
  nextdoor: 'Nextdoor',
  bbb: 'BBB',
  gaf: 'GAF',
  timbertech: 'Timbertech',
  website: 'Website',
};
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_PARAMS.some((p) => params.has(p));
  if (!hasUtm) return;
  // New ad click → overwrite all stored UTM values
  UTM_PARAMS.forEach((p) => {
    const val = params.get(p);
    if (val) UtmStore.set(p, val);
    else UtmStore.del(p);
  });
}

function getUtmData() {
  const utm_source = UtmStore.get('utm_source') || '';
  const utm_medium = UtmStore.get('utm_medium') || '';
  const utm_campaign = UtmStore.get('utm_campaign') || '';
  const utm_content = UtmStore.get('utm_content') || '';
  const utm_term = UtmStore.get('utm_term') || '';
  const lead_source = SOURCE_MAP[utm_source] || 'Website';
  const lead_medium = utm_medium || 'form';
  return { lead_source, lead_medium, utm_source, utm_medium, utm_campaign, utm_content, utm_term };
}

// --- Script loader ---
function loadScript(src, callback, errorCallback) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    if (callback) callback();
    return;
  }
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = true;
  script.onload = callback;
  script.onerror = errorCallback || (() => console.error('Script failed to load:', src));
  document.head.appendChild(script);
}

// --- Address extraction ---
function extractAddressComponents(response) {
  if (!response?.features?.length) return null;

  const feature = response.features[0];
  const components = { short_address: '', city: '', state: '', zip: '' };

  if (feature.address && feature.text) {
    components.short_address = `${feature.address} ${feature.text}`;
    DataStore.set('ShortAddress', components.short_address);
  }

  if (feature.context) {
    feature.context.forEach((ctx) => {
      if (ctx.id.startsWith('place.')) {
        components.city = ctx.text;
        DataStore.set('City', ctx.text);
      } else if (ctx.id.startsWith('region.')) {
        components.state = ctx.text;
        DataStore.set('State', ctx.text);
      } else if (ctx.id.startsWith('postcode.')) {
        components.zip = ctx.text;
        DataStore.set('Zip', ctx.text);
      }
    });
  }

  return components;
}

// --- Geocoder ---
const ALLOWED_STATES = ['Maryland', 'Washington', 'Virginia', 'North Carolina', 'South Carolina'];

function initializeGeocoder() {
  try {
    // Prevent duplicate geocoder inputs on SPA re-init
    const geocoderContainer = document.getElementById('geocoder');
    if (!geocoderContainer) return;
    if (geocoderContainer.querySelector('.mapboxgl-ctrl-geocoder')) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'us',
      filter: (item) =>
        item.context.some((ctx) =>
          ctx.id.startsWith('region.') && ALLOWED_STATES.includes(ctx.text)
        ),
      mapboxgl: mapboxgl,
    });

    geocoder.addTo('#geocoder');
    document.querySelector('.geocoder_loader').style.display = 'none';
    document.querySelector('#geocoder').style.display = 'block';

    const results = document.getElementById('result');

    geocoder.on('result', (e) => {
      results.innerText = JSON.stringify(e.result, null, 2);
      extractAddressComponents(e.result);
      DataStore.set('searched_address', e.result.place_name);
      DataStore.set('add_second', e.result);
      document.querySelector('[data-element="geocoder-wrap"]').classList.add('is--hidden');
      document.querySelector('[data-element="size-wrap"]').classList.remove('is--hidden');
      window.initMap();
    });

    geocoder.on('clear', () => {
      results.innerText = '';
      DataStore.del('searched_address');
    });

    document.querySelector('.mapboxgl-ctrl-geocoder--input').placeholder = 'Type your street address';
  } catch (error) {
    console.error('Error initializing Mapbox:', error);
    setTimeout(initializeGeocoder, 2000);
  }
}

// --- Draw styles ---
function drawStyles(portColor) {
  return [
    { id: 'gl-draw-polygon-fill-inactive', type: 'fill', filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']], paint: { 'fill-color': portColor, 'fill-outline-color': portColor, 'fill-opacity': 0.3 } },
    { id: 'gl-draw-polygon-fill-active', type: 'fill', filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']], paint: { 'fill-color': portColor, 'fill-outline-color': portColor, 'fill-opacity': 0 } },
    { id: 'gl-draw-polygon-stroke-inactive', type: 'line', filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#3bb2d0', 'line-width': 2 } },
    { id: 'gl-draw-polygon-stroke-active', type: 'line', filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': portColor, 'line-dasharray': [0.2, 2], 'line-width': 2 } },
    { id: 'gl-draw-line-inactive', type: 'line', filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'LineString'], ['!=', 'mode', 'static']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#3bb2d0', 'line-width': 2 } },
    { id: 'gl-draw-line-active', type: 'line', filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': portColor, 'line-dasharray': [0.2, 2], 'line-width': 2 } },
    { id: 'gl-draw-point-point-stroke-inactive', type: 'circle', filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']], paint: { 'circle-radius': 15, 'circle-opacity': 1, 'circle-color': '#fff' } },
    { id: 'gl-draw-point-inactive', type: 'circle', filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']], paint: { 'circle-radius': 3, 'circle-color': '#3bb2d0' } },
    { id: 'gl-draw-point-stroke-active', type: 'circle', filter: ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']], paint: { 'circle-radius': 7, 'circle-color': '#fff' } },
    { id: 'gl-draw-point-active', type: 'circle', filter: ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']], paint: { 'circle-radius': 5, 'circle-color': portColor } },
    { id: 'gl-draw-polygon-fill-static', type: 'fill', filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']], paint: { 'fill-color': '#404040', 'fill-outline-color': '#404040', 'fill-opacity': 0.1 } },
    { id: 'gl-draw-polygon-stroke-static', type: 'line', filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#404040', 'line-width': 2 } },
    { id: 'gl-draw-line-static', type: 'line', filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#404040', 'line-width': 2 } },
    { id: 'gl-draw-point-static', type: 'circle', filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']], paint: { 'circle-radius': 5, 'circle-color': '#404040' } },
    { id: 'gl-draw-polygon-color-picker', type: 'fill', filter: ['all', ['==', '$type', 'Polygon'], ['has', 'user_portColor']], paint: { 'fill-color': ['get', 'user_portColor'], 'fill-outline-color': ['get', 'user_portColor'], 'fill-opacity': 0.5 } },
    { id: 'gl-draw-line-color-picker', type: 'line', filter: ['all', ['==', '$type', 'LineString'], ['has', 'user_portColor']], paint: { 'line-color': ['get', 'user_portColor'], 'line-width': 2 } },
    { id: 'gl-draw-point-color-picker', type: 'circle', filter: ['all', ['==', '$type', 'Point'], ['has', 'user_portColor']], paint: { 'circle-radius': 3, 'circle-color': ['get', 'user_portColor'] } },
    { id: 'gl-draw-polygon-midpoint-stroke', type: 'circle', filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']], paint: { 'circle-radius': 6, 'circle-color': '#e3641f' } },
    { id: 'gl-draw-polygon-midpoint', type: 'circle', filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']], paint: { 'circle-radius': 4, 'circle-color': '#44484a' } },
    { id: 'gl-draw-polygon-and-line-vertex-stroke-inactive', type: 'circle', filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']], paint: { 'circle-radius': 8, 'circle-color': '#e3641f' } },
    { id: 'gl-draw-polygon-and-line-vertex-inactive', type: 'circle', filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']], paint: { 'circle-radius': 6, 'circle-color': '#44484a' } },
  ];
}

// --- Map + polygon drawing ---
const calcIntervals = [];

function reverseGeocode(lat, lng, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data?.features?.length) {
        extractAddressComponents(data);
        callback(data.features[0].place_name);
      } else {
        callback('Address not found');
      }
    })
    .catch((err) => {
      console.error('Reverse geocoding error:', err);
      callback('Error retrieving address');
    });
}

function getCentroid(polygon) {
  let totalArea = 0, x = 0, y = 0;
  const points = polygon.geometry.coordinates[0];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const a = x1 * y2 - x2 * y1;
    totalArea += a;
    x += (x1 + x2) * a;
    y += (y1 + y2) * a;
  }
  totalArea *= 0.5;
  return { lat: y / (6 * totalArea), lng: x / (6 * totalArea) };
}

function createBBox(map, coordinate) {
  const point = map.project(coordinate);
  const val = 83;
  const corners = [
    [point.x - val, point.y + val],
    [point.x + val, point.y + val],
    [point.x + val, point.y - val],
    [point.x - val, point.y - val],
    [point.x - val, point.y + val],
  ].map((p) => {
    const c = map.unproject(p);
    return [c.lng, c.lat];
  });

  return {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [corners] },
    properties: { underground: 'false', extrude: 'true', height: 10, type: 'building' },
    id: 'new_polygon',
  };
}

window.initMap = function () {
  document.querySelector('#calc-cc')?.classList.remove('is-green');

  const searchAddress = DataStore.get('searched_address');
  const addSecond = DataStore.get('add_second');
  if (!addSecond) return;

  document.querySelector('#searched_add').innerHTML = searchAddress;

  const lng = addSecond.geometry.coordinates[0];
  const lat = addSecond.geometry.coordinates[1];
  const coordinate = [lng, lat];

  mapboxgl.accessToken = MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/improveitmd/cl5jie1h3002814p935vxte0t',
    center: coordinate,
    zoom: 20,
    minZoom: 16,
  });

  const staticMode = {
    onSetup: (opts) => ({ count: opts.count || 0 }),
    toDisplayFeatures: (state, geojson, display) => display(geojson),
  };

  const createPolygonMode = {
    onSetup: (opts) => ({ count: opts.count || 0 }),
    onClick: function (state, e) {
      const features = map.queryRenderedFeatures(e.point);
      const displayProperties = ['geometry', 'polygon', 'features', 'type', 'properties', 'id', 'layer', 'source', 'sourceLayer', 'state'];
      let displayFeat = {};
      features.forEach((feat) => {
        displayProperties.forEach((prop) => { displayFeat[prop] = feat[prop]; });
      });
      const polygon = this.newFeature(displayFeat);
      this.addFeature(polygon);
    },
    onTap: function (state, e) {
      this.onClick(state, e);
    },
    toDisplayFeatures: (state, geojson, display) => display(geojson),
  };

  const draw = new MapboxDraw({
    userProperties: true,
    styles: drawStyles('#00F17F'),
    displayControlsDefault: false,
    defaultMode: 'lots_of_points',
    modes: Object.assign(
      { lots_of_points: createPolygonMode, static_mode: staticMode },
      MapboxDraw.modes
    ),
  });
  map.addControl(draw);

  map.on('load', () => {
    draw.changeMode('lots_of_points');
  });

  map.on('load', () => {
    const point = map.project(coordinate);
    const w = 50, h = 50;
    const bbox = [[point.x - w / 2, point.y - h / 2], [point.x + w / 2, point.y + h / 2]];
    const features = map.queryRenderedFeatures(bbox);

    const building = features.find((f) => f.layer.id === 'building');
    if (building) {
      const displayFeat = {};
      ['geometry', 'type', 'properties', 'id'].forEach((prop) => { displayFeat[prop] = building[prop]; });
      draw.add(displayFeat);
      const data = draw.getAll();
      setTimeout(() => draw.changeMode('static_mode', { featureId: data.features[0].id }), 1000);
    } else {
      draw.add(createBBox(map, coordinate));
      const data = draw.getAll();
      setTimeout(() => draw.changeMode('direct_select', { featureId: data.features[0].id }), 1000);
    }
  });

  function updateArea() {
    const data = draw.getAll();
    if (!data.features.length) return;
    const area = turf.area(data);
    const areaInFeet = Math.trunc(Math.round(area * 10.763911105 * 100) / 100);
    document.getElementById('calc').textContent = `${areaInFeet.toLocaleString()} ft2`;
  }

  const areaInterval = setInterval(updateArea, 100);
  calcIntervals.push(areaInterval);

  const checkInterval = setInterval(() => {
    const data = draw.getAll();
    if (data.features.length === 1) {
      draw.changeMode('static_mode');
      clearInterval(checkInterval);
    }
  }, 200);
  calcIntervals.push(checkInterval);

  document.getElementById('editBtn')?.addEventListener('click', () => {
    map.dragPan.disable();
    const data = draw.getAll();
    if (!data.features.length) return;
    const polygonLength = data.features[0].geometry.coordinates[0];
    if (polygonLength.length <= 35) {
      draw.changeMode('direct_select', { featureId: data.features[0].id });
    } else {
      draw.deleteAll();
      draw.add(createBBox(map, coordinate));
      const newData = draw.getAll();
      setTimeout(() => draw.changeMode('direct_select', { featureId: newData.features[0].id }), 1000);
    }
  });

  document.getElementById('resetBtn')?.addEventListener('click', () => {
    draw.deleteAll();
    draw.add(createBBox(map, coordinate));
    const data = draw.getAll();
    draw.changeMode('direct_select', { featureId: data.features[0].id });
  });

  const continueHandler = () => {
    const data = draw.getAll();
    if (!data.features.length) return;

    const centroid = getCentroid(data.features[0]);
    reverseGeocode(centroid.lat, centroid.lng, (address) => {
      document.getElementById('searched_add').innerHTML = address;
      DataStore.set('searched_address', address);

      const area = turf.area(data);
      DataStore.set('area_cal', Math.round(area * 100) / 100);

      calcIntervals.forEach((id) => clearInterval(id));
      calcIntervals.length = 0;

      document.querySelector('[data-element="size-wrap"]').classList.add('is--hidden');
      document.querySelector('[data-element="material-wrap"]').classList.remove('is--hidden');
      window.setupCalculatorAndStorage();
    });
  };

  document.getElementById('continue')?.addEventListener('click', continueHandler);
  document.getElementById('proceed')?.addEventListener('click', continueHandler);
};

// --- Material selection + calculator ---
window.changeLabelColor = function () {
  const radios = ['asphalt', 'metal', 'flat', 'unsure'];
  radios.forEach((id) => {
    const radio = document.getElementById(id);
    const label = document.getElementById(`label-${id}`);
    if (!radio || !label) return;
    const checked = radio.parentElement?.querySelector('.w-form-formradioinput')?.classList.contains('w--redirected-checked');
    label.style.color = checked ? '#062640' : 'white';
  });
};

let labelColorInterval = null;

window.setupCalculatorAndStorage = function () {
  if (labelColorInterval) clearInterval(labelColorInterval);
  labelColorInterval = setInterval(window.changeLabelColor, 100);

  document.querySelectorAll("input[type='radio'][name='material']").forEach((radio) => {
    radio.addEventListener('click', function () {
      const radioValue = this.value;
      DataStore.set('selected_material', radioValue);

      if (labelColorInterval) { clearInterval(labelColorInterval); labelColorInterval = null; }

      document.querySelector('[data-element="material-wrap"]').classList.add('is--hidden');
      document.querySelector('[data-element="form-wrap"]').classList.remove('is--hidden');
    });
  });

  const SQ_FEET_CONVERSION = 10.763911105;
  const SLOP_WASTE = 1.10;
  const FLAT_SLOP_WASTE = 1;
  const WASTE_MULT = 0.10;

  const sqFoot = Math.round(parseInt(DataStore.get('area_cal')) * SQ_FEET_CONVERSION);
  const accuracy = Number(new URLSearchParams(window.location.search).get('accuracy')) || 0;

  function calcMaterial(sq, factor, mult) {
    return ((sq * factor) * mult) + (sq * factor);
  }

  function calcPrice(calc, lowRate, highRate, extra = 0) {
    return { lowPrice: calc * lowRate + extra, highPrice: calc * highRate + extra };
  }

  const asphaltCalc = calcMaterial(sqFoot, SLOP_WASTE, WASTE_MULT);
  const metalCalc = calcMaterial(sqFoot, SLOP_WASTE, 0.18);
  const flatCalc = calcMaterial(sqFoot, FLAT_SLOP_WASTE, WASTE_MULT);
  const standardCalc = asphaltCalc;

  const priceFactors = {
    0: { asphalt: [5.00, 7.50], metal: [18, 27], flat: [12, 19], standard: [5.00, 7.50] },
    1: { asphalt: [5.30, 7.20], metal: [20, 27], flat: [13, 19], standard: [5.30, 7.20] },
    2: { asphalt: [4.50, 8.50], metal: [17, 27], flat: [10, 19], standard: [4.50, 8.50] },
  };

  const rates = priceFactors[accuracy] || priceFactors[0];
  const EXTRA_CHARGE = 1000;

  let asphaltPrice = calcPrice(asphaltCalc, ...rates.asphalt);
  const metalPrice = calcPrice(metalCalc, ...rates.metal);
  const flatPrice = calcPrice(flatCalc, ...rates.flat);
  let standardPrice = calcPrice(standardCalc, ...rates.standard);

  if (sqFoot <= 1000) {
    asphaltPrice = calcPrice(asphaltCalc, ...rates.asphalt, EXTRA_CHARGE);
    standardPrice = calcPrice(standardCalc, ...rates.standard, EXTRA_CHARGE);
  }

  DataStore.set('AllCalculations', {
    AsphaltCalculations: asphaltCalc,
    AsphaltLowPrice: asphaltPrice.lowPrice,
    AsphaltHighPrice: asphaltPrice.highPrice,
    MetalCalculations: metalCalc,
    MetalLowPrice: metalPrice.lowPrice,
    MetaltHighPrice: metalPrice.highPrice,
    FlatCalculations: flatCalc,
    FlatLowPrice: flatPrice.lowPrice,
    FlatHighPrice: flatPrice.highPrice,
    StandardCalculations: standardCalc,
    StandardLowPrice: standardPrice.lowPrice,
    StandardHighPrice: standardPrice.highPrice,
  });
};

// --- Form submission + phone validation ---
const PHONE_VALIDATION_KEY = 'bdc_7a3c280817af44a2952336e349e70525';
const FORM_API_URL = 'https://forms.improveitmd.com/api/submit';

async function validatePhoneNumber(phone) {
  try {
    const res = await fetch(
      `https://api-bdc.net/data/phone-number-validate?number=${encodeURIComponent(phone)}&countryCode=us&localityLanguage=en&key=${PHONE_VALIDATION_KEY}`
    );
    const data = await res.json();
    return data.isValid;
  } catch (err) {
    console.error('Phone validation error:', err);
    return false;
  }
}

function generateUniqueCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

const uniqueId = generateUniqueCode();

function initFormHandlers() {
  document.querySelectorAll('[name="Damage"]').forEach((radio) => {
    radio.addEventListener('change', function () {
      if (this.checked) DataStore.set('selected_time', this.value);
    });
  });

  function handleSubmitForm(formId, nameFieldId, phoneFieldId, damageValue) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const maskedPhone = document.getElementById(phoneFieldId).value;
      const extractedPhone = maskedPhone.replace(/\D/g, '');
      const isValid = await validatePhoneNumber(extractedPhone);

      if (!isValid) {
        alert('Phone number is not valid.');
        document.getElementById(phoneFieldId).value = '';
        return;
      }

      document.querySelector('[data-element="form-wrap"]').classList.add('is--hidden');
      document.querySelector('[data-element="results-wrap"]').classList.remove('is--hidden');
      initResults();

      const name = document.getElementById(nameFieldId).value;

      const jsonData = {
        name,
        phone: maskedPhone,
        page: window.location.href,
        address: DataStore.get('searched_address'),
        address_short: DataStore.get('ShortAddress'),
        city: DataStore.get('City'),
        state: DataStore.get('State'),
        zip: DataStore.get('Zip'),
        selected_material: DataStore.get('selected_material'),
        roof_damaged: damageValue,
        area: DataStore.get('area_cal'),
        id: uniqueId,
        ...getUtmData(),
        lead_channel_detail: 'roofing_calculator',
      };

      const secondFormId = document.querySelector('#second-form-id');
      if (secondFormId) secondFormId.value = uniqueId;

      try {
        const res = await fetch(FORM_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Origin': window.location.origin },
          body: JSON.stringify(jsonData),
        });
        if (!res.ok) throw new Error('Request failed');
        const result = await res.json();
        console.log('Form submitted:', result);
      } catch (err) {
        console.error('Form submit error:', err);
      }
    });
  }

  handleSubmitForm('wf-form-Damage-Form-Yes', 'name-yes', 'phone-yes', 'Yes.');
  handleSubmitForm('wf-form-Damage-Form-Not-sure', 'name-no', 'phone-no', "I'm not sure.");

  const secondForm = document.querySelector("[data-field='second-form']");
  if (secondForm) {
    secondForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {};
      formData.form_name = secondForm.getAttribute('data-name');
      secondForm.querySelectorAll('[data-field]').forEach((el) => {
        formData[el.getAttribute('data-field')] = el.value;
      });

      document.querySelector('[data-block="2nd-form-success"]')?.classList.remove('is--hidden');
      document.querySelector('[data-field="second-form-block"]')?.style.setProperty('display', 'none');

      try {
        await fetch(FORM_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Origin': window.location.origin },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            id: formData.id,
            event_type: 'formSubmit',
            page_url: window.location.href,
            form_name: formData.form_name,
            ...getUtmData(),
            lead_channel_detail: 'calculator_followup',
          }),
        });
      } catch (err) {
        console.error('Second form error:', err);
      }
    });
  }

  document.querySelector('.form_quote')?.addEventListener('submit', () => {
    document.querySelector('.form_submit_trigger')?.click();
  });
}

// --- Results display + financing ---
function calculateAPR(price, months, apr) {
  const i = apr / 12;
  return Math.trunc((price * (i * Math.pow(1 + i, months))) / (Math.pow(1 + i, months) - 1));
}

function formatNumber(x) {
  if (!x) return '0';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayFinancing(lowPrice, highPrice) {
  let months, apr;

  if (lowPrice >= 25000) {
    months = 240;
    apr = 0.0699;
  } else if (lowPrice >= 10000) {
    months = 144;
    apr = 0.0899;
  } else if (lowPrice >= 7500) {
    months = 120;
    apr = 0.0899;
  } else {
    months = 84;
    apr = 0.0899;
  }

  const lowestMonthly = calculateAPR(lowPrice, months, apr);
  const highestMonthly = calculateAPR(highPrice, months, apr);

  const $low = document.getElementById('lowestMonthly');
  const $high = document.getElementById('highestMonthly');
  const $months = document.getElementById('months');
  const $apr = document.getElementById('apr');

  if ($low) $low.textContent = formatNumber(lowestMonthly);
  if ($high) $high.textContent = formatNumber(highestMonthly);
  if ($months) $months.textContent = String(months);
  if ($apr) $apr.textContent = (apr * 100).toFixed(2);
}

function displayPrices(material, allCalc) {
  let lowPrice, highPrice;

  if (material === 'Asphalt Shingle') {
    lowPrice = Math.trunc(allCalc.AsphaltLowPrice);
    highPrice = Math.trunc(allCalc.AsphaltHighPrice);
  } else if (material === 'Metal') {
    lowPrice = Math.trunc(allCalc.MetalLowPrice);
    highPrice = Math.trunc(allCalc.MetaltHighPrice);
  } else if (material === 'Flat') {
    lowPrice = Math.trunc(allCalc.FlatLowPrice);
    highPrice = Math.trunc(allCalc.FlatHighPrice);
  } else if (material === 'Standard') {
    lowPrice = Math.trunc(allCalc.StandardLowPrice);
    highPrice = Math.trunc(allCalc.StandardHighPrice);
  }

  if (lowPrice < 3500) {
    highPrice = highPrice + 3500;
    lowPrice = 3500;
  }

  const $low = document.getElementById('lowPrice');
  const $high = document.getElementById('highPrice');
  if ($low) $low.textContent = formatNumber(lowPrice);
  if ($high) $high.textContent = formatNumber(highPrice);

  displayFinancing(lowPrice, highPrice);
}

function initResults() {
  const allCalc = DataStore.get('AllCalculations');
  const material = DataStore.get('selected_material');

  const selectedOpt = document.getElementById('selected-opt');
  if (selectedOpt) selectedOpt.textContent = material;

  displayPrices(material, allCalc);

  const compareWrapper = document.querySelector('.compare_wrapper');
  const metalText = document.getElementById('metal-text');
  const asphaltText = document.getElementById('asphalt-text');

  if (material === 'Metal') {
    compareWrapper?.classList.remove('is--hidden');
    metalText?.classList.add('active');
    asphaltText?.classList.remove('active');
  } else if (material === 'Asphalt Shingle') {
    compareWrapper?.classList.remove('is--hidden');
    metalText?.classList.remove('active');
    asphaltText?.classList.add('active');
  } else {
    compareWrapper?.classList.add('is--hidden');
  }

  metalText?.addEventListener('click', () => {
    const calc = DataStore.get('AllCalculations');
    DataStore.set('selected_material', 'Metal');
    displayPrices('Metal', calc);
    asphaltText?.classList.remove('active');
    metalText?.classList.add('active');
  });

  asphaltText?.addEventListener('click', () => {
    const calc = DataStore.get('AllCalculations');
    DataStore.set('selected_material', 'Asphalt Shingle');
    displayPrices('Asphalt Shingle', calc);
    metalText?.classList.remove('active');
    asphaltText?.classList.add('active');
  });
}

// --- Calculator bootstrap ---
function initCalculator() {
  if (!document.getElementById('geocoder')) return null;

  loadScript('https://code.jquery.com/jquery-3.7.1.min.js', () => {
    loadScript('https://cdn.jsdelivr.net/npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.min.js', () => {}, () => {});

    loadScript('https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js', () => {
      loadScript('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js', () => {
        loadScript('https://uploads-ssl.webflow.com/6287b31efad93805832a2f6e/62de4ba563185e28ce6dea35_draw.txt', () => {
          window.process = window.process || {};
          window.process.env = window.process.env || {};
          window.process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE = '1000000';
          window.process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS = '1000000';

          loadScript('https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js', () => {
            initializeGeocoder();
            initFormHandlers();
          });
        });
      });
    });
  });

  return () => {
    calcIntervals.forEach((id) => clearInterval(id));
    calcIntervals.length = 0;
    if (labelColorInterval) { clearInterval(labelColorInterval); labelColorInterval = null; }
    // Remove geocoder inputs so they don't duplicate on SPA re-init
    const gc = document.getElementById('geocoder');
    if (gc) {
      gc.querySelectorAll('.mapboxgl-ctrl-geocoder').forEach(el => el.remove());
    }
  };
}

/**
 * Capitol Improvements — Commercial Roof Cost Calculator Module
 * Refactored from inline script blocks into a single init function.
 *
 * Flow: Single/Multi Address → Geocoder → Map/Polygon → Material Selection → Form → Results
 *
 * External dependencies (loaded dynamically via loadScript):
 *   - jQuery 3.7.1
 *   - Mapbox GL JS v3.6.0
 *   - Mapbox GL Geocoder v5.0.0
 *   - Mapbox Draw (custom build from Webflow asset)
 *   - DrawRectangle (loaded from Webflow asset)
 *   - Turf.js v6
 *
 * Globals expected from the host script:
 *   - loadScript(src, onload, onerror)
 *   - validatePhoneNumber(phone) => Promise<boolean>
 *   - FORM_API_URL (string)
 *   - MAPBOX_TOKEN (string)
 *   - drawStyles(portColor) => array  (shared residential draw styles — NOT used here,
 *     commercial has its own getDrawStyles method on MapboxManager)
 */

// ===========================================================================
// COMMERCIAL CALCULATOR — PRICING
// ===========================================================================

const COMMERCIAL_PRICING = {
  Asphalt: [5.00, 7.50],
  Silicone: [10, 17],
  TPO: [12, 19],
  Standard: [5.00, 7.50]
};

// ===========================================================================
// COMMERCIAL CALCULATOR — CONFIG
// ===========================================================================

const COMMERCIAL_CONFIG = {
  allowedRegions: ['Maryland', 'Washington', 'Virginia'],
};

// ===========================================================================
// STATE MANAGEMENT
// ===========================================================================

class CommercialAppState {
  constructor() {
    this.flowType = null;
    this.addressSearched = {};
    this.materialSelected = null;
    this.uniqueId = generateUniqueCode();
    this.addCount = 0;
  }
}

// ===========================================================================
// UTILITY FUNCTIONS
// ===========================================================================

const commercialUtils = {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  formatNumber: (num) => formatNumber(num),

  showElement(selector) {
    document.querySelector(selector)?.classList.remove('is--hidden');
  },

  hideElement(selector) {
    document.querySelector(selector)?.classList.add('is--hidden');
  },

  extractAddressComponents(response) {
    if (!response?.features?.length) return null;

    const feature = response.features[0];
    const components = {
      short_address: '',
      city: '',
      state: '',
      zip: ''
    };

    if (feature.address && feature.text) {
      components.short_address = `${feature.address} ${feature.text}`;
    }

    feature.context?.forEach(context => {
      if (context.id.startsWith('place.')) components.city = context.text;
      else if (context.id.startsWith('region.')) components.state = context.text;
      else if (context.id.startsWith('postcode.')) components.zip = context.text;
    });

    return components;
  },

};

// ===========================================================================
// MAPBOX MANAGER
// ===========================================================================

class CommercialMapboxManager {
  constructor(appState) {
    this.appState = appState;
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
    }
  }

  initializeGeocoder(container, geocodeWrapper, geocodeLoader) {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'us',
      filter: (item) => {
        return item.context?.some(i =>
          COMMERCIAL_CONFIG.allowedRegions.includes(i.text) && i.id.split('.').shift() === 'region'
        );
      },
      mapboxgl: mapboxgl
    });

    geocoder.addTo(container);
    geocodeLoader.style.display = 'none';
    container.style.display = 'block';

    // Set placeholder
    const input = geocodeWrapper.querySelector('.mapboxgl-ctrl-geocoder--input');
    if (input) input.placeholder = 'Type your street address';

    // Handle loading state
    geocoder.on('loading', () => {
      $(container).css('margin-bottom', '40vh');
    });

    // Handle results
    geocoder.on('result', (e) => {
      $(container).css('margin-bottom', '0');
      this.handleGeocoderResult(e, geocodeWrapper);
    });

    return geocoder;
  }

  handleGeocoderResult(e, geocodeWrapper) {
    const { place_name: fullAddress, geometry, context } = e.result;
    const addressComponents = {};

    context?.forEach(ctx => {
      if (ctx.id.startsWith('place.')) addressComponents.city = ctx.text;
      else if (ctx.id.startsWith('region.')) addressComponents.state = ctx.text;
      else if (ctx.id.startsWith('postcode.')) addressComponents.zip = ctx.text;
    });

    if (this.appState.flowType === 'single') {
      this.appState.addressSearched[1] = {
        address: fullAddress,
        coordinates: geometry.coordinates,
        short_address: addressComponents
      };
    } else {
      const addressNumber = geocodeWrapper.querySelector('[data-elem="add-sus"]')?.textContent.trim();
      this.appState.addressSearched[addressNumber] = {
        address: fullAddress,
        coordinates: geometry.coordinates,
        short_address: addressComponents
      };
    }

    this.showSizeScreen();
  }

  showSizeScreen() {
    commercialUtils.scrollToTop();

    if (this.appState.flowType === 'multiple') {
      commercialUtils.hideElement('[data-elem="geocoder-wrap"]');
      commercialUtils.showElement('[data-elem="multi-map-wrap"]');
    } else {
      commercialUtils.showElement('[data-elem="size-wrap"]');
      commercialUtils.hideElement('[data-elem="geocoder-wrap"]');
    }

    this.processAddresses();
  }

  processAddresses() {
    Object.entries(this.appState.addressSearched).forEach(([key, addressInfo], index) => {
      const { coordinates } = addressInfo;
      const mapContainer = `map${key.trim()}`;
      const containerEle = document.getElementById(mapContainer);

      if (containerEle) {
        setTimeout(() => {
          this.initMap(
            coordinates[0],
            coordinates[1],
            mapContainer,
            coordinates,
            addressInfo,
            key.trim()
          );
        }, 500 * Number(key.trim()));
      }
    });
  }

  initMap(lng, lat, mapContainer, coordinates, addressInfo, mapKey) {
    const mapParentNode = document.querySelector(`#${mapContainer}`).parentNode;
    const infoWrap = mapParentNode.querySelector('.info_wrap');
    const addressText = infoWrap?.children[0];
    const searchedArea = infoWrap?.children[1];
    const mapControlWrap = mapParentNode.querySelector('.map__info');
    const mapControlPrompt1 = mapControlWrap?.querySelector('[data-button="prompt-1"]');
    const mapControlEdit = mapControlPrompt1?.querySelector('[data-elem="adjust"]');
    const mapControlReset = mapControlPrompt1?.querySelector('[data-elem="reset-polygon"]');

    if (addressText) addressText.textContent = addressInfo.address;

    // Create map instance
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/improveitmd/cl5jie1h3002814p935vxte0t',
      center: [lng, lat],
      zoom: 19,
      minZoom: 16
    });

    const appState = this.appState;

    // Reverse geocode function
    const reverseGeocode = (lat, lng, callback) => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data?.features?.length > 0) {
            const addressFull = commercialUtils.extractAddressComponents(data);
            appState.addressSearched[mapKey].address_info = addressFull;
            callback(data.features[0].place_name);
          } else {
            callback('Address not found');
          }
        })
        .catch(error => {
          console.error('Reverse geocoding error:', error);
          callback('Error retrieving address');
        });
    };

    // Calculate centroid
    const getCentroid = (polygon) => {
      let totalArea = 0;
      let centroidX = 0;
      let centroidY = 0;
      const points = polygon.geometry.coordinates[0];

      for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        const trapezoidArea = (x1 * y2 - x2 * y1);

        totalArea += trapezoidArea;
        centroidX += (x1 + x2) * trapezoidArea;
        centroidY += (y1 + y2) * trapezoidArea;
      }

      totalArea *= 0.5;
      centroidX = centroidX / (6 * totalArea);
      centroidY = centroidY / (6 * totalArea);

      return { lat: centroidY, lng: centroidX };
    };

    // Create bounding box polygon
    const createBoundingBox = (center) => {
      const point = map.project(center);
      const val = 83; // Size for ~1000 sq ft

      const points = [
        [point.x - val, point.y + val],
        [point.x + val, point.y + val],
        [point.x + val, point.y - val],
        [point.x - val, point.y - val],
        [point.x - val, point.y + val]
      ];

      const lngLatCoordinates = points.map(p => {
        const { lng, lat } = map.unproject(p);
        return [lng, lat];
      });

      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [lngLatCoordinates]
        },
        properties: {
          underground: "false",
          extrude: "true",
          height: 10,
          min_height: 0,
          type: "building"
        },
        id: 'new_polygon'
      };
    };

    // Custom static mode (no interaction)
    const staticMode = {
      onSetup: function(opts) {
        return { count: opts.count || 0 };
      },
      toDisplayFeatures: function(state, geojson, display) {
        display(geojson);
      }
    };

    // Custom polygon creation mode
    const createPolygonMode = {
      onSetup: function(opts) {
        return { count: opts.count || 0 };
      },
      onClick: function(state, e) {
        const features = map.queryRenderedFeatures(e.point);
        const displayProperties = ['geometry', 'polygon', 'features', 'type', 'properties', 'id', 'layer', 'source', 'sourceLayer', 'state'];

        const displayFeatures = features.map(feat => {
          const displayFeat = {};
          displayProperties.forEach(prop => {
            displayFeat[prop] = feat[prop];
          });
          return displayFeat;
        });

        const polygon = this.newFeature(displayFeatures[0]);
        this.addFeature(polygon);
      },
      onTap: function(state, e) {
        this.onClick(state, e);
      },
      toDisplayFeatures: function(state, geojson, display) {
        display(geojson);
      }
    };

    // Initialize MapboxDraw
    const draw = new MapboxDraw({
      userProperties: true,
      styles: this.getDrawStyles('#00F17F'),
      displayControlsDefault: false,
      defaultMode: 'lots_of_points',
      modes: Object.assign({
        lots_of_points: createPolygonMode,
        static_mode: staticMode,
      }, MapboxDraw.modes)
    });

    map.addControl(draw);

    // Update area display
    const updateArea = (areaElement) => {
      const data = draw.getAll();
      if (!data.features.length) return;

      const area = turf.area(data);
      const areaInFeet = area * 10.763911105;
      const roundedArea = Math.round(areaInFeet);

      if (areaElement) {
        areaElement.textContent = `${commercialUtils.formatNumber(roundedArea)} ft\u00B2`;
      }

      // Update state
      appState.addressSearched[mapKey].areaInFeet = roundedArea;
      appState.addressSearched[mapKey].areaInMeter = Math.round(area);
    };

    // Update address on polygon change
    const updateAddress = () => {
      const data = draw.getAll();
      if (!data.features.length) return;

      const centroid = getCentroid(data.features[0]);

      reverseGeocode(centroid.lat, centroid.lng, (address) => {
        appState.addressSearched[mapKey].address = address;
        appState.addressSearched[mapKey].coordinates = centroid;

        if (addressText) {
          addressText.textContent = address;
        }
      });
    };

    // Map load event
    map.on('load', () => {
      const point = map.project(coordinates);
      const width = 50;
      const height = 50;

      const bbox = [
        [point.x - width / 2, point.y - height / 2],
        [point.x + width / 2, point.y + height / 2]
      ];

      const features = map.queryRenderedFeatures(bbox);
      const buildingFeatures = features.filter(f => f.layer.id === 'building');

      if (buildingFeatures.length > 0) {
        // Building found - add it and set to static mode
        const feature = buildingFeatures[0];
        const displayFeat = {};
        ['geometry', 'type', 'properties', 'id'].forEach(prop => {
          displayFeat[prop] = feature[prop];
        });

        draw.add(displayFeat);
        const data = draw.getAll();

        setTimeout(() => {
          draw.changeMode('static_mode', {
            featureId: data.features[0].id
          });
        }, 1000);
      } else {
        // No building - create bounding box and allow editing
        draw.add(createBoundingBox(coordinates));
        const data = draw.getAll();

        setTimeout(() => {
          draw.changeMode('direct_select', {
            featureId: data.features[0].id
          });
        }, 1000);
      }

      updateArea(searchedArea);
    });

    // Map events
    map.on('draw.update', () => {
      updateArea(searchedArea);
      updateAddress();
    });

    map.on('idle', () => {
      map.resize();
    });

    // Edit button handler
    const handleEdit = () => {
      const data = draw.getAll();
      if (!data.features.length) return;

      const polygonLength = data.features[0].geometry.coordinates[0].length;

      if (polygonLength <= 35) {
        draw.changeMode('direct_select', {
          featureId: data.features[0].id
        });
      } else {
        // Polygon too complex - reset to bounding box
        draw.deleteAll();
        draw.add(createBoundingBox(coordinates));
        const newData = draw.getAll();

        setTimeout(() => {
          draw.changeMode('direct_select', {
            featureId: newData.features[0].id
          });
        }, 1000);
      }
    };

    // Reset button handler
    const handleReset = () => {
      draw.deleteAll();
      draw.add(createBoundingBox(coordinates));
      const data = draw.getAll();

      draw.changeMode('direct_select', {
        featureId: data.features[0].id
      });
    };

    // Continue button handler
    const handleContinue = () => {
      commercialUtils.scrollToTop();

      if (appState.flowType === 'single') {
        commercialUtils.hideElement('[data-elem="size-wrap"]');
        commercialUtils.showElement('[data-elem="material-wrap"]');
      } else {
        commercialUtils.hideElement('[data-elem="multi-map-wrap"]');
        commercialUtils.showElement('[data-elem="material-wrap"]');
      }
    };

    // Next button for multi-flow
    const nextButton2nd = document.querySelector('[data-elem="2nd-next-button"]');
    nextButton2nd?.addEventListener('click', handleContinue);

    // Attach event listeners based on flow type
    if (appState.flowType === 'multiple') {
      mapControlEdit?.addEventListener('click', handleEdit);
      mapControlReset?.addEventListener('click', handleReset);
    } else {
      document.querySelector('#editBtn')?.addEventListener('click', handleEdit);
      document.querySelector('#continue')?.addEventListener('click', handleContinue);
      document.querySelector('#proceed')?.addEventListener('click', handleContinue);
      document.querySelector('#resetBtn')?.addEventListener('click', handleReset);
    }

    // Check for polygon and switch to static mode when ready
    const checkPolygon = () => {
      const data = draw.getAll();
      if (data.features.length === 1) {
        draw.changeMode('static_mode');
        clearInterval(intervalFn);
      }
    };

    const intervalFn = setInterval(checkPolygon, 200);

    // Track interval for cleanup
    if (!window.__commercialCalcIntervals) window.__commercialCalcIntervals = [];
    window.__commercialCalcIntervals.push(intervalFn);
  }

  // Commercial calculator's OWN draw styles (different from residential drawStyles)
  getDrawStyles(color) {
    return [
      {
        'id': 'gl-draw-polygon-fill-inactive',
        'type': 'fill',
        'filter': ['all',
          ['==', 'active', 'false'],
          ['==', '$type', 'Polygon'],
          ['!=', 'mode', 'static']
        ],
        'paint': {
          'fill-color': color,
          'fill-outline-color': color,
          'fill-opacity': 0.3
        }
      },
      {
        'id': 'gl-draw-polygon-fill-active',
        'type': 'fill',
        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
        'paint': {
          'fill-color': color,
          'fill-outline-color': color,
          'fill-opacity': 0.3
        }
      },
      {
        'id': 'gl-draw-polygon-stroke-inactive',
        'type': 'line',
        'filter': ['all',
          ['==', 'active', 'false'],
          ['==', '$type', 'Polygon'],
          ['!=', 'mode', 'static']
        ],
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': color,
          'line-width': 2
        }
      },
      {
        'id': 'gl-draw-polygon-stroke-active',
        'type': 'line',
        'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': color,
          'line-width': 2
        }
      },
      {
        'id': 'gl-draw-line-inactive',
        'type': 'line',
        'filter': ['all',
          ['==', 'active', 'false'],
          ['==', '$type', 'LineString'],
          ['!=', 'mode', 'static']
        ],
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': color,
          'line-width': 2
        }
      },
      {
        'id': 'gl-draw-line-active',
        'type': 'line',
        'filter': ['all',
          ['==', '$type', 'LineString'],
          ['==', 'active', 'true']
        ],
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': color,
          'line-width': 2
        }
      },
      {
        'id': 'gl-draw-polygon-and-line-vertex-inactive',
        'type': 'circle',
        'filter': ['all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point'],
          ['!=', 'mode', 'static']
        ],
        'paint': {
          'circle-radius': 5,
          'circle-color': '#fff'
        }
      },
      {
        'id': 'gl-draw-polygon-and-line-vertex-active',
        'type': 'circle',
        'filter': ['all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point']
        ],
        'paint': {
          'circle-radius': 7,
          'circle-color': color
        }
      }
    ];
  }
}

// ===========================================================================
// FLOW MANAGEMENT
// ===========================================================================

class CommercialFlowManager {
  constructor(appState) {
    this.appState = appState;
    this.mapboxManager = new CommercialMapboxManager(appState);
    this._materialClickHandler = null;
    this._formSubmitHandler = null;
  }

  init() {
    const singleOption = document.querySelector('[data-elem="single-option"]');
    const multiOption = document.querySelector('[data-elem="multi-option"]');

    singleOption?.addEventListener('click', () => this.showFlow('single'));
    multiOption?.addEventListener('click', () => this.showFlow('multiple'));

    this.setupMaterialSelection();
    this.setupFormSubmission();
  }

  showFlow(type) {
    this.appState.flowType = type;
    commercialUtils.hideElement('[data-elem="first-screen"]');

    if (type === 'single') {
      commercialUtils.showElement('[data-elem="2nd-screen-single"]');
      document.querySelector('[data-elem="2nd-screen-multi"]')?.remove();
      this.initializeSingleGeocoder();
    } else {
      commercialUtils.showElement('[data-elem="2nd-screen-multi"]');
      document.querySelector('[data-elem="2nd-screen-single"]')?.remove();
      this.initializeMultiGeocoders();
    }
  }

  initializeSingleGeocoder() {
    const wrapper = document.querySelector('[data-elem="2nd-screen-single"]');
    const geocodeWrap = wrapper?.querySelector('[data-elem="geocoder-wrap"]');
    const geocoder = geocodeWrap?.querySelector('[data-elem="geocoder"]');
    const loader = geocodeWrap?.querySelector('.geocoder_loader');

    if (geocoder && loader) {
      this.mapboxManager.initializeGeocoder(geocoder, geocodeWrap, loader);
    }
  }

  initializeMultiGeocoders() {
    const wrapper = document.querySelector('[data-elem="2nd-screen-multi"]');
    const geocodeWraps = wrapper?.querySelectorAll('[data-elem="geocode-wrap"]');

    geocodeWraps?.forEach(wrap => {
      const geocoder = wrap.querySelector('[data-elem="geocoder"]');
      const loader = wrap.querySelector('.geocoder_loader');

      if (geocoder && loader) {
        this.mapboxManager.initializeGeocoder(geocoder, wrap, loader);
      }
    });
  }

  setupMaterialSelection() {
    // Use event delegation
    this._materialClickHandler = (e) => {
      const radio = e.target.closest('input[name="material"]');
      if (!radio) return;

      this.appState.materialSelected = radio.value;
      this.updatePricing();
      commercialUtils.hideElement('[data-elem="material-wrap"]');
      commercialUtils.showElement('[data-elem="form-wrap"]');
    };
    document.addEventListener('click', this._materialClickHandler);
  }

  updatePricing() {
    const wasteFactor = this.appState.materialSelected === 'TPO' ? 1 : 1.10;

    Object.entries(this.appState.addressSearched).forEach(([key, data]) => {
      const sqFoot = Number(data.areaInFeet);
      const materialCalc = ((sqFoot * wasteFactor) * 0.10) + (sqFoot * wasteFactor);
      const rates = COMMERCIAL_PRICING[this.appState.materialSelected] || COMMERCIAL_PRICING.Standard;

      let [lowRate, highRate] = rates;
      let extraCharge = sqFoot <= 1000 ? 1000 : 0;

      data.lowPrice = (materialCalc * lowRate) + extraCharge;
      data.highPrice = (materialCalc * highRate) + extraCharge;
    });
  }

  setupFormSubmission() {
    this._formSubmitHandler = async (e) => {
      const form = e.target.closest('[data-form="commercial"]');
      if (!form) return;

      e.preventDefault();

      const phone = form.querySelector('[data-elem="phone"]')?.value;
      const name = form.querySelector('[data-elem="name"]')?.value;

      if (!phone || !name) return;

      const cleanPhone = phone.replace(/\D/g, '');
      const isValid = await validatePhoneNumber(cleanPhone);

      if (!isValid) {
        alert('Please enter a valid phone number');
        return;
      }

      // Submit form data
      await this.submitFormData(name, phone);

      // Show results
      commercialUtils.hideElement('[data-elem="form-wrap"]');
      commercialUtils.showElement('[data-elem="results-wrap-multi"]');
      this.displayResults();
    };
    document.addEventListener('submit', this._formSubmitHandler);
  }

  async submitFormData(name, phone) {
    const fields = {
      name,
      phone,
      id: this.appState.uniqueId,
      selected_material: this.appState.materialSelected
    };

    let totalAreaFt = 0;
    let totalAreaMt = 0;

    // Add address data
    Object.entries(this.appState.addressSearched).forEach(([key, data]) => {
      fields[`address_${key}`] = data.address;
      fields[`area_ft_${key}`] = data.areaInFeet;
      fields[`area_mt_${key}`] = data.areaInMeter;
      totalAreaFt += Number(data.areaInFeet);
      totalAreaMt += Number(data.areaInMeter);
    });

    fields.total_area_ft = commercialUtils.formatNumber(totalAreaFt);
    fields.total_area_mt = totalAreaMt.toFixed(1);
    Object.assign(fields, getUtmData());
    fields.lead_channel_detail = 'commercial_calculator';

    // Send as JSON to API
    try {
      const response = await fetch(FORM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(fields)
      });

      if (!response.ok) throw new Error('Request failed');

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Submission error:', error);
    }
  }

  displayResults() {
    commercialUtils.scrollToTop();

    // Set material title
    const materialMap = {
      'Silicone': 'Silicone Roof Coating',
      'TPO': 'TPO Flat Roofing',
      'Asphalt': 'Asphalt Roofing',
      'Standard': 'Standard Roofing'
    };

    const priceTag = document.querySelector('[data-elem="material-selected"]');
    if (priceTag) {
      priceTag.textContent = materialMap[this.appState.materialSelected] || materialMap.Standard;
    }

    // Clone and populate address pricing
    const template = document.querySelector('[data-elem="address-pricing-wrap"]');
    const parent = template?.parentNode;

    if (!template || !parent) return;

    template.remove();

    Object.values(this.appState.addressSearched).forEach(data => {
      const clone = template.cloneNode(true);
      clone.querySelector('[data-elem="results-address"]').textContent = data.address;
      clone.querySelector('[data-elem="lowPrice"]').textContent = commercialUtils.formatNumber(Math.round(data.lowPrice));
      clone.querySelector('[data-elem="highPrice"]').textContent = commercialUtils.formatNumber(Math.round(data.highPrice));
      parent.appendChild(clone);
    });

    // Set unique ID for second form
    document.querySelector('#second-form-id')?.setAttribute('value', this.appState.uniqueId);
  }

  cleanup() {
    if (this._materialClickHandler) {
      document.removeEventListener('click', this._materialClickHandler);
    }
    if (this._formSubmitHandler) {
      document.removeEventListener('submit', this._formSubmitHandler);
    }
  }
}

// ===========================================================================
// INIT FUNCTION
// ===========================================================================

function initCommercialCalculator() {
  // Early return if not on the commercial calculator page
  if (!document.querySelector('[data-elem="first-screen"]')) return null;

  // Track state for cleanup
  window.__commercialCalcIntervals = [];
  let flowManager = null;

  // Load dependencies in chain (order matters for Mapbox)
  loadScript('https://code.jquery.com/jquery-3.7.1.min.js', () => {
    loadScript('https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js', () => {
      loadScript('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js', () => {
        // Load DrawRectangle from external URL (not inlined)
        loadScript('https://uploads-ssl.webflow.com/6287b31efad93805832a2f6e/62de4ba563185e28ce6dea35_draw.txt', () => {
          // Set polygon clipping limits
          window.process = window.process || {};
          window.process.env = window.process.env || {};
          window.process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE = '1000000';
          window.process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS = '1000000';

          loadScript('https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js', () => {
            // All deps loaded — initialize
            const appState = new CommercialAppState();
            flowManager = new CommercialFlowManager(appState);
            flowManager.init();
          });
        });
      });
    });
  });

  // Return cleanup function
  return () => {
    // Clear all tracked intervals
    if (window.__commercialCalcIntervals) {
      window.__commercialCalcIntervals.forEach(id => clearInterval(id));
      window.__commercialCalcIntervals = [];
    }
    // Remove delegated event listeners
    if (flowManager) {
      flowManager.cleanup();
    }
  };
}

/**
 * Module 8: Swipers + GLightbox
 * Initializes Swiper carousels and GLightbox galleries on service/category pages.
 *
 * Covers:
 *   - .swiper.is-gallery (gallery carousel, loop)
 *   - .swiper.is-testimonials (testimonials slider with nav arrows)
 *   - .swiper.is-service (service slider with arrows)
 *   - .swiper.is-styles (per-element style sliders with scoped nav)
 *   - GLightbox for .glightbox elements (with tab-based lazy init)
 *   - Video play button overlay
 *
 * Early return: if no .swiper elements AND no .glightbox elements exist
 */

function initSwipersAndLightbox() {
  const hasSwipers = document.querySelector('.swiper');
  const hasLightbox = document.querySelector('.glightbox');
  if (!hasSwipers && !hasLightbox) return null;

  const cleanups = [];

  // --- Swipers (requires Swiper to be loaded globally) ---
  if (typeof Swiper !== 'undefined' && hasSwipers) {
    // Gallery swiper (loop)
    if (document.querySelector('.swiper.is-gallery')) {
      new Swiper('.swiper.is-gallery', {
        loop: true,
        slidesPerView: 'auto',
        speed: 500,
      });
    }

    // Testimonials swiper
    if (document.querySelector('.swiper.is-testimonials')) {
      new Swiper('.swiper.is-testimonials', {
        loop: false,
        speed: 500,
        grabCursor: true,
        slidesPerView: 'auto',
        navigation: { prevEl: '.prev-btn', nextEl: '.next-btn' },
        breakpoints: {
          768: { slidesPerView: 'auto', spaceBetween: 48 },
          992: { slidesPerView: 'auto', spaceBetween: 88 },
        },
      });
    }

    // Service swiper
    if (document.querySelector('.swiper.is-service')) {
      new Swiper('.swiper.is-service', {
        loop: false,
        speed: 500,
        grabCursor: true,
        slidesPerView: 'auto',
        navigation: { prevEl: '.arrow-prev', nextEl: '.arrow-next' },
      });
    }

    // Styles swipers (per-element with scoped navigation)
    document.querySelectorAll('.swiper.is-styles').forEach((swiperEl) => {
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false,
        navigation: {
          prevEl: swiperEl.querySelector('.prev-styles'),
          nextEl: swiperEl.querySelector('.next-styles'),
        },
      });
    });
  }

  // --- Video play button ---
  const playButton = document.querySelector('.playButton');
  const video = document.getElementById('player');
  if (playButton && video) {
    const controller = new AbortController();
    const { signal } = controller;

    playButton.addEventListener('click', () => {
      video.play();
      playButton.style.display = 'none';
    }, { signal });

    video.addEventListener('ended', () => {
      playButton.style.display = 'flex';
    }, { signal });

    video.addEventListener('click', () => {
      video.pause();
      playButton.style.display = 'flex';
    }, { signal });

    cleanups.push(() => controller.abort());
  }

  // --- GLightbox ---
  if (typeof GLightbox !== 'undefined' && hasLightbox) {
    // Default lightbox for non-tab elements
    const defaultLightbox = GLightbox({ selector: '.glightbox:not([data-tab])' });
    cleanups.push(() => defaultLightbox?.destroy?.());

    // Tab-based lightboxes (lazy init)
    const tabLightboxes = {};

    function initTabLightbox(tabId) {
      const selector = `.glightbox[data-tab="${tabId}"]`;
      if (!document.querySelectorAll(selector).length) return;
      if (tabLightboxes[tabId]) return;
      tabLightboxes[tabId] = GLightbox({ selector });
    }

    // Init lightboxes for already-active tabs
    document.querySelectorAll('[role="tab"][aria-selected="true"]').forEach((tab) => {
      initTabLightbox(tab.getAttribute('data-tab-id'));
    });

    // Watch for tab activation via MutationObserver
    const observers = [];
    document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
      const triggerId = panel.getAttribute('aria-labelledby');
      const trigger = document.getElementById(triggerId);
      if (!trigger) return;
      const tabId = trigger.getAttribute('data-tab-id');
      if (!tabId) return;

      const observer = new MutationObserver(() => {
        if (panel.getAttribute('data-state') === 'active') {
          initTabLightbox(tabId);
        }
      });
      observer.observe(panel, { attributes: true, attributeFilter: ['data-state'] });
      observers.push(observer);
    });

    // Click handler for tab lightbox links
    const controller = new AbortController();
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.glightbox[data-tab]');
      if (!link) return;
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      if (!tabLightboxes[tabId]) {
        initTabLightbox(tabId);
      }
      if (tabLightboxes[tabId]) {
        tabLightboxes[tabId].open(link);
      }
    }, { signal: controller.signal });

    cleanups.push(() => {
      controller.abort();
      observers.forEach((o) => o.disconnect());
      Object.values(tabLightboxes).forEach((lb) => lb?.destroy?.());
    });
  }

  if (!cleanups.length) return null;

  return () => {
    cleanups.forEach((fn) => { try { fn(); } catch (_) {} });
  };
}

/* ==========================================================================
   blog.js — Scroll animations, blog sidebar TOC, and phone masking
   ========================================================================== */

// ---------------------------------------------------------------------------
// Embedded enterView library (minified UMD)
// ---------------------------------------------------------------------------
const enterView = (function () {
  const lib = ({
    selector,
    enter = () => {},
    exit = () => {},
    progress = () => {},
    offset = 0,
    once = false,
  }) => {
    let raf = null;
    let ticking = false;
    let elements = [];
    let height = 0;

    function setupRaf() {
      raf =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return setTimeout(callback, 1e3 / 60);
        };
    }

    function getOffsetHeight() {
      if (offset && typeof offset === 'number') {
        const fraction = Math.min(Math.max(0, offset), 1);
        return height - fraction * height;
      }
      return height;
    }

    function updateHeight() {
      const cH = document.documentElement.clientHeight;
      const wH = window.innerHeight || 0;
      height = Math.max(cH, wH);
    }

    function updateScroll() {
      ticking = false;
      const targetFromTop = getOffsetHeight();
      elements = elements.filter((el) => {
        const { top, bottom, height } = el.getBoundingClientRect();
        const entered = top < targetFromTop;
        const exited = bottom < targetFromTop;
        if (entered && !el.__ev_entered) {
          enter(el);
          el.__ev_progress = 0;
          progress(el, el.__ev_progress);
          if (once) return false;
        } else if (!entered && el.__ev_entered) {
          el.__ev_progress = 0;
          progress(el, el.__ev_progress);
          exit(el);
        }
        if (entered && !exited) {
          const delta = (targetFromTop - top) / height;
          el.__ev_progress = Math.min(1, Math.max(0, delta));
          progress(el, el.__ev_progress);
        }
        if (entered && exited && el.__ev_progress !== 1) {
          el.__ev_progress = 1;
          progress(el, el.__ev_progress);
        }
        el.__ev_entered = entered;
        return true;
      });
      if (!elements.length) {
        window.removeEventListener('scroll', onScroll, true);
        window.removeEventListener('resize', onResize, true);
        window.removeEventListener('load', onLoad, true);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        raf(updateScroll);
      }
    }

    function onResize() {
      updateHeight();
      updateScroll();
    }

    function onLoad() {
      updateHeight();
      updateScroll();
    }

    function selectionToArray(selection) {
      const len = selection.length;
      const result = [];
      for (let i = 0; i < len; i += 1) {
        result.push(selection[i]);
      }
      return result;
    }

    function selectAll(sel, parent = document) {
      if (typeof sel === 'string') {
        return selectionToArray(parent.querySelectorAll(sel));
      } else if (sel instanceof NodeList) {
        return selectionToArray(sel);
      } else if (sel instanceof Array) {
        return sel;
      }
    }

    function setupElements() {
      elements = selectAll(selector);
    }

    function setupEvents() {
      window.addEventListener('resize', onResize, true);
      window.addEventListener('scroll', onScroll, true);
      window.addEventListener('load', onLoad, true);
      onResize();
    }

    function init() {
      if (!selector) {
        console.error('enterView: must pass selector');
        return false;
      }
      setupElements();
      if (!elements || !elements.length) {
        return false;
      }
      setupRaf();
      setupEvents();
      updateScroll();
    }

    init();

    // Return remove functions so callers can tear down
    return {
      destroy() {
        window.removeEventListener('scroll', onScroll, true);
        window.removeEventListener('resize', onResize, true);
        window.removeEventListener('load', onLoad, true);
        elements = [];
      },
    };
  };
  return lib;
})();

// ---------------------------------------------------------------------------
// Animation config
// ---------------------------------------------------------------------------
const ANI_CONFIG = {
  intersectionOffset: 0.2,
  intersectionOnce: true,
  progressOffset: 0,
  progressOnce: false,
};

// ---------------------------------------------------------------------------
// initScrollAnimations — enterView + data-ani / data-ani-progress
// Runs on ANY page with matching elements.
// ---------------------------------------------------------------------------
function initScrollAnimations() {
  function collectElements(attr, isChildren) {
    const sel = `[${attr}]${
      isChildren
        ? '[data-ani-children="true"] > *'
        : ':not([data-ani-children="true"])'
    }`;
    return Array.from(document.querySelectorAll(sel));
  }

  const aniEls = [
    ...collectElements('data-ani', false),
    ...collectElements('data-ani', true),
  ];
  const progressEls = [
    ...collectElements('data-ani-progress', false),
    ...collectElements('data-ani-progress', true),
  ];

  if (!aniEls.length && !progressEls.length) return null;

  // Toggle in/out classes
  function toggleClass(el, add, remove) {
    el.classList.add(add);
    el.classList.remove(remove);
  }

  // Compute transform string for progress-based animations
  function getTransform(el, t) {
    const parent = el.parentElement;
    const type =
      parent && parent.hasAttribute('data-ani-progress')
        ? parent.getAttribute('data-ani-progress')
        : el.getAttribute('data-ani-progress');
    const style = getComputedStyle(el);
    const slideOffset =
      parseFloat(style.getPropertyValue('--ani-slide-offset')) || 0;
    const flipRotate =
      parseFloat(style.getPropertyValue('--ani-flip-rotate')) || 0;
    const zoomScale =
      1 -
      (1 - t) *
        (1 -
          (parseFloat(style.getPropertyValue('--ani-zoom-out-scale')) || 1));

    switch (type) {
      case 'slide-up':
        return `translateY(${(1 - t) * slideOffset}px)`;
      case 'slide-down':
        return `translateY(-${(1 - t) * slideOffset}px)`;
      case 'slide-left':
        return `translateX(${(1 - t) * slideOffset}px)`;
      case 'slide-right':
        return `translateX(-${(1 - t) * slideOffset}px)`;
      case 'flip-x':
        return `rotateX(${(1 - t) * flipRotate}deg)`;
      case 'flip-y':
        return `rotateY(${(1 - t) * flipRotate}deg)`;
      case 'zoom':
        return `scale(${zoomScale})`;
      default:
        return 'none';
    }
  }

  // Setup an enterView instance
  function setup({ trigger, selector, offset, once }) {
    const isProgress = trigger === 'progress';
    return enterView({
      selector,
      enter: (el) => !isProgress && toggleClass(el, 'in', 'out'),
      exit: (el) => !isProgress && toggleClass(el, 'out', 'in'),
      progress: (el, t) => {
        if (!isProgress) return;
        el.style.opacity = t;
        el.style.transform = getTransform(el, t);
      },
      offset,
      once,
    });
  }

  const instances = [];

  if (aniEls.length) {
    instances.push(
      setup({
        trigger: 'intersection',
        selector: aniEls,
        offset: ANI_CONFIG.intersectionOffset,
        once: ANI_CONFIG.intersectionOnce,
      })
    );
  }

  if (progressEls.length) {
    instances.push(
      setup({
        trigger: 'progress',
        selector: progressEls,
        offset: ANI_CONFIG.progressOffset,
        once: ANI_CONFIG.progressOnce,
      })
    );
  }

  return function cleanup() {
    instances.forEach((inst) => inst && inst.destroy && inst.destroy());
  };
}

// ---------------------------------------------------------------------------
// Promisified script loader (wraps the global loadScript callback API)
// ---------------------------------------------------------------------------
function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    if (typeof loadScript === 'function') {
      loadScript(src, resolve, reject);
    } else {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}

// ---------------------------------------------------------------------------
// initBlogSidebar — GSAP-powered sidebar table of contents
// ---------------------------------------------------------------------------
async function initBlogSidebar() {
  const blogBody = document.querySelector('[data-element="blog-body"]');
  if (!blogBody) return null;

  const sideNavList = document.querySelector('.b-blogs_list');
  const sideNavWrap = document.querySelector('.b-blogs_wrap');
  if (!sideNavList || !sideNavWrap) return null;

  const sections = blogBody.querySelectorAll('h2:not(.no-show)');
  if (!sections.length) return null;

  // Load GSAP + plugins dynamically
  if (typeof gsap === 'undefined') {
    await loadScriptAsync(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    );
  }
  if (typeof ScrollTrigger === 'undefined') {
    await loadScriptAsync(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
    );
  }
  if (typeof ScrollToPlugin === 'undefined') {
    await loadScriptAsync(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js'
    );
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const FIXED_NAV_HEIGHT = 80;
  const ACTIVE_OFFSET = 1;
  const ac = new AbortController();
  const triggers = [];

  // Smooth-scroll helper
  function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    gsap.to(window, {
      scrollTo: {
        y:
          target.getBoundingClientRect().top +
          window.scrollY -
          FIXED_NAV_HEIGHT,
        autoKill: false,
      },
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  // Build side-nav links
  sections.forEach((h2, index) => {
    const id = `section-${index + 1}`;
    h2.id = id;

    const item = document.createElement('div');
    item.className = 'b-blogs_item';

    const link = document.createElement('a');
    link.className = 'b-blogs_link';
    link.innerHTML = `<div class="b-blogs_link-text">${h2.textContent.trim()}</div>`;
    link.dataset.target = id;

    item.appendChild(link);
    sideNavList.appendChild(item);
  });

  // Side-nav click delegation
  sideNavList.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest('.b-blogs_link');
      if (!link) return;
      e.preventDefault();
      scrollToSection(link.dataset.target);
    },
    { signal: ac.signal }
  );

  // Active-state helpers
  function setActive(index) {
    const links = sideNavList.querySelectorAll('.b-blogs_link');
    links.forEach((l) => l.classList.remove('active'));
    const activeLink = links[index];
    if (!activeLink) return;
    activeLink.classList.add('active');
    centerActiveLink(activeLink);
  }

  function centerActiveLink(link) {
    const item = link.closest('.b-blogs_item');
    if (!item) return;
    sideNavWrap.scrollTo({
      top:
        item.offsetTop -
        sideNavWrap.clientHeight / 2 +
        item.clientHeight / 2,
      behavior: 'smooth',
    });
  }

  // ScrollTrigger per section
  sections.forEach((section, index) => {
    const st = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${FIXED_NAV_HEIGHT + ACTIVE_OFFSET}px`,
      end: () => `bottom ${FIXED_NAV_HEIGHT + ACTIVE_OFFSET}px`,
      onEnter: () => setActive(index),
      onEnterBack: () => setActive(index),
    });
    triggers.push(st);
  });

  // Set initial active
  setActive(0);

  // Anchor link cleanup: strip href, store as data-target-id, add click handler
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const targetId = anchor.getAttribute('href').substring(1);
    anchor.dataset.targetId = targetId;
    anchor.removeAttribute('href');
    anchor.style.cursor = 'pointer';
  });

  document.querySelectorAll('a[data-target-id]').forEach((anchor) => {
    anchor.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        scrollToSection(this.dataset.targetId);
      },
      { signal: ac.signal }
    );
  });

  return function cleanup() {
    ac.abort();
    triggers.forEach((st) => st.kill());
  };
}

// ---------------------------------------------------------------------------
// initPhoneMasking — vanilla JS phone formatter: (XXX) XXX-XXXX
// No jQuery dependency. Works with React-rendered inputs.
// ---------------------------------------------------------------------------
function initPhoneMasking() {
  const PHONE_SELECTOR = '#phone-yes, #phone-no, #Phone-Number, #Phone, input[type="tel"], input[name*="phone" i]';

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }

  function onInput(e) {
    const field = e.target;
    if (!field.matches || !field.matches(PHONE_SELECTOR)) return;

    const cursorPos = field.selectionStart;
    const oldVal = field.value;
    const formatted = formatPhone(oldVal);

    if (formatted !== oldVal) {
      field.value = formatted;
      // Keep cursor in a reasonable position after formatting
      const digitsBefore = oldVal.slice(0, cursorPos).replace(/\D/g, '').length;
      let newPos = 0;
      let digitCount = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) digitCount++;
        if (digitCount >= digitsBefore) { newPos = i + 1; break; }
      }
      if (digitCount < digitsBefore) newPos = formatted.length;
      field.setSelectionRange(newPos, newPos);
    }
  }

  document.addEventListener('input', onInput);

  return function cleanup() {
    document.removeEventListener('input', onInput);
  };
}

// ---------------------------------------------------------------------------
// initBlog — main entry point, orchestrates all three sub-modules
// ---------------------------------------------------------------------------
async function initBlog() {
  const hasBlogBody = !!document.querySelector('[data-element="blog-body"]');
  const hasAniEls =
    !!document.querySelector('[data-ani]') ||
    !!document.querySelector('[data-ani-progress]');

  if (!hasBlogBody && !hasAniEls) return null;

  const cleanups = [];

  // Scroll animations run on any page with data-ani elements
  const aniCleanup = initScrollAnimations();
  if (aniCleanup) cleanups.push(aniCleanup);

  // Blog sidebar only on blog pages
  const sidebarCleanup = await initBlogSidebar();
  if (sidebarCleanup) cleanups.push(sidebarCleanup);

  if (!cleanups.length) return null;

  return function cleanup() {
    cleanups.forEach((fn) => fn());
  };
}

// Module 10: Service Area Widget — REMOVED (handled by Webstudio cloud embed)


/* SERVICE AREA WIDGET REMOVED — START (was _initServiceAreaWidgetCore)
function _initServiceAreaWidgetCore() {
  isInitializing = true;
  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/improveitmd/cluh2p7z500kb01ped3e43aw8',
    center: [-77.041975, 38.894080],
    zoom: 7,
  });

  // Centralized state
  const SAW = {
    data: [],
    containers: {},
    currentState: null,
    currentCounty: null,
    currentCity: null,
    currentScreen: 'state',
    initialized: false,
    stateNames: { 'MD': 'Maryland', 'DC': 'Washington DC', 'VA': 'Virginia' },
    boundingBoxes: {
      'MD': [-77.640982, 38.466804, -76.177053, 39.459565],
      'DC': [-77.122999, 38.804398, -76.908765, 38.997306],
      'VA': [-77.364261, 38.667188, -77.025908, 38.969815],
    },
  };
  window.ServiceAreaWidget = SAW;

  // --- Data transformation ---
  function transformStrapiData(strapiResponse) {
    let items = [];
    try {
      if (strapiResponse?.data?.data) items = strapiResponse.data.data;
      else if (Array.isArray(strapiResponse?.data)) items = strapiResponse.data;
      else if (Array.isArray(strapiResponse)) items = strapiResponse;
    } catch (e) {
      console.error('Error parsing Strapi response:', e);
      return [];
    }

    return items.map((item) => {
      let coordinates = null;
      if (item.coordinatesLatLong && typeof item.coordinatesLatLong === 'string') {
        const parts = item.coordinatesLatLong.split(',');
        if (parts.length === 2) {
          const lat = parseFloat(parts[0].trim());
          const lng = parseFloat(parts[1].trim());
          if (!isNaN(lat) && !isNaN(lng)) coordinates = [lat, lng];
        }
      }

      const serviceLinks = item.serviceLinks || {};
      return {
        city: item.title || '',
        county: item.counties?.[0]?.name || '',
        state: item.state || '',
        coordinates,
        cityZoomLevel: item.zoomLevel || 13,
        slug: item.slug || '',
        services: {
          roofing: serviceLinks.roofing?.slug || null,
          siding: serviceLinks.siding?.slug || null,
          trims: serviceLinks.exteriorTrim?.slug || null,
          decks: serviceLinks.decks?.slug || null,
          windows: serviceLinks.windows?.slug || null,
          gutters: serviceLinks.gutters?.slug || null,
          doors: serviceLinks.doors?.slug || null,
        },
      };
    }).filter((item) => item.city && item.state);
  }

  // --- Map functions ---
  function flyToLocation(locationName, locationType, zoom, coordinates) {
    const bbox = SAW.boundingBoxes[SAW.currentState] || SAW.boundingBoxes['MD'];

    if (coordinates) {
      const zoomLevel = zoom || (locationType === 'state' ? 7 : locationType === 'county' ? 9 : 13);
      map.flyTo({ center: [coordinates[1], coordinates[0]], zoom: zoomLevel, essential: true });
    } else {
      const encodedName = encodeURIComponent(locationName);
      const bboxStr = bbox.join(',');
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedName}.json?access_token=${mapboxgl.accessToken}&limit=1&bbox=${bboxStr}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.features?.[0]) {
            const zoomLevel = zoom || (locationType === 'state' ? 7 : locationType === 'county' ? 10 : 13);
            map.flyTo({ center: data.features[0].center, zoom: zoomLevel, essential: true });
          }
        })
        .catch((e) => console.error('Geocoding error:', e));
    }
  }

  // --- Container management ---
  function getContainer(screenName, structureAttr) {
    if (SAW.containers[screenName]) return SAW.containers[screenName];

    const selector = `[data-screen="${screenName}"] [structure-${structureAttr}="link"]`;
    const linkElement = document.querySelector(selector);
    if (linkElement) {
      const container = linkElement.parentElement;
      SAW.containers[screenName] = container;
      return container;
    }
    return null;
  }

  // --- Screen management ---
  function showScreen(screenName) {
    SAW.currentScreen = screenName;
    document.querySelectorAll('[data-screen]').forEach((screen) => {
      const name = screen.getAttribute('data-screen');
      if (name === screenName) {
        screen.classList.remove('hidden');
        screen.classList.add('active');
      } else {
        screen.classList.add('hidden');
        screen.classList.remove('active');
      }
    });
  }

  // --- Create link element ---
  function createLinkElement(text, structureNum, dataAttrs) {
    const link = document.createElement('a');
    link.className = 'service-area_toggle-link is--padding-small w-inline-block';
    link.setAttribute(`structure-${structureNum}`, 'link');
    link.setAttribute('href', 'javascript:void(0);');

    Object.keys(dataAttrs).forEach((key) => {
      link.setAttribute(`data-${key}`, dataAttrs[key]);
    });

    const linkText = document.createElement('h3');
    linkText.className = 'service-area_link-text-small';
    linkText.textContent = text;
    link.appendChild(linkText);

    const logo = document.createElement('div');
    logo.className = 'n-work_logo w-embed';
    logo.innerHTML = '<svg width="18" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z" fill="currentColor"/></svg>';
    link.appendChild(logo);

    return link;
  }

  // --- Navigation functions ---
  function showCounties(stateCode) {
    SAW.currentState = stateCode;
    SAW.currentCounty = null;
    SAW.currentCity = null;

    const counties = [...new Set(
      SAW.data.filter((item) => item.state === stateCode && item.county).map((item) => item.county)
    )].sort();

    const breadcrumb = document.querySelector('[data-screen="county"] [data-breadcrumb="state"]');
    if (breadcrumb) breadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;

    const container = getContainer('county', '2');
    if (!container) return;

    container.innerHTML = '';

    if (counties.length === 0) {
      showAllCitiesForState(stateCode);
      return;
    }

    counties.forEach((countyName) => {
      const link = createLinkElement(countyName, '2', { county: countyName, state: stateCode });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        flyToLocation(this.getAttribute('data-county'), 'county');
        showCities(this.getAttribute('data-county'), this.getAttribute('data-state'));
      });
      container.appendChild(link);
    });

    showScreen('county');
    flyToLocation(SAW.stateNames[stateCode], 'state', 8);
  }

  function showAllCitiesForState(stateCode) {
    SAW.currentState = stateCode;
    SAW.currentCounty = null;

    const cities = [...new Set(
      SAW.data.filter((item) => item.state === stateCode).map((item) => item.city)
    )].sort();

    const stateBreadcrumb = document.querySelector('[data-screen="city"] [data-breadcrumb="state"]');
    if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;

    const countyBreadcrumb = document.querySelector('[data-screen="city"] [data-breadcrumb="county"]');
    if (countyBreadcrumb) {
      countyBreadcrumb.textContent = '';
      const countyLink = countyBreadcrumb.closest('a');
      if (countyLink) countyLink.style.display = 'none';
    }

    const container = getContainer('city', '3');
    if (!container) return;
    container.innerHTML = '';

    cities.forEach((cityName) => {
      const link = createLinkElement(cityName, '3', { city: cityName, state: stateCode, county: '' });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const city = this.getAttribute('data-city');
        const state = this.getAttribute('data-state');
        const cityData = SAW.data.find((item) => item.city === city && item.state === state);
        if (cityData?.coordinates) flyToLocation(city, 'city', cityData.cityZoomLevel, cityData.coordinates);
        else flyToLocation(city, 'city');
        showServices(city, '', state);
      });
      container.appendChild(link);
    });

    showScreen('city');
  }

  function showCities(countyName, stateCode) {
    SAW.currentState = stateCode;
    SAW.currentCounty = countyName;
    SAW.currentCity = null;

    const cities = [...new Set(
      SAW.data.filter((item) => item.state === stateCode && item.county === countyName).map((item) => item.city)
    )].sort();

    const stateBreadcrumb = document.querySelector('[data-screen="city"] [data-breadcrumb="state"]');
    if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;

    const countyBreadcrumb = document.querySelector('[data-screen="city"] [data-breadcrumb="county"]');
    if (countyBreadcrumb) {
      countyBreadcrumb.textContent = countyName;
      const countyLink = countyBreadcrumb.closest('a');
      if (countyLink) countyLink.style.display = '';
    }

    const container = getContainer('city', '3');
    if (!container) return;
    container.innerHTML = '';

    cities.forEach((cityName) => {
      const link = createLinkElement(cityName, '3', { city: cityName, county: countyName, state: stateCode });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const city = this.getAttribute('data-city');
        const state = this.getAttribute('data-state');
        const cityData = SAW.data.find((item) => item.city === city && item.state === state);
        if (cityData?.coordinates) flyToLocation(city, 'city', cityData.cityZoomLevel, cityData.coordinates);
        else flyToLocation(city, 'city');
        showServices(city, this.getAttribute('data-county'), state);
      });
      container.appendChild(link);
    });

    showScreen('city');
  }

  function showServices(cityName, countyName, stateCode) {
    SAW.currentState = stateCode;
    SAW.currentCounty = countyName;
    SAW.currentCity = cityName;

    const cityData = SAW.data.find((item) => item.city === cityName && item.state === stateCode);
    if (!cityData) return;

    // Update breadcrumbs
    const stateBreadcrumb = document.querySelector('[data-screen="services"] [data-breadcrumb="state"]');
    if (stateBreadcrumb) stateBreadcrumb.textContent = SAW.stateNames[stateCode] || stateCode;

    const countyBreadcrumb = document.querySelector('[data-screen="services"] [data-breadcrumb="county"]');
    if (countyBreadcrumb) {
      if (countyName) {
        countyBreadcrumb.textContent = countyName;
        const countyLink = countyBreadcrumb.closest('a');
        if (countyLink) countyLink.style.display = '';
      } else {
        countyBreadcrumb.textContent = '';
        const countyLink = countyBreadcrumb.closest('a');
        if (countyLink) countyLink.style.display = 'none';
      }
    }

    const cityBreadcrumb = document.querySelector('[data-screen="services"] [data-breadcrumb="city"]');
    if (cityBreadcrumb) {
      if (stateCode === 'DC') {
        cityBreadcrumb.textContent = '';
        const cityLink = cityBreadcrumb.closest('a');
        if (cityLink) cityLink.style.display = 'none';
      } else {
        cityBreadcrumb.textContent = cityName;
        const cityLink = cityBreadcrumb.closest('a');
        if (cityLink) cityLink.style.display = '';
      }
    }

    const container = getContainer('services', '4');
    if (!container) return;
    container.innerHTML = '';

    // DC flat roofing special link
    if (stateCode === 'DC') {
      const flatRoofLink = document.createElement('a');
      flatRoofLink.href = '/services/washington-dc-flat-roofing-company-near-you';
      flatRoofLink.className = 'service-area_toggle-link is--padding-small w-inline-block';
      flatRoofLink.setAttribute('structure-4', 'link');

      const h3 = document.createElement('h3');
      h3.className = 'service-area_link-text-small';
      h3.textContent = 'Flat Roofing in Washington DC';
      flatRoofLink.appendChild(h3);

      const div = document.createElement('div');
      div.className = 'n-work_logo w-embed';
      div.innerHTML = '<svg width="18" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z" fill="currentColor"/></svg>';
      flatRoofLink.appendChild(div);
      container.appendChild(flatRoofLink);
    }

    // Service links
    const serviceNames = {
      roofing: 'Roofing', siding: 'Siding', trims: 'Exterior Trim',
      decks: 'Decks', windows: 'Windows', gutters: 'Gutters', doors: 'Doors',
    };

    const services = cityData.services || {};
    Object.keys(services).forEach((service) => {
      const slug = services[service];
      if (!slug) return;

      const displayName = serviceNames[service] || service;
      const link = document.createElement('a');
      link.href = '/services/' + slug;
      link.className = 'service-area_toggle-link is--padding-small w-inline-block';
      link.setAttribute('structure-4', 'link');

      const linkText = document.createElement('h3');
      linkText.className = 'service-area_link-text-small';
      linkText.textContent = `${displayName} in ${cityName}`;
      link.appendChild(linkText);

      const logo = document.createElement('div');
      logo.className = 'n-work_logo w-embed';
      logo.innerHTML = '<svg width="18" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z" fill="currentColor"/></svg>';
      link.appendChild(logo);

      container.appendChild(link);
    });

    showScreen('services');
  }

  // --- State click handlers ---
  function handleStateClick(stateCode) {
    SAW.currentState = stateCode;
    if (stateCode === 'DC') {
      flyToLocation('Washington DC', 'state', 10);
      showServices('Washington DC', '', 'DC');
    } else if (stateCode === 'VA') {
      flyToLocation('Virginia', 'state', 9);
      showCounties('VA');
    } else if (stateCode === 'MD') {
      flyToLocation('Maryland', 'state', 8);
      showCounties('MD');
    }
  }

  // --- Back button handler ---
  function handleBackClick() {
    switch (SAW.currentScreen) {
      case 'services':
        if (SAW.currentState === 'DC') {
          showScreen('state');
          flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);
        } else if (SAW.currentCounty) {
          showCities(SAW.currentCounty, SAW.currentState);
        } else {
          showCounties(SAW.currentState);
        }
        break;
      case 'city':
        showCounties(SAW.currentState);
        break;
      case 'county':
        showScreen('state');
        flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);
        break;
    }
  }

  // --- Breadcrumb handler ---
  function handleBreadcrumbClick(type, name) {
    switch (type) {
      case 'state':
        if (name === 'MD' || name === 'VA') showCounties(name);
        else {
          showScreen('state');
          flyToLocation('Washington DC', 'state', 7, [38.894080, -77.041975]);
        }
        break;
      case 'county':
        showCities(name, SAW.currentState);
        break;
    }
  }

  // --- Initialize ---
  function initWidget() {
    if (SAW.initialized) return;

    SAW.data = transformStrapiData(inputData);

    const loadingCircle = document.querySelector('.loading-circle');
    if (loadingCircle) loadingCircle.remove();

    // Setup state links
    document.querySelectorAll('[structure-1]').forEach((link) => {
      const stateCode = link.getAttribute('structure-1').toUpperCase();
      link.removeAttribute('data-discover');
      link.setAttribute('href', 'javascript:void(0)');

      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      newLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleStateClick(stateCode);
      });
    });

    // Setup back buttons
    document.querySelectorAll('[structure-2="back"], [structure-3="back"], [structure-4="back"]').forEach((btn) => {
      btn.removeAttribute('data-discover');
      btn.setAttribute('href', 'javascript:void(0)');

      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleBackClick();
      });
    });

    // Setup breadcrumb links
    document.querySelectorAll('[data-breadcrumb]').forEach((breadcrumb) => {
      const link = breadcrumb.closest('a');
      if (!link) return;

      link.removeAttribute('data-discover');
      link.setAttribute('href', 'javascript:void(0)');

      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      const newBreadcrumb = newLink.querySelector('[data-breadcrumb]');
      newLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const type = newBreadcrumb.getAttribute('data-breadcrumb');
        let name = newBreadcrumb.textContent.trim();
        if (name === 'Maryland') name = 'MD';
        if (name === 'Washington DC') name = 'DC';
        if (name === 'Virginia') name = 'VA';
        handleBreadcrumbClick(type, name);
      });
    });

    SAW.initialized = true;
    showScreen('state');
  }

  // Release the MutationObserver guard after the map finishes its initial DOM mutations.
  let mapGuardReleased = false;
  function releaseMapGuard() {
    if (mapGuardReleased) return;
    mapGuardReleased = true;
    isInitializing = false;
  }
  map.once('idle', releaseMapGuard);
  map.once('error', releaseMapGuard);
  // Fallback: release after 5s even if map never reaches idle (e.g. network failure)
  setTimeout(releaseMapGuard, 5000);

  setTimeout(initWidget, 100);
}
SERVICE AREA WIDGET REMOVED — END */

// ===========================================================================
// 12. FAQ ACCORDION — allow closing an open radio-based FAQ item
// ===========================================================================
function initFaqAccordion() {
  const radios = document.querySelectorAll('.faqs-checkbox');
  if (!radios.length) return null;

  function onClick(e) {
    const label = e.target.closest('.faqs-question-wrapper');
    if (!label) return;
    const radio = label.previousElementSibling;
    if (radio && radio.classList.contains('faqs-checkbox') && radio.checked) {
      // Defer uncheck so the browser's default check fires first
      setTimeout(() => { radio.checked = false; }, 0);
    }
  }

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

// ===========================================================================
// 13. GENERIC FORM SUBMISSION HANDLER
// ===========================================================================
// Matches any <form> with data-api-endpoint. Optional attributes:
//   data-api-endpoint="url"        — required, the POST endpoint
//   data-success-message="..."     — text shown on success (default: "Thank you!")
//   data-success-redirect="url"    — redirect URL on success (overrides message)
//   data-success-hide="true"       — hide the form on success (default: true)
//   data-form-name="contact"       — passed as form_name metadata
//   data-loading-text="Sending..." — button text while submitting
//
// All form fields are collected by name attribute and sent as JSON.
// A hidden page_url field is injected into every matching form on the page.

const FORM_SELECTOR = 'form[data-api-endpoint]';

function initGenericFormHandler() {
  // Inject or update hidden page_url field in ALL forms on the page
  // Also set any existing page_referrer inputs to current URL
  function injectPageUrlFields() {
    const currentUrl = window.location.href;
    document.querySelectorAll('form').forEach((form) => {
      let hidden = form.querySelector('input[name="page_url"]');
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'page_url';
        form.appendChild(hidden);
      }
      hidden.value = currentUrl;

      // Update Webstudio page_referrer fields to current page URL
      const referrerField = form.querySelector('input[name="page_referrer"]');
      if (referrerField) referrerField.value = currentUrl;
    });
  }
  injectPageUrlFields();

  // Re-inject on SPA navigation (MutationObserver will call initPage → bootstrap re-runs)
  // Also observe for dynamically added forms
  const formObserver = new MutationObserver(() => injectPageUrlFields());
  formObserver.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest(FORM_SELECTOR);
    if (!form) return;

    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalBtnText = submitBtn?.textContent || submitBtn?.value || '';
    const loadingText = form.dataset.loadingText || 'Sending...';

    // Disable button + show loading
    if (submitBtn) {
      submitBtn.disabled = true;
      if (submitBtn.tagName === 'INPUT') submitBtn.value = loadingText;
      else submitBtn.textContent = loadingText;
    }

    // Collect all named fields
    const formData = {};
    new FormData(form).forEach((value, key) => {
      if (formData[key]) {
        // Handle multiple values (checkboxes, multi-selects)
        if (Array.isArray(formData[key])) formData[key].push(value);
        else formData[key] = [formData[key], value];
      } else {
        formData[key] = value;
      }
    });

    // Add metadata
    formData.page_url = window.location.href;
    formData.current_page = document.title;
    formData.page_referrer = document.referrer;
    const utmData = getUtmData();
    // data-lead-source on form element is highest-priority override
    formData.lead_source = form.dataset.leadSource || utmData.lead_source;
    formData.lead_medium = utmData.lead_medium;
    formData.lead_channel_detail = form.dataset.channelDetail || form.dataset.formName || '';
    formData.utm_source = utmData.utm_source;
    formData.utm_medium = utmData.utm_medium;
    formData.utm_campaign = utmData.utm_campaign;
    if (form.dataset.formName) formData.form_name = form.dataset.formName;

    // Phone validation (if a field named "phone" exists)
    const phoneValue = formData.phone || formData.Phone || formData['Phone-Number'];
    if (phoneValue) {
      const cleanPhone = String(phoneValue).replace(/\D/g, '');
      if (cleanPhone.length >= 7) {
        const isValid = await validatePhoneNumber(cleanPhone);
        if (!isValid) {
          alert('Please enter a valid phone number.');
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.tagName === 'INPUT') submitBtn.value = originalBtnText;
            else submitBtn.textContent = originalBtnText;
          }
          return;
        }
      }
    }

    try {
      const endpoint = form.dataset.apiEndpoint || FORM_API_URL;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Success handling
      const successRedirect = form.dataset.successRedirect;
      if (successRedirect) {
        window.location.href = successRedirect;
        return;
      }

      const shouldHide = form.dataset.successHide !== 'false';
      const successMessage = form.dataset.successMessage || 'Thank you! We\'ll be in touch soon.';

      if (shouldHide) {
        // Check for a sibling success element first
        const successEl = form.parentElement?.querySelector('[data-form-success]');
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = '';
          successEl.classList.remove('is--hidden');
        } else {
          // Create inline success message
          const msg = document.createElement('div');
          msg.className = 'form-success-message';
          msg.textContent = successMessage;
          form.parentElement?.insertBefore(msg, form);
          form.style.display = 'none';
        }
      }
    } catch (err) {
      console.error('[form-submit]', err);
      const errorMessage = form.dataset.errorMessage || 'Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (submitBtn.tagName === 'INPUT') submitBtn.value = originalBtnText;
        else submitBtn.textContent = originalBtnText;
      }
    }
  });
}

// ===========================================================================
// CONTROLLER — init/cleanup with SPA route detection
// ===========================================================================
let activeCleanups = [];
let isInitializing = false;

async function initPage() {
  teardownPage();
  isInitializing = true;

  try {
    const config = getPageConfig();

    // Synchronous modules (always safe, check DOM internally)
    const cleanups = [
      initVideoPreloader(),
      initLazyMaps(),
      initCalculator(),
      initCommercialCalculator(),
      initSwipersAndLightbox(),
      initFaqAccordion(),
    ];

    // Weather only if config says so
    if (config) {
      cleanups.push(initWeatherWidget(config));
    }

    // Phone masking (vanilla JS — no dependencies)
    cleanups.push(initPhoneMasking());

    // Async modules (blog/animations — load GSAP etc. dynamically)
    try {
      const blogCleanup = await initBlog();
      if (blogCleanup) cleanups.push(blogCleanup);
    } catch (err) {
      console.error('[blog]', err);
    }

    activeCleanups = cleanups.filter(Boolean);
  } finally {
    isInitializing = false;
  }
}

function teardownPage() {
  for (const cleanup of activeCleanups) {
    try { cleanup(); } catch (_) { /* swallow */ }
  }
  activeCleanups = [];
}

function observeRouteChanges() {
  const target = document.querySelector('main') || document.body;
  let debounceTimer = null;

  const observer = new MutationObserver(() => {
    if (isInitializing) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => initPage(), 150);
  });

  observer.observe(target, { childList: true, subtree: true });
}

// ---- Bootstrap ----
async function bootstrap() {
  captureUtmParams();
  initGenericFormHandler(); // persistent — survives re-init to protect in-flight submissions
  await initPage();
  observeRouteChanges();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
