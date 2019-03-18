from webapp.api.web.others import bot
from webapp.api.web.others import about
from webapp.api.web.donations import donations
from webapp.api.web.guilds import guild
from webapp.api.web.guilds import guilds
from webapp.api.web.home import home
from flask import Blueprint


webprint = Blueprint('web', __name__)


__all__ = [
    'webprint',
    'home',
    'guilds',
    'guild',
    'donations',
    'about',
    'bot',
]
