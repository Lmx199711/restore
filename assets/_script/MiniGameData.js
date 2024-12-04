Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniGameData = undefined;
var r_HelpGrandResultUI = require("HelpGrandResultUI");
exports.MiniGameData = {
  见网友: {
    bundle: "wenzi1",
    path: "prefab/见网友",
    successData: "见网友成功",
    successTitle: "恭喜你帮助宅男完成网恋奔现",
    successUI: r_HelpGrandResultUI.HelpGrandResultUI
  },
  白月光: {
    bundle: "wenzi1",
    path: "prefab/白月光",
    successData: "白月光成功",
    successTitle: "恭喜你帮助宅男完成白月光",
    successUI: r_HelpGrandResultUI.HelpGrandResultUI,
    failUI: r_HelpGrandResultUI.HelpGrandResultUI,
    failTitle: "很遗憾，你没有帮助宅男完成白月光",
    failData: "白月光失败"
  },
  新年氛围: {
    bundle: "wenzi1",
    path: "prefab/新年氛围",
    successData: "新年氛围",
    successTitle: "新年氛围",
    successUI: r_HelpGrandResultUI.HelpGrandResultUI
  }
};