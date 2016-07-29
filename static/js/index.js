/**
 * Created by ThinkPad User on 2016/7/11 0011.
 */

$(function(){
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

     $(".js-carousel").click(function(e){
            var csrftoken = getCookie('csrftoken');
            $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                                                    }
                                                                        }
            });
            var curpage_c = $(".js_curpage");
            var curpage = parseInt($(curpage_c).text(), 10);
            var totalpage_c = $(".js_totalpage");
            var totalpage = parseInt($(totalpage_c).text(), 10);
            var curpage_add_c = e.currentTarget.children[1].textContent;
            var curpage_add = parseInt(curpage_add_c, 10);
            var page_num_c = $(".js_pagenum");
            var page_num = parseInt($(page_num_c).text(), 10);
            var page_id = curpage + curpage_add;
            if ( page_id <= 0 || page_id > totalpage){
                return;
            }

            $.ajax({
                url: '/page_change',
                type: 'post',
                dataType: 'json',
                data: {'page_id': page_id}
            }).done(function (oResult){
                if(oResult.code != 0){
                    return alert(oResult.msg || '请求失败，请稍后重试');
                }

                var oListDv = $(".js-class_list_main");
                oListDv.html('');

                // 渲染新的评论
                for (var i = 0; i < oResult.item_count; i++) {
                    var sHtml = [
                        '<tr>',
                        '<th>', oResult.course[i].id, '</th>' +
                        '                        <th><a href=/course/', oResult.course[i].id, '>', oResult.course[i].title, '</a></th>' +
                        '                      <th>', oResult.course[i].create_time, '</th>' +
                        '                      <th>', oResult.course[i].teacher_name, '</th>' +
                        '                    </tr>'
                    ].join('');
                    $(oListDv).append(sHtml);
                }

                $(curpage_c).text(page_id);
            }).fail(function (oResult){
                alert(oResult.msg || '请求失败，请稍后重试');
            }). always(function () {

            });
    });


})

