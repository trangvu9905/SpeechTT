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
    ElevatorAction.init(body);
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



// (function () 
// {
//     // BƯỚC 1: KHỞI TẠO CÁC BIẾN
//     var video = document.getElementById('video');
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     var vendoUrl = window.URL || window.webkitURL;
 
//     // BƯỚC 2: XỬ LÝ HIỂN THỊ WEBCAM BAN ĐẦU
//     canvas.style.display = 'none'; // Ẩn thẻ canvas khi vừa tải trang
 
//     // Biến chưa hình ảnh webcam tuỳ theo loại từng trình duyệt
//     navigator.getMedia = navigator.getUserMedia ||
//             navigator.webkitGetUserMedia ||
//             navigator.mozGetUserMedia ||
//             navigator.msGetUserMedia;
 
//     // Hàm lấy hình ảnh webcam
//     navigator.getMedia({
//         video: true, // Có hình ảnh
//         audio: false // Không có âm thanh
//                 // Hàm chèn đường dẫn webcam vào thẻ video
//     }, function (stream) {
//         video.src = vendoUrl.createObjectURL(stream);
//         video.play(); // Phát thẻ video
//         // Hàm thông báo khi xảy lỗi hoặc không hỗ trợ trên trình duyệt này
//     }, function (error) {
//         alert('Rất tiếc đã xảy ra lỗi, có thể do trình duyệt của bạn không hỗ trợ chức năng này hoặc trang này chưa kết nối riêng tư https.');
//     });
 
//     // XỬ LÝ SỰ KIỆN CLICK VÀO NÚT CHỤP ẢNH
//     document.getElementById('capture').addEventListener('click', function () 
//     {
//         canvas.style.display = 'block'; // Hiện thẻ canas
//         // In hình ảnh lên thẻ canvas ở x = 0, y = 0, width = 400, height = 300
//         context.drawImage(video, 0, 0, 400, 300);
//         data = canvas.toDataURL(); // Tạo một đường dẫn hình ảnh của canvas
//         // Gửi dữ liệu ảnh đến file saveimg.php thông qua phương thức POST
//         $.ajax({
//             type: "POST",
//             url: "saveimg.php",
//             data: {
//                 imgBase64: data
//             }
//             // Sau khi gửi dữ liệu thành công thì sẽ thêm nút Đi tới link ảnh 
//         }).done(function (result) {
//             $('.booth').append('<a href="' + result + '">Đi tới link ảnh</a>');
//         });
//     });
// })();