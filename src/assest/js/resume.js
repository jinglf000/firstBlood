/**
 * @author jinglf00
 * @description 用于处理简历各项
 * 
 */
template.defaults.debug = true;
$(function(){
    // 把模板转换成渲染函数；
    function Resume(obj){
        var _this = this,
            _con = $(obj.conId),
            _showCon = $(obj.showCon),
            _editCon = $(obj.editCon),
            _render = {
                    renderShow : obj.renderShow,
                    renderEdit : obj.renderEdit
            }
            _dataStatus = 1;
        
        // 数据变动 重新渲染 show
        _con.on("renderShowData",function(e,num){
            _showCon.html(_render.renderShow(_this.data[+num]));
        });
        // 编辑内容 Edit 
        _con.on("renderEditData",function(e,num){
            _editCon.html(_render.renderEdit(_this.data[+num]));
            _con.trigger('editRenderSuccess');
        });
        // UI改变 显示内容
        _con.on("show",function(){
            _showCon.show();
            _editCon.hide();
        });
        _con.on('edit',function(){
            _showCon.hide();
            _editCon.show();
        })
        // 事件绑定 show 层编辑按钮
        _con.on("click.ui",obj.showBtn,function(){
            var _num = 0;
            if(typeof obj.showBtnFn === 'function'){
                _num = obj.showBtnFn.call(this,_con);
            }
            _num = typeof _num === 'number' ? _num : 0;

            if(_dataStatus){
                _con.trigger('renderEditData',_num);
            }
            _con.trigger('edit',_num);
        });
        // edit 层 取消按钮
        _con.on("click.ui",obj.editCancle,function(){
            if(typeof obj.editCancleFn === "function"){
                obj.editCancleFn.call(this);
            }
            _dataStatus = 0;
            _con.trigger('show');
        });
        // edit 编辑提交成功 
        _con.on("ajaxSuccess",function(e,num){
            _con.trigger('renderShowData',num || 0);
            _con.trigger('show');
        });

        this.con = _con;
        this.dataChange = function(val){
            _dataStatus = val;
        }
    }
    Resume.prototype.ajaxReady = function(num){
        this.con.trigger('ajaxSuccess',num);
    }
    Resume.prototype.postReady = function(num){
        this.con.trigger('ajaxSuccess',num)
        this.dataChange(1);
        this.con.trigger('renderShowData');
    }
    // Resume 简历模块
    var base = new Resume({
        conId : '#base',
        renderShow : template.compile($("#t-base-show").html()),
        renderEdit : template.compile($("#t-base-edit").html()),
        showCon : '#base-show',
        editCon : '#base-edit',
        showBtn : '#s-edit-btn',
        showBtnFn : function(){
            console.log('----- 点击编辑按钮 ---> 即将执行编辑操作----- ');
            // return 0;
        },
        editCancle : "#base-edit .edit-cancle",
        editCancleFn : function(){
            console.log('------- 点击取消按钮 ---> 执行取消操作 -------');
        },
        editSubmit : "#base-edit .edit-submit"
    });

    // edit 渲染成功
    base.con.on('editRenderSuccess',function(e){
        $("#base-edit form").validate({
            submitHandler: function(form,e){
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    window.event.returnValue = false;
                }
                var ajaxData = $.getFormData($(form));
                $.ajax({
                    url : '/assest/server/success.json',
                    method : 'get',
                    data : ajaxData
                }).done(function(result){
                    console.log(result);
                    base.ajaxReady();
                    base.data = result.data;
                });
            }
        });
    });

    $.get('/assest/server/data.json').done(function(result){
        console.log(result);
        base.data = [result.data];
        base.ajaxReady();
    }).fail(function(err){

    })

    
    
});

$(function(){

    /**
     * @argument obj 配置对象
     * 
     */
    function Resume(obj){
        var now,max = obj.max,
            con = obj.context,r = {},last,data = [];
        





        // add btn
        con.on('click.ui',getS('add'),function(e){
            
        });


        function getS(str){
            return arrSelector[arrName.indexOf(str)];
        }
    }
    Resume.prototype

    var base = new Resume({
        max : 5,
        context : $("#base"),
        arrSelector : ['#add','#s-edit-btn','.edit-cancle','.edit-submit','.show-list'],
        arrName     : ['add','edit','cancle','submit','showList'],
        renderShow  : template.compile($("#t-base-show").html()),
        renderEdit  : template.compile($("#t-base-edit").html())
    });
    // 弃用
    function no(){
        
        arrSelector.forEach(function(item,index){
            r[arrName[index]] = $(item,con);
        });
    }


});