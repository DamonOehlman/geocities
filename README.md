# geocities.js

This is a JS library designed to help
[progressively enhance](http://www.alistapart.com/articles/understandingprogressiveenhancement)
your site with what I like to call some of the _magic of the web_.


[![NPM](https://nodei.co/npm/geocities.png)](https://nodei.co/npm/geocities/)


## Usage

If you would like to have a play with Geocities.js (and let's be honest, who wouldn't) then you
can do it by simply including the geocities.js file somewhere in your page, and add
`data-effects` elements to your page elements.

```html
<!doctype html>
<html class="no-js" lang="en">
<head>
<title>Geocities.js Demos</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<h1 data-effects="spinny">Welcome</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros <span data-effects="spinny blink">libero</span>, egestas elementum lobortis ut, posuere et nisl. Suspendisse hendrerit massa ac massa mollis mollis. Nunc eleifend lacus ut sem porta sed interdum orci condimentum. Nam lacinia tristique nunc ac hendrerit. Vivamus fermentum pharetra neque ut tincidunt. Nullam tempor viverra nisi, ac condimentum orci blandit eu. Integer at elit purus. Donec eu libero vel orci posuere accumsan. Suspendisse odio arcu, vulputate eu sodales ut, pulvinar nec leo.</p>
<p>Fusce id odio sollicitudin justo mattis mattis in porttitor lectus. Nullam elementum adipiscing tellus, nec dictum leo hendrerit quis. Vivamus dapibus tellus nec lacus porttitor luctus. Ut vitae risus neque. Aenean consectetur cursus metus a sagittis. In hac habitasse platea dictumst. Vivamus dictum ultrices sodales. Donec sed lacus in diam ultricies tempor. Quisque vel nunc metus, at venenatis massa.</p>
<div data-effects="spinny" style="position: absolute; width: 200px; height: 200px; background: red;"></div>
<script src="../dist/geocities.js"></script>
</body>
</html>

```

## Implementation Status

### Completed

- blink
- spinny (horizontal animated flip)

### Incomplete

- marquee

## License(s)

### ISC

Copyright (c) 2014, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
