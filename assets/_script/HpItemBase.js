var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadMgr = require("LoadMgr");
var r_GameLogicBase = require("GameLogicBase");
var def_HpItemBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.totalPH = 100;
    t.totalSize = 100;
    t.curPH = 0;
    t.curSize = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e, t, o) {
    this.totalPH = e;
    this.totalSize = t;
    this.curPH = o;
    this.curSize = this.totalSize * (this.curPH / this.totalPH);
  };
  _ctor.prototype.over2Success = function () {
    var e;
    null === (e = r_LoadMgr.default.runInstance.getComponent(r_GameLogicBase.default)) || undefined === e || e.succ();
  };
  _ctor.prototype.over2Defeat = function () {
    var e;
    null === (e = r_LoadMgr.default.runInstance.getComponent(r_GameLogicBase.default)) || undefined === e || e.fail();
  };
  return _ctor;
}(cc.Component);
exports.default = def_HpItemBase;