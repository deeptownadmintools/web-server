from webapp.api.data import dataprint
from webapp import app
import requests
from webapp.exception import DTATException


@dataprint.route('/guilds/<string:name>', methods=['GET'])
@dataprint.route('/guilds', defaults={'name': ""}, methods=['GET'])
@dataprint.route('/guild/name/<string:name>', methods=['GET'])
@dataprint.route('/guild/name', defaults={'name': ""}, methods=['GET'])
def guilds(name):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/guild/name/' + name)
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/guilds/update/<string:name>', methods=['GET, PATCH'])
@dataprint.route('/update/name/<string:name>', methods=['GET, PATCH'])
def guildsUpdate(name):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/update/name/' + name)
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/guild/<int:id>', methods=['GET'])
@dataprint.route('/guild/id/<int:id>/data', methods=['GET'])
def guildData(id):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/guild/id/' + str(id) + '/data')
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content
