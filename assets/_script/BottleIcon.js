var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_BottleIcon = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_hitList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function () {
    this.m_hitList = [];
  };
  _ctor.prototype.onCollisionStay = function (e) {
    "item" == e.node.name && (this.m_hitList.includes(e.node) || this.m_hitList.push(e.node));
  };
  _ctor.prototype.isHit = function () {
    return this.m_hitList;
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BottleIcon;