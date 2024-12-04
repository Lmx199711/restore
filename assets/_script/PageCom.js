var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_PageCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodeList = [];
    t.startIndex = 0;
    t.curIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.curIndex = this.startIndex;
    this.refreshInfo();
  };
  _ctor.prototype.refreshInfo = function () {
    if (this.curIndex <= 0) {
      this.leftBtn.node.active = false;
    } else {
      this.leftBtn.node.active = true;
    }
    if (this.curIndex >= this.nodeList.length - 1) {
      this.rightBtn.node.active = false;
    } else {
      this.rightBtn.node.active = true;
    }
    for (var e = 0; e < this.nodeList.length; e++) {
      if (e == this.curIndex) {
        this.nodeList[e].active = true;
      } else {
        this.nodeList[e].active = false;
      }
    }
  };
  _ctor.prototype.onClickLeft = function () {
    if (!(this.curIndex <= 0)) {
      this.curIndex = this.curIndex - 1;
      this.refreshInfo();
    }
  };
  _ctor.prototype.onClickRight = function () {
    if (!(this.curIndex >= this.nodeList.length - 1)) {
      this.curIndex = this.curIndex + 1;
      this.refreshInfo();
    }
  };
  __decorate([_property({
    type: cc.Button,
    displayName: "左按钮"
  })], _ctor.prototype, "leftBtn", undefined);
  __decorate([_property({
    type: cc.Button,
    displayName: "右按钮"
  })], _ctor.prototype, "rightBtn", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "节点列表"
  })], _ctor.prototype, "nodeList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "初始索引"
  })], _ctor.prototype, "startIndex", undefined);
  return __decorate([_ccclass, _menu("文字游戏/左右切换")], _ctor);
}(cc.Component);
exports.default = def_PageCom;