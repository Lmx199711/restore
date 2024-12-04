Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddNodeInfo = undefined;
var r_CleanComponent = require("CleanComponent");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_AddNodeInfo = function () {
  function _ctor() {
    this.AddPicCom = null;
    this.onClearFinishedBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.plist = null;
    this.progress = 0;
    this.isFinished = false;
    this.isCompleted = false;
  }
  _ctor.prototype.init = function (e, t) {
    undefined === t && (t = null);
    this.listener = t;
    this.AddPicCom.initPoints();
    this.AddPicCom.setAddPicInfo(e, this.plist.children, this.onCleanSuccess.bind(this));
  };
  _ctor.prototype.clean = function () {
    this.AddPicCom.checkTouch();
  };
  _ctor.prototype.cleanEnter = function () {
    this.AddPicCom.cleanEnd();
  };
  _ctor.prototype.cleanEnd = function () {
    this.AddPicCom.cleanEnd();
  };
  _ctor.prototype.onCleanSuccess = function () {
    this.listener && this.listener.onAddPicSuccess(this);
    this.isFinished = true;
    this.progress = 1;
    this.onClearFinishedBehavior && this.onClearFinishedBehavior.execute();
  };
  _ctor.prototype.checkCleanCompleted = function () {
    if (!(this.isCompleted || this.progress < 1)) {
      this.isCompleted = true;
      this.AddPicCom.cleanCompeleted();
    }
  };
  __decorate([_property({
    displayName: "清理节点",
    type: r_CleanComponent.default
  })], _ctor.prototype, "AddPicCom", undefined);
  __decorate([_property({
    displayName: "添加完成时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "onClearFinishedBehavior", undefined);
  __decorate([_property({
    displayName: "用于检测进度的所有节点的父节点",
    tooltip: "被检测的所有节点初始状态active必须为false，否则不会检测active为true的节点",
    type: cc.Node
  })], _ctor.prototype, "plist", undefined);
  return __decorate([_ccclass("AddNodeInfo")], _ctor);
}();
exports.AddNodeInfo = exp_AddNodeInfo;