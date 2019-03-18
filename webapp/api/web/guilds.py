from webapp.api.web import webprint
from flask import render_template


@webprint.route('/guilds', methods=['GET'])
def guilds():
    return render_template('guilds.html')


@webprint.route('/guild', methods=['GET'])
def guild():
    return render_template('guild.html')
