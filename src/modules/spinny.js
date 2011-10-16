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