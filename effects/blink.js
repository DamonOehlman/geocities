module.exports = function(element, opts) {
  // specify that we need a transition on opacity
  var speed = this.requireTransition('opacity', element);
  var lastTick = 0;

  return function(tickCount) {
    if (tickCount - lastTick > speed) {
      element.style.opacity = parseInt(element.style.opacity, 10) ? 0 : 1;
      lastTick = tickCount;
    } // if
  };
};
