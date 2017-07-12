function (options, cb) {
    require('@qubit/remember-preview')()
    var $ = require('jquery')
    var poller = require('@qubit/poller')
    var sendEvent = require('@qubit/send-uv-event')

    poller('window.universal_variable', function(uv) {
        if(uv && uv.page && uv.page.type && uv.page.type === 'basket'){

            poller('.checkout-types .qa-checkout-cart-btn-buy.btn-proceed-checkout.btn-checkout', function () {
                cb()
                $('body').on('click', '.checkout-types:first button', function (){
                    sendEvent('t008:duplicatedButton:clicked', options.meta)
                })
            })
        }
    })
}