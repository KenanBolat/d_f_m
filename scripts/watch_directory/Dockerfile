# Use an official Ubuntu as a parent image
FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && \
    apt-get install -y inotify-tools curl

# Set the working directory
WORKDIR /usr/local/bin

# Copy the script into the container
COPY watch_and_update.sh .

# Make the script executable
RUN chmod +x watch_and_update.sh

# Define the entrypoint for the container
ENTRYPOINT ["./watch_and_update.sh"]
