Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallDownObject = undefined;
var i = function () {
  function e(e, t, o, i) {
    this.inPool = false;
    this.speedX = 0;
    this.speedY = 0;
    this.rotSpeed = 0;
    this.node = e;
    this.speedX = t;
    this.speedY = o;
    this.rotSpeed = i;
  }
  e.prototype.update = function (e) {
    if (!this.inPool) {
      this.node.y -= this.speedY * e;
      this.node.x += this.speedX * e;
      this.node.angle += this.rotSpeed * e;
      this.node.y < -1500 && (this.inPool = true);
    }
  };
  return e;
}();
var exp_FallDownObject = function () {
  function _ctor(e, t, o, i, n, a, s) {
    this.pools = [];
    this.parent = null;
    this.createPos = null;
    this.node = null;
    this.createTime = 0;
    this.parent = e;
    this.createPos = t;
    this.node = o;
    this.intervalTime = i;
    this.speedX = n;
    this.speedY = a;
    this.rotSpeedArea = s;
  }
  _ctor.prototype.update = function (e) {
    this.pools.forEach(function (t) {
      return t.update(e);
    });
    this.createTime += e;
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.stop = function () {};
  _ctor.prototype.create = function () {
    if (!(this.createTime < this.intervalTime)) {
      var t;
      for (var o = 0; o < this.pools.length; o++) {
        if (this.pools[o].inPool) {
          t = this.pools[o];
          break;
        }
      }
      if (!t) {
        var n = cc.instantiate(this.node);
        n.active = true;
        n.parent = this.parent;
        var a = 0;
        if (0 != this.rotSpeedArea.y && 0 != this.rotSpeedArea.x) {
          var s = this.rotSpeedArea.y - this.rotSpeedArea.x;
          a = Math.random() * s + this.rotSpeedArea.x;
        }
        t = new i(n, this.speedX, this.speedY, a);
        this.pools.push(t);
      }
      this.createPos.convertToWorldSpaceAR(cc.Vec2.ZERO, _ctor.tmpV2);
      this.parent.convertToNodeSpaceAR(_ctor.tmpV2, _ctor.tmpV2);
      t.node.x = _ctor.tmpV2.x;
      t.node.y = _ctor.tmpV2.y;
      t.node.angle = 0;
      t.inPool = false;
      this.createTime = 0;
    }
  };
  _ctor.tmpV2 = new cc.Vec2();
  return _ctor;
}();
exports.FallDownObject = exp_FallDownObject;