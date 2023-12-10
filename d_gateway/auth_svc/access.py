import os
import requests


def login(request):
    auth = request.authorization
    if not auth:
        return None, ("missing credentials", 401)

    auth_data = {"email": auth.username, "password": auth.password}

    response = requests.post(
        f"http://{os.environ.get('AUTH_SVC_ADDRESS')}/api/user/token/", data=auth_data
    )

    if response.status_code == 200:
        return response.text, None
    else:
        return None, (response.text, response.status_code)
