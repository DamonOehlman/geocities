/* 
-- Geocities.js
-- Making the web unbeautiful again 
-- Copyright Damon Oehlman 2011
-- Released under an MIT license
*/
Geocities = (function() {
    
    // include some helpers from tile5, DOM is included as a hack (will fix)
    var DOM = {};
    //= tile5!src/core/animator

    /* internals */
    
    var defaultEasing = (document.body.dataset || {}).easing || 'linear',
        defaultSpeed = (document.body.dataset || {}).speed || 1000,
        effects = {},
        prefixes = ['-webkit-', '-moz-', '-o-'],
        tweakers = [],
        elementCounter = 0,
        elementTransitions = {},
        reWS = /[\s|\,]+/,
        animator;
    
    //= modules/blink
    //= modules/marquee
    //= modules/spinny
    
    function buildTransition(element) {
        var transitions = elementTransitions[element.id],
            transitionList = [];
        
        // if we have transitions, then create the transition property
        if (transitions) {
            // determine the speed
            var speed = (element.dataset || {}).speed || defaultSpeed,
                easing = (element.dataset || {}).easing || defaultEasing;
                
            // create the transition list
            _.each(_.uniq(transitions), function(transition) {
                transitionList.push(transition + ' ' + (speed / 1000) + 's ' + easing);
            });
            
            // get the unique transitions
            console.log(transitionList.join(', '));
            applyStyle(element, 'transition', transitionList.join(','));
        } // if
    } // buildTransition
    
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
    
    /* exports */
    
    function applyStyle(element, property, value) {
        var properties = typeof property == 'string' ? [{
                name: property,
                value: value
            }] : properties;
            
        _.each(properties, function(propData) {
            var applyPrefixes = typeof element.style[propData.name] == 'undefined';
            
            // iterate through the prefixes and apply the property
            _.each(applyPrefixes ? prefixes : [], function(prefix) {
                var vendorProp = prefix + propData.name;
                
                // if the property is supported then use it
                if (typeof element.style[vendorProp] != 'undefined') {
                    element.style[vendorProp] = propData.value;
                } // if
            });
        });
    } // applyStyle
    
    function makeAwesome() {
        // iterate through the elements and look through the effects in the dataset
        _.each(document.querySelectorAll('[data-effects]'), function(element) {
            var elementEffects = ((element.dataset || {}).effects || '').split(reWS),
                effectTarget = cloneEl(element),
                effectIdx, effect;
            
            // iterate through the effects and "sauce up" the element
            _.each(elementEffects, function(effectName) {
                // get the saucer for the effect
                effect = effects[effectName];
                
                // if we have an effect, then process the element
                if (effect) {
                    tweakers.push(effect.call(_this, effectTarget));
                } // if

                // build the transition property for the element
                buildTransition(effectTarget);
            });
        });
    } // makeAwesome
    
    function requireTransition(propertyName, element) {
        var applyPrefixes = typeof element.style[propertyName] == 'undefined';
        
        // check that the element has an id
        element.id = element.id || 'geocities' + elementCounter++;
        
        // if we have prefixes on the property, then append the variations
        if (applyPrefixes) {
            for (var ii = 0; ii < prefixes.length; ii++) {
                var vendorPrefix = prefixes[ii] + propertyName;
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
    } // requireTransition
    
    // attach the animation loop
    animator = Animator.attach(function(tickCount) {
        for (var ii = tweakers.length; ii--; ) {
            tweakers[ii].call(_this, tickCount);
        } // for
    });
    
    window.addEventListener('load', makeAwesome, false);
    
    var _this = {
        applyStyle: applyStyle,
        makeAwesome: makeAwesome,
        requireTransition: requireTransition
    };
    
    return _this;
})();