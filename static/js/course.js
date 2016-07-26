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

    var url = window.location.pathname;
    var words = url.split("/");
    var course_id = words[2];

    $(".js-course_rss").click(function(e){
            var csrftoken = getCookie('csrftoken');
            $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                                                    }
                                                                        }
            });
            var status_c = $("#js-subscribed_status_changed");
            var status = parseInt($(status_c).text(), 10);
            var text = $(".js-course_rss");
            $.ajax({
                url: '/course/' + course_id + '/',
                type: 'post',
                dataType: 'json',
                data: {'subscribed_status_changed': 'True'}
            }).always(function () {
                    if (status == 0){
                        text.text("订阅");
                        $(status_c).text("1");
                    }
                    else{
                        text.text("取消订阅");
                        $(status_c).text("0");
                    }


            });
    });
});