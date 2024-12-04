var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var def_BattlePro = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.maxValue = 100;
    t.m_maxLength = 680;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.headMe = this.getChild("headMe");
    this.headRival = this.getChild("headRival");
    this.headMe.x = 0;
    this.headRival.x = 0;
  };
  _ctor.prototype.init = function () {
    this.headMe.x = 0;
    this.headRival.x = 0;
    this.setOtherHead(r_PlayerData.PlayerData.data.battleLevel);
  };
  _ctor.prototype.setOtherHead = function (e) {
    this.headRival.url = "ui://Battle/head" + e;
  };
  Object.defineProperty(_ctor.prototype, "selfValue", {
    get: function () {
      return this.m_selfValue;
    },
    set: function (e) {
      this.m_selfValue = e;
      var t = this.m_selfValue / this.maxValue;
      var o = this.m_maxLength * t;
      this.headMe.x = o;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "otherValue", {
    get: function () {
      return this.m_ohterValue;
    },
    set: function (e) {
      this.m_ohterValue = e;
      var t = this.m_ohterValue / this.maxValue;
      var o = this.m_maxLength * t;
      this.headRival.x = o;
    },
    enumerable: false,
    configurable: true
  });
  return _ctor;
}(fgui.GComponent);
exports.default = def_BattlePro;