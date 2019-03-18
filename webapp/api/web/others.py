from webapp.api.web import webprint
from flask import render_template


@webprint.route('/about', methods=['GET'])
def about():
    return render_template('about.html')


@webprint.route('/bot', methods=['GET'])
def bot():
    return render_template('bot.html')
