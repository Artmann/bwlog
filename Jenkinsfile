node {
    stage('Build') {

        deleteDir()
        checkout scm

        sh 'cp ~/$JOB_NAME-config.js ./config.js'

        sh 'docker build -t $JOB_NAME:$BUILD_NUMBER --pull=true .'
        sh 'docker tag $JOB_NAME:$BUILD_NUMBER registry.artmann.co:5000/artmann/$JOB_NAME:$BUILD_NUMBER'
        sh 'docker push registry.artmann.co:5000/artmann/$JOB_NAME:$BUILD_NUMBER'
    }

    stage('Deploy') {
        sh "ssh -o StrictHostKeyChecking=no root@46.21.102.98 docker service update --image registry.artmann.co:5000/artmann/$JOB_NAME:$BUILD_NUMBER $JOB_NAME"
    }
}
