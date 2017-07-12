function (options, cb) {
    require('@qubit/remember-preview')(60)
    var $ = require('jquery')
    var poller = require('@qubit/poller')

    // change poller to product
    poller(['#contentMain #minicart'], function () {
        cb()
    })
}