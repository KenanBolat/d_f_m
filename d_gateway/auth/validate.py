import os
import requests


def token(request):


    response = requests.get(
        f"http://{os.environ.get('AUTH_SVC_ADDRESS')}/api/data",
        headers={"Authorization": f"Token {token}"},
    )

    if response.status_code == 200:
        return response.text, None
    else:
        return None, (response.text, response.status_code)
