Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainCfg = undefined;
var r_FunUI = require("FunUI");
var r_MainUI = require("MainUI");
var r_SquareUI = require("SquareUI");
var r_CatchDogUI = require("CatchDogUI");
var r_PhoneUI = require("PhoneUI");
var r_ScrapingCarUI = require("ScrapingCarUI");
var r_TanqiuUI = require("TanqiuUI");
var r_VentureUI = require("VentureUI");
var r_LotteryNewUI = require("LotteryNewUI");
exports.TrainCfg = [{
  id: 0,
  name: "暴富弹球",
  num: [3e5, 4e5],
  isHot: true,
  changeUI: [r_MainUI.MainUI, r_FunUI.FunUI, r_TanqiuUI.default]
}, {
  id: 1,
  name: "抓狗",
  num: [4e5, 5e5],
  isHot: false,
  changeUI: [r_MainUI.MainUI, r_VentureUI.VentureUI, r_CatchDogUI.default]
}, {
  id: 1007,
  name: "刮刮乐",
  num: [2e5, 3e5],
  isHot: false,
  changeUI: [r_MainUI.MainUI, r_SquareUI.SquareUI, r_LotteryNewUI.LotteryNewUI]
}, {
  id: 3,
  name: "专属座驾",
  num: [15e4, 2e5],
  isHot: false,
  changeUI: [r_MainUI.MainUI, r_PhoneUI.PhoneUI, r_ScrapingCarUI.ScrapingCarUI]
}];