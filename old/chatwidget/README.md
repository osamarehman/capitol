# Custom Chat Widget

A fully customizable, WhatsApp-inspired chat widget with webhook integration, quick action buttons, and comprehensive branding options.

## Features

✨ **WhatsApp-Style Interface**
- Left-aligned bot messages with profile pictures
- Right-aligned user messages
- Smooth animations and transitions
- Typing indicators
- Message timestamps

🎨 **Fully Customizable Branding**
- Custom colors (primary, secondary, user bubbles, bot bubbles)
- Custom bot name and avatar
- Option for same-color bubbles with different opacity
- Responsive design

⚡ **Quick Action Buttons**
- Configurable quick action buttons
- Send predefined instructions to AI
- Customizable icons and labels
- Perfect for "Get a Quote", "Schedule Inspection", etc.

🔗 **Webhook Integration**
- Sends messages to your webhook URL
- Includes full chat history for context
- Session management
- Configurable payload format

📎 **File Upload Support**
- Multiple file uploads
- File size limits
- Preview before sending
- Can be disabled if not needed

## Installation

### Basic Setup

1. **Include the CSS files:**
```html
<link rel="stylesheet" href="branding.css">
<link rel="stylesheet" href="chat-widget.css">
```

2. **Add the widget HTML structure:**
```html
<div id="custom-chat-widget" class="chat-widget">
    <!-- Widget HTML from chat-widget.html -->
</div>
```

3. **Include the JavaScript:**
```html
<script src="chat-widget.js"></script>
```

4. **Initialize with your configuration:**
```javascript
ChatWidget.init({
    webhookUrl: 'https://your-webhook-url.com',
    botName: 'Your Bot Name',
    botAvatar: 'https://your-bot-image.png',
    primaryColor: '#007bff'
});
```

### Quick Integration

Use `example-integration.html` as a reference. Simply copy the widget HTML and scripts into your website.

## Configuration Options

### Required Settings

| Option | Type | Description |
|--------|------|-------------|
| `webhookUrl` | string | Your webhook endpoint URL (required) |

### Branding Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `botName` | string | 'Sarah' | Name displayed in the header |
| `botAvatar` | string | placeholder | URL to bot profile image |
| `userAvatar` | string | null | URL to user profile image (uses placeholder if null) |
| `primaryColor` | string | '#007bff' | Main brand color (header, buttons) |
| `secondaryColor` | string | '#f1f3f4' | Secondary color |
| `userColor` | string | '#dcf8c6' | User message bubble color |
| `botColor` | string | '#ffffff' | Bot message bubble color |
| `sameColorBubbles` | boolean | false | Use same color with different opacity |

### Quick Actions

```javascript
quickActions: [
    {
        id: 'unique-id',              // Unique identifier
        label: 'Button Label',         // Text shown on button
        icon: '💰',                    // Emoji or icon
        instruction: 'Full instruction text sent to AI'
    }
]
```

Example quick actions:

```javascript
quickActions: [
    {
        id: 'quote',
        label: 'Get a Quote',
        icon: '💰',
        instruction: 'I need a quote for my project. Please help me get pricing information and collect details needed for an accurate estimate.'
    },
    {
        id: 'inspection',
        label: 'Schedule Inspection',
        icon: '🔍',
        instruction: 'I would like to schedule an inspection. Please guide me through the process and help me find available appointment times.'
    },
    {
        id: 'agent',
        label: 'Talk to Agent',
        icon: '👤',
        instruction: 'I need to speak with a human agent. Please connect me to someone or collect my information for a callback.'
    }
]
```

### Other Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `welcomeMessage` | string | 'Hello! How can I help you today?' | Initial bot message |
| `enableFileUpload` | boolean | true | Enable/disable file uploads |
| `maxFileSize` | number | 10485760 | Max file size in bytes (default 10MB) |
| `messageFieldName` | string | 'chatInput' | Field name for user message in webhook payload (n8n compatibility) |
| `debug` | boolean | false | Enable console logging |

## Full Configuration Example

```javascript
ChatWidget.init({
    // Required
    webhookUrl: 'https://your-n8n-instance.com/webhook/chat',

    // Branding
    botName: 'Capitol Assistant',
    botAvatar: 'https://your-domain.com/images/bot.png',
    primaryColor: '#00203b',
    secondaryColor: '#f1f3f4',
    userColor: '#dcf8c6',
    botColor: '#ffffff',

    // Quick Actions
    quickActions: [
        {
            id: 'quote',
            label: 'Get a Quote',
            icon: '💰',
            instruction: 'I need a quote for my roofing project. Please help me understand the pricing.'
        },
        {
            id: 'inspection',
            label: 'Schedule Inspection',
            icon: '🔍',
            instruction: 'I would like to schedule a roof inspection.'
        },
        {
            id: 'agent',
            label: 'Talk to Agent',
            icon: '👤',
            instruction: 'I need to speak with a human agent.'
        }
    ],

    // Messages
    welcomeMessage: 'Hello! How can I help with your roofing needs today?',

    // Features
    enableFileUpload: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    debug: false
});
```

