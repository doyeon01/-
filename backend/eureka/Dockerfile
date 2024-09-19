FROM openjdk:17-jdk-buster
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} /app/eureka-server.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod", "-jar", "/app/eureka-server.jar"]
EXPOSE 8761
