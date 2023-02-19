# base image
FROM node:16

# set work directory
WORKDIR /app

# install dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

# install gfortran
RUN apt-get update
RUN apt-get -y install gfortran

# copy project documents
COPY ./src /app/src
COPY tsconfig.json /app
COPY tsconfig.node.json /app
COPY nodemon.json /app
COPY Makefile /app

# build the fortran executable
RUN gfortran -o /app/src/struct-program/sa-linux-exec /app/src/struct-program/FrameAnalysis.f95
