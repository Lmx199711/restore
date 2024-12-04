var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_TestPhysics = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.label = null;
    t.text = "hello";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    cc.director.getPhysicsManager().enabled = true;
    console.log("cc.director.getPhysicsManager().gravity=", cc.director.getPhysicsManager().gravity);
  };
  _ctor.prototype.start = function () {};
  __decorate([_property(cc.Label)], _ctor.prototype, "label", undefined);
  __decorate([_property], _ctor.prototype, "text", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_TestPhysics;