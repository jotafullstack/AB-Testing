function execution (options) {

    ga('create', 'UA-54947478-6', 'auto', 'ExperienceTrackerZippyPT')

    // If all works fine
    try{
        // Clone all div
        var t009CompareButton = $('.product-item-btn.product-item-buy').clone()
        // Remove the first button
        t009CompareButton.find("button:first-child").remove()
        // Add to Left and add an Id
        t009CompareButton.insertAfter('.product-gallery').attr('id', 'compareButtonLeft')
        // Remove compare button of right
        $('.product-item-btn.product-item-buy').not('#compareButtonLeft').find("button:last-child").remove()

        // Experience Tracking
        ga('ExperienceTrackerZippyPT.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'Tracking',
            eventLabel: 'T009'
        });
    }
        // Else send a Exception to Google analytics
    catch(err){
        // Event Exception Tracking
        ga('ExceptionTrackerZippyPT.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'Erros JS',
            eventLabel: 'T009 - Variation B - Error: ' + err.message
        });
    }
}