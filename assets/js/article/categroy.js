$(function () {

    //表示添加列表的弹出层
    var addIndex;
    //表示编辑列表的弹出层
    var editIndex;
    // 引入form
    var form = layui.form;
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


    //---------------添加类别显示弹出层----------------
    // $('#tpl-add').html();选择到tpl-add模板中的html标签
    $('#showAdd').on('click', function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章类别',
            content: $('#tpl-add').html(),
            area: ['500px', '250px']
        })
    });


    //---------------实现添加类别----------------------
    //表单是动态添加的  所以要用委托
    $('body').on('submit', '.addForm', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategroy();
                    // 关闭弹出层
                    layer.close(addIndex);
                }
            },
        })
    });

    //--------------------删除类别------------
    $('body').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定要删除吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderCategroy();
                    }
                }
            })
            layer.close(index);
        })


    });


    //-----------------编辑--------------------------
    $('body').on('click', '.edit', function () {
        // 获取编辑按钮上的三个自定义属性
        // var id = $(this).attr('data-id');
        // var name = $(this).attr('data-name');
        // var alias = $(this).attr('data-alias');

        // 可以使用H5提供的dataset属性，获取所有的data-*属性的值
        var obj = this.dataset; //dataset 是dom属性  用this  不能用$(this)
        // console.log(obj); //这种对象是有构造函数的   给表单赋值必须是字面量对象就是{}
        console.log(JSON.parse(JSON.stringify(obj)));

        editIndex = layer.open({
            type: 1,
            title: '编辑文章类别',
            content: $('#tpl-edit').html(),
            area: ['500px', '250px'],
            //弹层之后做的事情   为表单赋值
            success: function () {
                form.val(
                    'editForm', JSON.parse(JSON.stringify(obj)))
            }
        });
        // 为表单快速复制

    });


    //-----------------实现编辑类别------------------
    $('body').on('submit', '.editForm', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        data[0].name = 'Id';
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                layer.close(editIndex);
                if (res.status === 0) {
                    // 重新渲染表单
                    renderCategroy();
                }
            }

        })
    })


});