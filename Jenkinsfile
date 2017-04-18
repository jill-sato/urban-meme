pipeline {
  agent {
    docker {
      args '-u 0:0 -v /usr/bin/docker:/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/.docker/config.json:/root/.docker/config.json'
      image 'openjdk:8'
    }
    
  }
  stages {
    stage('init') {
      steps {
        sh 'docker version;docker info'
      }
    }
    stage('Build') {
      steps {
        sh './mvnw package -Pdocker-push -Ddocker.registry="780245226102.dkr.ecr.us-west-2.amazonaws.com"'
      }
    }
  }
}