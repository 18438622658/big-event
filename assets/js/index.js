$(function () {
    //-------------------获取用户信息，并渲染页面--------------
    getUserInfo();

    //-------------------退出功能----------------------------
    // 删除token  跳转到login.html
    $('#logout').click(function () {
        // 弹出层询问是否确定退出   删除token
        // alert('你确定要推出吗');
        let layer = layui.layer;

        layer.confirm('确定退出吗?', function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
});

//获取用户信息的函数
// 一定要放到函数外边  因为其他页面也要用
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3007/my/userinfo',

        success: function (res) {
            if (res.status === 0) {
                // 设置欢迎语   有昵称就使用昵称  没有用username
                let name = res.data.nickname || res.data.username;
                $('.welcome').html('欢迎你&nbsp;&nbsp' + name);
                // 设置头像  有图片设置图片 没图片取第一个字
                if (res.userpic) {
                    $('.layui-nav-img').attr('src', res.userpic).show();
                    $('.text-img').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.text-img').text(name.substr(0, 1).toUpperCase());
                    $('.text-img').css('display', 'inline-block');
                }
            } else if (res.status === 1 && res.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }

        },
        // jq中设置请求头
        headers: {
            Authorization: localStorage.getItem('token'),
        },

    })

}