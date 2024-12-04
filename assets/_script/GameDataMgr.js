Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadMgr = require("LoadMgr");
var def_GameDataMgr = function () {
  function _ctor() {}
  _ctor.initDevice = function () {
    this.realFrameSize.width = cc.view.getCanvasSize().width / cc.view.getScaleX();
    this.realFrameSize.height = cc.view.getCanvasSize().height / cc.view.getScaleX();
  };
  _ctor.getSoundDir = function () {
    return "lv" + String(r_LoadMgr.default.currLv).padStart(_ctor.lvLength, "0") + "/";
  };
  _ctor.getCurrDate = function () {
    var e = new Date();
    return String(e.getFullYear()) + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0");
  };
  _ctor.updateDay = function () {};
  _ctor.startNewLvTiming = function () {
    this.playTotalTime = 0;
    this.prevDataTime = 0;
    this.startTiming();
  };
  _ctor.startTiming = function () {
    console.log("----------开始计时");
    this.prevDataTime = new Date().getTime();
  };
  _ctor.endTiming = function () {
    console.log("----------关闭计时");
    var e = new Date().getTime() - this.prevDataTime;
    var t = Math.floor(e / 1e3);
    this.playTotalTime += t;
    this.prevDataTime = -1;
  };
  _ctor.endTimeReport = function () {
    this.prevDataTime >= 0 && this.endTiming();
    console.log("上报时间:", r_LoadMgr.default.currLv, this.playTotalTime);
  };
  _ctor.webCopyString = function () {};
  _ctor.lvLength = 4;
  _ctor.realFrameSize = cc.size(750, 1334);
  _ctor.playTotalTime = 0;
  _ctor.prevDataTime = 0;
  return _ctor;
}();
exports.default = def_GameDataMgr;