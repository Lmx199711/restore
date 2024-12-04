Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RussiaSystem = exports._RussiaSystem = undefined;
var r_RussiaCfg = require("RussiaCfg");
var exp__RussiaSystem = function () {
  function _ctor() {
    this.countList = [2, 3, 4, 5, 6];
    this.lastBuffList = null;
    this.gameData = null;
    this.randomList = [];
  }
  _ctor.prototype.init = function () {
    this.gameData = JSON.parse(JSON.stringify(r_RussiaCfg.RussiaCfg));
  };
  _ctor.prototype.initHp = function () {
    this.gameData.hp = 3;
  };
  _ctor.prototype.setRandomList = function (e) {
    this.randomList = this.getRandomList(e);
  };
  _ctor.prototype.getRandomList = function (e) {
    var t = this.countList[e];
    var o = [];
    for (var i = 0; i < this.gameData.bulletHoleNum; i++) {
      o.push(t > i);
    }
    o.sort(function () {
      return Math.random() - .5;
    });
    return o;
  };
  _ctor.prototype.checkBullectCount = function () {
    return 0 == this.randomList.length;
  };
  _ctor.prototype.subHp = function () {
    this.gameData.hp--;
  };
  _ctor.prototype.checkHit = function () {
    return !this.checkBullectCount() && this.randomList.shift();
  };
  _ctor.prototype.checkSubHp = function () {
    return !(this.gameData.hoodCount > 0) && Math.random() < this.gameData.dodge;
  };
  _ctor.prototype.checkHood = function () {
    if (this.gameData.hoodCount > 0) {
      return true;
    }
  };
  _ctor.prototype.checkDodge = function () {
    return Math.random() < this.gameData.dodge;
  };
  _ctor.prototype.getHp = function () {
    return this.gameData.hp;
  };
  _ctor.prototype.checkDie = function () {
    return this.gameData.hp <= 0;
  };
  _ctor.prototype.getBulletHoleNum = function (e) {
    return r_RussiaCfg.RussiaBulletCount[e];
  };
  _ctor.prototype.getRanomBuff = function () {};
  _ctor.prototype.getBuffList = function () {
    var e = this.gameData.buffLevels;
    var t = [];
    e.forEach(function (e, o) {
      e >= 2 || t.push(r_RussiaCfg.RussiaBuffCfg[o][e + 1]);
    });
    t.sort(function () {
      return Math.random() - .5;
    });
    t.length = 2;
    this.lastBuffList = t;
    return t;
  };
  _ctor.prototype.setBuff = function (e) {
    switch (e.id) {
      case 0:
        this.gameData.hoodCount += e.value;
        break;
      case 1:
        this.gameData.dodge += e.value;
        break;
      case 2:
        this.gameData.hp += e.value;
        break;
      case 3:
        this.gameData.bulletHoleNum += e.value;
    }
    this.gameData.buffLevels[e.id]++;
  };
  return _ctor;
}();
exports._RussiaSystem = exp__RussiaSystem;
exports.RussiaSystem = new exp__RussiaSystem();