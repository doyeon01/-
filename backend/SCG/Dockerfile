FROM openjdk:17-jdk-buster
ARG JAR_FILE=build/libs/SCG-0.0.1-SNAPSHOT.jar
ARG SPRING_JWT_SECRET
COPY ${JAR_FILE} /app/SCG.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-jar", "/app/SCG.jar"]
EXPOSE 8080
