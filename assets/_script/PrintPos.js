var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _menu = _decorator.menu;
var def_PrintPos = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = "[";
    for (var t = 0; t < this.node.children.length; t++) {
      t > 0 && (e += ",");
      var o = this.node.children[t].position;
      e = e + "[" + Math.round(o.x) + "," + Math.round(o.y) + "]";
    }
    e += "]";
    console.log(e);
  };
  return __decorate([_ccclass, _menu("秘书/打印位置")], _ctor);
}(cc.Component);
exports.default = def_PrintPos;