"""Register all route blueprints."""
from .backups import backups_bp
from .collections import collections_bp
from .data import data_bp
from .csv_io import csv_bp
from .schema import schema_bp
from .deploy import deploy_bp
from .api import api_bp

all_blueprints = [backups_bp, collections_bp, data_bp, csv_bp, schema_bp, deploy_bp, api_bp]
