cd ./pg_vue_server
pm2 start \"npm run serve\" --name rage_vue
cd ..
pm2 logs
pm2 start ragemp-server --name rage_server