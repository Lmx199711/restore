Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataUtil = undefined;
var exp_DataUtil = function () {
  function _ctor() {}
  _ctor.radToAngle = function (e) {
    return 180 * e / Math.PI;
  };
  _ctor.angleToRad = function (e) {
    return e * Math.PI / 180;
  };
  _ctor.pDistance = function (e, t, o, i) {
    return Math.sqrt(Math.pow(e - o, 2) + Math.pow(t - i, 2));
  };
  _ctor.hitNode = function (e, t) {
    t.getWorldScale(this.tempV2);
    var o = t.width / 2 * this.tempV2.x;
    var i = t.height / 2 * this.tempV2.y;
    var n = t.worldPosition;
    var a = Math.abs(n.x - e.x);
    var s = Math.abs(n.y - e.y);
    return a < o && s < i;
  };
  _ctor.randomMinToMax = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e);
  };
  _ctor.randomByWeight = function (e) {
    for (var t = 0; t < e.length; t++) {
      for (var o = 0; o < e[t]; o++) {
        this.randomTempArr.push(t);
      }
    }
    var i = this.randomTempArr[this.randomMinToMax(0, this.randomTempArr.length - 1)];
    this.randomTempArr.length = 0;
    return i;
  };
  _ctor.tempV2 = new cc.Vec2();
  _ctor.randomTempArr = [];
  return _ctor;
}();
exports.DataUtil = exp_DataUtil;