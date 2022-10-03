#!/bin/sh
input ="$1"
echo $input
if [$input -eq "Start" ]
then
echo "Start script started"
cd ./pg_vue_server
pm2 start "npm run serve" --name rage_vue
echo "vue server started"
cd ..
pm2 logs
sleep 3
pm2 start ragemp-server --name rage_server
echo "rage server started"
fi
if ["$1" -eq "kill" ]
then
echo "Kill script Gestartet"
pm2 stop rage_server
pm2 stop rage_vue
echo "Server stopped"
pm2 delete rage_server
pm2 delete rage_vue
echo "Server Deleted"
fi
if ["$1" -eq "pull" ]
then
pm2 stop rage_server
pm2 stop rage_vue
echo "Server Ausgeschaltet"
pm2 delete rage_server
pm2 delete rage_vue
echo "Server Deleted"
git pull
sleep .5
cd ./pg_vue_server
pm2 start "npm run serve" --name rage_vue
echo "vue server started"
cd ..
pm2 logs
sleep 3
pm2 start ragemp-server --name rage_server
echo "rage server started"
fi
if ["$1" -eq "Restart"]
then
echo "Restart script started"
pm2 stop rage_server
pm2 stop rage_vue
echo "Server stopped"
pm2 delete rage_server
pm2 delete rage_vue
echo "Server Deleted"
echo "Starting Restart"
cd ./pg_vue_server
pm2 start "npm run serve" --name rage_vue
echo "vue server started"
cd ..
pm2 logs
sleep 3
pm2 start ragemp-server --name rage_server
echo "rage server started"
fi
echo "script by David"