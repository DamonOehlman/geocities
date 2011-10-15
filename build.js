var interleave = require('interleave'),
    fs = require('fs'),
    config = {
        aliases: {
            'underscore': '/development/projects/github/underscore/underscore.js',
            'tile5': '/development/projects/github/DamonOehlman/tile5/$1',
            'interact': 'github://DamonOehlman/interact/interact.js'
        }
    };

// build each of the builds
interleave('src', {
    multi: 'pass',
    path: '.',
    config: config
});