pipeline {
  agent {
    docker {
      image 'ubuntu:latest'
      args  '-u 0:0 -v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/.docker/config.json:/root/.docker/config.json'
    }
  }
  stages {
    stage('init') {
      steps {
        sh '''groupadd -g497 jenkins
groupadd -g496 docker
useradd -s/bin/bash -u498 -g497 jenkins
usermod -aG docker jenkins
su - jenkins
docker info'''
      }
    }
  }
}