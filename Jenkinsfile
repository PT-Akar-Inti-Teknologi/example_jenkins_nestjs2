pipeline {
  agent any

  tools {
    nodejs 'node-14'
  }

  stages {
    // stage('Test cred') {
    //   environment {
    //     SONAR_CRED = credentials('sonarqube-token')
    //   }
    //   steps {
    //     sh 'printenv'
    //   }
    // }

    stage('Build') {
      // agent {
      //   docker {
      //     image 'node:14-alpine'
      //     reuseNode true
      //   }
      // }
      steps {
        sh 'yarn install'
        sh 'yarn test'
        sh 'yarn test:cov'
      }
    }

    stage('Sonarqube') {
      environment {
        scannerHome = tool 'sonarqube-scanner'
      }

      steps {
        withSonarQubeEnv(installationName: 'sonarqube') {
          sh '$scannerHome/bin/sonar-scanner'
        }
      }
    }

    stage('Quality Gate') {
      steps {
        waitForQualityGate abortPipeline: true
      }
    }

  }

  post {
    failure {
      emailext subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
        body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
        recipientProviders: [
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
        ]
    }

    always {
      cleanWs()
    }
  }
}
