Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VarPoolSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_VarPoolCom = require("VarPoolCom");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_LoadMgr = require("LoadMgr");
var exp_VarPoolSys = function () {
  function _ctor() {}
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onStart = function () {
    this.entity.curLevelKey && r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.entity.curLevelKey, r_LoadMgr.default.currLv);
    this.entity.varInfos.forEach(function (e) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(e.key, e.value);
    });
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onUpdate = function () {};
  return __decorate([r_DecorateBehavior.bindEventCom(r_VarPoolCom.VarPoolCom)], _ctor);
}();
exports.VarPoolSys = exp_VarPoolSys;