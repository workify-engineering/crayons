var Interval = require('./interval');

var KeyPointCollection = function(provider) {
  this.provider = provider;
  this.data = [];

  var search = function (arr, position) {
    var current, next, currentIndex, nextIndex, result;
    for (var i = 0; i < arr.length; i++) {
      current = arr[i]; currentIndex = i;
      if (position < current.position) {
        continue;
      }
      next = arr[i + 1]; nextIndex = i + 1;
      result = { current: current, next: next, currentIndex: currentIndex, nextIndex: nextIndex };
    }
    result.next = result.next || {};
    return result;
  };

  this.add = function (value) {
    var position = 0.0;
    if (this.data.length > 0) {
      var last = this.data[this.data.length - 1];
      var distance = this.distanceBetween(last.value, value);
      position = last.position + distance;
    }
    var newKeyPoint = {
      position: position,
      value: value
    };
    this.dataRange = (!this.dataRange) ? new Interval({ start: 0.0, end: 0.0, startIncluded: true, endIncluded: true }) : this.dataRange.expandTo(position, true);
    this.data.push(newKeyPoint);
  };

  this.distanceBetween = function (fromColor, toColor) {
    var distance = this.provider.relativePosition(fromColor, toColor);
    return Math.abs(distance);
  };

  this.find = function (position) {
    var result = search(this.data, position);
    return result;
  };

  this.getValues = function(smallerIndex, biggerIndex) {
    var p0 = this.data[smallerIndex !== 0 ? smallerIndex - 1 : smallerIndex];
    var p1 = this.data[smallerIndex];
    var p2 = this.data[biggerIndex];
    var p3 = this.data[biggerIndex !== this.data.length - 1 ? biggerIndex + 1 : biggerIndex];

    return [
      [p0.value.r, p0.value.g, p0.value.b],
      [p1.value.r, p1.value.g, p1.value.b],
      [p2.value.r, p2.value.g, p2.value.b],
      [p3.value.r, p3.value.g, p3.value.b]
    ];
  };
}

module.exports = KeyPointCollection;
