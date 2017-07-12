function execution(options) { // eslint-disable-line no-unused-vars

    var collapserArea_height = $('.collapserArea').height(),
        breadcrumbNavigation_height = $('#breadcrumbNavigation').height(),
        offset_val = breadcrumbNavigation_height - collapserArea_height,
        oldXHR = window.XMLHttpRequest,
        subtotal = 0,
        button = $('<div class="buyButton T011">\
            <div class="redBigButtonLeftBorder">&nbsp;</div><a class="redBigButton buyMiniBasketButton buyMiniBasketButtonAndViewCart" type="button" name="buyButton" href="https://www.continente.pt/pt-pt/private/Pages/checkout.aspx">Comprar\
          </a><div class="redBigButtonRightBorder">&nbsp;</div>\
          </div>', { css: {'display': 'none'}}),
        total = $('<div class="total T011-total"><span class="totalTitle T011-totalTitle">Total: </span><span class="totalPrice T011-totalPrice"></span></div>', {css: {'display': 'none'}})

    function hideMinicart() {
        var scroll_top = $(window).scrollTop();
        if($('.totalPrice').eq(1).text() != "€0,00"){
            if (scroll_top >= 60 && scroll_top >= offset_val) { // the detection!
                $('.T011').fadeIn("fast");
            } else {
                $('.T011').fadeOut("fast");
            }
            if (scroll_top >= 100 && scroll_top >= offset_val) { // the detection!
                $('.T011-total').fadeIn("fast");
                $('.T011-products').fadeIn("fast");
            } else {
                $('.T011-total').fadeOut("fast");
                $('.T011-products').fadeOut("fast");
            }
        }
    }

    function newXHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener("readystatechange", function () {
            if (/AddProductToBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)
                $('.T011-totalPrice').text("€ " + (baskets.d.BasketGroup.SubTotal).toLocaleString().replace(',', '-').replace('.', ',').replace('-', '.'))
                $('.T011-totalPrice').addClass('T011-animatePrice')
                setTimeout(function(){ $('.T011-totalPrice').removeClass('T011-animatePrice'); }, 2000);
            }
            // Modificar um produto
            else if (/UpdateBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)
                $('.T011-totalPrice').text("€ " + (baskets.d.BasketGroup.SubTotal).toLocaleString().replace(',', '-').replace('.', ',').replace('-', '.'))
                $('.T011-totalPrice').addClass('T011-animatePrice')
                setTimeout(function(){ $('.T011-totalPrice').removeClass('T011-animatePrice'); }, 2000);
            }
            // Quando se faz checkout
            else if (/GetCompleteBasketGroup/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)
                $('.T011-totalPrice').text("€ " + (baskets.d.BasketGroup.SubTotal).toLocaleString().replace(',', '-').replace('.', ',').replace('-', '.'))
            }
            // Quando se limpa o carrinho
            else if (/ClearBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)
                $('.T011-totalPrice').text("€ " + (baskets.d.BasketGroup.SubTotal).toLocaleString().replace(',', '-').replace('.', ',').replace('-', '.'))
            }
        }, false);
        return realXHR;
    }

    try{
        $('#breadcrumbNavigation').append(button)
        $('#breadcrumbNavigation').append(total)

        $('.T011-totalPrice').text($('.totalPrice').text())

        $('.T011').hide()
        $('.T011-total').hide()
        $('.T011-products').hide()
    } catch (err) {
        ga('QubitTrackerContinente.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T011[Change position of checkout button] - Error',
            eventLabel: 'Error: ' + err
        })
    }

    try {
        window.XMLHttpRequest = newXHR;
        $(window).scroll(hideMinicart);
    } catch (err) {
        ga('QubitTrackerContinente.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T011[Change position of checkout button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
}