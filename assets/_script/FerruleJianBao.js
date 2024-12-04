var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FerruleJianBao = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_FerruleGameUI = require("FerruleGameUI");
var r_JianBaoLogic = require("JianBaoLogic");
var exp_FerruleJianBao = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FerruleGame, r_UIDef.UIDef.Res.UI.FerruleJianBao) || this;
    t.m_GameIng = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FerruleJianBao, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FerruleJianBao);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.m_GameIng = false;
    _ref__ctor.Inst = this;
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "ferruleGame/鉴宝页面", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          if (o) {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
            this.prefab && this.prefab.destroy();
            this.prefab = cc.instantiate(o);
            this.contentPane.getChild("center").node.addChild(this.prefab);
            this.gameLogic = this.prefab.getComponent(r_JianBaoLogic.default);
          }
          return [2];
        });
      });
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    _ref__ctor.Inst = null;
    r_FerruleGameUI.FerruleGameUI.Inst && r_FerruleGameUI.FerruleGameUI.Inst.refreshJianBaoCount();
  };
  _ctor.prototype.onClickClose = function () {
    var e = this;
    if (this.m_GameIng) {
      r_UtilsSystem.UtilsSystem.showAlert("游戏尚未结束，是否退出？", 0, function () {
        e.hide();
      }, this, "提示", "确定", "取消");
    } else {
      this.hide();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.FerruleJianBao = exp_FerruleJianBao;