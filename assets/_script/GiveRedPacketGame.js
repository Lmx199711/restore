var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiveRedPacketGame = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_GiveRedPacketGameLogic = require("GiveRedPacketGameLogic");
var r_GiveRedPacketSelectUI = require("GiveRedPacketSelectUI");
var exp_GiveRedPacketGame = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GiveRedPacket, r_UIDef.UIDef.Res.UI.GiveRedPacketGame) || this;
    t.prefab = null;
    t.gameLogic = null;
    t.isGameing = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GiveRedPacketGame, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GiveRedPacketGame);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.isGameing = true;
    r_ResSystem.ResSystem.loadBundleRes("game1", "giveRedPacket/gamePrefab", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (o) {
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_GiveRedPacketGameLogic.default);
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
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.tiggerCaidan1 = false;
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.showCaidan2 = function () {
    this.gameLogic.showCaidan2();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.GiveRedPacketGame = exp_GiveRedPacketGame;