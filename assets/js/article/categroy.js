$(function () {
    //------------------获取文章列表并渲染------------
    renderCategroy();

    function renderCategroy() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status === 0) {
                    $('tbody').html(template('tpl-list', res));
                }
            }
        })
    }

});