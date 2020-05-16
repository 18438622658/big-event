$(function () {
    var form = layui.form;
    // var formdata = form.val('rePwdForm');


    form.verify({
        // 限制长度
        len: [/^\w{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 新旧密码不可以一样
        diff: function (value) { //value 表示调用这个正则的值  新密码调用所以value表示新密码
            if (value === $('input[name="oldPwd"]').val()) {
                return '新密码不可与原密码一致';
            }
        },
        // same: function (value) { //这个正则是再次输入的新密码  所以value表示再次输入的密码 
        //     var newPwd = $('input[name="newPwd"]').val();
        //     if (newPwd !== value);
        //     return '两次输入的新密码不一致';
        // },
        // 新密码和重复密码要一致
        same: function (value) {
            // 重复密码使用了该验证规则，所以value表示重复密码
            // 获取新密码
            var newPwd = $('input[name="newPwd"]').val();
            if (newPwd !== value) {
                return '两次密码不一致';
            }
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]


    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    $('form')[0].reset();
                }
            }
        })
    });

})