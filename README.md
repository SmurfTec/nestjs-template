# orion

orion prod app

# rabbitmq

docker run -d --hostname orion-rabbit --name rabbitmq-server -e RABBITMQ_DEFAULT_USER=orion -e RABBITMQ_DEFAULT_PASS=iRRiMTkzYPDqOtM -p 5672:5672 -p 15672:15672 rabbitmq:3-management
