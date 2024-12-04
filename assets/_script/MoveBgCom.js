var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_MoveBgCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.speed = 10;
    t.bgNum = 2;
    t.bgList = [];
    t.nextIndex = 0;
    t.bgParent = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.bgList = [];
    this.bgList.push(this.bg);
    this.bgParent = this.bg.parent;
    for (var e = 0; e < this.bgNum - 1; e++) {
      var t = cc.instantiate(this.bg);
      this.bgParent.addChild(t);
      t.x = this.bg.width * (e + 1);
      this.bgList.push(t);
    }
    this.nextIndex = this.bgNum;
  };
  _ctor.prototype.update = function (e) {
    this.bgParent.x = this.bgParent.x - e * this.speed;
    for (var t = 0; t < this.bgList.length; t++) {
      var o = this.bgList[t];
      if (this.bgParent.x + o.x + this.bg.width <= 0) {
        o.x = this.bg.width * this.nextIndex;
        this.nextIndex = this.nextIndex + 1;
        break;
      }
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "背景"
  })], _ctor.prototype, "bg", undefined);
  __decorate([_property({
    displayName: "速度"
  })], _ctor.prototype, "speed", undefined);
  __decorate([_property({
    displayName: "背景数量"
  })], _ctor.prototype, "bgNum", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MoveBgCom;