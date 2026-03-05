"""Shared layout template and render_page helper."""
from flask import render_template_string

LAYOUT_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - Strapi Manager</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .diff-add { color: #4ade80; background: rgba(74,222,128,0.1); }
        .diff-del { color: #f87171; background: rgba(248,113,113,0.1); }
        .diff-hdr { color: #60a5fa; }
    </style>
</head>
<body class="bg-slate-900 min-h-screen">
    {% set tabs = [('backups','Backups'),('collections','Collections'),('data','Data'),('csv','CSV'),('schema','Schema'),('deploy','Deploy')] %}
    <nav class="bg-slate-800 border-b border-slate-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-6">
                    <a href="/backups" class="text-xl font-bold text-white hover:text-blue-400 transition-colors">Strapi Manager</a>
                    <div class="hidden md:flex space-x-1">
                        {% for key, label in tabs %}
                        <a href="/{{ key }}" class="px-3 py-2 rounded-md text-sm font-medium transition-colors {{ 'bg-blue-600 text-white' if active_tab == key else 'text-slate-300 hover:bg-slate-700 hover:text-white' }}">{{ label }}</a>
                        {% endfor %}
                    </div>
                </div>
                <a href="/logout" class="text-slate-400 hover:text-white text-sm transition-colors">Logout</a>
            </div>
            <div class="md:hidden pb-3 flex flex-wrap gap-1">
                {% for key, label in tabs %}
                <a href="/{{ key }}" class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors {{ 'bg-blue-600 text-white' if active_tab == key else 'text-slate-300 hover:bg-slate-700' }}">{{ label }}</a>
                {% endfor %}
            </div>
        </div>
    </nav>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {{ content|safe }}
    </div>
</body>
</html>'''

LOGIN_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strapi Manager - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center">
    <div class="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white">Strapi Manager</h1>
            <p class="text-slate-400 mt-2">backup.improveitmd.com</p>
        </div>
        {% if error %}
        <div class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">{{ error }}</div>
        {% endif %}
        <form method="POST" action="/login">
            <div class="mb-4">
                <label class="block text-slate-300 text-sm font-medium mb-2" for="username">Username</label>
                <input type="text" id="username" name="username" required autofocus
                    class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div class="mb-6">
                <label class="block text-slate-300 text-sm font-medium mb-2" for="password">Password</label>
                <input type="password" id="password" name="password" required
                    class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800">
                Sign In
            </button>
        </form>
    </div>
</body>
</html>'''

ERROR_TEMPLATE = '''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Error - Strapi Manager</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center">
<div class="bg-slate-800 p-8 rounded-xl shadow-2xl max-w-lg border border-slate-700">
<h1 class="text-xl font-bold text-red-400 mb-4">Error</h1>
<p class="text-slate-300 mb-6">{{ message }}</p>
<a href="/backups" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Back to Dashboard</a>
</div></body></html>'''


def render_page(title, content, active_tab='backups'):
    return render_template_string(LAYOUT_TEMPLATE, title=title, content=content, active_tab=active_tab)
