//= underscore!

Geocities = (function() {
    
    // include some helpers from tile5
    var DOM = {};
    //= tile5!src/core/animator

    /* internals */
    
    var effects = {},
        prefixes = ['-webkit-', '-moz-', '-o-', ''],
        tweakers = [],
        hasPrefixes = {
            transition: true,
            transform: true
        },
        reWS = /[\s|\,]+/,
        animator;
    
    //= modules/blink
    //= modules/marquee
    //= modules/spinny
    
    /* exports */
    
    function applyStyle(element, property, value) {
        var properties = typeof property == 'string' ? [{
                name: property,
                value: value
            }] : properties;
            
        _.each(properties, function(propData) {
            var applyPrefixes = hasPrefixes[propData.name];
            
            // iterate through the prefixes and apply the property
            _.each(applyPrefixes ? prefixes : [], function(prefix) {
                element.style[prefix + propData.name] = propData.value;
            });
        });
    } // applyStyle
    
    function getAbsolute(element) {
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
    } // getAbsolute
    
    function makeAwesome() {
        // iterate through the elements and look through the effects in the dataset
        _.each(document.querySelectorAll('[data-effects]'), function(element) {
            var elementEffects = ((element.dataset || {}).effects || '').split(reWS),
                effectIdx, effect;
            
            // iterate through the effects and "sauce up" the element
            _.each(elementEffects, function(effectName) {
                // get the saucer for the effect
                effect = effects[effectName];
                
                // if we have an effect, then process the element
                if (effect) {
                    tweakers.push(effect.call(_this, element));
                } // if
            });
        });
    } // makeAwesome
    
    // attach the animation loop
    animator = Animator.attach(function(tickCount) {
        for (var ii = tweakers.length; ii--; ) {
            tweakers[ii].call(_this, tickCount);
        } // for
    });
    
    window.addEventListener('load', makeAwesome, false);
    
    var _this = {
        applyStyle: applyStyle,
        getAbsolute: getAbsolute,
        makeAwesome: makeAwesome
    };
    
    return _this;
})();