# Use the official Alpine image as the base image
FROM alpine:latest

# Install Redis package from the Alpine repository
RUN apk add --no-cache redis

# Set the default command to run Redis server
CMD ["redis-server"]
