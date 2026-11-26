
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
        echo 'Menyiapkan database dan deployment aplikasi'

        withCredentials([
            string(
                credentialsId: 'mysql-root-password',
                variable: 'DB_ROOT_PASSWORD'
            )
        ]) {
            sh '''
                set +x

                # Membuat Docker network
                docker network inspect crud-network >/dev/null 2>&1 || \
                    docker network create crud-network

                # Membuat volume database permanen
                docker volume create crud_mysql_data

                # Menghapus container aplikasi dan database lama
                docker rm -f crud-rest-api || true
                docker rm -f crud-mysql || true

                # Menjalankan MariaDB
                docker run -d \
                    --name crud-mysql \
                    --network crud-network \
                    --restart unless-stopped \
                    -e MARIADB_ROOT_PASSWORD="$DB_ROOT_PASSWORD" \
                    -e MARIADB_DATABASE=belajar \
                    -v crud_mysql_data:/var/lib/mysql \
                    mariadb:11.4

                # Menunggu database siap
                for i in $(seq 1 60); do
                    if docker exec crud-mysql \
                        mariadb-admin ping -h 127.0.0.1 \
                        -uroot -p"$DB_ROOT_PASSWORD" \
                        --silent >/dev/null 2>&1; then
                        echo "Database siap!"
                        break
                    fi

                    if [ "$i" -eq 60 ]; then
                        echo "Database gagal dijalankan"
                        docker logs crud-mysql
                        exit 1
                    fi

                    sleep 2
                done

                # Membuat tabel mahasiswa
                docker exec crud-mysql \
                    mariadb -uroot -p"$DB_ROOT_PASSWORD" belajar \
                    -e "CREATE TABLE IF NOT EXISTS mahasiswa (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        nim VARCHAR(30) NOT NULL,
                        nama VARCHAR(100) NOT NULL,
                        email VARCHAR(150),
                        alamat TEXT
                    );"

                # Menjalankan aplikasi Express
                docker run -d \
                    --name crud-rest-api \
                    --network crud-network \
                    --restart unless-stopped \
                    -e DB_HOST=crud-mysql \
                    -e DB_PORT=3306 \
                    -e DB_USER=root \
                    -e DB_PASSWORD="$DB_ROOT_PASSWORD" \
                    -e DB_NAME=belajar \
                    -p 8081:8080 \
                    crud-rest-api:latest

                echo "Deployment selesai!"
            '''
        }
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
