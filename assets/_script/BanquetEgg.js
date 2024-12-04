var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetEgg = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_BanquetCfg = require("BanquetCfg");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_BanquetEgg = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.BanquetEgg) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.BanquetEgg, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BanquetEgg);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnEgg = this.contentPane.getChild("get").asButton;
    this.btnEgg.onClick(this.onClickEgg, this);
    this.btnEgg.visible = false;
    this.btnOk = this.contentPane.getChild("btnOk").asButton;
    this.btnOk.onClick(this.onClickOk.bind(this, 1), this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
    this.role = this.contentPane.getChild("role").asLoader;
    this.finger = this.contentPane.getChild("finger").asCom;
    this.finger.onClick(function () {
      if (!(cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER)) {
        if (null != t.select) {
          t.select++;
        } else {
          t.select = 0;
        }
        t.select >= r_BanquetCfg.BanquetEggCfg.length && (t.select = 0);
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    var e = this;
    this.select = null;
    this.btnEgg.visible = false;
    this.contentPane.getController("c1").selectedIndex = 0;
    r_ResSystem.ResSystem.loadBundleRes("game1", "banquet/role", cc.Prefab, function (t, o) {
      if (!t) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.roleAnim && e.roleAnim.destroy();
        e.roleAnim = cc.instantiate(o);
        e.role.node.addChild(e.roleAnim);
        e.roleAnim.getComponent(sp.Skeleton).setAnimation(0, "", true);
        e.label = e.roleAnim.getChildByName("bg").getChildByName("Label").labelCom;
        e.label.node.parent.active = false;
        e.label_my = e.roleAnim.getChildByName("bg2").getChildByName("Label").labelCom;
        e.label_my.node.parent.active = false;
        e.initShow();
      }
    });
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickEgg = function () {
    var e = this;
    var t = function () {
      if (e.fistShow) {
        e.showMyText(r_BanquetCfg.BanquetOtherCfg.eggMyShowText, e.getReward.bind(e));
      } else {
        e.getReward();
      }
      e.btnEgg.visible = false;
    };
    if (this.btnEgg.getController("c1").selectedIndex) {
      r_PlatformSystem.PlatformSystem.showVideo("吃席彩蛋", t);
    } else {
      t();
    }
  };
  _ctor.prototype.onClickOk = function (e) {
    undefined === e && (e = 1);
    r_PlayerData.PlayerData.addCoin("策划奖励", this.price * e);
    this.contentPane.getController("c1").selectedIndex = 0;
    r_PlayerData.PlayerData.data.BanquetEgg = true;
    this.roleAnim.getComponent(sp.Skeleton).setAnimation(0, "", false);
    this.btnEgg.visible = true;
    this.btnEgg.getController("c1").selectedIndex = 1;
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("吃席彩蛋", function () {
      e.onClickOk(2);
    });
  };
  _ctor.prototype.showText = function (e, t) {
    var o = this;
    this.label.string = "";
    this.label.node.parent.active = true;
    var i = function (i) {
      setTimeout(function () {
        o.label.string += e[i];
        i == e.length - 1 && setTimeout(function () {
          o.label.node.parent.active = false;
          t && t();
        }, 1500);
      }, 50 * i);
    };
    for (var n = 0; n < e.length; n++) {
      i(n);
    }
  };
  _ctor.prototype.showMyText = function (e, t) {
    var o = this;
    this.label_my.string = "";
    this.label_my.node.parent.active = true;
    var i = function (i) {
      setTimeout(function () {
        o.label_my.string += e[i];
        i == e.length - 1 && setTimeout(function () {
          o.label_my.node.parent.active = false;
          t && t();
        }, 500);
      }, 50 * i);
    };
    for (var n = 0; n < e.length; n++) {
      i(n);
    }
  };
  _ctor.prototype.initShow = function () {
    var e = this;
    this.fistShow = true;
    r_PlayerData.PlayerData.data.BanquetEgg && (this.btnEgg.getController("c1").selectedIndex = 1);
    this.showText(r_BanquetCfg.BanquetOtherCfg.eggShowText2, function () {
      e.btnEgg.visible = true;
    });
  };
  _ctor.prototype.getReward = function () {
    var e = this;
    var t = this.contentPane.getChild("center").asLoader;
    var o = Math.random();
    this.fistShow = false;
    var i;
    var n = function (n) {
      if (o < r_BanquetCfg.BanquetEggCfg[n].rate || null != a.select) {
        null != a.select && (n = a.select);
        var s = r_BanquetCfg.BanquetEggCfg[n];
        a.roleAnim.getComponent(sp.Skeleton).setAnimation(0, "dakai", false);
        setTimeout(function () {
          e.roleAnim.getComponent(sp.Skeleton).setAnimation(0, s.anim_1, false);
          e.roleAnim.getComponent(sp.Skeleton).setCompleteListener(function () {
            e.showText(r_BanquetCfg.BanquetOtherCfg.eggShowText3, function () {
              t.url = "ui/banquet/egg/" + s.url;
              e.contentPane.getChild("title").asTextField.text = s.name;
              e.contentPane.getChild("info").asTextField.text = s.info;
              e.price = s.price;
              e.btnOk.getChild("num").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(s.price);
              e.contentPane.getController("c1").selectedIndex = 1;
            });
          });
        }, 500);
        i = n;
        return "break";
      }
      o -= r_BanquetCfg.BanquetEggCfg[n].rate;
      i = n;
    };
    var a = this;
    for (var s = 0; s < r_BanquetCfg.BanquetEggCfg.length; s++) {
      var r = n(s);
      s = i;
      if ("break" === r) {
        break;
      }
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BanquetEgg = exp_BanquetEgg;