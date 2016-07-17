/**
 * Created by ThinkPad User on 2016/7/11 0011.
 */

$(function(){
    var that = this;
    var oListDv = $('#js-i_am_comments');

    var bSubmit = false;
    var userid = window.uid;
    var username = window.username;
    var myDate = new Date();

    // 讨论区业务逻辑
    $("#js-mysubmit").on("click", function () {
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
            data: {content: content, userid: userid}
        }).done(function (oResult){
            if (oResult.code != 0){
                return alert(oResult.msg || '提交失败， 请稍后重试');
            }

            // 渲染新的评论
            var sHtml = [
                '<div>',
                    '<div>',
                        '<a href="#">',
                           ' <img src="/static/images/logo.ico" class = "small_logo">',
                        '</a>',
                        '<span>',
                            '<a href = "#">',
                                username,
                            '</a>',
                        '</span>',
                        '<span>',
                                myDate,
                        '</span>',
                    '</div>',
                    content,
                '</div>'
            ].join('');
            oListDv.prepend(sHtml);


        }).fail(function (oResult){
            alert(oResult.msg || '提交失败，请稍后重试');
        }).always(function () {
                bSubmit = false;
        });
    });

    // ppt 部分

})

