var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_RankSystem = require("RankSystem");
var r_ResSystem = require("ResSystem");
var r_ReportSystem = require("ReportSystem");
var exp_RankTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankTipUI) || this;
    t.coinList = {
      1: [6666, 8888],
      2: [1666, 1888],
      3: [666, 888]
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankTipUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/rank/rankTipAnim", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.prefab.y = -50;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = r_UtilsSystem.UtilsSystem.getRandomFromArr(this.coinList[this.data.index + 1]);
    this.contentPane.getChild("num").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(t);
    var o = this.data.rankInfo;
    var i = this.contentPane.getChild("icon");
    if (o.aUrl && "" != o.aUrl) {
      i.url = o.aUrl;
    } else {
      r_ResSystem.ResSystem.loadHeadImg(i, r_RankSystem.RankSystem.nameMap["icon_" + o.uid]);
    }
    var n = o.nname;
    n = o.nname && "" != o.nname ? o.nname : r_RankSystem.RankSystem.nameMap[o.uid];
    this.contentPane.getChild("content").text = "[color=#DA694B]" + n + "[/color]给你发了一个红包";
    r_PlayerData.PlayerData.addCoin("膜拜捐赠第一", t, r_ReportSystem.SystemKey.None);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.RankTipUI = exp_RankTipUI;