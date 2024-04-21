from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import SocketConsumers as Consumers

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("ws/events/", Consumers.as_asgi()),
    ]),
})
