var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatDetailUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_ChatSystem = require("ChatSystem");
var r_TimeSystem = require("TimeSystem");
var r_ChatResultUI = require("ChatResultUI");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_ChatUI = require("ChatUI");
var r_GuideSystem = require("GuideSystem");
var r_SoundMgr = require("SoundMgr");
var r_ChatUISystem = require("ChatUISystem");
var r_ChatImageUI = require("ChatImageUI");
var r_ReportSystem = require("ReportSystem");
var r_ChangeSystem = require("ChangeSystem");
var r_HomeworkUI = require("HomeworkUI");
var r_HomeworkResultUI = require("HomeworkResultUI");
var exp_ChatDetailUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Res.UI.ChatDetailUI) || this;
    t.wordLimitWidth = 400;
    t.redPacketWidth = 348;
    t.redPacketHeight = 175;
    t.transferHeight = 760;
    t.transferCoin = 0;
    t.chatContentHeight = 0;
    t.curItemHeight = 0;
    t.maxMoveHeight = 0;
    t.curTransferIndex = 0;
    t.curTaskInfo = null;
    t.curChatInfo = null;
    t.chatInfoMap = null;
    t.chatInfoList = [];
    t.curState = {};
    t.transferCallBack = null;
    t.isNewTalk = true;
    t.chatHomeworkList = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChatDetailUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChatDetailUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnJump = this.contentPane.getChild("btnJump").asButton;
    this.btnJump.onClick(this.onClickJump, this);
    var t = this.contentPane.getChild("content");
    this.fguiContent = t;
    var o = new cc.Node("chatRoot");
    o.anchorX = .5;
    o.anchorY = 1;
    o.x = t.width / 2;
    o.width = t.width;
    o.height = t.height;
    o.addComponent(cc.Mask);
    t.node.addChild(o);
    this.chatRoot = o;
    var i = new cc.Node("chatMoveRoot");
    this.chatRoot.addChild(i);
    this.chatMoveRoot = i;
    this.chatIconRoot = new cc.Node("chatIconRoot");
    this.chatMoveRoot.addChild(this.chatIconRoot);
    this.chatBgRoot = new cc.Node("chatBgRoot");
    this.chatMoveRoot.addChild(this.chatBgRoot);
    this.chatLabelRoot = new cc.Node("chatLabelRoot");
    this.chatMoveRoot.addChild(this.chatLabelRoot);
    this.replyCom = this.contentPane.getChild("replyCom");
    this.replyCom.visible = false;
    this.replyCom.getChild("btnChat1").onClick(this.onClickChat1, this);
    this.replyCom.getChild("btnChat2").onClick(this.onClickChat2, this);
    this.replyCom.getChild("btnChat3").onClick(this.onClickChat3, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.replyCom.visible = false;
    this.clearChatContent();
    if (r_ChatSystem.ChatSystem.isTaskFinish(this.data.taskId)) {
      this.isNewTalk = false;
      this.startFinishChat();
    } else {
      this.isNewTalk = true;
      this.startTalkTask(this.data.taskId);
    }
    this.contentPane.getChild("name").text = this.curTaskInfo.name;
    this.registTouch();
    this.btnBack.visible = true;
    this.btnJump.visible = false;
    r_ChatSystem.ChatSystem.isOneTimeTask(this.data.taskId) && (this.btnBack.visible = false);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("chatShowInfo");
    this.data.callBack && this.data.callBack();
  };
  _ctor.prototype.clearChatContent = function () {
    this.curItemHeight = 0;
    this.chatInfoList = [];
    this.chatIconRoot.destroyAllChildren();
    this.chatBgRoot.destroyAllChildren();
    this.chatLabelRoot.destroyAllChildren();
  };
  _ctor.prototype.onClickChat1 = function () {
    var e = this.chatInfoMap[this.curChatInfo.resultInfo[0]];
    if (this.curTransferIndex) {
      e = this.chatInfoMap[this.curChatInfo.resultInfo[this.curTransferIndex - 1]];
      this.curTransferIndex = 0;
    }
    this.startMyChat(e);
  };
  _ctor.prototype.onClickChat2 = function () {
    var e = this.chatInfoMap[this.curChatInfo.resultInfo[0]];
    this.startMyChat(e);
  };
  _ctor.prototype.onClickChat3 = function () {
    var e = this.chatInfoMap[this.curChatInfo.resultInfo[1]];
    this.startMyChat(e);
  };
  _ctor.prototype.startMyChat = function (e) {
    if ("hongbao" != e.chatList[0].type || r_PlayerData.PlayerData.isCoinEnough(e.chatList[0].coin)) {
      "hongbao" == e.chatList[0].type && r_PlayerData.PlayerData.deleteCoin("发红包", e.chatList[0].coin, r_ReportSystem.SystemKey.零花钱);
      if ("btn" == e.chatList[0].type) {
        if ("finish" == e.resultType) {
          r_PlatformSystem.PlatformSystem.stopRecorder();
          r_ChatSystem.ChatSystem.isOneTimeTask(this.data.taskId) || r_ChatSystem.ChatSystem.isNotShowTask(this.data.taskId) || this.chatHomeworkList.includes(this.data.taskId) || r_PlayerData.PlayerData.finishChatTask(this.curTaskInfo.id, this.curState);
          r_PlayerData.PlayerData.data.guideIndex <= 0 && (r_PlayerData.PlayerData.data.guideIndex = 1);
          this.hide();
          r_ChatUI.ChatUI.Inst && r_ChatUI.ChatUI.Inst.refreshList();
        }
        return void (e.chatList[0].changeUI && r_ChangeSystem.ChangeSystem.setChangeWinNew(e.chatList[0].changeUI));
      }
      this.startChatInfo(e);
      this.replyCom.visible = false;
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickJump = function () {
    r_PlayerData.PlayerData.data.guideIndex = 1;
    this.hide();
    r_PlatformSystem.PlatformSystem.stopRecorder();
    var e = this.curState.taskList[this.curState.taskList.length - 1];
    for (var t = 0; t <= this.curTaskInfo.taskList.length; t++) {
      var o = this.chatInfoMap[e];
      if ("chat" != o.resultType) {
        break;
      }
      this.curState.taskList.push(o.resultInfo[0]);
      e = o.resultInfo[0];
    }
    this.chatHomeworkList.includes(this.data.taskId) || r_PlayerData.PlayerData.finishChatTask(this.curTaskInfo.id, this.curState);
  };
  _ctor.prototype.getChatInfoFromTask = function (e, t) {
    for (var o = 0; o < e.taskList.length; o++) {
      var i = e.taskList[o];
      if (i.id == t) {
        return i;
      }
    }
  };
  _ctor.prototype.startFinishChat = function () {
    var e = r_ChatSystem.ChatSystem.getChatTaskById(this.data.taskId);
    this.curState = r_PlayerData.PlayerData.data.finishChatStateMap[this.data.taskId];
    this.curTaskInfo = e;
    for (var t = 0; t < this.curState.taskList.length; t++) {
      var o = this.curState.taskList[t];
      var i = this.getChatInfoFromTask(e, o);
      if (i) {
        for (var n = 0; n < i.chatList.length; n++) {
          this.showOneChatInfo(i.chatList[n], i);
        }
      }
    }
  };
  _ctor.prototype.startTalkTask = function (e) {
    this.curState = {};
    this.curState.taskList = [];
    this.curState.finishMap = {};
    this.chatInfoMap = {};
    var t = r_ChatSystem.ChatSystem.getChatTaskById(e);
    this.curTaskInfo = t;
    var o = false;
    for (var i = 0; i < this.curTaskInfo.taskList.length; i++) {
      "win" == this.curTaskInfo.taskList[i].resultType && (o = true);
      this.chatInfoMap[this.curTaskInfo.taskList[i].id] = this.curTaskInfo.taskList[i];
    }
    o && r_PlatformSystem.PlatformSystem.startRecorder();
    this.startChatInfo(this.curTaskInfo.taskList[0]);
  };
  _ctor.prototype.showOneChatInfo = function (e, t) {
    if (t.isMy) {
      this.isNewTalk && r_SoundMgr.SoundMgr.playSound("huifuxiaoxi");
      if ("text" == e.type) {
        this.addRightChat(e, t);
      } else if ("hongbao" == e.type) {
        this.addRightHongbao(e, t);
      } else {
        "image" == e.type && this.addRightImage(e, t);
      }
    } else {
      this.isNewTalk && r_SoundMgr.SoundMgr.playSound("xinxiaoxi");
      if ("text" == e.type) {
        this.addLeftChat(e, t);
      } else if ("hongbao" == e.type) {
        this.addLeftHongbao(e, t);
      } else if ("image" == e.type) {
        this.addLeftImage(e, t);
      } else {
        "transfer" == e.type && this.addTransfer(e, t);
      }
    }
  };
  _ctor.prototype.startChatInfo = function (e) {
    var t = this;
    this.curChatInfo = e;
    this.curState.taskList.push(e.id);
    var o;
    var i = 0;
    (o = function () {
      var n = e.chatList[i];
      t.showOneChatInfo(n, e);
      i += 1;
      r_TimeSystem.TimeSystem.scheduleOnce("chatShowInfo", 1, function () {
        if (i > t.curChatInfo.chatList.length - 1) {
          "transfer" == t.curChatInfo.chatList[0].type || "hongbao" == t.curChatInfo.chatList[0].type && t.curChatInfo.chatList[0].mustGet || t.nextChat(e);
        } else {
          o();
        }
      });
    })();
  };
  _ctor.prototype.setBtnText = function (e, t) {
    var o;
    if ("hongbao" == t.chatList[0].type) {
      e.getController("mode").selectedIndex = 1;
      e.getChild("content2").text = "发送红包" + t.chatList[0].coin + "元";
    } else if ("btn" == t.chatList[0].type) {
      e.getController("mode").selectedIndex = 2;
      (o = t.chatList[0].content).length > 12 && (o = o.substr(0, 11) + "...");
      e.getChild("content3").text = o;
    } else {
      e.getController("mode").selectedIndex = 0;
      (o = t.chatList[0].content).length > 12 && (o = o.substr(0, 11) + "...");
      e.getChild("content").text = o;
    }
  };
  _ctor.prototype.nextChat = function (e) {
    var t = this;
    if ("chat" == e.resultType) {
      var o = e.resultInfo;
      if (!this.isNewTalk) {
        return void this.startChatInfo(this.chatInfoMap[o[0]]);
      }
      if ((n = this.chatInfoMap[o[0]]).isMy) {
        this.replyCom.visible = true;
        if (1 == o.length) {
          this.replyCom.getController("mode").selectedIndex = 0;
          this.setBtnText(this.replyCom.getChild("btnChat1"), this.chatInfoMap[o[0]]);
        } else {
          this.replyCom.getController("mode").selectedIndex = 1;
          this.setBtnText(this.replyCom.getChild("btnChat2"), this.chatInfoMap[o[0]]);
          this.setBtnText(this.replyCom.getChild("btnChat3"), this.chatInfoMap[o[1]]);
        }
      } else {
        this.startChatInfo(this.chatInfoMap[o[0]]);
      }
    } else if ("win" == e.resultType) {
      console.log("胜利");
      var i = function () {
        r_ChatSystem.ChatSystem.isOneTimeTask(t.data.taskId) || r_ChatSystem.ChatSystem.isNotShowTask(t.data.taskId) || t.chatHomeworkList.includes(t.data.taskId) || r_PlayerData.PlayerData.finishChatTask(t.curTaskInfo.id, t.curState);
        t.hide();
        r_ChatUI.ChatUI.Inst && r_ChatUI.ChatUI.Inst.refreshList();
      };
      r_ChatResultUI.ChatResultUI.showUI({
        isWin: true,
        callBack: i
      });
    } else if ("fail" == e.resultType) {
      i = function (e) {
        if ("revive" == e) {
          t.reviveChat();
        } else if ("restart" == e) {
          r_PlatformSystem.PlatformSystem.stopRecorder();
          t.restartChat();
        }
      };
      r_ChatResultUI.ChatResultUI.showUI({
        isWin: false,
        callBack: i
      });
      console.log("失败");
    } else if ("finish" == e.resultType) {
      r_PlatformSystem.PlatformSystem.stopRecorder();
      r_ChatSystem.ChatSystem.isOneTimeTask(this.data.taskId) || r_ChatSystem.ChatSystem.isNotShowTask(this.data.taskId) || this.chatHomeworkList.includes(this.data.taskId) || r_PlayerData.PlayerData.finishChatTask(this.curTaskInfo.id, this.curState);
      r_PlayerData.PlayerData.data.guideIndex <= 0 && (r_PlayerData.PlayerData.data.guideIndex = 1);
      this.hide();
      if (0 == e.homework) {
        r_ChatUI.ChatUI.hide();
        return void r_HomeworkResultUI.default.showUI({
          index: 1
        });
      }
      if (1 == e.homework) {
        return;
      }
      if (2 == e.homework) {
        r_ChatUI.ChatUI.hide();
        return void (r_HomeworkUI.default.Inst && r_HomeworkUI.default.Inst.changedMode(2));
      }
      r_ChatUI.ChatUI.Inst && r_ChatUI.ChatUI.Inst.refreshList();
      r_GuideSystem.GuideSystem.checkFinishMsg();
    } else if ("transfer" == e.resultType) {
      o = e.resultInfo;
      var n;
      var a = this.transferCoin < 10 ? 0 : this.transferCoin > 1e8 ? 2 : 1;
      if ((n = this.chatInfoMap[o[a]]).isMy) {
        this.replyCom.visible = true;
        this.replyCom.getController("mode").selectedIndex = 0;
        this.curTransferIndex = a + 1;
        this.setBtnText(this.replyCom.getChild("btnChat1"), n);
      } else {
        this.startChatInfo(n);
      }
    }
  };
  _ctor.prototype.restartChat = function () {
    var e = this.curTaskInfo.id;
    this.clearChatContent();
    this.startTalkTask(e);
  };
  _ctor.prototype.reviveChat = function () {
    for (var e = this.chatInfoList.length - 1; e >= 0; e--) {
      var t = this.chatInfoList[this.chatInfoList.length - 1];
      t.head && t.head.destroy();
      t.bg && t.bg.destroy();
      t.label && t.label.destroy();
      this.chatInfoList.splice(this.chatInfoList.length - 1, 1);
      this.curItemHeight = this.curItemHeight - t.height;
      if (t.chatInfo.isMy) {
        break;
      }
    }
    this.curChatInfo = this.chatInfoList[this.chatInfoList.length - 1].chatInfo;
    this.nextChat(this.curChatInfo);
  };
  _ctor.prototype.refreshContentHeight = function () {
    this.chatContentHeight = this.curItemHeight;
    this.chatContentHeight < this.fguiContent.height && (this.chatContentHeight = this.fguiContent.height);
    this.maxMoveHeight = this.chatContentHeight - this.fguiContent.height;
  };
  _ctor.prototype.moveToBottom = function () {
    this.chatMoveRoot.y = this.maxMoveHeight;
  };
  _ctor.prototype.addLeftChat = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.getLeftIcon(t));
    this.chatIconRoot.addChild(n);
    n.x = -o / 2 + 70;
    n.y = i - 80;
    var a = new cc.Node("labelNode");
    a.anchorX = 0;
    a.anchorY = 1;
    this.chatLabelRoot.addChild(a);
    var s = a.addComponent(cc.Label);
    s.fontSize = 36;
    a.color = new cc.Color(28, 28, 28, 255);
    s.overflow = cc.Label.Overflow.NONE;
    s.string = e.content;
    s._forceUpdateRenderData(true);
    if (a.width > this.wordLimitWidth) {
      a.width = this.wordLimitWidth;
      s.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
      s._forceUpdateRenderData(true);
    }
    a.x = 175 + -o / 2;
    a.y = i - 60;
    var l = new cc.Node("chatBg");
    var u = l.addComponent(cc.Sprite);
    u.type = cc.Sprite.Type.SLICED;
    u.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    u.srcBlendFactor = cc.macro.ONE;
    u.trim = false;
    u.spriteFrame = r_ChatSystem.ChatSystem.chatBgSpriteFrame2;
    l.width = a.width + 40;
    l.height = a.height + 40;
    this.chatBgRoot.addChild(l);
    l.anchorX = 0;
    l.anchorY = 1;
    l.x = -o / 2 + 150;
    l.y = i - 30;
    var h = Math.max(101, l.height) + 30;
    this.curItemHeight = this.curItemHeight + h;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      bg: l,
      label: a,
      height: h,
      chatInfo: t
    });
  };
  _ctor.prototype.addRightChat = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/head/head" + r_PlayerData.PlayerData.data.curHead);
    this.chatIconRoot.addChild(n);
    n.x = o / 2 - 70;
    n.y = i - 80;
    var a = new cc.Node("labelNode");
    a.anchorX = 1;
    a.anchorY = 1;
    this.chatLabelRoot.addChild(a);
    var s = a.addComponent(cc.Label);
    s.fontSize = 36;
    a.color = new cc.Color(28, 28, 28, 255);
    s.overflow = cc.Label.Overflow.NONE;
    s.string = e.content;
    s._forceUpdateRenderData(true);
    if (a.width > this.wordLimitWidth) {
      a.width = this.wordLimitWidth;
      s.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
      s._forceUpdateRenderData(true);
    }
    a.x = o / 2 - 150 - 25;
    a.y = i - 60;
    var l = new cc.Node("chatBg");
    var u = l.addComponent(cc.Sprite);
    u.type = cc.Sprite.Type.SLICED;
    u.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    u.srcBlendFactor = cc.macro.ONE;
    u.trim = false;
    u.spriteFrame = r_ChatSystem.ChatSystem.chatBgSpriteFrame1;
    l.width = a.width + 40;
    l.height = a.height + 40;
    this.chatBgRoot.addChild(l);
    l.anchorX = 1;
    l.anchorY = 1;
    l.x = o / 2 - 150;
    l.y = i - 30;
    var h = Math.max(101, l.height) + 30;
    this.curItemHeight = this.curItemHeight + h;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      bg: l,
      label: a,
      height: h,
      chatInfo: t
    });
  };
  _ctor.prototype.registTouchRedPacket = function (e, t, o) {
    var i = this;
    t.noVideo && (e.getChildByName("left").getChildByName("click").getChildByName("mask").active = false);
    r_UtilsSystem.UtilsSystem.touchScaleNode(e, function () {
      if (e.getChildByName("left").getChildByName("click").active) {
        var n = function () {
          i.curState.finishMap[o.id] = true;
          r_ChatSystem.ChatSystem.isTaskFinish(i.curTaskInfo.id) && i.curState.finishMap && !i.chatHomeworkList.includes(o.id) && r_PlayerData.PlayerData.refreshFinishChatTask(i.curTaskInfo.id, i.curState);
          e.getChildByName("left").getChildByName("click").active = false;
          var n = t.coin;
          if ("transfer" == n) {
            (n = i.transferCoin) > 1e8 && (n = 5e4);
            if (i.transferCallBack) {
              i.transferCallBack();
              i.transferCallBack = null;
            }
          }
          r_PlayerData.PlayerData.addCoin("聊天红包", n, r_ReportSystem.SystemKey.零花钱);
          t.mustGet && i.nextChat(o);
        };
        if (t.noVideo) {
          n();
        } else {
          r_PlatformSystem.PlatformSystem.showVideo("领取聊天内视频奖励", function () {
            n();
          });
        }
      }
    });
  };
  _ctor.prototype.getLeftIcon = function (e) {
    if (e.icon) {
      return e.icon;
    } else {
      return this.curTaskInfo.icon;
    }
  };
  _ctor.prototype.addLeftHongbao = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.getLeftIcon(t));
    this.chatIconRoot.addChild(n);
    n.x = -o / 2 + 70;
    n.y = i - 80;
    var a = cc.instantiate(r_ChatSystem.ChatSystem.redPacketPrefab);
    a.getChildByName("right").active = false;
    a.x = -o / 2 + 150 + this.redPacketWidth / 2;
    a.y = i - 30 - this.redPacketHeight / 2;
    if (this.curState.finishMap && this.curState.finishMap[t.id]) {
      a.getChildByName("left").getChildByName("click").active = false;
    } else {
      this.registTouchRedPacket(a, e, t);
    }
    var s = this.redPacketHeight;
    this.chatBgRoot.addChild(a);
    this.curItemHeight = this.curItemHeight + s + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      height: s,
      chatInfo: t
    });
  };
  _ctor.prototype.addTransfer = function (e, t) {
    var o = this;
    var i = this.fguiContent.width;
    var n = -this.curItemHeight;
    var a = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.getLeftIcon(t));
    this.chatIconRoot.addChild(a);
    a.x = -i / 2 + 70;
    a.y = n - 80;
    var s = cc.instantiate(r_ChatSystem.ChatSystem.transferPrefab);
    s.x = -i / 2 + 150;
    s.y = n - 30;
    r_ChatUISystem.ChatUISystem.initTransfer(this, s, function (e, i) {
      o.transferCoin = e;
      o.transferCallBack = i;
      console.log("this.transferCoin=", o.transferCoin);
      o.nextChat(t);
    });
    var l = this.transferHeight;
    this.chatBgRoot.addChild(s);
    this.curItemHeight = this.curItemHeight + l + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: a,
      height: l,
      chatInfo: t
    });
  };
  _ctor.prototype.addRightHongbao = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/head/head" + r_PlayerData.PlayerData.data.curHead);
    this.chatIconRoot.addChild(n);
    n.x = o / 2 - 70;
    n.y = i - 80;
    var a = cc.instantiate(r_ChatSystem.ChatSystem.redPacketPrefab);
    a.x = o / 2 - 150 - this.redPacketWidth / 2;
    a.y = i - 30 - this.redPacketHeight / 2;
    a.getChildByName("left").active = false;
    a.getChildByName("right").active = true;
    a.getChildByName("right").getChildByName("click").active = false;
    var s = this.redPacketHeight;
    this.chatBgRoot.addChild(a);
    this.curItemHeight = this.curItemHeight + s + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      height: s,
      chatInfo: t
    });
  };
  _ctor.prototype.registTouchImage = function (e, t, o, i) {
    var n = this;
    var a = null;
    r_UtilsSystem.UtilsSystem.touchScaleNode(e, function () {
      if (i) {
        if (e.isWatchVideo) {
          return void (a && r_ChatImageUI.ChatImageUI.showUI(a));
        }
        r_PlatformSystem.PlatformSystem.showVideo("领取聊天内视频奖励", function () {
          n.curState.finishMap[o.id] = true;
          r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/image/" + t.path, cc.SpriteFrame, function (t, o) {
            e.getComponent(cc.Sprite).spriteFrame = o;
            a = o;
            e.isWatchVideo = true;
          });
        });
      } else {
        r_ChatImageUI.ChatImageUI.showUI(e.getComponent(cc.Sprite).spriteFrame);
      }
    });
  };
  _ctor.prototype.addLeftImage = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.getLeftIcon(t));
    this.chatIconRoot.addChild(n);
    n.x = -o / 2 + 70;
    n.y = i - 80;
    var a = false;
    this.curState.finishMap && this.curState.finishMap[t.id] && (a = true);
    var s = "ui/chat/image/" + e.path;
    e.noVideo || a || (s = "ui/chat/image/" + e.pathMask);
    var c = r_ResSystem.ResSystem.loadImg(s);
    c.anchorX = 0;
    c.anchorY = 1;
    c.width = e.width;
    c.height = e.height;
    this.chatBgRoot.addChild(c);
    c.x = -o / 2 + 150;
    c.y = i - 30;
    if (e.noVideo || a) {
      this.registTouchImage(c, e, t, false);
    } else {
      this.registTouchImage(c, e, t, true);
    }
    var l = e.height;
    this.curItemHeight = this.curItemHeight + l + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      height: l,
      chatInfo: t
    });
  };
  _ctor.prototype.addRightImage = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/head/head" + r_PlayerData.PlayerData.data.curHead);
    this.chatIconRoot.addChild(n);
    n.x = o / 2 - 70;
    n.y = i - 80;
    var a = r_ResSystem.ResSystem.loadImg("ui/chat/image/" + e.path);
    a.anchorX = 1;
    a.anchorY = 1;
    a.width = e.width;
    a.height = e.height;
    this.chatBgRoot.addChild(a);
    a.x = o / 2 - 150;
    a.y = i - 30;
    var s = e.height;
    this.curItemHeight = this.curItemHeight + s + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      height: s,
      chatInfo: t
    });
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = 0;
    var o = 0;
    var i = null;
    this.chatRoot.off(cc.Node.EventType.TOUCH_START);
    this.chatRoot.off(cc.Node.EventType.TOUCH_MOVE);
    this.chatRoot.off(cc.Node.EventType.TOUCH_END);
    this.chatRoot.on(cc.Node.EventType.TOUCH_START, function (t) {
      i = t.getLocation();
      o = e.chatMoveRoot.y;
    });
    this.chatRoot.on(cc.Node.EventType.TOUCH_MOVE, function (n) {
      if (i) {
        var a = n.getLocation().y - i.y;
        t = Math.max(o + a, 0);
        t = Math.min(t, e.maxMoveHeight);
        e.chatMoveRoot.y = t;
      }
    });
    this.chatRoot.on(cc.Node.EventType.TOUCH_END, function () {});
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChatDetailUI = exp_ChatDetailUI;