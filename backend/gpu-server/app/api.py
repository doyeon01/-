from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from models.modelInit import initModels
from models.photoCardGenerator import generatePhotoCard
from models.s3_utils import upload_to_s3

logging.basicConfig(level=logging.INFO)

app = FastAPI()
 
imageCaptioningProcessor, \
imageCaptioningModel, \
zeroShotObjectDetectionProcessor, \
zeroShotObjectDetectionModel, \
pix2pixPipe = initModels()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

generate_photocard_endpoint = APIRouter()
api_test_endpoint = APIRouter()

@generate_photocard_endpoint.post("/api/v1/gpu/generate")
async def generate_photocard_route(request: Request):
    data = await request.json()
    user_id = data.get("userId")
    feed_id = data.get("feedId")
    feed_image_url = data.get("feedImageUrl")
    total_plan_id = data.get("totalPlanId")

    local_image_path = generatePhotoCard(imageCaptioningProcessor,
                                   imageCaptioningModel,
                                   zeroShotObjectDetectionProcessor,
                                   zeroShotObjectDetectionModel,
                                   pix2pixPipe,
                                   feed_image_url,
                                   str(user_id),
                                   str(feed_id),
                                   str(total_plan_id))
    
    s3_path = upload_to_s3(local_image_path)
    # image_path = generate_photocard(str(user_id), str(feed_id), thumbnail_url)
    return {"photoCardUrl": s3_path}

# @api_test_endpoint.post("/test")
# async def api_test_route(request: Request):
#     data = await request.json()
#     thumbnailUrl = data.get("thumbnailUrl")
#     print(thumbnailUrl)
#     return {"result": thumbnailUrl}

# app.include_router(api_test_endpoint)
app.include_router(generate_photocard_endpoint)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=7777, reload=True)