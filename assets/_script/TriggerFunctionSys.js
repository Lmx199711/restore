Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerFunctionSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_TriggerFunctionCom = require("TriggerFunctionCom");
var r_BehaviorDef = require("BehaviorDef");
var exp_TriggerFunctionSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    if (e) {
      var t = r_BehaviorDef.HandleData(e);
      var o = t[0];
      var i = t[1];
      switch (o) {
        case r_BehaviorDef.ARGS.args:
          this.entity.events.forEach(function (e) {
            e.emit([,, i]);
          });
          break;
        case r_BehaviorDef.ARGS.now:
          this.entity.events.forEach(function (e) {
            var t;
            e.emit([,, (t = {}, t[r_BehaviorDef.ARGS.now] = i, t)]);
          });
          break;
        case r_BehaviorDef.ARGS.over:
          this.entity.events.forEach(function (e) {
            var t;
            e.emit([,, (t = {}, t[r_BehaviorDef.ARGS.over] = i, t)]);
          });
          break;
        case r_BehaviorDef.ARGS.childAdd:
          this.entity.events.forEach(function (e) {
            var t;
            e.emit([,, (t = {}, t[r_BehaviorDef.ARGS.childAdd] = i, t)]);
          });
          break;
        case r_BehaviorDef.ARGS.childSelf:
          this.entity.events.forEach(function (e) {
            var t;
            e.emit([,, (t = {}, t[r_BehaviorDef.ARGS.childSelf] = i, t)]);
          });
          break;
        case r_BehaviorDef.ARGS.back:
          this.entity.events.forEach(function (e) {
            var t;
            e.emit([,, (t = {}, t[r_BehaviorDef.ARGS.back] = true, t)]);
          });
          break;
        default:
          this.entity.events.forEach(function (t) {
            t.emit([,, e]);
          });
      }
    } else {
      this.entity.events.forEach(function (e) {
        e.emit([,,]);
      });
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_TriggerFunctionCom.TriggerFunctionCom)], _ctor);
}();
exports.TriggerFunctionSys = exp_TriggerFunctionSys;