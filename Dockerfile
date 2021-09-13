FROM realworldio/laravel-sail

COPY . /var/www/html
RUN composer install

