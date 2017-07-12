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
        ga('create', 'UA-158387-28', 'auto', 'QubitTrackerContinente')
    }

    try {
        ipAdressUser = visitor.ipAddress
        if (options.meta.isPreview === true && $.inArray(ipAdressUser, listaIpTrafegoInterno) > -1) {
            poller(['#contentMain #minicart'], function () {
                cb()
                ga('QubitTrackerContinente.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Preview',
                    eventLabel: 'T011[Change position of checkout button]'
                })
            })
        }
        if ($.inArray(ipAdressUser, listaIpTrafegoInterno) === -1) {
            poller(['#contentMain #minicart'], function () {
                cb()
                $("a[name='buyButton']").first().click(function() {
                    sendEvent('t011:checkoutButton:clicked', options.meta)
                    ga('QubitTrackerContinente.send', {
                        hitType: 'event',
                        eventCategory: 'QuBit',
                        eventAction: 'Click - T011[Change position of checkout button]',
                        eventLabel: 'Breadcrumb Checkout Button'
                    })
                })
                $("a[name='buyButton']").last().click(function() {
                    ga('QubitTrackerContinente.send', {
                        hitType: 'event',
                        eventCategory: 'QuBit',
                        eventAction: 'Click - T011[Change position of checkout button]',
                        eventLabel: 'Minicart Checkout Button'
                    })
                })
                ga('QubitTrackerContinente.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking',
                    eventLabel: 'T011[Change position of checkout button]'
                })
            })
        } else {
            if (firstSessionView === true) {
                ga('QubitTrackerContinente.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking Internal',
                    eventLabel: 'T011[Change position of checkout button]'
                })
            }
        }
    } catch (err) {
        ga('QubitTrackerContinente.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T011[Change position of checkout button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
})
}