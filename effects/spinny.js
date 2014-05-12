module.exports = function(element, opts) {
  // get a manipulatable element
  var speed = this.requireTransition('transform', element);
  var lastTick = 0;
  var flipped = false;

  return function(tickCount) {
    if (tickCount - lastTick > speed) {
      this.applyStyle(element, 'transform', 'rotateY(' + (flipped ? '-180' : '0') + 'deg)');

      lastTick = tickCount;
      flipped = !flipped;
    } // if
  };
};
