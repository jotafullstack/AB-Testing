function (options, cb) {
    require('@qubit/remember-preview')(60)
    var $ = require('jquery')
    var poller = require('@qubit/poller')
    var sendEvent = require('@qubit/send-uv-event')

    if(window.innerWidth >= 1201){
        poller(['.social ul li a[data-onclick="newsletterSubscribe"]', '.nav aside ul:first-child #openMinicart', '#minicartCounter'], function ($newsletterBottomButton, $miniCart) {
            if(dataLayer[0].iss == "no"){
                cb()

                // Bottom newsletter onclick if we are not in the variation
                $newsletterBottomButton.click(function () {
                    if (!$('.t002-newsletterLi').length) {
                        sendEvent('t002:newsletter:clicked', options.meta)
                    }
                })
                // Subscribe newsletter button onclick if we are not in the variation
                $('body').on('click', '#newsletterSubscribe button', function () {
                    if (!$('.t002-newsletterLi').length) {
                        sendEvent('t002:subscribeButton:clicked', options.meta)
                    }
                })
                // Minicart onclick
                $miniCart.click(function () {
                    sendEvent('t002:miniCart:clicked', options.meta)
                })
            }})
    }
}