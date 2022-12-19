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

2. Install docker compose (<https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04>)

<br>

3. Start docker `docker compose up -d`

<br>

4. Clone this repository `git clone https://github.com/PhenixGames/phenixgames-v3.git `

<br>

5. Clone vue repository `git clone https://github.com/PhenixGames/phenixgames-v3-vue.git `

<br>

# Production

1. Add File `docker-compose.override.yml`
2. Insert code:

```yml
services:
    mysql:
        environment:
            - MYSQL_ROOT_PASSWORD=root
            - MYSQL_DATABASE=phenixgames-v3
            - MYSQL_USER=xxxx
            - MYSQL_PASSWORD=xxxxxx
            - MYSQL_PORT=3306

    vue:
        build:
            context: ./phenixgames-v3-vue
            dockerfile: ./.docker/Dockerfile.prod
```

<br>

# **Important commands**

```cmd
docker compose up -d //start containers
docker compose down //stop containers
docker compose exec [container_name] bash //enter terminal of container
docker logs --follow [container_name/id] //see logs & follow them
docker rmi $(docker images -a -q) // delete all images on you machine
docker system prune -a //hardcore delete everything
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' name_or_id //get ip of container
```

# Pre Push events

Copy `pre-push` file to `.git/hooks/`