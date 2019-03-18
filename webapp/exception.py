class DTATException(Exception):
    """
    Master exception
    """

    def __init__(self, errorCode, message):
        self.errorCode = errorCode
        self.message = message
