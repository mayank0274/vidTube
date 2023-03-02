// webpack.mix.js

let mix = require('laravel-mix');

mix.js('views/js/main.js', 'public/js').setPublicPath('public/js/');

mix.js('views/js/videoAction.js', 'public/js/videoAction.js').setPublicPath('public/js/');

mix.js('views/js/videobox.js', 'public/js/videobox.js').setPublicPath('public/js/');

mix.js('views/js/profile.js', 'public/js/profile.js').setPublicPath('public/js/');

mix.js('views/js/verifyOtp.js', 'public/js/verifyOtp.js').setPublicPath('public/js/');

mix.js('views/js/forgotPass.js', 'public/js/forgotPass.js').setPublicPath('public/js/');

mix.js('views/js/admin.js', 'public/js/admin.js').setPublicPath('public/js/');

mix.js('views/js/utilityFunctions.js', 'public/js/utilityFunctions.js').setPublicPath('public/js/');