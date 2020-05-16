$(function () {
    //--------------------实现剪裁效果----------
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');

    // 1.2 配置选项
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);




    //------------------------点击上传 -----------------
    // 触发文件域的点击事件  文件域隐藏
    $('#upload').on('click', function () {
        $('#file').click();
    })

    //文件域改变 更换图片
    $('#file').on('change', function () {
        // 一、找到选择的图片  生成url
        var fileObj = this.files[0];
        // 调用js内置URL对象的createObjectURL 方法，
        // 为文件创建一个临时的url,这个临时的url可以选到已经选择的图片
        var url = URL.createObjectURL(fileObj);

        //二、更换剪裁区图片
        //先销毁裁剪区，快速的把临时地址设置上 再创建剪裁区
        $image.cropper('destroy').attr('src', url).cropper(options);

        //三、点击确定  完成剪裁  提交新头像
        $('#sure').on('click', function () {

            var dataURL = $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png') //将 Canvas 画布上的内容，转化为 base64 格式的字符串
            $.ajax({
                type: 'POST',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function (res) {
                    layer.msg(res.message);
                    // 更换头像成功，渲染父页面的头像
                    if (res.status === 0) {
                        window.parent.getUserInfo();
                    }
                }
            });
        })
    })

})