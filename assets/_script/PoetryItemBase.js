var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameDataMgr = require("GameDataMgr");
var def_PoetryItemBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isComplete = false;
    t.saindex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e, t, o, i, n) {
    this.matchNode = t;
    this.myStr = e;
    this.url = this.getSoundUrl(o);
    this.completeUrl = this.getSoundUrl(i);
    this.specialInit(n);
  };
  _ctor.prototype.getSoundUrl = function (e) {
    e.startsWith("#") && (e = r_GameDataMgr.default.getSoundDir() + e.slice(1));
    return "sound/" + e;
  };
  _ctor.prototype.playSoundAnim = function (e, t) {
    this.spr = e;
    this.saindex = 0;
    e.fillRange = .27;
    this.schedule(this.schFunc, .5);
    this.scheduleOnce(this.stopSoundAnim, t);
  };
  _ctor.prototype.schFunc = function () {
    this.saindex += 1;
    var e = this.saindex % 3;
    this.spr.fillRange = 0 == e ? .27 : 1 == e ? .61 : 1;
  };
  _ctor.prototype.stopSoundAnim = function () {
    this.spr.fillRange = 1;
    this.unschedule(this.schFunc);
    this.unschedule(this.stopSoundAnim);
  };
  _ctor.prototype.checkIsPipei = function (e) {
    return this.matchNode == e;
  };
  _ctor.prototype.itemClickClear = function (e) {
    _ctor.prevPoetryItem && _ctor.prevPoetryItem.isValid && _ctor.prevPoetryItem.stopSound();
    _ctor.prevPoetryItem = e;
  };
  _ctor.prevPoetryItem = null;
  return _ctor;
}(cc.Component);
exports.default = def_PoetryItemBase;