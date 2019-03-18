from flask import Flask


class DTAT(Flask):
    @staticmethod
    def create_app():
        """
        Application factory
        """

        app = DTAT(__name__)

        app.config.from_object("webapp.defaultConfig")
        try:
            app.config.from_object("webapp.privateConfig")
        except ImportError:
            pass

        return app

    def registerBlueprints(self):
        from webapp.api import webprint, dataprint
        app.register_blueprint(webprint)
        app.register_blueprint(dataprint)


app = DTAT.create_app()
app.registerBlueprints()

__all__ = [
    'app'
]
