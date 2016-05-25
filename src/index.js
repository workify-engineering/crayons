var ColorInterpolationProvider = require('./colorInterpolationProvider');
var KeyPointCollection = require('./keyPointCollection');
var Interval = require('./interval');

var box = function (colors) {

  var keyPoints = new KeyPointCollection(new ColorInterpolationProvider());
  for (var i = 0; i < colors.length; i++) {
    keyPoints.add(colors[i]);
  }

  var dynamicInterpolate = function (lowerIndex, largerIndex, position, percentage) {
    var provider = keyPoints.provider;
    var values = keyPoints.getValues(lowerIndex, largerIndex);

    var t = percentage;
    var t2 = Math.pow(t, 2);
    var t3 = Math.pow(t, 3);
    var baseFunction00 = (2 * t3) - (3 * t2) + 1;
    var baseFunction10 = t3 - (2 * t2) + t;
    var baseFunction01 = (-2 * t3) + (3 * t2);
    var baseFunction11 = t3 - t2;

    var tension = 0.5;
    var interpolated = new Array(provider.numberOfDimensions);
    for (var i = 0; i < interpolated.length; i++) {
      var tangentSmaller = tension * (values[2][i] - values[0][i]);
      var tangentBigger = tension * (values[3][i] - values[1][i]);
      var result = (baseFunction00 * values[1][i]) + (baseFunction01 * values[2][i]) + (baseFunction10 * tangentSmaller) + (baseFunction11 * tangentBigger);
      interpolated[i] = result;
    }
    return provider.createInstance(position, interpolated);
  };

  var pickColor = function (searchResult, position, interpolate) {
    var current = searchResult.current
      , next = searchResult.next;

    if (current.position === position) {
      return current.value;
    } else if (next.position === position) {
      return next.value;
    } else {
      var interval = new Interval({
        start: current.position,
        end: next.position,
        isStartIncluded: true,
        isEndIncluded: true
      });
      var percentage = interval.getPercentageFor(position);
      return interpolate(searchResult.currentIndex, searchResult.nextIndex, position, percentage);
    }
  }

  var interpolate = function (percentage) {
    percentage = (percentage || 0.0);
    percentage = percentage < 0.0 ? 0.0 : percentage > 1.0 ? 1.0 : percentage;

    var position = keyPoints.dataRange.getValueAt(percentage);
    var searchResult = keyPoints.find(position);
    var color = pickColor(searchResult, position, dynamicInterpolate);

    return '#' + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
  };

  return {
    pick: interpolate,
    generate: function (count) {
      var var picks = [];
      for (var i = count; i > 0; i--) {
        picks.push(interpolate(i / count));
      }
      return picks;
    }
  };
};

var crayons = {
  box: box
};

module.exports = crayons;
