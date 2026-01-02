/**
 * BRANDING CONFIGURATION EXAMPLES
 * ================================
 * Different configuration examples for various branding needs
 */

// ============================================
// EXAMPLE 1: Classic WhatsApp Style
// ============================================
const whatsappStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Support Team',
    botAvatar: 'https://your-domain.com/images/support-avatar.png',
    primaryColor: '#075e54',      // WhatsApp dark green
    secondaryColor: '#f1f3f4',
    userColor: '#dcf8c6',         // WhatsApp light green
    botColor: '#ffffff',
    quickActions: [
        { id: 'help', label: 'Help', icon: '❓', instruction: 'I need help' },
        { id: 'status', label: 'Order Status', icon: '📦', instruction: 'Check my order status' },
        { id: 'contact', label: 'Contact Us', icon: '📞', instruction: 'I want to contact support' }
    ]
};

// ============================================
// EXAMPLE 2: Corporate Blue Theme
// ============================================
const corporateBlue = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Business Assistant',
    botAvatar: 'https://your-domain.com/images/corporate-avatar.png',
    primaryColor: '#00203b',      // Navy blue
    secondaryColor: '#e6eff4',
    userColor: '#deeaff',         // Light blue
    botColor: '#ffffff',
    quickActions: [
        { id: 'quote', label: 'Get Quote', icon: '💰', instruction: 'I need a business quote' },
        { id: 'meeting', label: 'Schedule Meeting', icon: '📅', instruction: 'Schedule a consultation' },
        { id: 'demo', label: 'Request Demo', icon: '🖥️', instruction: 'I want to see a product demo' }
    ]
};

// ============================================
// EXAMPLE 3: Same Color Different Opacity
// ============================================
const sameColorStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'AI Helper',
    botAvatar: 'https://your-domain.com/images/ai-avatar.png',
    primaryColor: '#007bff',
    sameColorBubbles: true,       // Enable same color mode
    quickActions: [
        { id: 'start', label: 'Get Started', icon: '🚀', instruction: 'Help me get started' },
        { id: 'learn', label: 'Learn More', icon: '📚', instruction: 'Tell me more about your services' },
        { id: 'pricing', label: 'Pricing', icon: '💵', instruction: 'Show me pricing information' }
    ]
};

// ============================================
// EXAMPLE 4: Modern Gradient Style
// ============================================
const modernGradient = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Creative Assistant',
    botAvatar: 'https://your-domain.com/images/creative-avatar.png',
    primaryColor: '#a700e1',      // Purple
    secondaryColor: '#f3f4f5',
    userColor: '#deeaff',
    botColor: '#ffffff',
    quickActions: [
        { id: 'design', label: 'Design Help', icon: '🎨', instruction: 'I need help with design' },
        { id: 'portfolio', label: 'View Portfolio', icon: '🖼️', instruction: 'Show me your portfolio' },
        { id: 'hire', label: 'Hire Us', icon: '🤝', instruction: 'I want to hire your team' }
    ]
};

// ============================================
// EXAMPLE 5: E-commerce Style
// ============================================
const ecommerceStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Shopping Assistant',
    botAvatar: 'https://your-domain.com/images/shop-avatar.png',
    primaryColor: '#e15100',      // Orange
    secondaryColor: '#f4f6f7',
    userColor: '#deeaff',
    botColor: '#ffffff',
    quickActions: [
        { id: 'products', label: 'Browse Products', icon: '🛍️', instruction: 'Show me your products' },
        { id: 'order', label: 'Track Order', icon: '📦', instruction: 'I want to track my order' },
        { id: 'return', label: 'Return Item', icon: '↩️', instruction: 'I need to return an item' }
    ]
};

// ============================================
// EXAMPLE 6: Healthcare Style
// ============================================
const healthcareStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Health Assistant',
    botAvatar: 'https://your-domain.com/images/health-avatar.png',
    primaryColor: '#009c6d',      // Medical green
    secondaryColor: '#e6f4e6',
    userColor: '#e6f4e6',
    botColor: '#ffffff',
    quickActions: [
        { id: 'appointment', label: 'Book Appointment', icon: '🏥', instruction: 'I want to book an appointment' },
        { id: 'records', label: 'Medical Records', icon: '📋', instruction: 'Access my medical records' },
        { id: 'emergency', label: 'Emergency', icon: '🚨', instruction: 'This is an emergency' }
    ]
};

