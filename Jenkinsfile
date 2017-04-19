pipeline {
  agent {
    docker {
      args '-v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/ecr_docker_login:/bin/ecr_docker_login'
      image 'jillsato/cbe:latest'
    }
  }
  stages {
    stage('init') {
      steps {
        sh 'sleep 300'
        sh 'docker version ; docker info'
        sh '/bin/ecr_docker_login'
      }
    }
    stage('Build') {
      steps {
        sh 'mvn package -Pdocker-push -Ddocker.registry="780245226102.dkr.ecr.us-west-2.amazonaws.com"'
      }
    }
  }
}