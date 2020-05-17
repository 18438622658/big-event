$(function () {
    var form = layui.form;
    form.render('select'); //刷新select选择框渲染

    //----------------获取文章列表渲染---------
    renderArticle();

    function renderArticle() {
        $.ajax({
            url: '/my/article/list',
            data: {
                pagenum: 1, //页码值  默认第一页
                pagesize: 10, //每页多少条  
                // cate_id:
                // state:
            },
            success: function (res) {
                if (res.status === 0) {
                    $('tbody').html(template('tpl-article', res));
                }
            }
        })
    }
})