var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_ScrollCollectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.maxX = 0;
    t.minX = 0;
    t.startTime = 5;
    t.stepTime = 5;
    t.tipTime = 10;
    t.dishList = [];
    t.dragList = [];
    t.targetList = [];
    t.customerList = [];
    t.maxZIndex = 0;
    t.infoMap = {};
    t.dishName = null;
    t.curCustomerIndex = 0;
    t.isPlayAnim = false;
    t.finishDish = false;
    t.finishItem = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    for (var e = 0; e < this.targetParent.children.length; e++) {
      var t = this.targetParent.children[e];
      this.targetList.push(t);
      (o = {}).name = t.name;
      o.target = t;
      this.infoMap[o.name] = o;
    }
    for (e = 0; e < this.dragParent.children.length; e++) {
      var o;
      t = this.dragParent.children[e];
      this.dragList.push(t);
      if (o = this.infoMap[t.name]) {
        o.drag = t;
      } else {
        console.error("找不到目标 名字:", t.name);
      }
    }
    r_UtilsSystem.UtilsSystem.shuffle(this.dragList);
    for (e = 0; e < this.dragList.length; e++) {
      (t = this.dragList[e]).zIndex = e + 1;
    }
    for (e = 0; e < this.customerParent.children.length; e++) {
      t = this.customerParent.children[e];
      this.customerList.push(t);
    }
    this.maxZIndex = this.dragList.length + 3;
  };
  _ctor.prototype.onEnable = function () {
    var e = this;
    this.registTouch();
    r_TimeSystem.TimeSystem.scheduleOnce("customerTime", this.startTime, function () {
      e.enterCustomer();
    });
  };
  _ctor.prototype.onDisable = function () {
    r_TimeSystem.TimeSystem.scheduleClear("customerTime");
    r_TimeSystem.TimeSystem.scheduleClear("customerTip");
  };
  _ctor.prototype.enterCustomer = function () {
    var e = this;
    this.dishName = this.dishList[this.curCustomerIndex];
    var t = this.customerList[this.curCustomerIndex];
    t.active = true;
    var o = t.x;
    t.x = t.x - 1e3;
    cc.tween(t).to(1, {
      x: o
    }, {
      easing: cc.easing.smooth
    }).call(function () {
      t.getChildByName("qipao").active = true;
      r_TimeSystem.TimeSystem.scheduleOnce("customerTip", e.tipTime, function () {
        t.getChildByName("qipao").active = false;
        t.getChildByName("qipao2").active = true;
      });
    }).start();
  };
  _ctor.prototype.pointInPolygon = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = e.convertToNodeSpaceAR(t);
    return o && cc.Intersection.pointInPolygon(i, o.points);
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = false;
    var o = null;
    var i = null;
    this.touchBg.on(cc.Node.EventType.TOUCH_START, function (n) {
      if (!e.isPlayAnim) {
        o = null;
        t = false;
        i = n.touch.getLocation();
        var a = [];
        for (var s = 0; s < e.dragList.length; s++) {
          var l = e.dragList[s];
          if (l.active) {
            if (!l.isFinish && e.pointInPolygon(l, i)) {
              a.push(l);
            } else if (l.name == e.dishName && e.pointInPolygon(l, i)) {
              var u = l.convertToWorldSpaceAR(cc.Vec2.ZERO);
              l.parent = e.dragParent;
              var h = l.parent.convertToNodeSpaceAR(u);
              l.x = h.x;
              l.y = h.y;
              l.isFinish = false;
              (a = []).push(l);
              break;
            }
          }
        }
        if (a.length > 0) {
          a.sort(function (e, t) {
            return t.zIndex - e.zIndex;
          });
          (o = a[0]).zIndex = e.maxZIndex + 1;
          o.touchStartX = o.x;
          o.touchStartY = o.y;
          e.qipao.parent = o;
          e.qipao.active = true;
          e.qipao.x = 10;
          e.qipao.y = 10;
          e.qiLabel.string = o.name;
          e.maxZIndex = o.zIndex;
          r_SoundMgr.SoundMgr.playSound("getItem");
        } else if (r_UtilsSystem.UtilsSystem.checkTouchNode(e.moveNode, i)) {
          t = true;
          e.moveNode.touchStartX = e.moveNode.x;
        }
      }
    }, this);
    this.touchBg.on(cc.Node.EventType.TOUCH_MOVE, function (n) {
      if (!e.isPlayAnim) {
        var a = n.getLocation();
        var s = a.x - i.x;
        var r = a.y - i.y;
        if (o) {
          o.x = o.touchStartX + s;
          o.y = o.touchStartY + r;
        } else if (t) {
          var c = e.moveNode.touchStartX + s;
          c = Math.max(c, e.minX);
          c = Math.min(c, e.maxX);
          e.moveNode.x = c;
        }
      }
    }, this);
    this.touchBg.on(cc.Node.EventType.TOUCH_END, function () {
      if (!e.isPlayAnim && o) {
        e.qipao.active = false;
        var t = o.convertToWorldSpaceAR(cc.Vec2.ZERO);
        if (!o.isFinish && o.name == e.dishName && e.pointInPolygon(e.customerList[e.curCustomerIndex], t)) {
          o.isFinish = true;
          o.active = false;
          r_SoundMgr.SoundMgr.playSound("level84/171renwuwancheng");
          e.successParent.children[e.curCustomerIndex].active = true;
          e.isPlayAnim = true;
          var i = e.customerList[e.curCustomerIndex];
          i.getChildByName("qipao").active = false;
          i.getChildByName("qipao2").active = false;
          r_TimeSystem.TimeSystem.scheduleClear("customerTip");
          r_TimeSystem.TimeSystem.scheduleOnce("customerTime", 1, function () {
            e.isPlayAnim = false;
            e.successParent.children[e.curCustomerIndex].active = false;
            cc.tween(i).to(1, {
              x: i.x - 1e3
            }, {
              easing: cc.easing.smooth
            }).call(function () {
              e.curCustomerIndex = e.curCustomerIndex + 1;
              if (e.curCustomerIndex >= e.customerList.length) {
                e.finishDish = true;
                e.checkFinish();
              } else {
                r_TimeSystem.TimeSystem.scheduleOnce("customerTime", e.stepTime, function () {
                  e.enterCustomer();
                });
              }
            }).start();
          });
        } else {
          var n = e.infoMap[o.name];
          if (e.pointInPolygon(n.target, t)) {
            r_SoundMgr.SoundMgr.playSound("itemDown");
            o.isFinish = true;
            o.parent = n.target.parent;
            o.x = n.target.x;
            o.y = n.target.y;
            e.checkFinish();
          }
        }
      }
    }, this);
    this.touchBg._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.checkFinish = function () {
    if (this.finishDish) {
      for (var e = 0; e < this.dragList.length; e++) {
        if (!this.dragList[e].isFinish) {
          return;
        }
      }
      r_TimeSystem.TimeSystem.scheduleOnce("customerTime", 1, function () {});
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "拖动目标根节点"
  })], _ctor.prototype, "targetParent", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拖动根节点"
  })], _ctor.prototype, "dragParent", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击根节点"
  })], _ctor.prototype, "touchBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "柜子节点"
  })], _ctor.prototype, "moveNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "柜子最大x"
  })], _ctor.prototype, "maxX", undefined);
  __decorate([_property({
    type: Number,
    displayName: "柜子最小x"
  })], _ctor.prototype, "minX", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "气泡"
  })], _ctor.prototype, "qipao", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "气泡序号"
  })], _ctor.prototype, "qiLabel", undefined);
  __decorate([_property({
    type: Number,
    displayName: "第一个顾客进入时间"
  })], _ctor.prototype, "startTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "顾客间隔时间"
  })], _ctor.prototype, "stepTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "延迟提示出现时间"
  })], _ctor.prototype, "tipTime", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "顾客根节点"
  })], _ctor.prototype, "customerParent", undefined);
  __decorate([_property({
    type: [String],
    displayName: "顾客菜单名字列表"
  })], _ctor.prototype, "dishList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "成功界面根节点"
  })], _ctor.prototype, "successParent", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ScrollCollectCom;