var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateGroupInfo = exports.CreateBtnType = undefined;
var s;
var r_ItemComponent = require("ItemComponent");
var r_GameSystem = require("GameSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e["一次全出"] = 0] = "一次全出";
  e[e["分组出现"] = 1] = "分组出现";
})(s = exports.CreateBtnType || (exports.CreateBtnType = {}));
var exp_CreateGroupInfo = function () {
  function _ctor() {
    this.nodeList = [];
    this.delay = 0;
    this.action = "";
  }
  __decorate([_property({
    type: [cc.Node],
    displayName: "物品列表"
  })], _ctor.prototype, "nodeList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "出现延迟"
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    type: String,
    displayName: "成功触发action"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("CreateGroupInfo")], _ctor);
}();
exports.CreateGroupInfo = exp_CreateGroupInfo;
var def_CollectCreateCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.createType = s.一次全出;
    t.createAction = "";
    t.minX = -650;
    t.maxX = 650;
    t.minY = 300;
    t.maxY = -300;
    t.groupList = [];
    t.curGroupIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onClickBtn.bind(this), this);
  };
  _ctor.prototype.init = function () {
    var e = [];
    for (var t = 0; t < r_GameSystem.GameSystem.itemList.length; t++) {
      var o = r_GameSystem.GameSystem.itemList[t];
      if (o.getComponent(r_ItemComponent.default).createByBtn) {
        var i = false;
        for (var n = 0; n < this.groupList.length; n++) {
          if ((a = this.groupList[n]).nodeList.indexOf(o) > -1) {
            i = true;
            break;
          }
        }
        i || e.push(o);
      }
    }
    for (n = 0; n < this.groupList.length; n++) {
      var a = this.groupList[n];
      r_UtilsSystem.UtilsSystem.shuffle(a.nodeList);
    }
    if (e.length > 0) {
      var s = new exp_CreateGroupInfo();
      s.nodeList = e;
      r_UtilsSystem.UtilsSystem.shuffle(e);
      this.groupList.push(s);
    }
  };
  _ctor.prototype.onClickBtn = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.createType == s.一次全出) {
      this.node.targetOff(this);
      console.log("点击onClickBtn");
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.createAction);
      var t = this.node.x;
      var o = this.node.y;
      this.node.active = false;
      for (var i = 0; i < r_GameSystem.GameSystem.itemList.length; i++) {
        var n = r_GameSystem.GameSystem.itemList[i];
        n.x = t;
        n.y = o;
        n.active = true;
        n.scale = 0;
        var a = r_UtilsSystem.UtilsSystem.getRandomNum(this.minX, this.maxX);
        var d = r_UtilsSystem.UtilsSystem.getRandomNum(this.minY, this.maxY);
        cc.tween(n).to(.5, {
          scale: 1,
          x: a,
          y: d
        }, {
          easing: cc.easing.smooth
        }).start();
      }
    } else if (this.createType == s.分组出现) {
      var y = this.groupList[this.curGroupIndex].nodeList;
      var f = function (t) {
        if (t == y.length - 1) {
          var o = e.node;
          if (o.btnHideAnim) {
            return;
          }
          o.btnHideAnim = true;
          o.startY || (o.startY = o.y);
          r_TimeSystem.TimeSystem.timeMapUpdate("btnHide", .5, function (e) {
            o.y = o.startY + -1e3 * e;
            1 == e && (o.btnHideAnim = false);
          });
        }
      };
      var m = function (e) {
        var t = y[e];
        if (t.active || t.isCreateBtn) {
          f(e);
          return "continue";
        }
        var o = g.node.y;
        var i = t.startY;
        t.active = true;
        t.isCreateBtn = true;
        r_GameSystem.GameSystem.isHaveMoveItem();
        r_TimeSystem.TimeSystem.timeMapUpdate("itemAnim" + t.getComponent(r_ItemComponent.default).itemId, .5, function (e) {
          t.y = o + (i - o) * e;
        });
        f(e);
        return {
          value: undefined
        };
      };
      var g = this;
      for (i = 0; i < y.length; i++) {
        var v = m(i);
        if ("object" == typeof v) {
          return v.value;
        }
      }
    }
  };
  _ctor.prototype.putSuccess = function () {
    var e = this.groupList[this.curGroupIndex];
    if (e) {
      var t = e.nodeList;
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        var n = i.getComponent(r_ItemComponent.default);
        if (n.equipId) {
          if (!n.equipItem) {
            return;
          }
        } else if (!i.curHang) {
          return;
        }
      }
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.action);
      this.curGroupIndex = this.curGroupIndex + 1;
      if (this.groupList[this.curGroupIndex]) {
        var a = e.delay;
        var s = this.node;
        if (a) {
          r_TimeSystem.TimeSystem.scheduleOnce("delayShow", a, function () {
            r_TimeSystem.TimeSystem.timeMapUpdate("btnHide", .5, function (e) {
              s.y = s.startY - 1e3 + 1e3 * e;
            });
          });
        } else {
          r_TimeSystem.TimeSystem.timeMapUpdate("btnHide", .5, function (e) {
            s.y = s.startY - 1e3 + 1e3 * e;
          });
        }
      }
    }
  };
  __decorate([_property({
    type: cc.Enum(s),
    displayName: "创建类型"
  })], _ctor.prototype, "createType", undefined);
  __decorate([_property({
    type: String,
    displayName: "创建后的action"
  })], _ctor.prototype, "createAction", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最小随机x"
  })], _ctor.prototype, "minX", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最大随机x"
  })], _ctor.prototype, "maxX", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最小随机y"
  })], _ctor.prototype, "minY", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最大随机y"
  })], _ctor.prototype, "maxY", undefined);
  __decorate([_property({
    type: [exp_CreateGroupInfo],
    displayName: "分组创建物品信息"
  })], _ctor.prototype, "groupList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CollectCreateCom;