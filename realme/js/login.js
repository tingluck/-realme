class Login {
    constructor() {
        // 实现登录
        // this.islogin();
        this.$('.over').addEventListener('click', this.islogin);
        // console.log(location.search.split('='));
        // 判断当前是否有回馈页面
        let search = location.search;
        if (search) {
            this.url = search.split('=')[1];
        }
    }
    islogin = () => {
        // console.log(this);
        let form = document.forms[0].elements;
        // console.log(form);
        let username = form.text.value.trim();
        let password = form.passWord.value.trim();
        // console.log(username,password);

        if (!username || !password) throw new Error('不可空');
        // // console.log(username, password);
        // // 给ajax请求，实现登录
        let parm = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login', parm, {
            header: {
                'Context-Type': 'application/x-www-form-urlencode'
            }
        }).then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.code == 1) {
                // 保存值
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user.id);
                // 
                if (this.url) {
                    location.href = this.url;
                }
            }
        })
    }
    // 获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Login;