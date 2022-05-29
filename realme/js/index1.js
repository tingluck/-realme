// 主页轮播图
let li = $('.slide_list li');
// console.log(li);
let liObj = $('.pointList li');
// console.log(liObj);
var lastIndex = 0;
var index = 0;
liObj.forEach((k, v) => {
    // console.log(k);
    k.onclick = () => {
        lastIndex = index;
        index = v;
        fn();
    }
});
// 给箭头绑定
const goNext = document.querySelector('.prev');
goNext.onclick = function () {
    lastIndex = index;
    index++;
    if (index > li.length - 1) index = 0;
    fn()
}
const goPrev = document.querySelector('.next');
goPrev.onclick = function () {
    lastIndex = index;
    index--;
    if (index < 0) index = li.length - 1;
    fn();
}

// 设置计时器，让图片自动播放
var time = '';
function fn1() {
    times = setInterval(function () {
        goNext.onclick();
    }, 3000)
}
fn1()
const div1 = document.querySelector('.wrap');
div1.onmouseenter = function () {
    clearInterval(times);
}
div1.onmouseleave = function () {
    fn1();
}

function fn() {
    li[lastIndex].className = '';
    liObj[lastIndex].className = '';
    li[index].className = 'item1 active';
    liObj[index].className = 'point active'

}
function $(ele) {
    const res = document.querySelectorAll(ele);
    return res.length == 1 ? res[0] : res;
}