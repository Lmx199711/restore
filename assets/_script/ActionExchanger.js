Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadMgr = require("LoadMgr");
var def_ActionExchanger = function () {
  function _ctor() {}
  _ctor.getLevelInfo = function (e) {
    return __awaiter(this, undefined, Promise, function () {
      var t;
      var o;
      var i;
      return __generator(this, function (n) {
        switch (n.label) {
          case 0:
            if (this.curLevel === e) {
              return [3, 2];
            } else {
              t = e.toString().padStart(4, "0");
              o = "Json/ActionIns/lv" + t;
              i = this;
              return [4, r_LoadMgr.default.loadJsonFunc(o)];
            }
          case 1:
            i.data = n.sent();
            if (!this.data) {
              cc.log("reject了,");
              return [2, null];
            }
            this.curLevel = e;
            n.label = 2;
          case 2:
            return [2, this.data];
        }
      });
    });
  };
  _ctor.data = null;
  _ctor.curLevel = 0;
  return _ctor;
}();
exports.default = def_ActionExchanger;