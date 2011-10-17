/* 
-- Geocities.js
-- Making the web unbeautiful again 
-- Copyright Damon Oehlman 2011
-- Released under an MIT license
*/
Geocities = (function() {
    
    // include some helpers from tile5, DOM is included as a hack (will fix)
    var DOM = {};
    /**
    # T5.Animator
    The animator centralizes the callbacks requiring regular update intervals in Tile5.  
    This simple utility module exposes `attach` and `detach` methods that allow other
    classes in Tile5 to fire callbacks on a regular basis without needing to hook into
    the likes of `setInterval` to run animation routines.
    
    The animator will intelligently use `requestAnimationFrame` if available, and if not
    will fall back to a `setInterval` call that will run optimized for 60fps.
    
    ## Methods
    */
    var Animator = (function() {
        
        /* internals */
        
        var FRAME_RATE = 1000 / 60,
            TEST_PROPS = [
                'r',
                'webkitR',
                'mozR',
                'oR',
                'msR'
            ],
            callbacks = [],
            frameIndex = 0,
            useAnimFrame = DOM && (function() {
                for (var ii = 0; ii < TEST_PROPS.length; ii++) {
                    window.animFrame = window.animFrame || window[TEST_PROPS[ii] + 'equestAnimationFrame'];
                } // for
                
                return animFrame;
            })();
        
        function frame(tickCount) {
            // increment the frame index
            frameIndex++;
    
            // set the tick count in the case that it hasn't been set already
            tickCount = DOM && useAnimFrame ? (window.mozAnimationStartTime || 
                tickCount || 
                new Date().getTime()) : new Date().getTime();
            
            // iterate through the callbacks
            for (var ii = callbacks.length; ii--; ) {
                var cbData = callbacks[ii];
    
                // check to see if this callback should fire this frame
                if (frameIndex % cbData.every === 0) {
                    cbData.cb(tickCount);
                } // if
            } // for
            
            // schedule the animator for another call
            if (useAnimFrame) {
                animFrame(frame);
            } // if
        } // frame
        
        /* exports */
        
        /**
        ### attach(callback, every)
        Attach `callback` to the animation callback loop.  If specified, `every` 
        specified the regularity (in ms) with which this particular callback should be 
        fired.  If not specified, the callback is fired for every animation frame (which
        is approximately 60 times per second).
        */
        function attach(callback, every) {
            callbacks[callbacks.length] = {
                cb: callback,
                every: every ? round(every / FRAME_RATE) : 1
            };
        } // attach
        
        /**
        ### detach(callback)
        Remove `callback` from the animation callback loop.
        */
        function detach(callback) {
            // iterate through the callbacks and remove the specified one
            for (var ii = callbacks.length; ii--; ) {
                if (callbacks[ii].cb === callback) {
                    callbacks.splice(ii, 1);
                    break;
                } // if
            } // for
        } // detach
        
        // bind to the animframe callback
        useAnimFrame ? animFrame(frame) : setInterval(frame, 1000 / 60);
        
        return {
            attach: attach,
            detach: detach
        };
    })();


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
    
    effects.blink = function(element, opts) {
        // initialise options
        opts = opts || {};
        
        // specify that we need a transition on opacity
        var speed = this.requireTransition('opacity', element),
            lastTick = 0;
        
        return function(tickCount) {
            if (tickCount - lastTick > speed) {
                element.style.opacity = parseInt(element.style.opacity, 10) ? 0 : 1;
                lastTick = tickCount;
            } // if
        };
    };

    effects.marquee = function(element, opts) {
        // initialise options
        opts = opts || {};
        
        // clone the node
        var copy = document.cloneNode(element, true);
        
        this.applyStyle(element, [
            { name: 'overflow', value: 'hidden' }
        ]);
    };

    effects.spinny = function(element, opts) {
        // initialise options
        opts = opts || {};
        
        // get a manipulatable element
        var speed = this.requireTransition('transform', element),
            lastTick = 0,
            flipped = false;
        
        return function(tickCount) {
            if (tickCount - lastTick > speed) {
                this.applyStyle(element, 'transform', 'rotateY(' + (flipped ? '-360' : '0') + 'deg)');
    
                lastTick = tickCount;
                flipped = !flipped;
            } // if
        };
    };

    
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