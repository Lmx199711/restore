var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElemeUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_ElemeCfg = require("ElemeCfg");
var r_BlockSystem = require("BlockSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_Config = require("Config");
var exp_ElemeUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.ElemeUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ElemeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ElemeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.list = this.contentPane.getChild("list");
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.m_listData = this.getListData();
    this.list.itemRenderer = this.itemRenderer.bind(this);
    r_ResSystem.ResSystem.loadBundleRes("game2", "bartender/naic", cc.Prefab, function () {});
  };
  _ctor.prototype.getListData = function () {
    return r_ElemeCfg.ElemeCfg.filter(function (e) {
      return !r_BlockSystem.BlockSystem.isBlock(e.id);
    });
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = this.m_listData[e];
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game4", "phone/eleme/" + o.icon);
    t.getChild("labCoin").text = r_UtilsSystem.UtilsSystem.numFormats(o.reward);
    t.getChild("labName").text = o.name;
    t.clearClick();
    t.onClick(function () {
      if (o.data) {
        r_Config.default.uiClassMap[o.ui].showUI(o.data);
      } else {
        r_Config.default.uiClassMap[o.ui].showUI();
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = this.m_listData.length;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ElemeUI = exp_ElemeUI;