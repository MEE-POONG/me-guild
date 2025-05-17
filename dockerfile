# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate
RUN apk add --no-cache openssl

ENV CFIMG="https://imagedelivery.net/"
ENV CLOUDFLARE_KEY="QZ6TuL-3r02W7wQjQrv5DA"
ENV CLOUDFLARE_ACCOUNT_ID="39aa4ea3c7a7d766adc4428933324787"
ENV CLOUDFLARE_API_TOKEN="HQZYfq40lbkXw2hB8Z4u_wR14ZpPl2x_uscraOf0"
ENV DATABASE_URL="mongodb+srv://me-guild-user:07Qy3X8416Vzc5RK@db-mongodb-sgp-bb56ac46.mongo.ondigitalocean.com/me-guild-db?authSource=admin&replicaSet=db-mongodb-sgp&tls=true" 

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
