/**
 * constructor - jquery required
 */
function SelectBoxUtil (){
    
}

//  buildup mybox container
SelectBoxUtil.prototype.mybox ;
/**
 * 取得 default options
 * @returns 
 */
SelectBoxUtil.prototype.getBoxOptions = function(){
    var boxOption = {
        "title":"測試彈窗", //彈窗title
        "height": '30px',
        "width": '40px',
        "url":'http://zxxxxx.xxxxx.com/ssss',
        "onSelected":function(val){
            console.log('data callback events:'+val);
        }
    }
    return boxOption;
}
/**
 * 劃出 selectBox 畫面
 * @param {*} customOption 客製化的option
 */

SelectBoxUtil.prototype.drawSelectBox = function (customOption) {
    var option = $.extend({}, boxUtil.getBoxOptions(), customOption);
    // assign container
    this.mybox = $("<div id='selectbox' class='modal'></div>")

    var $selectBox = this.mybox;

    var oldBox = $("div#selectbox");
    // if dom exist then remove it
    if (oldBox != null && typeof oldBox != 'undefined') {
        oldBox.remove();
    }

    var $modalTitle = $('<h4 class="modal-title"></h4>').text(option.title)
    var $modalCloseBtb = $('<button type="button" class="close" data-dismiss="modal"></button>').text('X')
    $modalCloseBtb.off().on('click',function(){
        $selectBox.hide();
    })
    var $modalHeader = $('<div class="modal-header"></div>').append($modalTitle, $modalCloseBtb);
    var $modalBody = $('<div class="modal-body"></div>').empty();
    var $content = $('<div class="modal-content"></div>').append($modalHeader, $modalBody);
    var $dialog = $('<div class="modal-dialog"></div>').append($content)
    var $select = $("<select size='10' class='modal_sel_box'></select>");
    if(option.data != undefined || option.data !=null){
        option.data.forEach(function (item) {
            $option = $("<option value='" + item.value + "'>" + item.text + "</option>");
            $option.off().on('click', function () {
                console.log("value: " + $(this).val());
                if(typeof option.onSelected == "function"){
                    console.log('run the example onSelected function here !')
                    option.onSelected( $(this).val());
                }
                $selectBox.modal('hide');
            });
            $select.append($option);
        });    
    }else if(option.url != ''){
        renderOptions(option.url,$select,option.onSelected)
    }

    $modalBody.append($select)
    $selectBox.append($dialog);
    $("body").append($selectBox)
    $selectBox.modal('show');

}

/**
 * 由Ajax 方式loading 下拉選單的選項
 * @param {*} url : request url
 * @param {*} $select : 下拉選單
 * @param {*} onSelected : option被 click 的事件
 */
function renderOptions(url,$select,onSelected){
    $.ajax({
        url: url,
        type: "post",
        success: function (data) {
            if (data instanceof Array) {
                data.forEach(function (item, idx) {
                    var val = item.text;
                    var option = $("<option value='" + item.value + "'>" + item.text + "</option>");
                    option.off().on("click", function () {
                        if(typeof onSelected == "function"){
                            onSelected(val);
                        }
                    })
                    $select.append(option);
                })
            }
        }
    })
}

// 建立 SelectBoxUtil 實體
var boxUtil = new SelectBoxUtil();