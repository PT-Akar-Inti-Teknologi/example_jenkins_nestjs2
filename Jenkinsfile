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

    // stage('Sonarqube docker') {
    //   agent {
    //     docker {
    //       image 'newtmitch/sonar-scanner'
    //       reuseNode true
    //     }
    //   }
    //   environment {
    //     SONAR_TOKEN = credentials('sonarqube-token')
    //   }
    //   steps {
    //     sh '/usr/local/bin/sonar-scanner -X -Dsonar.host.url=http://192.168.1.20:9001 -Dsonar.sources=. -Dsonar.login=$SONAR_TOKEN'
    //   }
    // }

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
    always {
      emailext body: 'Test jenkins email', subject: 'Test jenkins email subject', to: [developers()]
    }
  }
}
