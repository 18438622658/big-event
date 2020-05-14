$(function () {
    // ------------------------登录注册表单切换--------------------
    $('.goto-register a').on('click', function () {
        $('#login').hide().next().show();
    });
    //去登陆链接
    $('.goto-login a').on('click', function () {
        $('#register').hide().prev().show();
    });


    // -------------------------注册事件提交---------------------------
    $('#register form').on('submit', function (e) {
        //1.阻止默认行为
        e.preventDefault();
        var data = $(this).serialize();
        //serialize()是根据name来获取表单各项的值，再次输入密码不用提交，所以不要写name
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                // 无论成功和失败都要提示
                layer.msg(res.message);
                if (res.status === 0) {
                    $('#register').hide().prev().show();
                }
            }

        })
    });


    //表单验证  加载layui form模块
    let form = layui.form;
    //自定义验证规则
    form.verify({
        // 正则表达式验证长度
        len: [/^\w{6,12}$/, '密码长度必须是6至12位'],
        //比较两次密码是否一样  正则完成不了用函数，
        // 必须要有形参，表示使用验证规则的确认密码  必须有返回值，返回错误信息
        same: function (value) {
            // 获取第一次输入的密码的值   
            var $password = $('#reg-password').val();
            if ($password !== value) {
                return '两次密码不一致';
            }

        },
    });


    // 登录功能代码
    $('#login form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message); // 无论成功或者失败都要提示

                if (res.status === 0) {
                    // 登陆成功后 返回值有一个token是一个身份验证   需要自己保存到本地存储中
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        })
    })

});