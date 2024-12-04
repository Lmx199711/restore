var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubwayUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SubwayGameUI = require("SubwayGameUI");
var r_PlayerData = require("PlayerData");
var r_DaySystem = require("DaySystem");
var r_SubwayCfg = require("SubwayCfg");
var r_ResSystem = require("ResSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_SubwayUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Subway, r_UIDef.UIDef.Res.UI.SubwayUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SubwayUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SubwayUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    r_ResSystem.ResSystem.loadBundleRes("game1", "subway/subwayCom", cc.Prefab, function (e, t) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
      }
    });
    _ctor.instace = this;
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.on(fgui.Event.CLICK_ITEM, this.onClcickItem, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.restart = function () {
    var e = r_DaySystem.DaySystem.getShowDay();
    var t = 0;
    null != r_PlayerData.PlayerData.data.dayObject.obj && (t = r_SubwayCfg.SubwayCfg[r_PlayerData.PlayerData.data.dayObject.obj].hasDay + r_PlayerData.PlayerData.data.dayObject.day);
    for (var o = 0; o < 7; o++) {
      var i = this.list.getChildAt(o);
      if (null == r_PlayerData.PlayerData.data.dayObject.obj) {
        i.getController("c1").setSelectedIndex(0);
        i.enabled = true;
      } else {
        if (t >= e && r_PlayerData.PlayerData.data.dayObject.area == o) {
          i.getController("c1").setSelectedIndex(0);
          i.enabled = true;
          continue;
        }
        i.getController("c1").setSelectedIndex(1);
        i.enabled = false;
        i.grayed = false;
      }
    }
  };
  _ctor.prototype.onClcickItem = function (e) {
    var t = this.list.getChildIndex(e);
    r_SubwayGameUI.SubwayGameUI.showUI(t);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SubwayUI = exp_SubwayUI;