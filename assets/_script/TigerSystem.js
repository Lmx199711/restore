Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var def_TigerSystem = function () {
  function _ctor(e, t) {
    undefined === t && (t = 100);
    this.m_diNum = 100;
    this.isplaySound = false;
    this.items = e;
    this.num = 0;
    this.m_diNum = t;
  }
  _ctor.prototype.init = function () {
    this.isplaySound = false;
    this.num = 0;
    this.items.forEach(function (e) {
      e.getChild("select").asImage.alpha = 0;
    });
  };
  Object.defineProperty(_ctor.prototype, "num", {
    get: function () {
      return this.m_num;
    },
    set: function (e) {
      this.run();
      this.m_num = Math.round(e);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getResult = function () {
    return this.m_num % this.items.length;
  };
  _ctor.prototype.run = function () {
    if (this.m_lastNum != this.m_num) {
      var e = this.getResult();
      this.isplaySound && r_SoundMgr.SoundMgr.playSound("tiger/ding");
      this.items.forEach(function (t, o) {
        1 == t.getChild("select").asImage.alpha && o != e && cc.tween(t.getChild("select").asImage).to(.3, {
          alpha: 0
        }).start();
      });
      this.m_lastNum = this.m_num;
      this.items[e].getChild("select").asImage.alpha = 1;
    }
  };
  _ctor.prototype.randomPercentFromArray = function (e) {
    var t = 100 * Math.random();
    var o = 0;
    var i = 0;
    for (var n = 0; n < e.length; n++) {
      if (t <= (o += parseFloat(e[n].pr))) {
        i = n;
        break;
      }
    }
    return i + this.m_diNum;
  };
  return _ctor;
}();
exports.default = def_TigerSystem;