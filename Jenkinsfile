pipeline {
    agent any

    triggers {

        cron('H H/2 * * *')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                bat 'npm install'
            }
        }

        stage('Run API Tests') { 
            steps {
                echo "Running API tests..." 
                bat 'npm run test:api' 
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'API Tests passed successfully!' 
        }
        failure {
            echo 'API Tests failed!' 
        }
    }
}