class Login {
    constructor() {
        // 实现登录
        // this.islogin();
        this.$('.o2').addEventListener('click', this.islogin);
        this.$('.o1').addEventListener('click', this.islogin1);
        this.$('.btn #text').addEventListener('click', this.duan);
        this.$('.btn #text1').addEventListener('click', this.duan1);
        // console.log(location.search.split('='));
        // 判断当前是否有回馈页面
        let search = location.search;
        if (search) {
            this.url = search.split('=')[1];
        }
    }
    duan = () => {
        // console.log(this);
        this.$('.change1').style.display = 'block';
        this.$('.change2').style.display = 'none';
        this.$('#text>span').style.display = 'block';
        this.$('#text1>span').style.display = 'none';
        // this.$('.over').value='注册';
    }
    duan1 = () => {
        this.$('.change1').style.display = 'none';
        this.$('.change2').style.display = 'block';
        this.$('#text>span').style.display = 'none';
        this.$('#text1>span').style.display = 'block';
    }
    islogin = () => {
        // console.log(this);
        let form = document.forms[0].elements;
        console.log(form);
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
                    // console.log(this.url);
                    location.href = this.url;
                } else {
                    location.assign('./list.html')
                }
            }
        })
    }
    islogin1 = () => {
        let form = document.forms[1].elements;
        // console.log(form);
        let username = form[0].value.trim();
        let username1 = form[1].value.trim();
        let password = form[2].value.trim();
        let password1 = form[3].value.trim();
        // console.log(username,password,password1,username1);
        if (!username || !password || !username1 || !password1) throw new Error('不可空');
        if (password != password1) alert('两次密码不一致呢');
        // // console.log(username, password);
        // // 给ajax请求，实现登录

        let parm = `username=${username}&password=${password}&rpassword=${password1}&nickname=${username1}`;
        axios.post('http://localhost:8888/users/register', parm, {
            header: {
                'Context-Type': 'application/x-www-form-urlencode'
            }
        }).then(res => {
            console.log(res);

            // 保存值
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_id', res.data.user.id);
            //

            this.duan1();


        })
    }
    // 获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Login;