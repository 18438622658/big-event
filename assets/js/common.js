//放在外边加载快 没有用jq  只是js  放在入口函数里的话在页面加载晚场之后再去判断会闪一下
//判断token是否存在  如果不存在就跳转到login.html里去
if (!localStorage.getItem('token')) {
    location.href = '/login.html';
}

$(function () {
    $.ajaxPrefilter(function (options) {
        // options就是ajax请求的里的所有配置项  包括自己发请求的时候写的和默认的属性
        // console.log(options);

        // 同统一配置url   
        options.url = 'http://www.liulongbin.top:3007' + options.url;
        options.headers = {
            Authorization: localStorage.getItem('token'),
        };
        // 发送请求之前
        options.beforeSend = function () {
            // 进度条加载开始
            NProgress.start();
        };

        // 请求完成后 
        options.complete = function (xhr) {
            // 进度条完成消失
            NProgress.done();
            // console.log(xhr); //xhr里有服务器返回值 在responseJSON中
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                //每次ajax 请求完成之后，判断status和message 是否失败说明客户使用了一个假的token
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        };

    })
})