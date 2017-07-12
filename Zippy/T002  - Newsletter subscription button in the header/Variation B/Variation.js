function (options) {

    var $ = require('jquery'),
        sendEvent = require('@qubit/send-uv-event'),
        sendSubscribeButtonEvent = false,
        $nav = $('.nav aside:first ul:first-child'),
        $miniCart = $nav.find('#openMinicart'),
        $miniCartCounter = $miniCart.find('#minicartCounter'),
        $miniCartLi = null,
        $newsletterLi = null

    // Querie
    var mq = window.matchMedia("(min-width: 1201px)")

    $(window).resize(function() {
        if (mq.matches) {
            console.error("More than 1201px or equal")
        } else {
            console.error("Less than 1201px")
        }
    })

    var AddNewsletter = function(){
        $newsletterLi = $('.nav aside ul:first-child').first().find('li').first()
        $newsletterLi.addClass('t002-newsletterImage')

        $miniCartLi = $miniCart.parent().addClass('t002-li t002-miniCartLi')
        $miniCart.html($miniCartCounter).append('<span class="t002-title t002-miniCartTitle">Carrinho</span>')

        $newsletterLi = $miniCartLi.clone().addClass('t002-newsletterLi').removeClass('t002-miniCartLi')
        $nav.prepend($newsletterLi)

        $newsletterLi.find('a').attr('data-onclick', 'newsletterSubscribe').attr('href', '/newsletter').removeAttr('data-href').removeAttr('class').removeAttr('id')
        $newsletterLi.find('#minicartCounter').addClass('t002-newsletterImage').removeAttr('data-value').removeAttr('id')
        $newsletterLi.find('.t002-newsletterImage').text('')
        $newsletterLi.find('.t002-title').text('Inscreva-se')

        $newsletterLi.click(function () {
            sendSubscribeButtonEvent = true
            sendEvent('t002:newsletter:clicked', options.meta)
        })

        // Subscribe newsletter button onclick
        $('body').on('click', '#newsletterSubscribe button', function () {
            if (sendSubscribeButtonEvent) {
                sendEvent('t002:subscribeButton:clicked', options.meta)
            }
        })

        // Avoid to send the 'subscribeButton' event if the visitor cliked on the bottom newsletter button
        $('.social ul li a[data-onclick="newsletterSubscribe"]').click(function () {
            sendSubscribeButtonEvent = false
        })

        newsletterExist = true
    }

    var RemoveNewsletter = function(){
        $newsletterLi = $('.nav aside ul:first-child').first().find('li').first()
        $newsletterLi.addClass('t002-newsletterImage')

        $miniCartLi = $miniCart.parent().addClass('t002-li t002-miniCartLi')
        $miniCart.html($miniCartCounter).append('<span class="t002-title t002-miniCartTitle">Carrinho</span>')

        $newsletterLi = $miniCartLi.clone().addClass('t002-newsletterLi').removeClass('t002-miniCartLi')
        $nav.prepend($newsletterLi)

        $newsletterLi.find('a').attr('data-onclick', 'newsletterSubscribe').attr('href', '/newsletter').removeAttr('data-href').removeAttr('class').removeAttr('id')
        $newsletterLi.find('#minicartCounter').addClass('t002-newsletterImage').removeAttr('data-value').removeAttr('id')
        $newsletterLi.find('.t002-newsletterImage').text('')
        $newsletterLi.find('.t002-title').text('Inscreva-se')

        $newsletterLi.click(function () {
            sendSubscribeButtonEvent = true
            sendEvent('t002:newsletter:clicked', options.meta)
        })

        // Subscribe newsletter button onclick
        $('body').on('click', '#newsletterSubscribe button', function () {
            if (sendSubscribeButtonEvent) {
                sendEvent('t002:subscribeButton:clicked', options.meta)
            }
        })

        // Avoid to send the 'subscribeButton' event if the visitor cliked on the bottom newsletter button
        $('.social ul li a[data-onclick="newsletterSubscribe"]').click(function () {
            sendSubscribeButtonEvent = false
        })
    }



    // Newsletter onclick



}