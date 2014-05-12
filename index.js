/* jshint node: true */
'use strict';

var raf = require('fdom/raf');
var qsa = require('fdom/qsa');
var _ = require('underscore');

/**
  # geocities.js

  This is a JS library designed to help
  [progressively enhance](http://www.alistapart.com/articles/understandingprogressiveenhancement)
  your site with what I like to call some of the _magic of the web_.

  ## Usage

  If you would like to have a play with Geocities.js (and let's be honest, who wouldn't) then you
  can do it by simply including the geocities.js file somewhere in your page, and add
  `data-effects` elements to your page elements.

  <<< demos/multi.html

  ## Implementation Status

  ### Completed

  - blink
  - spinny (horizontal animated flip)

  ### Incomplete

  - marquee
**/

var defaultEasing = (document.body.dataset || {}).easing || 'linear';
var defaultSpeed = (document.body.dataset || {}).speed || 1000;
var prefixes = ['-webkit-', '-moz-', '-o-'];
var tweakers = [];
var elementCounter = 0;
var elementTransitions = {};
var reWS = /[\s|\,]+/;

var effects = {
  blink: require('./effects/blink.js'),
  marquee: require('./effects/marquee.js'),
  spinny: require('./effects/spinny.js')
};

function buildTransition(element) {
  var transitions = elementTransitions[element.id];
  var transitionList = [];
  var speed;
  var easing;

  // if we have transitions, then create the transition property
  if (transitions) {
    // determine the speed
    speed = (element.dataset || {}).speed || defaultSpeed;
    easing = (element.dataset || {}).easing || defaultEasing;

    // create the transition list
    _.each(_.uniq(transitions), function(transition) {
      transitionList.push(transition + ' ' + (speed / 1000) + 's ' + easing);
    });

    // get the unique transitions
    console.log(transitionList.join(', '));
    applyStyle(element, 'transition', transitionList.join(','));
  } // if
}

function cloneEl(element) {
  var absElement = element;
  if (element.style.position !== 'absolute') {
    // create a copy of the element
    absElement = element.cloneNode(true);

    // hide the original element
    element.style.visibility = 'hidden';

    // insert the cloned element before the target element
    element.parentNode.insertBefore(absElement, element);

    // set the copy to absolute position
    absElement.style.position = 'absolute';
    absElement.style['margin-top'] = '0';
  } // if

  // return the copied node
  return absElement;
} // cloneEl

var applyStyle = exports.applyStyle = function(element, property, value) {
  var properties = typeof property == 'string' ? [{
    name: property,
    value: value
  }] : properties;

  (properties || []).forEach(function(propData) {
    var applyPrefixes = typeof element.style[propData.name] == 'undefined';

    // iterate through the prefixes and apply the property
    (applyPrefixes ? prefixes : ['']).forEach(function(prefix) {
      var vendorProp = prefix + propData.name;

      // if the property is supported then use it
      if (typeof element.style[vendorProp] != 'undefined') {
        element.style[vendorProp] = propData.value;
      } // if
    });
  });
};

var makeAwesome = exports.makeAwesome = function() {
  qsa('[data-effects]').forEach(function(element) {
    var elementEffects = ((element.dataset || {}).effects || '').split(reWS);
    var effectTarget = cloneEl(element);
    var effectIdx;

    // iterate through the effects and "sauce up" the element
    elementEffects.forEach(function(effectName) {
      // get the saucer for the effect
      var effect = effects[effectName];

      // if we have an effect, then process the element
      if (effect) {
        tweakers.push(effect.call(exports, effectTarget));
      } // if

      // build the transition property for the element
      buildTransition(effectTarget);
    });
  });
};

var requireTransition = exports.requireTransition = function(propertyName, element) {
  var applyPrefixes = typeof element.style[propertyName] == 'undefined';
  var ii;
  var vendorPrefix;

  // check that the element has an id
  element.id = element.id || 'geocities' + elementCounter++;

  // if we have prefixes on the property, then append the variations
  if (applyPrefixes) {
    for (ii = 0; ii < prefixes.length; ii++) {
      vendorPrefix = prefixes[ii] + propertyName;
      if (typeof element.style[vendorPrefix] != 'undefined') {
        propertyName = vendorPrefix;
        break;
      } // if
    } // for
  } // if

  // add the transitionns to the element transitions
  if (! elementTransitions[element.id]) {
    elementTransitions[element.id] = [];
  } // if

  elementTransitions[element.id].push(propertyName);

  // return the value of the speed data, because it might be needed by the tweaker
  return (element.dataset || {}).speed || defaultSpeed;
};

// attach the animation loop
raf(function animate() {
  var tickCount = Date.now();

  for (var ii = tweakers.length; ii--; ) {
    tweakers[ii].call(exports, tickCount);
  } // for

  raf(animate);
});

window.addEventListener('load', makeAwesome, false);
