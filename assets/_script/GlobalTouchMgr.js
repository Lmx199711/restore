Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameDataMgr = require("GameDataMgr");
var r_LoadMgr = require("LoadMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_GlobalTouchMgr = function () {
  function _ctor() {}
  _ctor.init = function () {
    if (cc.director.getScene().getChildByName("特效点击触摸层")) {
      console.log("已有触摸层不反复添加");
    } else {
      var e = new cc.Node();
      this.effectLayer = e;
      e.name = "特效点击触摸层";
      e.width = 3e3;
      e.height = 3e3;
      e.parent = cc.director.getScene();
      e.zIndex = cc.macro.MAX_ZINDEX;
      var t = r_GameDataMgr.default.realFrameSize.width;
      var o = r_GameDataMgr.default.realFrameSize.height;
      e.x = t / 2;
      e.y = o / 2;
      this.block = e.addComponent(cc.BlockInputEvents);
      this.block.enabled = false;
    }
  };
  _ctor.effectTouchStart = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o;
      var i;
      var n;
      var s;
      return __generator(this, function (a) {
        switch (a.label) {
          case 0:
            t = e.target;
            o = e.getLocation();
            i = t.convertToNodeSpaceAR(o);
            return [4, r_LoadMgr.default.loadPrefabFunc("Effect/dianji")];
          case 1:
            n = a.sent();
            (s = cc.instantiate(n)).parent = this.effectLayer;
            s.x = i.x;
            s.y = i.y;
            return [2];
        }
      });
    });
  };
  _ctor.startBlockEvent = function () {
    this.block && (this.block.enabled = true);
  };
  _ctor.closeBlockEvent = function () {
    this.block && (this.block.enabled = false);
    this.blockCount = 0;
  };
  _ctor.addBlockCount = function () {
    this.blockCount++;
    this.blockCount > 0 && this.startBlockEvent();
  };
  _ctor.subBlockCount = function () {
    this.blockCount--;
    this.blockCount <= 0 && this.closeBlockEvent();
  };
  _ctor.blockCount = 0;
  return __decorate([_ccclass], _ctor);
}();
exports.default = def_GlobalTouchMgr;