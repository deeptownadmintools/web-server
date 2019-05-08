from webapp.api.data import dataprint
from webapp import app
import requests
from webapp.exception import DTATException


@dataprint.route('/times/<int:id>', methods=['GET'])
@dataprint.route('/guild/id/<int:id>/times', methods=['GET'])
def times(id):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/guild/id/' + str(id) + '/times')
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/donc/<int:id>', methods=['GET'])
@dataprint.route('/donations/current/guild/id/<int:id>', methods=['GET'])
def donc(id):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/donations/current/guild/id/' + str(id))
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/don/<int:id1>/<int:id2>', methods=['GET'])
@dataprint.route('/donations/difference/guild/id/<int:id1>/time/id/<int:id2>',
                 methods=['GET'])
def don(id1, id2):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/donations/difference/guild/id/' +
                     str(id1) + '/time/id/' + str(id2))
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/dond/<int:id1>/<int:id2>', methods=['GET'])
@dataprint.route('/donations/difference/time/id/<int:id1>/time/id/<int:id2>',
                 methods=['GET'])
def dond(id1, id2):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/donations/difference/time/id/' + str(id1) +
                     '/time/id/' + str(id2))
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content


@dataprint.route('/dons/<int:id>', methods=['GET'])
@dataprint.route('/donations/specified/time/id/<int:id>', methods=['GET'])
def dons(id):
    r = requests.get(app.config['DTAT_HOST_URL'] + '/data' +
                     '/donations/specified/time/id/' + str(id))
    if (r.status_code != 200):
        raise DTATException(r.status_code, r.content)
    return r.content
