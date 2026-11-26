
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        APP_NAME = "crud-rest-api"
        APP_PORT = "8080"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Mengambil source code dari GitHub'
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                echo 'Memeriksa Node.js dan npm'
                sh '''
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Menginstall dependencies'
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Memeriksa sintaks aplikasi'
                sh 'node --check app.js'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Membangun Docker image'
                sh 'docker build -t crud-rest-api:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Melakukan deployment aplikasi'

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
