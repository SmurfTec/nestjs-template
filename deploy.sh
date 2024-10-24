pm2 stop 0
git pull
npm install --legacy-peer-deps
npm run build
pm2 start 0