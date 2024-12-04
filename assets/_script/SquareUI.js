var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SquareUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_SDKMgr1 = require("SDKMgr1");
var r_BaseWin = require("BaseWin");
var r_ResSystem = require("ResSystem");
var exp_SquareUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Square, r_UIDef.UIDef.Res.UI.SquareUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SquareUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SquareUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/square/square", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      if (0 == r_SDKMgr1.SDKMgr1.weixinpingbi) {
        console.log("隐藏彩票中心");
        t.prefab.getChildByName("btnLottery").active = false;
      } else {
        console.log("显示彩票中心");
        t.prefab.getChildByName("btnLottery").active = true;
      }
      t.contentPane.getChild("center").node.addChild(t.prefab);
      r_PlatformSystem.PlatformSystem.jjs && "0" == r_PlatformSystem.PlatformSystem.jjs && (t.prefab.getChildByName("btnBottle").active = false);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SquareUI = exp_SquareUI;