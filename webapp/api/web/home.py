from webapp.api.web import webprint
from flask import render_template


@webprint.route('/', methods=['GET'])
def home():
    return render_template('index.html')
