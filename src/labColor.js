var LabColor = function (rgbColor) {
  var Epsilon = 0.008856; // 216/24389
  var Kappa = 903.3; // 24389/27

  var pivotRgb = function (n) {
    return (n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92) * 100.0;
  };
  var pivotXyz = function (n) {
    return n > Epsilon ? Math.pow(n, 1.0 / 3.0) : (Kappa * n + 16.0) / 116.0;
  }

  var r = pivotRgb(rgbColor.r / 255.0);
  var g = pivotRgb(rgbColor.g / 255.0);
  var b = pivotRgb(rgbColor.b / 255.0);
  var x = pivotXyz((r * 0.4124 + g * 0.3576 + b * 0.1805) / 95.047);
  var y = pivotXyz((r * 0.2126 + g * 0.7152 + b * 0.0722) / 100.000);
  var z = pivotXyz((r * 0.0193 + g * 0.1192 + b * 0.9505) / 108.883);

  this.l = Math.max(0.0, 116.0 * y - 16.0);
  this.a = 500.0 * (x - y);
  this.b = 200.0 * (y - z);
}

module.exports = LabColor;
