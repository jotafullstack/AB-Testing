function triggers(options, cb) { // eslint-disable-line no-unused-vars
    require('@qubit/remember-preview')(60)

    var $ = require('jquery'),
        poller = require('@qubit/poller'),
        sendEvent = require('@qubit/send-uv-event'),
        listaIpTrafegoInterno = ["212.0.161.138", "212.0.161.140", "212.0.161.141", "212.0.161.220", "212.0.161.221", "212.0.161.222"],
        ipAdressUser = null,
        firstSessionView = true

    options.getVisitorState().then(visitor => {
        if (visitor.sessionViewNumber > 1) {
        firstSessionView = false
    }

    if (firstSessionView === true) {
        ga('create', 'UA-2367023-11', 'auto', 'QubitTrackerSPZ')
    }

    try {
        ipAdressUser = visitor.ipAddress

        if (options.meta.isPreview === true && $.inArray(ipAdressUser, listaIpTrafegoInterno) > -1) {
            cb()
            if (firstSessionView === true) {
                ga('QubitTrackerSPZ.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Preview',
                    eventLabel: 'T005[Go to checkout after clicking on add to cart button]'
                })
            }
        }
        if ($.inArray(ipAdressUser, listaIpTrafegoInterno) === -1) {
            poller(['.minicart-total__number'], function () {
                cb()
                ga('QubitTrackerSPZ.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking',
                    eventLabel: 'T005[Go to checkout after clicking on add to cart button]'
                })
            })

            poller('.continue-to-buy .submit.compare.qa-checkout-cart-btn-redirect', function ($button) {
                $button.click(function () {
                    window.location.href = document.referrer
                })
            })
        } else {
            if (firstSessionView === true) {
                ga('QubitTrackerSPZ.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking Internal',
                    eventLabel: 'T005[Go to checkout after clicking on add to cart button]'
                })
            }
        }
    } catch (err) {
        ga('QubitTrackerSPZ.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T005[Go to checkout after clicking on add to cart button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
})
}
