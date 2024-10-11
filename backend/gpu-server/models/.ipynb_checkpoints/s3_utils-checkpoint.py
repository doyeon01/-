import boto3
from botocore.exceptions import NoCredentialsError
import os
from uuid import uuid4

AWS_ACCESS_KEY = 'AKIA2UC3EX7OQJ3ETAGO'
AWS_SECRET_KEY = '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'
S3_BUCKET = 'c205.bucket'

def upload_to_s3(file_path: str) -> str: 
        
    s3_file_num = f"{uuid4()}"
    s3_file_name = s3_file_num + ".jpg"
    s3 = boto3.client('s3',
                      aws_access_key_id=AWS_ACCESS_KEY,
                      aws_secret_access_key=AWS_SECRET_KEY)

    try:
        with open(file_path, "rb") as data:
            s3.put_object(
                Bucket=S3_BUCKET,
                Key=s3_file_name,
                Body=data,
                ContentType='image/jpeg',  # MIME 타입 설정 (이미지 형식)
                ContentDisposition='inline'  # 브라우저에서 이미지를 표시하도록 설정
            )
        s3_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{s3_file_name}"
        return s3_url
    except FileNotFoundError:
        print("The file was not found")
        return None
    except NoCredentialsError:
        print("Credentials not available")
        return None