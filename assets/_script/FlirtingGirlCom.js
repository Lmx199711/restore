var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SKUtilsSystem = require("SKUtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_FlirtingGirlCfg = require("FlirtingGirlCfg");
var r_SoundMgr = require("SoundMgr");
var r_FGCertificateUI = require("FGCertificateUI");
var r_FGResultUI = require("FGResultUI");
var r_FlirtingGirlCaidanUI = require("FlirtingGirlCaidanUI");
var r_FlirtingGirlEvent = require("FlirtingGirlEvent");
var r_FlirtingGirlUI = require("FlirtingGirlUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_FlirtingGirlCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.chatNode = null;
    t.yuMaoSpine = null;
    t.proNode = null;
    t.zsNode = null;
    t.roleAction = null;
    t.chatLabel = null;
    t.proLabel = null;
    t.chairNode = null;
    t.roleBox = null;
    t.roleSpine = null;
    t.roleSpineSit = null;
    t.chairNodePos = cc.v2(0, 0);
    t.chairNodePos_2 = cc.v2(-148, -142);
    t.currRoleSpine = null;
    t.lastAnimName = "";
    t.currStage = 1;
    t.currPro = 100;
    t.isPalyYM = false;
    t.isGameOver = false;
    t.isCaidan = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.chairNode = this.node.getChildByName("chairNode");
    this.chatLabel = this.chatNode.getChildByName("chatLabel").getComponent(cc.Label);
    this.chairNodePos = this.chairNode.getPosition();
    this.roleBox = this.node.getChildByName("roleBox");
    this.roleSpine = this.node.getChildByName("roleNode").getComponent(sp.Skeleton);
    this.roleSpineSit = this.node.getChildByName("roleSitNode").getComponent(sp.Skeleton);
    this.proLabel = this.proNode.node.getChildByName("proLablel").getComponent(cc.Label);
  };
  _ctor.prototype.resetStart = function () {
    this.proNode.node.active = false;
    this.isCaidan = false;
    this.chairNode.setPosition(this.chairNodePos);
    this.roleSpine.node.active = true;
    this.roleSpineSit.node.active = false;
    this.roleAction.node.active = false;
    this.yuMaoSpine.node.active = false;
    this.currRoleSpine = this.roleSpine;
    this.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.xianqi, true);
    this.resetPro();
    this.currStage = 1;
    this.isPalyYM = false;
    this.isGameOver = false;
    this.zsNode.active = true;
    this.startChairTouch();
  };
  _ctor.prototype.resetPro = function () {
    this.currPro = 100;
    this.proNode.progress = 1;
  };
  _ctor.prototype.startChairTouch = function () {
    this.chairNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchChairMove, this);
    this.chairNode.on(cc.Node.EventType.TOUCH_END, this.touchChairEnd, this);
    this.zsNode.on(cc.Node.EventType.TOUCH_END, this.clickZs, this);
  };
  _ctor.prototype.EndChairTouch = function () {
    this.chairNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchChairMove, this);
    this.chairNode.off(cc.Node.EventType.TOUCH_END, this.touchChairEnd, this);
    this.zsNode.off(cc.Node.EventType.TOUCH_END, this.clickZs, this);
  };
  _ctor.prototype.touchChairMove = function (e) {
    var t = e.getLocation();
    var o = this.node.convertToNodeSpaceAR(t);
    this.chairNode.setPosition(o);
  };
  _ctor.prototype.touchChairEnd = function (e) {
    var t = e.getLocation();
    var o = this.node.convertToNodeSpaceAR(t);
    this.chairNode.setPosition(o);
    if (this.roleBox.getBoundingBox().contains(o)) {
      this.EndChairTouch();
      this.roleSitDown();
    }
  };
  _ctor.prototype.clickZs = function () {
    r_FGCertificateUI.FGCertificateUI.showUI();
  };
  _ctor.prototype.roleSitDown = function () {
    this.startAddPro();
    this.startChat();
    this.proNode.node.active = true;
    this.chairNode.setPosition(this.chairNodePos_2);
    this.roleSpine.node.active = false;
    this.roleSpineSit.node.active = true;
    this.currRoleSpine = this.roleSpineSit;
    this.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.piezuizuo, true);
    r_FlirtingGirlUI.default.instace.showNaoBtn();
    this.currStage = 2;
    this.zsNode.active = false;
  };
  _ctor.prototype.roleCaidan = function () {
    this.proNode.node.active = true;
    this.chairNode.setPosition(this.chairNodePos_2);
    this.roleSpine.node.active = false;
    this.roleSpineSit.node.active = true;
    this.currRoleSpine = this.roleSpineSit;
    this.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.piezuizuo, true);
    r_FlirtingGirlUI.default.instace.showNaoBtn();
    this.currStage = 2;
    this.zsNode.active = false;
    this.isCaidan = true;
    this.m_touArr = [0, 0, 0];
  };
  _ctor.prototype.playCurrRoleAnim = function (e, t) {
    var o = this;
    if (this.lastAnimName != e) {
      this.lastAnimName = e;
      if (t) {
        this.currRoleSpine.setAnimation(0, e, true);
      } else {
        this.currRoleSpine.setAnimation(0, e, false);
        this.currRoleSpine.setCompleteListener(function () {
          o.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.piezuizuo, true);
          o.currRoleSpine.setCompleteListener(null);
        });
      }
    }
  };
  _ctor.prototype.playYuMaoAnim = function () {
    var e = this;
    if (!(this.isPalyYM || this.isGameOver)) {
      this.isPalyYM = true;
      this.yuMaoSpine.node.active = true;
      this.yuMaoSpine.setAnimation(0, r_FlirtingGirlEvent.AnimName.yumao, true);
      this.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.zuochayi, true);
      r_SoundMgr.SoundMgr.playSound("flirtingGirl/挠痒痒音效");
      r_TimeSystem.TimeSystem.scheduleOnce("yumao", 3, function () {
        e.yuMaoSpine.node.active = false;
        e.isPalyYM = false;
        r_TimeSystem.TimeSystem.scheduleClear("yumao");
        e.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.piezuizuo, true);
        r_SoundMgr.SoundMgr.stopSound("flirtingGirl/挠痒痒音效");
      });
    }
  };
  _ctor.prototype.showChat = function () {
    var e = this;
    var t = "chat_" + this.currStage;
    var o = r_FlirtingGirlCfg.FGChatCfg[t];
    var i = o[r_SKUtilsSystem.SKUtilsSystem.getRandomNum(0, o.length - 1)];
    this.chatLabel.string = i;
    cc.tween(this.chatNode).to(.5, {
      opacity: 255
    }).delay(2).call(function () {
      cc.tween(e.chatNode).to(.5, {
        opacity: 0
      }).start();
    }).start();
  };
  _ctor.prototype.showChat2 = function (e) {
    var t = this;
    var o = r_FlirtingGirlCfg.FGCaidanChatCfg.chats;
    var i = o[e];
    this.chatLabel.string = i;
    cc.tween(this.chatNode).to(.5, {
      opacity: 255
    }).delay(2).call(function () {
      cc.tween(t.chatNode).to(.5, {
        opacity: 0
      }).start();
    }).start();
    var n = (o = r_FlirtingGirlCfg.FGCaidanChatCfg.animNames)[e];
    this.playCurrRoleAnim(n, true);
    r_TimeSystem.TimeSystem.scheduleOnce("animComplate", 2, function () {
      t.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.piezuizuo, true);
    });
    r_SoundMgr.SoundMgr.playSound("flirtingGirl/" + r_FlirtingGirlCfg.FGCaidanChatCfg.sounds[e]);
    this.roleAction.node.active = true;
    this.roleAction.setAnimation(0, r_FlirtingGirlCfg.FGCaidanChatCfg.actionName[e], false);
    this.roleAction.setCompleteListener(function () {
      t.roleAction.node.active = false;
      t.roleAction.setCompleteListener(null);
    });
  };
  _ctor.prototype.startChat = function () {
    var e = this;
    this.showChat();
    r_TimeSystem.TimeSystem.schedule("chat", 5, function () {
      e.showChat();
    });
  };
  _ctor.prototype.startAddPro = function () {
    var e = this;
    r_TimeSystem.TimeSystem.schedule("addPro", .5, function () {
      e.changePro(2);
    });
  };
  _ctor.prototype.naoyang = function () {
    if (!(this.isGameOver || this.isGameOver)) {
      this.general(-3);
      this.playYuMaoAnim();
    }
  };
  _ctor.prototype.gun = function () {
    if (!this.isGameOver) {
      this.general(-25);
      this.m_touArr[0]++;
      this.showChat2(0);
    }
  };
  _ctor.prototype.kiss = function () {
    if (!this.isGameOver) {
      this.general(-25);
      this.m_touArr[1]++;
      this.showChat2(1);
    }
  };
  _ctor.prototype.bug = function () {
    if (!this.isGameOver) {
      this.general(-25);
      this.m_touArr[2]++;
      this.showChat2(2);
    }
  };
  _ctor.prototype.general = function (e) {
    if (!this.isGameOver) {
      3 != this.currStage && (this.currStage = 3);
      this.changePro(e);
      this.showProLabel();
    }
  };
  _ctor.prototype.changePro = function (e) {
    if (!this.isGameOver) {
      this.currPro += e;
      if (this.currPro <= 0) {
        this.currPro = 0;
        this.proNode.progress = 0;
        this.isGameOver = true;
        this.winGame();
      } else if (this.currPro >= 100) {
        this.currPro = 100;
        var t = this.currPro / 100;
        this.proNode.progress = t;
      } else {
        t = this.currPro / 100;
        this.proNode.progress = t;
      }
    }
  };
  _ctor.prototype.showWinGameChat = function () {
    var e = this;
    this.chatNode.opacity = 0;
    this.chatNode.stopAllActions();
    this.chatLabel.string = r_FlirtingGirlCfg.FGChatCfg.chat_4;
    "" != r_FlirtingGirlCfg.FGChatCfg.chat_4Sound && r_SoundMgr.SoundMgr.playSound(r_FlirtingGirlCfg.FGChatCfg.chat_4Sound);
    cc.tween(this.chatNode).to(.5, {
      opacity: 255
    }).delay(2).call(function () {
      cc.tween(e.chatNode).to(.5, {
        opacity: 0
      }).start();
    }).start();
  };
  _ctor.prototype.winGame = function () {
    var e = this;
    this.endGame();
    if (!this.isCaidan) {
      this.playCurrRoleAnim(r_FlirtingGirlEvent.AnimName.zuoku, true);
      this.showWinGameChat();
    }
    r_TimeSystem.TimeSystem.scheduleOnce("jiesuan", 2, function () {
      if (e.isCaidan) {
        var t = e.resultMax();
        r_FlirtingGirlCaidanUI.default.showUI(t);
        return void r_SoundMgr.SoundMgr.playSound("salvage/dalaobaowu");
      }
      r_FGResultUI.FGResultUI.showUI();
    });
  };
  _ctor.prototype.resultMax = function () {
    var e = 0;
    var t = 0;
    this.m_touArr.forEach(function (o, i) {
      if (e < o) {
        e = o;
        t = i;
      }
    });
    return t;
  };
  _ctor.prototype.endGame = function () {
    r_TimeSystem.TimeSystem.scheduleClear("chat");
    r_TimeSystem.TimeSystem.scheduleClear("addPro");
    r_TimeSystem.TimeSystem.scheduleClear("yumao");
    this.EndChairTouch();
  };
  _ctor.prototype.showProLabel = function () {
    this.proLabel.string = this.currPro + "%";
  };
  __decorate([_property({
    displayName: "对话框",
    type: cc.Node
  })], _ctor.prototype, "chatNode", undefined);
  __decorate([_property({
    displayName: "yuMaoSpine",
    type: sp.Skeleton
  })], _ctor.prototype, "yuMaoSpine", undefined);
  __decorate([_property({
    displayName: "proNode",
    type: cc.ProgressBar
  })], _ctor.prototype, "proNode", undefined);
  __decorate([_property({
    displayName: "证书",
    type: cc.Node
  })], _ctor.prototype, "zsNode", undefined);
  __decorate([_property({
    displayName: "动作",
    type: sp.Skeleton
  })], _ctor.prototype, "roleAction", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_FlirtingGirlCom;