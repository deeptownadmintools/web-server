from webapp.api.web import webprint
from flask import render_template


@webprint.route('/donations', methods=['GET'])
def donations():
    return render_template('donations.html')
