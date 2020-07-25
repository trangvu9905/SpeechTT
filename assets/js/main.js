 (function ($) {
    'use strict';

    var body = $('body');

    window.ElevatorAction = {
        intervalObj: {
            el1: '',
            el2: '',
            el3: ''
        },
        elevatorFloor: {
            el1: 1,
            el2: 1,
            el3: 1
        },
        currentFloor: 1,
        flag: ['asc', 'asc', 'asc'],
        upFlag: false,
        downFlag: false,
        hasSelect: false,
        init: function (el) {
            this.initChangeFloor(el);
            this.openCloseElevator(el);
            this.initVariables(el);
        },
        initVariables: function (el) {

        },
        openElevator: function (index) {
            $('.elevator[data-id="' + index + '"]').addClass('open');
        },
        clearInterval: function () {
            var base = this;
            for (var i = 0; i < Object.keys(base.intervalObj).length; i++) {
                clearInterval(base.intervalObj[Object.keys(base.intervalObj)[i]]);
            }
        },
        openCloseElevator: function (el) {
            var base = this;
            $('.open-door').click(function () {
                base.upFlag = true;
                base.downFlag = false;
                base.hasSelect = false;
                base.clearInterval();
                base.initChangeFloor(body);
                $('.elevator').removeClass('open');
            });

            $('.close-door').click(function () {
                base.upFlag = false;
                base.downFlag = true;
                base.hasSelect = false;
                base.clearInterval();
                base.initChangeFloor(body);
                $('.elevator').removeClass('open');
            });
        },
        initChangeFloor: function (el) {
            var base = this;
            $('.elevator').each(function () {
                var min = 1,
                    max = 10,
                    numberEl = $(this).find('.number span'),
                    imgEl = $(this).find('.number img'),
                    elIndex = parseInt($(this).data('id'));

                base.intervalObj['el' + (elIndex + 1)] = setInterval(function () {
                    if (base.elevatorFloor['el' + (elIndex + 1)] === max) {
                        base.flag['el' + (elIndex + 1)] = 'desc';
                        imgEl.addClass('down');
                    }
                    if (base.elevatorFloor['el' + (elIndex + 1)] === min) {
                        base.flag['el' + (elIndex + 1)] = 'asc';
                        imgEl.removeClass('down');
                    }

                    if (base.flag['el' + (elIndex + 1)] === 'asc') {
                        base.elevatorFloor['el' + (elIndex + 1)]++;
                    } else {
                        base.elevatorFloor['el' + (elIndex + 1)]--;
                    }

                    numberEl.text(base.elevatorFloor['el' + (elIndex + 1)]);

                    if (base.upFlag) {
                        if (!imgEl.hasClass('down')) {
                            if (base.elevatorFloor['el' + (elIndex + 1)] === base.currentFloor && !base.hasSelect) {
                                clearInterval(base.intervalObj['el' + (elIndex + 1)]);
                                base.hasSelect = true;
                                base.openElevator(elIndex);
                            }
                        }
                    } else if (base.downFlag) {
                        if (imgEl.hasClass('down')) {
                            if (base.elevatorFloor['el' + (elIndex + 1)] === base.currentFloor && !base.hasSelect) {
                                clearInterval(base.intervalObj['el' + (elIndex + 1)]);
                                base.hasSelect = true;
                                base.openElevator(elIndex);
                            }
                        }
                    }
                }, 1000);
            });
        }
    };
    