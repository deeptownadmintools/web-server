from flask import Blueprint
from webapp.exception import DTATException


dataprint = Blueprint('data', __name__, url_prefix='/data')


from webapp.api.data.donations import dons  # noqa E402
from webapp.api.data.donations import dond  # noqa E402
from webapp.api.data.donations import donc  # noqa E402
from webapp.api.data.donations import don  # noqa E402
from webapp.api.data.donations import times  # noqa E402
from webapp.api.data.guilds import guildData  # noqa E402
from webapp.api.data.guilds import guildsUpdate  # noqa E402
from webapp.api.data.guilds import guilds  # noqa E402


@dataprint.errorhandler(DTATException)
def __response_err(data):
    return data.message, data.errorCode


__all__ = [
    'dataprint',
    'guilds',
    'guildsUpdate',
    'guildData',
    'times',
    'don',
    'donc',
    'dond',
    'dons',
]
