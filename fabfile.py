from fabric.api import *
# needs fabric3 installed
# pip install fabric3


env.user = 'dtat'
env.hosts = ['dtat.hampl.space']

def pack():
    # build the package
    local('python setup.py sdist --formats=gztar', capture=False)

def deploy():
    # figure out the package name and version
    dist = local('python setup.py --fullname', capture=True).strip()
    filename = '%s.tar.gz' % dist

    # upload the package to the temporary folder on the server
    put('dist/%s' % filename, '/home/dtat/tmp/%s' % filename)

    # install the package in the application's virtualenv with pip
    sudo('/home/dtat/www/dtat_web_server/venv/bin/pip install /home/dtat/tmp/%s' % filename)

    # remove the uploaded package
    run('rm -r /home/dtat/tmp/%s' % filename)

    #restart supervisor's subprocess
    sudo('sudo supervisorctl restart dtat-web-server')