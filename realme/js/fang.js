class Person {
    constructor() {

        // 获取商品信息
        this.getList();
        // 加入购物车
        this.$('.addCar').addEventListener('click', this.setCart);
    }
    // 商品详情页获取
    getList() {
        // 商品必须要有token，后台验证
        let spid = sessionStorage.getItem('cpid');
        //    发送请求
        axios.get('http://localhost:8888/goods/item/' + `${spid}`).then(({
            data
        }) => {
            // console.log(res);
            let html = '';
            html = `
            <div id="box">
                <img src="${data.info.img_big_logo}" alt="">
                <div class="mask" id="mask" style="display: none; top: 320px; left: 103px;"></div>
            </div>
            <div class="big" id="big" style="display: none;">
                <img id="#img" src="${data.info.img_big_logo}" alt="" style="left: -38.625px; top: -189.388px;">
            </div>
        `
            this.$('.preview_wrap').innerHTML = html;
            // console.log(this.$('.preview_wrap'));

            // 获取节点
            // this.small = document.querySelector('#small');
            // const small = document.querySelector('#small');
            const mask = this.$('.mask')
            const big = this.$('#big')
            const box = this.$('.preview_wrap');
            const img = this.$('#big img');
            // 给small绑定移入移出事件
            box.onmouseenter = function () {
                mask.style.display = 'block';
                big.style.display = 'block';
            }
            box.onmouseleave = function () {
                mask.style.display = 'none';
                big.style.display = 'none'
            }
            // 给small绑定移动事件
            box.onmousemove = function (event) {
                var pagex = event.pageX;
                var pagey = event.pageY;
                var ox = pagex - box.offsetLeft - mask.offsetHeight / 2;
                var oy = pagey - box.offsetTop - mask.offsetWidth / 2;

                // 封住四遍
                const lx = box.offsetWidth - mask.offsetWidth;
                const ly = box.offsetHeight - mask.offsetHeight
                if (ox < 0) ox = 0;
                if (oy < 0) oy = 0;
                if (ox > lx) ox = lx;
                if (oy > ly) oy = ly;
                mask.style.top = oy + 'px';
                mask.style.left = ox + 'px';
                // 计算右图的比例
                const rx = img.offsetWidth - big.offsetWidth;
                const ry = img.offsetHeight - big.offsetHeight;
                const w = ox / lx * rx;
                const h = oy / ly * ry;
                img.style.top = -h + 'px';
                img.style.left = -w + 'px'
            }
        })

    }
    setCart = () => {
        let spid = sessionStorage.getItem('cpid');
        let token = localStorage.getItem('token')
        // console.log(spid);
        if (!token) location.assign('./login.html?ReturnUrl=./list.html');
        // 如果客户已经登录，则加入购物车
        // let goodsId = eve.target.parentNode.dataset.id;
        let userId = localStorage.getItem('user_id');
        // console.log(userId,spid);
        this.addCart(spid, userId)
    }
    addCart(gId, uId) {
        console.log(gId,uId);
        // 给添加购物车接口发送接口,常量大写（axios配置默认值，全局）
        const AUTH_TOKEN = localStorage.getItem('token');
        // 属性要【】
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let param = `id=${uId}&goodsId=${gId}`
        axios.post('http://localhost:8888/cart/add', param).then(({
            data,
            status
        }) => {
            // console.log(data,status);
            // 判断添加购物车是否成功
            if (status == 200 && data.code == 1) {
                layer.open({
                    title: '商品添加成功',
                    content: '购物车页面，去吗？',
                    btn: ['留下', '可以'],
                    btn2: function (index, layero) {
                        // console.log('去');
                        location.assign('./goodsCar.html')
                    }
                })
            } else if (status == 200 && data.code == 401) {
                localStorage.removeItem('token'),
                    localStorage.removeItem('user_id');
                location.assign('./login.html?ReturnUrl=./list.html')
            } else {
                layer.open({
                    title: '失败',
                    content: '搞啥尼',
                    time: 3000
                })
            }

        })
    }


    // 获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}

new Person;