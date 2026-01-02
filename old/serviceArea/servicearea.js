(function() {
  'use strict';

  // Configuration & Static Data
  const CONFIG = {
    mapbox: {
      accessToken: 'pk.eyJ1IjoiaW1wcm92ZWl0bWQiLCJhIjoiY2w1OXlhZ3BnMDAyMDNrcG9pdmU3OXNvcyJ9.8IKtnRJwbi7ss5MjeHGAkQ',
      style: 'mapbox://styles/improveitmd/cluh2p7z500kb01ped3e43aw8',
      center: [-77.79410102928439, 34.17520598451204],
      zoom: 8
    },
    bounds: {
      'NC': [-84.321869, 33.842316, -75.460621, 36.588117],
      'SC': [-83.35391, 32.0346, -78.54203, 35.215402],
      'North Carolina': [-84.321869, 33.842316, -75.460621, 36.588117],
      'South Carolina': [-83.35391, 32.0346, -78.54203, 35.215402]
    },
    zoom: { state: 7, county: 9, city: 13 }
  };

  const LOCATION_DATA = {
    cities: [
      {
        city: 'Wilmington',
        county: 'New Haven County',
        state: 'NC',
        coordinates: [-77.9447, 34.2257], // [lng, lat] - Verified coordinates
        cityZoomLevel: 13,
        services: { roofing: 'wilmington-north-carolina-roofing-company-near-you' }
      },
      {
        city: 'Hampstead',
        county: 'Pender County',
        state: 'NC',
        coordinates: [-77.7105, 34.3677], // [lng, lat] - Verified coordinates
        cityZoomLevel: 13,
        services: { roofing: 'hampstead-north-carolina-roofing-company-near-you' }
      },
      {
        city: 'Oak Island',
        county: 'Brunswick County',
        state: 'NC',
        coordinates: [-78.1611, 33.9166], // [lng, lat] - Verified coordinates
        cityZoomLevel: 13,
        services: { roofing: 'oak-island-north-carolina-roofing-company-near-you' }
      }
    ]
  };

  // Utilities
  const Utils = {
    loadScript: (src, callback) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    },
    
    loadCSS: (href, callback) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = callback;
      document.head.appendChild(link);
    },

    getUniqueValues: (arr, key) => [...new Set(arr.map(item => item[key]))],
    
    formatStateName: (state) => ({
      'NC': 'North Carolina',
      'SC': 'South Carolina'
    }[state] || state),

    capitalizeService: (service) => service === 'trims' ? 'Exterior Trim' : 
      service.charAt(0).toUpperCase() + service.slice(1)
  };

  // Main Application Class
  class CarolinaMap {
    constructor() {
      this.map = null;
      this.dataArr = [];
      this.currentScreen = {};
      this.init();
    }

    init() {
      Utils.loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js', () => {
        Utils.loadScript('https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js', () => {
          Utils.loadCSS('https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css', () => {
            this.initializeMap();
            this.loadData();
          });
        });
      });
    }

    initializeMap() {
      mapboxgl.accessToken = CONFIG.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: CONFIG.mapbox.style,
        center: CONFIG.mapbox.center,
        zoom: CONFIG.mapbox.zoom
      });
    }

    loadData() {
      const storedData = DataStore?.get('itemsData');
      if (storedData?.length) {
        this.dataArr = storedData;
        this.initializeUI();
      } else {
        this.processStaticData();
      }
    }

    processStaticData() {
      this.dataArr = LOCATION_DATA.cities.map(city => ({
        ...city,
        services: {
          roofing: city.services.roofing || '',
          siding: '',
          trims: '',
          decks: '',
          windows: '',
          gutters: '',
          doors: ''
        }
      }));

      DataStore?.set('itemsData', this.dataArr);
      this.initializeUI();
    }

    initializeUI() {
      this.hideLoader();
      setTimeout(() => this.showStates(), 500);
      this.attachEventListeners();
    }

    hideLoader() {
      const loader = document.querySelector('.loading-circle');
      const structure = document.querySelector('[data-structure="1"]');
      loader?.remove();
      structure?.classList.remove('hidden');
    }

    flyTo(locationName, type, bbox = null, zoom = null, coordinates = null) {
      if (coordinates) {
        const [lng, lat] = coordinates; // Fixed: coordinates are stored as [lng, lat]
        const zoomLevel = zoom || CONFIG.zoom[type] || 13;
        this.map.flyTo({
          center: [lng, lat], // Mapbox expects [lng, lat] format
          zoom: zoomLevel,
          essential: true
        });
        return;
      }

      // Geocoding fallback
      const encodedLocation = encodeURIComponent(locationName);
      const bboxParam = bbox ? `&bbox=${bbox.join(',')}` : '';
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapboxgl.accessToken}&limit=1${bboxParam}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.features?.length) {
            const zoomLevel = zoom || CONFIG.zoom[type] || 13;
            this.map.flyTo({
              center: data.features[0].center,
              zoom: zoomLevel,
              essential: true
            });
          }
        })
        .catch(console.error);
    }

    navigateTo(screen, state = null, county = null, city = null, from = null) {
      this.currentScreen = { screen, state, county, city, from };
      this.showScreen(screen);
    }

    showScreen(targetScreen) {
      document.querySelectorAll('[data-screen]').forEach(screen => {
        const isTarget = screen.getAttribute('data-screen') === targetScreen;
        screen.classList.toggle('hidden', !isTarget);
        screen.classList.toggle('active', isTarget);
      });
    }

    showStates() {
      const stateLinks = document.querySelectorAll('.service-area_toggle-link[structure-1]');
      
      stateLinks.forEach(link => {
        const state = link.getAttribute('structure-1');
        link.setAttribute('data-location-type', 'state');
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const locationName = link.textContent.trim();
          const stateUpper = state.toUpperCase();
          
          this.flyTo(locationName, 'state', CONFIG.bounds[stateUpper], 7);
          this.navigateTo('county', stateUpper, null, null, 'state');
          this.showCounties(stateUpper);
        });
      });

      this.showScreen('state');
    }

    showCounties(state) {
      const counties = Utils.getUniqueValues(
        this.dataArr.filter(item => item.state === state), 
        'county'
      ).sort();

      this.updateBreadcrumb('county', 'state', Utils.formatStateName(state));
      this.renderLinks('county', counties, (county) => {
        this.flyTo(county, 'county', CONFIG.bounds[state]);
        this.navigateTo('city', state, county, null, 'county');
        this.showCities(county, state);
      });

      this.showScreen('county');
    }

    showCities(county, state) {
      const cities = Utils.getUniqueValues(
        this.dataArr.filter(item => item.county === county && item.state === state),
        'city'
      );

      this.updateBreadcrumb('city', 'state', Utils.formatStateName(state));
      this.updateBreadcrumb('city', 'county', county);
      
      this.renderLinks('city', this.sortCitiesIntoColumns(cities, 3), (city) => {
        const cityData = this.dataArr.find(item => 
          item.city === city.trim() && item.state === state.trim()
        );

        if (cityData?.coordinates) {
          this.flyTo(city, 'city', CONFIG.bounds[state], cityData.cityZoomLevel, cityData.coordinates);
        } else {
          this.flyTo(city, 'city', CONFIG.bounds[state]);
        }

        this.navigateTo('services', state, county, city, 'city');
        this.showServices(city, county, state);
      });

      this.showScreen('city');
    }

    showServices(city, county, state) {
      const cityData = this.dataArr.find(item => 
        item.city === city && item.county === county && item.state === state
      );

      if (!cityData) return;

      this.updateServicesBreadcrumb(city, county, state);
      this.renderServiceLinks(cityData.services, city);
      this.showScreen('services');
    }

    updateServicesBreadcrumb(city, county, state) {
      const breadcrumbWrap = document.querySelector('[data-screen="services"] .service-area_back-link-wrap');
      const stateName = Utils.formatStateName(state);
      
      breadcrumbWrap.innerHTML = `
        <div class="service-area_back-link-wrap">
          <a href="#" class="service-area_back-link w-inline-block">
            <h4 data-breadcrumb="state" class="service-area_top-link">${stateName}</h4>
          </a>
          <a href="#" class="service-area_back-link w-inline-block">
            <h4 class="service-area_top-link">/ <span data-breadcrumb="county">${county}</span></h4>
          </a>
          <a href="#" class="service-area_back-link w-inline-block">
            <h4 class="service-area_top-link is--active">/ <span data-breadcrumb="city">${city}</span></h4>
          </a>
        </div>`;

      this.attachBreadcrumbListeners('services');
    }

    renderServiceLinks(services, city) {
      const container = document.querySelector('[data-screen="services"] .service-area_links');
      container.innerHTML = '';

      Object.entries(services).forEach(([service, url]) => {
        if (!url) return;

        const serviceName = Utils.capitalizeService(service);
        const link = this.createServiceLink(url, `${serviceName} in ${city}`);
        container.appendChild(link);
      });
    }

    createServiceLink(url, text) {
      const link = document.createElement('a');
      link.href = `/${url}`;
      link.className = "service-area_toggle-link is--padding-small w-inline-block";

      const linkText = document.createElement('h3');
      linkText.className = "service-area_link-text-small";
      linkText.textContent = text;

      const arrow = document.createElement('div');
      arrow.className = "n-work_logo w-embed";
      arrow.innerHTML = `<svg width="18" height="16" viewBox="0 0 17 16" fill="none">
        <path d="M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z" fill="currentColor"/>
      </svg>`;

      link.append(linkText, arrow);
      return link;
    }

    updateBreadcrumb(screen, type, text) {
      const breadcrumb = document.querySelector(`[data-screen="${screen}"] [data-breadcrumb="${type}"]`);
      if (breadcrumb) breadcrumb.textContent = text;
    }

    renderLinks(screen, items, clickHandler) {
      const container = document.querySelector(`[data-screen="${screen}"] .service-area_links`);
      if (!container) return;
      
      container.innerHTML = '';

      items.forEach(item => {
        const link = this.createNavigationLink(item, clickHandler);
        container.appendChild(link);
      });

      this.attachBreadcrumbListeners(screen);
    }

    createNavigationLink(text, clickHandler) {
      const link = document.createElement('a');
      link.className = "service-area_toggle-link is--padding-small w-inline-block";
      link.href = 'javascript:void(0);';

      const linkText = document.createElement('h3');
      linkText.className = "service-area_link-text-small";
      linkText.textContent = text;

      const arrow = document.createElement('div');
      arrow.className = "n-work_logo w-embed";
      arrow.innerHTML = `<svg width="18" height="16" viewBox="0 0 17 16" fill="none">
        <path d="M9.53906 15.2891L8.13281 13.8984L13.0156 9.01562H0.75V6.98437H13.0156L8.13281 2.10938L9.53906 0.710937L16.8281 8L9.53906 15.2891Z" fill="currentColor"/>
      </svg>`;

      link.append(linkText, arrow);
      link.addEventListener('click', () => clickHandler(text));
      return link;
    }

    sortCitiesIntoColumns(cities, numColumns) {
      const sorted = [...cities].sort();
      const columns = Array.from({ length: numColumns }, () => []);
      const rows = Math.ceil(sorted.length / numColumns);
      
      sorted.forEach((city, i) => {
        const col = Math.floor(i / rows);
        columns[col].push(city);
      });

      const result = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < numColumns; col++) {
          if (columns[col]?.[row]) result.push(columns[col][row]);
        }
      }
      return result;
    }

    attachBreadcrumbListeners(screen) {
      const breadcrumbs = document.querySelectorAll(`[data-screen="${screen}"] .service-area_back-link`);
      breadcrumbs.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const type = link.querySelector('[data-breadcrumb]')?.getAttribute('data-breadcrumb');
          const name = link.textContent.replace('/', '').trim();
          this.handleBreadcrumbClick(type, name);
        });
      });
    }

    handleBreadcrumbClick(type, name) {
      const stateMap = {
        'North Carolina': 'NC',
        'South Carolina': 'SC'
      };
      const stateName = stateMap[name] || name;

      switch (type) {
        case 'state':
          this.flyTo(name, 'state', CONFIG.bounds[stateName]);
          this.navigateTo('county', stateName);
          this.showCounties(stateName);
          break;
        case 'county':
          this.flyTo(name, 'county', CONFIG.bounds[this.currentScreen.state], 10);
          this.navigateTo('city', this.currentScreen.state, name);
          this.showCities(name, this.currentScreen.state);
          break;
      }
    }

    attachEventListeners() {
      document.querySelectorAll('.service-area_back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleBackNavigation();
        });
      });
    }

    handleBackNavigation() {
      const { screen, state, county, from } = this.currentScreen;
      
      switch (screen) {
        case 'county':
          // Use North Carolina center coordinates: [lng, lat]
          this.flyTo(Utils.formatStateName(state), 'state', CONFIG.bounds[state], 6, [-79.0, 35.0]);
          this.navigateTo('state', state);
          break;
        case 'city':
          this.flyTo(Utils.formatStateName(state), 'state', CONFIG.bounds[state], 7);
          this.navigateTo('county', state);
          this.showCounties(state);
          break;
        case 'services':
          if (from === 'city') {
            this.flyTo(county, 'county', CONFIG.bounds[state]);
            this.navigateTo('city', state, county);
            this.showCities(county, state);
          } else {
            this.flyTo(Utils.formatStateName(state), 'state', CONFIG.bounds[state]);
            this.navigateTo('county', state);
            this.showCounties(state);
          }
          break;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CarolinaMap());
  } else {
    new CarolinaMap();
  }

  // Global window assignment for backward compatibility
  window.carolinaMap = new CarolinaMap();
})();
