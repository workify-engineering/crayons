var ByteConverter = function (value) {
  var integer = Math.round(value);
  if (0 > integer) {
    return 0;
  }
  if (255 < integer) {
    return 255;
  }
  return integer;
};

module.exports = ByteConverter;
