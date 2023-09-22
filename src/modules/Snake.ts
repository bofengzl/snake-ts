/**
 *蛇类
 * @class Snake
 */
class Snake {
  //定义蛇头的元素
  snake_head: HTMLElement;
  //蛇的身体（包括舌头）
  snake_bodies: HTMLCollection;
  //获取蛇的容器
  snake_element: HTMLElement;

  constructor() {
    this.snake_element = document.getElementById('snake')!;
    this.snake_head = <HTMLElement>document.querySelector('#snake > div');
    this.snake_bodies = this.snake_element.getElementsByTagName('div');
  }

  //获取蛇坐标（蛇头的坐标）
  get X() {
    return this.snake_head.offsetLeft;
  }
  //获取蛇Y坐标
  get Y() {
    return this.snake_head.offsetTop;
  }

  //设置蛇头的坐标
  set X(value: number) {
    //若新值和旧值一样就不需要更改
    if (this.X == value) {
      return
    }
    //判断是否撞墙 其实就是X的值的合法范围0-290
    if (value < 0 || value > 290) {
      //蛇撞墙到了 抛出异常
      throw new Error('蛇撞墙了！')
    }

    //修改x时也就是修改水平坐标，左右移动，向左移动则不能向右移动 反之亦然
    if (this.snake_bodies[1] && (this.snake_bodies[1] as HTMLElement).offsetLeft === value) {
      //水平方向发生掉头，让蛇向反方向继续移动
      if (value > this.X) {
        //如果新值大于旧值，则此时蛇向右走，此时发生掉头应该继续向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    //移动身体
    this.moveBody();

    this.snake_head.style.left = value + 'px';

    //检查有没有撞到自己
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y == value) {
      return
    }
    if (value < 0 || value > 290) {
      //蛇撞墙到了 抛出异常
      throw new Error('蛇撞墙了！')
    }

    //修改x时也就是修改纵轴坐标 上下移动，向上移动则不能向下移动 反之亦然
    if (this.snake_bodies[1] && (this.snake_bodies[1] as HTMLElement).offsetTop === value) {
      //水平方向发生掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        //如果新值大于旧值，则此时蛇向右走，此时发生掉头应该继续向左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    //移动身体
    this.moveBody();

    this.snake_head.style.top = value + 'px';

    //检查有没有撞到自己
    this.checkHeadBody();
  }

  //蛇增加身体的方法
  addSnakeBody() {
    //向element中添加一个div
    this.snake_element.insertAdjacentHTML('beforeend', '<div></div>');

  }

  //添加蛇身体移动
  moveBody() {
    /**
     * 将后面身体的位置设置成前边身体的位置
     *      - 
     *        第四节 = 第三节
     *        第三节 = 第二节
     *        第二节 = 第一节
     */

    //遍历获取所有身体
    for (let i = this.snake_bodies.length - 1; i > 0; i--) {
      //获取前边身体的位置
      let X = (this.snake_bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.snake_bodies[i - 1] as HTMLElement).offsetTop;

      //将值设置成当前的身体
      (this.snake_bodies[i] as HTMLElement).style.left = X + 'px';
      (this.snake_bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  //检查头与身体是否相撞
  checkHeadBody() {
    //获取所有身体,检查是否和蛇头坐标重复
    for (let i = 1; i < this.snake_bodies.length; i++) {
      let bd = this.snake_bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        //进入蛇头撞到自己身体
        throw new Error("蛇头撞到自己身体了！")
      }
    }
  }
}

export default Snake;