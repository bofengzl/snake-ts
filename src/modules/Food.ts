/**
 *食物类
 * @class Food
 */
class Food {
  //定义属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    //获取页面中的元素并将其赋值给element元素  ! ==> 表示一定可以获取到值
    this.element = document.getElementById('food')!;
  }

  //获取食物x坐标轴的方法
  get X() {
    return this.element.offsetLeft;
  }

  //获取食物y坐标轴的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置的方法
  change() {
    //生成随机位置
    //食物位置最小0,最大290
    //蛇移动一次一个的大小就是10，所以食物的坐标必须是10的倍数
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;



