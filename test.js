 /**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
**/
!function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","0,0,0"),n:n(i,"count",99)}}function o(){a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){r.clearRect(0,0,a,c);var n,e,t,o,m,l;s.forEach(function(i,x){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))}),x(i)}var a,c,u,m=document.createElement("canvas"),d=t(),l="c_n"+d.l,r=m.getContext("2d"),x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,y.x=n.clientX,y.y=n.clientY},window.onmouseout=function(){y.x=null,y.y=null};for(var s=[],f=0;d.n>f;f++){var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})}u=s.concat([y]),setTimeout(function(){i()},100)}();
   
// /**
//  * Created by hustcc on 18/6/23.
//  * Contract: i@hust.cc
//  */

// import { bind, clear } from 'size-sensor';
// import { requestAnimationFrame, cancelAnimationFrame, range, canvasStyle } from './utils';

// export default class CanvasNest {

//   static version = __VERSION__;

//   constructor(el, config) {
//     this.el = el;

//     this.c = {
//       zIndex: -1,           // z-index
//       opacity: 0.5,         // opacity
//       color: '0,0,0',       // color of lines
//       pointColor: '0,0,0',  // color of points
//       count: 99,            // count
//       ...config,
//     };

//     this.canvas = this.newCanvas();
//     this.context = this.canvas.getContext('2d');

//     this.points = this.randomPoints();
//     this.current = {
//       x: null, // 当前鼠标x
//       y: null, // 当前鼠标y
//       max: 20000 // 圈半径的平方
//     };
//     this.all = this.points.concat([this.current]);

//     this.bindEvent();

//     this.requestFrame(this.drawCanvas);
//   }

//   bindEvent() {
//     bind(this.el, () => {
//       this.canvas.width = this.el.clientWidth;
//       this.canvas.height = this.el.clientHeight;
//     });

//     this.onmousemove = window.onmousemove;
//     window.onmousemove = e => {
//       this.current.x = e.clientX - this.el.offsetLeft + document.scrollingElement.scrollLeft; // 当存在横向滚动条时，x坐标再往右移动滚动条拉动的距离
//       this.current.y = e.clientY - this.el.offsetTop + document.scrollingElement.scrollTop; // 当存在纵向滚动条时，y坐标再往下移动滚动条拉动的距离
//       this.onmousemove && this.onmousemove(e);
//     };

//     this.onmouseout = window.onmouseout;
//     window.onmouseout = () => {
//       this.current.x = null;
//       this.current.y = null;
//       this.onmouseout && this.onmouseout();
//     };
//   }

//   randomPoints = () => {
//     return range(this.c.count).map(() => ({
//       x: Math.random() * this.canvas.width,
//       y: Math.random() * this.canvas.height,
//       xa: 2 * Math.random() - 1, // 随机运动返现
//       ya: 2 * Math.random() - 1,
//       max: 6000 // 沾附距离
//     }));
//   };

//   newCanvas() {
//     if (getComputedStyle(this.el).position === 'static') {
//       this.el.style.position = 'relative'
//     }
//     const canvas = document.createElement('canvas'); // 画布
//     canvas.style.cssText = canvasStyle(this.c);

//     canvas.width = this.el.clientWidth;
//     canvas.height = this.el.clientHeight;

//     this.el.appendChild(canvas);
//     return canvas;
//   }

//   requestFrame(func) {
//     this.tid = requestAnimationFrame(() => func.call(this));
//   }

//   drawCanvas() {
//     const context = this.context;
//     const width = this.canvas.width;
//     const height = this.canvas.height;
//     const current = this.current;
//     const points = this.points;
//     const all = this.all;

//     context.clearRect(0, 0, width, height);
//     // 随机的线条和当前位置联合数组
//     let e, i, d, x_dist, y_dist, dist; // 临时节点
//     // 遍历处理每一个点
//     points.forEach((r, idx) => {
//       r.x += r.xa;
//       r.y += r.ya; // 移动
//       r.xa *= r.x > width || r.x < 0 ? -1 : 1;
//       r.ya *= r.y > height || r.y < 0 ? -1 : 1; // 碰到边界，反向反弹
//       context.fillStyle = `rgba(${this.c.pointColor})`;
//       context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); // 绘制一个宽高为1的点
//       // 从下一个点开始
//       for (i = idx + 1; i < all.length; i ++) {
//         e = all[i];
//         // 当前点存在
//         if (null !== e.x && null !== e.y) {
//           x_dist = r.x - e.x; // x轴距离 l
//           y_dist = r.y - e.y; // y轴距离 n
//           dist = x_dist * x_dist + y_dist * y_dist; // 总距离, m

//           dist < e.max && (e === current && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), // 靠近的时候加速
//             d = (e.max - dist) / e.max,
//             context.beginPath(),
//             context.lineWidth = d / 2,
//             context.strokeStyle = `rgba(${this.c.color},${d + 0.2})`,
//             context.moveTo(r.x, r.y),
//             context.lineTo(e.x, e.y),
//             context.stroke());
//         }
//       }
//     });
//     this.requestFrame(this.drawCanvas);
//   }

//   destroy() {
//     // 清除事件
//     clear(this.el);

//     // mouse 事件清除
//     window.onmousemove = this.onmousemove; // 回滚方法
//     window.onmouseout = this.onmouseout;

//     // 删除轮询
//     cancelAnimationFrame(this.tid);

//     // 删除 dom
//     this.canvas.parentNode.removeChild(this.canvas);
//   }
// }

