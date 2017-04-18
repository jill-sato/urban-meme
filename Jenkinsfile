pipeline {
  agent {
    docker {
      args '-u 0:0 -v /usr/bin/docker:/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/.docker:/root/.docker -v /var/lib/jenkins/.aws:/root/.aws'
      image 'maven:3.3.9-jdk-8'
    }
  }
  stages {
    stage('init') {
      steps {
        sh 'docker version;docker info'

        sh '''curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
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