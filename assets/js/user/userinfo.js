$(function () {
    //发送ajax请求  获取用户信息   为表单赋值
    var form = layui.form;

    // 表单赋值  发请求得到用户信息  写入表单
    function renderForm() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                // $('input[name="username"]').val(res.data.username);
                // $('input[name="nickname"]').val(res.data.nickname);
                // $('input[name="email"]').val(res.data.email);
                form.val('userInfoForm', res.data);
                // form.val()  使用时注意
                // userInfoForm  是html中表单的lay-filter属性
                //res.data 是一个对象  是服务器返回的数据  要求data中的属性值与表单中各个input的name值一一对应
            }
        });
    };
    renderForm();





    //表单提交
    $('.layui-card form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    window.parent.getUserInfo();
                }
            }
        })
    });

    // 重置
    $('button[type="reset"]').on('click', function (e) {
        e.preventDefault();
        renderForm();
    })

})