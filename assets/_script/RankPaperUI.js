var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankPaperUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_RankSystem = require("RankSystem");
var r_PreloadSystem = require("PreloadSystem");
var exp_RankPaperUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankPaperUI) || this;
    t.showAnimFlag = true;
    t.hideAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankPaperUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankPaperUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.Secret
    }, function () {});
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("title").text = r_RankSystem.RankSystem.showNameList[r_RankSystem.RankSystem.rankList[0].provinceid - 1];
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.RankPaperUI = exp_RankPaperUI;