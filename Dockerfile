FROM lambci/lambda:build-nodejs8.10

WORKDIR /opt/app

COPY . .

RUN npm -g config set user root

RUN npm install -g node-gyp
RUN npm install -g serverless@1.32.0

RUN npm install
