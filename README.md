# <center>**PhenixGames**</center>

## **Installation Guide**

### **Add vue server**

> Execute this inside the root directory

```cmd
git clone https://github.com/PhenixGames/phenixgames-v3-vue.git
```

### **Requirements:**

```txt
- docker
- curl
- node
- pm2
```

### Installation

1. Install docker (<https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04>)
   <br>

2. Install curl `sudo apt install curl`

<br>

3. Install node `curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh`

<br>

4. Install pm2 `npm i -g pm2`

<br>

5. Create Docker network `docker network create rage_network`

<br>

6. Start docker `docker compose up -d`

<br>

# Production

1. Add File `docker-compose.override.yml`
2. Insert code:
```yml
version: '3.9'


services:
    mysql:
        environment:
            MYSQL_ROOT_PASSWORD: ...
            MYSQL_DATABASE: phenixgames_v3
            MYSQL_USER: ...
            MYSQL_PASSWORD: ...
            MYSQL_PORT: 3306
            MYSQL_HOSTNAME: mysql
```

<br>


# **Important commands**

```cmd
docker compose up -d //start containers
docker compose down //stop containers
docker compose exec [container_name] bash //enter terminal of container
docker logs --follow [container_name] //see logs & follow them
docker rmi $(docker images -a -q) // delete all images on you machine
```
