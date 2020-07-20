(function () {
    'use strict';

    try {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
    }
    catch (e) {
        alert('Trình duyệt này không được hỗ trợ');
    }

    var noteFloorStand = $('#floor-stand');
    var floorSpeechLoader = $('#speech-floor-loader');
    var noteContent = '';
    recognition.continuous = true;

    recognition.onresult = function (event) {
        var current = event.resultIndex;

        var transcript = event.results[current][0].transcript;

        var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

        if (!mobileRepeatBug) {
            noteContent += transcript;
            noteContent = convertTextToNumber(noteContent);
            noteFloorStand.val(('' + noteContent).toUpperCase());
            ElevatorAction.currentFloor = parseInt(noteContent);
            recognition.stop();
        }
    };

    recognition.onstart = function () {
        floorSpeechLoader.addClass('visible');
    }

    recognition.onspeechend = function () {
        floorSpeechLoader.removeClass('visible');
    }

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            floorSpeechLoader.removeClass('visible');
            alert('Không nhận diện được giọng nói. Hãy thử lại');
        };
    }

    $('#start-speech-current-floor').on('click', function (e) {
        noteContent = '';
        noteFloorStand.val('');
        recognition.start();
    });

    function convertTextToNumber(text) {
        text = text.toLowerCase().trim();
        var textTemp = 1;
        switch (text) {
            default:
                textTemp = text;
                break;
            case 'mot':
                textTemp = '1';
                break;
            case 'hai':
            case 'hi':
                textTemp = '2';
                break;
            case 'ba':
                textTemp = '3';
                break;
            case 'bon':
                textTemp = '4';
                break;
            case 'nam':
                textTemp = '5';
                break;
            case 'sau':
                textTemp = '6';
                break;
            case 'bay':
                textTemp = '7';
                break;
            case 'tam':
                textTemp = '8';
                break;
            case 'chin':
                textTemp = '9';
                break;
            case 'muoi':
                textTemp = '10';
                break;
        }

        var floorArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'b1', 'b2'];
        if (!floorArray.includes(textTemp)) {
            textTemp = 1;
        }

        return textTemp;
    }

})(jQuery);

