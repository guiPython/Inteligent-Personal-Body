var $ = require("jQuery")

var main = function () {
    valor = 0;
    $(window).mousemove(function () {
        valor = event.clientY;
        if (valor <= 150) {
            $('.navbar.navbar-expand-lg.menu').slideDown(300);
        }
        if (valor > 150) {
            $('.navbar.navbar-expand-lg.menu').slideUp(300);
        }
    });
};
$(function () {
    $('a').stop().click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var ud_hash = this.hash;
            var ud_ajuste = $(this.hash);
            if (ud_ajuste.length) {
                var ud_absoluto_top = ud_ajuste.offset().top;
                $('html,body').animate({ scrollTop: ud_absoluto_top }, 1000, function () {
                    window.location.hash = ud_hash;
                });
                return false;
            }
        }
    });
});
$(document).ready(function () {
    var ud_elementos = $('nav ul a');
    var ud_atual = 0;
    var ud_objeto_top;
    var ud_objeto = $(ud_elementos[0])
    ud_objeto.addClass('menu_ativo');
    $(window).scroll(function () {
        for (var i = 0; i < ud_elementos.length; i++) {
            var ud_link = $(ud_elementos[i]).attr('href');
            if ($(ud_link).length) {
                ud_objeto_top = $(ud_link).offset().top;
            }
            var ud_scroll_top = $(window).scrollTop();
            var ud_dif = Math.abs(ud_scroll_top - ud_objeto_top);
            if (i === 0) {
                ud_atual = ud_dif;
                ud_objeto = $(ud_elementos[i]);
                $('nav ul a').removeClass('menu_ativo');
                ud_objeto.addClass('menu_ativo');
            } else {
                if (ud_dif < ud_atual || ud_dif === ud_atual) {
                    ud_atual = ud_dif;
                    ud_objeto = $(ud_elementos[i]);
                    $('nav ul a').removeClass('menu_ativo');
                    ud_objeto.addClass('menu_ativo');
                }
            }
        }
    });
});
$(document).ready(main);