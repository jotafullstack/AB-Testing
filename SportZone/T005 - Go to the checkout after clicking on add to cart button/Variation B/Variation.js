function execution (options) {

    var $ = require('jquery'),
        open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send,
        subtotal = 0;

    function openReplacement(method, url, async) {
        this._url = url
        return open.apply(this, arguments)
    }

    function sendReplacement(data) {

        if(this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange
        }
        this.onreadystatechange = onReadyStateChangeReplacement;
        return send.apply(this, arguments)
    }

    function onReadyStateChangeReplacement() {

        if(/sonaeapi/i.test(this._url) && this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.response)
            if(response.cart.addresses[1].subtotal > subtotal){
                subtotal = response.cart.addresses[1].subtotal
                if(subtotal > 50.00){
                    window.location='/store/checkout/cart'
                }
            }
            else{
                subtotal = response.cart.addresses[1].subtotal
            }
        }

        if(this._onreadystatechange) {
            return this._onreadystatechange.apply(this, arguments)
        }
    }

    try{
        window.XMLHttpRequest.prototype.open = openReplacement
        window.XMLHttpRequest.prototype.send = sendReplacement
    }
    catch(err){
        ga('QubitTrackerSPZ.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T005[Go to checkout after clicking on add to cart button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
}