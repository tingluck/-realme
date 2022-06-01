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
$('.prev').onclick = function () {
    lastIndex = index;
    index++;
    if (index > li.length - 1) index = 0;
    fn()
}
$('.next').onclick = function () {
    lastIndex = index;
    index--;
    if (index < 0) index = li.length - 1;
    fn();
}

// 设置计时器，让图片自动播放
var time = '';

function fn1() {
    times = setInterval(function () {
        $('.next').onclick();
    }, 3000)
}
fn1();
$('.wrap').onmouseenter = function () {
    clearInterval(times);
}
$('.wrap').onmouseleave = function () {
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
// 显示小人的二级下拉菜单
$('.admin').addEventListener('click', () => {
    $('.admin ul').style.display = 'block';
})
$('.admin ul').onmouseleave = function () {
    $('.admin ul').style.display = 'none';
}
// 点击登录跳转到登录页面
$('.admin ul li:last-child').onclick = function () {
    location.assign('./login.html')
}
$('.admin ul li:first-child').onclick = function () {
    location.assign('./goodsCar.html')
}

