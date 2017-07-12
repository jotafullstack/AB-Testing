function triggers(options, cb) { // eslint-disable-line no-unused-vars
    require('@qubit/remember-preview')(60)

    var $ = require('jquery'),
        poller = require('@qubit/poller'),
        sendEvent = require('@qubit/send-uv-event'),
        listaIpTrafegoInterno = ["212.0.161.138", "212.0.161.140", "212.0.161.141", "212.0.161.220", "212.0.161.221", "212.0.161.222"],
        ipAdressUser = null,
        firstSessionView = true,
        cm = require('cookieman'),
        fired = false

    var fire = function () {
        fired = true
        cb()
    }

    options.getVisitorState().then(visitor => {
        if (visitor.sessionViewNumber > 1) {
        firstSessionView = false
    }

    if (firstSessionView === true) {
        ga('create', 'UA-2367023-11', 'auto', 'QubitTrackerSPZ')
    }

    if (document.cookie.indexOf('x-t002-clicked') > -1) {
        sendEvent('t002:logoutButton:clicked', options.meta)
        cm.clear('x-t002-clicked', {
            path: '/',
            domain: 'sportzone.pt'
        })
    }

    try {
        ipAdressUser = visitor.ipAddress

        if (options.meta.isPreview === true && $.inArray(ipAdressUser, listaIpTrafegoInterno) > -1) {
            poller('.authenticated .logout-button.qa-user-menu__logout', function ($logoutButton) {
                // Already logged
                if (!$logoutButton.parent().hasClass('hidden')) {
                    options.state.set('$logoutButton', $logoutButton)
                    fire()
                    // Not logged yet (this loggin page doesn't reload when the visitor clicks on the login button)
                } else if (/\/area-cliente/.test(window.location.pathname) && !fired) {
                    poller('.button-yellow.qa-login-form__submit', function ($loginButton) {
                        options.state.set('$logoutButton', $logoutButton)
                        $loginButton.click(function () {
                            fire()
                        })
                    })
                }
                if (firstSessionView === true) {
                    ga('QubitTrackerSPZ.send', {
                        hitType: 'event',
                        eventCategory: 'QuBit',
                        eventAction: 'Preview',
                        eventLabel: 'T002[Add text copy on logout button]'
                    })
                }
            })
        }
        if ($.inArray(ipAdressUser, listaIpTrafegoInterno) === -1) {
            poller('.authenticated .logout-button.qa-user-menu__logout', function ($logoutButton) {
                // Already logged
                if (!$logoutButton.parent().hasClass('hidden')) {
                    options.state.set('$logoutButton', $logoutButton)
                    fire()
                    // Not logged yet (this loggin page doesn't reload when the visitor clicks on the login button)
                } else if (/\/area-cliente/.test(window.location.pathname) && !fired) {
                    poller('.button-yellow.qa-login-form__submit', function ($loginButton) {
                        options.state.set('$logoutButton', $logoutButton)
                        $loginButton.click(function () {
                            fire()
                        })
                    })
                }
                ga('QubitTrackerSPZ.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking',
                    eventLabel: 'T002[Add text copy on logout button]'
                })
            })

        } else {
            if (firstSessionView === true) {
                ga('QubitTrackerSPZ.send', {
                    hitType: 'event',
                    eventCategory: 'QuBit',
                    eventAction: 'Tracking Internal',
                    eventLabel: 'T002[Add text copy on logout button]'
                })
            }
        }
    } catch (err) {
        ga('QubitTrackerSPZ.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T002[Add text copy on logout button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
})
}
