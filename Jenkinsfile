pipeline {
  agent any
  stages {
    stage('init') {
      agent {
        docker {
          image 'ubuntu:latest'
          args  '-v /tmp:/tmp'
        }
      }
      steps {
        sh 'cat /etc/debian_version; hostname ; uname -ra'
      }
    }
  }
}