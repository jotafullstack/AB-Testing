function execution(options) { // eslint-disable-line no-unused-vars
    var poller = require('@qubit/poller'),
        firstSessionView = true

    options.getVisitorState().then(visitor => {
        if(visitor.sessionViewNumber > 1){
        firstSessionView = false
    }
})

    poller(['.qa-header__submenu-first-level--3'], function() {
        $('.qa-header__submenu-first-level--3').each(function (key, value) {
            $(this).text('NOVIDADES')
        })
        if(firstSessionView === true){
            ga('QubitTrackerWorten.send', {
                hitType: 'event',
                eventCategory: 'QuBit',
                eventAction: 'Tracking',
                eventLabel: 'T009[Change Copy of Menu Tendências] - Variation B'
            })
        }
    })
}
