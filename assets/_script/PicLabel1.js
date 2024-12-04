var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PicLabel1 = exports.PicAlignType = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
(function (e) {
  e[e["左对齐"] = 0] = "左对齐";
  e[e["居中"] = 1] = "居中";
})(exports.PicAlignType || (exports.PicAlignType = {}));
var exp_PicLabel1 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.prefabMap = {};
    t.wordMapList = {};
    t.curWordList = [];
    t.lastString = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    for (var e = 0; e < this.node.children.length; e++) {
      var t = this.node.children[e];
      t.active = false;
      this.prefabMap[t.name] = t;
      this.wordMapList[t.name] = [];
    }
  };
  _ctor.prototype.getWord = function (e) {
    var t = null;
    var o = this.wordMapList[e];
    if (o.length > 0) {
      t = o.pop();
    } else {
      (t = cc.instantiate(this.prefabMap[e])).active = true;
      t.charString = e;
      this.node.addChild(t);
    }
    t.active = true;
    return t;
  };
  _ctor.prototype.setString = function (e) {
    if (this.lastString != e) {
      this.lastString = e;
      for (var t = 0; t < this.curWordList.length; t++) {
        (n = this.curWordList[t]).active = false;
        this.wordMapList[n.charString].push(n);
      }
      this.curWordList = [];
      var o = 0;
      for (t = 0; t < e.length; t++) {
        o += (n = this.getWord(e[t])).width;
        this.curWordList.push(n);
      }
      var i = -o / 2;
      for (t = 0; t < this.curWordList.length; t++) {
        var n;
        (n = this.curWordList[t]).setPosition(i + n.width / 2, 0, 0);
        i += n.width;
      }
    }
  };
  return __decorate([_ccclass("PicLabel1")], _ctor);
}(cc.Component);
exports.PicLabel1 = exp_PicLabel1;