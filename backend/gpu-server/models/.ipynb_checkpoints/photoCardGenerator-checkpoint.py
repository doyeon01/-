import requests
from transformers import BlipProcessor, BlipForConditionalGeneration, OwlViTProcessor, OwlViTForObjectDetection
import os
import torch
from PIL import Image, ImageDraw


######################## 한개의 이미지 처리 ########################
def generatePhotoCard(
            imageCaptioningProcessor,
            imageCaptioningModel,
            zeroShotObjectDetectionProcessor,
            zeroShotObjectDetectionModel,
            pix2pixPipe,
            imgUrl,
            user_id,
            feed_id,
            total_plan_id) -> str: 

    # 이미지 다운로드 후 open
    raw_image = Image.open(requests.get(imgUrl, stream=True).raw).convert('RGB')
    

    
    # 조건부 이미지 캡셔닝
    conditionalText = "a main object"
    imageCaptioningInputs = imageCaptioningProcessor(raw_image,
                                                     conditionalText,
                                                     return_tensors="pt").to("cuda")

    imageCaptioningOutputs = imageCaptioningModel.generate(**imageCaptioningInputs)
    captions = [[imageCaptioningProcessor.decode(imageCaptioningOutputs[0], skip_special_tokens=True)]]
    
    print(captions)


    
    # zero-shot 객체 탐지
    zeroShotObjectDetectionInputs = zeroShotObjectDetectionProcessor(text=captions,
                                                                     images=raw_image,
                                                                     return_tensors="pt")
    
    zeroShotObjectDetectionOutputs = zeroShotObjectDetectionModel(**zeroShotObjectDetectionInputs)

    target_sizes = torch.Tensor([raw_image.size[::-1]])
    results = zeroShotObjectDetectionProcessor.post_process_object_detection(
                                                outputs=zeroShotObjectDetectionOutputs,
                                                threshold=0,
                                                target_sizes=target_sizes)

    i = 0
    caption = captions[i]
    boxes, scores, labels = results[i]["boxes"], results[i]["scores"], results[i]["labels"]


    
    # 가장 confidence가 높은 바운딩 박스 찾기
    max_score_index = torch.argmax(scores).item()
    max_box = [round(i, 2) for i in boxes[max_score_index].tolist()]
    max_score = round(scores[max_score_index].item(), 3)
    max_label = caption[labels[max_score_index]]
        
    print(f"Detected {max_label} with confidence {max_score} at location {max_box}")

    # # 가장 높은 confidence의 바운딩 박스를 이미지에 그리기
    # draw = ImageDraw.Draw(raw_image)
    # draw.rectangle(max_box, outline="red", width=3)


    
    # 바운딩 박스 영역만큼 이미지를 잘라내기
    left, top, right, bottom = max_box
    cropped_image = raw_image.crop((left, top, right, bottom))


    # stable diffusion으로 이미지 변환
    pix2pixPrompt = "Transform into gray monochrome line drawing"
    convertImages = pix2pixPipe(pix2pixPrompt,
                                image=cropped_image,
                                num_inference_steps=10,
                                image_guidance_scale=1).images
    
    local_image_path = "outputs/photocards/" + user_id + "_" + total_plan_id + "_" + feed_id + "_" + ".jpg"

    
    # 변환한 이미지 저장
    convertImages[0].save(local_image_path)
    print("Saved photocard: " + local_image_path)

    return local_image_path


######################## 여러개의 이미지 처리 ########################
def generatePhotoCards(
            imageCaptioningProcessor,
            imageCaptioningModel,
            zeroShotObjectDetectionProcessor,
            zeroShotObjectDetectionModel,
            pix2pixPipe,
            imgUrls):

    # Load all images from URLs
    raw_images = [Image.open(requests.get(url, stream=True).raw).convert('RGB') for url in imgUrls]

    # Conditional image captioning for all images
    conditionalText = "a main object"
    imageCaptioningInputs = imageCaptioningProcessor(raw_images,
                                                     [conditionalText] * len(raw_images), return_tensors="pt",
                                                     padding=True).to("cuda")
    imageCaptioningOutputs = imageCaptioningModel.generate(**imageCaptioningInputs)
    captions = [imageCaptioningProcessor.decode(output, skip_special_tokens=True) for output in imageCaptioningOutputs]

    print(f"Generated captions: {captions}")

    # Zero-shot object detection for all images
    zeroShotObjectDetectionInputs = zeroShotObjectDetectionProcessor(text=captions,
                                                                     images=raw_images,
                                                                     return_tensors="pt",
                                                                     padding=True)
    zeroShotObjectDetectionOutputs = zeroShotObjectDetectionModel(**zeroShotObjectDetectionInputs)

    target_sizes = torch.Tensor([image.size[::-1] for image in raw_images])
    results = zeroShotObjectDetectionProcessor.post_process_object_detection(
                                                outputs=zeroShotObjectDetectionOutputs,
                                                threshold=0,
                                                target_sizes=target_sizes)

    # Draw bounding boxes for each image
    for idx, (image, caption, result) in enumerate(zip(raw_images, captions, results)):
        boxes, scores, labels = result["boxes"], result["scores"], result["labels"]

        max_score_index = torch.argmax(scores).item()
        max_box = [round(i, 2) for i in boxes[max_score_index].tolist()]
        max_score = round(scores[max_score_index].item(), 3)
        max_label = caption

        print(f"Detected {max_label} with confidence {max_score} at location {max_box}")

        # Draw the bounding box on the image
        draw = ImageDraw.Draw(image)
        draw.rectangle(max_box, outline="red", width=3)

        # crop image
        left, top, right, bottom = max_box
        cropped_image = image.crop((left, top, right, bottom))

        pix2pixPrompt = "change this image into a monochrome sketch"
        convertImages = pix2pixPipe(pix2pixPrompt,
                                    image=cropped_image,
                                    num_inference_steps=10,
                                    image_guidance_scale=1).images
        
        # Save the image with the bounding box
        output_filename = f"output_{idx + 1}.jpg"
        # image.save(output_filename)
        convertImages[0].save(output_filename)
        print(f"Saved output image as {output_filename}")
    