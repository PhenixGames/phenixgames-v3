#!/bin/bash

type=$1


function startServer () {
    echo "$(tput setaf 1)STARTING ALL SERVER"
    cd ./pg_vue_server
    pm2 start "npm run serve" --name rage_vue
    echo "vue server started"
    cd ..
    sleep 2
    pm2 start ragemp-server --name rage_server
    pm2 logs
}

function restart () {
    echo "$(tput setaf 1)RESTARTING ALL SERVER"
    killServer
    startServer
}

function killServer () {
    echo "$(tput setaf 1)KILLING ALL SERVER"
    pm2 stop rage_server || echo "$(tput setaf 1)ERROR STOPPING RAGE SERVER"
    pm2 stop rage_vue || echo "$(tput setaf 1)ERROR STOPPING VUE SERVER" 
    pm2 delete rage_server || echo "$(tput setaf 1)ERROR DELETING RAGE SERVER" 
    echo "rage server killed"
    pm2 delete rage_vue || echo "$(tput setaf 1)ERROR DELETING VUE SERVER"
    echo "vue server killed"
}

function pull () {
    git pull
    cd ./pg_vue_server
    git pull
    cd ..
    restart
}


if [ -z $type ]; 
then
    echo "Please specify a type"
    exit 1
fi

if [ $type == "start" ]; 
then
    startServer
fi

if [ $type == "restart" ]; 
then
    restart
fi
if [ $type == "kill" ]; 
then
    killServer
fi
if [ $type == "pull" ]; 
then
    pull
fi