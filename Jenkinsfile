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
        checkout scm
      }
    }
    stage('Prepare Image Tag') {
      steps {
        script {
          env.IMAGE_TAG= GIT_COMMIT.take(7)
        }
      }
    }
    stage('Build Images') {
      parallel {
        stage('Build Backend Image') {
          steps {
            script {
              docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}", "./back-end")
            }
          }
        }
        stage('Build Frontend Image') {
          steps {
            script {
              docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}","./front-end")
            }
          }
        }
      }
    }
    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
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
          docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
          docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
        """
      }
    }
    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-ssh-key']) {
          sh """
            cd ansible
            ansible-playbook -i /Desktop/Ansible docker-setup.yaml --extra-vars "IMAGE_TAG=${IMAGE_TAG}"
          """ 
       }
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
