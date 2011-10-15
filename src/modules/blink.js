effects.blink = function(element, opts) {
    // initialise options
    opts = opts || {};
    opts.speed = (element.dataset || {}).speed || opts.speed || 500;
    
    // apply the transition
    this.applyStyle(element, 'transition', 'opacity ' + (opts.speed / 1000) + 's');
    
    var lastTick = 0;
    return function(tickCount) {
        if (tickCount - lastTick > opts.speed) {
            element.style.opacity = parseInt(element.style.opacity, 10) ? 0 : 1;
            lastTick = tickCount;
        } // if
    };
};