var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseStepUI = require("BaseStepUI");
var r_PotatoResultUI = require("PotatoResultUI");
var def_PotatoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Potato, r_UIDef.UIDef.Res.UI.PotatoUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_length = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PotatoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PotatoUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.flowCfg = y;
    this.bindBtnCallback(this.btnFiree);
    this.imgXue.on(fgui.Event.TOUCH_BEGIN, this.onTouchStartXue, this);
    this.imgXue.on(fgui.Event.TOUCH_MOVE, this.onTouchMoveXue, this);
    this.imgXue.on(fgui.Event.TOUCH_END, this.onTouchEndXue, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_SoundMgr.SoundMgr.playSound("potato/放假了,去哪旅游呢");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    this.destruct();
  };
  _ctor.prototype.destruct = function () {
    r_TimeSystem.TimeSystem.scheduleClear("set3_3btn");
    r_TimeSystem.TimeSystem.scheduleClear("addPro");
    r_TimeSystem.TimeSystem.scheduleClear("selectNo");
    r_TimeSystem.TimeSystem.scheduleClear("selectOk");
    r_TimeSystem.TimeSystem.scheduleClear("succ");
    r_TimeSystem.TimeSystem.scheduleClear("fial");
    r_TimeSystem.TimeSystem.scheduleClear("Controller");
  };
  _ctor.prototype.stopStep = function () {
    e.prototype.stopStep.call(this);
    this.destruct();
  };
  _ctor.prototype.restart = function () {
    e.prototype.restart.call(this);
    this.isCaidan = false;
  };
  _ctor.prototype.onTouchStartXue = function (e) {
    e.captureTouch();
    this.m_length = 0;
    this.m_lastPos = e.pos.clone();
  };
  _ctor.prototype.onTouchMoveXue = function (e) {
    var t = cc.Vec2.distance(this.m_lastPos, e.pos);
    this.m_length += t;
  };
  _ctor.prototype.onTouchEndXue = function () {
    var e = this;
    if (this.m_length > 100) {
      this.stopStep();
      this.imgXue.visible = false;
      this.isCaidan = true;
      r_TimeSystem.TimeSystem.scheduleOnce("onTouchEndXue", 1, function () {
        e.setFlow(4);
        e.pro.value = 0;
      });
    }
    this.m_length = 0;
  };
  _ctor.prototype.initProp = function () {
    this.bubble_0.text = "放假了，\n去哪旅游呢？";
    this.pro.value = 0;
    this.pro2.value = 0;
    this.selectCom.restart();
  };
  _ctor.prototype.reusltLogic = function () {
    if (1 == this.currId) {
      r_PotatoResultUI.default.showUI({
        index: 0
      });
    } else if (this.isCaidan) {
      r_PotatoResultUI.default.showUI({
        index: 4
      });
    } else if (2 == this.currId) {
      r_PotatoResultUI.default.showUI({
        index: 1
      });
    } else if (this.pro.value >= 100) {
      this.contentPane.getController("mode").selectedIndex = 12;
      this.setBubble("bubble_0", "刚满十八岁");
      r_SoundMgr.SoundMgr.playSound("potato/刚满十八岁");
      r_TimeSystem.TimeSystem.scheduleOnce("succ", 2, function () {
        r_PotatoResultUI.default.showUI({
          index: 2
        });
      });
    } else if (this.pro.value < 100) {
      this.contentPane.getController("mode").selectedIndex = 13;
      this.setBubble("bubble_0", "劳资蜀道山");
      r_SoundMgr.SoundMgr.playSound("potato/劳资蜀道山");
      r_TimeSystem.TimeSystem.scheduleOnce("fial", 2, function () {
        r_PotatoResultUI.default.showUI({
          index: 3
        });
      });
    }
  };
  _ctor.prototype.addPro = function () {
    var e = this.pro.value + 25 > 100 ? 100 : this.pro.value + 25;
    this.pro.tweenValue(e, .3);
  };
  _ctor.prototype.subPro = function () {
    var e = this.pro.value - 25 < 0 ? 0 : this.pro.value - 25;
    this.pro.tweenValue(e, .3);
  };
  Object.defineProperty(_ctor.prototype, "role", {
    get: function () {
      if (3 != this.currId && 9 != this.currId) {
        return this.animRole;
      } else if (0 == this.currStep) {
        return this.animRole3;
      } else {
        return this.animRole3_2;
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setAnimRoleIdle = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_daiji", true);
    e && e();
  };
  _ctor.prototype.setAnimRoleCry = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_shengq", true);
    e && e();
  };
  _ctor.prototype.setAnimRoleHappy = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_kaix", true);
    e && e();
  };
  _ctor.prototype.setAnimRoleAnger = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_duojiao", true);
    e && e();
  };
  _ctor.prototype.setAnimRoleFear = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_jingkong", true);
    e && e();
  };
  _ctor.prototype.nextExecute = function () {
    this.execIndex++;
    this.execute(this.getCurrExecuteData());
  };
  _ctor.prototype.set3_3btn = function (e) {
    var t = this;
    if (0 == e) {
      this.addPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_kaix", true);
      this.contentPane.getTransition("t3_3_0").play(function () {
        t.execute(t.getCurrExecuteData());
      });
    } else if (1 == e) {
      this.subPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_duojiao", true);
      r_TimeSystem.TimeSystem.scheduleOnce("set3_3btn", 2, function () {
        t.execute(t.getCurrExecuteData());
      });
    } else if (2 == e) {
      this.addPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_kaix", true);
      this.contentPane.getTransition("t3_3_2").play(function () {
        t.execute(t.getCurrExecuteData());
      });
    }
  };
  _ctor.prototype.set3_4btn = function (e) {
    var t = this;
    if (0 == e) {
      this.subPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.animal, "huli", true);
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_duojiao", true);
      this.contentPane.getTransition("t3_4_0").play(function () {
        t.execute(t.getCurrExecuteData());
      });
    } else if (1 == e) {
      this.addPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.animal, "laohu", true);
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_kaix", true);
      this.contentPane.getTransition("t3_4_1").play(function () {
        t.execute(t.getCurrExecuteData());
      });
    } else if (2 == e) {
      this.addPro();
      r_UtilsSystem.UtilsSystem.playAnim(this.role, "tudou_kaix", true);
      this.contentPane.getTransition("t3_4_2").play(function () {
        t.execute(t.getCurrExecuteData());
      });
    }
  };
  _ctor.prototype.onExecute = function (e) {
    var t = this;
    3 == e.currId && 0 == e.currStep && 1 == e.execIndex && r_TimeSystem.TimeSystem.scheduleOnce("addPro", 3, function () {
      t.addPro();
    });
  };
  _ctor.prototype.set3_1fun = function (e) {
    this.setAnimRoleIdle(e);
    r_TimeSystem.TimeSystem.scheduleOnce("set3_1fun", 2, function () {
      r_SoundMgr.SoundMgr.playSound("potato/公主请上车");
    });
  };
  _ctor.prototype.onClickbtnFiree = function () {
    r_SoundMgr.SoundMgr.playSound("potato/核弹发射");
    this.execute(this.getCurrExecuteData());
  };
  _ctor.prototype.set4_3Fun = function (e) {
    this.pro2.value = 0;
    this.pro2.tweenValue(100, 2);
    this.setBubble("bubble_0", "小金豆爆金币了！");
    r_SoundMgr.SoundMgr.playSound("potato/爆金币");
    e && e();
  };
  _ctor.prototype.setBubble = function (e, t, o) {
    this[e].alpha = 0;
    this[e].text = t;
    cc.Tween.stopAllByTarget(this[e]);
    cc.tween(this[e]).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).call(function () {
      o && o();
    }).start();
  };
  _ctor.prototype.setHedan = function (e) {
    var t = this;
    r_TimeSystem.TimeSystem.scheduleOnce("setHedan", 3, function () {
      r_UtilsSystem.UtilsSystem.playAnim(t.hedan, "animation", false);
      r_SoundMgr.SoundMgr.playSound("potato/核弹爆炸");
    });
    r_UtilsSystem.UtilsSystem.playAnim(this.bbbbb, "hedan", true);
    e && e();
  };
  __decorate([r_DecorateFunction1.AutoFind("selectCom")], _ctor.prototype, "selectCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animRole")], _ctor.prototype, "animRole", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animRole3")], _ctor.prototype, "animRole3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animRole3_2")], _ctor.prototype, "animRole3_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animal")], _ctor.prototype, "animal", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pro")], _ctor.prototype, "pro", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pro")], _ctor.prototype, "pro2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFiree")], _ctor.prototype, "btnFiree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgXue")], _ctor.prototype, "imgXue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble_0")], _ctor.prototype, "bubble_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hedan")], _ctor.prototype, "hedan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bbbbb")], _ctor.prototype, "bbbbb", undefined);
  return _ctor;
}(r_BaseStepUI.default);
exports.default = def_PotatoUI;
var y = {
  0: {
    name: "初始场景",
    selectIndex: 0,
    steps: [{
      modeIndex: 0,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "anim",
        name: "t0"
      }, {
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble_0"],
    bubbleText: ["誓师大会速度放缓的撒"]
  },
  1: {
    name: "国外",
    selectIndex: 1,
    steps: [{
      modeIndex: 1,
      exec: [{
        type: "fun",
        name: "setAnimRoleFear"
      }, {
        type: "anim",
        name: "t1_1"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 2,
      exec: [{
        type: "anim",
        name: "t1_2"
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble_0"],
    bubbleText: ["誓师大会速度放缓的撒"]
  },
  2: {
    name: "三亚",
    selectIndex: 3,
    steps: [{
      modeIndex: 3,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "anim",
        name: "t2_1"
      }, {
        type: "next",
        name: null
      }]
    }, {
      modeIndex: 4,
      exec: [{
        type: "fun",
        name: "setAnimRoleCry"
      }, {
        type: "anim",
        name: "t2_2"
      }, {
        type: "next",
        name: null
      }]
    }],
    bubbleNodes: ["bubble_0"],
    bubbleText: ["誓师大会速度放缓的撒"]
  },
  3: {
    name: "哈尔冰",
    selectIndex: 5,
    steps: [{
      modeIndex: 5,
      exec: [{
        type: "fun",
        name: "set3_1fun"
      }, {
        type: "anim",
        name: "t3_1"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 6,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "stop",
        name: ""
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 7,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "stop",
        name: ""
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 8,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "stop",
        name: ""
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble_0"],
    bubbleText: ["誓师大会速度放缓的撒"]
  },
  4: {
    name: "彩蛋",
    selectIndex: 9,
    steps: [{
      modeIndex: 9,
      exec: [{
        type: "fun",
        name: "setAnimRoleIdle"
      }, {
        type: "stop",
        name: ""
      }, {
        type: "anim",
        name: "t4_1"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 10,
      exec: [{
        type: "fun",
        name: "setHedan"
      }, {
        type: "anim",
        name: "t4_2"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 11,
      exec: [{
        type: "fun",
        name: "set4_3Fun"
      }, {
        type: "anim",
        name: "t4_3"
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble_0"],
    bubbleText: ["誓师大会速度放缓的撒"]
  }
};