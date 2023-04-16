# flipr-api

If running from terminal then create a .env file consisting MONGODB_URL=""   //your mongodb url 

If running in docker then make sure to add ENV MONGODB_URL=<your mongodb url> in your Dockerfile


To run from the terminal :

1.npm install 

2.create.env file conatining MONGODB_URL

3.npm start


To run from the docker :

1. add ENV MONGODB_URL=<your mongodb url>  in your Dockerfile
  
2. write command <  docker build -t flipr-api-server . > in the terminal.
  
3.write command  < docker run --name flipr-api -p 8000:8000 -d flipr-api-server >
  
4. then < docker logs -f flipr-api >
