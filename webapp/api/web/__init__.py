from flask import Blueprint


webprint = Blueprint('web', __name__)


from webapp.api.web.others import bot  # noqa E402
from webapp.api.web.others import about  # noqa E402
from webapp.api.web.donations import donations  # noqa E402
from webapp.api.web.guilds import guild  # noqa E402
from webapp.api.web.guilds import guilds  # noqa E402
from webapp.api.web.home import home  # noqa E402


__all__ = [
    'webprint',
    'home',
    'guilds',
    'guild',
    'donations',
    'about',
    'bot',
]
