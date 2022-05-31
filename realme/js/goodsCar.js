class Cart {
    constructor() {
        this.getCart();
        // 给.car-ul绑定点击事件，实现委托
        this.$('.car-ul').addEventListener('click', this.dispatch);
        // 给全选绑定事件
        this.$('.header-left #all').addEventListener('click', this.checkAll);

    }
    // 事件委托分发
    dispatch = (eve) => {
        // console.log(this);
        // 事件源的获取
        let target = eve.target;
        // console.log(target);
        if (target.className == 'delGoods' && target.nodeName == 'I') this.delGoods(target);
        // 判断点击的是否为加号
        if (target.nodeName == 'BUTTON' && target.className == "jia") this.plusGoodsNum(target);
        if (target.nodeName == 'BUTTON' && target.className == "jian") this.jianGoodsNum(target);
    }
    // 增加
    plusGoodsNum = (ele) => {
        // console.log(ele);
        // 获取数量span
        let li = ele.parentNode.parentNode.parentNode;
        // console.log(target);
        // 获取数量单价小计
        let num = li.querySelector('.goodsPirce');
        let sum = li.querySelector('.cart-amount');
        let price = li.querySelector('.cart-price').innerHTML - 0;
        // console.log(num, sum, dan);
        // 获取数量
        let numVal = num.innerHTML;
        //   对数量进行加
        numVal++;
        // console.log(num);
        // 更新数量，给服务器发送数据
        const AUTH_TOKEN = localStorage.getItem('token');
        // 属性要【】
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let uId = localStorage.getItem('user_id');
        let gId = li.dataset.id;
        let params = `id=${uId}&goodsId=${gId}&number=${numVal}`;
        axios.post('http://localhost:8888/cart/number', params).then(res => {
            // console.log(res);
            let {
                status,
                data
            } = res;
            if (status == 200 && data.code == 1) {
                // 将更新后的数量设置回去
                num.innerHTML = numVal;
                sum.innerHTML = parseInt(numVal * price * 100) / 100;
                this.countSumPrice();
            }
        })

    }
    // 减号
    jianGoodsNum = (ele) => {
        // console.log(ele);
        // 获取数量span
        let li = ele.parentNode.parentNode.parentNode;
        // console.log(target);
        // 获取数量单价小计
        let num = li.querySelector('.goodsPirce');
        let sum = li.querySelector('.cart-amount');
        let price = li.querySelector('.cart-price').innerHTML - 0;
        // console.log(num, sum, dan);
        // 获取数量
        let numVal = num.innerHTML;
        //   对数量进行加
        numVal--;
        // console.log(num);
        // 更新数量，给服务器发送数据
        const AUTH_TOKEN = localStorage.getItem('token');
        // 属性要【】
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let uId = localStorage.getItem('user_id');
        let gId = li.dataset.id;
        let params = `id=${uId}&goodsId=${gId}&number=${numVal}`;
        axios.post('http://localhost:8888/cart/number', params).then(res => {
            // console.log(res);
            let {
                status,
                data
            } = res;
            if (status == 200 && data.code == 1) {
                // 将更新后的数量设置回去
                num.innerHTML = numVal;
                sum.innerHTML = parseInt(numVal * price * 100) / 100;
                this.countSumPrice();
            }
        })

    }
    // 全选和单选的实现
    checkAll = (eve) => {
        // console.log(this);
        // 点击全选的时候，单个商品都选中
        // console.log(eve.target);
        let target = eve.target.checked;
        // console.log(target);
        this.oneCheck(target);
        // 价格数量
        this.countSumPrice();

    }
    // 让单个商品，跟随全选状态
    oneCheck(ele) {
        this.$('.radio').forEach(input => {
            input.checked = ele
        })
        // console.log( this.$('.radio'));
    }

    // 单选的实现
    oneGoodsCheckBox() {
        // console.log(this.$('.tadio'));
        this.$('.cart-header-left .radio').forEach(input => {
            let self = this;
            // console.log(this);
            //    console.log(this.$('.radio'));
            // console.log(input);
            input.onclick = function () {
                // 获取点击状态
                // console.log(this);
                // 若有false则取消全选
                if (!this.checked) {
                    self.$('.header-left #all').checked = false;
                }
                // 都选中时，则全选
                if (this.checked) {
                    let status = self.getOne();
                    // console.log(status);
                    self.$('.header-left #all').checked = status;
                }
                // 价格数量
                self.countSumPrice();
            }

        })

    }
    // 都选中时，则全选
    getOne() {
        let res = Array.from(this.$('.cart-header-left .radio')).find(input => {
            //    console.log(input.checked);
            return !input.checked
        })
        //    console.log(res);
        // 页面中都被选中则返回true
        return !res;

    }
    // 统计数量和价格
    countSumPrice() {
        let sum = 0;
        let num = 0;
        this.$('.cart-header-left .radio').forEach(input => {
            // console.log(input);
            if (input.checked) {
                let ul = input.parentNode.parentNode
                // console.log(ul);
                // 获取数量和小计
                let tmpNum = ul.querySelector('.goodsPirce').innerHTML - 0;
                let tmpPrice = ul.querySelector('.cart-amount').innerHTML - 0;
                // console.log(tmpNum, tmpPrice);
                sum += tmpNum;
                num += tmpPrice;
            }
        })
        // 保留小数点后面两位
        // sum=parseInt(sum*100)/100;
        num = parseInt(num * 100) / 100;
        // console.log(sum,num);
        this.$('.cart-summary-count1 #goodsCountPirce').innerHTML = num;
        // 商品总数
        this.$('.cart-summary-count #goodsAmount ').innerHTML = sum;
    }

    delGoods(tar) {
        // console.log(tar);
        // 找到ul上的商品id
        // let id=tar.parentNode.dataset.id;
        // console.log(id);
        // 是否确认删除
        let index = layer.confirm('是否删除商品', {
            title: '删除提示框'
        }, function () {
            // console.log(111);
            //    给后台发送数据，删除记录
            let li = tar.parentNode
            let gId = li.dataset.id;
            let uId = localStorage.getItem('user_id');
            // // console.log(gid, uid);
            const AUTH_TOKEN = localStorage.getItem('token');
            axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
            axios.get('http://localhost:8888/cart/remove', {
                params: {
                    id: uId,
                    goodsId: gId,
                }
            }).then(res => {
                // console.log(res);
                // 删除成功后刷新页面location.reload()，但是刷新页面很突然，，，所以用无刷新
                // 关闭弹出框，删除相应的li
                layer.close(index);
                // layer.closeAll();
                li.remove();

            })

        })

    }
    // 取出商品信息
    async getCart() {
        // 商品必须要有token，后台验证
        const AUTH_TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;

        let {
            data,
            status
        } = await axios.get(' http://localhost:8888/cart/list', {
            params: {
                id: localStorage.getItem('user_id')
            }
        });
        // console.log(res);
        // 判断axios请求状态
        if (status == 200 && data.code == 1) {
            // console.log(data.cart);
            let html = '';
            data.cart.forEach(goods => {
                // console.log(goods);
                html += ` <li class="car-li" data-id="${goods.goods_id}">
                <i class="delGoods">×</i>
                <div class="cart-header-left">
                  <input type="checkbox" class="radio">
                  <img src="${goods.img_small_logo}" alt="">
                  <h4 class="goodsName">${goods.title}</h4>
                </div>
                <div class="cart-header-right">
                  <div class="cart-price">${goods.price}</div>
                  <div class="cart-count">
                    <button class="jian">-</button>
                    <span class="goodsPirce">${goods.cart_number}</span>
                    <button class="jia">+</button>
                  </div>
                  <div class="cart-amount">${goods.price*goods.cart_number}</div>
                </div>
              </li>`
            })
            this.$('.car-ul').innerHTML += html;
            // 单选
            this.oneGoodsCheckBox();
        }
        if (status == 200 && data.code == 401) {
            localStorage.removeItem('token'),
                localStorage.removeItem('user_id');
            location.assign('./login.html?ReturnUrl=./goodsCar.html')
        }
    }
    $(ele) {
        const res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Cart;