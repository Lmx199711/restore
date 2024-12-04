var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSpriteInfo = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_ChangeSpriteInfo = function () {
  function _ctor() {
    this.equipList = [];
    this.action = "";
  }
  __decorate([_property({
    type: [cc.Node],
    displayName: "装备列表"
  })], _ctor.prototype, "equipList", undefined);
  __decorate([_property({
    displayName: "触发的action"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("ChangeSpriteInfo")], _ctor);
}();
exports.ChangeSpriteInfo = exp_ChangeSpriteInfo;
var def_PartItem = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.partIdList = [];
    t.score = 10;
    t.changeSpriteList = [];
    t.equipGetAction = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  __decorate([_property({
    type: [Number],
    displayName: "覆盖部位列表"
  })], _ctor.prototype, "partIdList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "积分"
  })], _ctor.prototype, "score", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "目标节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: [exp_ChangeSpriteInfo],
    displayName: "切换图片列表"
  })], _ctor.prototype, "changeSpriteList", undefined);
  __decorate([_property({
    displayName: "装备后抬起触发的action"
  })], _ctor.prototype, "equipGetAction", undefined);
  return __decorate([_ccclass, _menu("换装/部位组件")], _ctor);
}(cc.Component);
exports.default = def_PartItem;