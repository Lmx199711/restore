Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SKUtilsSystem = exports._SKUtilsSystem = undefined;
var r_UtilsSystem = require("UtilsSystem");
var exp__SKUtilsSystem = function () {
  function _ctor() {
    this.lastPlayCoinTime = 0;
  }
  _ctor.prototype.getRandomNum = function (e, t) {
    var o = t - e;
    var i = Math.random();
    return e + Math.round(i * o);
  };
  _ctor.prototype.getMapNum = function (e) {
    var t = 0;
    for (var o in e) t++;
    return t;
  };
  _ctor.prototype.showTip = function (e) {
    r_UtilsSystem.UtilsSystem.showTip(e);
  };
  _ctor.prototype.lerp = function (e, t, o) {
    return e + o * (t - e);
  };
  _ctor.prototype.getRandomFromArr = function (e) {
    return e[Math.floor(Math.random() * e.length)];
  };
  _ctor.prototype.fixLabel = function (e, t, o) {
    undefined === o && (o = 1);
    var i = Math.min(o, t / e.actualWidth);
    e.scaleX = i;
    e.scaleY = i;
  };
  _ctor.prototype.scheduleOnce = function (e, t) {
    setTimeout(function () {
      t && t();
    }, e);
  };
  _ctor.prototype.shuffle = function (e) {
    var t;
    var o;
    for (var i = e.length; i;) {
      o = Math.floor(Math.random() * i--);
      t = e[i];
      e[i] = e[o];
      e[o] = t;
    }
    return e;
  };
  _ctor.prototype.isPad = function () {
    return cc.winSize.width / cc.winSize.height >= .75;
  };
  _ctor.prototype.checkTouchNodeCollider = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = e.convertToNodeSpaceAR(t);
    return o && cc.Intersection.pointInPolygon(i, o.points);
  };
  _ctor.prototype.checkTouchNode = function (e, t) {
    var o = e.convertToNodeSpaceAR(t);
    return o.x > -e.width / 2 && o.x < e.width / 2 && o.y > -e.height / 2 && o.y < e.height / 2;
  };
  _ctor.prototype.addClickEventHandler = function (e, t, o, i, n) {
    undefined === n && (n = null);
    var a = new cc.Component.EventHandler();
    a.target = t;
    a.component = o;
    a.handler = i;
    a.customEventData = n;
    var s = e.getComponent(cc.Button);
    s.clickEvents = [];
    s.clickEvents.push(a);
  };
  _ctor.prototype.fixMoneyString = function (e) {
    (e += "").includes(".") && (e = Number(e).toFixed(1));
    return e + "";
  };
  return _ctor;
}();
exports._SKUtilsSystem = exp__SKUtilsSystem;
exports.SKUtilsSystem = new exp__SKUtilsSystem();