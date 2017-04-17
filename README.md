urban-meme
==========

Commands
--------


### Run app locally
> mvn clean compile exec:java

### Build docker image locally
> mvn clean package -Pdocker

### Build docker image and push docker image to registry
> mvn clean package -Pdocker-push -Ddocker.registry="780245226102.dkr.ecr.us-west-2.amazonaws.com"

### Run app with local docker image 

- -d option makes the container run in the bg
- -P option publishes to an available port on the host
- use 'docker ps' to find the port 

> docker run -d -P localhost/urban-meme:latest`


