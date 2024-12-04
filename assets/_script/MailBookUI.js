var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailBookUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_MailCfg = require("MailCfg");
var r_ResSystem = require("ResSystem");
var r_MailSystem = require("MailSystem");
var r_MailTipUI = require("MailTipUI");
var exp_MailBookUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailBookUI) || this;
    t.groupList = [];
    t.allGroupCfgList = [];
    t.curLayer = 0;
    t.curGroupCfg = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailBookUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailBookUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.bigBlack = this.contentPane.getChild("bigBlack");
    this.bigItem = this.contentPane.getChild("bigItem");
    this.bigBlack.onClick(function () {
      o.bigBlack.visible = false;
      o.bigItem.visible = false;
      o.contentPane.getChild("bigTip").visible = false;
    }, this);
    this.bigItem.node.on(cc.Node.EventType.TOUCH_START, function () {
      console.log("this.bigItem.onClick");
    }, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnSell = this.contentPane.getChild("btnSell").asButton;
    this.btnSell.onClick(this.onClickSell, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list2 = this.contentPane.getChild("list2").asList;
    this.list2.setVirtual();
    this.list2.itemRenderer = this.onListRendererItem.bind(this);
    for (var i = 0; i < r_MailCfg.MailGroupCfg.length; i++) {
      this.allGroupCfgList.push(r_MailCfg.MailGroupCfg);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.bigBlack.visible = false;
    this.bigItem.visible = false;
    this.contentPane.getChild("bigTip").visible = false;
    this.list.numItems = r_MailCfg.MailGroupCfg.length;
    this.contentPane.getController("mode").selectedIndex = 0;
    this.allGroupCfgList.sort(function (e, t) {
      var o = r_MailSystem.MailSystem.hasFinishGroup(e.id);
      if (o != r_MailSystem.MailSystem.hasFinishGroup(t.id)) {
        if (o) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return t.id - e.id;
      }
    });
    this.refreshGroupNum();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshGroupNum = function () {
    this.contentPane.getChild("num").text = r_PlayerData.PlayerData.data.mailData.finishGroupList.length + "/" + r_MailCfg.MailGroupCfg.length;
  };
  _ctor.prototype.onClickBack = function () {
    if (1 == this.contentPane.getController("mode").selectedIndex) {
      this.contentPane.getController("mode").selectedIndex = 0;
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    var i = r_MailCfg.MailGroupCfg[e];
    t.getChild("num1").text = r_MailSystem.MailSystem.getMyGroupNum(i.id) + "";
    t.getChild("num2").text = "/" + r_MailSystem.MailSystem.getGroupMaxNum(i.id);
    r_ResSystem.ResSystem.loadFguiImg(t.getChild("icon"), "ui/mail/icon/" + i.icon);
    t.getChild("icon").clearClick();
    t.getChild("icon").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      o.curGroupCfg = i;
      o.contentPane.getController("mode").selectedIndex = 1;
      o.refreshInfo();
    }, this);
  };
  _ctor.prototype.refreshInfo = function () {
    this.refreshGroupNum();
    this.list.numItems = r_MailCfg.MailGroupCfg.length;
    var e = this.curGroupCfg;
    this.groupList = r_MailSystem.MailSystem.getAllGroupItem(e.id);
    this.list2.numItems = this.groupList.length;
    this.contentPane.getChild("name").text = e.name;
    var t = r_MailSystem.MailSystem.getMyGroupNum(e.id);
    this.contentPane.getChild("num2").text = t + "/" + this.groupList.length;
    if (t >= this.groupList.length) {
      this.btnSell.visible = true;
    } else {
      this.btnSell.visible = false;
    }
  };
  _ctor.prototype.setItem = function (e, t, o) {
    undefined === o && (o = false);
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("bg"), "ui/mail/levelBg/levelBg" + t.rare + "_1");
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("icon"), "ui/mail/icon/" + t.icon);
    e.getChild("name").text = t.name;
    e.getChild("year").text = t.year + "";
    e.getChild("score").text = t.price + "";
    e.getChild("sell").text = t.sellPrice + "";
    if (r_MailSystem.MailSystem.hasMail(t) || o) {
      e.getController("mode").selectedIndex = 0;
    } else {
      e.getController("mode").selectedIndex = 1;
    }
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this;
    var i = t.getChild("item");
    var n = this.groupList[e];
    this.setItem(i, n);
    i.clearClick();
    i.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      o.bigBlack.visible = true;
      o.bigItem.visible = true;
      o.contentPane.getChild("bigTip").visible = true;
      o.setItem(o.bigItem, n, true);
    }, this);
  };
  _ctor.prototype.onClickSell = function () {
    r_MailTipUI.MailTipUI.showUI({
      groupCfg: this.curGroupCfg
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailBookUI = exp_MailBookUI;