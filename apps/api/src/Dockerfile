# Build stage
FROM node:20-alpine AS build
WORKDIR /apps
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /apps
COPY --from=build /apps/dist ./dist
COPY --from=build /apps/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]
