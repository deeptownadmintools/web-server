from webapp.api.data.donations import dons
from webapp.api.data.donations import dond
from webapp.api.data.donations import donc
from webapp.api.data.donations import don
from webapp.api.data.donations import times
from webapp.api.data.guilds import guildData
from webapp.api.data.guilds import guildsUpdate
from webapp.api.data.guilds import guilds
from flask import Blueprint
from webapp.exception import DTATException


dataprint = Blueprint('data', __name__, url_prefix='/data')


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
