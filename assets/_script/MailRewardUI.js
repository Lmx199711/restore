var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailRewardUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_EraseCom = require("EraseCom");
var r_MailUI = require("MailUI");
var r_MailSystem = require("MailSystem");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var exp_MailRewardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailRewardUI) || this;
    t.itemList = [];
    t.finishItem = [];
    t.hand = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailRewardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailRewardUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.hide, this);
    this.btnBack2 = this.contentPane.getChild("btnBack2").asButton;
    this.btnBack2.onClick(this.hide, this);
    this.btnOne = this.contentPane.getChild("btnOne").asButton;
    this.btnOne.onClick(this.onClickOne, this);
    this.btnOne.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_MailUI.MailUI.coinOne) + "";
    this.btnOne2 = this.contentPane.getChild("btnOne2").asButton;
    this.btnOne2.onClick(this.onClickOne2, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/mail/mailReward", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.node1 = t.prefab.getChildByName("1");
      t.node5 = t.prefab.getChildByName("5");
      t.anim = t.prefab.getChildByName("mailAnim").getComponent(sp.Skeleton);
      t.eraseCom1 = t.node1.getComponent(r_EraseCom.default);
      t.eraseCom1.cleanSuccessCallBack = t.cleanSuccess1.bind(t);
      t.eraseCom1.cleanAllSuccessCallBack = t.cleanAllSuccess1.bind(t);
      t.eraseCom1.touchMove = t.touchMove.bind(t);
      t.eraseCom1.touchEnd = t.touchEnd.bind(t);
      t.eraseCom5 = t.node5.getComponent(r_EraseCom.default);
      t.eraseCom5.cleanSuccessCallBack = t.cleanSuccess5.bind(t);
      t.eraseCom5.cleanAllSuccessCallBack = t.cleanAllSuccess5.bind(t);
      t.eraseCom5.touchMove = t.touchMove.bind(t);
      t.eraseCom5.touchEnd = t.touchEnd.bind(t);
      t.anim.node.active = false;
      t.contentPane.visible = true;
      t.hand = t.prefab.getChildByName("hand");
      t.hand.active = false;
      t.restart();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_MailUI.MailUI.Inst.setBtnsVisible(false);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_MailUI.MailUI.Inst.setBtnsVisible(true);
  };
  _ctor.prototype.touchMove = function (e) {
    var t = e.touch.getLocation();
    var o = this.hand.parent.convertToNodeSpaceAR(t);
    this.hand.x = o.x + 100;
    this.hand.y = o.y - 100;
  };
  _ctor.prototype.touchEnd = function () {
    this.hand.active = false;
  };
  _ctor.prototype.playAnim = function () {};
  _ctor.prototype.restart = function () {
    var e = this;
    if (this.prefab) {
      this.prefab.active = true;
      this.anim.node.active = true;
      var t = "1";
      5 == this.data.num && (t = "5");
      this.finishItem = [];
      var o = this.anim.setAnimation(0, t, false);
      this.contentPane.getController("mode").selectedIndex = 2;
      r_MailUI.MailUI.Inst.btnMail.visible = false;
      this.anim.setTrackCompleteListener(o, function () {
        e.anim.node.active = false;
        r_MailUI.MailUI.Inst.btnMail.visible = true;
        if (1 == e.data.num) {
          e.refreshOne();
          e.node1.active = true;
          e.node5.active = false;
          e.contentPane.getController("mode").selectedIndex = 0;
          e.btnOne.visible = false;
          e.btnBack.visible = false;
          e.eraseCom1.startClean();
        } else {
          e.refreshFive();
          e.node1.active = false;
          e.node5.active = true;
          e.contentPane.getController("mode").selectedIndex = 1;
          e.btnOne2.visible = false;
          e.btnBack2.visible = false;
          e.eraseCom5.startClean();
        }
      });
    }
  };
  _ctor.prototype.initItem = function (e, t) {
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("bg"), "ui/mail/levelBg/levelBg" + t.rare);
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("icon"), "ui/mail/icon/" + t.icon);
    e.getChild("name").text = t.name;
    e.getChild("year").text = t.year + "";
    e.getChild("score").text = t.price + "";
    e.getChild("sell").text = t.sellPrice + "";
    e.getController("mode").selectedIndex = 0;
    e.mailCfg = t;
    this.itemList.push(e);
    r_MailSystem.MailSystem.addLucky();
  };
  _ctor.prototype.refreshOne = function () {
    this.itemList = [];
    var e = r_MailSystem.MailSystem.getRandomMail();
    var t = this.contentPane.getChild("item");
    this.initItem(t, e);
  };
  _ctor.prototype.refreshFive = function () {
    this.itemList = [];
    for (var e = 1; e <= 5; e++) {
      var t = r_MailSystem.MailSystem.getRandomMail(this.data.isVideo);
      this.data.isVideo = false;
      var o = this.contentPane.getChild("item" + e);
      this.initItem(o, t);
    }
  };
  _ctor.prototype.onClickOne = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_MailUI.MailUI.coinOne)) {
      r_PlayerData.PlayerData.deleteCoin("邮箱抽奖", r_MailUI.MailUI.coinOne, r_ReportSystem.SystemKey.None);
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickOne2 = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("邮箱抽奖", function () {
      e.restart();
    });
  };
  _ctor.prototype.getOneMail = function (e) {
    var t = this.itemList[e];
    var o = t.mailCfg;
    if (r_MailSystem.MailSystem.hasMail(o)) {
      t.getController("mode").selectedIndex = 2;
      r_PlayerData.PlayerData.addCoin("自动卖出邮票", o.sellPrice, r_ReportSystem.SystemKey.None);
    } else {
      r_MailSystem.MailSystem.addMail(o);
    }
  };
  _ctor.prototype.itemLightOne = function (e) {
    var t = this.itemList[e];
    var o = t.mailCfg;
    r_ResSystem.ResSystem.loadFguiImg(t.getChild("bg"), "ui/mail/levelBg/levelBg" + o.rare + "_2");
  };
  _ctor.prototype.cleanSuccess1 = function (e) {
    this.itemLightOne(e);
    this.finishItem.push(e);
  };
  _ctor.prototype.cleanAllSuccess1 = function () {
    this.btnOne.visible = true;
    this.btnBack.visible = true;
    for (var e = 0; e < this.finishItem.length; e++) {
      this.getOneMail(this.finishItem[e]);
    }
    this.finishItem = [];
    r_MailUI.MailUI.Inst.refreshLucky();
    this.prefab.active = false;
  };
  _ctor.prototype.cleanSuccess5 = function (e) {
    this.itemLightOne(e);
    this.finishItem.push(e);
  };
  _ctor.prototype.cleanAllSuccess5 = function () {
    this.btnOne2.visible = true;
    this.btnBack2.visible = true;
    for (var e = 0; e < this.finishItem.length; e++) {
      this.getOneMail(this.finishItem[e]);
    }
    this.finishItem = [];
    r_MailUI.MailUI.Inst.refreshLucky();
    this.prefab.active = false;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailRewardUI = exp_MailRewardUI;