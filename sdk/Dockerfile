# Use an alpine image for small footprint
FROM alpine:latest

# Install git
RUN apk add --no-cache git

# Create a git user and group
RUN addgroup -S git && adduser -S git -G git

# Set up a directory for the repository
RUN mkdir /home/git/microservice_sdk.git && \
    chown git:git /home/git/microservice_sdk.git

# Switch to git user
USER git

# Set the working directory
WORKDIR /home/git/microservice_sdk.git

# Initialize the repository
RUN git init --bare

# Expose the Git port
EXPOSE 9418

# Run the git daemon
CMD ["git", "daemon", "--reuseaddr", "--base-path=/home/git/", "--export-all", "--verbose"]
