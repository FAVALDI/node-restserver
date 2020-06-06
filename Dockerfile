FROM node:12

# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Copy files
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]