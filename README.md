## **Docker Images**

1. **List Docker Images**

   ```bash
   docker images
   ```

   - Lists all available Docker images on your system.

2. **Pull an Image from Docker Hub**

   ```bash
   docker pull <image-name>
   ```

   - Downloads an image from the Docker Hub repository.

3. **Build an Image from Dockerfile**

   ```bash
   docker build -t <image-name> <path-to-dockerfile>
   ```

   - Builds a Docker image from a `Dockerfile` located at the specified path.

4. **Remove an Image**

   ```bash
   docker rmi <image-id>
   ```

   - Removes a Docker image by its ID or name.

5. **Tag an Image**
   ```bash
   docker tag <image-id> <new-image-name>:<tag>
   ```
   - Tags an image with a new name or version tag.

---

### **Managing Docker Containers**

1. **Create a Container Without Running It**

   ```bash
   docker create <image-name>
   ```

   - Creates a container from an image but doesn’t start it.

2. **Run a Container in Detached Mode**

   ```bash
   docker run -d <image-name>
   ```

   - Runs a container in the background (detached mode).

3. **Run a Container with Port Binding**

   ```bash
   docker run -p <host-port>:<container-port> <image-name>
   ```

   - Binds a port from the container to the host system. Example: `-p 8080:80` binds port 8080 on the host to port 80 inside the container.

4. **Run a Container with Volume Mounting**

   ```bash
   docker run -v /host/path:/container/path <image-name>
   ```

   - Mounts a volume (directory) from the host to the container.

5. **Run a Container with Environment Variables**

   ```bash
   docker run -e ENV_VAR=value <image-name>
   ```

   - Sets environment variables in a container at runtime.

6. **View Details of a Container**
   ```bash
   docker inspect <container-id>
   ```
   - Displays detailed information about a container (e.g., configuration, network settings).

---

### **Container Networking**

1. **List Docker Networks**

   ```bash
   docker network ls
   ```

   - Lists all Docker networks available on the system.

2. **Create a Docker Network**

   ```bash
   docker network create <network-name>
   ```

   - Creates a custom Docker network for containers to communicate over.

3. **Connect a Container to a Network**

   ```bash
   docker network connect <network-name> <container-id>
   ```

   - Connects a running container to a specific Docker network.

4. **Disconnect a Container from a Network**
   ```bash
   docker network disconnect <network-name> <container-id>
   ```
   - Disconnects a container from a Docker network.

---

### **Docker Volumes**

1. **List Docker Volumes**

   ```bash
   docker volume ls
   ```

   - Lists all volumes on your system.

2. **Create a Docker Volume**

   ```bash
   docker volume create <volume-name>
   ```

   - Creates a new named volume for persisting data.

3. **Remove a Docker Volume**
   ```bash
   docker volume rm <volume-name>
   ```
   - Removes a Docker volume.

---

### **Container Resource Management**

1. **View Resource Usage of Containers**

   ```bash
   docker stats
   ```

   - Displays real-time statistics of containers (CPU, memory, network I/O, etc.).

2. **Limit Container Resources**
   ```bash
   docker run --memory="500m" --cpus="1.0" <image-name>
   ```
   - Limits the container’s memory usage to 500MB and CPU usage to 1 core.

---

### **Docker Compose Commands** _(For managing multi-container applications)_

1. **Start Services Defined in `docker-compose.yml`**

   ```bash
   docker-compose up
   ```

   - Starts up the services as defined in a `docker-compose.yml` file.

2. **Start Services in Detached Mode**

   ```bash
   docker-compose up -d
   ```

   - Starts the services in detached mode (background).

3. **Stop Services**

   ```bash
   docker-compose down
   ```

   - Stops and removes containers defined in the `docker-compose.yml`.

4. **View Logs for All Services**

   ```bash
   docker-compose logs
   ```

   - Displays logs for all services defined in `docker-compose.yml`.

5. **Build or Rebuild Services**
   ```bash
   docker-compose build
   ```
   - Builds or rebuilds the services defined in the `docker-compose.yml` file.

---

### **Cleaning Up Docker**

1. **Remove All Stopped Containers**

   ```bash
   docker container prune
   ```

   - Removes all stopped containers.

2. **Remove All Unused Images**

   ```bash
   docker image prune
   ```

   - Removes all unused images that are not being used by any container.

3. **Remove Unused Volumes**

   ```bash
   docker volume prune
   ```

   - Removes all unused volumes that are not associated with any containers.

4. **Remove All Stopped Containers, Networks, and Dangling Images**
   ```bash
   docker system prune -a
   ```
   - Cleans up all stopped containers, unused networks, and dangling images (images not associated with any containers).

---

Here’s a completed version of the document:

---

### **Other Useful Commands**

1. **Update Docker Engine**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce
   ```

   - Installs or updates Docker on Ubuntu-based systems.

2. **Check Docker Version**

   ```bash
   docker --version
   ```

   - Displays the version of Docker installed on your system.

3. **Get Docker Info**
   ```bash
   docker info
   ```
   - Displays system-wide information about Docker, including the number of containers, images, storage drivers, and more.

---

## **Building Custom Images with Docker**

### Dockerfile Example

```dockerfile
# Use the official Alpine image as the base image
FROM alpine:latest

# Install Redis package from the Alpine repository
RUN apk add --no-cache redis

# Set the default command to run Redis server
CMD ["redis-server"]
```

1. **Build the Image**

   ```bash
   docker build -t image-name .
   ```

   - Builds a Docker image from the `Dockerfile` in the current directory and tags it as `image-name`.

2. **Run the Container**
   ```bash
   docker run image-name
   ```
   - Runs a container using the created `image-name`.

---

### **Rebuilding with Cache**

To rebuild a Docker image without using the cache:

```bash
docker build --no-cache -t image-name .
```

- Forces Docker to ignore the cache and rebuild every layer from scratch.

---

### **Tagging an Image**

To add a specific tag to your image:

```bash
docker tag image-name your-repo/image-name:tag
```

- Tags your image with a specific name and version (e.g., `latest`, `v1.0`).

Push the tagged image to a registry:

```bash
docker push your-repo/image-name:tag
```

---

## **Docker Compose**

1. **Start Services**

   ```bash
   docker-compose up
   ```

   - Starts services defined in the `docker-compose.yml` file.

2. **Rebuild and Start Services**

   ```bash
   docker-compose up --build
   ```

   - Rebuilds images before starting services.

3. **Stop Services**
   ```bash
   docker-compose down
   ```
   - Stops and removes containers, networks, and volumes created by `docker-compose up`.

---

### **Automatic Restart of Containers**

To ensure a container restarts automatically after failure or reboot, use the `--restart` flag:

```bash
docker run --restart unless-stopped image-name
```

- **Restart Policies**:
  - `no`: Do not restart the container (default).
  - `always`: Always restart the container.
  - `unless-stopped`: Restart unless the container is stopped manually.
  - `on-failure`: Restart the container only if it exits with a non-zero status.
