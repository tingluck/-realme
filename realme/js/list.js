class Index {
    constructor() {
        this.getDate();
        this.bindEve();
    }
    // 加入购物车
    bindEve() {
        this.$('.sk_bd ul').addEventListener('click', this.addCart.bind(this))
    }
    addCart(eve) {
        // 事件委托
        // console.log(this);
        if(eve.target.nodeName!='A'||eve.target.className!='sk_goods_buy')return;
        // console.log(eve.target);
        let token=localStorage.getItem('token');
        if(!token)location.assign('./login.html?ReturnUrl=./list.html')

    }
    // 获取商品
    async getDate() {
        // console.log(111);
        // 发送请求
        let {
            status,
            data
        } = await axios.get('http://localhost:8888/goods/list');
        // console.log(data);
        // console.log(status, data);
        if (status != 200 || data.code != 1) throw new Error('不可空');
        let html = '';
        data.list.forEach(good => {
            // console.log(good);
            // 整合数据
            html += `<li class="sk_goods" class="${good.goods_id}">
            <a href="#none">
                <img src="${good.img_big_logo}" alt="">
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


    // 获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }

}
new Index;