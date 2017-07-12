function execution (options) {
    // if device is desktop and not mobile
    if(!isMobile) {
        // If all works fine
        try{
            // Add Jquery
            var $ = require('jquery')
            // Clone all div with buttons
            $('.checkout-types').clone().appendTo('.page-title')
            // Insert div
            $('.checkout-types:first li:last').insertBefore('.checkout-types:first li:nth-child(1)')
            // Remove button "Continuar a Comprar"
            $('.checkout-types:first li:first button').remove()
            // Add new class
            $('.checkout-types:first button').addClass('buttonFinalizar duplicateButton')
            // Add new class
            $('.checkout-types:last button:first').addClass('buttonFinalizar')
        }
            // Else send a Exception to Google analytics
        catch(err){

        }
    }
}
