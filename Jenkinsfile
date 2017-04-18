pipeline {
  agent {
    docker {
      args '-u 0:0 -v /usr/bin/docker:/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/.docker:/root/.docker -v /usr/lib/python2.7:/usr/lib/python2.7 -v /usr/bin/aws:/bin/aws -v /var/lib/jenkins/.aws:/root/.aws'
      image 'maven:3.3.9-jdk-8'
    }
  }
  stages {
    stage('init') {
      steps {
        sh '''echo "get docker info"
docker version
docker info
echo "renew aws authentication token"
echo -ne '\n\n\n\n' | aws configure
eval `aws ecr get-login`'''
      }
    }
    stage('Build') {
      steps {
        sh 'mvn package -Pdocker-push -Ddocker.registry="780245226102.dkr.ecr.us-west-2.amazonaws.com"'
      }
    }
  }
}