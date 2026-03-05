"""Configuration constants for Strapi Manager."""
import os

BACKUP_DIR = '/root/backups'
STRAPI_API_URL = 'https://cms.improveitmd.com/api'
STRAPI_BASE_URL = 'https://cms.improveitmd.com'
STRAPI_API_TOKEN = os.environ.get('STRAPI_API_TOKEN', '')
PROD_SCHEMA_BASE = '/opt/strapi-build/strapi/src/api'
GIT_SCHEMA_BASE = '/root/capitol/strapi/src/api'
DASHBOARD_USERNAME = os.environ.get('BACKUP_DASH_USERNAME', 'admin')
DASHBOARD_PASSWORD = os.environ.get('BACKUP_DASH_PASSWORD', 'admin')
AUTH_TOKEN_NAME = 'backup_auth_token'
STRAPI_CONTAINER = 'strapi-prod'
DB_CONTAINER = 'strapi-db-prod'
DB_USER = 'strapi'
DB_NAME = 'strapi'
DOCKER_COMPOSE_DIR = '/opt/strapi-build/strapi'

SAFE_TYPE_TRANSITIONS = {
    'string': ['text'],
    'text': ['string'],
    'integer': ['float', 'decimal'],
    'float': ['decimal'],
}

FIELD_TYPE_CHOICES = [
    ('string', 'Short text'), ('text', 'Long text'),
    ('richtext', 'Rich text (CKEditor)'), ('integer', 'Integer'),
    ('float', 'Float'), ('decimal', 'Decimal'), ('boolean', 'Boolean'),
    ('date', 'Date'), ('datetime', 'Date & Time'), ('email', 'Email'),
    ('uid', 'UID (slug)'), ('enumeration', 'Enumeration'),
    ('json', 'JSON'), ('media', 'Media'),
]
