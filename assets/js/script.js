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
        // console.log(transcript);
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
            // case 'hi':
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
    // BƯỚC 1: KHỞI TẠO CÁC BIẾN
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var vendoUrl = window.URL || window.webkitURL;
 
    // BƯỚC 2: XỬ LÝ HIỂN THỊ WEBCAM BAN ĐẦU
    canvas.style.display = 'none'; // Ẩn thẻ canvas khi vừa tải trang
 
    // Biến chưa hình ảnh webcam tuỳ theo loại từng trình duyệt
    navigator.getMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
 
    // Hàm lấy hình ảnh webcam
    navigator.getMedia({
        video: true, // Có hình ảnh
        audio: false // Không có âm thanh
                // Hàm chèn đường dẫn webcam vào thẻ video
    }, function (stream) {
        video.src = vendoUrl.createObjectURL(stream);
        video.play(); // Phát thẻ video
        // Hàm thông báo khi xảy lỗi hoặc không hỗ trợ trên trình duyệt này
    }, function (error) {
        alert('Rất tiếc đã xảy ra lỗi, có thể do trình duyệt của bạn không hỗ trợ chức năng này hoặc trang này chưa kết nối riêng tư https.');
    });
 
    // XỬ LÝ SỰ KIỆN CLICK VÀO NÚT CHỤP ẢNH
    document.getElementById('capture').addEventListener('click', function () 
    {
        canvas.style.display = 'block'; // Hiện thẻ canas
        // In hình ảnh lên thẻ canvas ở x = 0, y = 0, width = 400, height = 300
        context.drawImage(video, 0, 0, 400, 300);
        data = canvas.toDataURL(); // Tạo một đường dẫn hình ảnh của canvas
        // Gửi dữ liệu ảnh đến file saveimg.php thông qua phương thức POST
        $.ajax({
            type: "POST",
            url: "saveimg.php",
            data: {
                imgBase64: data
            }
            // Sau khi gửi dữ liệu thành công thì sẽ thêm nút Đi tới link ảnh 
        }).done(function (result) {
            $('.booth').append('<a href="' + result + '">Đi tới link ảnh</a>');
        });
    });

})(jQuery);

