var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BitCfg = require("BitCfg");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_BitProp = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bitId = "0";
    t.m_layertIndex = 0;
    t.m_data = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.m_data = JSON.parse(JSON.stringify(r_BitCfg.BitPropConfig[this.bitId]));
    this.getComponent(sp.Skeleton) && (this.getComponent(sp.Skeleton).timeScale = 0);
  };
  Object.defineProperty(_ctor.prototype, "layertIndex", {
    get: function () {
      return this.m_data.layertIndex;
    },
    set: function (e) {
      this.m_layertIndex = e;
      this.m_data.layertIndex = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "data", {
    get: function () {
      return this.m_data;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onDestroy = function () {
    this.m_data = null;
  };
  __decorate([_property(String)], _ctor.prototype, "bitId", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BitProp;