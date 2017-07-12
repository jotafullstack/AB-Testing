function triggers(options, cb) { // eslint-disable-line no-unused-vars
    require('@qubit/remember-preview')()

    ga('create', 'UA-10378744-7', 'auto', 'QubitTrackerWorten')

    var $ = require('jquery'),
        poller = require('@qubit/poller'),
        sendEvent = require('@qubit/send-uv-event'),
        listaIpTrafegoInterno = ["212.0.161.138", "212.0.161.140", "212.0.161.141", "212.0.161.220", "212.0.161.221", "212.0.161.222"],
        internal = false

    try {
        for (var i = 0; i < listaIpTrafegoInterno.length; i++) {
            if (options.getVisitorState().value.ipAddress === listaIpTrafegoInterno[i]) {
                internal = true
            }
        }
        if (options.meta.isPreview === true && internal) {
            poller(['.w-flag__delivery'], function() {
                cb()
                ga('QubitTrackerWorten.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Preview',
                    eventLabel: 'T002[Free Delivery Flag]'
                })
            })
        }
        if (!internal) {
            poller(['.qa-product-options__add-cart-linkto'], function() {
                $('.qa-product-options__add-cart-linkto').on('click', function() {
                    sendEvent('t002::clicked', options.meta)
                    ga('QubitTrackerWorten.send', {
                        hitType: 'event',
                        eventCategory: 'QuBit',
                        eventAction: 'Click',
                        eventLabel: 'T002[Free Delivery Flag] - addToCartProductsWOffer'
                    })
                })
            })

            poller(['.w-product__wrapper'], function() {
                $('.w-product__wrapper').on('click', function() {
                    sendEvent('t002:detailProductWOffer:clicked', options.meta)
                    ga('QubitTrackerWorten.send', {
                        hitType: 'event',
                        eventCategory: 'QuBit',
                        eventAction: 'Click',
                        eventLabel: 'T002[Free Delivery Flag] - detailProductWOffer'
                    })
                })
            })

            poller(['.w-flag__delivery'], function() {
                cb()
            })
        } else {
            ga('QubitTrackerWorten.send', {
                hitType: 'event',
                eventCategory: 'QuBit',
                eventAction: 'Tracking Internal',
                eventLabel: 'T002[Free Delivery Flag]'
            })
        }
    } catch (err) {
        ga('QubitTrackerWorten.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T010[Search Context] - Error',
            eventLabel: 'Error: ' + err
        })
    }
}