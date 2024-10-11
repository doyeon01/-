## 시간 설정
```
sudo timedatectl set-timezone Asia/Seoul
```

## Swap 메모리 설정 (보통 EC2 메모리의 2배)
```
스왑 메모리 설정
# swap 파일을 생성해준다. 
// (메모리 상태 확인 시 swap이 있었지만 디렉토리 파일은 만들어줘야한다.)
sudo mkdir /var/spool/swap
sudo touch /var/spool/swap/swapfile
sudo dd if=/dev/zero of=/var/spool/swap/swapfile count=4096000 bs=1024

# swap 파일을 설정한다.
sudo chmod 600 /var/spool/swap/swapfile
sudo mkswap /var/spool/swap/swapfile
sudo swapon /var/spool/swap/swapfile

# swap 파일을 등록한다.
sudo echo '/var/spool/swap/swapfile none swap defaults 0 0' | sudo tee -a /etc/fstab

# 메모리 상태 확인
free -h
```

## 포트 설정

```
sudo ufw allow {포트번호}
sudo ufw status
```
|j11c205.p.ssafy.io|
| --- |

| Port | Description |
| --- | --- |
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 2181 | zookeeper |
| 3000 | frontend |
| 3306 | user_db |
| 3307 | accompany_board_db |
| 3308 | photocard-db |
| 7070 | spark-master web ui |
| 7071 | spark-worker1 webui |
| 7077 | spark-master(spark-worker 1) |
| 8080 | Spring Cloud Gateway |
| 8081 | user server |
| 8082 | accompany_board server |
| 8761 | eureka |
| 8888 | jupyter |
| 8989 | tcp |
| 9090 | jenkins |
| 9092 | kafka |
| 9866 | datanode 2 |
| 8084 | photocard server |


<br>

|j11c205a.p.ssafy.io|
| ----------- |

| Port | Description |
| --- | --- |
| 22 | SSH |
| 80 | HTTP(현재 namenode webui로 nginx 리다이렉스 설정해놓음) |
| 443 | HTTPS |
| 8080 | feed server |
| 3306 | place_feed_db-mysql |
| 9000 | Namenode (RPC) |
| 9870 | Namenode (Web ui) |
| 9866 | Datanode1 |
| 9868 | SecondNamenode |
| 7077 | spark-worker 2 |
| 9200 | elasticsearch |
| 5044 | logstash |
| 5601 | kibana |
| 6379 | redis |
| 3307 | plan db |


## Nginx 설치
```
sudo apt install nginx
```

## CertBot 설치 (구글링해서 맞는 방법 찾기)
```
sudo apt install cerbot
sudo apt install python3-certbot-nginx
sudo cerbot —nginx
도메인네임 입력 - [j11c205.p.ssafy.io](http://j11c205.p.ssafy.io) 입력
http 요청도 https로 redirect하기 - 2 입력
```

## Docker 설치
```
# 의존성 설치
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release

# 레포지토리
sudo mkdir -p /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 레포지토리 추가
echo "deb [arch=$(dpkg --print-architecture) \
signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 도커 설치하기
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Jenkins 설치
```
docker run -d  \
--name jenkins   \
-p 9090:8080   \
-p 50000:50000   \
-v jenkins_home:/var/jenkins_home   \
-v /usr/bin/docker:/usr/bin/docker  \
-v /var/run/docker.sock:/var/run/docker.sock   \
-e JENKINS_OPTS="--prefix=/jenkins"   \
jenkins/jenkins:lts


# 설치하며 접속 url을 https://j11c205.p.ssafy.io/jenkins/로 설정
```

## Nginx.conf 작성
```
# site-availbable 하위에 설정파일 작성

# nginx websocket 활용 설정
 map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
server { 
    server_name j11c205.p.ssafy.io;
    listen 443 ssl;
    client_max_body_size 10M;

     ssl_certificate /etc/letsencrypt/live/j11c205.p.ssafy.io/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/j11c205.p.ssafy.io/privkey.pem;

    location /chat-websocket {
        proxy_pass http://localhost:8080;  # WebSocket을 처리하는 백엔드 서비스 URL
        proxy_http_version 1.1;            # WebSocket에는 HTTP 1.1 필요
        proxy_set_header Upgrade $http_upgrade;  # WebSocket 업그레이드 요청 헤더 설정
        proxy_set_header Connection $connection_upgrade;  # 연결 업그레이드 설정
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api { 
        proxy_pass http://localhost:8080;
	proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        error_page 405 = $uri;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded_Proto $scheme;
	proxy_set_header X-Forwarded_Host $host;
	proxy_set_header X-Forwarded_Port $server_port;
    }

    location /oauth2/authorization {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header X-Forwarded_Host $host;
	proxy_set_header X-Forwarded_Port $server_port;
    }

    location /login {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header X-Forwarded_Host $host;
	proxy_set_header X-Forwarded_Port $server_port;
    }

    # accompanyboard restdocs 리버스프록시 테스트
    location /accompanyboards/docs/index.html {
	proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header X-Forwarded_Host $host;
	proxy_set_header X-Forwarded_Port $server_port;
    }

    location /jenkins {
	      sendfile off;
	      proxy_pass         http://j11c205.p.ssafy.io:9090/jenkins;
	      proxy_redirect     default;
	      proxy_http_version 1.1;
	
	      # Required for Jenkins websocket agents
	      proxy_set_header   Connection        $connection_upgrade;
	      proxy_set_header   Upgrade           $http_upgrade;
	
	      proxy_set_header   Host              $http_host;
	      proxy_set_header   X-Real-IP         $remote_addr;
	      proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
	      proxy_set_header   X-Forwarded-Proto $scheme;
	      proxy_max_temp_file_size 0;
	
	      #this is the maximum upload size
	      client_max_body_size       10m;
	      client_body_buffer_size    128k;
	
	      proxy_connect_timeout      90;
	      proxy_send_timeout         90;
	      proxy_read_timeout         90;
	      proxy_request_buffering    off; # Required for HTTP CLI commands
     }

    location /images/ {
	root /var/www;
	autoindex on;
	}

	location / { 
		#root /usr/share/nginx/html;
		#index index.html;
		#try_files $uri /index.html;
		
		proxy_pass http://localhost:3000;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		
		#try_files $uri $uri/ /index/html;
		#add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
		#add_header Pragma "no-cache"; 
	}
		
	types {
		application/javascript js;
	}
	default_type application/javascript;
}



server {
	listen 80;
	server_name j11c205.p.ssafy.io;
	
	location / {
		return 301 https://$host$request_uri;
	}
   # if ($host = j11c205.p.ssafy.io) { 
  #      return 301 https://$host$request_uri;
 #   } # managed by Certbot
#
 # listen 80;
 # server_name j11c205.p.ssafy.io;
 #   return 404; # managed by Certbot
}

```
- 이후 site-enabled 심볼릭 링크
  ```
  sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/j11c205.p.ssafy.io
  sudo nginx -t
  sudo nginx -s reload
  ```