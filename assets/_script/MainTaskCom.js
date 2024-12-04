var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainTaskCom = undefined;
var r_BlockSystem = require("BlockSystem");
var r_ChangeSystem = require("ChangeSystem");
require("IconSystem");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var r_TaskSystem = require("TaskSystem");
var r_SoundMgr = require("SoundMgr");
var r_TaskUI = require("TaskUI");
var exp_MainTaskCom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    r_TaskUI.default.taskComId++;
    this.showView();
    this.onClick(this.onClickSelf, this);
  };
  _ctor.prototype.onUpdateTime = function () {
    r_PlayerData.PlayerData.data && (r_RoleSystem.RoleSystem.isPause || this.showView());
  };
  _ctor.prototype.showView = function () {
    r_PlayerData.PlayerData.data && (this.visible = false);
  };
  _ctor.prototype.onClickSelf = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    var e = r_TaskSystem.TaskSystem.getMainTaskPanelId();
    if (null == e.index || null != e.id) {
      var t = r_TaskSystem.TaskSystem.getMainCfg(e.index, e.id);
      switch (r_TaskSystem.TaskSystem.getMainItemState(e.index, e.id)) {
        case r_TaskSystem.TaskState.已完成:
          r_TaskSystem.TaskSystem.getMainTaskAward(e.index, e.id);
          this.showView();
          break;
        case r_TaskSystem.TaskState.未开始:
        case r_TaskSystem.TaskState.进行中:
          if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.彩票) && 4 == t.id) {
            return;
          }
          r_ChangeSystem.ChangeSystem.setChangeWin(t.change);
      }
    } else {
      r_TaskUI.default.showUI(e);
    }
  };
  return _ctor;
}(fgui.GComponent);
exports.MainTaskCom = exp_MainTaskCom;