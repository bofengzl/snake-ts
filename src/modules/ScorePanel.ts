/**
 *记分牌
 * @class ScorePanel
 */
 class ScorePanel {
  //score level记录分数、等级
  score = 0;
  level = 1;

  //scoreEle levelEle 分数、等级所在的元素，在构造函数中初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  //设置变量限制等级
  maxLevel: number;
  //设置变量多少分升级
  upScore: number;

  //maxLevel:number = 10、upScore:number = 10 ===> es6写法  不传的值：默认值是10 
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  //设置加分的方法
  addScore() {
    //分数自增
    // this.score++;
    this.scoreEle.innerHTML = ++this.score + '';

    //判断分数是多少 触发升级
    this.score % this.upScore === 0 && this.levelUp();
  }

  //等级提升的方法
  levelUp() {
    this.level < this.maxLevel && (this.levelEle.innerHTML = ++this.level + '');
  }
}

export default ScorePanel;


