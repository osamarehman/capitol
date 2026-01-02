/**
 * Custom Chat Widget with Webhook Integration
 * Configurable chat widget with WhatsApp-style UI
 */

const ChatWidget = (function() {
    'use strict';

    // Default configuration
    const defaultConfig = {
        webhookUrl: '',
        botName: 'Sarah',
        botAvatar: 'https://via.placeholder.com/40/007bff/ffffff?text=AI',
        userAvatar: null, // Will use placeholder icon
        primaryColor: '#007bff',
        secondaryColor: '#f1f3f4',
        userColor: '#dcf8c6',
        botColor: '#ffffff',
        sameColorBubbles: false, // Set to true to use same color with different opacity
        quickActions: [
            {
                id: 'quote',
                label: 'Get a Quote',
                icon: '💰',
                instruction: 'I need a quote for my project.'
            },
            {
                id: 'inspection',
                label: 'Schedule Inspection',
                icon: '🔍',
                instruction: 'I would like to schedule an inspection.'
            },
            {
                id: 'agent',
                label: 'Talk to Agent',
                icon: '👤',
                instruction: 'I need to speak with an agent.'
            }
        ],
        welcomeMessage: 'Hello! How can I help you today?',
        enableFileUpload: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        messageFieldName: 'chatInput', // Field name for user message in webhook payload (n8n uses 'chatInput')
        debug: false
    };

    let config = {};
    let chatHistory = [];
    let isOpen = false;
    let selectedFiles = [];

    // DOM Elements
    let elements = {};

    /**
     * Initialize the chat widget
     */
    function init(userConfig) {
        config = { ...defaultConfig, ...userConfig };

        if (config.debug) {
            console.log('Chat Widget Config:', config);
        }

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initWidget);
        } else {
            initWidget();
        }
    }

    /**
     * Initialize widget after DOM is ready
     */
    function initWidget() {
        cacheElements();
        applyBranding();
        setupEventListeners();
        setupQuickActions();
        initializeWelcomeMessage();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            widget: document.getElementById('custom-chat-widget'),
            toggleBtn: document.getElementById('chatToggle'),
            window: document.getElementById('chatWindow'),
            minimizeBtn: document.getElementById('minimizeBtn'),
            messagesContainer: document.getElementById('messagesContainer'),
            messageInput: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendBtn'),
            attachBtn: document.getElementById('attachBtn'),
            fileInput: document.getElementById('fileInput'),
            filePreview: document.getElementById('filePreview'),
            typingIndicator: document.getElementById('typingIndicator'),
            quickActionsContainer: document.getElementById('quickActions'),
            botName: document.getElementById('botName'),
            botAvatar: document.getElementById('botAvatar'),
            welcomeBotAvatar: document.getElementById('welcomeBotAvatar'),
            typingBotAvatar: document.getElementById('typingBotAvatar')
        };
    }

    /**
     * Apply custom branding
     */
    function applyBranding() {
        // Set CSS variables
        document.documentElement.style.setProperty('--chat-primary-color', config.primaryColor);
        document.documentElement.style.setProperty('--chat-secondary-color', config.secondaryColor);
        document.documentElement.style.setProperty('--chat-user-bubble', config.userColor);
        document.documentElement.style.setProperty('--chat-bot-bubble', config.botColor);

        // Set bot name and avatar
        elements.botName.textContent = config.botName;
        elements.botAvatar.src = config.botAvatar;
        elements.welcomeBotAvatar.src = config.botAvatar;
        elements.typingBotAvatar.src = config.botAvatar;

        // Apply same color style if enabled
        if (config.sameColorBubbles) {
            elements.widget.classList.add('chat-widget--same-color');
        }

        // Hide file upload if disabled
        if (!config.enableFileUpload) {
            elements.attachBtn.style.display = 'none';
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Toggle chat window
        elements.toggleBtn.addEventListener('click', toggleChat);
        elements.minimizeBtn.addEventListener('click', toggleChat);

        // Send message
        elements.sendBtn.addEventListener('click', handleSendMessage);
        elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });

        // Auto-resize textarea
        elements.messageInput.addEventListener('input', autoResizeTextarea);

        // File upload
        elements.attachBtn.addEventListener('click', () => {
            elements.fileInput.click();
        });

        elements.fileInput.addEventListener('change', handleFileSelect);
    }

    /**
     * Setup quick action buttons
     */
    function setupQuickActions() {
        elements.quickActionsContainer.innerHTML = '';

        config.quickActions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.dataset.action = action.id;
            btn.innerHTML = `
                <span class="quick-action-icon">${action.icon}</span>
                <span class="quick-action-text">${action.label}</span>
            `;
            btn.addEventListener('click', () => handleQuickAction(action));
            elements.quickActionsContainer.appendChild(btn);
        });
    }

    /**
     * Initialize welcome message
     */
    function initializeWelcomeMessage() {
        const welcomeMsg = {
            role: 'assistant',
            content: config.welcomeMessage,
            timestamp: new Date()
        };
        chatHistory.push(welcomeMsg);
        updateMessageTime();
    }

    /**
     * Toggle chat window
     */
    function toggleChat() {
        isOpen = !isOpen;
        elements.widget.classList.toggle('chat-widget--open', isOpen);

        if (isOpen) {
            elements.messageInput.focus();
            scrollToBottom();
        }
    }

    /**
     * Handle quick action button click
     */
    function handleQuickAction(action) {
        if (config.debug) {
            console.log('Quick action clicked:', action);
        }

        // Add user message with the quick action
        addMessage('user', action.instruction);

        // Send to webhook
        sendToWebhook(action.instruction);
    }

    /**
     * Handle send message
     */
    function handleSendMessage() {
        const message = elements.messageInput.value.trim();

        if (!message && selectedFiles.length === 0) {
            return;
        }

        if (message) {
            addMessage('user', message);
            sendToWebhook(message);
        }

        // Clear input
        elements.messageInput.value = '';
        elements.messageInput.style.height = 'auto';
        selectedFiles = [];
        elements.filePreview.style.display = 'none';
        elements.filePreview.innerHTML = '';
    }

    /**
     * Add message to chat
     */
    function addMessage(role, content, showTyping = true) {
        const message = {
            role: role,
            content: content,
            timestamp: new Date()
        };

        chatHistory.push(message);

        const messageEl = createMessageElement(message);
        elements.messagesContainer.appendChild(messageEl);

        scrollToBottom();

        // Show typing indicator for bot response
        if (role === 'user' && showTyping) {
            showTypingIndicator();
        }
    }

    /**
     * Parse markdown to HTML (secure, XSS-safe)
     */
    function parseMarkdown(text) {
        // First, escape HTML to prevent XSS
        const escapeHtml = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        let html = escapeHtml(text);

        // Convert markdown to HTML
        // Bold: **text** or __text__
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic: *text* or _text_ (but not within words)
        html = html.replace(/\*([^\s*][^*]*?)\*/g, '<em>$1</em>');
        html = html.replace(/\b_([^\s_][^_]*?)_\b/g, '<em>$1</em>');

        // Inline code: `code`
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // Links: [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Line breaks: convert \n to <br>
        html = html.replace(/\n/g, '<br>');

        return html;
    }

    /**
     * Create message element
     */
    function createMessageElement(message) {
        const div = document.createElement('div');
        div.className = `chat-message chat-message--${message.role === 'user' ? 'user' : 'bot'}`;

        const avatar = document.createElement('img');
        avatar.className = 'chat-message__avatar';
        avatar.alt = message.role === 'user' ? 'User' : 'Bot';

        if (message.role === 'user') {
            if (config.userAvatar) {
                avatar.src = config.userAvatar;
            } else {
                // Use placeholder
                avatar.style.display = 'none';
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'chat-message__avatar';
                div.appendChild(placeholderDiv);
            }
        } else {
            avatar.src = config.botAvatar;
        }

        if (avatar.style.display !== 'none') {
            div.appendChild(avatar);
        }

        const content = document.createElement('div');
        content.className = 'chat-message__content';

        const bubble = document.createElement('div');
        bubble.className = 'chat-message__bubble';

        const text = document.createElement('p');
        text.className = 'chat-message__text';

        // Use markdown for bot messages, plain text for user messages (security)
        if (message.role === 'assistant' || message.role === 'bot') {
            text.innerHTML = parseMarkdown(message.content);
        } else {
            text.textContent = message.content;
        }

        const time = document.createElement('span');
        time.className = 'chat-message__time';
        time.textContent = formatTime(message.timestamp);

        bubble.appendChild(text);
        bubble.appendChild(time);
        content.appendChild(bubble);
        div.appendChild(content);

        return div;
    }

    /**
     * Send message to webhook
     */
    async function sendToWebhook(message) {
        if (!config.webhookUrl) {
            console.error('Webhook URL not configured');
            hideTypingIndicator();
            addMessage('assistant', 'Configuration error: Webhook URL not set.', false);
            return;
        }

        try {
            // Build payload with configurable message field name
            const payload = {
                [config.messageFieldName]: message,
                chatHistory: chatHistory,
                timestamp: new Date().toISOString(),
                sessionId: getSessionId()
            };

            if (config.debug) {
                console.log('Sending to webhook:', payload);
            }

            const response = await fetch(config.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (config.debug) {
                console.log('Webhook response:', data);
            }

            hideTypingIndicator();

            // Handle response
            const botMessage = data.response || data.message || data.output || 'I received your message.';
            addMessage('assistant', botMessage, false);

        } catch (error) {
            console.error('Error sending to webhook:', error);
            hideTypingIndicator();
            addMessage('assistant', 'Sorry, I encountered an error. Please try again.', false);
        }
    }

    /**
     * Show typing indicator
     */
    function showTypingIndicator() {
        elements.typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    function hideTypingIndicator() {
        elements.typingIndicator.style.display = 'none';
    }

    /**
     * Handle file selection
     */
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            if (file.size > config.maxFileSize) {
                alert(`File ${file.name} is too large. Maximum size is ${config.maxFileSize / 1024 / 1024}MB`);
                return;
            }
            selectedFiles.push(file);
        });

        updateFilePreview();
        e.target.value = '';
    }

    /**
     * Update file preview
     */
    function updateFilePreview() {
        if (selectedFiles.length === 0) {
            elements.filePreview.style.display = 'none';
            return;
        }

        elements.filePreview.style.display = 'block';
        elements.filePreview.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-preview-item';
            item.innerHTML = `
                <span>📎 ${file.name}</span>
                <button class="file-preview-remove" data-index="${index}">×</button>
            `;

            item.querySelector('.file-preview-remove').addEventListener('click', () => {
                selectedFiles.splice(index, 1);
                updateFilePreview();
            });

            elements.filePreview.appendChild(item);
        });
    }

    /**
     * Auto-resize textarea
     */
    function autoResizeTextarea() {
        elements.messageInput.style.height = 'auto';
        elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
    }

    /**
     * Scroll to bottom of messages
     */
    function scrollToBottom() {
        setTimeout(() => {
            elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
        }, 100);
    }

    /**
     * Format time
     */
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Update message times
     */
    function updateMessageTime() {
        const timeElements = document.querySelectorAll('.chat-message__time');
        timeElements.forEach((el, index) => {
            if (chatHistory[index]) {
                el.textContent = formatTime(chatHistory[index].timestamp);
            }
        });
    }

    /**
     * Get or create session ID
     */
    function getSessionId() {
        let sessionId = sessionStorage.getItem('chat-widget-session-id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('chat-widget-session-id', sessionId);
        }
        return sessionId;
    }

    /**
     * Public API
     */
    return {
        init: init,
        open: function() {
            if (!isOpen) toggleChat();
        },
        close: function() {
            if (isOpen) toggleChat();
        },
        sendMessage: function(message) {
            addMessage('user', message);
            sendToWebhook(message);
        },
        clearHistory: function() {
            chatHistory = [];
            elements.messagesContainer.innerHTML = '';
            initializeWelcomeMessage();
        },
        getHistory: function() {
            return chatHistory;
        },
        updateConfig: function(newConfig) {
            config = { ...config, ...newConfig };
            applyBranding();
        }
    };
})();

// Auto-initialize if window.ChatWidgetConfig is defined
if (typeof window !== 'undefined' && window.ChatWidgetConfig) {
    ChatWidget.init(window.ChatWidgetConfig);
}
