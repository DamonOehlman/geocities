module.exports = function(element, opts) {
  return function(tickCount) {
    // clone the node
    var copy = document.cloneNode(element, true);

    this.applyStyle(element, [
      { name: 'overflow', value: 'hidden' }
    ]);
  };
};
