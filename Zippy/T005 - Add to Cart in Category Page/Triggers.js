function (options, cb) {
    require('@qubit/remember-preview')()
    var $ = require('jquery')
    var poller = require('@qubit/poller')
    var sendEvent = require('@qubit/send-uv-event')
    var uv = window.universal_variable

    poller(['.product-item-list .product-item-btn .qa-product-quickview span'], function () {
        if(uv.page.type == "category" && dataLayer[0].iss == "no"){
            cb()
        }
    })

    poller('.qa-product-quickview', function ($button) {
        $button.click(function () {
            if(uv.page.type == "category" && dataLayer[0].iss == "no"){
                sendEvent('t005:addToCart:clicked', options.meta)
            }
        })
    })
}