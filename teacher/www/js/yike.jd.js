/**
 * 泰山计划
 * @param uid
 * @constructor
 */

function Yikejd(url) {
    this.url = url;
}

Yikejd.prototype = {
    constructor: Yikejd,
    /**
     * 基础查询函数
     * @param controller
     * @param action
     * @param op
     * @returns {AV.Promise}
     */
    query: function (action, payload) {
        var self = this;
        var promise = new AV.Promise();
        payload = payload || {};
        payload.openid = TOKEN;
         var req = {
            'url': self.url + action,
            'data': payload,
            'dataType': 'json'
        };
        $.ajax({
            url: req.url,
            data: req.data,
            dataType:req.dataType,
            type : 'post',
            beforeSend: function(xhr) { xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')},
            success: function (data) {
                var status = data.status;
                if (status == 1) {
                    promise.resolve(data);
                } else if (status == 0) {
                    try{
                        toast(data.msg);
                    }catch (err){}
                    promise.reject(data);
                }
            },
            error: function (i, data) {
                promise.reject(data);
            }
        });
        return promise;
    }
};

//var openid = elocalStorage.get('openid') || '';
var yikejd = new Yikejd(API_URL);
