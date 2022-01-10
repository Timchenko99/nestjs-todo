FROM node:16.13.0 

# Create app directory
WORKDIR /usr/src/app

EXPOSE 3000

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install 

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
