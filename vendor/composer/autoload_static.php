<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite42f8b8b05a95820e39845bb59543628
{
    public static $files = array (
        '841780ea2e1d6545ea3a253239d59c05' => __DIR__ . '/..' . '/qiniu/php-sdk/src/Qiniu/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'Q' => 
        array (
            'Qiniu\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Qiniu\\' => 
        array (
            0 => __DIR__ . '/..' . '/qiniu/php-sdk/src/Qiniu',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite42f8b8b05a95820e39845bb59543628::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite42f8b8b05a95820e39845bb59543628::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
