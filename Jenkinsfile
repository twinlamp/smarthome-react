pipeline {
  agent {
    docker {
      image 'node:8.15'
      args '-p 20001-20100:3000'
    }
  }
  environment {
    CI = 'true'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test and Build') {
      parallel {
        stage('Run Tests') {
          steps {
            sh 'npm run test'
          }
        }
        stage('Create Build Artifacts') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }
    stage('Deployment') {
      parallel {
        stage('Production') {
          when {
            branch 'master'
          }
          steps {
            withAWS(region:'eu-west-1',credentials:'  f5813e85-c93f-4e2c-aaf6-77894102eff4') {
              s3Delete(bucket: 'smarthome-react', path:'**/*')
              s3Upload(bucket: 'smarthome-react', workingDir:'build', includePathPattern:'**/*');
            }
            mail(subject: 'Production Build', body: 'New Deployment to Production', to: 'vyboyshchik@gmail.com')
          }
        }
      }
    }
  }
}