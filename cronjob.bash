ps cax | grep node > /dev/null
if [ $? -eq 0 ]; then
  echo "Process running."
else
  echo "Process not running."
  env NODE_ENV=production /home/v0gyb0p99lkn/.nvm/versions/node/v10.15.0/bin/node /home/v0gyb0p99lkn/public_html/src/bin/www
fi