pipeline {
  agent any
  stages {
    stage('init') {
      steps {
        docker.image('ubuntu:latest').inside {
          sh 'uname -ra'
        }
      }
    }
  }
}