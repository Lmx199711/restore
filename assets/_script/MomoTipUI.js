var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomoTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_MomoCom = require("MomoCom");
var r_MomoUI = require("MomoUI");
var r_MomoChatUI = require("MomoChatUI");
var exp_MomoTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.MomoTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MomoTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MomoTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnCancel").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnWait").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnChat").asButton.onClick(this.onClickChat, this);
    this.contentPane.getChild("btnStart").asButton.onClick(this.onClickStart, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = r_PhoneSystem.PhoneSystem.getPersonCfg(this.data.id);
    r_ResSystem.ResSystem.loadFguiImg(this.contentPane.getChild("icon"), "ui/momo/image/" + t.bg);
    r_ResSystem.ResSystem.loadFguiImg(this.contentPane.getChild("icon2"), "ui/momo/image/" + t.bg);
    r_ResSystem.ResSystem.loadFguiImg(this.contentPane.getChild("icon3"), "ui/momo/player/" + r_PlayerData.PlayerData.data.curHead);
    this.contentPane.getController("mode").selectedIndex = this.data.mode;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickChat = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("闪聊", function () {
      r_MomoCom.default.Inst && r_MomoCom.default.Inst.quickLove();
      r_PhoneSystem.PhoneSystem.addToChatList(e.data.id);
      e.hide();
      r_MomoUI.MomoUI.Inst.changeToChatList();
      r_MomoChatUI.MomoChatUI.showUI({
        taskId: e.data.id
      });
    });
  };
  _ctor.prototype.onClickStart = function () {
    r_PhoneSystem.PhoneSystem.addToChatList(this.data.id);
    this.hide();
    r_MomoUI.MomoUI.Inst.changeToChatList();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MomoTipUI = exp_MomoTipUI;