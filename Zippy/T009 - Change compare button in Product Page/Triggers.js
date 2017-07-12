function (options, cb) {
    require('@qubit/remember-preview')(60)
    var $ = require('jquery')
    var poller = require('@qubit/poller')
    var sendEvent = require('@qubit/send-uv-event')

    poller('window.universal_variable', function(uv) {
        if(uv && uv.page && uv.page.type && uv.page.type === 'product'){

            poller('.product-item-btn.product-item-buy .qa-product-compare', function () {
                cb()
                $('body').on('click', '.qa-product-compare', function (){
                    sendEvent('t009:compareButton:clicked', options.meta)
                })
            })
        }
    })
}
