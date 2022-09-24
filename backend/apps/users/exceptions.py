class PermissionDenied(Exception):
    def __init__(self, message=None):
        super().__init__("You do not have permission to perform this action")
