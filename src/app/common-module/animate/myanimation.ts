import {
    trigger,  // 动画封装触发，外部的触发器
    state, // 转场状态控制
    style, // 用来书写基本的样式
    transition, // 用来实现css3的 transition
    animate, // 用来实现css3的animations
    keyframes // 用来实现css3 keyframes的
  } from "@angular/animations";

export const changeBakcground = trigger('changeBg',[
    state('leave', style({opacity: 0, })),
    // 定义另外一个状态right
    state('enter', style({ opacity: 1, })),

    transition('leave=>enter', [ // 进场动画
    animate(200, keyframes([
            style({opacity: 0, }),
            style({opacity: 0.5, }),
            style({opacity: 1, })
        ]))
    ]),
    transition('enter=>leave', [ // 离场动画
    animate(200, keyframes([
            style({opacity: 1, }),
            style({opacity: 0.5, }),
            style({opacity: 0, })
        ]))
    ])
])