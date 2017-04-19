pipeline {
  agent {
    docker {
      args '-u 0:0 -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/docker_init:/bin/docker_init'
      image 'jillsato/cbe:latest'
    }
  }
  stages {
    stage('init') {
      steps {
        sh '/bin/docker_init'
      }
    }
    stage('Build') {
      steps {
        sh 'mvn package -Pdocker-push -Ddocker.registry="780245226102.dkr.ecr.us-west-2.amazonaws.com"'
      }
    }
  }
}