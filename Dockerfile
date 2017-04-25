# This Dockerfile is for Dockerhub.
# It install git maven openjdk8, builds urban-meme and runs it

FROM ubuntu:latest

RUN apt-get update
RUN apt-get install maven openjdk-8-jdk git -y
RUN cd / ; git clone https://github.com/jill-sato/urban-meme.git
# At this point, the image is completely empty
# We could run the application with mvn compile exec:java as entrypoint
# However, that would mean download the maven world every time a
# container is created.

# Do a warm up build to populate the maven local repository.
# so that the image has a populated maven repository.
RUN mvn -f /urban-meme/pom.xml install

EXPOSE 9998
# Note that we could also use mvn exec:java to run.
CMD ["java", "-jar", "/urban-meme/target/urban-meme.jar"]