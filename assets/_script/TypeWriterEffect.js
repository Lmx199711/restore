var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeWriterEffect = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_TypeWriterEffect = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.typeCool = .02;
    t.words = "";
    t.isActive = false;
    t.currentPos = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.timer = 0;
    this.typeCool = Math.min(.2, this.typeCool);
    this.myText && (this.myText.string = "");
  };
  _ctor.prototype.update = function (e) {
    if (this.isActive) {
      if (e > 1) {
        console.log("出现超长帧,屏蔽掉");
      } else {
        this.timer += e;
        if (this.timer >= this.typeCool) {
          this.timer = 0;
          this.currentPos++;
          this.myText && (this.myText.string = this.words.slice(0, this.currentPos));
          this.currentPos >= this.words.length && this.onFinish();
        }
      }
    }
  };
  _ctor.prototype.startEffect = function (e, t) {
    this.myText.node.opacity = 255;
    this.typeCool = t;
    this.words = e;
    this.isActive = true;
  };
  _ctor.prototype.resetWords = function () {
    this.myText.node.opacity = 0;
    this.isActive = false;
    this.currentPos = 0;
    this.myText.string = "";
  };
  _ctor.prototype.onFinish = function () {
    console.log(":onFinish");
    this.isActive = false;
    this.timer = 0;
    this.currentPos = 0;
    this.myText && (this.myText.string = this.words);
  };
  __decorate([_property({
    displayName: "打字时间间隔"
  })], _ctor.prototype, "typeCool", undefined);
  __decorate([_property({
    displayName: "打印文字"
  })], _ctor.prototype, "words", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "myText", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.TypeWriterEffect = exp_TypeWriterEffect;