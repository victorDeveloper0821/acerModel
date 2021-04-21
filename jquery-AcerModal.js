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
        this.that = $(element);
        this.option = $.extend({}, defaultOption, option || {});
    }
    
    // 畫出Modal彈窗頁面
    acerModal.prototype.drawModal = function(){
        $this = $(this)[0];
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
            var $select = $("<select size='10' class='modal_sel_box'></select>");
            this.option.data.forEach(function(item){
                $option = $("<option value='" + item.value + "'>" + item.name + "</option>");
                $option.off().on('click',function(){
                    console.log("value: "+$(this).val());
                    $this.$modalCloseBtb.click();
                });
                $select.append($option);
            });
            
            this.$modalBody.append($select)
        
        }else if(this.option.type == 'file'){
            var $form = $("<form id='uploadForm'></form>");
            this.option.data.forEach(function(obj){
				let $input = $("<input></input>");
				let $div = $('<div class="form-group row"></div>');
				let $label = $('<label></label>');
				$label.attr('for',obj.name);
				$input.attr('type',obj.type);
				$input.attr('name',obj.name);
				$input.attr('value',obj.value);
				if(obj.type != 'hidden'){
					$div.append($label,$input)
					$form.append($div)
				}else{
					$form.append($input)
				}
			})
			submit = $("<button class='btn btn-primary' type='submit'></button>");
			submit.off().on('click',function(){
				if(typeof $this.option.dataCallback === "function"){
					$this.option.dataCallback();
				}
				console.log('callback function');
			})
			$form.append(submit);
			this.$modalBody.append($form)
        }

        this.$content.append(this.$modalHeader);
        this.$content.append(this.$modalBody);
        
        
        this.$dialog.append(this.$content);
        $(this.that).append(this.$dialog);
    }
    var instance = new acerModal(this,option);
    return instance;
}