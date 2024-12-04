var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_HomeClaw = require("HomeClaw");
var r_HomeResultUI = require("HomeResultUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HomeWawaCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.claw = null;
    t.m_zhuaquDis = 80;
    t.m_isTouch = true;
    t.items = [];
    t.tmepItems = [];
    t.posList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.claw.node.on(r_HomeClaw.default.ZHUAQU, this.onZhuaqu, this);
    this.claw.node.on(r_HomeClaw.default.SHOUZHUA, this.onShowzhua, this);
    this.claw.node.on(r_HomeClaw.default.CLAW_END, this.onClawEnd, this);
    this.items = [];
    for (var e = 0; e < 6; e++) {
      var t = this.node.getChildByName("mask").getChildByName("item" + e);
      this.items.push(t.getComponent(cc.RigidBody));
      this.posList.push(t.getPosition());
      t.angle = 0;
      t.active = false;
    }
  };
  Object.defineProperty(_ctor.prototype, "isTouch", {
    get: function () {
      return this.m_isTouch;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.start = function () {
    this.restart();
  };
  _ctor.prototype.restart = function () {
    this.claw.init();
    this.m_isTouch = true;
    this.refreshItem();
  };
  _ctor.prototype.refreshItem = function () {
    var e = this;
    if (this.m_isTouch) {
      this.m_isTouch = false;
      this.setItem();
      this.claw.tmepItems = this.tmepItems;
      r_TimeSystem.TimeSystem.scheduleOnce("waitDown", 2, function () {
        e.m_isTouch = true;
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("目前无法刷新");
    }
  };
  _ctor.prototype.setItem = function () {
    var e = this;
    var t = r_PlayerData.PlayerData.data.wawaList;
    this.items.forEach(function (e) {
      return e.node.active = false;
    });
    this.tmepItems = this.items.filter(function (e) {
      return t.includes(parseInt(e.name.replace(/[^0-9]/gi, "")));
    }).sort(function () {
      return Math.random() - .5;
    });
    this.tmepItems.forEach(function (t, o) {
      var i = e.posList[o];
      t.node.active = true;
      t.active = true;
      t.node.setPosition(i);
      t.type = cc.RigidBodyType.Static;
      t.type = cc.RigidBodyType.Dynamic;
    });
  };
  _ctor.prototype.onZhuaqu = function () {
    var e = this;
    var t = 99999;
    this.tmepItems.forEach(function (o) {
      t = Math.min(t, Math.abs(e.claw.node.x - o.node.x));
    });
    this.claw.isZhuajing = true;
    if (t <= this.m_zhuaquDis) {
      var o = this.tmepItems.find(function (o) {
        return Math.abs(e.claw.node.x - o.node.x) == t;
      });
      o.active = false;
      o.node.angle = 0;
      o.node.x = this.claw.node.x;
      this.m_tempItem = o;
      this.claw.tempItem = o;
      (1 == r_PlayerData.PlayerData.data.wawaCaidan ? 1 : ++r_PlayerData.PlayerData.data.wawaBuzhong <= 2 ? 0 : Math.random()) <= .5 && r_TimeSystem.TimeSystem.scheduleOnce("Fangkai", 1.5, function () {
        o.active = true;
        o.type = cc.RigidBodyType.Dynamic;
        e.claw.isZhuajing = false;
        e.claw.tempItem = null;
        e.m_tempItem = null;
      });
    }
    r_TimeSystem.TimeSystem.scheduleOnce("Zhuaqu", .2, function () {
      r_SoundMgr.SoundMgr.playSound("home/移动", true);
      e.claw.control(r_HomeClaw.ClawMoveState.up);
    });
  };
  _ctor.prototype.makeLeft = function () {
    if (this.m_isTouch) {
      r_SoundMgr.SoundMgr.playSound("home/移动", true);
      this.claw.control(r_HomeClaw.ClawMoveState.left);
    }
  };
  _ctor.prototype.makeRight = function () {
    if (this.m_isTouch) {
      r_SoundMgr.SoundMgr.playSound("home/移动", true);
      this.claw.control(r_HomeClaw.ClawMoveState.right);
    }
  };
  _ctor.prototype.makeStart = function () {
    if (this.m_isTouch) {
      this.m_isTouch = false;
      r_SoundMgr.SoundMgr.playSound("home/移动", true);
      this.claw.control(r_HomeClaw.ClawMoveState.down);
    }
  };
  _ctor.prototype.makeStop = function () {
    if (this.m_isTouch) {
      r_SoundMgr.SoundMgr.stopSound("home/移动");
      this.claw.control(r_HomeClaw.ClawMoveState.stop);
    }
  };
  _ctor.prototype.onShowzhua = function () {
    if (this.claw.tempItem && this.claw.isZhuajing) {
      this.claw.playComplete();
    } else {
      this.m_isTouch = true;
      r_SoundMgr.SoundMgr.stopSound("home/移动");
    }
  };
  _ctor.prototype.onClawEnd = function () {
    this.tmepItems.splice(this.tmepItems.indexOf(this.m_tempItem), 1);
    var e = this.m_tempItem.name.replace(/[^0-9]/gi, "");
    r_HomeResultUI.default.showUI(parseInt(e));
    this.claw.tempItem = null;
    this.m_tempItem = null;
    this.m_isTouch = true;
  };
  _ctor.prototype.onDisable = function () {
    r_TimeSystem.TimeSystem.unregistSecondUpdate("Fangkai");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("waitDown");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("Zhuaqu");
    r_SoundMgr.SoundMgr.stopSound("home/移动");
  };
  __decorate([_property(r_HomeClaw.default)], _ctor.prototype, "claw", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_HomeWawaCom;