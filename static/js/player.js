/**
 * Created by ThinkPad User on 2016/7/11 0011.
 */

$(function(){
	// using jQuery
    function getCookie(name) {

    	var cookieValue = null;
        if (document.cookie && document.cookie != '') {
        	var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
            	var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                	cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                	break;
            	}
        	}
		}
        
		return cookieValue;
    }
    function csrfSafeMethod(method) {
                // these HTTP methods do not require CSRF protection
                    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    var that = this;

    var bSubmit = false;
    var username = window.username;
    var myDate1 = new Date();
    var current_element =  new Object();

    // 获取路径url信息
    var url = window.location.pathname;
    var words = url.split("/");
    var course_id = words[2];
    var ppt_file_title = words[3];
    var ppt_slice_id = words[4];

    //$('.js-answer-comments-diaplay').first().removeClass("sr-only");

    $(".js-btn_go").click(function (e){
        var pageid = $(".js-ppt_slices_data_index").val();
        var right_limit = $(".js-ppt_total_page")[0].textContent;
        var right_limit_num = parseInt(right_limit, 10);
        if (pageid > 0 && pageid <= right_limit_num){
            var new_url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + words[1] + "/" + course_id + "/" + ppt_file_title + "/" + pageid;
            window.location.assign(new_url);
        }
        else{
            alert("超出ppt范围");
        }

    });

    function i_am_comments(){
        $(".js-question_areas").mouseenter(function(e){
            $(".js-i_am_comments").parent().next().addClass("sr-only");
            var target = $(this).find(".js-i_am_comments").parent().next();
            $(target).removeClass("sr-only");
        });
        $(".js-question_areas").mouseleave(function(e){
            $(".js-i_am_comments").parent().next().addClass("sr-only");
        });
    }

    //测试效果不好，乱动
    //function i_am_comments_beta(){
    //    $(".js-question_areas").mouseenter(function(e){
    //        $(".js-i_am_comments").parent().next().slideUp(500);
    //        var target = $(this).find(".js-i_am_comments").parent().next();
    //        $(target).slideDown(500);
    //    });
    //    $(".js-question_areas").mouseleave(function(e){
    //        $(".js-i_am_comments").parent().next().slideUp(500);
    //    });
    //}
    i_am_comments();

    //点赞
    function thumb_up(){
        $(".js-glyphicon-thumbs-up-question").unbind();
        $(".js-glyphicon-thumbs-up-question").click(function(e){
            var vote = $(this);
            var ids = $(this).parent().parent().parent().prev().find(".icon-bar");
            var question_id = ids[0].textContent;
            var answer_id = ids[1].textContent;
            console.log("question_id" + question_id + "\tanswer_id" + answer_id);

            var csrftoken = getCookie('csrftoken');
            $.ajaxSetup({
            	beforeSend: function(xhr, settings) {
               		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
               			xhr.setRequestHeader("X-CSRFToken", csrftoken);
					}
				}
            });

            $.ajax({
                url: '/addvote/',
                type: 'post',
                dataType: 'json',
                data: {question_id: question_id, answer_id:answer_id, course_id : course_id, ppt_file_title:ppt_file_title, ppt_slice_id:ppt_slice_id}
            }).done(function (oResult){
                if (oResult.code != 0){
                    return alert(oResult.msg || '点赞失败， 请稍后重试');
                }

                var text = $(vote).text();
                var num = parseInt(text, 10);
                $(vote).text(num + 1);

            }).fail(function (oResult){
                alert(oResult.msg || '点赞失败，请稍后重试');
            }).always(function () {
                    bSubmit = false;
            });
        })

        $(".js-glyphicon-thumbs-up-anwsers").unbind();
        $(".js-glyphicon-thumbs-up-anwsers").click(function(e){
            var vote = $(this);
            var ids = $(this).parent().prev().find(".icon-bar");
            var question_id = ids[0].textContent;
            var answer_id = ids[1].textContent;
            console.log("question_id" + question_id + "\tanswer_id" + answer_id);

            var csrftoken = getCookie('csrftoken');
            $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                                                    }
                                                                        }
            });

            $.ajax({
                url: '/addvote/',
                type: 'post',
                dataType: 'json',
                data: {question_id: question_id, answer_id:answer_id, course_id : course_id, ppt_file_title:ppt_file_title, ppt_slice_id:ppt_slice_id}
            }).done(function (oResult){
                if (oResult.code != 0){
                    return alert(oResult.msg || '点赞失败， 请稍后重试');
                }

                var text = $(vote).text();
                var num = parseInt(text, 10);
                $(vote).text(num + 1);

            }).fail(function (oResult){
                alert(oResult.msg || '点赞失败，请稍后重试');
            }).always(function () {
                    bSubmit = false;
            });
        })
    }

    thumb_up();

    // 时间显示修正
    var formatDate = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + m + '月' + d + '日';
    };
    var myDate = formatDate(myDate1);

    $('#myModal').on('shown.bs.modal', function (e) {
      // do something...
        var question_id = e.relatedTarget.children[0].textContent;
        $("#js-question_id").text(question_id);
        console.log(question_id);
        var answer_id = e.relatedTarget.children[1].textContent;
        $("#js-answer_id").text(answer_id);
        console.log(answer_id);
        current_element = e.relatedTarget;
    });

    // 讨论区业务逻辑
    bSubmit = false;
    $("#js-mysubmit").on("click", function () {
        var question_id_t = $("#js-question_id").text();
        var question_id = parseInt(question_id_t, 10);
        var answer_id_t = $("#js-answer_id").text();
        var answer_id = parseInt(answer_id_t, 10);

        // 获取路径url信息
        var url = window.location.pathname;
        var words = url.split("/");
        var course_id = words[2];
        var ppt_file_title = words[3];
        var ppt_slice_id = words[4];

        var content = $("#js-mycontent").val();
        if (!content){
            return alert("评论不能为空");
        }
        if (bSubmit){
            return;
        }
        bSubmit = true;

		var csrftoken = getCookie('csrftoken');
		$.ajaxSetup({
				    beforeSend: function(xhr, settings) {
							        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
											            xhr.setRequestHeader("X-CSRFToken", csrftoken);
														        }
																    }
		});

        $.ajax({
            url: '/addcomments/',
            type: 'post',
            data: {content: content, question_id: question_id, answer_id:answer_id,course_id : course_id, ppt_file_title:ppt_file_title, ppt_slice_id:ppt_slice_id}
        }).done(function (oResult){
            if (oResult.code != 0){
                return alert(oResult.msg || '提交失败， 请稍后重试');
            }

            //add new question
            if (answer_id == -5){
                 //新的提问
                var oListDv = $('.js-questions');

                var sHtml = [
                '<li>' +
                '<div class = "panel panel-primary js-question_areas">' +
                '                                    <div>' +
                '                                        <a href="#">' +
                    '                                                            <img src="' + oResult.user_avatar + '" class = "small_logo">' +
                '                                        </a>' +
                '<span>' +
                '<a href = "#">',username,
                                            '</a>' +
                                            '</span>' +
                                            '  <span>',
                                            myDate,
                                        '</span>' +
                     '                   <a data-toggle="modal" data-target="#myModal">    ' +
                    '                                        <span class = "icon-bar sr-only">',oResult.question_id, '</span>' +
                    '                                            <span class = "icon-bar sr-only">-2</span>' +
                    '                                          我要回答' +
                    '                                        </a>' +
                    '                                    </div>' +
                    '                                    <div>' +
                    '    <span class = "col-md-1">' +
                        '                        <h1><span class="glyphicon glyphicon glyphicon-thumbs-up js-glyphicon-thumbs-up-question" aria-hidden="true">',
                        0, '</span></h1>' +
                    '</span>' +
                    '      <span class = "i_am_comments i_am_comments_box panel panel-primary col-md-offset-2 js-i_am_comments">',
                                                             content,
                                        '</span>' +
                                        '                                    </div>' +
                                        '                                    <div  class = "sr-only">' +
                                        '                                        <span class = "i_am_comments col-md-offset-1" id ="js-i_am_comments-comments">' +
                                        '</span>' +
                                        '                                         <span class = "i_am_comments col-md-offset-1" id ="js-i_am_comments-anwsers">' +
                                        '                                       </span>' +
                                        '                                    </div>' +
                                        '                                 </div>' +
                                        '                            </li>'
                    ].join('');
                    oListDv.append(sHtml);
            }

            //answer
            else if (answer_id == -2){
                var oListDv = current_element.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
                //var oListDv = $('#js-i_am_comments-anwsers');
                var sHtml = [
                    '<div>' +
                    '                                                    <div >' +
                    '                                                        <a href="#">' +
                    '                                                            <img src="' + oResult.user_avatar + '" class = "small_logo">' +
                    '                                                        </a> ' +
                    '<span>' +
                    '                                                            <a href = "#">',
                                                                username,
                                                           ' </a>' +
                                                           '                                                           </span>' +
                                                           '                                                        <span>',
                                                            myDate,
                                                        '</span>' +
                                                        '                                                        <a data-toggle="modal" data-target="#myModal">' +
                                                        '                                                            <span class = "icon-bar sr-only">', question_id_t,
                                                    '</span>' +
                                                    '                                                            <span class = "icon-bar sr-only">', oResult.answer_id,
                                                    '</span> 点我回复' +
                                                    '                                                        </a>' +
                                                         '<span>' +
                                                                '<span class="glyphicon glyphicon glyphicon-thumbs-up js-glyphicon-thumbs-up-anwsers" aria-hidden="true">' +
                                                        0, '</span>' +
                                                            '</span>'+
                                                    '                                                    </div>',   content,
                                                     '<span class = "i_am_comments" id ="js-i_am_comments-sub_comments"> ' +
                                                     '</span>' +
                                                     '                                                </div>'
                   ] .join('');
                $(oListDv).prepend(sHtml);
            }

            //comments
            else if (answer_id == -1){
                var oListDv = current_element.parentElement.nextElementSibling.nextElementSibling.firstElementChild;

                // 渲染新的评论
                var sHtml = [
                    '<div class = "col-md-offset-1">' +
                    '                                                    <div >' +
                    '                                                        <a href="#">' +
                    '                                                            <img src="' + oResult.user_avatar + '" class = "small_logo">' +
                    '                                                        </a>' +
                    '                                                        <span>' +
                    '                                                            <a href = "#">',
                                                                username,
                                                            '</a>' +
                                                            '                                                        </span>' +
                                                            '                                                        <span>',
                                                            myDate,
                                                        '</span>' +
                                                        '                                                    </div>',
                                                        content,
                                                '</div>'
                    ].join('');
                $(oListDv).prepend(sHtml);
            }

            //answer_comments
            else if (answer_id > 0){
                var oListDv = current_element.parentElement.nextElementSibling;
                //var oListDv = $('#js-i_am_comments-sub_comments');

                // 渲染新的评论
                var sHtml = [
                    '<div  class = "col-md-offset-1">' +
                    '                                                                <div >' +
                    '                                                                    <a href="#">' +
                    '                                                            <img src="' + oResult.user_avatar + '" class = "small_logo">' +
                    '                                                                    </a>' +
                    '                                                                    <span>' +
                    '                                                                        <a href = "#">',
                                                                            username,
                    '</a>' +
                    '                                                                    </span>' +
                    '                                                                    <span>',
                                                                        myDate,
                                                                   '</span>        </div>',
                                                               content,
                                                           ' </div>'
                     ].join('');
                $(oListDv).prepend(sHtml);
            }

            else {
                alert('something error occurred')
            }

            i_am_comments();
            thumb_up();

        }).fail(function (oResult){
            alert(oResult.msg || '提交失败，请稍后重试');
        }).always(function () {
                bSubmit = false;
        });
    });

    // ppt 部分
    var right = $(".js-carousel-right")[0];
    var ppt_id = parseInt(ppt_slice_id, 10) + 1;
    var right_limit = $(".js-ppt_total_page")[0].textContent;
    var right_limit_num = parseInt(right_limit, 10);
    if (ppt_id <= right_limit_num){
        var new_href = $(right)[0].origin + "/" + words[1] + "/" + words[2] + "/" + words[3] + "/" + ppt_id;
        $(right).attr("href", new_href);
    }
    else{
        $(right).attr("href", "#");
    }


    var left = $(".js-carousel-left")[0];
    var ppt_id = parseInt(ppt_slice_id, 10) - 1;
    if (ppt_id > 0){
        var new_href = $(left)[0].origin + "/" + words[1] + "/" + words[2] + "/" + words[3] + "/" + ppt_id;
        $(left).attr("href", new_href);
    }
    else{
        $(left).attr("href", "#");
    }
})

