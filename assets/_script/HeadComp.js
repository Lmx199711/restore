var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadComp = undefined;
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlayerData = require("PlayerData");
var exp_HeadComp = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.num = this.getChild("num");
    this.imgName = this.getChild("imgName");
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    this.setView();
  };
  _ctor.prototype.refreshView = function () {
    r_PlayerData.PlayerData.data && this.setView();
  };
  _ctor.prototype.setView = function () {
    this.num.text = "L" + r_PlayerData.PlayerData.data.level;
    this.imgName.url = "ui://MainHome/" + r_LevelRoleSystem.LevelRoleSystem.getLevelTitle(r_PlayerData.PlayerData.data.level).name;
  };
  return _ctor;
}(fgui.GComponent);
exports.HeadComp = exp_HeadComp;