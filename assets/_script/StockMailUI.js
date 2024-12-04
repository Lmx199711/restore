var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockMailUI = undefined;
var r_UIDef = require("UIDef");
var r_ChatSystem = require("ChatSystem");
var r_MailSystem = require("MailSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TYIndex = require("TYIndex");
var r_ChatDetailUI = require("ChatDetailUI");
var exp_StockMailUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockMailUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockMailUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockMailUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickOk, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOk = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("猴票聊天", function () {
      e.hide();
      r_ChatDetailUI.ChatDetailUI.showUI({
        taskId: r_ChatSystem.ChatSystem.monkeyTaskId,
        callBack: function () {
          r_MailSystem.MailSystem.removeMail(r_MailSystem.MailSystem.monkeyMailId);
        }
      });
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockMailUI = exp_StockMailUI;