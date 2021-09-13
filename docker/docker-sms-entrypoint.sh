#!/bin/bash

cd /var/www/

rm -f public/storage
php artisan storage:link

mkdir -p /var/www/storage/app/public/student/imported
chown -R nginx:nginx /var/www/storage/
chown -R nginx:nginx /var/www/public/
chown -R nginx:nginx /var/www/logs/


# Update system configuration according to your need in ".env" file and create Database
php artisan migrate --force
make reload-permissions
chown -R nginx:nginx /var/www/storage/


bash /start.sh
