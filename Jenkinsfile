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
unzip -o awscli-bundle.zip
./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
access_key=`cat ~/.aws/credentials | grep "aws_access_key_id =" | cut -d = -f2 | tr -d ' '`
secret_key=`cat ~/.aws/credentials | grep "aws_secret_access_key =" | cut -d = -f2 | tr -d ' '`
aws configure set default.region us-west-2
aws configure set aws_access_key_id ${access_key}
aws configure set aws_secret_access_key ${secret_key}
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