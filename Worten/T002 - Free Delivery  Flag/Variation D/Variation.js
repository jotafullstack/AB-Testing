function execution(options) { // eslint-disable-line no-unused-vars
    $('.w-flag__delivery').each(function(key, value) {
        $(this).html('<br>Envio Grátis')
        ga('QubitTrackerWorten.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'Tracking',
            eventLabel: 'T002[Free Delivery Flag] - Variation D'
        })
    })
}