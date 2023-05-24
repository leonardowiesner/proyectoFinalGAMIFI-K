<?php

use Laravel\Sanctum\Sanctum;
return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1')),

    'middleware' => [
        'verify_csrf_token' => \App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => \App\Http\Middleware\EncryptCookies::class,
    ],

    'prefix' => 'sanctum',

    'guard' => 'web',

    'expiration' => null,

    'tokens' => [
        'cannot_refresh' => false,
        'can_revoke' => false,
        'name' => env('SANCTUM_TOKEN_NAME', 'Laravel Sanctum'),
        'lifetime' => env('SANCTUM_TOKEN_LIFETIME', null),
        'provider' => null,
    ],
];