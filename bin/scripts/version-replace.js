const fs = require( 'fs' );
const replace = require( 'replace-in-file' );

const pluginFiles = [
    'assets/**/*',
    'includes/**/*',
    'templates/**/*',
    'wepos.php',
];

const { version } = JSON.parse( fs.readFileSync( 'package.json' ) );

replace( {
    files: pluginFiles,
    from: /WEPOS_SINCE/g,
    to: version,
} );
