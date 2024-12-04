var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogueUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_DialogueTaskCfg = require("DialogueTaskCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DialogueEvent = require("DialogueEvent");
var r_BaseWin = require("BaseWin");
var r_BagSystem = require("BagSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_DialogueUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.NewGuide, r_UIDef.UIDef.Res.UI.DialogueUI) || this;
    t.dialogueTask = {};
    t.btnAnswerList = [];
    t.curIndex = 0;
    t.isCanClose = false;
    t.oneByOneCallback = null;
    t.nodeList = [];
    t.nodeListPos = [];
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
    this.show(r_UIDef.UIDef.Urls.UI.DialogueUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DialogueUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    for (var o = 0; o < r_DialogueTaskCfg.DialogueTaskCfg.length; o++) {
      var i = r_DialogueTaskCfg.DialogueTaskCfg[o];
      this.dialogueTask[i.id] = i;
    }
    this.clickLayer.onClick(this.onContinue, this);
    this.clickLayer.visible = false;
    this.btnContinue.onClick(this.onContinue, this);
    this.clickClose.onClick(this.onCloseOneByOne, this);
    var n = function (e) {
      a.contentPane.getChild("btnAnswer" + (e + 1)).clearClick();
      a.contentPane.getChild("btnAnswer" + (e + 1)).onClick(function () {
        t.onClickChat(e);
      });
    };
    var a = this;
    for (o = 0; o < 3; o++) {
      n(o);
    }
    this.btnJump.onClick(this.onClickJump, this);
    this.btnAnswerList = [this.btnAnswer1, this.btnAnswer2, this.btnAnswer3];
    this.bg.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.nodeList = [this.role, this.role1, this.sayCom];
    this.nodeListPos = [new cc.Vec2(this.role.x, this.role.y), new cc.Vec2(this.role1.x, this.role1.y), new cc.Vec2(this.sayCom.x, this.sayCom.y)];
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    _ctor.isShow = true;
    this.isCanClose = false;
    this.oneByOneCallback = null;
    this.curIndex = 1;
    this.startCircle(new cc.Vec2(0, 0), 0, 0);
    if (this.data) {
      if (this.data.id) {
        this.cfg = this.dialogueTask[this.data.id];
      } else {
        this.cfg = this.dialogueTask[this.data];
      }
    }
    this.btnJump.visible = false;
    this.cfg.jumpForTaskId && (this.btnJump.visible = true);
    this.bg.asLoader.url = "";
    this.bg.node.opacity = 0;
    this.curIndex > Object.values(this.cfg.taskList).length && (this.curIndex = Object.values(this.cfg.taskList).length);
    this.cfg.taskList[this.curIndex].isFinish && !this.cfg.taskList[this.curIndex].unAutoFinish && this.Finish();
    this.showContent();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    for (var o = 0; o < this.nodeList.length; o++) {
      this.nodeList[o].x = this.nodeListPos[o].x;
      this.nodeList[o].y = this.nodeListPos[o].y;
    }
    _ctor.Inst = null;
    _ctor.isShow = false;
  };
  _ctor.prototype.onClickChat = function (e) {
    var o = this.curIndex;
    if (this.cfg.taskList[this.curIndex] && this.cfg.taskList[this.curIndex].btn) {
      if (this.cfg.taskList[this.curIndex].isFinish) {
        this.triggerEvent(this.cfg.taskList[this.curIndex].btn[e].event);
        this.data.closeback && this.data.closeback();
        _ctor.hide();
      } else {
        if (this.cfg.taskList[this.curIndex].btn[e].condition) {
          this.triggerEvent(this.cfg.taskList[this.curIndex].btn[e].event);
          if (this.checkCondition(this.cfg.taskList[this.curIndex].btn[e].condition)) {
            this.cfg.taskList[this.curIndex].btn[e].nextId && (this.curIndex = this.cfg.taskList[this.curIndex].btn[e].nextId[0]);
          } else {
            if (!this.cfg.taskList[this.curIndex].btn[e].failNextId) {
              return void r_UtilsSystem.UtilsSystem.showTip("未拥有" + r_BagSystem.BagSystem.getGoodsInfoById(this.cfg.taskList[this.curIndex].btn[e].condition.goodsId).name);
            }
            this.curIndex = this.cfg.taskList[this.curIndex].btn[e].failNextId[0];
          }
        } else {
          if ("coin" == this.cfg.taskList[this.curIndex].btn[e].type) {
            if (!r_PlayerData.PlayerData.isCoinEnough(this.cfg.taskList[this.curIndex].btn[e].money)) {
              return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
            }
            r_PlayerData.PlayerData.deleteCoin("购买雪糕店", this.cfg.taskList[this.curIndex].btn[e].money, r_ReportSystem.SystemKey.None);
          }
          this.triggerEvent(this.cfg.taskList[this.curIndex].btn[e].event);
          this.cfg.taskList[this.curIndex].btn && this.cfg.taskList[this.curIndex].btn[e].nextId && (this.curIndex = this.cfg.taskList[this.curIndex].btn[e].nextId[0]);
        }
        o != this.curIndex && this.showContent();
      }
    }
  };
  _ctor.prototype.checkCondition = function (e) {
    if (e.goodsId) {
      return !!r_BagSystem.BagSystem.getPlayerGoodsInfoById(e.goodsId);
    }
  };
  _ctor.prototype.onContinue = function () {
    if (this.isCanClose) {
      if (this.curIndex == Object.values(this.cfg.taskList).length || this.cfg.taskList[this.curIndex].isFinish) {
        this.Finish();
        this.curIndex = 0;
      } else {
        this.curIndex += 1;
        this.showContent();
      }
    }
  };
  _ctor.prototype.onClickJump = function () {
    if (this.cfg.jumpForTaskId && this.cfg.jumpForTaskId <= this.curIndex) {
      this.curIndex = this.cfg.jumpForTaskId;
    } else {
      this.curIndex = Object.values(this.cfg.taskList).length;
    }
    this.Finish();
    if (this.cfg.taskList[this.curIndex] && this.cfg.taskList[this.curIndex].btn) {
      this.triggerEvent(this.cfg.taskList[this.curIndex].btn[0].event);
      this.cfg.taskList[this.curIndex].btn[0].func && this.cfg.taskList[this.curIndex].btn[0].func();
    }
    this.cfg.taskList[this.curIndex].isFinish || this.triggerEvent([{
      type: "对话结束"
    }]);
  };
  _ctor.prototype.startByIndex = function (e) {
    this.curIndex = e;
    this.showContent();
  };
  _ctor.prototype.onCloseOneByOne = function () {
    this.cfg.taskList[this.curIndex] && !this.isCanClose && r_UtilsSystem.UtilsSystem.stopLabelOneByOne(this.content, this.cfg.taskList[this.curIndex].content, this.oneByOneCallback);
  };
  _ctor.prototype.showContent = function () {
    var e = this;
    this.isCanClose = false;
    this.btnContinue.visible = false;
    this.showAnserBtnVisibe(false);
    if (this.cfg.taskList[this.curIndex].isMy) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.sayCom.getController("c1").selectedIndex = 1;
      this.cfg.taskList[this.curIndex].roleAnimInfo && r_ResSystem.ResSystem.loadBundleRes("bundle2", this.cfg.taskList[this.curIndex].roleAnimInfo.animPath, cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.role1.node.removeAllChildren();
        var i = cc.instantiate(o);
        e.role1.node.addChild(i);
        e.showRoleAnim(e.role1.node, e.cfg.taskList[e.curIndex].roleAnimInfo.animName);
      });
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
      this.sayCom.getController("c1").selectedIndex = 0;
      this.cfg.taskList[this.curIndex].roleAnimInfo && r_ResSystem.ResSystem.loadBundleRes("bundle2", this.cfg.taskList[this.curIndex].roleAnimInfo.animPath, cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.role.node.removeAllChildren();
        var i = cc.instantiate(o);
        e.role.node.addChild(i);
        e.showRoleAnim(e.role.node, e.cfg.taskList[e.curIndex].roleAnimInfo.animName);
      });
    }
    this.oneByOneCallback = function () {
      if (e.cfg.taskList[e.curIndex] && e.cfg.taskList[e.curIndex].btn) {
        e.showAnserBtnVisibe(true);
        for (var t = 0; t < e.cfg.taskList[e.curIndex].btn.length; t++) {
          e.showBtnAnim(e.btnAnswerList[t]);
        }
      } else {
        e.isCanClose = true;
        e.btnContinue.visible = true;
        e.cfg.taskList[e.curIndex].isFinish && !e.cfg.taskList[e.curIndex].unAutoFinish && e.Finish();
      }
      e.clickClose.visible = false;
    };
    this.clickClose.visible = true;
    if (this.cfg.taskList[this.curIndex].richText) {
      r_UtilsSystem.UtilsSystem.makeRichTextTyper(this.content, this.cfg.taskList[this.curIndex].content, .05, this.oneByOneCallback);
    } else {
      r_UtilsSystem.UtilsSystem.showLabelOneByOne(this.content, this.cfg.taskList[this.curIndex].content, .05, this.oneByOneCallback);
    }
    if (this.cfg.taskList[this.curIndex].btn) {
      this.clickLayer.visible = false;
      this.setAnserBtnInfo();
    } else {
      this.clickLayer.visible = true;
    }
    this.nameInfo.getChild("name").text = this.cfg.taskList[this.curIndex].name;
    if (15 == this.cfg.id && this.cfg.taskList[this.curIndex].circleTip && (this.curIndex, this.cfg.taskList[this.curIndex].pos)) {
      for (var t = 0; t < this.nodeList.length; t++) {
        this.nodeList[t].y -= this.cfg.taskList[this.curIndex].pos[1];
      }
    }
  };
  _ctor.prototype.setAnserBtnInfo = function () {
    this.btnAnswer3.getController("mode").selectedIndex = 0;
    this.btnAnswer2.getController("mode").selectedIndex = 0;
    this.btnAnswer1.getController("mode").selectedIndex = 0;
    for (var e = 0; e < this.btnAnswerList.length; e++) {
      if (e < this.cfg.taskList[this.curIndex].btn.length) {
        var t = this.cfg.taskList[this.curIndex].btn[e].content;
        t.length > 8 && (t = t.substr(0, 7) + "...");
        this.btnAnswerList[e].getChild("content").text = t;
        if ("video" == this.cfg.taskList[this.curIndex].btn[0].type) {
          this.btnAnswerList[e].getController("mode").selectedIndex = 2;
        } else {
          "coin" == this.cfg.taskList[this.curIndex].btn[0].type && (this.btnAnswerList[e].getController("mode").selectedIndex = 1);
        }
      }
    }
  };
  _ctor.prototype.showAnserBtnVisibe = function (e) {
    if (!this.cfg.taskList[this.curIndex].btn) {
      this.btnAnswer1.visible = false;
      this.btnAnswer2.visible = false;
      return void (this.btnAnswer3.visible = false);
    }
    if (1 == this.cfg.taskList[this.curIndex].btn.length) {
      this.btnAnswer1.visible = e;
      this.btnAnswer2.visible = false;
      this.btnAnswer3.visible = false;
    } else if (2 == this.cfg.taskList[this.curIndex].btn.length) {
      this.btnAnswer1.visible = e;
      this.btnAnswer2.visible = e;
      this.btnAnswer3.visible = false;
    } else if (3 == this.cfg.taskList[this.curIndex].btn.length) {
      this.btnAnswer1.visible = e;
      this.btnAnswer2.visible = e;
      this.btnAnswer3.visible = e;
    }
  };
  _ctor.prototype.showBtnAnim = function (e) {
    var t = this;
    e.scaleX = e.scaleY = 0;
    cc.tween(e).to(.2, {
      scaleX: 1,
      scaleY: 1
    }).call(function () {
      t.isCanClose = true;
    }).start();
  };
  _ctor.prototype.showRoleAnim = function (e, t) {
    undefined === t && (t = false);
    if (e && t) {
      var o = e.children[0].getComponent(sp.Skeleton);
      o && o.setAnimation(0, t, true);
    }
  };
  _ctor.prototype.Finish = function () {
    this.isCanClose = false;
    this.cfg.taskList[this.curIndex].event && this.triggerEvent(this.cfg.taskList[this.curIndex].event);
    this.data.closeback && this.data.closeback();
    _ctor.hide();
  };
  _ctor.prototype.startCircle = function (e, t, o) {
    this.guideCircle.visible = true;
    var i = this.guideCircle.globalToLocal(e.x, e.y);
    this.guideCircle.getChild("circle").x = i.x;
    this.guideCircle.getChild("circle").y = i.y;
    this.guideCircle.getChild("circle").width = t;
    this.guideCircle.getChild("circle").height = o;
  };
  _ctor.prototype.triggerEvent = function (e) {
    if (e) {
      var t = new r_DialogueEvent.DialogueShow();
      for (var o = 0; o < e.length; o++) {
        t.trigger(e[o]);
      }
    } else {
      console.error(" DialogueUI triggerEvent is null.");
    }
  };
  _ctor.isShow = false;
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickClose")], _ctor.prototype, "clickClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("sayCom")], _ctor.prototype, "sayCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("sayCom/content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("sayCom/nameInfo")], _ctor.prototype, "nameInfo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role1")], _ctor.prototype, "role1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg")], _ctor.prototype, "bg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAnswer1")], _ctor.prototype, "btnAnswer1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAnswer2")], _ctor.prototype, "btnAnswer2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAnswer3")], _ctor.prototype, "btnAnswer3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("sayCom/btnContinue")], _ctor.prototype, "btnContinue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideCircle")], _ctor.prototype, "guideCircle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJump")], _ctor.prototype, "btnJump", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.DialogueUI = exp_DialogueUI;