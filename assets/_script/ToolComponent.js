var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ItemComponent = require("ItemComponent");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ToolComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemId = 0;
    t.itemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {};
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property({
    tooltip: "工具Id"
  })], _ctor.prototype, "itemId", undefined);
  __decorate([_property({
    type: [r_ItemComponent.default],
    tooltip: "节点列表"
  })], _ctor.prototype, "itemList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ToolComponent;