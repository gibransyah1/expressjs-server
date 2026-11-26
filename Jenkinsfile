pipeline {
    agent any

    environment {
        APP_NAME = "crud-rest-api"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Mengambil source code'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t crud-rest-api:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f crud-rest-api || true

                    docker run -d \
                      --name crud-rest-api \
                      --restart unless-stopped \
                      -p 3000:3000 \
                      crud-rest-api:latest
                '''
            }
        }

    }

    post {
        success {
            echo 'CI/CD BERHASIL!'
        }

        failure {
            echo 'CI/CD GAGAL!'
        }
    }
}