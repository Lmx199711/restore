var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_SCResultAnimCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.animNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.showAnim = function (e, t) {
    this.animNode = this.node.getChildByName(e.animNode);
    this.animNode.active = true;
    var o = this.animNode.getComponent(sp.Skeleton);
    "" != e.soundUrl && r_SoundMgr.SoundMgr.playSound(e.soundUrl);
    o.setAnimation(0, e.animName, false);
    o.setCompleteListener(function () {
      t && t();
      o.setCompleteListener(null);
    });
  };
  _ctor.prototype.hideAnim = function () {
    this.animNode.active = false;
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SCResultAnimCom;