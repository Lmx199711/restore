var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_SecretStoryUI = require("SecretStoryUI");
var r_SecretSystem = require("SecretSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_SecretCfg = require("SecretCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_RoleSystem = require("RoleSystem");
var r_RoleCfg = require("RoleCfg");
var r_DrawUI = require("DrawUI");
var r_ReportSystem = require("ReportSystem");
var exp_SecretUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretUI) || this;
    t.uiType = "fullScreen";
    t.curMaxIndex = 0;
    t.itemList = [];
    t.passTime = 0;
    t.m_gifts = [];
    t.lastSound = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnRight.onClick(this.onClickRight, this);
    this.btnBuy = this.contentPane.getChild("btnBuy").asButton;
    this.btnBuy.onClick(this.onClickBuy, this);
    this.btnBook = this.contentPane.getChild("btnBook").asButton;
    this.btnBook.onClick(this.onClickBook, this);
    this.lbName = this.contentPane.getChild("lbName");
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.on(fgui.Event.SCROLL, this.onScroll, this);
    this.list.on(fgui.Event.SCROLL_END, this.onScrollEnd, this);
    this.infoCom = this.contentPane.getChild("infoCom");
    this.rewardCom = this.infoCom.getChild("rewardCom");
    this.rewardList = this.rewardCom.getChild("list");
    this.rewardList.setVirtual();
    this.rewardList.itemRenderer = this.onListRewardRenderer.bind(this);
    this.rewardList.numItems = r_SecretCfg.SecretRewardCfg.length;
    this.lbLevel = this.infoCom.getChild("lbLevel");
    this.jcLabel = this.infoCom.getChild("jcLabel");
    this.starPro = this.infoCom.getChild("starPro");
    this.srInfo = this.contentPane.getChild("srInfo");
    r_SecretSystem.SecretSystem.checkInit();
  };
  _ctor.prototype.onClickBack = function () {
    r_SoundMgr.SoundMgr.playMusic("bgm");
    _ctor.talkMap = {};
    this.hide();
  };
  _ctor.prototype.refreshList = function () {
    var e = r_PlayerData.PlayerData.data.secretMap.secretList.length + 1;
    e > r_RoleCfg.SecretNumMAX && (e = r_RoleCfg.SecretNumMAX);
    this.itemList = [];
    this.list.numItems = e;
    this.curMaxIndex = e;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.m_gifts = [];
    this.refreshList();
    this.refreshInfo();
    this.passTime = 0;
    r_TimeSystem.TimeSystem.registUpdate(this, this.updateTime.bind(this));
    this.rewardCom.visible = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistUpdate(this);
    this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
    this.m_gifts.forEach(function (e) {
      e.destroy();
    });
    this.m_gifts = [];
  };
  _ctor.prototype.updateTime = function (e) {
    this.passTime = this.passTime + e;
    this.passTime >= 10 && (this.passTime = 0);
  };
  _ctor.prototype.onScroll = function () {};
  _ctor.prototype.onScrollEnd = function () {
    console.log("onScrollEnd");
    this.refreshInfo();
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    this.itemList[e] = t;
    t.getController("mode").selectedIndex = 0;
    if (r_PlayerData.PlayerData.data.secretMap.secretList.length != e) {
      t.getChild("icon").visible = true;
      var o = r_PlayerData.PlayerData.data.secretMap.secretList[e];
      r_SecretSystem.SecretSystem.getSecretCfgById(o.id);
      if (t.getChild("icon").anim) {
        t.getChild("icon").anim.destroy();
        t.getChild("icon").anim = null;
      }
      r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o.id, cc.Prefab, function (e, o) {
        if (t.getChild("icon").anim) {
          t.getChild("icon").anim.destroy();
          t.getChild("icon").anim = null;
        }
        if (o) {
          t.getChild("icon").anim = cc.instantiate(o);
          t.getChild("icon").node.addChild(t.getChild("icon").anim);
        }
      });
    } else {
      t.getChild("icon").visible = false;
    }
  };
  _ctor.prototype.onListRewardRenderer = function (e, t) {
    var o = this;
    var i = r_SecretCfg.SecretRewardCfg[e];
    t.getChild("name").text = i.name;
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(i.coin);
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game1", "secret/reward/rewardIcon" + i.id);
    if (i.video) {
      t.getChild("video").visible = true;
      t.getChild("num").text = "免费";
    } else {
      t.getChild("video").visible = false;
    }
    var n = function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_UtilsSystem.UtilsSystem.showSecretTip("好感度+" + i.feel);
      var e = r_PlayerData.PlayerData.data.secretMap.secretList[o.list.scrollPane.currentPageX];
      var n = r_SecretSystem.SecretSystem.getSecretCfgById(e.id);
      var a = r_SecretSystem.SecretSystem.getCfgByFeel(e.feel);
      e.feel = e.feel + i.feel;
      var s = r_SecretSystem.SecretSystem.getCfgByFeel(e.feel);
      o.refreshPersonInfo();
      Math.floor(a.level / 10) != Math.floor(s.level / 10) && o.showTalk(e.id, n.talkLevel);
      if (i.anim) {
        r_ResSystem.ResSystem.loadBundleRes("game1", i.anim, cc.Prefab, function (e, t) {
          var i = cc.instantiate(t);
          o.contentPane.getChild("flyDes").node.addChild(i);
          i.x = -50;
          var n = i.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
          i.getComponent(sp.Skeleton).setTrackCompleteListener(n, function () {
            i.destroy();
          });
        });
      } else {
        var r = new cc.Node();
        var c = r.addComponent(cc.Sprite);
        c.type = cc.Sprite.Type.SIMPLE;
        c.sizeMode = cc.Sprite.SizeMode.RAW;
        r.width = 114;
        r.height = 114;
        r_ResSystem.ResSystem.loadBundleUIImg(r, "game1", "secret/reward/rewardIcon" + i.id);
        o.contentPane.getChild("flyDes").node.addChild(r);
        var p = t.getChild("icon").node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var y = r.parent.convertToNodeSpaceAR(p);
        r.x = y.x;
        r.y = y.y;
        p = o.contentPane.getChild("flyDes").node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        y = r.parent.convertToNodeSpaceAR(p);
        r.scale = .2;
        o.m_gifts.push(r);
        cc.tween(r).to(.2, {
          x: 0,
          y: 0,
          scale: 1
        }).delay(.5).to(.5, {
          x: y.x,
          y: y.y,
          scale: 0
        }).call(function () {
          o.m_gifts.splice(o.m_gifts.indexOf(r), 1);
          r.destroy();
        }).start();
      }
    };
    t.clearClick();
    t.onClick(function () {
      if (i.video) {
        r_PlatformSystem.PlatformSystem.showVideo("秘书刷礼物", function () {
          n();
        });
      } else {
        if (!r_PlayerData.PlayerData.isCoinEnough(i.coin)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
        r_PlayerData.PlayerData.deleteCoin("秘书送礼物", i.coin, r_ReportSystem.SystemKey.秘书, true);
        n();
      }
    }, this);
  };
  _ctor.prototype.onClickLeft = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    e <= 1 || this.list.scrollToView(e - 2, true);
  };
  _ctor.prototype.onClickRight = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    e >= this.curMaxIndex || this.list.scrollToView(e, true);
  };
  _ctor.prototype.onClickBook = function () {
    var e = r_PlayerData.PlayerData.data.secretMap.secretList[this.list.scrollPane.currentPageX];
    r_SecretStoryUI.SecretStoryUI.showUI(e);
  };
  _ctor.prototype.onClickBuy = function () {
    this.hide();
    r_DrawUI.DrawUI.showUI();
  };
  _ctor.prototype.refreshPersonInfo = function () {
    var e = r_PlayerData.PlayerData.data.secretMap.secretList[this.list.scrollPane.currentPageX];
    if (e) {
      var o = r_SecretSystem.SecretSystem.getSecretCfgById(e.id);
      var i = r_SecretSystem.SecretSystem.getCfgByFeel(e.feel).level;
      this.lbLevel.text = "Lv." + i;
      var n = r_RoleSystem.RoleSystem.getSecretLevelExpById(e.id);
      this.jcLabel.text = "点击加成：" + n + "点击/秒";
      var a = i / 50 * 100;
      this.starPro.value = a;
      this.lbName.text = o.name;
      var s = r_RoleSystem.RoleSystem.getQualityInfoById(e.id);
      this.srInfo.getController("state").selectedIndex = s - 1;
      if (!_ctor.talkMap[e.id]) {
        _ctor.talkMap[e.id] = true;
        this.showTalk(o.id, o.talk, "secret/s" + o.id);
      }
    }
  };
  _ctor.prototype.showTalk = function (e, t, o) {
    undefined === o && (o = null);
    if (o) {
      this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
      this.lastSound = o;
      r_SoundMgr.SoundMgr.playSound(this.lastSound);
    }
    var i = this.itemList[this.list.scrollPane.currentPageX];
    if (i) {
      i.getChild("talk").text = t;
      i.getController("mode").selectedIndex = 1;
      r_TimeSystem.TimeSystem.scheduleOnce("talk" + e, 3, function () {
        i.getController("mode").selectedIndex = 0;
      });
    }
  };
  _ctor.prototype.refreshInfo = function () {
    this.rewardCom.visible = false;
    if (this.list.scrollPane.currentPageX == r_PlayerData.PlayerData.data.secretMap.secretList.length) {
      this.infoCom.visible = false;
      this.btnBook.visible = false;
      this.lbName.visible = false;
      this.srInfo.visible = false;
      this.btnBuy.visible = true;
      this.contentPane.getController("mode").selectedIndex = 1;
    } else {
      this.infoCom.visible = true;
      this.btnBook.visible = true;
      this.lbName.visible = true;
      this.srInfo.visible = true;
      this.btnBuy.visible = false;
      this.contentPane.getController("mode").selectedIndex = 0;
      this.rewardCom.visible = true;
    }
    this.refreshPersonInfo();
    this.refreshBtn();
  };
  _ctor.prototype.refreshBtn = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    this.btnLeft.visible = !(e <= 1);
    if (e >= this.curMaxIndex) {
      this.btnRight.visible = false;
    } else {
      this.btnRight.visible = true;
    }
  };
  _ctor.Inst = null;
  _ctor.talkMap = {};
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretUI = exp_SecretUI;