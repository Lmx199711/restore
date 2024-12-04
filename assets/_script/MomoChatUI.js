var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomoChatUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_TimeSystem = require("TimeSystem");
var r_ResSystem = require("ResSystem");
var r_ChatSystem = require("ChatSystem");
var r_ChatResultUI = require("ChatResultUI");
var r_MomoUI = require("MomoUI");
var r_ReportSystem = require("ReportSystem");
var exp_MomoChatUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.MomoChatUI) || this;
    t.wordLimitWidth = 400;
    t.redPacketWidth = 348;
    t.redPacketHeight = 155;
    t.chatContentHeight = 0;
    t.curItemHeight = 0;
    t.maxMoveHeight = 0;
    t.curTaskInfo = null;
    t.curChatInfo = null;
    t.chatInfoMap = null;
    t.chatInfoList = [];
    t.curState = {};
    t.finishStateMap = null;
    t.isNewTalk = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MomoChatUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MomoChatUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
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
    if (r_PhoneSystem.PhoneSystem.isTaskFinish(this.data.taskId)) {
      this.isNewTalk = false;
      this.startFinishChat();
    } else {
      this.isNewTalk = true;
      this.startTalkTask(this.data.taskId);
    }
    this.contentPane.getChild("name").text = this.curTaskInfo.name;
    this.registTouch();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
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
      "hongbao" == e.chatList[0].type && r_PlayerData.PlayerData.deleteCoin("发红包", e.chatList[0].coin, r_ReportSystem.SystemKey.None);
      this.startChatInfo(e);
      this.replyCom.visible = false;
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
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
    var e = r_PhoneSystem.PhoneSystem.getChatTaskById(this.data.taskId);
    this.finishStateMap = r_PlayerData.PlayerData.data.momoData.finishChatStateMap[this.data.taskId];
    this.curTaskInfo = e;
    for (var t = 0; t < this.finishStateMap.taskList.length; t++) {
      var o = this.finishStateMap.taskList[t];
      var i = this.getChatInfoFromTask(e, o);
      for (var n = 0; n < i.chatList.length; n++) {
        this.showOneChatInfo(i.chatList[n], i);
      }
    }
  };
  _ctor.prototype.startTalkTask = function (e) {
    this.finishStateMap = {};
    this.curState = {};
    this.curState.taskList = [];
    this.curState.finishMap = {};
    this.chatInfoMap = {};
    var t = r_PhoneSystem.PhoneSystem.getChatTaskById(e);
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
      } else {
        "image" == e.type && this.addLeftImage(e, t);
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
          t.nextChat(e);
        } else {
          o();
        }
      });
    })();
  };
  _ctor.prototype.setBtnText = function (e, t) {
    if ("hongbao" == t.chatList[0].type) {
      e.getController("mode").selectedIndex = 1;
      e.getChild("content2").text = "发送红包" + t.chatList[0].coin + "元";
    } else {
      e.getController("mode").selectedIndex = 0;
      var o = t.chatList[0].content;
      o.length > 12 && (o = o.substr(0, 11) + "...");
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
      if (this.chatInfoMap[o[0]].isMy) {
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
        r_PhoneSystem.PhoneSystem.finishChatTask(t.curTaskInfo.id, t.curState);
        t.hide();
        r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshChatList();
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
      r_PhoneSystem.PhoneSystem.finishChatTask(this.curTaskInfo.id, this.curState);
      this.hide();
      r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshChatList();
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
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.curTaskInfo.icon);
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
    var r = new cc.Node("chatBg");
    var c = r.addComponent(cc.Sprite);
    c.type = cc.Sprite.Type.SLICED;
    c.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    c.srcBlendFactor = cc.macro.ONE;
    c.trim = false;
    c.spriteFrame = r_ChatSystem.ChatSystem.chatBgSpriteFrame2;
    r.width = a.width + 40;
    r.height = a.height + 40;
    this.chatBgRoot.addChild(r);
    r.anchorX = 0;
    r.anchorY = 1;
    r.x = -o / 2 + 150;
    r.y = i - 30;
    var l = Math.max(101, r.height) + 30;
    this.curItemHeight = this.curItemHeight + l;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      bg: r,
      label: a,
      height: l,
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
    var c = new cc.Node("chatBg");
    var l = c.addComponent(cc.Sprite);
    l.type = cc.Sprite.Type.SLICED;
    l.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    l.srcBlendFactor = cc.macro.ONE;
    l.trim = false;
    l.spriteFrame = r_ChatSystem.ChatSystem.chatBgSpriteFrame1;
    c.width = a.width + 40;
    c.height = a.height + 40;
    this.chatBgRoot.addChild(c);
    c.anchorX = 1;
    c.anchorY = 1;
    c.x = o / 2 - 150;
    c.y = i - 30;
    var u = Math.max(101, c.height) + 30;
    this.curItemHeight = this.curItemHeight + u;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      bg: c,
      label: a,
      height: u,
      chatInfo: t
    });
  };
  _ctor.prototype.registTouchRedPacket = function (e, t, o) {
    var i = this;
    r_UtilsSystem.UtilsSystem.touchScaleNode(e, function () {
      e.getChildByName("left").getChildByName("mask").active && r_PlatformSystem.PlatformSystem.showVideo("领取聊天内视频奖励", function () {
        i.curState.finishMap[o.id] = true;
        e.getChildByName("left").getChildByName("mask").active = false;
        r_PlayerData.PlayerData.addCoin("聊天红包", t.coin, r_ReportSystem.SystemKey.None);
      });
    });
  };
  _ctor.prototype.addLeftHongbao = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.curTaskInfo.icon);
    this.chatIconRoot.addChild(n);
    n.x = -o / 2 + 70;
    n.y = i - 80;
    var a = cc.instantiate(r_ChatSystem.ChatSystem.redPacketPrefab);
    a.getChildByName("right").active = false;
    a.x = -o / 2 + 150 + this.redPacketWidth / 2;
    a.y = i - 30 - this.redPacketHeight / 2;
    if (this.finishStateMap.finishMap && this.finishStateMap.finishMap[t.id]) {
      a.getChildByName("left").getChildByName("mask").active = false;
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
    a.getChildByName("right").getChildByName("mask").active = false;
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
  _ctor.prototype.registTouchImage = function (e, t, o) {
    var i = this;
    r_UtilsSystem.UtilsSystem.touchScaleNode(e, function () {
      e.isWatchVideo || r_PlatformSystem.PlatformSystem.showVideo("领取聊天内视频奖励", function () {
        e.isWatchVideo = true;
        i.curState.finishMap[o.id] = true;
        r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/image/" + t.path, cc.SpriteFrame, function (t, o) {
          e.getComponent(cc.Sprite).spriteFrame = o;
        });
      });
    });
  };
  _ctor.prototype.addLeftImage = function (e, t) {
    var o = this.fguiContent.width;
    var i = -this.curItemHeight;
    var n = r_ResSystem.ResSystem.loadImg("ui/chat/" + this.curTaskInfo.icon);
    this.chatIconRoot.addChild(n);
    n.x = -o / 2 + 70;
    n.y = i - 80;
    var a = false;
    this.finishStateMap.finishMap && this.finishStateMap.finishMap[t.id] && (a = true);
    var s = "ui/chat/image/" + e.path;
    e.noVideo || a || (s = "ui/chat/image/" + e.pathMask);
    var r = r_ResSystem.ResSystem.loadImg(s);
    r.anchorX = 0;
    r.anchorY = 1;
    r.width = e.width;
    r.height = e.height;
    this.chatBgRoot.addChild(r);
    r.x = -o / 2 + 150;
    r.y = i - 30;
    e.noVideo || a || this.registTouchImage(r, e, t);
    var c = e.height;
    this.curItemHeight = this.curItemHeight + c + 10;
    this.refreshContentHeight();
    this.moveToBottom();
    this.chatInfoList.push({
      head: n,
      height: c,
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
exports.MomoChatUI = exp_MomoChatUI;