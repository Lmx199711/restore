var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewScene = undefined;
var r_BlockSystem = require("BlockSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BaseCom = require("BaseCom");
var r_FunUI = require("FunUI");
var r_EntryCityUI = require("EntryCityUI");
var r_EntryUI = require("EntryUI");
var r_FiledSelectUI = require("FiledSelectUI");
var r_PotatoEntryUI = require("PotatoEntryUI");
var r_VentureUI = require("VentureUI");
var r_MainUI = require("MainUI");
var exp_NewScene = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    e.prototype.onConstruct.call(this);
    this.btn2 = this.getChild("btn2");
    this.btnAmusementPark = this.getChild("btnAmusementPark");
    this.btn0 = this.getChild("btn0");
    this.btnTv = this.getChild("btnTv");
    this.btnBath = this.getChild("btnBath");
    this.btnField = this.getChild("btnField");
    this.btnVenture = this.getChild("btnVenture");
    this.btnFutureCity = this.getChild("btnFutureCity");
    this.btnOldCity = this.getChild("btnOldCity");
    this.btnPotato = this.getChild("btnPotato");
    this.imgLock = this.getChild("imgLock");
    this.bindBtnCallback(this.btn2, this.btnAmusementPark, this.btn0, this.btnTv, this.btnPotato, this.btnBath, this.btnField, this.btnVenture, this.btnFutureCity, this.btnOldCity, this.imgLock);
    r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.洗脚城) && (this.btnBath.visible = false);
  };
  _ctor.prototype.touchBtn = function (e) {
    switch (e) {
      case "btn2":
      case "btn0":
      case "btnTv":
        r_UtilsSystem.UtilsSystem.showTip("敬请期待");
        break;
      case "btnAmusementPark":
        return void r_UtilsSystem.UtilsSystem.showTip("敬请期待");
      case "btnField":
        r_FiledSelectUI.FiledSelectUI.showUI();
        break;
      case "btnVenture":
        r_VentureUI.VentureUI.showUI();
        break;
      case "btnBath":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.洗浴中心)) {
          return void r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        }
        r_EntryUI.default.showUI(0);
        break;
      case "btnFun":
        r_FunUI.FunUI.showUI();
        break;
      case "btnOldCity":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(0);
        break;
      case "btnFutureCity":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(2);
        break;
      case "imgLock":
        r_EntryCityUI.default.showUI({
          index: 1
        });
        break;
      case "btnPotato":
        r_PotatoEntryUI.default.showUI();
    }
  };
  _ctor.showUI = function (t) {
    e.onShown.call(this, t);
    r_MainUI.MainUI.Inst.contentPane.getController("c1").selectedIndex = 0;
  };
  return _ctor;
}(r_BaseCom.BaseCom);
exports.NewScene = exp_NewScene;