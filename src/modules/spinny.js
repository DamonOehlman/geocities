effects.spinny = function(element, opts) {
    // initialise options
    opts = opts || {};
    opts.speed = (element.dataset || {}).speed || opts.speed || 1000;
    
    // get a manipulatable element
    var effectTarget = this.getAbsolute(element),
        lastTick = 0,
        flipped = false;
    
    // apply the transition
    this.applyStyle(effectTarget, 'transition', 'all ' + (opts.speed / 1000) + 's');
        
    return function(tickCount) {
        if (tickCount - lastTick > opts.speed) {
            this.applyStyle(effectTarget, 'transform', 'rotateY(' + (flipped ? '-360' : '0') + 'deg )');

            lastTick = tickCount;
            flipped = !flipped;
        } // if
    };
};