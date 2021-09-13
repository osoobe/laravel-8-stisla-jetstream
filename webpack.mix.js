const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .extract([
        'jquery', 'jquery-ui', 'bootstrap', 'animate.css', 'bootstrap-datepicker',
        'bootstrap-table', 'bootstrap-daterangepicker'
    ])
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery', 'jquery'],
        moment: ['window.moment', 'moment', 'dropzone'],
    })
    .sass('resources/scss/vendor.scss', 'public/css/')
    .sass('resources/scss/app.scss', 'public/css/')
    .webpackConfig(require('./webpack.config'));

mix.copy('node_modules/bootstrap-table/', 'public/vendor/bootstrap-table');
if (mix.inProduction()) {
    mix.version();
}
