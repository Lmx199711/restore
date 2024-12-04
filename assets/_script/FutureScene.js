var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FutureScene = undefined;
var r_UtilsSystem = require("UtilsSystem");
var r_MainUI = require("MainUI");
var r_BaseCom = require("BaseCom");
var r_EntryCityUI = require("EntryCityUI");
var r_RussiaUI = require("RussiaUI");
var r_AetherUI = require("AetherUI");
var r_BlockSystem = require("BlockSystem");
var exp_FutureScene = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    e.prototype.onConstruct.call(this);
    this.btnNewCity = this.getChild("btnNewCity");
    this.btnWeaponsDepot = this.getChild("btnWeaponsDepot");
    this.btnExploreUniverse = this.getChild("btnExploreUniverse");
    this.btnScienceMall = this.getChild("btnScienceMall");
    this.btnInstitute = this.getChild("btnInstitute");
    this.btnMetaverse = this.getChild("btnMetaverse");
    this.imgLock = this.getChild("imgLock");
    this.bindBtnCallback(this.btnNewCity, this.btnWeaponsDepot, this.btnExploreUniverse, this.btnScienceMall, this.btnInstitute, this.btnMetaverse, this.imgLock);
  };
  _ctor.prototype.touchBtn = function (e) {
    switch (e) {
      case "btnNewCity":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(1);
        break;
      case "btnWeaponsDepot":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.俄罗斯轮盘)) {
          r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        } else {
          r_RussiaUI.default.showUI();
        }
        break;
      case "btnExploreUniverse":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.太空冒险)) {
          r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        } else {
          r_AetherUI.default.showUI();
        }
        break;
      case "btnScienceMall":
        console.log("科技商场");
        r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        break;
      case "btnInstitute":
        console.log("研究所");
        r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        break;
      case "btnMetaverse":
        console.log("元宇宙");
        r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        break;
      case "imgLock":
        r_EntryCityUI.default.showUI({
          index: 2
        });
        break;
      default:
        r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
  };
  _ctor.showUI = function (t) {
    e.onShown.call(this, t);
    r_MainUI.MainUI.Inst.contentPane.getController("c1").selectedIndex = 3;
    r_MainUI.MainUI.Inst.VillageScene.checkIsLockHuiShou();
  };
  return _ctor;
}(r_BaseCom.BaseCom);
exports.FutureScene = exp_FutureScene;