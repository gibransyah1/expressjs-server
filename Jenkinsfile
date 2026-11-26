
pipeline {
    agent any

    environment {
        APP_NAME = "crud-rest-api"
        APP_PORT = "8080"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Mengambil source code'
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                sh '''
                    docker run --rm node:22-alpine node --version
                    docker run --rm node:22-alpine npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      node:22-alpine npm ci
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      node:22-alpine \
                      node --check app.js
                '''
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
                      -p 8080:8080 \
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