## Webhook Integration

### Request Format

The widget sends POST requests to your webhook with this structure:

```json
{
    "chatInput": "User's message text",
    "chatHistory": [
        {
            "role": "assistant",
            "content": "Bot message",
            "timestamp": "2025-01-01T12:00:00.000Z"
        },
        {
            "role": "user",
            "content": "User message",
            "timestamp": "2025-01-01T12:00:05.000Z"
        }
    ],
    "timestamp": "2025-01-01T12:00:05.000Z",
    "sessionId": "session_1234567890_abc123"
}
```

**Note:** By default, the user's message is sent in a field called `chatInput` (compatible with n8n chat triggers). You can customize this field name using the `messageFieldName` configuration option if your webhook expects a different field name like `message`, `prompt`, etc.

### Expected Response

Your webhook should return JSON in one of these formats:

```json
{
    "response": "Bot's response message"
}
```

Or:

```json
{
    "message": "Bot's response message"
}
```

Or:

```json
{
    "output": "Bot's response message"
}
```

## JavaScript API

### Methods

```javascript
// Open the chat widget
ChatWidget.open();

// Close the chat widget
ChatWidget.close();

// Send a message programmatically
ChatWidget.sendMessage('Hello from code!');

// Clear chat history
ChatWidget.clearHistory();

// Get chat history
const history = ChatWidget.getHistory();

// Update configuration
ChatWidget.updateConfig({
    primaryColor: '#ff0000',
    botName: 'New Name'
});
```

## Styling Customization

### CSS Variables

You can customize the widget appearance using CSS variables:

```css
:root {
    --chat-primary-color: #007bff;
    --chat-secondary-color: #f1f3f4;
    --chat-user-bubble: #dcf8c6;
    --chat-bot-bubble: #ffffff;
    --chat-text-color: #333333;
    --chat-border-color: #e0e0e0;
    --chat-width: 380px;
    --chat-height: 600px;
    --chat-avatar-size: 32px;
    --chat-border-radius: 8px;
    --chat-bubble-radius: 12px;
}
```

### Same Color Bubbles

To use the same color for both user and bot bubbles with different opacity:

```javascript
ChatWidget.init({
    sameColorBubbles: true,
    primaryColor: '#007bff'
});
```

This will apply the primary color with:
- Bot bubbles: 15% opacity
- User bubbles: 30% opacity

## Advanced Usage

### Hosting on CDN

For easy client integration, host the files on a CDN:

```html
<!-- Include in client's website -->
<link rel="stylesheet" href="https://your-cdn.com/chat-widget.css">
<script src="https://your-cdn.com/chat-widget.js"></script>
<script>
    window.ChatWidgetConfig = {
        webhookUrl: 'https://webhook-url.com',
        botName: 'Assistant',
        primaryColor: '#007bff'
    };
</script>
```

### Multiple Widgets

You can initialize multiple widgets with different configurations:

```javascript
// Widget 1
const widget1 = ChatWidget.init({
    webhookUrl: 'https://webhook1.com',
    botName: 'Sales Bot'
});

// Widget 2
const widget2 = ChatWidget.init({
    webhookUrl: 'https://webhook2.com',
    botName: 'Support Bot'
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Files Structure

```
chatwidget/
├── branding.css              # Color variables
├── chat-widget.css           # Widget styles
├── chat-widget.js            # Widget functionality
├── chat-widget.html          # Full widget example
├── example-integration.html  # Integration example
└── README.md                # Documentation
```

## Tips & Best Practices

1. **Quick Actions**: Keep instruction text detailed but concise. The AI needs enough context to understand what tool to call.

2. **Colors**: Use high contrast between text and bubble colors for readability.

3. **Bot Avatar**: Use a square image (e.g., 200x200px) that represents your brand.

4. **Webhook**: Ensure your webhook returns responses quickly (< 5 seconds) for the best user experience.

5. **Testing**: Set `debug: true` during development to see console logs.

6. **Mobile**: Test on mobile devices - the widget is responsive and will go fullscreen on small screens.

## Support

For issues or questions, please refer to the documentation or contact your development team.

## License

This widget is provided for use in your client projects.
