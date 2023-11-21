import uvicorn
from deepface import DeepFace
from fastapi import FastAPI, File, UploadFile
from prediction import read_image, preprocess
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=['*']
    )


@app.get('/index')
def hellow_world(name: str):
    return f"Hello {name}!"


@app.post("/images")
async def images(img1: UploadFile = File(...), img2: UploadFile = File(...)):
    # **do something**
    imgRead1 = read_image(await img1.read())
    imgRead2 = read_image(await img2.read())
    preprocess1 = preprocess(imgRead1)
    preprocess2 = preprocess(imgRead2)
    # predictions= DeepFace.analyze(preprocess1)
    # predictions= DeepFace.analyze(preprocess2)
    # model_name = 'Facenet'
    model_name = 'VGG-Face'

    result = DeepFace.verify(img1_path=preprocess1, img2_path=preprocess2, model_name=model_name)

    return result


#
#
# @app.post('/api/predict')
# async def image_filter(file: UploadFile = File(...)):
#   # img1_path = file.read()
#         img = read_image(await file.read())
#         img = preprocess(img)
#         img1= DeepFace.detectFace(img)
#         model_name = 'Facenet'
#         # result= DeepFace.verify(img1_path = img, img2_path = img, model_name = model_name)
#         model_name = 'Facenet'
#
#         result= DeepFace.analyze(img1 , enforce_detection=False)
#         print(result)

if __name__ == '__main__':
    uvicorn.run(app, port=8090, host='0.0.0.0')
