// Configuration
const CONFIG = {
    mapboxToken: 'pk.eyJ1IjoiaW1wcm92ZWl0bWQiLCJhIjoiY2w1OXlhZ3BnMDAyMDNrcG9pdmU3OXNvcyJ9.8IKtnRJwbi7ss5MjeHGAkQ',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE', // Replace with your Google Maps API key
    n8nWebhookUrl: 'YOUR_N8N_WEBHOOK_URL_HERE' // Replace with your n8n webhook URL
};

// State
const state = {
    selectedAddress: null,
    selectedPackage: null,
    selectedPrice: null,
    coordinates: null
};

// DOM Elements
const addressInput = document.getElementById('addressInput');
const coordinatesInput = document.getElementById('coordinatesInput');
const coordinatesBtn = document.getElementById('coordinatesBtn');
const suggestionsDiv = document.getElementById('suggestions');
const streetViewSection = document.getElementById('streetViewSection');
const streetViewImage = document.getElementById('streetViewImage');
const selectedAddressP = document.getElementById('selectedAddress');
const packagesSection = document.getElementById('packagesSection');
const orderFormSection = document.getElementById('orderFormSection');
const packageCards = document.querySelectorAll('.package-card');
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');

// Summary elements
const summaryPackage = document.getElementById('summaryPackage');
const summaryPrice = document.getElementById('summaryPrice');
const summaryAddress = document.getElementById('summaryAddress');

// Debounce function for address input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mapbox Geocoding - Search for addresses
async function searchAddress(query) {
    if (!query || query.length < 3) {
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${CONFIG.mapboxToken}&types=address&limit=5&country=us`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            displaySuggestions(data.features);
        } else {
            suggestionsDiv.innerHTML = '<div class="suggestion-item no-results">No addresses found</div>';
            suggestionsDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        suggestionsDiv.innerHTML = '<div class="suggestion-item error">Error searching addresses</div>';
        suggestionsDiv.style.display = 'block';
    }
}

// Display address suggestions
function displaySuggestions(features) {
    suggestionsDiv.innerHTML = '';

    features.forEach(feature => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = feature.place_name;
        div.addEventListener('click', () => selectAddress(feature));
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = 'block';
}

// Select an address from suggestions
function selectAddress(feature) {
    state.selectedAddress = feature.place_name;
    state.coordinates = {
        lat: feature.center[1],
        lng: feature.center[0]
    };

    addressInput.value = feature.place_name;
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';

    loadStreetView();
}

// Load coordinates from direct input
function loadFromCoordinates() {
    const input = coordinatesInput.value.trim();

    if (!input) {
        alert('Please enter coordinates or a place ID');
        return;
    }

    // Check if it's coordinates (lat,lng format)
    const coordMatch = input.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);

    if (coordMatch) {
        state.coordinates = {
            lat: parseFloat(coordMatch[1]),
            lng: parseFloat(coordMatch[2])
        };
        state.selectedAddress = `${state.coordinates.lat}, ${state.coordinates.lng}`;

        // Reverse geocode to get address
        reverseGeocode(state.coordinates.lat, state.coordinates.lng);
    } else if (input.startsWith('place_id:')) {
        // Handle Google Place ID (would need Google Places API)
        alert('Place ID support requires Google Places API integration');
    } else {
        alert('Invalid format. Use: latitude,longitude (e.g., 34.2257,-77.9447)');
    }
}

// Reverse geocode coordinates to get address
async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${CONFIG.mapboxToken}&types=address`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            state.selectedAddress = data.features[0].place_name;
            addressInput.value = state.selectedAddress;
            loadStreetView();
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        loadStreetView(); // Still load street view with coordinates
    }
}

// Load Google Street View image
function loadStreetView() {
    if (!state.coordinates) {
        alert('No location selected');
        return;
    }

    // Google Street View Static API URL
    // Size: 600x400, FOV: 90 degrees, Pitch: 0 degrees
    const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${state.coordinates.lat},${state.coordinates.lng}&fov=90&pitch=0&key=${CONFIG.googleMapsApiKey}`;

    streetViewImage.src = streetViewUrl;
    selectedAddressP.textContent = state.selectedAddress;

    // Show street view section and packages
    streetViewSection.style.display = 'block';
    packagesSection.style.display = 'block';

    // Scroll to street view
    streetViewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Handle package selection
function selectPackage(card) {
    // Remove selected class from all cards
    packageCards.forEach(c => c.classList.remove('selected'));

    // Add selected class to clicked card
    card.classList.add('selected');

    // Update state
    state.selectedPackage = card.dataset.package;
    state.selectedPrice = card.dataset.price;

    // Update order summary
    summaryPackage.textContent = `${state.selectedPackage.charAt(0).toUpperCase() + state.selectedPackage.slice(1)} Protection`;
    summaryPrice.textContent = `$${state.selectedPrice}/year`;
    summaryAddress.textContent = state.selectedAddress;

    // Show order form
    orderFormSection.style.display = 'block';
    orderFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    if (!state.selectedPackage || !state.selectedAddress) {
        showError('Please select an address and package');
        return;
    }

    // Get form data
    const formData = new FormData(orderForm);
    const orderData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: state.selectedAddress,
        coordinates: state.coordinates,
        package: state.selectedPackage,
        price: state.selectedPrice,
        timestamp: new Date().toISOString()
    };

    // Show loading, hide error
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    submitBtn.disabled = true;

    try {
        // Send to n8n webhook
        const response = await fetch(CONFIG.n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Redirect to thank you page
            window.location.href = 'thankyou.html?package=' + state.selectedPackage + '&price=' + state.selectedPrice;
        } else {
            throw new Error('Failed to submit order');
        }
    } catch (error) {
        console.error('Submission error:', error);
        showError('Failed to submit order. Please try again or contact support.');
        submitBtn.disabled = false;
    } finally {
        loadingMessage.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Event Listeners
addressInput.addEventListener('input', debounce((e) => {
    searchAddress(e.target.value);
}, 300));

coordinatesBtn.addEventListener('click', loadFromCoordinates);

coordinatesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadFromCoordinates();
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!addressInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
        suggestionsDiv.style.display = 'none';
    }
});

// Package selection listeners
packageCards.forEach(card => {
    const selectBtn = card.querySelector('.select-btn');
    selectBtn.addEventListener('click', () => selectPackage(card));
});

// Form submission
orderForm.addEventListener('submit', handleSubmit);

// Initialize
console.log('Sales Landing Page Initialized');
console.log('⚠️ Remember to replace CONFIG values:');
console.log('  - googleMapsApiKey: Get from Google Cloud Console');
console.log('  - n8nWebhookUrl: Your n8n webhook endpoint');
