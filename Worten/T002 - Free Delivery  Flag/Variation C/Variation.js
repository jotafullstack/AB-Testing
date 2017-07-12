function execution(options) { // eslint-disable-line no-unused-vars
    $('.w-flag__delivery').text("")
    ga('QubitTrackerWorten.send', {
        hitType: 'event',
        eventCategory: 'QuBit',
        eventAction: 'Tracking',
        eventLabel: 'T002[Free Delivery Flag] - Variation C'
    })
}