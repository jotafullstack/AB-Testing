function execution(options) { // eslint-disable-line no-unused-vars

    var sendEvent = require('@qubit/send-uv-event')
    var poller = require('@qubit/poller')

    ga('create', 'UA-158387-28', 'auto', 'QubitTrackerContinente')

    try {
        if(!($.trim($('.Breadcrumb_link').eq(0).text()) === "Megastore Continente" && $.trim($('.Breadcrumb_link').eq(1).text()) === "Resultados de Pesquisa")){
            $('.searchNotification span:last').text(" não retornou resultados na loja ")
        }
        if (/continentenegocios/i.test(window.location.pathname)) {
            $continenteNegocios = '<span class="t010-continenteNegocios">Continente Negócios.</span>'
            $('.searchNotification span:last').append($continenteNegocios)
        } else if (/wells/i.test(window.location.pathname)) {
            $wells = '<span class="t010-wells">Wells.</span>'
            $('.searchNotification span:last').append($wells)
            $('#notifySearchQuery').removeClass('highlighted').addClass('t010-wells')
        } else if (/continente/i.test(window.location.pathname)) {
            $continente = '<span class="t010-continente">Continente.</span>'
            $('.searchNotification span:last').append($continente)
        }

        if (/continente/i.test(window.location.pathname) || /wells/i.test(window.location.pathname) || /continentenegocios/i.test(window.location.pathname)) {
            $t = '<div class="clearBoth">&nbsp;</div>\
          <div class="emptySugestion">\
              Dicas para pesquisa:\
              <ul>\
                  <li>• Experimente pesquisar em <a href="#" class="t010-todasLojas">todas as lojas</a>.</li>\
                  <li>• Verifique a ortografia.</li>\
                  <li>• Use um termo diferente.</li>\
                  <li>• Utilize um termo mais genérico.</li>\
                  <li>• Experimente pesquisar por marca.</li>\
              </ul>\
              <div class="clearBoth">&nbsp;</div>\
              <!--<div class="help">\
                  Descubra todas as funcionalidades da nossa pesquisa na <a href="#" id="globalHelp" class="highlighted">Ajuda</a></div>-->\
          </div>'
            $('.searchTextArea').append($t)
            $('#contentMain .contentLeft .searchNotificationArea .searchTextArea').css({
                'width': '685px'
            })
            $pesquisa = 'https://www.continente.pt/pt-pt/public/Pages/searchresults.aspx?k=' + $('#notifySearchQuery').text()
            $('.t010-todasLojas').attr('href', $pesquisa)
        }

        ga('QubitTrackerContinente.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'Tracking',
            eventLabel: 'T010[Search Context]'
        })
    } catch (err) {
        ga('QubitTrackerContinente.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T010[Search Context] - Error',
            eventLabel: 'Error: ' + err
        })
    }
}