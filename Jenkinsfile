pipeline {
  agent any

  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:14-alpine'
        }
      }
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
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }

//     stage('Sonarqube') {
//       environment {
//         scannerHome = tool 'sonarqube-scanner'
//       }

//       steps {
//         withSonarQubeEnv(installationName: 'sonarqube') {
//           sh "${scannerHome}/bin/sonar-scanner"
//         }
//       }
//     }

  }
}
