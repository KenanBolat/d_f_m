import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SocketConsumers(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        print(text_data_json['message'])
        message = text_data_json['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))