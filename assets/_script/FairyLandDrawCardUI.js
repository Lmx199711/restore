var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandDrawCardUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponDrawSystem = require("WeaponDrawSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_FairyLandDrawResultUI = require("FairyLandDrawResultUI");
var exp_FairyLandDrawCardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Res.UI.FairyLandDrawCardUI) || this;
    t.isPlayAnim = false;
    t.itemList = [];
    t.recipeIdList = [];
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandDrawCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandDrawCardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickHide, this);
    this.btnBack2.onClick(this.onClickHide, this);
    this.btnFive.onClick(this.onClickFive, this);
    this.btnAll.onClick(this.onClickAll, this);
    this.btnAgain.onClick(this.onClickAgain, this);
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
      this.playOneAnim(this.item, this.data.recipe.id, function () {
        o.btnBack2.visible = true;
        o.btnFive.visible = true;
      });
    } else {
      this.recipeIdList = this.data.recipeList;
      this.contentPane.getController("mode").selectedIndex = 1;
      this.btnAll.visible = true;
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
    this.setItem(e, t);
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
      if (r_WeaponSystem.WeaponSystem.GetRecipeInfo(t).type >= 3) {
        r_FairyLandDrawResultUI.FairyLandDrawResultUI.showUI({
          id: t,
          callBack: function () {
            o && o();
          }
        });
      } else {
        o && o();
      }
    }).start();
  };
  _ctor.prototype.setItem = function (e, t) {
    var o = r_WeaponSystem.WeaponSystem.GetRecipeInfo(t);
    e.getChild("content").text = o.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(e.getChild("icon"), "bdWeaponForge", "mat/small/" + o.name);
    e.getController("backType").selectedIndex = o.type - 1;
  };
  _ctor.prototype.onClickFive = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("材料-五连抽", function () {
      e.resetItems();
      e.recipeIdList = r_WeaponDrawSystem.WeaponDrawSystem.drawFive();
      e.contentPane.getController("mode").selectedIndex = 1;
      e.btnAll.visible = true;
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
  _ctor.prototype.playFiveAnim = function () {
    for (var e = 1; e <= 5; e++) {
      var t = this.itemList[e - 1];
      this.setItem(t, this.recipeIdList[e - 1]);
      t.node.x = this.itemList[2].node.x;
      t.node.y = this.itemList[2].node.y;
      t.node.scale = 0;
      cc.tween(t.node).to(.5, {
        x: t.node.startX,
        y: t.node.startY,
        scale: 1
      }, {
        easing: null
      }).call(function () {}).start();
    }
  };
  _ctor.prototype.refreshOneTip = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    e.cost;
    var t = e.count;
    e.type;
    e.weight;
    var o = e.desc;
    e.drawTime;
    e.drawCool;
    var i = t - r_PlayerData.PlayerData.data.draw[1].hasDefeat;
    this.oneTip.text = o.replace("#", i + "");
  };
  _ctor.prototype.refreshDrawNum = function () {
    this.refreshOneTip();
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(2);
    var t = e.count;
    var o = e.desc;
    var i = t - r_PlayerData.PlayerData.data.draw[2].hasDefeat;
    this.fiveTip.text = o.replace("#", i + "");
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
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandDrawCardUI = exp_FairyLandDrawCardUI;