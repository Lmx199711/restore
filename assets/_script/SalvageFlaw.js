var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_SalvageFlaw = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bubble = "";
    t.soundPath = "";
    t.price = 1e3;
    t.hitArea = 1;
    t.findType = 0;
    t.tempVSeft = cc.v2();
    t.tempVOhter = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.getIsActive = function (e) {
    if (0 == this.findType) {
      return this.getAreaFind(e);
    } else {
      return this.getPointFind(e);
    }
  };
  _ctor.prototype.getPointFind = function (e) {
    return r_CommonFunc.checkNodeOverOtherNode(e, this.node);
  };
  _ctor.prototype.getAreaFind = function (e) {
    this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempVSeft);
    e.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempVOhter);
    var t = Math.max(0, Math.min(this.tempVSeft.x + this.node.width, this.tempVOhter.x + e.width) - Math.max(this.tempVSeft.x, this.tempVOhter.x));
    var o = Math.max(0, Math.min(this.tempVSeft.y + this.node.height, this.tempVOhter.y + e.height) - Math.max(this.tempVSeft.y, this.tempVOhter.y));
    if (t > 0 && o > 0) {
      var i = t * o;
      var n = this.node.width * this.node.height;
      console.log("比例：", i / n);
      if (i / n >= this.hitArea) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.showTip = function () {
    var e = this.node.getChildByName("tip").getComponent(cc.Sprite);
    cc.tween(e).to(.5, {
      fillRange: 1
    }).start();
  };
  __decorate([_property(String)], _ctor.prototype, "bubble", undefined);
  __decorate([_property(String)], _ctor.prototype, "soundPath", undefined);
  __decorate([_property(Number)], _ctor.prototype, "price", undefined);
  __decorate([_property(Number)], _ctor.prototype, "hitArea", undefined);
  __decorate([_property(Number)], _ctor.prototype, "findType", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SalvageFlaw;