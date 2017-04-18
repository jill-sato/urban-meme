pipeline {
  def dockerPath = sh(script: 'which docker', returnStdout: true)
  agent {
    docker {
      image 'ubuntu:latest'
      args  '-v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v ~/.docker/config.json:/root/.docker/config.json'
    }
  }
  stages {
    stage('init') {
      steps {
        sh 'cat /etc/debian_version; hostname ; uname -ra'
      }
    }
  }
}