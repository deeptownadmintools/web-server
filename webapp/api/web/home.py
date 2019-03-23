from webapp.api.web import webprint
from flask import render_template
from webapp import app


@webprint.route('/', methods=['GET'])
def home():
    return render_template('index.html')
