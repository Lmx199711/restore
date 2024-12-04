var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawCardUI = undefined;
var r_UIDef = require("UIDef");
var r_DrawCardSystem = require("DrawCardSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DrawCardCfg = require("DrawCardCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_DrawSecretGetUI = require("DrawSecretGetUI");
var r_TYIndex = require("TYIndex");
var r_RoleSystem = require("RoleSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var exp_DrawCardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.DrawCard, r_UIDef.UIDef.Res.UI.DrawCardUI) || this;
    t.isPlayAnim = false;
    t.itemList = [];
    t.recipeIdList = [];
    t.m_type = {
      0: 0,
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 5,
      6: 6
    };
    t.m_string = {
      2: "r",
      3: "sr",
      4: "ssr",
      5: "n",
      6: "ur"
    };
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DrawCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DrawCardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickHide, this);
    this.btnBack2.onClick(this.onClickHide, this);
    this.btnFive.onClick(this.onClickFive, this);
    this.btnAll.onClick(this.onClickAll, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnOpen2.onClick(this.onClickOpen, this);
    for (var t = 1; t <= 5; t++) {
      this.itemList.push(this.contentPane.getChild("item" + t));
      this.registItemTouch(this.itemList[t - 1], t);
    }
  };
  _ctor.prototype.registItemTouch = function (e, t) {
    var o = this;
    e.node.startX = e.node.x;
    e.node.startY = e.node.y;
    e.onClick(function () {
      e.isOpen || o.playOneAnim(e, o.recipeIdList[t - 1], function () {
        if (o.isFinish()) {
          o.btnAll.visible = false;
          o.btnBack2.visible = true;
          o.btnAgain.visible = true;
        }
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.isPlayAnim = false;
    this.resetItems();
    this.refreshDrawNum();
    if (1 == this.data.num) {
      this.contentPane.getController("mode").selectedIndex = 0;
      this.btnBack2.visible = false;
      this.btnFive.visible = false;
      this.item.node.scale = 0;
      this.item.getController("backType").selectedIndex = this.m_type[this.data.data[0].type];
      this.item.getChild("anim").visible = false;
      cc.tween(this.item.node).to(.5, {
        scale: 1
      }, {
        easing: null
      }).call(function () {
        o.btnOpen.visible = true;
        o.btnOpen2.visible = true;
      }).start();
    } else {
      this.recipeIdList = this.data.data;
      this.contentPane.getController("mode").selectedIndex = 1;
      this.btnBack2.visible = false;
      this.btnAgain.visible = false;
      this.playFiveAnim();
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.resetItems = function () {
    for (var e = 1; e <= 5; e++) {
      this.itemList[e - 1].getController("open").selectedIndex = 0;
      this.itemList[e - 1].isOpen = false;
    }
    this.item.getController("open").selectedIndex = 0;
    this.item.isOpen = false;
  };
  _ctor.prototype.onClickHide = function () {
    if (this.isPlayAnim) {
      r_UtilsSystem.UtilsSystem.showTip("播放动画中");
    } else {
      this.hide();
      this.data.callBack && this.data.callBack();
    }
  };
  _ctor.prototype.playOneAnim = function (e, t, o) {
    var i = this;
    this.setItem(e, t);
    r_SoundMgr.SoundMgr.playSound("drawCard/翻牌");
    cc.Tween.stopAllByTarget(e.node);
    e.node.scale = 1;
    e.isOpen = true;
    e.getController("open").selectedIndex = 0;
    cc.tween(e.node).to(.25, {
      scaleX: 0
    }).call(function () {
      e.getController("open").selectedIndex = 1;
    }).to(.25, {
      scaleX: 1
    }).call(function () {
      i.clearHasCard(e, t, o);
    }).start();
  };
  _ctor.prototype.setItem = function (e, t) {
    switch (t.type) {
      case r_DrawCardCfg.DrawCardType.金币:
        e.getChild("icon").url = "ui://MainHome/组 102 拷贝 4";
        e.getChild("icon").scaleX = e.getChild("icon").scaleY = 1.3;
        break;
      case r_DrawCardCfg.DrawCardType.钻石:
        e.getChild("icon").url = "ui://MainHome/diamondImg";
        e.getChild("icon").scaleX = e.getChild("icon").scaleY = 1.3;
        break;
      case r_DrawCardCfg.DrawCardType.品质N:
      case r_DrawCardCfg.DrawCardType.品质R:
      case r_DrawCardCfg.DrawCardType.品质SR:
      case r_DrawCardCfg.DrawCardType.品质SSR:
      case r_DrawCardCfg.DrawCardType.品质UR:
        r_ResSystem.ResSystem.loadBundleFguiImg(e.getChild("icon"), "game3", "secretUp/codex/codex" + t.id);
        e.getChild("icon").scaleX = e.getChild("icon").scaleY = 1;
    }
    e.getChild("anim").visible = false;
    e.getChild("content").text = "+" + r_UtilsSystem.UtilsSystem.numFormats(t.id);
    e.getController("backType").selectedIndex = this.m_type[t.type];
  };
  _ctor.prototype.onClickFive = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("秘书-五连抽", function () {
      e.resetItems();
      r_DrawCardSystem.DrawCardSystem.addTotal(2);
      e.refreshDrawNum();
      var t = [];
      for (var o = 0; o < 5; o++) {
        if (3 != o) {
          t.push(r_DrawCardSystem.DrawCardSystem.getWeightDrawCard(2, false));
        } else {
          t.push(r_DrawCardSystem.DrawCardSystem.getWeightDrawCard(2, 0 == r_DrawCardSystem.DrawCardSystem.getRemainCount(2)));
        }
      }
      e.recipeIdList = t;
      e.contentPane.getController("mode").selectedIndex = 1;
      e.btnBack2.visible = false;
      e.btnAgain.visible = false;
      e.playFiveAnim();
    });
  };
  _ctor.prototype.isFinish = function () {
    for (var e = 1; e <= 5; e++) {
      if (!this.itemList[e - 1].isOpen) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.onClickAll = function () {
    var e = this;
    if (!this.isPlayAnim) {
      this.isPlayAnim = true;
      this.btnAll.visible = false;
      var t = function () {
        for (var o = 1; o <= 5; o++) {
          if (!e.itemList[o - 1].isOpen) {
            return void e.playOneAnim(e.itemList[o - 1], e.recipeIdList[o - 1], function () {
              t();
            });
          }
        }
        e.btnBack2.visible = true;
        e.btnAgain.visible = true;
        e.isPlayAnim = false;
      };
      t();
    }
  };
  _ctor.prototype.onClickAgain = function () {
    this.onClickFive();
  };
  _ctor.prototype.clearHasCard = function (e, t, o) {
    var i = this;
    if (t.type < 2) {
      0 == t.type && r_PlayerData.PlayerData.addCoin("翻牌获得金币", t.id, r_ReportSystem.SystemKey.秘书);
      1 == t.type && r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, t.id);
      1 == t.type && r_SoundMgr.SoundMgr.playSound("drawCard/获得钻石");
      return void (o && o());
    }
    if (r_SecretUpSystem.SecretUpSystem.hasSecret(t.id)) {
      e.getController("backType").selectedIndex = 4;
      r_ResSystem.ResSystem.loadBundleFguiImg(e.getChild("iconBg"), "game3", "secretUp/codex/codexBg" + t.id);
      e.getChild("icon").url = "ui://DrawCard/stone";
      e.getChild("content").text = "X" + r_DrawCardCfg.DrawStoneNum[this.m_type[t.type]];
      e.getChild("icon").scaleX = e.getChild("icon").scaleY = 1.5;
      e.getChild("anim").visible = false;
      o && o();
    } else {
      r_SecretUpSystem.SecretUpSystem.addSecret(t);
      r_DrawSecretGetUI.DrawSecretGetUI.showUI({
        cfg: {
          id: t.id
        },
        callBack: function () {
          r_DrawSecretGetUI.DrawSecretGetUI.hide();
          if (o) {
            o();
            e.getChild("anim").visible = true;
            e.getChild("anim").loop = true;
            e.getChild("anim").animationName = i.m_string[t.type];
            e.getChild("anim").playing = true;
          }
        }
      });
    }
  };
  _ctor.prototype.playFiveAnim = function () {
    var e = this;
    for (var t = 1; t <= 5; t++) {
      var o = this.itemList[t - 1];
      this.setItem(o, this.recipeIdList[t - 1]);
      o.node.x = this.itemList[2].node.x;
      o.node.y = this.itemList[2].node.y;
      o.node.scale = 0;
      cc.tween(o.node).to(.5, {
        x: o.node.startX,
        y: o.node.startY,
        scale: 1
      }, {
        easing: null
      }).call(function () {
        e.btnAll.visible = true;
      }).start();
    }
  };
  _ctor.prototype.refreshOneTip = function () {
    var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(1).desc;
    var t = r_DrawCardSystem.DrawCardSystem.getRemainCount(1);
    this.oneTip.text = e.replace("#", t + "");
  };
  _ctor.prototype.refreshDrawNum = function () {
    this.refreshOneTip();
    var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(2).desc;
    var t = r_DrawCardSystem.DrawCardSystem.getRemainCount(2);
    this.fiveTip.text = e.replace("#", t + "");
  };
  _ctor.prototype.onClickOpen = function () {
    var e = this;
    this.btnOpen.visible = false;
    this.btnOpen2.visible = false;
    this.playOneAnim(this.item, this.data.data[0], function () {
      e.btnBack2.visible = true;
      e.btnFive.visible = true;
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack2")], _ctor.prototype, "btnBack2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFive")], _ctor.prototype, "btnFive", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAll")], _ctor.prototype, "btnAll", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item")], _ctor.prototype, "item", undefined);
  __decorate([r_DecorateFunction1.AutoFind("oneTip")], _ctor.prototype, "oneTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("fiveTip")], _ctor.prototype, "fiveTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen2")], _ctor.prototype, "btnOpen2", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.DrawCardUI = exp_DrawCardUI;