Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var def_AetherLimitRule = function () {
  function _ctor(e, t) {
    this.m_minDis = 60;
    this.m_node = e;
    this.m_mapBottom = t;
  }
  _ctor.prototype.checkLimit = function (e, t, o) {
    var n = this;
    var a = this.m_node.parent;
    return !(e.x > a.width / 2 - this.m_minDis || e.x < -(a.width / 2 - this.m_minDis) || e.y + this.m_node.height / 2 <= -500 || e.y - this.m_node.height / 2 >= a.height - this.m_minDis || -1 != this.m_mapBottom.children.findIndex(function (e) {
      var a = cc.v2();
      n.m_node.convertToWorldSpaceAR(cc.v2(t - 10, o + 10), a);
      return r_CommonFunc.checkTouchNode(a, e);
    }));
  };
  _ctor.prototype.checkHitDoor = function (e, t) {
    var o = cc.v2();
    this.m_node.convertToWorldSpaceAR(cc.v2(e.x - 10, e.y + 10), o);
    return r_CommonFunc.checkTouchNode(o, t);
  };
  return _ctor;
}();
exports.default = def_AetherLimitRule;