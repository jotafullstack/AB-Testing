function triggers (options, cb) { // eslint-disable-line no-unused-vars
    require('@qubit/remember-preview')()
    var $ = require('jquery'),
        poller = require('@qubit/poller'),
        sendEvent = require('@qubit/send-uv-event')


    if((/k=/i.test(window.location.search))){
        poller('.searchNotificationArea', function () {
            cb()
            poller('.t010-todasLojas', function () {
                $('.t010-todasLojas').on('click', function () {
                    sendEvent('t010:todasAsLojas:clicked', options.meta)
                })
            })
        })
    }
}