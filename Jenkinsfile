pipeline {
  agent any
  stages {
    stage('init') {
      steps {
        getDockerImage('ubuntu:latest').inside {
            sh 'uname -ra'
        }
      }
    }
  }
}
def getDockerImage(imageName) {
    return { ->
        def img = docker.image(imageName)
        /* make sure we have the up-to-date image */
        img.pull()
        /* dance around https://issues.jenkins-ci.org/browse/JENKINS-34276 */
        return docker.image(img.imageName())
    }()
}