FROM openjdk:17-jdk-buster
ARG JAR_FILE=build/libs/user-0.0.1-SNAPSHOT.jar
ARG SPRING_JWT_SECRET
ARG CLIENT_ID
ARG CLIENT_SECRET

# 환경 변수로 설정
ENV SPRING_JWT_SECRET=${SPRING_JWT_SECRET}
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}
COPY ${JAR_FILE} /app/user.jar
ENTRYPOINT ["java", \
            "-Dspring.profiles.active=prod", \
            "-Dspring.jwt.secret=${SPRING_JWT_SECRET}", \
            "-Dclient.id=${CLIENT_ID}", \
            "-Dclient.secret=${CLIENT_SECRET}", \
            "-jar", "/app/user.jar"]

EXPOSE 8081
