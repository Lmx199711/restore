var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountMoneyUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_SoundMgr = require("SoundMgr");
var r_CountMoneyLogic = require("CountMoneyLogic");
var r_FguiResSystem = require("FguiResSystem");
var exp_CountMoneyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CountMoney, r_UIDef.UIDef.Res.UI.CountMoneyUI) || this;
    t.isRestart = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CountMoneyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CountMoneyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.tiggerCaidan1 = false;
    this.isRestart = false;
    r_SoundMgr.SoundMgr.playMusic("countMoney/BGM");
    r_ResSystem.ResSystem.loadBundleRes("game1", "countMoney/countMoneyPrefab", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (o) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_CountMoneyLogic.default);
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
  _ctor.prototype.againStartGame = function () {
    var e = this;
    this.isRestart = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_ResSystem.ResSystem.loadBundleRes("game1", "countMoney/countMoneyPrefab", cc.Prefab, function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (o) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_CountMoneyLogic.default);
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
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.CountMoneyUI = exp_CountMoneyUI;