// admin头像点击
// window.addEventListener('load', function () {
//     var admin = document.querySelector('.admin')
//     admin.addEventListener('click', function () {
//         this.children[0].style.display = 'block'
//     })
// })
// 主轮播
// window.addEventListener('load', function () {
//     var wrap = document.querySelector('.wrap');
//     var list1 = document.querySelectorAll('.item1');
//     var pointList = document.querySelector('.pointList');
//     var goPrevBtn = document.querySelector('.prev');
//     var goNextBtn = document.querySelector('.next');
//     var index = 0;
//     //自动生成小圆点
//     for (var i = 0; i < list1.length; i++) {
//         var l = document.createElement('li');
//         var p = pointList.appendChild(l);
//         p.setAttribute('class', 'point');
//     }
//     var points = document.querySelectorAll('.point');
//     for (var i = 0; i < points.length; i++) {
//         points[0].setAttribute('class', 'point active');
//     }

//     // 创建样式函数
//     var getActive = function () {
//         for (var i = 0; i < list1.length; i++) {
//             list1[i].className = 'item1'
//         }
//         for (var i = 0; i < points.length; i++) {
//             points[i].className = 'point'
//         }
//         list1[index].className = 'item1 active'
//         points[index].className = 'point active'
//     }

//     // 上一张
//     var goPrev = function () {
//         if (index > 0) {
//             index--
//         } else {
//             index = list1.length - 1
//         }
//         getActive()
//     }
//     // 下一张
//     var goNext = function () {
//         if (index < list1.length - 1) {
//             index++
//         } else {
//             index = 0
//         }
//         getActive()
//     }
//     goPrevBtn.addEventListener('click', function () {
//         goPrev()
//     })
//     goNextBtn.addEventListener('click', function () {
//         goNext()
//     })
//     for (let i = 0; i < points.length; i++) {
//         points[i].addEventListener('click', function () {
//             // console.log(i);
//             index = i
//             getActive()
//         })
//     }

// 开启定时器
// var timer = setInterval(fn, 5000)

// function fn() {
//     if (index == list1.length - 1) {
//         index = 0
//     } else {
//         index++
//     }
//     getActive()
// }
// 鼠标移入后关闭定时器
// wrap.addEventListener('mouseenter', function () {
//     clearInterval(timer)
//     timer = null;
// })
// // 鼠标移出后重新打开定时器
// wrap.addEventListener('mouseleave', function () {
//     timer = setInterval(fn, 5000)
// })


// 爆款折扣轮播
// window.addEventListener('load', function () {
//     var wrap = document.querySelector('.slide_show1')
//     var goPreBtn = document.querySelector('.goPre')
//     var goNextBtn = document.querySelector('.goNext')
//     var ul = document.querySelector('.slide_group')
//     var li = ul.querySelectorAll('.first')
//     // console.log(ul);
//     // console.log(li.length);
//     var wrapWidth = wrap.offsetWidth;
//     var index = 0;
//     var goPre = function () {
//         if (index > 0) {
//             index--
//         }
//         animate(ul, -index * wrapWidth)
//     }
//     var goNext = function () {
//         if (index < li.length - 1) {
//             index++
//         }
//         animate(ul, -index * wrapWidth)
//     }

//     goNextBtn.addEventListener('click', function () {
//         goNext()

//         console.log(index);
//     })
//     goPreBtn.addEventListener('click', function () {
//         goPre()
//         console.log(index);
//     })
// })
// 秒杀倒计时
// window.addEventListener('load', function () {
//     var hours = document.querySelector('.hours')
//     var minutes = document.querySelector('.minutes')
//     var second = document.querySelector('.second')
//     var inputTime = +new Date('2021-6-3 00:00:00'); //返回输入时间总的毫秒数
//     countDown()
//     //开启定时器
//     setInterval(countDown, 1000)

//     function countDown() {
//         var nowTime = +new Date(); //返回当前时间总的毫秒数
//         var times = (inputTime - nowTime) / 1000 //times就是剩余的时间总的秒数  
//         if (times > 0) {
//             var h = parseInt(times / 60 / 60 % 24); //小时
//             h = h < 10 ? '0' + h : h;
//             hours.innerHTML = h
//             var m = parseInt(times / 60 % 60); //分钟
//             m = m < 10 ? '0' + m : m;
//             minutes.innerHTML = m
//             var s = parseInt(times % 60); //秒
//             s = s < 10 ? '0' + s : s;
//             second.innerHTML = s
//         }
//     }
// })