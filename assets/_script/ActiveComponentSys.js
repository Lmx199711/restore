Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveComponentSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ActiveComponentCom = require("ActiveComponentCom");
var exp_ActiveComponentSys = function () {
  function _ctor() {
    this.com = null;
  }
  _ctor.prototype.trigger = function () {
    for (var e = 0; e < this.entity.tranInfo.length; e++) {
      var t = this.entity.tranInfo[e];
      if (t.target) {
        var o = undefined;
        switch (t.type) {
          case r_ActiveComponentCom.CtType.Mask:
            o = cc.Mask;
            break;
          case r_ActiveComponentCom.CtType.Sprite:
            o = cc.Sprite;
        }
        null != t.target.getComponent(o) && (t.target.getComponent(o).enabled = t.arg1.y > 0);
      }
    }
  };
  _ctor.prototype.onStart = function () {
    for (var e = 0; e < this.entity.tranInfo.length; e++) {
      var t = this.entity.tranInfo[e];
      if (t.target) {
        var o = undefined;
        switch (t.type) {
          case r_ActiveComponentCom.CtType.Mask:
            o = cc.Mask;
        }
        t.isInit && null != t.target.getComponent(o) && (t.target.getComponent(o).enabled = t.arg1.x < 1);
      }
    }
  };
  _ctor.prototype.onDestroy = function () {
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_ActiveComponentCom.ActiveComponentCom)], _ctor);
}();
exports.ActiveComponentSys = exp_ActiveComponentSys;