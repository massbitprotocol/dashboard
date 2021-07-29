FROM ubuntu:18.04
RUN apt update
RUN apt install -y git curl
RUN apt install -y npm
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
COPY . dashboard
WORKDIR "dashboard"
RUN npm install
RUN npm install --save vue-axios

CMD npm run serve
