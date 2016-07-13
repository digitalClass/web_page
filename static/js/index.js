/**
 * Created by ThinkPad User on 2016/7/11 0011.
 */

$(function(){
    $('.js-class_list').mouseover(function(){
        $(this).css("opacity", 1)
    });

    $('.js-class_list').mouseout(function(){
        $(this).css("opacity", 0.2)
    });

    $('.carousel').carousel('cycle')
})

