$.fn.acerModal = function acerModal (option){
    // 定義Modal的彈窗選項
    var defaultOption = {
        "title":"測試彈窗", //彈窗title
        "height": '100px',
        "width": '150px',
        "type": "selectbox", // 彈窗類型: 下拉選單(selectbox), 上傳檔案表單(file)
        "open": function(event,ui){
            console.log('開啟彈窗');
        },
        "close": function(event,ui){
            console.log('關閉彈窗');
        },
        "data":[
            {"value":"1","name":"abc"},
            {"value":"2","name":"bcd"},
            {"value":"3","name":"cde"},
            {"value":"4","name":"def"},
            {"value":"5","name":"efg"},
            {"value":"6","name":"fgh"}
        ],
        "dataCallback":function(){
            console.log('data callback events');
        },
		"callbackUrl":""
    };
    
    function acerModal(element,option){
        this.option = $.extend({}, defaultOption, option || {});
        this.drawModal(element);
    }
    
    // 畫出Modal彈窗頁面
    acerModal.prototype.drawModal = function(element){
        $this = this;
        var dom = getElement(element)
        this.$dialog = $('<div class="modal-dialog"></div>')
        this.$content = $('<div class="modal-content"></div>')
        // modal header
        this.$modalHeader = $('<div class="modal-header"></div>');
        
        this.$modalTitle = $('<h4 class="modal-title"></h4>').text(this.option.title)
        this.$modalCloseBtb = $('<button type="button" class="close" data-dismiss="modal"></button>').text('X')
        this.$modalCloseBtb.on('click',function(e1, e2){
            if(typeof ($this.option.close) === 'function'){
                $this.option.close(e1, e2);
            }
        })
        this.$modalHeader.append(this.$modalTitle,this.$modalCloseBtb);
        
        this.$modalBody = $('<div class="modal-body"></div>');

        // generate body by type
        if( this.option.type == 'selectbox'){
            drawSelectBox($this,dom);
        
        }else if(this.option.type == 'file'){
            drawUploadForm($this,dom)
        }

        this.$content.append(this.$modalHeader);
        this.$content.append(this.$modalBody);
        
        
        this.$dialog.append(this.$content);
        $(dom).append(this.$dialog);
    }

    acerModal.prototype.close = function(ele){
        $(ele).modal('hide');
    }

    function getElement(element){
        return $(element);
    }

    function drawSelectBox($this,dom){
        var $select = $("<select size='10' class='modal_sel_box'></select>");
        $this.option.data.forEach(function(item){
            $option = $("<option value='" + item.value + "'>" + item.name + "</option>");
            $option.off().on('click',function(){
                console.log("value: "+$(this).val());
                $this.close(dom);
                clear($this);
            });
            $select.append($option);
        });
        
        $this.$modalBody.append($select)
    }

    function drawUploadForm($this,dom){
        var $form = $("<form id='uploadForm'></form>");
        $this.option.data.forEach(function(obj){
				let $input = $("<input class='form-control'></input>");
				let $div = $('<div class="form-group row"></div>');
                let $colSm = $("<div class='col-sm-10'></div>")
				let $label = $('<label></label>');
				$label.attr('for',obj.path);
				$input.attr('type',obj.type);
				$input.attr('name',obj.path);
                $label.text(obj.label);
                $label.addClass("col-sm-10");
                if(obj.value != null){
                    $input.attr('value',obj.value);
                }
				if(obj.type != 'hidden'){
                    $colSm.append($input);
					$div.append($label,$colSm)
					$form.append($div)
				}else{
					$form.append($input)
				}
			})
			submit = $("<button class='btn btn-primary' type='button'></button>").text("上傳檔案");
			submit.off().on('click',function(){
				if(typeof $this.option.dataCallback === "function"){
					$this.option.dataCallback();
				}
				console.log('callback function');
                $this.close(dom);
                clear($this);
			})
			$form.append(submit);
			$this.$modalBody.append($form)
    }

    function clear($this){
        $this.$modalBody.html('');
    }
    // data - 更新後的data
    acerModal.prototype.refresh= function(data,dom){
        var $this = this;
        var type = $this.option.type;
        if(type == 'selectbox'){

        }else if(type == 'file'){

        }

    }
    
    return new acerModal(this,option);
}