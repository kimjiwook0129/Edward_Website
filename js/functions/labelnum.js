const kilo = 1000,
  mil = kilo * kilo,
  bil = kilo * mil;

function labelNum(_num) {
  _num = parseInt(_num);
  if (_num < kilo) return _num;
  else {
    var numScale = " K";
    if (_num >= bil) {
      numScale = " B";
      _num /= bil;
    } else if (_num >= mil) {
      numScale = " M";
      _num /= mil;
    } else {
      _num /= kilo;
    }
    return _num
      .toFixed(2)
      .toString()
      .concat(numScale);
  }
}
