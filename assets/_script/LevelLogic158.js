var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LevelPreload = require("LevelPreload");
var r_PlatformSystem = require("PlatformSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxTipUI = require("RelaxTipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_LevelLogic158 = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.init()];
          case 1:
            e.sent();
            return [2, null];
        }
      });
    });
  };
  _ctor.prototype.onEnable = function () {
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      this.node.getChildByName("nodeTip").children[0].active = false;
    } else {
      this.node.getChildByName("nodeTip").children[0].active = true;
    }
  };
  _ctor.prototype.init = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
  };
  _ctor.prototype.passLevel = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.failLevel = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.update = function (t) {
    e.prototype.update.call(this, t);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(t);
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_RelaxTipUI.default.showUI();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.getChildByName("nodeTip").children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_RelaxTipUI.default.showUI();
      });
    }
  };
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_LevelLogic158;