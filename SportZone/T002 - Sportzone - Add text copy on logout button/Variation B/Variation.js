function (options) {
    try {
        var cm = require('cookieman'),
            $logoutButton = options.state.get('$logoutButton')

        $logoutButton.append('<span class="t002-logout">Terminar Sessão</span>')
        $logoutButton.parent().click(function () {
            cm.set('x-t002-clicked', '0', {
                path: '/',
                domain: 'sportzone.pt',
                expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
            })
        })
    } catch (err) {
        ga('QubitTrackerSPZ.send', {
            hitType: 'event',
            eventCategory: 'QuBit',
            eventAction: 'T002[Add text copy on logout button] - Error',
            eventLabel: 'Error: ' + err
        })
    }
}
