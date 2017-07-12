function (options) {

    var oldXHR = window.XMLHttpRequest,
        baskets = null,
        cm = require('cookieman'),
        products = []

    // Verificar que itens na página existem no carrinho
    var verifyItens = function(){
        //$('.productBox .item_originalSalesUnit').each(function(index, val){console.error(val.value)}))~

        /*$('.containerDescription .title a').each(function(index, val){
         if(cm.val('productsBasketContinente').includes($(this).attr('title'))){
         console.error("Produto " + val.getAttribute("title") + " existe no basket!")
         $teste = $(this).parent().parent().parent().find('.productQuantityArea .unitsTextBoxArea')
         }
         })*/
    }

    // Guardar produtos do basket numa cookie
    var saveCookieProducts = function(){

    }

    // Pedido de XHR
    function requestXHR() {
        //
        var realXHR = new oldXHR();
        // 
        realXHR.addEventListener("readystatechange", function () {
            // Add product using button
            if (/AddProductToBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                // Populate baskets using response
                baskets = JSON.parse(realXHR.response)

                localStorage.setItem('Basket[0] Products', JSON.stringify(baskets.d.BasketGroup.Baskets[0].LineItems));

                var retrievedObject = localStorage.getItem('Basket[0] Products');

                console.log('retrievedObject: ', JSON.parse(retrievedObject));

                // Faz refresh aos products
                setTimeout(function () {
                    $('#minicart').find('.itemQuantityArea').each(function (key, val) {
                        if ($(val).find('.item_originalSalesUnit').val() === 'Kilogram') {
                            $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", ".")) * 1000) / $(val).find('.item_unitConversionRate').val())
                            $(val).find('.weightTextBox').attr('disabled', 'disabled')
                        }
                    })
                    $('#minicart').find('.addRemoveUnits').remove();
                }, 1)

            }

            // Modificar um produto
            else if (/UpdateBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)

                baskets.d.BasketGroup.Baskets.forEach(function(basket){
                    if(basket.DisplayName === "Continente"){

                        products = []

                        basket.LineItems.forEach(function(product){
                            products.push(product.DisplayName)
                        })

                        cm.set('productsBasketContinente', products)

                    }
                    else if(basket.DisplayName === "Wells"){
                        //basket.LineItems
                    }
                })

                setTimeout(function () {
                    $('#minicart').find('.itemQuantityArea').each(function (key, val) {
                        if ($(val).find('.item_originalSalesUnit').val() === 'Kilogram') {
                            $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", ".")) * 1000) / $(val).find('.item_unitConversionRate').val())
                            $(val).find('.weightTextBox').attr('disabled', 'disabled')
                        }
                    })
                    $('#minicart').find('.addRemoveUnits').remove();
                }, 1)


            }

            // Quando se faz checkout
            else if (/GetCompleteBasketGroup/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)

                baskets.d.BasketGroup.Baskets.forEach(function(basket){
                    if(basket.DisplayName === "Continente"){

                        products = []

                        basket.LineItems.forEach(function(product){
                            products.push(product.DisplayName)
                        })

                        cm.set('productsBasketContinente', products)

                    }
                    else if(basket.DisplayName === "Wells"){
                        //basket.LineItems
                    }
                })

                setTimeout(function () {
                    $('#minicart').find('.itemQuantityArea').each(function (key, val) {
                        if ($(val).find('.item_originalSalesUnit').val() === 'Kilogram') {
                            $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", ".")) * 1000) / $(val).find('.item_unitConversionRate').val())
                            $(val).find('.weightTextBox').attr('disabled', 'disabled')
                        }
                    })
                }, 1)

            }

            // Quando se limpa o carrinho
            else if (/ClearBasket/i.test(realXHR.responseURL) && realXHR.readyState == 4 && realXHR.status == 200) {
                baskets = JSON.parse(realXHR.response)

                baskets.d.BasketGroup.Baskets.forEach(function(basket){
                    if(basket.DisplayName === "Continente"){

                        products = []

                        basket.LineItems.forEach(function(product){
                            products.push(product.DisplayName)
                        })

                        cm.set('productsBasketContinente', products)

                    }
                    else if(basket.DisplayName === "Wells"){
                        //basket.LineItems
                    }
                })

                setTimeout(function () {
                    $('#minicart').find('.itemQuantityArea').each(function (key, val) {
                        if ($(val).find('.item_originalSalesUnit').val() === 'Kilogram') {
                            $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", ".")) * 1000) / $(val).find('.item_unitConversionRate').val())
                            $(val).find('.weightTextBox').attr('disabled', 'disabled')
                        }
                    })
                }, 1)


            }
        }, false);

        return realXHR;
    }

    try{
        window.XMLHttpRequest = requestXHR;
    }
    catch(err){
        console.error(err)
    }

    try{
        // After page load
        $(document).ready(function () {

            verifyItens()

            /*if(products != null){
             products.forEach(function(entry){console.error(entry)})
             //.each(function( index ){console.log(index)})
             }*/

            // Search all productItem
            $('.productItem').each(function (key, val) {
                // if productItem is a kilogram product
                if ($(val).find('.item_originalSalesUnit').val() == "Kilogram") {
                    // Add a button to add to basket and removed: ecsf_QuerySuggestions openQuantityPopup
                    $('.buttonAnchor').find('a').replaceWith('<input class="button add-ToBasket" type="button" name="AddToBasket" value="Carrinho">')
                    // Change propriety type Text to Hidden
                    $('.unitsTextBoxArea').find('.weightTextBox.item_qty').prop("type", "hidden")
                    // Calculation minNumberOfUnitsPerSale & maxNumberOfUnitsPerSale
                    var minNumberOfUnitsPerSale = $(val).find('.MinNumberOfUnitsPerSale').val() / $(val).find('.item_unitConversionRate').val()
                    var maxNumberOfUnitsPerSale = $(val).find('.MaxNumberOfUnitsPerSale').val() / $(val).find('.item_unitConversionRate').val()
                    // Add new event to add unit button
                    $(val).find('.addRemoveUnits .addUnits input')
                        .removeClass('increase-ItemQuantityWithOutUpdate')
                        .addClass('addUnitButton')
                        .bind('click', function () {
                            $(val).find('.addToBasketKgToUnit').val(parseInt($(val).find('.addToBasketKgToUnit').val()) + 1)
                            $(val).find('.weightTextBox.item_qty').val(parseFloat($(val).find('.addToBasketKgToUnit').val() * $(val).find('.item_unitConversionRate').val()) / 1000)
                        })
                    // Add new event to remove unit button
                    $(val).find('.addRemoveUnits .removeUnits input')
                        .removeClass('decrease-ItemQuantityWithOutUpdate')
                        .addClass('removeUnitButton')
                        .bind('click', function () {
                            if ((parseInt($(val).find('.addToBasketKgToUnit').val()) - 1) >= minNumberOfUnitsPerSale) {
                                $(val).find('.addToBasketKgToUnit').val(parseInt($(val).find('.addToBasketKgToUnit').val()) - 1)
                                $(val).find('.weightTextBox.item_qty').val(parseFloat($(val).find('.addToBasketKgToUnit').val() * $(val).find('.item_unitConversionRate').val()) / 1000)
                            }
                        })
                    // Update weightTextBox
                    $(val).find('.add-ToBasket').on("click", function () {
                        $(val).find('.weightTextBox.item_qty').val(parseFloat($(val).find('.addToBasketKgToUnit').val() * $(val).find('.item_unitConversionRate').val()) / 1000)
                    })
                    // Add textbox with units
                    $(val).find('.unitsTextBoxArea').append('<input class="addToBasketKgToUnit" value="' + minNumberOfUnitsPerSale + '" type="text" maxlength="6">')
                    // Change weightTextBox.item_qty Kilograms to units
                    $(val).find('.weightTextBox.item_qty').val(parseFloat($(val).find('.addToBasketKgToUnit').val() * $(val).find('.item_unitConversionRate').val()) / 1000)
                    console.log($(val).find('.containerDescription .title a').attr("title"))

                    $(val).find('.addToBasketKgToUnit').attr('disabled', 'disabled')
                }
            })
        })

        if ($('#minicart .itemQuantityArea').length > 0) {
            //$('#minicart').find('.weightTextBox').prop("type", "text")
            $('#minicart').find('.itemQuantityArea').each(function (key, val) {
                if ($(val).find('.item_originalSalesUnit').val() === 'Kilogram') {
                    $(val).find('.unitsTextBoxArea').append('<input type="text" class="productsKilogramTextBox">')
                    $(val).find('.productsKilogramTextBox').attr('disabled', 'disabled')
                    $(val).find('.productsKilogramTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", ".")) * 1000) / $(val).find('.item_unitConversionRate').val())
                }

            })
        }

        $('#minicart').find('.addRemoveUnits').remove()
    }
    catch(err){
        console.error(err)
    }
    /*$(".buttonAnchor input").click(function(){ 
     setTimeout(function(){
     $('#minicart').find('.itemQuantityArea').each(function (key, val) {
     $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", "."))*1000)/$(val).find('.item_unitConversionRate').val())
     })
     }, 500);
     })

     $('.increase-ItemQuantity').click(function(){
     setTimeout(function(){
     $('#minicart').find('.itemQuantityArea').each(function (key, val) {
     $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", "."))*1000)/$(val).find('.item_unitConversionRate').val())
     })
     }, 500);
     })

     $('.decrease-ItemQuantity').click(function(){
     setTimeout(function(){
     $('#minicart').find('.itemQuantityArea').each(function (key, val) {
     $(val).find('.weightTextBox').val((parseFloat($(val).find('.weightTextBox').val().replace(",", "."))*1000)/$(val).find('.item_unitConversionRate').val())
     })
     }, 500);
     })*/

    // Para converter para unidades se o utilizador fizer refresh na página
}
