var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomoUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_MomoCom = require("MomoCom");
var r_MomoVipUI = require("MomoVipUI");
var r_SoundMgr = require("SoundMgr");
var r_MomoChatUI = require("MomoChatUI");
var r_SDKMgr1 = require("SDKMgr1");
var r_PhoneUI = require("PhoneUI");
var r_ResSystem = require("ResSystem");
var exp_MomoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.MomoUI) || this;
    t.chatList = [];
    t.chatNum = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    r_PhoneSystem.PhoneSystem.checkOpen();
    if (r_PlayerData.PlayerData.data.momoData.isOpen) {
      this.show(r_UIDef.UIDef.Urls.UI.MomoUI, e, t);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币到达1000万解锁");
    }
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MomoUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnVip = this.contentPane.getChild("btnVip").asButton;
    this.btnVip.onClick(this.onClickVip, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/momo/momo", cc.Prefab, function (e, o) {
      t.momoPrefab = cc.instantiate(o);
      t.momoPrefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.momoPrefab);
      t.refreshPerson();
    });
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.chatNum = this.contentPane.getChild("chatNum");
    for (var o = 1; o <= 3; o++) {
      var i = this.contentPane.getChild("btnTap" + o);
      this.registTouchTap(i, o - 1);
    }
  };
  _ctor.prototype.registTouchTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (2 != t) {
        o.contentPane.getController("mode").selectedIndex != t && (o.contentPane.getController("mode").selectedIndex = t);
      } else {
        r_UtilsSystem.UtilsSystem.showTip("暂未开启");
      }
    }, this);
  };
  _ctor.prototype.changeToChatList = function () {
    this.contentPane.getController("mode").selectedIndex = 1;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_PhoneSystem.PhoneSystem.checkInitCurList();
    this.refreshPerson();
    this.refreshSelectNum();
    this.refreshChatList();
    r_SDKMgr1.SDKMgr1.hideCustomAd22();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_SDKMgr1.SDKMgr1.showCustomAd22(10, 170);
    r_PhoneUI.PhoneUI.Inst && r_PhoneUI.PhoneUI.Inst.refreshRedTips();
  };
  _ctor.prototype.refreshPerson = function () {
    this.momoPrefab && this.momoPrefab.getComponent(r_MomoCom.default).refreshPerson();
  };
  _ctor.prototype.onClickVip = function () {
    console.log("点击vip");
    2 != r_PlayerData.PlayerData.data.momoData.vipLevel && r_MomoVipUI.MomoVipUI.showUI();
  };
  _ctor.prototype.refreshSelectNum = function () {
    var e = r_PhoneSystem.PhoneSystem.getMaxSelectNum();
    var t = r_PlayerData.PlayerData.data.momoData.selectNum;
    t >= e && (t = e);
    this.contentPane.getChild("selectNum").text = t + "/" + e;
    if (r_PlayerData.PlayerData.data.momoData.vipLevel) {
      if (1 == r_PlayerData.PlayerData.data.momoData.vipLevel) {
        this.btnVip.visible = true;
        this.btnVip.getController("mode").selectedIndex = 1;
      } else {
        this.btnVip.visible = true;
        this.btnVip.getController("mode").selectedIndex = 2;
      }
    } else {
      this.btnVip.visible = true;
      this.btnVip.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.refreshChatList = function () {
    this.chatList = [];
    for (var e = r_PlayerData.PlayerData.data.momoData.curChatTaskList.length - 1; e >= 0; e--) {
      var t = r_PlayerData.PlayerData.data.momoData.curChatTaskList[e];
      this.chatList.push(t);
    }
    for (e = r_PlayerData.PlayerData.data.momoData.finishChatTaskList.length - 1; e >= 0; e--) {
      t = r_PlayerData.PlayerData.data.momoData.finishChatTaskList[e];
      this.chatList.push(t);
    }
    this.list.numItems = this.chatList.length;
    if (r_PlayerData.PlayerData.data.momoData.curChatTaskList.length <= 0) {
      this.chatNum.visible = false;
    } else {
      this.chatNum.visible = true;
      this.chatNum.getChild("num").text = r_PlayerData.PlayerData.data.momoData.curChatTaskList.length + "";
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.chatList[e];
    var i = r_PhoneSystem.PhoneSystem.getTaskCfg(o);
    t.getChild("name").text = i.name;
    t.getChild("content").text = i.taskList[0].chatList[0].content;
    t.getChild("icon").visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/" + i.icon, cc.SpriteFrame, function (e, o) {
      t.getChild("icon").texture = o;
      t.getChild("icon").visible = true;
    });
    if (r_PhoneSystem.PhoneSystem.isTaskFinish(o)) {
      t.getChild("redTip").visible = false;
    } else {
      t.getChild("redTip").visible = true;
    }
    t.clearClick();
    t.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_MomoChatUI.MomoChatUI.showUI({
        taskId: o
      });
    }, this);
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.MomoUI = exp_MomoUI;