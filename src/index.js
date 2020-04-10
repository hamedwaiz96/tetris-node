const Board = require('./board');
const $ = require('jquery');

$(() => {
    var timer = $('.timer')
    timer.toggleClass('invisible');
    $('.single-player').click((e) => {
        var timer = $('.timer');
        var menu = $('.menu');
        menu.toggleClass('invisible');
        timer.toggleClass('invisible');
        timer.html('3')
        setTimeout(() => {
            timer.html('2')
        }, 1000)
        setTimeout(() => {
            timer.html('1')
        }, 2000)
        setTimeout(() => {
            e.preventDefault();
            var menu_back = $('.menu-background')
            menu_back.toggleClass('invisible')
            window.board = new Board();
            $('.reset-button').click((e) => {
                if ((menu_back.hasClass('invisible'))) {
                    menu_back.toggleClass('invisible')
                    menu.toggleClass('invisible')
                    timer.toggleClass('invisible')
                    e.preventDefault();
                    clearInterval(window.board.interval);
                    delete window.board
                }
            })            
        }, 3000)
    });
    $('.multi-player').click((e) => {
        e.preventDefault();
    })
})