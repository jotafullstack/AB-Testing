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
        ga('create', 'UA-10378744-7', 'auto', 'QubitTrackerWorten')
    }

    try {

        ipAdressUser = visitor.ipAddress

        if (options.meta.isPreview === true && $.inArray(ipAdressUser, listaIpTrafegoInterno) > -1) {
            cb()
            if (firstSessionView === true) {
                ga('QubitTrackerWorten.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Preview',
                    eventLabel: 'T009[Change Copy of Menu Tendências]'
                })
            }
        }
        if ($.inArray(ipAdressUser, listaIpTrafegoInterno) === -1) {
            poller(['.qa-header__submenu-first-level--3'], function ($menu) {
                if ($menu.eq(0).text() === 'TENDÊNCIAS' && $menu.eq(1).text() === 'TENDÊNCIAS') {
                    $($menu).on('click', function () {
                        sendEvent('t009:menuTendencias:clicked', options.meta)
                        ga('QubitTrackerWorten.send', {
                            hitType: 'event',
                            eventCategory: 'QuBit',
                            eventAction: 'Click',
                            eventLabel: 'T009[Change Copy of Menu Tendências] - menuTendencias'
                        })
                    })
                    cb()
                }
            })
        } else {
            if (firstSessionView === true) {
                ga('QubitTrackerWorten.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking Internal',
                    eventLabel: 'T009[Change Copy of Menu Tendências]'
                })
            }
        }
    } catch (err) {
        ga('QubitTrackerWorten.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T009[Change Copy of Menu Tendências] - Error',
            eventLabel: 'Error: ' + err
        })
    }
})
}
