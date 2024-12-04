var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailCompReward = undefined;
var r_UIDef = require("UIDef");
var r_MailSystem = require("MailSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_MailCompUI = require("MailCompUI");
var exp_MailCompReward = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailCompReward) || this;
    t.rewardItem = null;
    t.isAgain = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailCompReward, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailCompReward);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOne").asButton.onClick(this.onClickOnce, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/mail/mailCompReward", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.node1 = t.prefab.getChildByName("1");
      t.eraseCom1 = t.node1.getComponent(r_EraseCom.default);
      t.eraseCom1.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom1.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.eraseCom1.touchMove = t.touchMove.bind(t);
      t.eraseCom1.touchEnd = t.touchEnd.bind(t);
      t.contentPane.visible = true;
      t.hand = t.prefab.getChildByName("hand");
      t.hand.active = false;
      t.restart();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("item").visible = false;
    this.eraseCom1 && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    r_MailCompUI.MailCompUI.instace.restart();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").setSelectedIndex(0);
    this.rewardItem = null;
    this.setReward();
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.isAgain = true;
    this.addMail(this.rewardItem);
    this.itemLightOne();
    this.contentPane.getController("c1").setSelectedIndex(1);
  };
  _ctor.prototype.cleanSuccess = function () {};
  _ctor.prototype.itemLightOne = function () {
    var e = this.contentPane.getChild("item").asCom;
    var t = e.mailCfg;
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("bg"), "ui/mail/levelBg/levelBg" + t.rare + "_2");
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
  _ctor.prototype.setReward = function () {
    var e = this.data.arr;
    this.removeMail(e[0]);
    this.removeMail(e[1]);
    if (this.data.isVideo) {
      var t = r_MailSystem.MailSystem.getCompIsCaidan(e);
      if (-1 != t) {
        this.rewardItem = r_MailSystem.MailSystem.mailCfgMap[t];
        return void this.initItem(this.contentPane.getChild("item"), this.rewardItem);
      }
    }
    this.rewardItem = r_MailSystem.MailSystem.getRandomComp(e, this.data.isVideo);
    this.initItem(this.contentPane.getChild("item"), this.rewardItem);
  };
  _ctor.prototype.initItem = function (e, t) {
    this.contentPane.getChild("item").visible = true;
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("bg"), "ui/mail/levelBg/levelBg" + t.rare);
    r_ResSystem.ResSystem.loadFguiImg(e.getChild("icon"), "ui/mail/icon/" + t.icon);
    e.getChild("name").text = t.name;
    e.getChild("year").text = t.year + "";
    e.getChild("score").text = t.price + "";
    e.getChild("sell").text = t.sellPrice + "";
    e.getController("mode").selectedIndex = 0;
    e.mailCfg = t;
    this.eraseCom1.startClean();
    this.isAgain = false;
  };
  _ctor.prototype.onClickOnce = function () {
    var e = this;
    if (this.isAgain) {
      r_PlatformSystem.PlatformSystem.showVideo("再一次合成邮件", function () {
        e.hide();
        r_MailCompUI.MailCompUI.instace.refreList();
        r_MailCompUI.MailCompUI.instace.playRandomAnim();
        r_MailCompUI.MailCompUI.instace.isRemoveMail = false;
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("还没揭晓此邮票呢！");
    }
  };
  _ctor.prototype.removeMail = function (e) {
    r_MailSystem.MailSystem.hasMail({
      id: e
    }) && r_MailCompUI.MailCompUI.instace.isRemoveMail && r_MailSystem.MailSystem.removeMail(e);
  };
  _ctor.prototype.addMail = function (e) {
    if (r_MailSystem.MailSystem.hasMail(e)) {
      this.contentPane.getChild("item").asCom.getController("mode").selectedIndex = 2;
      r_PlayerData.PlayerData.addCoin("自动卖出邮票", e.sellPrice, r_ReportSystem.SystemKey.None);
    } else {
      r_MailSystem.MailSystem.addMail(e);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailCompReward = exp_MailCompReward;