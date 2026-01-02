const whatsappStyle = {
    webhookUrl: 'https://n8n.mughal.pro/webhook/8179341e-a02e-4dcb-9ad7-7cb3fe42ffef/chat',
    botName: 'Support Team',
    botAvatar: 'https://cdn.prod.website-files.com/64bd6cb099271195afd55550/65ce1ef3fc1ed732ff31cb3f_Screenshot%202024-02-15%20at%2019.25.38.webp',
    primaryColor: '#075e54',      // WhatsApp dark green
    secondaryColor: '#f1f3f4',
    userColor: '#dcf8c6',         // WhatsApp light green
    botColor: '#ffffff',
    quickActions: [
        { id: 'help', label: 'Help', icon: '❓', instruction: 'I need urgent help' },
        { id: 'status', label: 'Book an inspection', icon: '📦', instruction: 'I want to book an inspection' },
        { id: 'contact', label: 'Talk to Human', icon: '📞', instruction: 'I want to contact support' }
    ]
};

// Initialize the chat widget
ChatWidget.init(whatsappStyle);