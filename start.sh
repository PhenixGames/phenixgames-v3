#!/bin/sh
cd ./pg_vue_server
pm2 start "npm run serve" --name rage_vue
echo "vue server started"
cd ..
pm2 logs
sleep 3
pm2 start ragemp-server --name rage_server
echo "rage server started"