effects.marquee = function(element, opts) {
    // initialise options
    opts = opts || {};
    
    // clone the node
    var copy = document.cloneNode(element, true);
    
    this.applyStyle(element, [
        { name: 'overflow', value: 'hidden' }
    ]);
};