import requests
from transformers import BlipProcessor, BlipForConditionalGeneration, OwlViTProcessor, OwlViTForObjectDetection
from diffusers import StableDiffusionInstructPix2PixPipeline, EulerAncestralDiscreteScheduler
import os
import torch
from PIL import Image, ImageDraw


def initModels():
    
    imageCaptioningProcessor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    imageCaptioningModel = BlipForConditionalGeneration.from_pretrained(
        "Salesforce/blip-image-captioning-large",
        torch_dtype=torch.float16).to("cuda")
    
    zeroShotObjectDetectionProcessor = OwlViTProcessor.from_pretrained("google/owlvit-base-patch16")
    zeroShotObjectDetectionModel = OwlViTForObjectDetection.from_pretrained("google/owlvit-base-patch16")

    pix2pixPipe = StableDiffusionInstructPix2PixPipeline.from_pretrained("timbrooks/instruct-pix2pix",
                                                                         torch_dtype=torch.float16,
                                                                         safety_checker=None)
    pix2pixPipe.to("cuda")
    pix2pixPipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pix2pixPipe.scheduler.config)
    
    return (imageCaptioningProcessor,
            imageCaptioningModel,
            zeroShotObjectDetectionProcessor,
            zeroShotObjectDetectionModel,
            pix2pixPipe)

    
