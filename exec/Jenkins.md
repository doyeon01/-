## Jenkins 설치
```
# 도커 소켓 마운트
docker run -d  \
--name jenkins   \
-p 9090:8080   \
-p 50000:50000   \
-v jenkins_home:/var/jenkins_home   \
-v /usr/bin/docker:/usr/bin/docker  \
-v /var/run/docker.sock:/var/run/docker.sock   \
-e JENKINS_OPTS="--prefix=/jenkins"   \
jenkins/jenkins:lts

# 도커 명령어가 젠킨스에서 실행이 안되거나 권한 오류가 나면 아래 명령어 실행
sudo chmod 666 /var/run/docker.sock

# 젠킨스 컨테이너 비밀번호 확인 명령어
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# 젠킨스 컨테이너로 접속해서 도커 명령어 실행 여부 확인 명령어
docker exec -it <container_name_or_id> /bin/bash
docker exec -it jenkins /bin/bash

# 젠킨스 컨테이너에 접속해서 Docker 명령어 되는지 확인
docker
```

## Jenkins 접속 후 설정

1. Gitlab Token 발급
   - Project Access Token
   - Personal Access Token

2. Jenkins Plugin 설치
   - GitLab
   - Docker
   - Mattermost

3. GitLab API token Credentials 등록 (global)
    ```
    Kind: GitLab API token
    Scope: Global
    API token: [앞서 발급한 GitLab access token]
    ID: [원하는 ID값]
    ```

4. GitLab ID, PW 등록
    ```
    Kind: Username with password
    Scope: Global
    Username: [GitLab 아이디]
    Password: [GitLab 비밀번호]
    ```

5. GitLab, Jenkins 연결확인
   - Dashboard > Jenkins 관리 > System > GitLab
    ```
    Connection name: [원하는 connection name] Ulvan
    Gitlab host URL: [GitLab이 설치된 URL] --> https://lab.ssafy.com/
    Credentials: [앞서 생성한 GitLab API token]
    ```

6. 그외 Credential 설정
   - Personal Access Token
    ```
    Kind: Username with password
    Scope: Global
    Username: [GitLab 아이디]
    Password: [Personal Access Token]
    ```
    - Docker_USER
    ```
    Kind: Username with password
    Scope: Global
    Username: [Docker 아이디]
    Password: [Docker 비밀번호]
    ```
    - Docker_Repository
    ```
    Kind: Username with password
    Scope: Global
    Username: [Docker 네임스페이스]
    Password: [Docker repository 이름]
    ```
    - EC2_SERVER1_SSH (SERVER2도 마찬가지)
    ```
    Kind: SSH Username with private key
    Scope: Global
    Username: [ssh 접속 닉네임(ubuntu)]
    Password: [ssh ppk 키]
    ```
    - GitLab 로그인(Jenkins 파이프라인 생성할 때 사용)
    ```
    Kind: Username with password
    Scope: Global
    Username: [GitLab 아이디]
    Password: [GitLab 비밀번호]
    ```

7. Jenkins Token 발급
   - GitLab Webhook 생성 시 사용
   - https://jenkinssuite.github.io/jenkins/jenkins-10-token/

## PipeLine 구축
- New Item > 파이프라인 이름 입력 > PipeLine 선택 > OK
- Build Triggers > Build when a change is pushed to GitLab. GitLab webhook URL: https://j11c205.p.ssafy.io/jenkins/project/name > Push Event > 첫번째 Advanced > Secret token Generate > 복사해놓기
- Pipeline > Pipeline script for SCM > SCM: Git > Script Path(backend/{서버 이름}/Jenkinsfile) 설정 > save

## GitLab Webhook 설정
- Settings > Webhooks > Add new Webhooks
- URL에 https://{JenkinsID}{JenkinsToken}@j11c205.p.ssafy.io/jenkins/project/{파이프라인명} > secret token에 복사한 값 입력
- Push event > Wildcard pattern(관찰하려고하는 branch 입력) > Add webhook

