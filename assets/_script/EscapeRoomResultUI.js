var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_EscapeRoomUI = require("EscapeRoomUI");
var def_EscapeRoomResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.EscapeRoom, r_UIDef.UIDef.Res.UI.EscapeRoomResultUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EscapeRoomResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EscapeRoomResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOk);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.back.node.off(cc.Node.EventType.TOUCH_START);
    this.back.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_EscapeRoomUI.default.hide();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnOk = function () {
    r_PlayerData.PlayerData.addCoin("逃出空房奖励", 1e7, r_ReportSystem.SystemKey.小游戏);
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("back")], _ctor.prototype, "back", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EscapeRoomResultUI;