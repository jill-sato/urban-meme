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


Notes for pipeline
------------------


### How to run the Build Environment docker container

- This is the CBE (Common Build Environment).
- We mount the docker socket to be able to run docker build inside
- We mount the docker config.json from the host to authenticate to aws

> docker run \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v ~/.docker/config.json:/root/.docker/config.json \
 ubuntu:latest

### init steps

- install openjdk8 and maven

>apt-get update
>apt-get install openjdk-8-jdk maven -y

- install pre-req for adding docker pkg repo

> apt-get install apt-transport-https \
>    ca-certificates \
>    curl \
>    software-properties-common \
>    \
>    -y

- add docker pkg repo

>add-apt-repository \
>   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
>   $(lsb_release -cs) \
>   stable"

- add docker pkg repo gpg key

> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

- verify gpg key fingerprint (should print OK)

> apt-key fingerprint 0EBFCD88

- install docker-ce

> apt-get update
> apt-get install docke-ce -y

- test docker cli

> docker info
