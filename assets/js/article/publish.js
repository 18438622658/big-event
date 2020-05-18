$(function () {

    var form = layui.form;


    // 初始化富文本编辑器  富文本编辑器的名字必须为content
    initEditor();

    //--------------------获取分类并渲染----------------------
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                $('select[name="cate_id"').html(template('tpl-category', res));
                // 处理完数据  使用layui更新下拉框
                form.render('select'); //刷新select选择框渲染
            }
        }
    })


    //-----------------------处理封面---------------------
    // 显示默认剪裁效果
    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    $image.cropper(options);
    // 点击选择封面  可以选择图片
    $('#imageChoose').on('click', function () {
        $('#file').click();
    });
    // 文件域的内容改变的时候 重置剪裁区
    $('#file').on('change', function () {
        var url = URL.createObjectURL(this.files[0]);
        $image.cropper('destroy').attr('src', url).cropper(options);
    });

    //----------------------处理文章状态------------------------
    var state = '';
    $('#fabu').on('click', function () {
        state = '已发布';
    });
    $('#caogao').on('click', function () {
        state = '草稿';
    })

    //---------------------实现发布文章----------------
    $('form').on('submit', function (e) {
        e.preventDefault();

        var data = new FormData(this); //传入表单的DOM对象，可以根据表单各项的name属性获取值
        // console.log(data.get('title'));//查看formdata中的title的值
        data.append('state', state);
        // 剪裁图片 追加到data
        $image.cropper('getCroppedCanvas', {
            height: 280,
            width: 400
        }).toBlob(function (blob) {
            // blob 就是剪裁后 转换后的二进制的图片
            data.append('cover_img', blob);
            //添加接口的5项参数符合了
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: data,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        // 添加成功  跳转到文章列表页面
                        location.href = '/article/article.html'
                    }
                },
                processData: false, //不要把formdata 转换成字符串
                contentType: false, // 不要设置Content-Type
            })
        })

    })



})