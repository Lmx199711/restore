var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SDKMgr1 = require("SDKMgr1");
var r_UtilsSystem = require("UtilsSystem");
var r_SubwayUI = require("SubwayUI");
var r_TanqiuSelectUI = require("TanqiuSelectUI");
var r_TigerGameUI = require("TigerGameUI");
var r_SoundMgr = require("SoundMgr");
var r_ChineseChessUI = require("ChineseChessUI");
var r_BanquetUI = require("BanquetUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_FunUICom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.btnGameCity = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.getChildByName("btnGameCity").active = 1 == r_SDKMgr1.SDKMgr1.weixinpingbi;
  };
  _ctor.prototype.onClickRace = function () {};
  _ctor.prototype.onClickAuction = function () {
    console.log("点击拍卖");
    r_SoundMgr.SoundMgr.playSound("click");
    r_UtilsSystem.UtilsSystem.showTip("暂未开启");
  };
  _ctor.prototype.onClick3 = function () {
    console.log("点击未开启");
    r_SoundMgr.SoundMgr.playSound("click");
    r_UtilsSystem.UtilsSystem.showTip("暂未开启");
  };
  _ctor.prototype.onClickGameCity = function () {
    console.log("点击转转乐");
    r_TigerGameUI.default.showUI();
    r_SoundMgr.SoundMgr.playSound("click");
  };
  _ctor.prototype.onClickSubway = function () {
    console.log("点击地铁相亲");
    r_SubwayUI.SubwayUI.showUI();
    r_SoundMgr.SoundMgr.playSound("click");
  };
  _ctor.prototype.onClickTanqiu = function () {
    console.log("点击街头弹球");
    r_SoundMgr.SoundMgr.playSound("click");
    r_TanqiuSelectUI.default.showUI();
  };
  _ctor.prototype.onClickChess = function () {
    console.log("点击象棋");
    r_SoundMgr.SoundMgr.playSound("click");
    r_ChineseChessUI.ChineseChessUI.showUI();
  };
  _ctor.prototype.onClickBanquet = function () {
    console.log("点击宴会");
    r_SoundMgr.SoundMgr.playSound("click");
    r_BanquetUI.BanquetUI.showUI();
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "btnGameCity", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_FunUICom;