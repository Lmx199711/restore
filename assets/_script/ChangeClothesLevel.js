var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClosthEggInfo = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_PartItem = require("PartItem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_ClosthEggInfo = function () {
  function _ctor() {
    this.partNodeList = [];
    this.action = "";
  }
  __decorate([_property({
    type: [cc.Node],
    displayName: "满足条件列表"
  })], _ctor.prototype, "partNodeList", undefined);
  __decorate([_property({
    displayName: "触发的action"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("ClosthEggInfo")], _ctor);
}();
exports.ClosthEggInfo = exp_ClosthEggInfo;
var def_ChangeClothesLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.winScore = 20;
    t.srcPartList = [];
    t.eggList = [];
    t.winAction = "";
    t.failAction = "";
    t.closetList = [];
    t.curPage = 1;
    t.isPlayAnim = false;
    t.partsMap = {};
    t.equipList = [];
    t.srcNumMap = {};
    t.numberMap = {};
    t.curNumberList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.revive, this.onRevive, this);
    this.curPage = 1;
    this.isPlayAnim = false;
    this.init();
    this.refreshBtn();
    this.registTouch();
    this.setNumber(0);
  };
  _ctor.prototype.onDestroy = function () {
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.revive, this.onRevive, this);
  };
  _ctor.prototype.onRevive = function () {
    this.setNumber(0);
  };
  _ctor.prototype.init = function () {
    var e = this.closetRoot.width;
    this.closetList = [];
    for (var t = 0; t < this.closetRoot.children.length; t++) {
      var o = [];
      var i = this.closetRoot.children[t];
      for (var n = 0; n < i.children.length; n++) {
        var a = i.children[n];
        if (r = a.getComponent(r_PartItem.default)) {
          a.startX = a.x;
          a.startY = a.y;
          a.zIndex = n;
          a.startZ = a.zIndex;
          a.startParent = i;
          r.target.startFrame = r.target.getComponent(cc.Sprite).spriteFrame;
          o.push(a);
        }
      }
      this.partsMap[t] = o;
      i.x = t * e;
      i.y = 0;
      i.active = true;
      this.closetList.push(i);
    }
    for (t = 0; t <= 9; t++) {
      var s = this.numberRoot.getChildByName(t + "");
      s.nName = t + "";
      this.numberMap[s.nName] = [];
      this.numberMap[s.nName].push(s);
      this.srcNumMap[s.nName] = s;
      s.active = false;
    }
    for (t = 0; t < this.srcPartList.length; t++) {
      var r;
      (r = this.srcPartList[t]).target.active = true;
      r.node.parent = r.target;
      r.node.x = 0;
      r.node.y = 0;
      r.node.isEquiped = true;
      this.equipList.push(r.node);
    }
  };
  _ctor.prototype.setNumber = function (e) {
    e += "";
    for (var t = 0; t < this.curNumberList.length; t++) {
      (r = this.curNumberList[t]).active = false;
      this.numberMap[r.nName].push(r);
    }
    var o = 0;
    this.curNumberList = [];
    for (t = 0; t < e.length; t++) {
      var i = e[t];
      var n = this.numberMap[i];
      if (n.length <= 0) {
        var a = cc.instantiate(this.srcNumMap[i]);
        a.nName = this.srcNumMap[i].nName;
        this.srcNumMap[i].parent.addChild(a);
        n.push(a);
      }
      o += (r = n.pop()).width;
      this.curNumberList.push(r);
    }
    var s = -o / 2;
    for (t = 0; t < this.curNumberList.length; t++) {
      var r;
      (r = this.curNumberList[t]).active = true;
      r.x = s + r.width / 2;
      s += r.width;
    }
  };
  _ctor.prototype.refreshBtn = function () {
    if (this.curPage <= 1) {
      this.btnLeft.active = false;
    } else {
      this.btnLeft.active = true;
    }
    if (this.curPage >= this.closetList.length) {
      this.btnRight.active = false;
    } else {
      this.btnRight.active = true;
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = null;
    var o = null;
    var i = 0;
    var n = 0;
    this.touchBg.on(cc.Node.EventType.TOUCH_START, function (a) {
      t = null;
      o = a.getLocation();
      var s = e.partsMap[e.curPage - 1];
      for (var r = s.length - 1; r >= 0; r--) {
        if (!(m = s[r]).isEquiped) {
          var c = m.convertToNodeSpaceAR(o);
          var l = m.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(c, l.points)) {
            var d = m.convertToWorldSpaceAR(cc.Vec2.ZERO);
            var y = e.touchBg.convertToNodeSpaceAR(d);
            m.parent = e.touchBg;
            t = m;
            m.x = y.x;
            m.y = y.y;
            i = m.x;
            n = m.y;
            return void r_SoundMgr.SoundMgr.playSound("getItem");
          }
        }
      }
      var f = [];
      for (r = 0; r < e.equipList.length; r++) {
        c = (m = e.equipList[r]).convertToNodeSpaceAR(o);
        l = m.getComponent(cc.PolygonCollider);
        cc.Intersection.pointInPolygon(c, l.points) && f.push(m);
      }
      if (f.length >= 1) {
        f.sort(function (e, t) {
          return t.zIndex - e.zIndex;
        });
        d = (m = f[0]).convertToWorldSpaceAR(cc.Vec2.ZERO);
        y = e.touchBg.convertToNodeSpaceAR(d);
        var m;
        var g = m.getComponent(r_PartItem.default);
        m.parent.active = false;
        m.parent = e.touchBg;
        t = m;
        m.x = y.x;
        m.y = y.y;
        i = m.x;
        n = m.y;
        var v = m.getComponent(cc.Sprite);
        v && (v.enabled = true);
        r_SoundMgr.SoundMgr.playSound("getItem");
        r_TriggerActionMgr.TriggerActionMgr.trigger(g.equipGetAction);
      }
    });
    this.touchBg.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      if (t) {
        var a = e.getLocation();
        t.x = i + a.x - o.x;
        t.y = n + a.y - o.y;
      }
    });
    var a = function (e) {
      e.parent = e.startParent;
      e.x = e.startX;
      e.y = e.startY;
      e.zIndex = e.startZ;
      var t = e.getComponent(cc.Sprite);
      t && (t.enabled = true);
    };
    this.touchBg.on(cc.Node.EventType.TOUCH_END, function (i) {
      if (t) {
        var n = t.getComponent(r_PartItem.default);
        if (n && n.target) {
          if (t.isEquiped) {
            var s = i.getLocation();
            if (Math.abs(s.x - o.x) > 50 || Math.abs(s.y - o.y) > 50) {
              e.takeOffEquip(t);
            } else {
              n.target.active = true;
              t.parent = n.target;
              t.x = 0;
              t.y = 0;
              g = n.node.getComponent(cc.Sprite);
              if (g) {
                g.enabled = false;
              }
            }
          } else {
            var r = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
            if (r_UtilsSystem.UtilsSystem.touchInNode(n.target, r)) {
              var c = [];
              var d = function (o) {
                var i = e.equipList[o];
                var s = i.getComponent(r_PartItem.default);
                if (0 == n.partIdList.filter(function (e) {
                  return s.partIdList.indexOf(e) > -1;
                }).length) {
                  return "continue";
                } else if (s.partIdList.length > n.partIdList.length) {
                  a(t);
                  t = null;
                  return {
                    value: undefined
                  };
                } else {
                  return void c.push(i);
                }
              };
              for (var y = 0; y < e.equipList.length; y++) {
                var f = d(y);
                if ("object" == typeof f) {
                  return f.value;
                }
              }
              n.target.active = true;
              e.checkChangeSprite(n);
              for (y = 0; y < c.length; y++) {
                var m = c[y].getComponent(r_PartItem.default);
                r_TriggerActionMgr.TriggerActionMgr.trigger(m.equipGetAction);
                e.takeOffEquip(c[y]);
              }
              var g;
              t.parent = n.target;
              t.x = 0;
              t.y = 0;
              t.isEquiped = true;
              g = n.node.getComponent(cc.Sprite);
              if (g) {
                g.enabled = false;
              }
              e.equipList.push(t);
              r_SoundMgr.SoundMgr.playSound("itemDown");
            } else {
              a(t);
            }
            t = null;
          }
        }
      }
    });
    this.touchBg._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.checkChangeSprite = function (e) {
    for (var t = 0; t < e.changeSpriteList.length; t++) {
      var o = e.changeSpriteList[t];
      for (var i = 0; i < o.equipList.length; i++) {
        var n = o.equipList[i];
        if (this.equipList.indexOf(n) > -1) {
          return void r_TriggerActionMgr.TriggerActionMgr.trigger(o.action);
        }
      }
    }
  };
  _ctor.prototype.takeOffEquip = function (e) {
    e.isEquiped = false;
    e.getComponent(r_PartItem.default).target.active = false;
    e.parent = e.startParent;
    e.x = e.startX;
    e.y = e.startY;
    e.zIndex = e.startZ;
    var t = e.getComponent(cc.Sprite);
    t && (t.enabled = true);
    r_UtilsSystem.UtilsSystem.removeFromArray(this.equipList, e);
  };
  _ctor.prototype.onClickRight = function () {
    var e = this;
    if (!(this.isPlayAnim || this.curPage >= this.closetList.length)) {
      this.curPage = this.curPage + 1;
      this.refreshBtn();
      this.isPlayAnim = true;
      cc.tween(this.closetRoot).to(.2, {
        x: (this.curPage - 1) * -this.closetRoot.width
      }).call(function () {
        e.isPlayAnim = false;
      }).start();
    }
  };
  _ctor.prototype.onClickLeft = function () {
    var e = this;
    if (!(this.isPlayAnim || this.curPage <= 1)) {
      this.curPage = this.curPage - 1;
      this.refreshBtn();
      this.isPlayAnim = true;
      cc.tween(this.closetRoot).to(.2, {
        x: (this.curPage - 1) * -this.closetRoot.width
      }).call(function () {
        e.isPlayAnim = false;
      }).start();
    }
  };
  _ctor.prototype.onClickOk = function () {
    this.triggerResult();
  };
  _ctor.prototype.triggerResult = function () {
    var e = this;
    var t = 0;
    for (var o = 0; o < this.equipList.length; o++) {
      var i = this.equipList[o].getComponent(r_PartItem.default);
      t += i.score;
    }
    this.setNumber(t);
    r_TimeSystem.TimeSystem.timeMapUpdate("numAnim", 1, function (o) {
      e.setNumber(Math.ceil(t * o));
    });
    for (o = 0; o < this.eggList.length; o++) {
      var n = this.eggList[o];
      var a = true;
      for (var s = 0; s < n.partNodeList.length; s++) {
        if (-1 == this.equipList.indexOf(n.partNodeList[s])) {
          a = false;
          break;
        }
      }
      if (a) {
        return void r_TriggerActionMgr.TriggerActionMgr.trigger(n.action);
      }
    }
    if (t >= this.winScore) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.winAction);
    } else {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.failAction);
    }
  };
  __decorate([_property({
    type: Number,
    displayName: "胜利的分数"
  })], _ctor.prototype, "winScore", undefined);
  __decorate([_property({
    type: [r_PartItem.default],
    displayName: "初始装备列表"
  })], _ctor.prototype, "srcPartList", undefined);
  __decorate([_property({
    type: [exp_ClosthEggInfo],
    displayName: "彩蛋列表"
  })], _ctor.prototype, "eggList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "衣柜根节点"
  })], _ctor.prototype, "closetRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "按钮左"
  })], _ctor.prototype, "btnLeft", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "按钮右"
  })], _ctor.prototype, "btnRight", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击监听层"
  })], _ctor.prototype, "touchBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "数字根节点"
  })], _ctor.prototype, "numberRoot", undefined);
  __decorate([_property({
    displayName: "胜利的action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    displayName: "失败的action"
  })], _ctor.prototype, "failAction", undefined);
  return __decorate([_ccclass, _menu("换装/关卡组件")], _ctor);
}(cc.Component);
exports.default = def_ChangeClothesLevel;