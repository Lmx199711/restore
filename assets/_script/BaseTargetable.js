Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseTargetable = undefined;
var _property = cc._decorator.property;
var exp_BaseTargetable = function () {
  function _ctor() {}
  __decorate([_property({
    displayName: "需要的目标点",
    type: cc.Node,
    tooltip: "会以此节点的size为范围"
  })], _ctor.prototype, "targetArea", undefined);
  return _ctor;
}();
exports.BaseTargetable = exp_BaseTargetable;