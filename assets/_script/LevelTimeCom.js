var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_LevelTimeCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.levelTime = 90;
    t.addTime = 60;
    t.isCallFailFun = true;
    t.loopKey = false;
    t.downTime = 90;
    t.isStart = false;
    t._timer = 0;
    t.levelCom = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e) {
    this.levelCom = e;
    this.downTime = this.levelTime;
    this.loopKey = true;
    this.refreshLabel();
  };
  _ctor.prototype.updateTime = function (e) {
    if (e > 1) {
      console.log("出现超长帧,屏蔽掉");
    } else if (0 != this.loopKey) {
      this._timer += e;
      if (this._timer >= 1) {
        this._timer -= 1;
        this.downTime -= 1;
        if (this.downTime < 0) {
          this.downTime = 0;
          this.loopKey = false;
          this.refreshLabel();
          this.isCallFailFun && this.failLevel();
        } else {
          this.refreshLabel();
        }
      }
    }
  };
  _ctor.prototype.refreshLabel = function () {
    this.timeLabel.getComponent(cc.Label).string = this.downTime + "";
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.end = function () {
    this.loopKey = false;
  };
  _ctor.prototype.videoAddTime = function () {
    this.loopKey = false;
  };
  __decorate([_property({
    type: Number,
    tooltip: "关卡时间"
  })], _ctor.prototype, "levelTime", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "增加时间"
  })], _ctor.prototype, "addTime", undefined);
  __decorate([_property({
    type: cc.Label,
    tooltip: "时间label"
  })], _ctor.prototype, "timeLabel", undefined);
  __decorate([_property({
    tooltip: "时间结束是否调游戏结束函数"
  })], _ctor.prototype, "isCallFailFun", undefined);
  return __decorate([_ccclass, _menu("文字游戏/时间")], _ctor);
}(cc.Component);
exports.default = def_LevelTimeCom;