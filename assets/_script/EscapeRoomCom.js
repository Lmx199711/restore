var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LevelPreload = require("LevelPreload");
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_PlayerData = require("PlayerData");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_EscapeRoomResultUI = require("EscapeRoomResultUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var C = function () {
  function e() {
    this.fakeNode = null;
    this.targetode = [];
    this.triggerId = "";
    this.btnId = "";
  }
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], e.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "目标",
    type: cc.Node
  })], e.prototype, "targetode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], e.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "触发条件",
    tooltip: "触发条件"
  })], e.prototype, "btnId", undefined);
  return __decorate([_ccclass("MoveNodeClass")], e);
}();
var def_EscapeRoomCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.role = null;
    t.btns = [];
    t.btnAnims = [];
    t.btnSf = [];
    t.dragNodeList = [];
    t.isDuzhu = false;
    t.isYangqi = false;
    t.strs = ["这房间啥也没有，我打赌你出不去", "这舞蹈真哇塞，你能不能让她再跳一次", "本季最新款墨镜，可惜这个房间没有太阳", "", "天降横财，但是在这个房间你也花不出去啊", "这是氧气瓶？这房间也不缺氧气啊", "这么大的口香糖，我对你好吧", "看起来某人要倒霉啦", "哎呀，怎么就被你找到了呢", "有人陪你多好啊，不如从了吧", "你会不会游泳？现在学可能来不及咯", "天降横财，但是在这个房间你也花不出去啊", "哈哈哈，门又不见了，该怎么办呢", "想不到吧，密码是啥我可不会告诉你，哈哈哈", "别按了，这就是一堵墙而已", "求求你，快出去吧，别骚扰我了"];
    t.sounds = {
      0: "这房间啥也没有，我打赌你出不去_01",
      8: "哎呀，怎么就被你找到了呢_01",
      2: "本季最新款墨镜，可惜这个房间没有太阳_01",
      7: "看起来某人要倒霉啦_01",
      10: "你会不会游泳？现在学可能来不及咯_01",
      11: "天降横财，但是在这个房间你也花不出去啊_01",
      4: "天降横财，但是在这个房间你也花不出去啊_01",
      9: "有人陪你多好啊，不如从了吧_01",
      6: "这么大的口香糖，我对你好吧_01",
      5: "这是氧气瓶？这房间也不缺氧气啊11月23日_01",
      1: "这舞蹈真哇塞，你能不能让她再跳一次_01"
    };
    t.findItemList = [];
    t.m_TouchNum = {
      1: {
        max: 99999,
        num: 0
      },
      2: {
        max: 1,
        num: 0
      },
      3: {
        max: 1,
        num: 0
      },
      4: {
        max: 100,
        num: 0
      },
      5: {
        max: 1,
        num: 0
      },
      6: {
        max: 1,
        num: 0
      },
      7: {
        max: 99999,
        num: 0
      },
      8: {
        max: 99999,
        num: 0
      },
      9: {
        max: 99999,
        num: 0
      },
      10: {
        max: 99999,
        num: 0
      },
      11: {
        max: 100,
        num: 0
      }
    };
    t.m_type = "";
    t.dragingIndex = [];
    t.startPos = new cc.Vec2(0, 0);
    t.oldBlIndex = -1;
    t.worldScale = new cc.Vec2(0, 0);
    t.m_power = .05;
    t.m_value = .5;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return null;
  };
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.initView();
  };
  _ctor.prototype.update = function (t) {
    e.prototype.update.call(this, t);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(t);
  };
  _ctor.prototype.onBtns = function (e, t) {
    var o = this;
    r_SoundMgr.SoundMgr.playSound("escapeRoom/按键");
    if (this.isTouch) {
      this.isTouch = false;
      this.role.active = false;
      if ("8" == t) {
        r_BehaviorMgr.BehaviorMgr.trigger("按钮行为" + t);
        this.m_type = t;
        this.showTip(this.m_type);
        return void r_TimeSystem.TimeSystem.scheduleOnce("btnOff", .3, function () {
          o.btns[parseInt(t) - 1].children[0].getComponent(cc.Sprite).spriteFrame = o.btnSf[1];
        });
      }
      this.btnAnims[parseInt(t) - 1].node.active = true;
      this.btnAnims[parseInt(t) - 1].setAnimation(0, this.btnAnims[parseInt(t) - 1].animation, false);
      r_TimeSystem.TimeSystem.scheduleOnce("btnOff", .3, function () {
        o.btns[parseInt(t) - 1].children[0].getComponent(cc.Sprite).spriteFrame = o.btnSf[1];
      });
      r_TimeSystem.TimeSystem.scheduleOnce("btnOff1", .6, function () {
        o.btns[parseInt(t) - 1].children[0].getComponent(cc.Sprite).spriteFrame = o.btnSf[0];
      });
      this.btnAnims[parseInt(t) - 1].setCompleteListener(function () {
        o.btnAnims[parseInt(t) - 1].node.active = false;
        o.role.active = true;
        o.btnAnims[parseInt(t) - 1].setCompleteListener(function () {});
        if (o.m_TouchNum[t].max > o.m_TouchNum[t].num) {
          o.m_TouchNum[t].num++;
          r_BehaviorMgr.BehaviorMgr.trigger("按钮行为" + t);
          o.m_type = t;
          "1" != o.m_type && o.showTip(o.m_type);
        } else {
          o.behaiverEnd();
        }
      });
    }
  };
  _ctor.prototype.behaiverEnd = function () {
    var e = this;
    if ("7" == this.m_type && !this.isDuzhu) {
      if (!this.isDuzhu) {
        this.zhengmian.active = false;
        this.yunxuan.active = true;
        return void r_TimeSystem.TimeSystem.scheduleOnce("fail", 1, function () {
          e.failLevel();
        });
      }
      r_BehaviorMgr.BehaviorMgr.trigger("显示口香糖");
    }
    if ("10" == this.m_type) {
      if (!this.isYangqi) {
        return void r_TimeSystem.TimeSystem.scheduleOnce("fail", 1, function () {
          e.failLevel();
        });
      }
      r_BehaviorMgr.BehaviorMgr.trigger("显示氧气瓶");
    }
    "1" == this.m_type && this.showTip(this.m_type);
    this.isTouch = true;
    this.role.active = true;
    this.isDuzhu = false;
    this.isYangqi = false;
    this.m_type = "";
  };
  _ctor.prototype.initView = function () {
    this.labTip.node.active = false;
    this.isTouch = true;
    this.isDuzhu = false;
    this.isYangqi = false;
    this.lab.string = "";
    Object.values(this.m_TouchNum).forEach(function (e) {
      return e.num = 0;
    });
    this.btnAnims.forEach(function (e) {
      return e.node.active = false;
    });
    this.bgNode.on(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
    this.bgNode.on(cc.Node.EventType.TOUCH_MOVE, this.onBgTouchMove, this);
    this.bgNode.on(cc.Node.EventType.TOUCH_END, this.onBgTouchEnd, this);
    this.bgNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onBgTouchEnd, this);
    this.showTip("0");
  };
  _ctor.prototype.onBgTouchStart = function (e) {
    e.stopPropagation();
    var t = e.getLocation();
    this.dragingIndex = [];
    this.node.getWorldScale(this.worldScale);
    for (var o = this.dragNodeList.length - 1; o >= 0; o--) {
      var i = this.dragNodeList[o].fakeNode;
      if (r_CommonFunc.checkTouchNode2(t, i)) {
        this.startPos.x = i.x;
        this.startPos.y = i.y;
        this.dragingIndex.push(o);
        this.oldBlIndex = i.getSiblingIndex();
        i.setSiblingIndex(999);
      }
    }
  };
  _ctor.prototype.onBgTouchMove = function (e) {
    e.stopPropagation();
    if (this.dragingIndex[0] >= 0) {
      this.dragNodeList[this.dragingIndex[0]].fakeNode.x += e.getDeltaX() / this.worldScale.x;
      return void (this.dragNodeList[this.dragingIndex[0]].fakeNode.y += e.getDeltaY() / this.worldScale.y);
    }
  };
  _ctor.prototype.onBgTouchEnd = function (e) {
    var t = this;
    e.stopPropagation();
    var o = e.getLocation();
    var i = false;
    this.dragingIndex.forEach(function (e) {
      if (e >= 0) {
        var n = t.dragNodeList[e];
        for (var a = 0; a < n.targetode.length; a++) {
          if (r_CommonFunc.checkTouchNode2(o, n.targetode[a])) {
            i = true;
            break;
          }
        }
        "" != n.btnId && t.m_type != n.btnId || "8" == t.m_type || i && (n.fakeNode.active = false, t.isTouch = false, r_BehaviorMgr.BehaviorMgr.trigger(n.triggerId));
        n.fakeNode.x = t.startPos.x;
        n.fakeNode.y = t.startPos.y;
      }
    });
    this.dragingIndex = [];
  };
  _ctor.prototype.failLevel = function () {
    r_EscapeRoomResultUI.default.showUI({
      index: 1
    });
  };
  _ctor.prototype.passLevel = function () {
    r_EscapeRoomResultUI.default.showUI({
      index: 0
    });
  };
  _ctor.prototype.pkGame = function () {
    r_TimeSystem.TimeSystem.scheduleClear("updateTime");
    this.m_power = .05;
    this.m_value = .5;
    r_TimeSystem.TimeSystem.scheduleClear("updateTime");
    r_TimeSystem.TimeSystem.schedule("updateTime", 1, this.setProValue.bind(this, -.04));
  };
  _ctor.prototype.play9Btn = function () {
    this.setProValue(this.m_power);
  };
  _ctor.prototype.setProValue = function (e) {
    var t = this;
    this.m_value += e;
    this.pro.width = 582 * this.m_value;
    if (this.m_value >= 1) {
      r_TimeSystem.TimeSystem.scheduleClear("updateTime");
      r_BehaviorMgr.BehaviorMgr.trigger("大妈消失");
    } else if (this.m_value <= 0) {
      r_TimeSystem.TimeSystem.scheduleClear("updateTime");
      this.zhengmian.active = false;
      this.yunxuan.active = true;
      r_TimeSystem.TimeSystem.scheduleOnce("fail", 1, function () {
        t.failLevel();
        r_BehaviorMgr.BehaviorMgr.trigger("大妈消失2");
      });
    }
  };
  _ctor.prototype.showTip = function (e) {
    var t = this;
    this.labTip.node.active = true;
    this.labTip.string = this.strs[e];
    r_SoundMgr.SoundMgr.playSound("escapeRoom/" + this.sounds[e]);
    r_TimeSystem.TimeSystem.scheduleOnce("showTip", 2, function () {
      t.labTip.node.active = false;
    });
  };
  _ctor.prototype.addCoin = function () {
    r_PlayerData.PlayerData.addCoin("逃出空房加钱", 5e3, r_ReportSystem.SystemKey.小游戏);
  };
  _ctor.prototype.addDiaomd = function () {
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.小游戏, 500);
  };
  _ctor.prototype.prop3Event = function () {
    "7" == this.m_type && (this.isDuzhu = true);
  };
  _ctor.prototype.prop10Event = function () {
    "10" == this.m_type && (this.isYangqi = true);
  };
  _ctor.prototype.input = function (e, t) {
    if ("ok" == t) {
      if ("256" == this.lab.string) {
        return void r_BehaviorMgr.BehaviorMgr.trigger("跑路");
      } else {
        return undefined;
      }
    }
    if (!(this.lab.string.length >= 3 && "back" != t)) {
      if ("ok" == t || "back" == t) {
        "back" == t && (this.lab.string = "");
      } else {
        this.lab.string += t;
      }
    }
  };
  _ctor.prototype.onDestroy = function () {
    r_TimeSystem.TimeSystem.scheduleClear("btnOff");
    r_TimeSystem.TimeSystem.scheduleClear("btnOff1");
    r_TimeSystem.TimeSystem.scheduleClear("updateTime");
    r_TimeSystem.TimeSystem.scheduleClear("fail");
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.onClickDoor = function () {
    var e = this;
    if ("8" == this.m_type) {
      r_TimeSystem.TimeSystem.scheduleOnce("btnOff", .1, function () {
        e.btns[parseInt(e.m_type) - 1].children[0].getComponent(cc.Sprite).spriteFrame = e.btnSf[0];
      });
      r_BehaviorMgr.BehaviorMgr.trigger("脚松开");
      r_SoundMgr.SoundMgr.playSound("escapeRoom/哈哈哈，门又不见了，该怎么办呢_01");
    } else {
      r_BehaviorMgr.BehaviorMgr.trigger("显示密码");
      r_SoundMgr.SoundMgr.playSound("escapeRoom/想不到吧，密码是啥我可不会告诉你，哈哈哈_01");
    }
  };
  _ctor.prototype.onClickBlack = function () {
    r_BehaviorMgr.BehaviorMgr.trigger("墨镜消失");
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "role", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "btns", undefined);
  __decorate([_property([sp.Skeleton])], _ctor.prototype, "btnAnims", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "btnSf", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "pro", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "bgNode", undefined);
  __decorate([_property({
    displayName: "拖动的节点",
    type: C
  })], _ctor.prototype, "dragNodeList", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "lab", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "zhengmian", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "yunxuan", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "labTip", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_EscapeRoomCom;