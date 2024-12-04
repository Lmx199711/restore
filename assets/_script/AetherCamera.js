var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_AetherCamera = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_pathLis = [];
    t.m_minY = -200;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.camera = this.node.getComponent(cc.Camera);
    this.m_pathLis = [];
  };
  _ctor.prototype.init = function () {
    this.m_pathLis = [];
    this.node.setPosition(0, 0);
    this.camera.zoomRatio = .6;
  };
  _ctor.prototype.setScale = function (e) {
    cc.tween(this.camera).to(.6, {
      zoomRatio: e
    }).start();
    cc.tween(this.node).to(.6, {
      y: this.m_minY
    }).start();
  };
  _ctor.prototype.move = function (e) {
    545 > Math.abs(e.x) && (this.node.x = e.x);
    this.node.y = e.y < this.m_minY ? this.m_minY : e.y;
  };
  _ctor.prototype.endTween = function (e) {
    this.m_endCallBack = e;
    var t = this.m_pathLis.length;
    this.schedule(this.endTimer, 0, t);
  };
  _ctor.prototype.lookAni = function () {
    var e = this.node.y;
    cc.tween(this.node).delay(.5).to(.5, {
      y: e - 250
    }).start();
  };
  _ctor.prototype.endAni = function () {
    this.node.setPosition(0, 0);
  };
  _ctor.prototype.endTimer = function () {
    if (0 == this.m_pathLis.length) {
      this.unschedule(this.endTimer);
      this.m_endCallBack && this.m_endCallBack;
      return void (this.m_endCallBack = null);
    }
    this.move(this.m_pathLis[this.m_pathLis.length - 1]);
    this.m_pathLis.splice(this.m_pathLis.length - 1, 1);
  };
  _ctor.prototype.pushPathList = function (e) {
    this.m_pathLis.push(e);
  };
  Object.defineProperty(_ctor.prototype, "pathList", {
    get: function () {
      return this.m_pathLis;
    },
    enumerable: false,
    configurable: true
  });
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AetherCamera;