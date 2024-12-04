var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanState = undefined;
var s;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e.None = 1] = "None";
  e[e.Clean = 2] = "Clean";
})(s = exports.CleanState || (exports.CleanState = {}));
var def_CleanGroupComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.circleRadio = 100;
    t.cleanPer = 90;
    t.maskList = [];
    t.pointRootList = [];
    t.cleanSuccessCallBack = null;
    t.cleanAllSuccessCallBack = null;
    t.curState = s.None;
    t.canTouchMask = false;
    t.curZIndex = 0;
    t.tempPos = new cc.Vec3();
    t.isInit = false;
    t.tempCenterVec = cc.v2();
    t.tempDir = cc.v2();
    t.tempVec3 = cc.v3();
    t.tempVec3_1 = cc.v3();
    t.tempVec3_2 = cc.v3();
    t.tempVec2 = new cc.Vec2();
    t.tempV3 = cc.v3();
    t.points = [cc.v2(), cc.v2(), cc.v2(), cc.v2()];
    t.tempPoint = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initPoints = function () {
    this.refreshPointList();
    this.checkInit();
  };
  _ctor.prototype.refreshPointList = function () {
    for (var e = 0; e < this.pointRootList.length; e++) {
      var t = this.pointRootList[e];
      t.pointList = [];
      var o = t.children;
      for (var i = 0; i < o.length; i++) {
        var n = o[i];
        var a = {};
        var s = n.parent.convertToWorldSpaceAR(n.position);
        a.pos = s;
        a.isFinish = false;
        t.pointList.push(a);
      }
      t.isFinish = false;
      t.cleanNum = 0;
      t.needCleanNum = t.pointList.length;
    }
  };
  _ctor.prototype.refreshPointByCfg = function (e) {
    for (var t = 0; t < this.pointRootList.length; t++) {
      var o = this.pointRootList[t];
      o.pointList = [];
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        var a = {};
        this.tempVec2.x = n[0];
        this.tempVec2.x = n[0];
        var s = o.convertToWorldSpaceAR(this.tempVec2);
        a.pos = s;
        a.isFinish = false;
        o.pointList.push(a);
      }
      o.isFinish = false;
      o.cleanNum = 0;
      o.needCleanNum = o.pointList.length;
    }
  };
  _ctor.prototype.checkInit = function () {
    if (!this.isInit) {
      this.isInit = true;
      this.canTouchMask = false;
      this.curState = s.None;
    }
  };
  _ctor.prototype.start = function () {
    this.checkInit();
  };
  _ctor.prototype.unregistTouch = function () {
    this.node.off(cc.Node.EventType.TOUCH_START);
    this.node.off(cc.Node.EventType.TOUCH_MOVE);
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
      if (e.canTouchMask && cc.isValid(e.node)) {
        var o = t.touch.getLocation();
        e.checkTouch(o);
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      if (e.canTouchMask && cc.isValid(e.node)) {
        var o = t.touch.getLocation();
        e.checkTouch(o);
      }
    }, this);
    this.node._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.clear = function () {
    this.unregistTouch();
    this.node.active = false;
  };
  _ctor.prototype.cleanCompeleted = function () {
    this.unregistTouch();
    for (var e = 0; e < this.maskList.length; e++) {
      var t = this.maskList[e];
      if (t.inverted) {
        t.node.active = false;
      } else {
        t.enabled = false;
      }
    }
  };
  _ctor.prototype.checkTouch = function (e) {
    undefined === e && (e = null);
    if (this.curState == s.Clean) {
      var t = e;
      this.cleanToolHead && (t = this.cleanToolHead.convertToWorldSpaceAR(cc.Vec2.ZERO));
      if (!this.lastCleanWorldPoint) {
        return void (this.lastCleanWorldPoint = t);
      }
      this.cleanPoint(t);
      this.lastCleanWorldPoint = t;
      t = this.maskList[0].node.convertToNodeSpaceAR(t);
      this._addCircle(t);
      this._addCapsule(t);
      this.lastCleanPoint = t;
    }
  };
  _ctor.prototype.setCanTouchMask = function (e) {
    if (e != this.canTouchMask) {
      this.canTouchMask = e;
      if (e) {
        this.lastCleanPoint = null;
        this.lastCleanWorldPoint = null;
        console.log("开始清理");
      }
    }
  };
  _ctor.prototype.startClean = function (e, t, o, i) {
    this.setCleanInfo(e, t, o, i);
    this.registTouch();
  };
  _ctor.prototype.cleanEnd = function () {
    this.lastCleanWorldPoint = null;
    this.lastCleanPoint = null;
  };
  _ctor.prototype.setCleanInfo = function (e, t, o, i) {
    this.cleanToolHead = e;
    this.curState = s.Clean;
    this.cleanSuccessCallBack = t;
    this.cleanAllSuccessCallBack = o;
    this.cleanProgressCallBack = i;
  };
  _ctor.prototype.cleanPoint = function (e) {
    this.lastCleanWorldPoint && this.calculateProgress(e);
  };
  _ctor.prototype._addCircle = function (e) {
    for (var t = 0; t < this.maskList.length; t++) {
      var o = this.maskList[t];
      o._graphics.lineWidth = 1;
      o._graphics.strokeColor = cc.color(255, 0, 0);
      o._graphics.fillColor = cc.color(0, 255, 0);
      o._graphics.circle(e.x, e.y, this.circleRadio);
      o._graphics.fill();
      o._graphics.stroke();
    }
  };
  _ctor.prototype.fillAll = function () {
    for (var e = 0; e < this.maskList.length; e++) {
      var t = this.maskList[e];
      t._graphics.lineWidth = 1;
      t._graphics.strokeColor = cc.color(255, 0, 0);
      t._graphics.fillColor = cc.color(0, 255, 0);
      t._graphics.rect(0, 0, 1668, 1002);
      t._graphics.fill();
      t._graphics.stroke();
    }
  };
  _ctor.prototype.reset = function () {
    for (var e = 0; e < this.maskList.length; e++) {
      this.maskList[e]._graphics.clear();
    }
  };
  _ctor.prototype.resetAll = function () {
    this.refreshPointList();
    for (var e = 0; e < this.maskList.length; e++) {
      this.maskList[e]._graphics.clear();
    }
  };
  _ctor.prototype._addCapsule = function (e) {
    if (this.lastCleanPoint) {
      for (var t = 0; t < this.maskList.length; t++) {
        var o = this.maskList[t]._graphics;
        o.lineWidth = 2 * this.circleRadio;
        o.moveTo(e.x, e.y);
        o.lineTo(this.lastCleanPoint.x, this.lastCleanPoint.y);
        o.strokeColor = cc.color(255, 0, 0);
        o.stroke();
      }
    }
  };
  _ctor.prototype.calculateProgress = function (e) {
    var t;
    this.tempV3.x = e.x - this.lastCleanWorldPoint.x;
    this.tempV3.y = e.y - this.lastCleanWorldPoint.y;
    this.tempV3.cross(cc.Vec3.FORWARD, this.tempV3);
    this.tempV3.normalizeSelf();
    this.points[0].x = e.x - this.circleRadio * this.tempV3.x;
    this.points[0].y = e.y - this.circleRadio * this.tempV3.y;
    this.points[1].x = e.x + this.circleRadio * this.tempV3.x;
    this.points[1].y = e.y + this.circleRadio * this.tempV3.y;
    this.points[2].x = this.lastCleanWorldPoint.x + this.circleRadio * this.tempV3.x;
    this.points[2].y = this.lastCleanWorldPoint.y + this.circleRadio * this.tempV3.y;
    this.points[3].x = this.lastCleanWorldPoint.x - this.circleRadio * this.tempV3.x;
    this.points[3].y = this.lastCleanWorldPoint.y - this.circleRadio * this.tempV3.y;
    t = this.points;
    for (var o = 0; o < this.pointRootList.length; o++) {
      var i = this.pointRootList[o];
      if (!i.isFinish) {
        for (var n = i.pointList.length - 1; n >= 0; n--) {
          var a = i.pointList[n];
          if (!a.isFinish) {
            var s = a.pos.x;
            var r = a.pos.y;
            if ((!(r < e.y - this.circleRadio || r > e.y + this.circleRadio) || cc.Intersection.pointInPolygon(a.pos, t)) && (Math.sqrt((e.x - s) * (e.x - s) + (e.y - r) * (e.y - r)) <= this.circleRadio || cc.Intersection.pointInPolygon(a.pos, t)) && (a.isFinish = true, i.cleanNum = i.cleanNum + 1, i.pointList.splice(n, 1), this.cleanProgressCallBack && this.cleanProgressCallBack(i.cleanNum / i.needCleanNum), i.cleanNum / i.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack)) {
              i.isFinish = true;
              this.cleanSuccessCallBack(o);
              var c = 0;
              for (var l = 0; l < this.pointRootList.length; l++) {
                this.pointRootList[l].isFinish && (c += 1);
              }
              c >= this.pointRootList.length && this.cleanAllSuccessCallBack();
            }
          }
        }
      }
    }
  };
  __decorate([_property({
    type: cc.Integer,
    tooltip: "圆半径"
  })], _ctor.prototype, "circleRadio", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "清除百分比(0-100)"
  })], _ctor.prototype, "cleanPer", undefined);
  __decorate([_property({
    type: [cc.Mask],
    tooltip: "清理列表"
  })], _ctor.prototype, "maskList", undefined);
  __decorate([_property({
    type: [cc.Node],
    tooltip: "清理根列表"
  })], _ctor.prototype, "pointRootList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CleanGroupComponent;