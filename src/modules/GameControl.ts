/**
 *游戏控制器，控制其他所有类
 *
 * @class GameControl
 */

import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./snake";
class GameControl {
  //定义三个属性
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 记分牌
  scorelPanel: ScorePanel;

  //存储蛇移动的方向（也就是移动的方向）
  diretion: string = '';

  //创建一个属性来记录游戏是否over
  isOver = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorelPanel = new ScorePanel(10,2);
    this.init();
  }
  //游戏初始化方法,调用后游戏即将开始
  init() {
    //绑定键盘按键event
    //bind(this) 改变this的指向 否则 this ==> document的
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    // 调用run方法使得蛇移动
    this.run();
  }

  //键盘按下响应event
  keyDownHandler(event: KeyboardEvent) {
    /**
     * console.log(event.key);
     * event.key => 键盘按键所代表的代号
     * 上 => ArrowUp
     * 下 => ArrowDown
     * 左 => ArrowLeft
     * 右 => ArrowRight
     * 
     * IE浏览器中
     * 上 => Up
     * 下 => Down
     * 左 => Left
     * 右 => Right 
     */
    // 检查event.key 的值是否合法（用户是否按了正确的键）

    this.diretion = event.key;

  }

  //控制蛇移动的方法
  run() {
    /**
     * 根据蛇的 diretion 方向，使得蛇的位置发生改变
     * 向上 top 减少
     * 向下 top 增加
     * 向左 left 减少
     * 向右 left 增加
     */

    //获取蛇的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    //根据按键方向去修改X/Y的值
    switch (this.diretion) {
      case 'ArrowUp':
      case 'Up':
        // 向上移动
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        // 向下移动
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        //向左移动
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        //向右移动
        X += 10;
        break;
    }

    //检查蛇是否吃到食物
    this.checkEat(X,Y);

    //修改X/Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      //进入catch，说明出现了异常，游戏结束，弹出提示框信息
      alert((e as Error).message + 'GAME OVER！')
      this.isOver = false;
    }

    //开启一个定时器
    this.isOver && setTimeout(this.run.bind(this), 300 - (this.scorelPanel.level - 1) * 30);

  }

  //检查蛇是否吃到食物 方法
  checkEat(X:number,Y:number){
    if(X === this.food.X && Y === this.food.Y){
      //吃到食物改变食物位置
      this.food.change();
      //分数增加
      this.scorelPanel.addScore();
      //蛇增加一节
      this.snake.addSnakeBody();
    }
  }
}

export default GameControl;