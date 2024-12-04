var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FerruleGameUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_FerruleGameLogic = require("FerruleGameLogic");
var exp_FerruleGameUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FerruleGame, r_UIDef.UIDef.Res.UI.FerruleGameUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FerruleGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FerruleGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game5", "ferruleGame/套圈", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (o) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_FerruleGameLogic.default);
                return [4, this.gameLogic.loadPreload()];
              } else {
                return [3, 2];
              }
            case 1:
              e.sent();
              e.label = 2;
            case 2:
              return [2];
          }
        });
      });
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    _ref__ctor.Inst = false;
  };
  _ctor.prototype.onClickClose = function () {
    var e = this;
    if (this.gameLogic.isGameIng()) {
      r_UtilsSystem.UtilsSystem.showAlert("游戏尚未结束，是否退出？", 0, function () {
        e.hide();
      }, this, "提示", "确定", "取消");
    } else {
      this.hide();
    }
  };
  _ctor.prototype.refreshJianBaoCount = function () {
    this.gameLogic.refreshJianBiaoList();
    this.gameLogic.resetLoadTouch();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.FerruleGameUI = exp_FerruleGameUI;