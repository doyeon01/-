FROM openjdk:17-jdk-buster
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} /app/user.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod", "-jar", "/app/user.jar"]
EXPOSE 8081
