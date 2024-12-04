Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducePointList = exports.TouchGGLNode = exports.TouchPoint = undefined;
var r_DataUtil = require("DataUtil");
var exp_TouchPoint = function (e, t, o) {
  this.x = e;
  this.y = t;
  this.active = o;
};
exports.TouchPoint = exp_TouchPoint;
var exp_TouchGGLNode = function () {
  function _ctor(e, t, o, i, n, a, r) {
    this.node = e;
    this.index = t;
    this.x = o;
    this.y = i;
    this.cleanRadius = n;
    this.successCallBack = a;
    this.percentLimit = .8;
    this.actionNum = 0;
    this.isComplete = false;
    this.isSure = false;
    this.width = e.width / 2;
    this.height = e.height / 2;
    this.checkPointList = exp_reducePointList(e, r.splitNumVert, r.splitNumHor, r.padNum);
    this.pointCount = r.splitNumVert * r.splitNumHor;
    this.percentLimit = this.percentLimit;
    this.reset(false);
  }
  _ctor.prototype.reset = function (e) {
    this.isSure = e;
    this.actionNum = 0;
    this.isComplete = false;
    var t = 0;
    for (var o = this.checkPointList; t < o.length; t++) {
      o[t].active = false;
    }
  };
  _ctor.prototype.isContains = function (e) {
    return Math.abs(e.x - this.x) <= this.width && Math.abs(e.y - this.y) <= this.height;
  };
  _ctor.prototype.cleanPoint = function (e) {
    for (var t = 0; t < this.checkPointList.length; t++) {
      var o = this.checkPointList[t];
      o.active || r_DataUtil.DataUtil.pDistance(e.x, e.y, o.x, o.y) <= this.cleanRadius && (o.active = true, this.actionNum = this.actionNum + 1, this.actionNum / this.pointCount >= this.percentLimit && this.successCallBack && (this.isComplete = true, this.successCallBack(this)));
    }
  };
  return _ctor;
}();
function exp_reducePointList(e, t, o, i) {
  var a = e.worldPosition;
  var s = a.x;
  var r = a.y;
  var c = e.width;
  var l = e.height;
  var u = s - c / 2 + i;
  var h = r - l / 2 + i;
  var p = (s + c / 2 - i - u) / (t - 1);
  var d = (r + l / 2 - i - h) / (o - 1);
  var y = [];
  for (var f = 0; f < t; f++) {
    var m = Math.floor(u + p * f);
    for (var g = 0; g < o; g++) {
      var v = Math.floor(h + d * g);
      var C = new exp_TouchPoint(m, v, false);
      y.push(C);
    }
  }
  return y;
}
exports.TouchGGLNode = exp_TouchGGLNode;
exports.reducePointList = exp_reducePointList;