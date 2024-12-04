var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ICom = require("ICom");
var def_IComDrag = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.hasInit = false;
    t.toolOriginIndex = -1;
    t.rectNode = null;
    t.movedNode = null;
    t.topNode = null;
    t.oriParent = null;
    t.isMoving = false;
    t.overFlow = true;
    t.v = new cc.Vec2();
    t.X = [0, 0];
    t.Y = [0, 0];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.setRectNode = function (e, t, o) {
    this.rectNode = e;
    this.movedNode = t;
    this.topNode = o;
    this.hasInit = true;
    console.log(":初始化完成------->拖动组件");
  };
  _ctor.prototype.startFunc = function (t) {
    e.prototype.startFunc.call(this, t);
    if (this.hasInit) {
      this.oriParent = this.node.parent;
      var o = new cc.Vec2();
      this.node.parent = this.topNode;
      this.node.parent.convertToNodeSpaceAR(o, o);
      this.node.x = o.x;
      this.node.y = o.y;
      console.log("成为顶部节点。。。");
    }
  };
  _ctor.prototype.moveFunc = function (t) {
    e.prototype.moveFunc.call(this, t);
    if (this.hasInit) {
      var o = t.getLocation();
      this.node.x = this.node.parent.convertToNodeSpaceAR(o).x;
      this.node.y = this.node.parent.convertToNodeSpaceAR(o).y;
      console.log("IComDrag正在移动中...");
      var i = 0;
      this.overFlow = true;
      this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.v);
      this.rectNode.convertToNodeSpaceAR(this.v, this.v);
      if (this.v.x - this.X[0] < 30) {
        i = 3;
        console.log("你到了左边");
      } else if (this.X[1] - this.v.x < 30) {
        i = -3;
        console.log("你到了右边");
      } else if (this.v.y - this.Y[0] < 30) {
        console.log("你到了下边");
      } else if (this.Y[1] - this.v.y < 30) {
        console.log("你到了上边");
      } else {
        this.overFlow = false;
      }
      if (this.overFlow) {
        console.log("overFlowwwwwwwww");
        if (!this.isMoving) {
          console.log(":移动吧少年");
          cc.tween(this.movedNode).to(1, {
            x: 200 * i
          }).start();
          this.isMoving = true;
        }
      } else {
        this.isMoving = false;
        cc.Tween.stopAllByTarget(this.movedNode);
        console.log("::停止移动");
      }
    }
  };
  _ctor.prototype.endFunc = function (t) {
    e.prototype.endFunc.call(this, t);
    this.hasInit && (this.node.parent = this.oriParent);
  };
  return _ctor;
}(r_ICom.default);
exports.default = def_IComDrag;