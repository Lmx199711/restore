var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_FunUI = require("FunUI");
var r_JobUI = require("JobUI");
var r_SquareUI = require("SquareUI");
var r_SoundMgr = require("SoundMgr");
var r_PhoneMakeUI2 = require("PhoneMakeUI2");
var r_RelaxSystem = require("RelaxSystem");
var r_City85UI = require("City85UI");
var r_EntryUI = require("EntryUI");
var r_GodWealthUI = require("GodWealthUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_MainUICom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.red = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.red.opacity = 0;
    cc.tween(this.red).repeatForever(cc.tween().to(.3, {
      opacity: 255
    }).delay(2).to(.3, {
      opacity: 0
    })).start();
  };
  _ctor.prototype.update = function () {
    this.red.active = null != r_RelaxSystem.RelaxSystem.getRelaxTaskId();
  };
  _ctor.prototype.onClickCenter = function () {
    console.log("点击中心广场");
    r_SoundMgr.SoundMgr.playSound("click");
    r_SquareUI.SquareUI.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
      stage: "中心广场"
    });
  };
  _ctor.prototype.onClickDianzichang = function () {
    console.log("点击电子厂");
    r_SoundMgr.SoundMgr.playSound("click");
    r_PhoneMakeUI2.PhoneMakeUI2.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
      stage: "电子厂"
    });
  };
  _ctor.prototype.onClickYule = function () {
    console.log("点击娱乐中心");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_FunUI.FunUI.showUI();
      r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
        stage: "娱乐大厅"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickRencai = function () {
    console.log("点击人才市场");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_JobUI.JobUI.showUI();
      r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
        stage: "人才市场"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickBaihuo = function () {
    console.log("点击百货大楼");
    r_SoundMgr.SoundMgr.playSound("click");
    r_EntryUI.default.showUI(0);
  };
  _ctor.prototype.onClickCity = function () {
    console.log("点击城市");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_City85UI.default.showUI();
      r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
        stage: "85同城"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickFengtou = function () {
    console.log("点击风投大厦");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_EntryUI.default.showUI(1);
      r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
        stage: "风头大厦"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickHouseMarket = function () {
    console.log("点击售楼部");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_EntryUI.default.showUI(0);
      r_PlatformSystem.PlatformSystem.report("Play_click_Level1", {
        stage: "售楼部"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickGod = function () {
    console.log("点击售楼部");
    r_SoundMgr.SoundMgr.playSound("click");
    if ("0" != r_PlatformSystem.PlatformSystem.jjs) {
      r_GodWealthUI.default.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "red", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MainUICom;