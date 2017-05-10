/**
 * @author jinglf00
 * @description 用于处理简历各项
 * 
 */
$(function(){

    /**
     * @argument obj 配置对象
     * 
     */
    function Resume(obj){
        var isNew ,_this = this,
            con = obj.con,
            r = {},last,_data = [];
             
        $.extend(this,obj);
        this.data = _data;
        this.getEditNum = getEditNum;
        // add btn
        con.on('click.ui',getS('add'),function(e){
            var len = _this.data.length;
            if(len < _this.max){
                _this.renderE('add');
                _this.turn(1);
                isNew = 'add';
            }
        });
        // edit btn
        con.on('click.ui',getS('edit'),function(e){
            var index = _this.getIndex(this);
            _this.renderE(index);
            _this.turn(1);
            isNew = index;
        });
        // cancale btn 
        con.on('click.ui',getS('cancle'),function(e){
            _this.turn();
        });
        // delete btn
        con.on("delete.ui",function(e,ele){
            var index = _this.getIndex(ele);
            _this.data.splice(index,1);
            $(ele).parents(_this.getS('show')).remove();
        });
        // submit btn 
        con.on("submit.ui",function(e,data){
            if( isNew === 'add'){
                _this.data.push(data);
                _this.renderS(1)
            }else{
                _this.data[isNew] = data;
                _this.renderS(2,isNew);
            }
            _this.turn()
        });
        function getS(str){
            return obj.arrSelector[obj.arrName.indexOf(str)];
        }
        function getEditNum(){
            return isNew;
        }
    }
    Resume.prototype.submit = function(data){
        this.con.trigger('submit',data);
    }
    Resume.prototype.delete = function(ele){
        this.con.trigger('delete',ele);
    };
    Resume.prototype.getIndex = function(ele){
        var x = $(ele).parents(this.getS('show')).siblings().length;
        return x - ($(ele).parents(this.getS('show')).index());
    }
    // str --> selector
    Resume.prototype.getS = function(str){
        return this.arrSelector[this.arrName.indexOf(str)];
    };
    // 默认展示部分显示
    Resume.prototype.turn = function(flag){
        var arr = [$(this.getS('showArea'),this.con),$(this.getS('editArea'),this.con)],
            action = ['show','hide'];
        if(flag){
            action = action.reverse();
        }
        arr.forEach(function($ele,index){
            $ele[action[index]]();
        });
    }
    // render 展示层渲染,0，首次渲染，1，新增，2，编辑,num 对应的项
    Resume.prototype.renderS = function(flag,num){
        var showArea = $(this.getS('showArea'),this.con),
            _this = this;
        if(!flag){
            _this.data.forEach(function(item,index){
                showArea.prepend(_this.renderShow(item));
            });
        }else if (flag == 1){
            showArea.prepend(_this.renderShow(_this.data[_this.data.length - 1]));
        }else{
            showArea.find('.show:eq('+ num +')').replaceWith(_this.renderShow(_this.data[num]));
        }
    }
    // render 编辑层渲染 
    Resume.prototype.renderE = function(num){
        var editArea = $(this.getS('editArea'),this.con);
        editArea.html(this.renderEdit(num === 'add' ? {} : this.data[num]));
        this.con.trigger('editSucc');
    }

    var base = new Resume({
        max : 5,
        con : $("#base"),
        // 新增 编辑 取消 保存 删除 展示区域 编辑区域 展示单元
        arrName     : ['add','edit','cancle','submit','delete','showArea','editArea','show'],
        arrSelector : ['#add','#s-edit-btn','.edit-cancle','#delete','.edit-submit','.show-list','#base-edit','.show'],
        renderShow  : template.compile($("#t-base-show").html()),
        renderEdit  : template.compile($("#t-base-edit").html())
    });
    $("#t-base-show,#t-base-edit").remove();
    // 编辑框渲染成功
    base.con.on("editSucc",function(e){
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
                    base.submit(ajaxData);
                });
            }
        });
    });

    // 获取值
    $.get('/assest/server/data.json').done(function(result){
        console.log(result);
        base.data = result.data;
        // 异步成功 渲染内容
        base.renderS();
    });
    $("#base").on("click",".btn-delete",function(e){
        var _this = this;
        $.ajax({
            url : '/assest/server/success.json',
            method : 'get'
        }).done(function(result){
            base.delete(_this);
        });
    });

    // 弃用
    function no(){
        
        arrSelector.forEach(function(item,index){
            r[arrName[index]] = $(item,con);
        });
    }


});