var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BattleSystem = require("BattleSystem");
var r_GroupSystem = require("GroupSystem");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseWin = require("BaseWin");
var r_BattleLevelNewUI = require("BattleLevelNewUI");
var def_BattleUpUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleUpUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BattleUpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleUpUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRendererItem.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    _ctor.instace = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.restart = function () {
    r_RoleSystem.RoleSystem.getRoleLevel();
    this.m_listData = r_RoleSystem.RoleSystem.getRoleLevelList();
    this.m_listAllData = r_RoleSystem.RoleSystem.getRoleLevelDataList();
    this.list.numItems = this.m_listData.length;
    this.onListRendererItem(Object.values(r_GroupSystem.GroupSystem.getRoleCfg()).length - 1, this.lastiTem);
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this.m_listAllData[e];
    t.getChild("btnBattle").asButton.getChild("red").visible = false;
    var i = r_RoleSystem.RoleSystem.getRoleLevel();
    if (r_Index.Platform.isDarenPlatform()) {
      t.getController("c1").selectedIndex = 0;
    } else if (o.level < i) {
      t.getController("c1").selectedIndex = 2;
    } else if (o.level == i) {
      t.getController("c1").selectedIndex = 0;
      t.getChild("btnBattle").asButton.getChild("red").visible = r_BattleSystem.BattleSystem.needShowRedTip();
    } else {
      o.level > i && (t.getController("c1").selectedIndex = 1);
    }
    t.getChild("icon").asLoader.url = "ui://Battle/icon" + o.level;
    t.getChild("labName").text = o.rivalName;
    t.getChild("labNum").text = r_UtilsSystem.UtilsSystem.numFormats(o.rivalSpeed) + "点击/秒";
    t.getChild("btnBattle").clearClick();
    t.getChild("btnBattle").onClick(this.onClickBattle.bind(this, o.level, 0 == e), this);
    t.getChild("btnRestart").clearClick();
    t.getChild("btnRestart").onClick(this.onClickBattle.bind(this, o.level, false), this);
  };
  _ctor.prototype.getItemBtnBattle = function () {
    return this.list.getChildAt(0).asCom.getChild("btnBattle");
  };
  _ctor.prototype.onClickBattle = function (e, t) {
    undefined === t && (t = false);
    e == r_RoleSystem.RoleSystem.getRoleLevel() && r_ReportSystem.ReportSystem.reportBattleEntery(e);
    r_BattleLevelNewUI.default.showUI({
      level: e,
      ispingbi: t
    });
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lastiTem")], _ctor.prototype, "lastiTem", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BattleUpUI;