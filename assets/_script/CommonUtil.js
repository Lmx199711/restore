Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonUtil = undefined;
var exp_CommonUtil = function () {
  function _ctor() {}
  _ctor.getSameComFromParent = function (e, t) {
    var o = [];
    for (var i = 0; i < e.numChildren; i++) {
      var n = e.getChildAt(i);
      n.name.match(t) && o.push(n);
    }
    return o;
  };
  return _ctor;
}();
exports.CommonUtil = exp_CommonUtil;