// ============================================
// EXAMPLE 7: Real Estate Style (Capitol Use Case)
// ============================================
const realEstateStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Capitol Property Assistant',
    botAvatar: 'https://your-domain.com/images/capitol-logo.png',
    primaryColor: '#00203b',      // Capitol blue
    secondaryColor: '#f4f6f7',
    userColor: '#dcf8c6',
    botColor: '#ffffff',
    quickActions: [
        {
            id: 'quote',
            label: 'Get a Quote',
            icon: '💰',
            instruction: 'I need a quote for roofing work. Please help me understand pricing and collect information about my property including address, roof size, and current condition.'
        },
        {
            id: 'inspection',
            label: 'Schedule Inspection',
            icon: '🔍',
            instruction: 'I would like to schedule a roof inspection. Please help me find available appointment times and collect my contact information and property address.'
        },
        {
            id: 'agent',
            label: 'Talk to Agent',
            icon: '👤',
            instruction: 'I need to speak with a roofing specialist. Please connect me to an agent or collect my information for a callback with details about my roofing needs.'
        },
        {
            id: 'emergency',
            label: 'Emergency Service',
            icon: '🚨',
            instruction: 'I have a roofing emergency (leak, damage, etc.). Please prioritize my request and collect urgent contact information and details about the emergency.'
        }
    ],
    welcomeMessage: 'Welcome to Capitol Roofing! How can we help you today?'
};

// ============================================
// EXAMPLE 8: Minimal Style
// ============================================
const minimalStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Assistant',
    botAvatar: 'https://your-domain.com/images/minimal-avatar.png',
    primaryColor: '#333333',
    secondaryColor: '#f5f5f5',
    userColor: '#e0e0e0',
    botColor: '#ffffff',
    quickActions: [
        { id: 'info', label: 'Information', icon: 'ℹ️', instruction: 'Give me information' },
        { id: 'contact', label: 'Contact', icon: '✉️', instruction: 'Contact information' }
    ],
    welcomeMessage: 'Hello. How may I assist you?'
};

// ============================================
// EXAMPLE 9: Dark Mode Style
// ============================================
const darkModeStyle = {
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Night Assistant',
    botAvatar: 'https://your-domain.com/images/dark-avatar.png',
    primaryColor: '#1a1a1a',
    secondaryColor: '#2d2d2d',
    userColor: '#3d3d3d',
    botColor: '#252525',
    quickActions: [
        { id: 'help', label: 'Help', icon: '💡', instruction: 'I need help' },
        { id: 'settings', label: 'Settings', icon: '⚙️', instruction: 'Adjust settings' },
        { id: 'support', label: 'Support', icon: '🎧', instruction: 'Contact support' }
    ]
};

// ============================================
// USAGE EXAMPLE
// ============================================

// Simply pass one of these configurations to ChatWidget.init()
// ChatWidget.init(realEstateStyle);
// ChatWidget.init(corporateBlue);
// ChatWidget.init(whatsappStyle);

/**
 * HOW TO CUSTOMIZE QUICK ACTIONS FOR AI TOOLS
 * ============================================
 *
 * The 'instruction' field is what gets sent to the AI. Make it detailed
 * so the AI knows exactly what to do:
 *
 * GOOD INSTRUCTION:
 * "I need a quote for roofing work. Please collect my name, address,
 *  property size, and current roof condition. Use the quote calculator
 *  tool to provide an estimate."
 *
 * BAD INSTRUCTION:
 * "Get quote"
 *
 * The AI needs context to know:
 * 1. What information to collect
 * 2. Which tools to use
 * 3. What the user's intent is
 */

/**
 * PROFILE PICTURE TIPS
 * ====================
 *
 * Bot Avatar:
 * - Use your company logo or a friendly icon
 * - Recommended size: 200x200px
 * - Format: PNG with transparency or JPG
 * - Square image works best
 *
 * User Avatar:
 * - Set to null to use generic placeholder icon (👤)
 * - Or provide a default user avatar URL
 * - Most sites use a placeholder for anonymous users
 */

/**
 * COLOR PSYCHOLOGY FOR DIFFERENT INDUSTRIES
 * ==========================================
 *
 * Blue (#007bff, #00203b): Trust, professionalism
 *   - Good for: Corporate, Finance, Healthcare, Tech
 *
 * Green (#009c6d, #075e54): Growth, health, money
 *   - Good for: Healthcare, Environment, Finance
 *
 * Orange (#e15100): Energy, enthusiasm, action
 *   - Good for: E-commerce, Entertainment, Food
 *
 * Purple (#a700e1): Creativity, luxury
 *   - Good for: Creative agencies, Premium brands
 *
 * Red (#bf0600): Urgency, importance
 *   - Good for: Emergency services, Sales, Alerts
 */

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        whatsappStyle,
        corporateBlue,
        sameColorStyle,
        modernGradient,
        ecommerceStyle,
        healthcareStyle,
        realEstateStyle,
        minimalStyle,
        darkModeStyle
    };
}
