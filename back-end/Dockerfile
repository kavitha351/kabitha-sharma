FROM node:18-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm install --only=production

# Copy application code
COPY . .

EXPOSE 5000

CMD ["node" , "index.js"]
