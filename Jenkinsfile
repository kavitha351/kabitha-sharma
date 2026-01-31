pipeline {
  agent any
  environment {
    DOCKERHUB_USERNAME = "kavithakumari062001"
    BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/pf-backend"
    FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/pf-frontend"
  }
  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main',
          url: 'https://github.com/kavitha351/kabitha-sharma.git'
      }
    }
    stage('Build Backend Image') {
      steps {
        script {
          docker.build("${BACKEND_IMAGE}:latest", "./back-end")
        }
      }
    }
    stage('Build Frontend Image') {
      steps {
        script {
          docker.build("${FRONTEND_IMAGE}:latest", "./front-end")
        }
      }
    }
    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsID: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER', 
          passwordVariable: 'DOCKER_PASS'
        )]) {
            sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }
    stage('Push Images') { 
      steps {
        sh """
          docker push ${BACKEND_IMAGE}:latest
          docker push ${FRONTEND_IMAGE}:latest
        """
      }
    }
  }
  post {
    success {
      echo 'CI pipeline completed sucessfully'
    }
    failure {
      echo 'CI pipeline failed'
    }
  }
}
