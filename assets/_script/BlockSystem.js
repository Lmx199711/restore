Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockSystem = exports._BlockSystem = exports.BlockTrickType = undefined;
(function (e) {
  e[e["通天塔"] = 2001] = "通天塔";
  e[e["兵器铺"] = 2002] = "兵器铺";
  e[e["叮当猫"] = 1001] = "叮当猫";
  e[e["热梗合集"] = 4011] = "热梗合集";
  e[e["钻井"] = 1003] = "钻井";
  e[e["菜刀"] = 1004] = "菜刀";
  e[e["零食满屋"] = 1005] = "零食满屋";
  e[e["人物"] = 1006] = "人物";
  e[e["彩票"] = 1007] = "彩票";
  e[e["秘书"] = 1008] = "秘书";
  e[e["派红包"] = 1100] = "派红包";
  e[e["农场"] = 1101] = "农场";
  e[e["游乐园"] = 1102] = "游乐园";
  e[e["打年兽"] = 1008] = "打年兽";
  e[e["数钱"] = 1009] = "数钱";
  e[e["神秘商店"] = 1010] = "神秘商店";
  e[e["洗脚城"] = 1011] = "洗脚城";
  e[e["套圈"] = 1013] = "套圈";
  e[e["猎场"] = 1012] = "猎场";
  e[e["秘书约会"] = 1501] = "秘书约会";
  e[e["太空冒险"] = 1502] = "太空冒险";
  e[e["俄罗斯轮盘"] = 1503] = "俄罗斯轮盘";
  e[e["寒假作业"] = 1504] = "寒假作业";
  e[e["洗浴中心"] = 1505] = "洗浴中心";
  e[e["双十一"] = 5006] = "双十一";
})(exports.BlockTrickType || (exports.BlockTrickType = {}));
var exp__BlockSystem = function () {
  function _ctor() {
    this.blockTrickMap = {
      1007: true
    };
    this.blockTrickList = [];
    this.isGetAdrate2 = false;
    this.pingbiAll = false;
  }
  _ctor.prototype.isBlock = function (e) {
    return !!this.pingbiAll || !this.isGetAdrate2 || !!this.blockTrickMap[e];
  };
  _ctor.prototype.pbLevelList = function (e, t) {
    for (var o = e.length - 1; o >= 0; o--) {
      t.indexOf(e[o]) > -1 && e.splice(o, 1);
    }
  };
  _ctor.prototype.getPingbiKey = function () {
    console.log("cc.sys.platform=", cc.sys.platform);
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
      return "webpingbiguanka";
    } else {
      return "pingbiguanka";
    }
  };
  _ctor.prototype.init = function () {};
  return _ctor;
}();
exports._BlockSystem = exp__BlockSystem;
exports.BlockSystem = new exp__BlockSystem();