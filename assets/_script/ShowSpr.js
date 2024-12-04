var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadMgr = require("LoadMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ShowSpr = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.sprContainer = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function (e, t, o) {
    return __awaiter(this, undefined, undefined, function () {
      var e;
      var t;
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            o && console.log("............data", o);
            e = o[0];
            t = this.sprContainer;
            return [4, r_LoadMgr.default.loadResImgFuncByLevel("res/" + e)];
          case 1:
            t.spriteFrame = i.sent();
            return [2];
        }
      });
    });
  };
  __decorate([_property({
    displayName: "spr容器",
    type: cc.Sprite
  })], _ctor.prototype, "sprContainer", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ShowSpr;