## Jenkinsfile
def skipRemainingStages = true

pipeline {
    agent any

    triggers {
        // GitLab Webhook을 통해 backend 브랜치로의 push 이벤트 시 트리거.
        gitlab(
            triggerOnPush: true,
        )
    }

    environment {
        SERVER_PORT = '8082'
        SERVER_NAME = 'accompanyboard'
        DOCKER_USERINFO = credentials('DOCKER_USER')
        DOCKER_REPO = credentials('DOCKER_REPO')
        EC2_IP = credentials('EC2_SERVER1_IP')
        SSH_INFO = credentials('EC2_SERVER1_SSH')
    }

    stages {

        stage('Checkout Code') {
            steps {
                // backend 브랜치의 accompanyboard 폴더만 체크아웃
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/backend']],
                    userRemoteConfigs: [[
                        url: 'https://lab.ssafy.com/s11-bigdata-dist-sub1/S11P21C205.git',
                        credentialsId: 'PERSONAL_ACCESS_TOKEN'
                    ]],
                    extensions: [[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [[path: "${SERVER_NAME}/"]]]]
                ])
            }
        }

        stage('Build Docker Image') {
            when {
                changeset "backend/${SERVER_NAME}/**"
            }
            steps {
                script {
                    skipRemainingStages = false
                    sh """
                    cd backend/${SERVER_NAME}
                    chmod +x ./gradlew
                    ./gradlew build
                    ls build/libs
                    docker build -t ${SERVER_NAME}:latest .
                    """
                }
            }
        }

        stage('Login to Docker Registry') {
            when {
                changeset "backend/${SERVER_NAME}/**"
            }
            steps {
                script {
                    sh """
                    docker login -u $DOCKER_USERINFO_USR -p $DOCKER_USERINFO_PSW
                    """
                }
            }
        }

        stage('Push Docker Image to Repository') {
            when {
                changeset "backend/${SERVER_NAME}/**"
            }
            steps {
                script {
                    sh """
                    docker tag ${SERVER_NAME}:latest $DOCKER_REPO_USR/$DOCKER_REPO_PSW:${SERVER_NAME}-latest
                    docker push $DOCKER_REPO_USR/$DOCKER_REPO_PSW:${SERVER_NAME}-latest
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            when {
                changeset "backend/${SERVER_NAME}/**"
            }
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -i $SSH_INFO $SSH_INFO_USR@$EC2_IP <<-EOF
                    docker stop ${SERVER_NAME} || true
                    docker rm ${SERVER_NAME} || true
                    docker rmi $DOCKER_REPO_USR/$DOCKER_REPO_PSW:${SERVER_NAME}-latest || true
                    docker system prune -f --volumes
                    docker pull $DOCKER_REPO_USR/$DOCKER_REPO_PSW:${SERVER_NAME}-latest
                    docker run -it -d --name ${SERVER_NAME} -p $SERVER_PORT:$SERVER_PORT $DOCKER_REPO_USR/$DOCKER_REPO_PSW:${SERVER_NAME}-latest
                    EOF
                    """.stripIndent()
                }
            }
        }

        stage('Logout from Docker Registry') {
            when {
                changeset "backend/${SERVER_NAME}/**"
            }
            steps {
                script {
                    sh """
                    docker logout
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            script{
                if (skipRemainingStages) {
                    echo "No changes in ${SERVER_NAME} folder, skipping build and deploy."
                } else {
                    echo "Deployed successfully on port ${SERVER_PORT}!"
                    def user = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                    mattermostSend (
                        color: 'good',
                        message: "${user}님의 ${env.JOB_NAME} 서버 배포 성공. (#${env.BUILD_NUMBER}) ",
                    )
                }
            }
        }
        failure {
            echo 'Deployment failed!'
            script{
                def user = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                mattermostSend (
                    color: 'danger',
                    message: "${user}님? ${env.JOB_NAME} 서버 터졌는데요? (#${env.BUILD_NUMBER}) ",
                )
            }
        }
    }
}