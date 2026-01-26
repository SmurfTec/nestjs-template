pipeline {
    agent any

    environment {
        // Use user-level npm global prefix to avoid sudo conflicts
        NPM_CONFIG_PREFIX = "${env.HOME}/.npm-global"
        PATH = "${env.HOME}/.npm-global/bin:${env.PATH}"
        NODE_ENV = "production"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                sh '''
                    echo "🧹 Fixing file permissions..."
                    sudo chown -R jenkins:jenkins $WORKSPACE
                    mkdir -p $NPM_CONFIG_PREFIX
                    mkdir -p $WORKSPACE/.npm-cache

                    npm config set prefix $NPM_CONFIG_PREFIX
                    npm config set cache $WORKSPACE/.npm-cache
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "📦 Installing dependencies..."
                    rm -rf node_modules package-lock.json
                    npm install
                '''
            }
        }

        stage('Build App') {
            steps {
                sh '''
                    echo "🏗️ Building NestJS app..."
                    npm run build
                '''
            }
        }

        stage('Install PM2 (if not installed)') {
            steps {
                sh '''
                    if ! command -v pm2 >/dev/null 2>&1; then
                        echo "⚙️ Installing PM2..."
                        npm install -g pm2
                    else
                        echo "✅ PM2 already installed."
                    fi
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                    echo "🚀 Deploying app with PM2..."

                    APP_NAME="swift-seller"
                    DEPLOY_DIR="/home/ubuntu/home/Seller-Analytics-Backend"

                    # Fix ownership again for deploy folder
                    sudo chown -R ubuntu:ubuntu $DEPLOY_DIR

                    # Sync dist folder to deploy directory
                    rsync -av --delete dist/ $DEPLOY_DIR/dist/

                    # Start or restart PM2 process
                    pm2 start $DEPLOY_DIR/dist/main.js --name $APP_NAME || pm2 restart $APP_NAME

                    # Save PM2 process list so it restarts on boot
                    pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Check Jenkins logs.'
        }
    }
}
