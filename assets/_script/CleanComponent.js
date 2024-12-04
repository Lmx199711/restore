var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanShape = exports.CleanState = undefined;
var s;
var r;
var r_AddPicComponent = require("AddPicComponent");
var r_CleanFlagDataConvertCom = require("CleanFlagDataConvertCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e.None = 1] = "None";
  e[e.AddPic = 2] = "AddPic";
  e[e.Clean = 3] = "Clean";
})(s = exports.CleanState || (exports.CleanState = {}));
(function (e) {
  e[e.Circle = 0] = "Circle";
  e[e.Rect = 1] = "Rect";
  e[e.Sector = 2] = "Sector";
})(r = exports.CleanShape || (exports.CleanShape = {}));
var def_CleanComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.circleRadio = 100;
    t.cleanPer = 90;
    t.cleanWidth = 1334;
    t.cleanHeight = 750;
    t.cleanWidthSplit = 20;
    t.cleanHeightSplit = 20;
    t.addPicDistance = 50;
    t.addPer = 100;
    t.CleanRectWidth = 100;
    t.CleanRectHeight = 100;
    t.maskList = [];
    t.pointRootList = [];
    t.cleanSuccessCallBack = null;
    t.addSuccessCallBack = null;
    t.curState = s.None;
    t.curCleanShape = r.Circle;
    t.SectorCenter = null;
    t.SectorRadio = 1;
    t.isCalculateInRadio = false;
    t.cleanPointMap = {};
    t.needCleanNum = 0;
    t.cleanNum = 0;
    t.canTouchMask = false;
    t.curZIndex = 0;
    t.tempPos = new cc.Vec3();
    t.pointList = [];
    t.addPicList = [];
    t.lastAddPicX = 0;
    t.lastAddPicY = 0;
    t.lastAddPicTime = 0;
    t.addPicLimitNum = 1e3;
    t.isInit = false;
    t.drawRectPoints = [cc.v2(), cc.v2(), cc.v2(), cc.v2(), cc.v2(), cc.v2()];
    t.tempCenterVec = cc.v2();
    t.lastSectorPos = cc.v2();
    t.curSectorPos = cc.v2();
    t.tempDir = cc.v2();
    t.tempVec3 = cc.v3();
    t.tempVec3_1 = cc.v3();
    t.tempVec3_2 = cc.v3();
    t.counterclockwise = false;
    t.lastRadians = 0;
    t.curRadians = 0;
    t.tempV3 = cc.v3();
    t.points = [cc.v2(), cc.v2(), cc.v2(), cc.v2()];
    t.tempPoint = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initPoints = function () {
    this.pointRoot && this.refreshPointList();
    this.checkInit();
  };
  _ctor.prototype.refreshPointList = function () {
    this.pointList = [];
    var e = this.pointRoot.getComponent(r_CleanFlagDataConvertCom.CleanFlagDataConvertCom);
    if (e) {
      0 == e.childPos.length && cc.warn("清理节点没有设置子节点", this.node.name);
      for (var t = 0; t < e.childPos.length; t++) {
        (n = {}).pos = e.childPos[t];
        n.isFinish = false;
        this.pointList.push(n);
      }
    } else {
      var o = this.pointRoot.children;
      for (t = 0; t < o.length; t++) {
        var i = o[t];
        var n = {};
        var a = i.parent.convertToWorldSpaceAR(i.position);
        n.pos = a;
        n.isFinish = false;
        this.pointList.push(n);
      }
    }
    this.cleanNum = 0;
    this.needCleanNum = this.pointList.length;
  };
  _ctor.prototype.checkInit = function () {
    if (!this.isInit && (this.isInit = true, this.canTouchMask = false, this.curState = s.None, this.addPicCpt = this.node.getComponent(r_AddPicComponent.default), !this.pointRoot)) {
      var e = cc.winSize.width / 2 - this.cleanWidth / 2;
      var t = this.cleanWidth / this.cleanWidthSplit;
      var o = cc.winSize.height / 2 - this.cleanHeight / 2;
      var i = this.cleanHeight / this.cleanHeightSplit;
      for (var n = 0; n <= this.cleanWidthSplit; n++) {
        var a = Math.floor(e + t * n);
        this.cleanPointMap[a] = {};
        var r = this.cleanPointMap[a];
        for (var l = 0; l <= this.cleanHeightSplit; l++) {
          r[Math.floor(o + i * l)] = false;
          this.needCleanNum = this.needCleanNum + 1;
        }
      }
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
    if (this.mask) {
      if (this.mask.inverted) {
        this.mask.node.active = false;
      } else {
        this.mask.enabled = false;
      }
    }
    if (this.mask2) {
      if (this.mask2.inverted) {
        this.mask2.node.active = false;
      } else {
        this.mask2.enabled = false;
      }
    }
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
      t = this.mask.node.convertToNodeSpaceAR(t);
      if (this.curCleanShape == r.Circle) {
        this._addCircle(t);
        this._addCapsule(t);
      } else if (this.curCleanShape == r.Rect) {
        this._addRectCapsule(t);
      } else {
        this.curCleanShape == r.Sector && this._addSector(t);
      }
      this.lastCleanPoint = t;
    } else if (this.curState == s.AddPic) {
      this.checkAddPic();
      t = this.addToolHead.parent.convertToWorldSpaceAR(this.addToolHead.position);
      for (var o = 0; o < this.picList.length; o++) {
        var i = this.picList[o];
        if (!i.active) {
          var n = i.parent.convertToNodeSpaceAR(t);
          if (Math.abs(i.x - n.x) <= this.addPicDistance && Math.abs(i.y - n.y) <= this.addPicDistance && (i.active = true, this.curZIndex = this.curZIndex + 1, i.zIndex = this.curZIndex, this.addNum = this.addNum + 1, this.addNum / this.needAddNum >= this.addPer / 100 && this.addSuccessCallBack)) {
            this.addSuccessCallBack(this.addPicList);
            return void (this.addSuccessCallBack = null);
          }
        }
      }
    }
  };
  _ctor.prototype.checkAddPic = function () {
    var e = this.addToolHead.parent.convertToWorldSpaceAR(this.addToolHead.position);
    if (this.addPicCpt && !(this.addPicList.length >= this.addPicLimitNum || Math.abs(this.lastAddPicX - e.x) + Math.abs(this.lastAddPicY - e.y) < 50)) {
      this.lastAddPicX = e.x;
      this.lastAddPicY = e.y;
      var t = this.addPicCpt.collideNode;
      var o = t.convertToNodeSpaceAR(e);
      var i = t.getComponent(cc.PolygonCollider);
      if (cc.Intersection.pointInPolygon(o, i.points)) {
        var n = this.addPicCpt.drawNode;
        var a = cc.instantiate(n);
        a.active = true;
        a.parent = n.parent;
        var s = n.parent.convertToNodeSpaceAR(e);
        a.x = s.x;
        a.y = s.y;
        a.zIndex = 99;
        this.addPicList.push(a);
      }
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
  _ctor.prototype.startClean = function (e, t, o) {
    this.setCleanInfo(e, t, o);
    this.registTouch();
  };
  _ctor.prototype.cleanEnd = function () {
    this.lastCleanWorldPoint = null;
    this.lastCleanPoint = null;
  };
  _ctor.prototype.setCleanInfo = function (e, t, o) {
    this.cleanToolHead = t;
    this.curState = s.Clean;
    this.cleanSuccessCallBack = e;
    this.cleanProgressCallBack = o;
  };
  _ctor.prototype.setCleanShape = function (e) {
    this.curCleanShape = e;
  };
  _ctor.prototype.startAddPic = function (e, t, o, i) {
    undefined === i && (i = true);
    this.setAddPicInfo(e, t, o);
    i && this.registTouch();
  };
  _ctor.prototype.setAddPicInfo = function (e, t, o) {
    this.addToolHead = e;
    this.curZIndex = 0;
    this.picList = t;
    this.addNum = 0;
    this.needAddNum = this.picList.length;
    this.curState = s.AddPic;
    this.addSuccessCallBack = o;
  };
  _ctor.prototype.showAllPic = function () {
    if (this.picList && this.picList.length > 0) {
      for (var e = 0; e < this.picList.length; e++) {
        this.picList[e].active = true;
      }
    }
  };
  _ctor.prototype.cleanPoint = function (e) {
    this.lastCleanWorldPoint && this.calculateProgress(e);
  };
  _ctor.prototype._addCircle = function (e) {
    var t = this.mask;
    t._graphics.lineWidth = 1;
    t._graphics.strokeColor = cc.color(255, 0, 0);
    t._graphics.fillColor = cc.color(0, 255, 0);
    t._graphics.circle(e.x, e.y, this.circleRadio);
    t._graphics.fill();
    t._graphics.stroke();
    var o = this.mask2;
    if (o) {
      o._graphics.lineWidth = 1;
      o._graphics.strokeColor = cc.color(255, 0, 0);
      o._graphics.fillColor = cc.color(0, 255, 0);
      o._graphics.circle(e.x, e.y, this.circleRadio);
      o._graphics.fill();
      o._graphics.stroke();
    }
    for (var i = 0; i < this.maskList.length; i++) {
      var n = this.maskList[i];
      n._graphics.lineWidth = 1;
      n._graphics.strokeColor = cc.color(255, 0, 0);
      n._graphics.fillColor = cc.color(0, 255, 0);
      n._graphics.circle(e.x, e.y, this.circleRadio);
      n._graphics.fill();
      n._graphics.stroke();
    }
  };
  _ctor.prototype.fillAll = function () {
    var e = this.mask;
    e._graphics.lineWidth = 1;
    e._graphics.strokeColor = cc.color(255, 0, 0);
    e._graphics.fillColor = cc.color(0, 255, 0);
    e._graphics.rect(0, 0, 1668, 1002);
    e._graphics.fill();
    e._graphics.stroke();
    var t = this.mask2;
    if (t) {
      t._graphics.lineWidth = 1;
      t._graphics.strokeColor = cc.color(255, 0, 0);
      t._graphics.fillColor = cc.color(0, 255, 0);
      t._graphics.rect(0, 0, 1668, 1002);
      t._graphics.fill();
      t._graphics.stroke();
    }
  };
  _ctor.prototype.reset = function () {
    this.mask._graphics.clear();
  };
  _ctor.prototype.resetAll = function () {
    this.cleanMap();
    this.refreshPointList();
    this.mask._graphics.clear();
    var e = this.mask2;
    e && e._graphics.clear();
  };
  _ctor.prototype._addCapsule = function (e) {
    if (this.lastCleanPoint) {
      var t = this.mask._graphics;
      t.lineWidth = 2 * this.circleRadio;
      t.moveTo(e.x, e.y);
      t.lineTo(this.lastCleanPoint.x, this.lastCleanPoint.y);
      t.strokeColor = cc.color(255, 0, 0);
      t.stroke();
      var o = this.mask2;
      if (o) {
        var i = o._graphics;
        i.lineWidth = 2 * this.circleRadio;
        i.moveTo(e.x, e.y);
        i.lineTo(this.lastCleanPoint.x, this.lastCleanPoint.y);
        i.strokeColor = cc.color(255, 0, 0);
        i.stroke();
      }
    }
  };
  _ctor.prototype.calculateProgress = function (e) {
    var t;
    if (this.curCleanShape == r.Circle) {
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
    } else if (this.curCleanShape == r.Rect) {
      t = [];
      for (var o = 0; o < this.drawRectPoints.length; o++) {
        var i = this.drawRectPoints[o];
        t.push(this.mask.node.convertToWorldSpaceAR(i));
      }
    }
    if (this.pointRoot) {
      var n = undefined;
      this.curCleanShape == r.Sector && this.SectorCenter && (n = this.SectorCenter.convertToWorldSpaceAR(cc.Vec2.ZERO));
      for (o = this.pointList.length - 1; o >= 0; o--) {
        var a = this.pointList[o];
        if (!a.isFinish) {
          var s = a.pos.x;
          var c = a.pos.y;
          if (this.curCleanShape == r.Circle) {
            if ((c < e.y - this.circleRadio || c > e.y + this.circleRadio) && !cc.Intersection.pointInPolygon(a.pos, t)) {
              continue;
            }
            if ((p = Math.sqrt((e.x - s) * (e.x - s) + (e.y - c) * (e.y - c))) <= this.circleRadio || cc.Intersection.pointInPolygon(a.pos, t)) {
              a.isFinish = true;
              this.cleanNum = this.cleanNum + 1;
              this.pointList.splice(o, 1);
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          } else if (this.curCleanShape == r.Rect) {
            if (cc.Intersection.pointInPolygon(a.pos, t)) {
              a.isFinish = true;
              this.cleanNum = this.cleanNum + 1;
              this.pointList.splice(o, 1);
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          } else if (this.curCleanShape == r.Sector) {
            this._calculateSector(e);
            if (this._pointInSector(a.pos, n, s, c, this.circleRadio)) {
              a.isFinish = true;
              this.cleanNum = this.cleanNum + 1;
              this.pointList.splice(o, 1);
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          }
        }
      }
    } else {
      this.curCleanShape == r.Sector && this.SectorCenter && (n = this.SectorCenter.convertToWorldSpaceAR(cc.Vec2.ZERO));
      {
        n = undefined;
        for (var l in this.cleanPointMap) {
          s = Number(l);
          var u = this.cleanPointMap[l];
          for (var h in u) if (!u[h]) {
            c = Number(h);
            if (this.curCleanShape == r.Circle) {
              var p = Math.sqrt((e.x - s) * (e.x - s) + (e.y - c) * (e.y - c));
              this.tempPoint.x = s;
              this.tempPoint.y = c;
              if (p <= this.circleRadio || cc.Intersection.pointInPolygon(this.tempPoint, this.points)) {
                u[h] = true;
                this.cleanNum = this.cleanNum + 1;
                this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
                if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                  this.cleanSuccessCallBack();
                  this.cleanSuccessCallBack = null;
                }
              }
            } else if (this.curCleanShape == r.Rect) {
              this.tempPoint.x = s;
              this.tempPoint.y = c;
              if (cc.Intersection.pointInPolygon(this.tempPoint, t)) {
                u[h] = true;
                this.cleanNum = this.cleanNum + 1;
                this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
                if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                  this.cleanSuccessCallBack();
                  this.cleanSuccessCallBack = null;
                }
              }
            } else if (this.curCleanShape == r.Sector) {
              this.tempPoint.x = s;
              this.tempPoint.y = c;
              this._calculateSector(e);
              if (this._pointInSector(this.tempPoint, n, s, c, this.circleRadio)) {
                u[h] = true;
                this.cleanNum = this.cleanNum + 1;
                this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
                if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                  this.cleanSuccessCallBack();
                  this.cleanSuccessCallBack = null;
                }
              }
            }
          }
        }
      }
    }
  };
  _ctor.prototype.calculateProgressOnce = function (e) {
    var t;
    if (this.curCleanShape == r.Circle) {
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
    } else if (this.curCleanShape == r.Rect) {
      t = [];
      var o = new cc.Vec2(e.x - .5 * this.CleanRectWidth, e.y + .5 * this.CleanRectHeight);
      t.push(o);
      o = new cc.Vec2(e.x + .5 * this.CleanRectWidth, e.y + .5 * this.CleanRectHeight);
      t.push(o);
      o = new cc.Vec2(e.x + .5 * this.CleanRectWidth, e.y - .5 * this.CleanRectHeight);
      t.push(o);
      o = new cc.Vec2(e.x - .5 * this.CleanRectWidth, e.y - .5 * this.CleanRectHeight);
      t.push(o);
    }
    if (this.pointRoot) {
      for (var i = this.pointList.length - 1; i >= 0; i--) {
        var n = this.pointList[i];
        if (!n.isFinish) {
          var a = n.pos.x;
          var s = n.pos.y;
          if (this.curCleanShape == r.Circle) {
            if ((s < e.y - this.circleRadio || s > e.y + this.circleRadio) && !cc.Intersection.pointInPolygon(n.pos, t)) {
              continue;
            }
            if ((h = Math.sqrt((e.x - a) * (e.x - a) + (e.y - s) * (e.y - s))) <= this.circleRadio || cc.Intersection.pointInPolygon(n.pos, t)) {
              n.isFinish = true;
              this.cleanNum = this.cleanNum + 1;
              this.pointList.splice(i, 1);
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          } else if (this.curCleanShape == r.Rect && cc.Intersection.pointInPolygon(n.pos, t)) {
            n.isFinish = true;
            this.cleanNum = this.cleanNum + 1;
            this.pointList.splice(i, 1);
            this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
            if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
              this.cleanSuccessCallBack();
              this.cleanSuccessCallBack = null;
            }
          }
        }
      }
    } else {
      for (var c in this.cleanPointMap) {
        a = Number(c);
        var l = this.cleanPointMap[c];
        for (var u in l) if (!l[u]) {
          s = Number(u);
          if (this.curCleanShape == r.Circle) {
            var h = Math.sqrt((e.x - a) * (e.x - a) + (e.y - s) * (e.y - s));
            this.tempPoint.x = a;
            this.tempPoint.y = s;
            if (h <= this.circleRadio || cc.Intersection.pointInPolygon(this.tempPoint, this.points)) {
              l[u] = true;
              this.cleanNum = this.cleanNum + 1;
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          } else if (this.curCleanShape == r.Rect) {
            this.tempPoint.x = a;
            this.tempPoint.y = s;
            if (cc.Intersection.pointInPolygon(this.tempPoint, t)) {
              l[u] = true;
              this.cleanNum = this.cleanNum + 1;
              this.cleanProgressCallBack && this.cleanProgressCallBack(this.cleanNum / this.needCleanNum);
              if (this.cleanNum / this.needCleanNum >= this.cleanPer / 100 && this.cleanSuccessCallBack) {
                this.cleanSuccessCallBack();
                this.cleanSuccessCallBack = null;
              }
            }
          }
        }
      }
    }
  };
  _ctor.prototype._addRect = function (e) {
    var t = this.mask._graphics;
    t.lineWidth = 1;
    t.strokeColor = cc.color(255, 0, 0);
    t.fillColor = cc.color(0, 255, 0);
    t.rect(e.x - this.CleanRectWidth / 2, e.y - this.CleanRectHeight / 2, this.CleanRectWidth, this.CleanRectHeight);
    t.fill();
    t.stroke();
    if (this.mask2) {
      (t = this.mask2._graphics).lineWidth = 1;
      t.strokeColor = cc.color(255, 0, 0);
      t.fillColor = cc.color(0, 255, 0);
      t.rect(e.x - this.CleanRectWidth / 2, e.y - this.CleanRectHeight / 2, this.CleanRectWidth, this.CleanRectHeight);
      t.fill();
      t.stroke();
    }
  };
  _ctor.prototype._addRectCapsule = function (e) {
    if (this.lastCleanPoint) {
      var t = this.mask._graphics;
      var o = e.sub(this.lastCleanPoint);
      if (o.x >= 0 && o.y >= 0) {
        this.drawRectPoints[0].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[0].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[1].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[1].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[2].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[2].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[3].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[3].y = e.y - this.CleanRectHeight / 2;
        this.drawRectPoints[4].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[4].y = e.y + this.CleanRectHeight / 2;
        this.drawRectPoints[5].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[5].y = e.y + this.CleanRectHeight / 2;
      } else if (o.x < 0 && o.y >= 0) {
        this.drawRectPoints[0].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[0].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[1].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[1].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[2].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[2].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[3].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[3].y = e.y + this.CleanRectHeight / 2;
        this.drawRectPoints[4].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[4].y = e.y + this.CleanRectHeight / 2;
        this.drawRectPoints[5].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[5].y = e.y - this.CleanRectHeight / 2;
      } else if (o.x >= 0 && o.y < 0) {
        this.drawRectPoints[0].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[0].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[1].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[1].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[2].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[2].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[3].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[3].y = e.y + this.CleanRectHeight / 2;
        this.drawRectPoints[4].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[4].y = e.y - this.CleanRectHeight / 2;
        this.drawRectPoints[5].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[5].y = e.y - this.CleanRectHeight / 2;
      } else if (o.x < 0 && o.y < 0) {
        this.drawRectPoints[0].x = this.lastCleanPoint.x - this.CleanRectWidth / 2;
        this.drawRectPoints[0].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[1].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[1].y = this.lastCleanPoint.y + this.CleanRectHeight / 2;
        this.drawRectPoints[2].x = this.lastCleanPoint.x + this.CleanRectWidth / 2;
        this.drawRectPoints[2].y = this.lastCleanPoint.y - this.CleanRectHeight / 2;
        this.drawRectPoints[3].x = e.x + this.CleanRectWidth / 2;
        this.drawRectPoints[3].y = e.y - this.CleanRectHeight / 2;
        this.drawRectPoints[4].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[4].y = e.y - this.CleanRectHeight / 2;
        this.drawRectPoints[5].x = e.x - this.CleanRectWidth / 2;
        this.drawRectPoints[5].y = e.y + this.CleanRectHeight / 2;
      }
      t.lineWidth = 1;
      t.moveTo(this.drawRectPoints[0].x, this.drawRectPoints[0].y);
      for (var i = 1; i < this.drawRectPoints.length; i++) {
        var n = this.drawRectPoints[i];
        t.lineTo(n.x, n.y);
      }
      t.lineTo(this.drawRectPoints[0].x, this.drawRectPoints[0].y);
      t.strokeColor = cc.color(255, 0, 0);
      t.fill();
      var a = this.mask2;
      if (a) {
        var s = a._graphics;
        s.lineWidth = 2 * this.circleRadio;
        s.moveTo(e.x, e.y);
        s.lineTo(this.lastCleanPoint.x, this.lastCleanPoint.y);
        s.strokeColor = cc.color(255, 0, 0);
        s.stroke();
      }
    }
  };
  _ctor.prototype._addSector = function (e, t) {
    undefined === t && (t = false);
    var o = this.mask._graphics;
    o.lineWidth = 1;
    o.moveTo(this.tempCenterVec.x, this.tempCenterVec.y);
    o.lineTo(this.lastSectorPos.x, this.lastSectorPos.y);
    o.arc(this.tempCenterVec.x, this.tempCenterVec.y, this.SectorRadio, this.lastRadians, this.curRadians, this.counterclockwise);
    o.lineTo(this.tempCenterVec.x, this.tempCenterVec.y);
    o.strokeColor = cc.color(255, 0, 0);
    o.fill();
  };
  _ctor.prototype._calculateSector = function (e) {
    if (this.lastCleanPoint) {
      this.mask.node.convertToNodeSpaceAR(this.SectorCenter.convertToWorldSpaceAR(cc.Vec2.ZERO), this.tempCenterVec);
      e = this.mask.node.convertToNodeSpaceAR(e);
      this.tempDir = this.lastCleanPoint.sub(this.tempCenterVec);
      this.tempDir = this.tempDir.normalizeSelf();
      this.lastSectorPos = this.tempDir.mul(this.SectorRadio);
      this.tempCenterVec.add(this.lastSectorPos, this.lastSectorPos);
      var t = cc.Vec2.dot(cc.Vec2.RIGHT, this.tempDir);
      this.lastRadians = Math.acos(t);
      this.tempDir.y < 0 && (this.lastRadians *= -1);
      this.tempDir = e.sub(this.tempCenterVec);
      this.tempDir = this.tempDir.normalizeSelf();
      this.curSectorPos = this.tempDir.mul(this.SectorRadio);
      this.tempCenterVec.add(this.curSectorPos, this.curSectorPos);
      var o = cc.Vec2.dot(cc.Vec2.RIGHT, this.tempDir);
      this.curRadians = Math.acos(o);
      this.tempDir.y < 0 && (this.curRadians *= -1);
      if (this.curRadians - this.lastRadians >= 0) {
        if (Math.abs(this.curRadians - this.lastRadians) >= Math.PI) {
          this.counterclockwise = false;
        } else {
          this.counterclockwise = true;
        }
      } else if (Math.abs(this.curRadians - this.lastRadians) >= Math.PI) {
        this.counterclockwise = true;
      } else {
        this.counterclockwise = false;
      }
    }
  };
  _ctor.prototype._pointInSector = function (e, t, o, i, n) {
    if (this.isCalculateInRadio && Math.sqrt((e.x - o) * (e.x - o) + (e.y - i) * (e.y - i)) > n) {
      return false;
    }
    e.sub(t, this.tempDir);
    this.tempDir.normalizeSelf();
    var a = cc.Vec2.dot(this.tempDir, cc.Vec2.RIGHT);
    var s = Math.acos(a);
    this.tempDir.y < 0 && (s *= -1);
    if (Math.abs(this.curRadians - this.lastRadians) >= Math.PI) {
      return s >= Math.PI || s <= -Math.PI;
    } else if (this.counterclockwise) {
      return s <= this.curRadians && s >= this.lastRadians;
    } else {
      return s >= this.curRadians && s <= this.lastRadians;
    }
  };
  _ctor.prototype._calculateWidth = function () {};
  _ctor.prototype.cleanMap = function () {
    for (var e in this.cleanPointMap) {
      var t = this.cleanPointMap[e];
      for (var o in t) t[o] = false;
    }
    this.cleanNum = 0;
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
    type: cc.Integer,
    tooltip: "清除宽度"
  })], _ctor.prototype, "cleanWidth", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "清除高度"
  })], _ctor.prototype, "cleanHeight", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "清除宽度检测分段"
  })], _ctor.prototype, "cleanWidthSplit", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "清除高度检测分段"
  })], _ctor.prototype, "cleanHeightSplit", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "添加图片范围"
  })], _ctor.prototype, "addPicDistance", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "添加图片百分比(0-100)"
  })], _ctor.prototype, "addPer", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "矩形宽度"
  })], _ctor.prototype, "CleanRectWidth", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "矩形高度"
  })], _ctor.prototype, "CleanRectHeight", undefined);
  __decorate([_property({
    type: cc.Mask,
    tooltip: "mask"
  })], _ctor.prototype, "mask", undefined);
  __decorate([_property({
    type: cc.Mask,
    tooltip: "mask2"
  })], _ctor.prototype, "mask2", undefined);
  __decorate([_property({
    type: [cc.Mask],
    tooltip: "清理列表"
  })], _ctor.prototype, "maskList", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "mask"
  })], _ctor.prototype, "pointRoot", undefined);
  __decorate([_property({
    type: [cc.Node],
    tooltip: "清理根列表"
  })], _ctor.prototype, "pointRootList", undefined);
  __decorate([_property({
    type: cc.Enum(r),
    tooltip: "擦除形状"
  })], _ctor.prototype, "curCleanShape", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "扇形圆心",
    visible: function () {
      return this.curCleanShape == r.Sector;
    }
  })], _ctor.prototype, "SectorCenter", undefined);
  __decorate([_property({
    type: cc.Float,
    displayName: "扇形半径",
    visible: function () {
      return this.curCleanShape == r.Sector;
    }
  })], _ctor.prototype, "SectorRadio", undefined);
  __decorate([_property({
    type: cc.Boolean,
    displayName: "是否只判断半径内的点",
    visible: function () {
      return this.curCleanShape == r.Sector;
    }
  })], _ctor.prototype, "isCalculateInRadio", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CleanComponent;