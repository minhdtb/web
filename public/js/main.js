$(document).ready(function () {
    var _sticker = $("#sticker");
    var _pos = _sticker.position();
    var _header = $("#header-menu");
    var _deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    $(window).scroll(function () {
        var _margin = _deviceWidth > 992 ? _header.height() : 0;

        if (_pos) {
            var _windowPos = jQuery(window).scrollTop();
            if (_windowPos >= _pos.top - _margin - 3) {
                if (!_sticker.hasClass("stick")) {
                    var lastW = _sticker.width() + 10;
                    _sticker.addClass("stick");
                    _sticker.css('top', _margin + 3);
                    _sticker.css("width", lastW);
                }
            }
            else {
                _sticker.removeClass("stick");
                _sticker.css("width", "100%");
            }
        }
    });

    var _select = $('#selectChapter');
    _select.select2({
        allowClear: true
    });

    _select.on("select2-selecting", function (e) {
        if (e.val) {
            window.stop();
            window.location = e.val;
        }
    });

    // image error handling
    $('img').error(function () {
        $(this).attr('src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzkyOTI5MiIgaWQ9Imljb24tNjUtZG9jdW1lbnQtaW1hZ2UiPjxwYXRoIGQ9Ik0yMiwyNC4wNDU3MjgxIEwyMiwxOCBMMTEsMTggTDExLDI1IEwxMSwyNSBMMTMuNSwyMyBMMTQuOTU3OTM4OCwyNC4yNDk2NjE4IEwxOC41OTMwMzAyLDIxIEwyMiwyNC4wNDU3MjgxIEwyMiwyNC4wNDU3MjgxIEwyMiwyNC4wNDU3MjgxIFogTTE5LjUsMyBMOS4wMDI3NjAxMywzIEM3Ljg5NjY2NjI1LDMgNywzLjg5ODMzODMyIDcsNS4wMDczMjk5NCBMNywyNy45OTI2NzAxIEM3LDI5LjEwMTI4NzggNy44OTA5MjUzOSwzMCA4Ljk5NzQyMTkxLDMwIEwyNC4wMDI1NzgxLDMwIEMyNS4xMDU3MjM4LDMwIDI2LDI5LjEwMTc4NzYgMjYsMjguMDA5MjA0OSBMMjYsMTAuNSBMMjYsMTAgTDIwLDMgTDE5LjUsMyBMMTkuNSwzIEwxOS41LDMgWiBNMTksNCBMOC45OTU1Nzc1LDQgQzguNDQ1NzM1MjMsNCA4LDQuNDU1MjYyODggOCw0Ljk5NTQ1NzAzIEw4LDI4LjAwNDU0MyBDOCwyOC41NTQzMTg3IDguNDU0NzA4OTMsMjkgOC45OTk5NjAyLDI5IEwyNC4wMDAwMzk4LDI5IEMyNC41NTIzMDI2LDI5IDI1LDI4LjU1NTA1MzcgMjUsMjguMDA2NjAyMyBMMjUsMTEgTDIwLjk5NzkxMzEsMTEgQzE5Ljg5NDQ5NjIsMTEgMTksMTAuMTEzNDQ1MiAxOSw4Ljk5NDA4MDk1IEwxOSw0IEwxOSw0IFogTTIwLDQuNSBMMjAsOC45OTEyMTUyMyBDMjAsOS41NDgzNTE2NyAyMC40NTA2NTExLDEwIDIwLjk5NjczODgsMTAgTDI0LjY5OTk1MTIsMTAgTDIwLDQuNSBMMjAsNC41IFogTTEwLDE3IEwxMCwyNyBMMjMsMjcgTDIzLDE3IEwxMCwxNyBMMTAsMTcgWiBNMTQsMjEgQzE0LjU1MjI4NDgsMjEgMTUsMjAuNTUyMjg0OCAxNSwyMCBDMTUsMTkuNDQ3NzE1MiAxNC41NTIyODQ4LDE5IDE0LDE5IEMxMy40NDc3MTUyLDE5IDEzLDE5LjQ0NzcxNTIgMTMsMjAgQzEzLDIwLjU1MjI4NDggMTMuNDQ3NzE1MiwyMSAxNCwyMSBMMTQsMjEgWiIgaWQ9ImRvY3VtZW50LWltYWdlIi8+PC9nPjwvZz48L3N2Zz4=');
    });

    $('.mix-grid').mixitup();
});
