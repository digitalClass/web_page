/**
 * Created by ThinkPad User on 2016/7/11 0011.
 */

$(function(){
    var that = this;

    var bSubmit = false;
    var username = window.username;
    var myDate = new Date();
    var current_element =  new Object();


    $('#myModal').on('shown.bs.modal', function (e) {
      // do something...
        var question_id = e.relatedTarget.children[0].textContent;
        $("#js-question_id").text(question_id);
        console.log(question_id);
        var answer_id = e.relatedTarget.children[1].textContent;
        $("#js-answer_id").text(answer_id);
        console.log(answer_id);
        current_element = e.relatedTarget;
    })

    // 讨论区业务逻辑
    $("#js-mysubmit").on("click", function () {
        var question_id_t = $("#js-question_id").text();
        var question_id = parseInt(question_id_t, 10);
        console.log(question_id);
        var answer_id_t = $("#js-answer_id").text();
        var answer_id = parseInt(answer_id_t, 10);
        console.log(answer_id);

        var content = $("#js-mycontent").val();
        if (!content){
            return alert("评论不能为空");
        }
        if (bSubmit){
            return;
        }
        bSubmit = true;

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
		var csrftoken = getCookie('csrftoken');
		function csrfSafeMethod(method) {
				    // these HTTP methods do not require CSRF protection
					    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
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
            dataType: 'json',
            data: {content: content, question_id: question_id, answer_id:answer_id}
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
                '<div class = "panel panel-primary">' +
                '                                    <div>' +
                '                                        <a href="#">' +
                '                                            <img src="/static/images/logo.ico" class = "small_logo">' +
                '                                        </a>' +
                '<span>' +
                '<a href = "#">',username,
                                            '</a>' +
                                            '</span>' +
                                            '  <span>',
                                            myDate,
                                        '</span>' +
                                        '                                        <span>'+
                    'vote:', 0,
                                        '</span>' +
                                        '                                        <a data-toggle="modal" data-target="#myModal">' +
                                        '                                            <span class = "icon-bar sr-only">',
                    question_id_t, '</span>' +
                    '                                            <span class = "icon-bar sr-only">-1</span>' +
                    '                                          点我回复' +
                    '                                        </a>' +
                     '                   <a data-toggle="modal" data-target="#myModal">    ' +
                    '                                        <span class = "icon-bar sr-only">',answer_id_t, '</span>' +
                    '                                            <span class = "icon-bar sr-only">-2</span>' +
                    '                                          我要回答' +
                    '                                        </a>' +
                    '                                    </div>' +
                    '                                    <div>' +
                    '                                        <span class = "i_am_comments panel panel-primary col-md-offset-1">',
                                                             content,
                                        '</span>' +
                                        '                                    </div>' +
                                        '                                    <div>' +
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
                    '                                                            <img src="/static/images/logo.ico" class = "small_logo">' +
                    '                                                        </a> ' +
                    '<span>' +
                    '                                                            <a href = "#">',
                                                                username,
                                                           ' </a>' +
                                                           '                                                           </span>' +
                                                           '                                                        <span>',
                                                            myDate,
                                                        '</span>' +
                                                        '                                                        <span>' +
                                                        '                                                            vote:', 0,,
                                                        '</span>' +
                                                        '                                                        <a data-toggle="modal" data-target="#myModal">' +
                                                        '                                                            <span class = "icon-bar sr-only">', question_id_t,
                                                    '</span>' +
                                                    '                                                            <span class = "icon-bar sr-only">', oResult.answer_id,
                                                    '</span> 点我回复' +
                                                    '                                                        </a>' +
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
                    '                                                            <img src="/static/images/logo.ico" class = "small_logo">' +
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
                    '                                                                        <img src="/static/images/logo.ico" class = "small_logo">' +
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



        }).fail(function (oResult){
            alert(oResult.msg || '提交失败，请稍后重试');
        }).always(function () {
                bSubmit = false;
        });
    });

    // ppt 部分

})

