pipeline {
  agent {
    docker {
      image 'ubuntu:latest'
      args '-v /var/run/docker.sock:/var/run/docker.sock -v ~/.docker/config.json:/root/.docker/config.json'
    }
    
  }
  stages {
    stage('init') {
      steps {
        sh '''apt-get update
apt-get install openjdk-8-jdk maven -y

apt-get install apt-transport-https ca-certificates curl software-properties-common -y

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

apt-key fingerprint 0EBFCD88

apt-get update
apt-get install docker-ce -y

docker info
'''
      }
    }
  }
}