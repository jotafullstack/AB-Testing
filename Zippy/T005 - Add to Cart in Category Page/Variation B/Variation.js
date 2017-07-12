function (options) {
    // If all works fine
    var $ = require('jquery')
    try{
        $('.product-item-list .product-item-btn .qa-product-quickview').find('span').text('Comprar')
        $('.product-item-list .product-item-btn .qa-product-quickview').find('span').css({"color":"white"})
        $('#category #content-wrapper .product-item-btn button').not('.compare').css({"background-color":"#db2527", "border": "none"})
    }
    catch(err){

    }
}


//product-item-btn