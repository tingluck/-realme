class Index {
    constructor() {
        this.getDate();
        this.bindEve();
        // 显示购物车
        this.click();
        // 默认页
        this.currentPage = 1;
        // // 试用锁
        this.lock = false;

    }
    // 显示
    click = () => {
        // console.log(111);

        let Id = localStorage.getItem('gId');
        //    console.log(gId);
        axios.get(' http://localhost:8888/goods/item/' +
            `${Id}`).then(({
            data
        }) => {
            // console.log(data);
            let html = '';
            html += `<li class="car-li">
            <div class="cart-header-left">
              <img src="${data.info.img_big_logo}" alt="">
              <span class="goodsName">${data.info.title}</span>
              <span class="cart-amount">${data.info.current_price}</span>
            </div>
          </li>`;
            // console.log(html);
            this.$('.car-ul').innerHTML += html;
            this.$('.admin').onmouseover = () => {
                this.$('.car-ul').style.display = 'block';
            }
            this.$('.car-ul').onmouseout = () => {
                this.$('.car-ul').style.display = 'none';
            }
        })

    }


    // 加入购物车
    bindEve() {
        this.$('.sk_bd ul').addEventListener('click', this.checkLogin.bind(this));
        // 懒加载
        window.addEventListener('scroll', this.lazyLoad);
        // 分页
        // this.$('.sk_page').addEventListener('click', this.fen);
    }

    checkLogin(eve) {
        // 事件委托
        // console.log(this);
        if (eve.target.className == 'img' && eve.target.nodeName == "IMG") {
            // location.assign('./fang.html');
            // 获取商品id
            // console.log(eve.target.parentNode.parentNode.dataset.id);
            let cId = eve.target.parentNode.parentNode.dataset.id
            // console.log(cId);
            sessionStorage.setItem('cpid', cId);
            location.assign('./fang.html');
        } else if (eve.target.nodeName != 'A' || eve.target.className != 'sk_goods_buy') {
            return
        };
        // console.log(eve.target);
        let token = localStorage.getItem('token');
        if (!token) location.assign('./login.html?ReturnUrl=./list.html');
        // 如果客户已经登录，则加入购物车
        let goodsId = eve.target.parentNode.dataset.id;
        localStorage.setItem('gId', goodsId)
        let userId = localStorage.getItem('user_id');
        // console.log(goodsId);
        this.addCart(goodsId, userId);
        this.click();
        // console.log(eve.target);
    }

    addCart(gId, uId) {
        // console.log(gId,uId);
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
            console.log(data,status);
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
            } else if (status == 200 && data.code == 401||data.code==0) {
                localStorage.removeItem('token'),
                    localStorage.removeItem('user_id');
                location.assign('./login.html?ReturnUrl=./list.html')
            }else {
                layer.open({
                    title: '失败',
                    content: '搞啥尼',
                    time: 3000
                })
            }

        })
    }

    // 获取商品
    async getDate(page = 1) {
        // console.log(111);
        // 发送请求
        let {
            status,
            data
        } = await axios.get('http://localhost:8888/goods/list?current=' + page);
        // console.log(data);
        // console.log(status, data);
        if (status != 200 || data.code != 1) throw new Error('不可空');
        let html = '';
        data.list.forEach(good => {
            // console.log(good);
            // 整合数据
            html += `<li class="sk_goods" data-id="${good.goods_id}">
            <a href="#none" >
                <img src="${good.img_big_logo}" class='img' alt="">
            </a>
            <h5 class="sk_goods_title">${good.title}</h5>
            <p class="sk_goods_price">
                <em>${good. price}</em>
                <del>${good.current_price}</del>
            </p>
            <div class="sk_goods_progress">
                已售
                <i>${good.sale_type}</i>
                <div class="bar">
                    <div class="bar_in"></div>
                </div>
                剩余
                <em>29</em>件
            </div>
            <a href="#none" class="sk_goods_buy">立即抢购</a>
        </li>`
        })
        // ul内容
        this.$('.sk_bd ul').innerHTML += html;
    }

    // 当前需要的高度=滚动条的高度+可视区的高度   滚进去的顶上没用的内容，不相关的
    // 滚动条到达底部就要获取新的数据   当前需要的高度<滚动条的高度+可视区的高度
    lazyLoad = () => {
        // 需要滚动条高度，可视区高度，实际内容的高度
        let Top = document.documentElement.scrollTop;
        // console.log(Top);
        let clit = document.documentElement.clientHeight;
        // console.log(clit);
        let conH = this.$('.sk_container').offsetHeight;
        // console.log(conH);
        if (Top + clit > (conH + 85)) {
            // console.log(111);
            // 一直触发 要用节流防抖
            if (this.lock) return;
            this.lock = true;
            // 指定时间开锁
            setTimeout(() => {
                this.lock = false;
            }, 1000)
            this.getDate(++this.currentPage);
        }
    }

    // 分页
    // fen = (eve) => {
    //     let aj = eve.target.innerHTML;
    //     if (eve.target.className != 'pn-prev' && eve.target.className != 'pn-prev') {
    //         this.ye = aj * this.currentPage;
    //         this.$('.sk_bd ul').innerHTML = '';
    //         this.getDate(this.ye);

    //     } else if (eve.target.className == 'pn-prev') {
    //         // let aj = eve.target.innerHTML;
    //         // console.log(aj);
    //         this.ye--;
    //         this.$('.sk_bd ul').innerHTML = '';
    //         this.getDate(this.ye);
    //     } else if (eve.target.className == 'pn-next') {
    //         // let aj = eve.target.innerHTML;
    //         // console.log(aj);
    //         this.ye++;
    //         this.$('.sk_bd ul').innerHTML = '';
    //         this.getDate(this.ye);
    //     }
    //     // console.log(ye);
    // }

    // 获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }

}
new Index;