//引入样式
import './style/index.less'

// import Food from './modules/Food'
// import ScorePanel from './modules/ScorePanel';

// // //测代码  Food
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);


// // //测试代码  ScorePanel

// const sp = new ScorePanel(100,2);
// for (let i = 0; i < 200; i++) {
//   sp.addScore();
// }

import GameControl from './modules/GameControl'

const gc = new GameControl();

// setInterval(()=>{
//    console.log(gc.diretion);
// },1000)
