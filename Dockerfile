FROM node:20-bullseye

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Optional: copy env if needed
# COPY .env.local .env.local

ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=false

# Build app
RUN npm run build

# Run app
CMD ["npm", "start"]