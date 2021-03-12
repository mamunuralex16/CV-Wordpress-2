<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'cv' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'XK.O>OMvWsJ1CjlzkM`>O[.LOtMK{n8`4% >clw)T5n~@}-o$D,k%um%EK{~|MPm' );
define( 'SECURE_AUTH_KEY',  '.pA?Jp3bG&c5<85*hTz|keC635M1i@(5hIC5uwl/K7J+T)d2~~:Gtk7c45G!fWXD' );
define( 'LOGGED_IN_KEY',    'Qvj53V|48}?wM5qFe;OY01tu@]||GT? rf@L[9}=N3hLeq4w~=tY9[B&bXXIIs< ' );
define( 'NONCE_KEY',        '<!qNpr&@PCW/y}<2f}xvF)5ft[)zk$9aK-evSfpvYm?cd*ad.?|xn95@V^=o&D>d' );
define( 'AUTH_SALT',        'ze3: qL1j5J=Y`Cq%c{@iKv}QHlg6G-Yt St{UaAxsK#9/$m1Z8hb4F)Ne{%gU-(' );
define( 'SECURE_AUTH_SALT', 'nRwIK=`1i6^pL<|1r-9c]^:{S.K#klZ)Ll.s}xFC>Jj$67a;CRN,,I:UhsD~WG *' );
define( 'LOGGED_IN_SALT',   '.z{7)coR7 QVW~ *^_-su/Fm3@#jn;+>o:r%dWj`=Tv0<wQ^N+rRsLLA~(.)]pP0' );
define( 'NONCE_SALT',       'Cn:?!]jH@xNpUxoO&TMfe/h>OSM~vQ(7yp5lgk+ [`qJ~giL_)!X?B.!jhnhs5MH' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
