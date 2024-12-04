Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FguiGestureSys = exports._FguiGestureSys = undefined;
var exp__FguiGestureSys = function () {
  function _ctor() {
    this.m_eventMap = {};
  }
  _ctor.prototype.bindMoveEvent = function (e, t, o, i, n, a, s) {
    undefined === s && (s = false);
    console.log(e);
    !o && (o = t);
    t.on(fgui.Event.TOUCH_BEGIN, this.touchBegin.bind(this, e), this);
    t.on(fgui.Event.TOUCH_MOVE, this.touchMove.bind(this, e), this);
    t.on(fgui.Event.TOUCH_END, this.touchEnd.bind(this, e), this);
    this.m_eventMap[e] = {};
    this.m_eventMap[e].id = e;
    this.m_eventMap[e].com = t;
    this.m_eventMap[e].moveCom = o;
    this.m_eventMap[e].target = i;
    this.m_eventMap[e].initPos = cc.v2(o.x, o.y);
    this.m_eventMap[e].moveInitPos = cc.v2();
    this.m_eventMap[e].enable = true;
    this.m_eventMap[e].events = [fgui.Event.TOUCH_BEGIN, fgui.Event.TOUCH_MOVE, fgui.Event.TOUCH_END];
    this.m_eventMap[e].hitSucc = n;
    this.m_eventMap[e].hitFail = a;
    this.m_eventMap[e].isOnce = s;
  };
  _ctor.prototype.enableBiyId = function (e, t) {
    this.m_eventMap[e].enable = t;
  };
  _ctor.prototype.restart = function (e) {
    if (this.m_eventMap[e]) {
      this.m_eventMap[e].com.x = this.m_eventMap[e].initPos.x;
      this.m_eventMap[e].com.y = this.m_eventMap[e].initPos.y;
      this.m_eventMap[e].moveCom.x = this.m_eventMap[e].initPos.x;
      this.m_eventMap[e].moveCom.y = this.m_eventMap[e].initPos.y;
    }
  };
  _ctor.prototype.offEevent = function (e) {
    if (this.m_eventMap[e]) {
      var t = this.m_eventMap[e].com;
      if (t) {
        this.m_eventMap[e].events.forEach(function (e) {
          t.off(e);
        });
        delete this.m_eventMap[e];
      }
    }
  };
  _ctor.prototype.touchBegin = function (e, t) {
    var o = this.m_eventMap[e];
    if (o.enable) {
      t.captureTouch();
      o.moveInitPos = t.pos.clone();
    }
  };
  _ctor.prototype.touchMove = function (e, t) {
    var o = this.m_eventMap[e];
    if (o.enable) {
      var i = o.moveCom;
      var n = t.pos.sub(o.moveInitPos);
      i.x = o.initPos.x + n.x;
      i.y = o.initPos.y + n.y;
    }
  };
  _ctor.prototype.touchEnd = function (e) {
    var t = this.m_eventMap[e];
    if (t.enable) {
      var o = t.target;
      var i = t.moveCom;
      var n = o.x - o.pivotX * o.width;
      var a = o.y - o.pivotY * o.height;
      var s = i.x - i.pivotX * i.width;
      var r = i.y - i.pivotY * i.height;
      var c = new cc.Rect(n, a, o.width, o.height);
      var l = new cc.Rect(s, r, i.width, i.height);
      if (o) {
        if (c.intersects(l)) {
          t.hitSucc && t.hitSucc();
          if (t.isOnce) {
            this.offEevent(e);
            delete this.m_eventMap[e];
          }
        } else {
          var u = false;
          t.hitfail && t.hitfail();
          for (var h in this.m_eventMap) if (this.m_eventMap[h].moveCom == i && e != h) {
            var p = this.m_eventMap[h].target;
            var d = this.m_eventMap[h].moveCom;
            var y = p.x - p.pivotX * p.width;
            var f = p.y - p.pivotY * p.height;
            var m = d.x - d.pivotX * d.width;
            var g = d.y - d.pivotY * d.height;
            var v = new cc.Rect(y, f, p.width, p.height);
            var C = new cc.Rect(m, g, d.width, d.height);
            v.intersects(C) && (u = true);
          }
          if (!u) {
            i.x = t.initPos.x;
            i.y = t.initPos.y;
          }
          t.moveInitPos = cc.Vec2.ZERO;
        }
      }
    }
  };
  _ctor.HIDE_TAGET = "HIDE_TAGET";
  return _ctor;
}();
exports._FguiGestureSys = exp__FguiGestureSys;
exports.FguiGestureSys = new exp__FguiGestureSys();