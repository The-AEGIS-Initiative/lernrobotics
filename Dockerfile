# Build Stage
FROM node:13.8.0-alpine3.10 as builder

# Install and cache node_modules
COPY package.json /app/
WORKDIR /app
RUN npm install

# Copy remaining files
COPY . .

# Run test suite
ENV REACT_APP_BACKEND_URL=http://localhost:3000
ENV CI=true
RUN npm test

# Build react app
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV CI=false
RUN npm run-script build


##########################


# Serve Stage
FROM node:13.8.0-alpine3.10

# Install serve module
RUN npm install -g serve

# Copy build files
WORKDIR /app
COPY --from=builder /app/build .

CMD ["serve", "-s", "build"]