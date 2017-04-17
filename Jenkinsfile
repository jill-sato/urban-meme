pipeline {
  agent any
  stages {
    stage('init') {
      steps {
        docker.image('ubuntu:latest').inside {

              stage("Info") {
                sh "uname -ra"
              }
           }
      }
    }
  }
}