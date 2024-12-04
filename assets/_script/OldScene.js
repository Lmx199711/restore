var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OldScene = undefined;
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_City85UI = require("City85UI");
var r_PhoneMakeUI2 = require("PhoneMakeUI2");
var r_SquareUI = require("SquareUI");
var r_StoneNewUI = require("StoneNewUI");
var r_EntryUI = require("EntryUI");
var r_HouseMarketUI = require("HouseMarketUI");
var r_JobUI = require("JobUI");
var r_JumpFishUI = require("JumpFishUI");
var r_MainUI = require("MainUI");
var r_PokonyanUI = require("PokonyanUI");
var r_BlockSystem = require("BlockSystem");
var r_GoodsShopUI = require("GoodsShopUI");
var r_BaseCom = require("BaseCom");
var r_PreloadSystem = require("PreloadSystem");
var r_UIDef = require("UIDef");
var r_EntryCityUI = require("EntryCityUI");
var exp_OldScene = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    e.prototype.onConstruct.call(this);
    this.btnJob = this.getChild("btnJob");
    this.btnPhoneMake = this.getChild("btnPhoneMake");
    this.btnSquare = this.getChild("btnSquare");
    this.btnStone = this.getChild("btnStone");
    this.btnTaskHall = this.getChild("btnTaskHall");
    this.btnFun = this.getChild("btnFun");
    this.btnHouseMarket = this.getChild("btnHouseMarket");
    this.btnNewCity = this.getChild("btnNewCity");
    this.btnJumpFish = this.getChild("btnJumpFish");
    this.btnBelicat = this.getChild("btnBelicat");
    this.btnVillage = this.getChild("btnVillage");
    this.btnGoodsShop = this.getChild("btnGoodsShop");
    this.imgLock = this.getChild("imgLock");
    this.btnJumpFish.visible = "1" == r_PlatformSystem.PlatformSystem.jumpFish;
    this.btnBelicat.visible = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.叮当猫);
    this.bindBtnCallback(this.btnJob, this.btnPhoneMake, this.btnSquare, this.btnStone, this.btnTaskHall, this.btnFun, this.btnHouseMarket, this.btnNewCity, this.btnJumpFish, this.btnBelicat, this.btnVillage, this.btnGoodsShop, this.imgLock);
  };
  _ctor.prototype.touchBtn = function (e) {
    switch (e) {
      case "btnJob":
        r_JobUI.JobUI.showUI();
        break;
      case "btnPhoneMake":
        r_PhoneMakeUI2.PhoneMakeUI2.showUI();
        break;
      case "btnSquare":
        r_SquareUI.SquareUI.showUI();
        break;
      case "btnStone":
        r_StoneNewUI.default.showUI();
        break;
      case "btnTaskHall":
        r_City85UI.default.showUI();
        break;
      case "btnFun":
        r_EntryUI.default.showUI(1);
        break;
      case "btnHouseMarket":
        r_HouseMarketUI.default.showUI();
        break;
      case "btnJumpFish":
        r_UtilsSystem.UtilsSystem.showLoading(true);
        r_ResSystem.ResSystem.loadBundleRes("game1", "jumpFish/jumpFish", cc.Prefab, function () {
          r_UtilsSystem.UtilsSystem.showLoading(false);
          r_JumpFishUI.JumpFishUI.showUI();
        });
        break;
      case "btnNewCity":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(1);
        break;
      case "btnBelicat":
        r_PokonyanUI.default.showUI();
        break;
      case "btnVillage":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(3);
        break;
      case "imgLock":
        r_EntryCityUI.default.showUI({
          index: 0
        });
        break;
      case "btnGoodsShop":
        r_UtilsSystem.UtilsSystem.showLoading(true);
        r_PreloadSystem.PreloadSystem.preloadFguiRes({
          path: r_UIDef.UIDef.Pack.GoodsShop
        }, function () {
          r_UtilsSystem.UtilsSystem.showLoading(false);
          r_GoodsShopUI.GoodsShopUI.showUI();
        });
    }
  };
  _ctor.showUI = function (t) {
    e.onShown.call(this, t);
    r_MainUI.MainUI.Inst.contentPane.getController("c1").selectedIndex = 1;
  };
  return _ctor;
}(r_BaseCom.BaseCom);
exports.OldScene = exp_OldScene;