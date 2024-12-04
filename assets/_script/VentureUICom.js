var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BlockSystem = require("BlockSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BitGameUI = require("BitGameUI");
var r_CatchDogUI = require("CatchDogUI");
var r_FiledSelectUI = require("FiledSelectUI");
var r_SalvageUI = require("SalvageUI");
var r_FinanceUI = require("FinanceUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_VentureUICom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {
    this.node.getChildByName("btnBit").active = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.钻井);
  };
  _ctor.prototype.onClickOil = function () {
    console.log("点击油田");
    r_SoundMgr.SoundMgr.playSound("click");
    r_FiledSelectUI.FiledSelectUI.showUI();
  };
  _ctor.prototype.onClickNotOpen = function () {
    console.log("点击未开启");
    r_SoundMgr.SoundMgr.playSound("click");
    r_UtilsSystem.UtilsSystem.showTip("暂未开启");
  };
  _ctor.prototype.onClickBit = function () {
    console.log("钻头矿井");
    r_BitGameUI.BitGameUI.showUI();
    r_SoundMgr.SoundMgr.playSound("click");
  };
  _ctor.prototype.onClickSalvage = function () {
    console.log("点击强磁打捞");
    r_SoundMgr.SoundMgr.playSound("click");
    r_SalvageUI.SalvageUI.showUI();
  };
  _ctor.prototype.onClickJingrong = function () {
    console.log("点击金融中心");
    r_SoundMgr.SoundMgr.playSound("click");
    r_FinanceUI.FinanceUI.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
      stage: "金融中心"
    });
  };
  _ctor.prototype.onClickCatchDog = function () {
    console.log("点击抓狗");
    r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
      stage: r_ReportSystem.SystemKey.抓狗
    });
    r_SoundMgr.SoundMgr.playSound("click");
    r_CatchDogUI.default.showUI();
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_VentureUICom;