pipeline {
  agent any
  stages {
    stage('init') {
      steps {
        withDockerContainer('ubuntu:latest') {
            sh '''uname -ra'''
        }
      }
    }
  }
}