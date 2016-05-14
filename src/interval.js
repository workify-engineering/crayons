var Interval = function (options) {
  var reversed = (options.start > options.end);
  this.isReversed = reversed;
  this.start = reversed ? options.end : options.start;
  this.isStartIncluded = reversed ? options.isEndIncluded : options.isStartIncluded;
  this.end = reversed ? options.start : options.end;
  this.isEndIncluded = reversed ? options.isStartIncluded : options.isEndIncluded;
  this.size = this.end - this.start;

  this.getValueAt = function (percentage) {
    return this.start + (percentage * this.size);
  }

  this.liesInInterval = function (value) {
    var start = value < this.start ? -1 : value > this.start ? 1 : 0;
    var end   = value < this.end   ? -1 : value > this.end   ? 1 : 0;
    return (start > 0 || (start === 0 && this.isStartIncluded))
        && (end < 0 || (end === 0 && this.isEndIncluded));
  }

  this.getPercentageFor = function(position) {
    if (this.size === 0) {
      return this.liesInInterval(position) ? 1.0 : -1.0;
    }

    var options = { start: this.start, end: position, isStartIncluded: true, isEndIncluded: true };
    var positionRange = new Interval(options);
    var percentage = positionRange.size / this.size;
    var isPositionBeforeInterval = this.isReversed ? (position > this.start) : (position < this.start);
    if (isPositionBeforeInterval) {
      percentage *= -1;
    }
    return percentage;
  }

  this.expandTo = function (value, include) {
    var cachedStart = this.start;
    var cachedEnd = this.end;
    var cachedIsStartIncluded = this.isStartIncluded;
    var cachedIsEndIncluded = this.isEndIncluded;

    if (value <= this.start) {
      cachedStart = value;
      cachedIsStartIncluded |= include;
    }
    if (value >= this.end) {
      cachedEnd = value;
      cachedIsEndIncluded |= include;
    }

    var extended = new Interval({
      start: cachedStart,
      isStartIncluded: cachedIsStartIncluded,
      end: cachedEnd,
      isEndIncluded: cachedIsEndIncluded
    });

    return this.isReversed ? extended.reverse() : extended;
  }

  this.reverse = function () {
    var interval = new Interval(this);
    interval.isReversed = !interval.isReversed;
    return interval;
  }
}

module.exports = Interval;
