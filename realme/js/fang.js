var mask = document.querySelector('.mask');
var box = document.querySelector('.preview_wrap');
var img = document.querySelector('#big img');
var big = document.querySelector('#big');
// console.log(big);
// console.log(img);
// console.log(mask);
box.onmousemove = function (eve) {
    var oY = eve.pageY - box.offsetTop - mask.offsetHeight / 2;
    var oX = eve.pageX - box.offsetLeft - mask.offsetWidth/2;
    // console.log(oY);
    // console.log(oX);
    // if(oY>)
    const lx = box.offsetWidth - mask.offsetWidth;
    const ly = box.offsetHeight - mask.offsetHeight;
    if (oX < 0) oX = 0;
    if (oY < 0) oY = 0;
    if (oX > lx ) oX = lx ;
    if (oY > ly ) oY = ly ;
    mask.style.top = oY + 'px';
    mask.style.left = oX + 'px';
    const rx = img.offsetWidth - big.offsetWidth;
    const ry = img.offsetHeight - big.offsetHeight;
    console.log();

    img.style.left = -(oX / lx * rx) + 'px';
    img.style.top = -(oY / ly * ry) + 'px';
}
box.onmouseenter = function () {
    mask.style.display = 'block';
    big.style.display = 'block';
}
box.onmouseleave = function () {
    mask.style.display = 'none';
    big.style.display = 'none';
}