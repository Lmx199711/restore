var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_HomeWayUI = require("HomeWayUI");
var r_SoundMgr = require("SoundMgr");
var r_HomeWayRewardTipUI = require("HomeWayRewardTipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HomeWayCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.VoiceList = [[{
      sex: 1,
      txt: "家里终于有光了",
      sound: "homeWay/爷爷_灯"
    }, {
      sex: 0,
      txt: "好漂亮的灯呀",
      sound: "homeWay/奶奶_灯"
    }], [{
      sex: 0,
      txt: "墙壁也变好看了呢",
      sound: "homeWay/奶奶_墙壁"
    }, {
      sex: 1,
      txt: "家里还能这样装扮呀",
      sound: "homeWay/爷爷_墙壁"
    }], [{
      sex: 1,
      txt: "以后不用担心绊倒你奶奶了",
      sound: "homeWay/爷爷_地板"
    }, {
      sex: 0,
      txt: "看起来就很贵的样子",
      sound: "homeWay/奶奶_地板"
    }], [{
      sex: 0,
      txt: "冬天也不会冷了",
      sound: "homeWay/奶奶_火堆"
    }, {
      sex: 1,
      txt: "不愧是城里的高科技",
      sound: "homeWay/爷爷_火堆"
    }], [{
      sex: 1,
      txt: "第一次坐这么好的凳子",
      sound: "homeWay/爷爷_凳子"
    }, {
      sex: 0,
      txt: "坐这凳子,你爷爷的腰都不疼了",
      sound: "homeWay/奶奶_凳子"
    }], [{
      sex: 0,
      txt: "晚上可以睡个好觉了",
      sound: "homeWay/奶奶_窗户",
      func: function () {
        t.node.children[0].getChildByName("雪").active = false;
      }
    }, {
      sex: 1,
      txt: "没想到窗外的风景这么好",
      sound: "homeWay/爷爷_窗户"
    }], [{
      sex: 0,
      txt: "这床睡得好舒服",
      sound: "homeWay/奶奶_床"
    }, {
      sex: 1,
      txt: "这床我怕我给它睡脏了",
      sound: "homeWay/爷爷_床"
    }], [{
      sex: 1,
      txt: "竟然有这么好的饭菜",
      sound: "homeWay/爷爷_桌子"
    }, {
      sex: 0,
      txt: "老头子多吃点,补补身体",
      sound: "homeWay/奶奶_桌子"
    }], [{
      sex: 0,
      txt: "家里没钱,旺财都饿坏了",
      sound: "homeWay/奶奶_猪"
    }, {
      sex: 1,
      txt: "旺财都没想到自己可以这么强壮",
      sound: "homeWay/爷爷_猪"
    }], [{
      sex: 1,
      txt: "以后不用怕小偷了",
      sound: "homeWay/爷爷_门"
    }, {
      sex: 0,
      txt: "这个大铁门看着很安全",
      sound: "homeWay/奶奶_门"
    }], [{
      sex: 0,
      txt: "低保户了一辈子,今天终于摘了",
      sound: "homeWay/奶奶_门牌"
    }, {
      sex: 1,
      txt: "这是之前想都不敢想的事情",
      sound: "homeWay/爷爷_门牌"
    }], [{
      sex: 1,
      txt: "家里终于不下雨了",
      sound: "homeWay/爷爷_天花板"
    }, {
      sex: 0,
      txt: "天花板都这么精致",
      sound: "homeWay/奶奶_天花板"
    }], [{
      sex: 0,
      txt: "长这么大还没看过电视呢",
      sound: "homeWay/奶奶_收音机"
    }, {
      sex: 1,
      txt: "好神奇的物品",
      sound: "homeWay/爷爷_收音机"
    }], [{
      sex: 0,
      txt: "孩子,你赚钱不容易，还是自己留着吧",
      sound: "homeWay/奶奶_衣服_0"
    }, {
      sex: 0,
      txt: "这身衣服好暖和呀",
      sound: "homeWay/奶奶_衣服_1"
    }, {
      sex: 0,
      txt: "这衣服就像裹了一层被子",
      sound: "homeWay/奶奶_衣服_2"
    }], [{
      sex: 1,
      txt: "爷爷还有钱，你放心哈",
      sound: "homeWay/爷爷_衣服_0"
    }, {
      sex: 1,
      txt: "这短袖穿了这么多年，都有感情了",
      sound: "homeWay/爷爷_衣服_1"
    }, {
      sex: 1,
      txt: "穿着这衣服下地干活都不冷了",
      sound: "homeWay/爷爷_衣服_2"
    }]];
    t.money = null;
    t.light = null;
    t.wall = null;
    t.floor = null;
    t.fire = null;
    t.chair = null;
    t.window = null;
    t.bed = null;
    t.table = null;
    t.pig = null;
    t.door = null;
    t.sign = null;
    t.ceiling = null;
    t.radio = null;
    t.grandma = null;
    t.grandpa = null;
    t.grandpaVoice = null;
    t.grandmaVoice = null;
    t.wordList = [];
    t.VoiceMap = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.init();
  };
  _ctor.prototype.init = function () {
    this.initHome();
    this.initMoney();
    this.grandmaVoice.opacity = 0;
    this.grandpaVoice.opacity = 0;
    this.randomShowVoiceBubble();
    r_PlayerData.PlayerData.data.homeWayMap.score != this.wordList.length || r_PlayerData.PlayerData.data.homeWayMap.reward || setTimeout(function () {
      r_HomeWayRewardTipUI.default.showUI();
    }, 100);
  };
  _ctor.prototype.initHome = function () {
    var e = this;
    this.wordList = [this.light, this.wall, this.floor, this.fire, this.chair, this.window, this.bed, this.table, this.pig, this.door, this.sign, this.ceiling, this.radio, this.grandma, this.grandpa];
    this.wordList.forEach(function (t, o) {
      r_PlayerData.PlayerData.data.homeWayMap[t.name] || (r_PlayerData.PlayerData.data.homeWayMap[t.name] = 0);
      t.children.forEach(function (e, o) {
        e.active = o == r_PlayerData.PlayerData.data.homeWayMap[t.name];
      });
      "窗户" == t.name && r_PlayerData.PlayerData.data.homeWayMap[t.name] > 0 && (e.node.children[0].getChildByName("雪").active = false);
      o < e.VoiceList.length && (e.VoiceMap[t.name] = e.VoiceList[o]);
    });
  };
  _ctor.prototype.initMoney = function () {
    this.money.active = r_PlayerData.PlayerData.isCoinEnough(2e6);
    this.money.off(cc.Node.EventType.TOUCH_START);
    this.money.off(cc.Node.EventType.TOUCH_MOVE);
    this.money.off(cc.Node.EventType.TOUCH_END);
    this.money.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.money.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.money.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.startPos = e.getLocation();
    this.itemPos = this.money.getPosition();
    this.initMoneyPos || (this.initMoneyPos = this.itemPos);
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation().sub(this.startPos);
    this.money.setPosition(this.itemPos.add(t));
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.money.setPosition(this.initMoneyPos);
    var t = function (t) {
      var i = o.wordList[t];
      if (r_UtilsSystem.UtilsSystem.touchInNode(i, e.getLocation()) && r_PlayerData.PlayerData.data.homeWayMap[i.name] < i.children.length - 1) {
        o.showVoiceBubble(t, r_PlayerData.PlayerData.data.homeWayMap[i.name]);
        ("爷爷" != i.name && "奶奶" != i.name || 0 != r_PlayerData.PlayerData.data.homeWayMap[i.name]) && o.checkMoney();
        r_PlayerData.PlayerData.data.homeWayMap[i.name] = r_PlayerData.PlayerData.data.homeWayMap[i.name] + 1;
        o.checkScore(i);
        i.children.forEach(function (e, t) {
          e.active = t == r_PlayerData.PlayerData.data.homeWayMap[i.name];
        });
        r_SoundMgr.SoundMgr.playSound("homeWay/物品飞上去");
        r_PlayerData.PlayerData.saveData();
        return "break";
      }
    };
    var o = this;
    for (var i = this.wordList.length - 1; i >= 0 && "break" !== t(i); i--) {
      ;
    }
  };
  _ctor.prototype.checkMoney = function () {
    r_PlayerData.PlayerData.deleteCoin("回家之路", 2e6);
    r_HomeWayUI.HomeWayUI.Inst.checkShowVideoBtn();
    this.money.active = r_PlayerData.PlayerData.isCoinEnough(2e6);
  };
  _ctor.prototype.checkScore = function (e) {
    if (r_PlayerData.PlayerData.data.homeWayMap[e.name] == e.children.length - 1) {
      r_PlayerData.PlayerData.data.homeWayMap.score || (r_PlayerData.PlayerData.data.homeWayMap.score = 0);
      r_PlayerData.PlayerData.data.homeWayMap.score++;
      console.log("score", r_PlayerData.PlayerData.data.homeWayMap.score);
      r_PlayerData.PlayerData.data.homeWayMap.score != this.wordList.length || r_PlayerData.PlayerData.data.homeWayMap.reward || r_HomeWayRewardTipUI.default.showUI();
    }
  };
  _ctor.prototype.showVoiceBubble = function (e, t) {
    var o = this.VoiceList[e][t];
    if (o) {
      var i = 0 == o.sex ? this.grandmaVoice : this.grandpaVoice;
      o.func && o.func();
      if (o.sound) {
        this.oldSound && r_SoundMgr.SoundMgr.stopSound(this.oldSound);
        this.oldSound = o.sound;
        r_SoundMgr.SoundMgr.playSound(o.sound);
      }
      this.playBubble(i, o.txt);
    }
  };
  _ctor.prototype.playBubble = function (e, t) {
    var o = e.getChildByName("label").getComponent(cc.Label);
    o.string = "";
    var i = 0;
    var n = t.length;
    var a = function () {
      if (!(i >= n)) {
        o.string += t[i];
        i++;
        setTimeout(a, Math.min(2e3 / n, 100));
      }
    };
    a();
    cc.Tween.stopAllByTarget(e);
    cc.tween(e).to(.5, {
      opacity: 255
    }).delay(2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.randomShowVoiceBubble = function () {
    if (Math.random() < .5) {
      this.playBubble(this.grandmaVoice, "孙子回来了呀，奶奶好想你呀");
      r_SoundMgr.SoundMgr.playSound("homeWay/奶奶_回家");
    } else {
      this.playBubble(this.grandpaVoice, "我的好孙子回家咯~");
      r_SoundMgr.SoundMgr.playSound("homeWay/爷爷_回家");
    }
  };
  __decorate([_property({
    displayName: "钱",
    type: cc.Node
  })], _ctor.prototype, "money", undefined);
  __decorate([_property({
    displayName: "白炽灯",
    type: cc.Node
  })], _ctor.prototype, "light", undefined);
  __decorate([_property({
    displayName: "脏墙壁",
    type: cc.Node
  })], _ctor.prototype, "wall", undefined);
  __decorate([_property({
    displayName: "坑洼地板",
    type: cc.Node
  })], _ctor.prototype, "floor", undefined);
  __decorate([_property({
    displayName: "火堆",
    type: cc.Node
  })], _ctor.prototype, "fire", undefined);
  __decorate([_property({
    displayName: "小板凳",
    type: cc.Node
  })], _ctor.prototype, "chair", undefined);
  __decorate([_property({
    displayName: "破窗",
    type: cc.Node
  })], _ctor.prototype, "window", undefined);
  __decorate([_property({
    displayName: "破床",
    type: cc.Node
  })], _ctor.prototype, "bed", undefined);
  __decorate([_property({
    displayName: "小桌子",
    type: cc.Node
  })], _ctor.prototype, "table", undefined);
  __decorate([_property({
    displayName: "瘦猪",
    type: cc.Node
  })], _ctor.prototype, "pig", undefined);
  __decorate([_property({
    displayName: "旧门",
    type: cc.Node
  })], _ctor.prototype, "door", undefined);
  __decorate([_property({
    displayName: "低保户牌子",
    type: cc.Node
  })], _ctor.prototype, "sign", undefined);
  __decorate([_property({
    displayName: "天花板滴水",
    type: cc.Node
  })], _ctor.prototype, "ceiling", undefined);
  __decorate([_property({
    displayName: "收音机",
    type: cc.Node
  })], _ctor.prototype, "radio", undefined);
  __decorate([_property({
    displayName: "奶奶破长袖",
    type: cc.Node
  })], _ctor.prototype, "grandma", undefined);
  __decorate([_property({
    displayName: "爷爷破背心",
    type: cc.Node
  })], _ctor.prototype, "grandpa", undefined);
  __decorate([_property({
    displayName: "爷爷语音框",
    type: cc.Node
  })], _ctor.prototype, "grandpaVoice", undefined);
  __decorate([_property({
    displayName: "奶奶语音框",
    type: cc.Node
  })], _ctor.prototype, "grandmaVoice", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_HomeWayCom;