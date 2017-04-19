# This Dockerfile is for Dockerhub.
# It install git maven openjdk8, builds urban-meme and runs it

FROM ubuntu:latest

RUN apt-get update
RUN apt-get install maven openjdk-8-jdk git -y
RUN cd / ; git clone https://github.com/jill-sato/urban-meme.git
RUN mvn -f /urban-meme/pom.xml install

EXPOSE 9998
CMD ["java", "-jar", "/urban-meme/target/urban-meme.jar"]