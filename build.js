var interleave = require('interleave'),
    fs = require('fs'),
    config = {
        aliases: {
            'tile5': '/development/projects/github/DamonOehlman/tile5',
            'interact': 'github://DamonOehlman/interact/interact.js'
        }
    };

// build each of the builds
interleave('src/js', {
    multi: 'pass',
    path: 'assets/js',
    config: config
});