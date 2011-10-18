# Geocities.js

This is a JS library designed to help [progressively enhance](http://www.alistapart.com/articles/understandingprogressiveenhancement) your site with what I like to call some of the _magic of the web_.

## Usage

If you would like to have a play with Geocities.js (and let's be honest, who wouldn't) then you can do it by simply including the geocities.js file somewhere in your page, and add `data-effects` elements to your page elements.

```html
<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Geocities.js Demos</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body>
	<h1 data-effects="spinny">Welcome</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros libero, egestas elementum lobortis ut, posuere et nisl. Suspendisse hendrerit massa ac massa mollis mollis. Nunc eleifend lacus ut sem porta sed interdum orci condimentum. Nam lacinia tristique nunc ac hendrerit. Vivamus fermentum pharetra neque ut tincidunt. Nullam tempor viverra nisi, ac condimentum orci blandit eu. Integer at elit purus. Donec eu libero vel orci posuere accumsan. Suspendisse odio arcu, vulputate eu sodales ut, pulvinar nec leo.</p>
	<p>Fusce id odio sollicitudin justo mattis mattis in porttitor lectus. Nullam elementum adipiscing tellus, nec dictum leo hendrerit quis. Vivamus dapibus tellus nec lacus porttitor luctus. Ut vitae risus neque. Aenean consectetur cursus metus a sagittis. In hac habitasse platea dictumst. Vivamus dictum ultrices sodales. Donec sed lacus in diam ultricies tempor. Quisque vel nunc metus, at venenatis massa.</p>
	<div data-effects="spinny" style="position: absolute; width: 200px; height: 200px; background: red;"></div>
<script src="https://raw.github.com/DamonOehlman/geocities.js/master/geocities.js"></script>
</body>
</html>
```

## Available Effects

- blink (configurable via `data-speed`)
- spinny (configurable via `data-speed`)
