var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_AetherProgressBar = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.pro = null;
    t.lab = null;
    t.jiantou = null;
    t.m_maxValue = 1e4;
    t.m_dis = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "value", {
    get: function () {
      return this.pro.progress;
    },
    set: function (e) {
      this.pro.progress = 1 - e;
      this.m_dis = Math.ceil(this.m_maxValue * (1 - e));
      this.lab.string = this.m_dis + "光年";
      var t = this.pro.totalLength * (1 - e - .5);
      this.jiantou.y = t;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "dis", {
    get: function () {
      return this.m_dis;
    },
    enumerable: false,
    configurable: true
  });
  __decorate([_property(cc.ProgressBar)], _ctor.prototype, "pro", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "lab", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "jiantou", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AetherProgressBar;