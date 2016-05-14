var LabColor = require('./labColor');
var byteConverter = require('./byteConverter');

var ColorInterpolationProvider = function(options) {
  this.numberOfDimensions = 3;

  this.createInstance = function (position, interpolated) {
    var red = byteConverter(interpolated[0]);
    var green = byteConverter(interpolated[1]);
    var blue = byteConverter(interpolated[2]);

    return { r: red, g: green, b: blue };
  };

  this.relativePosition = function (fromColor, toColor) {
    var distance = function (a, b) { return (a - b) * (a - b); }
    var a = new LabColor(fromColor);
    var b = new LabColor(toColor);
    var differences = distance(a.l, b.l) + distance(a.a, b.a) + distance(a.b, b.b);
    return Math.sqrt(differences);
  };
}

module.exports = ColorInterpolationProvider;
