# This Dockerfile is used by the Maven build
# We use the spotify-maven-plugin to build and push the docker image from Maven
# Note: this is done with -Pdocker-push profile.

# This image is ligther than the one for DockerHub as it does not
# need to build the jar, but instead copies it.
# Effectively that means not including Git, Maven, and the Maven repository.

FROM java:8

RUN mkdir /app
# urban-meme.jar is already built.
COPY urban-meme.jar /app/
# copy lib directory with all the dependencies
COPY lib /app/
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

EXPOSE 9998

ENTRYPOINT [ "/app/entrypoint.sh" ]
