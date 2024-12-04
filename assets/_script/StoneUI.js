var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_StoneSystem = require("StoneSystem");
var r_StoneTipUI = require("StoneTipUI");
var r_PlatformSystem = require("PlatformSystem");
var exp_StoneUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stone, r_UIDef.UIDef.Res.UI.StoneUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnBuy").asButton.onClick(this.onClickBuy, this);
    var t = 4;
    for (var o = 1; o <= 3; o++) {
      for (var i = 1; i <= t; i++) {
        var n = this.contentPane.getChild("item" + o + "_" + i);
        this.registClick(n, o, i);
      }
      t -= 1;
    }
  };
  _ctor.prototype.registClick = function (e, t, o) {
    e.clearClick();
    e.onClick(function () {
      var e = t + "_" + o;
      var i = r_PlayerData.PlayerData.data.stoneMap[e];
      if (i) {
        var n = r_StoneSystem.StoneSystem.getStoneCfgById(i);
        if (r_PlayerData.PlayerData.isCoinEnough(n.UseGold)) {
          console.log("click=" + t + "_" + o);
          r_StoneTipUI.StoneTipUI.showUI({
            key: e,
            stoneCfg: n
          });
        } else {
          r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_StoneSystem.StoneSystem.checkRefresh();
    this.refreshStone();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshStone = function () {
    var e = 4;
    for (var t = 1; t <= 3; t++) {
      for (var o = 1; o <= e; o++) {
        var i = this.contentPane.getChild("item" + t + "_" + o);
        var n = r_PlayerData.PlayerData.data.stoneMap[t + "_" + o];
        if (n) {
          var a = n;
          n < 10 && (a = "0" + a);
          r_ResSystem.ResSystem.loadFguiImg(i, "ui/stone/st" + a);
          var s = r_StoneSystem.StoneSystem.getStoneCfgById(n);
          if (3 == t && 1 == o) {
            this.contentPane.getChild("price1").getChild("num").text = Math.floor(s.UseGold / 1e4) + "万";
          } else {
            3 == t && 2 == o && (this.contentPane.getChild("price2").getChild("num").text = Math.floor(s.UseGold / 1e4) + "万");
          }
        } else {
          i.texture = null;
        }
      }
      e -= 1;
    }
  };
  _ctor.prototype.onClickBuy = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("重新进货", function () {
      r_StoneSystem.StoneSystem.refreshStoneMap();
      e.refreshStone();
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StoneUI = exp_StoneUI;