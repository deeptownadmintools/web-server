# Web server

[![Build Status](https://www.travis-ci.org/deeptownadmintools/web-server.svg?branch=master)](https://www.travis-ci.org/deeptownadmintools/web-server)


## Running the server
1) To run this server, you will need access to a running [main server](https://github.com/deeptownadmintools/main-server), or this web server already connected to the already mentioned main server. Thus, you can either host your own main server, or connect to the one already running at [dtat.hampl.space](http://dtat.hampl.space/).
1) Create a [virtual environment](https://docs.python.org/3/library/venv.html) with Python>=3.7 (older versions should work without a problem, but it was not tested)
1) Add these lines at the end of the activation script:
    ```
    export FLASK_APP=webapp
    export FLASK_DEBUG=1
    ```
1) Enter into virtual environment
1) Install requirements `pip install -e .`
1) Create a file named "privateConfig.py" within the "webapp" directory, and insert url for the main server you would like to connect to, unless you want to use the default value in "defaultConfig.py":
    ```
    DTAT_HOST_URL = 'http://your.url/'
    ```
1) You are now all set and you can start the server with following command:
    ```
    flask run
    ```
    This server will be running on default Flask port 5000 and it will be accessible only from localhost, which you can change by using `--port=5002` and `--host=0.0.0.0`


## Contributing
1) If you want to contribute to the main repository please ensure, that your code is following the PEP8 convention. You can do that with the use of flake8 and autopep8, which you can install using `pip install -r dev-requirements.txt`, after activating your virtual environment.

## API
If you would like to use current API methods or just view them, you can do so [here](https://documenter.getpostman.com/view/5414817/S1LsXq6g).

## Bugs & Improvements
If you have found a bug, or you have an idea for new feature please create an issue here on github. You can also contact me using email: [dtat@hampl.space](mailto:dtat@hampl.space)