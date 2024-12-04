var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailCompUI = undefined;
var r_UIDef = require("UIDef");
var r_MailSystem = require("MailSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_MailCompReward = require("MailCompReward");
var exp_MailCompUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailCompUI) || this;
    t.uiType = "fullScreen";
    t.m_compList = [];
    t.isRemoveMail = true;
    t.m_isShowList = false;
    t.m_isClick = true;
    t.isVideo = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "isShowList", {
    set: function (e) {
      this.m_isShowList = e;
      this.contentPane.getController("c1").setSelectedIndex(e ? 1 : 0);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailCompUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailCompUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.instace = this;
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRendererItem.bind(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.item1 = this.contentPane.getChild("item1").asButton;
    this.item0 = this.contentPane.getChild("item0").asButton;
    this.item1.onClick(this.onClickitem1, this);
    this.item0.onClick(this.onClickitem0, this);
    this.dizuo0 = this.contentPane.getChild("dizuo0").asCom;
    this.dizuo1 = this.contentPane.getChild("dizuo1").asCom;
    this.dizuo0.onClick(this.onClickAddMail0, this);
    this.dizuo1.onClick(this.onClickAddMail1, this);
    this.initPoint0 = cc.v2(this.item0.x, this.item0.y);
    this.initPoint1 = cc.v2(this.item1.x, this.item1.y);
    this.contentPane.getChild("btnDef").asButton.onClick(this.onClickComp, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideoComp, this);
    this.contentPane.getChild("btnCloseList").asButton.onClick(this.onClickCloseList, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/mail/mailCompEffect", cc.Prefab, function (e, t) {
      o.prefab = cc.instantiate(t);
      o.prefab.active = true;
      o.contentPane.getChild("center").node.addChild(o.prefab);
      o.handAnim = o.prefab.getChildByName("handAnim").getComponent(sp.Skeleton);
      o.card = o.prefab.getChildByName("card").getComponent(sp.Skeleton);
      o.handAnim.setCompleteListener(o.randomAnim.bind(o));
      o.card.setCompleteListener(o.randomEndAnim.bind(o));
      o.point0 = o.prefab.getChildByName("point0");
      o.point1 = o.prefab.getChildByName("point1");
      o.playStartAnim();
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/mail/mailCompReward", cc.Prefab, function () {});
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_PlayerData.PlayerData.isGame = true;
    this.restart();
    this.playStartAnim();
  };
  _ctor.prototype.restart = function () {
    this.item0.visible = false;
    this.item1.visible = false;
    this.m_isShowList = false;
    this.m_isClick = true;
    this.refreList();
    this.m_compList = [];
    this.showCompItem();
    this.contentPane.getChild("btnBack").visible = true;
    this.isRemoveMail = true;
    this.dizuo0.getController("c1").setSelectedIndex(0);
    this.dizuo1.getController("c1").setSelectedIndex(0);
  };
  _ctor.prototype.refreList = function () {
    this.groupList = r_MailSystem.MailSystem.getAllItem();
    this.list.numItems = this.groupList.length;
  };
  _ctor.prototype.playStartAnim = function () {
    if (this.card && !this.handAnim) {
      this.card.node.active = false;
      this.handAnim.setAnimation(0, "qi", false);
    }
  };
  _ctor.prototype.playRandomAnim = function () {
    var e = this;
    this.item0.visible = true;
    this.item1.visible = true;
    var t = this.point0.convertToWorldSpace(cc.Vec2.ZERO);
    var o = this.point1.convertToWorldSpace(cc.Vec2.ZERO);
    var i = this.contentPane.node.convertToNodeSpace(t.add(cc.v2(0, 400)));
    var n = this.contentPane.node.convertToNodeSpace(o.add(cc.v2(0, 400)));
    cc.tween(this.item0).to(.5, {
      x: i.x,
      y: i.y
    }).start();
    cc.tween(this.item1).to(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      e.item0.visible = false;
      e.item1.visible = false;
      e.handAnim.setAnimation(0, "he2", false);
      r_SoundMgr.SoundMgr.playSound("cuopai");
    }).start();
  };
  _ctor.prototype.randomAnim = function () {
    if ("he2" == this.handAnim.animation) {
      this.card.node.active = true;
      this.card.setAnimation(0, "1", false);
    }
  };
  _ctor.prototype.randomEndAnim = function () {
    this.card.node.active = false;
    var e = this.getListId();
    r_MailCompReward.MailCompReward.showUI({
      arr: e,
      isVideo: this.isVideo
    });
    this.item0.x = this.initPoint0.x;
    this.item0.y = this.initPoint0.y;
    this.item1.x = this.initPoint1.x;
    this.item1.y = this.initPoint1.y;
  };
  _ctor.prototype.onClickitem1 = function () {
    this.removeComp(1);
  };
  _ctor.prototype.onClickitem0 = function () {
    this.removeComp(0);
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this;
    var i = t.getChild("item");
    var n = this.groupList[e];
    this.setItem(i, n);
    i.clearClick();
    i.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      o.addComp(n);
    }, this);
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
    e.visible = true;
  };
  _ctor.prototype.onClickShowList = function () {
    this.isShowList = true;
  };
  _ctor.prototype.addComp = function (e) {
    r_MailSystem.MailSystem.hasMail(e) && (this.m_compList.length >= 2 || this.m_compList.includes(e) || (this.m_compList.push(e), this.m_compList.length >= 2 && (this.isShowList = false), this.showCompItem()));
  };
  _ctor.prototype.showCompItem = function () {
    for (var e = 0; e < 2; e++) {
      var t = this.contentPane.getChild("item" + e).asCom;
      t.visible = false;
      this["dizuo" + e].getController("c1").setSelectedIndex(0);
      if (e < this.m_compList.length) {
        this.setItem(t, this.m_compList[e]);
        this["dizuo" + e].getController("c1").setSelectedIndex(1);
      }
    }
  };
  _ctor.prototype.removeComp = function (e) {
    if (null != this.m_compList[e]) {
      this.m_compList.splice(e, 1);
      this.showCompItem();
    }
  };
  _ctor.prototype.onClickComp = function () {
    if (this.rule() && this.m_isClick) {
      this.isVideo = false;
      this.playRandomAnim();
      this.palyAnimRule();
    }
  };
  _ctor.prototype.onClickVideoComp = function () {
    var e = this;
    this.rule() && this.m_isClick && r_PlatformSystem.PlatformSystem.showVideo("邮票合成", function () {
      e.isVideo = true;
      e.playRandomAnim();
      e.palyAnimRule();
    });
  };
  _ctor.prototype.palyAnimRule = function () {
    this.m_isClick = false;
    this.contentPane.getChild("btnBack").visible = false;
  };
  _ctor.prototype.rule = function () {
    return 2 == this.m_compList.length || (r_UtilsSystem.UtilsSystem.showTip("合成的邮票不足"), false);
  };
  _ctor.prototype.getListId = function () {
    var e = [];
    this.m_compList.forEach(function (t) {
      e.push(t.id);
    });
    return e;
  };
  _ctor.prototype.onClickCloseList = function () {
    this.isShowList = false;
  };
  _ctor.prototype.onClickAddMail0 = function () {
    this.m_compList.length >= 1 || (this.isShowList = true);
  };
  _ctor.prototype.onClickAddMail1 = function () {
    this.m_compList.length >= 2 || (this.isShowList = true);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.isGame = false;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailCompUI = exp_MailCompUI;