Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FsmActionSys = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_Index = require("Index");
var r_BehaviorMgr = require("BehaviorMgr");
var r_FsmActionCom = require("FsmActionCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var exp_FsmActionSys = function () {
  function _ctor() {
    this.selectIndex = -1;
    this.keyArr = [];
    this.actArr = [];
  }
  _ctor.prototype.onStart = function () {
    var e = this;
    this.entity.fsmInfo.forEach(function (t) {
      e.keyArr.push(t.key);
      e.actArr.push(t.actionId || "");
    });
    r_GameKeyMgr.GameKeyMgr.addGroup(this.keyArr);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onCheck = function (e) {
    var t = e.data;
    var o = t.add;
    var i = t.key;
    if (o) {
      var n = this.keyArr.indexOf(i);
      if (n == this.selectIndex) {
        return;
      }
      if (-1 != n) {
        var a = r_CommonFunc.stringKeyToArr(this.entity.ids);
        a && a.length > 0 && a.forEach(function (e) {
          r_BehaviorMgr.BehaviorMgr.trigger(e);
        });
        this.selectIndex = n;
        this.actArr[this.selectIndex] && r_BehaviorMgr.BehaviorMgr.trigger(this.actArr[this.selectIndex]);
      }
    }
  };
  _ctor.prototype.onEnable = function () {
    r_Index.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDisable = function () {
    r_Index.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onUpdate = function () {};
  return __decorate([r_DecorateBehavior.bindEventCom(r_FsmActionCom.FsmActionCom)], _ctor);
}();
exports.FsmActionSys = exp_FsmActionSys;