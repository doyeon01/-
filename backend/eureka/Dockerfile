FROM openjdk:17-jdk-buster
ARG JAR_FILE=build/libs/eureka-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /app/eureka.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod", "-jar", "/app/eureka-server.jar"]
EXPOSE 8761
