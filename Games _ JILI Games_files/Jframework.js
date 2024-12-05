var JF = {
    ajax: {},
    society: {},
    tinyMCE: {},
    time: {},
    web: {},
    string: {}
};

JF.ajax = {
    loadingMask: 'load-mask',
    showLoadingMask: function () {
        console.log(this.loadingMask);
        $('#' + this.loadingMask).css('display', '');
    },
    hideLoadingMask: function () {
        $('#' + this.loadingMask).hide();
    },
    // API Handler need jquery-1.11.0.js / jquery.toastmessage.js
    AjaxHandler: function (url, parameter, Callback, hideMask) {
        if (hideMask !== true) {
            this.showLoadingMask();
        }
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: parameter,
            callback: Callback,
            async: true,
            cache: false,
            success: this.ajaxSuccess,
            error: this.ajaxError,
        });
    },
    // API Handler need jquery-1.11.0.js / jquery.form.js / jquery.toastmessage.js
    FormAjaxHandler: function (url, thisForm, Callback, enableProgress, hideMask) {
        if (hideMask !== true) {
            this.showLoadingMask();
        }
        var options = {
            success: this.ajaxSuccess,
            error: this.ajaxError,
            url: url,
            type: 'post',
            callback: Callback,
            dataType: 'json',
            clearForm: false,
            enableProgress: enableProgress,
            beforeSend: function () {
                if (this.enableProgress != true) {
                    return true;
                }
                $('#jf-progress').css('display', '');
                $('#jf-progress').attr('percentage', '0');
                $('#jf-progress').html('0%');
            },
            uploadProgress: function (event, position, total, percentComplete) {
                if (this.enableProgress != true) {
                    return true;
                }
                $('#jf-progress').attr('percentage', percentComplete);
                $('#jf-progress').html(percentComplete + '%');
            },
            complete: function (xhr) {
                if (this.enableProgress != true) {
                    return true;
                }
            }
        };
        thisForm.ajaxSubmit(options);
    },
    ajaxSuccess: function (responseJSON) {
        // console.log(responseJSON);

        var toasttype = 'showWarningToast';
        var response = responseJSON.response;
        setTimeout(function () {
            JF.ajax.hideLoadingMask()
        }, response.delay);

        if (response.error === 0) {
            toasttype = 'showSuccessToast';
            if (this.callback != null) {
                this.callback(responseJSON);
            }
        }
        if (response.message.length > 1) {
            $().toastmessage(toasttype, response.message);
        }

        if (response.delay > 1) {
            if (response.redirect === true && response.url != null) {
                setTimeout(function () {
                    if (response.isReplace == true) {
                        location.replace(response.url);
                    }
                    else {
                        location.href = response.url;
                    }
                }, response.delay);
            }

            if (response.inHtml === true && response.objId != null) {
                setTimeout(function () {
                    $("#" + response.objId).html(response.html);
                }, response.delay);
            }

            if (response.eval === true && response.js != null) {
                setTimeout(function () {
                    eval(response.js);
                }, response.delay);
            }
        }
    },
    ajaxError: function (xhr, textStatus, errorThrown) {
        setTimeout(function () {
            JF.ajax.hideLoadingMask()
        }, 3000);
        $().toastmessage('showErrorToast', 'Internal Error!!');
    }
};

JF.web = {
    // URI encode
    urlEncode: function (str) {
        str = encodeURIComponent(str);
        while (str.search("'") != -1)
            str = str.replace(/'/, "%27");
        return str;
    },
    //Close window
    CloseWindow: function () {
        window.returnValue = '';
        window.close();
    },
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            //        console.log(hash);
            if (hash[1] != null) {
                vars.push(hash[0]);
                vars[hash[0]] = hash[1].replace('#', '');
            }
        }
        return vars;
    },
    modal: function (title, text, size, callBack, btn) {
        $(".modal-title").html(title);
        $(".modal-body").html(text);

        $(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm");
        if (size == 'large') {
            $(".modal-dialog").addClass("modal-lg");
        }
        if (size == 'small') {
            $(".modal-dialog").addClass("modal-sm");
        }

        $("#modal-btn-confirm").unbind('click').click(callBack).html(btn);
        $('#JF-model').modal('toggle');
    },
    toast_Info: function (message) {
        $().toastmessage('showSuccessToast', message);
    },
    toast_Warning: function (message) {
        $().toastmessage('showWarningToast', message);
    }
};

JF.string = {
    // String replace
    ReplaceAll: function (strSource, strFind, strRepl) {
        var str5 = new String(strSource);
        while (str5.indexOf(strFind) != -1) {
            str5 = str5.replace(strFind, strRepl);
        }
        return str5;
    }
};

JF.time = {
    //wait
    waitSecond: function (second) {
        var date = new Date();
        var curDate = null;
        second = second * 1000;
        do {
            curDate = new Date();
        }
        while (curDate - date < second);
    },
    generateUUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    secToString: function (second) {
        var hours = Math.floor(second / 3600);
        var minutes = Math.floor((second - (hours * 3600)) / 60);
        var seconds = second - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }
};

JF.tinyMCE = {
    init: function (id, width, height) {

        if (typeof tinymce == "undefined" || tinymce == null) return true;

        tinymce.init({
            selector: 'textarea#' + id,
            width: width,
            height: height,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            toolbar1: 'insertfile undo redo | fontsizeselect forecolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
            //image_advtab: true,
            menu: {},
            templates: [
                { title: 'Test template 1', content: 'Test 1' },
                { title: 'Test template 2', content: 'Test 2' }
            ],
            //content_css: [
            //    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
            //    '//www.tinymce.com/css/codepen.min.css'
            //]
        });
    }
};

JF.society = {
    fbShare: function (appid, caption, url, imageUrl, redirect_uri) {
        var winWidth = 680;
        var winHeight = 400;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        url = encodeURIComponent(url);
        imageUrl = encodeURIComponent(imageUrl);
        window.open('https://www.facebook.com/sharer/sharer.php?'
            + 'app_id=' + appid
            + '&u=' + url
            + '&display=popup'
            + '&ref=plugin'
            + '&src=share_button'
            //    window.open('https://www.facebook.com/dialog/share?'
            //            + 'app_id=' + appid
            //            + '&display=popup'
            //            + '&href=' + url
            //            + '&redirect_uri=' + location.href
            ,
            'ShaerToFacebook', 'width=' + winWidth + ', height=' + winHeight + ', top=' + winTop + ', left=' + winLeft + ', toolbar=0, status=0, resizable=0');
    },
    twitterShare: function (caption, url, tags) {
        var winWidth = 680;
        var winHeight = 400;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        url = encodeURIComponent(url);
        window.open('http://twitter.com/share?'
            + 'text=' + caption
            + '&url=' + url
            + '&hashtags=' + tags
            ,
            'ShaerToTwitter', 'width=' + winWidth + ', height=' + winHeight + ', top=' + winTop + ', left=' + winLeft + ', toolbar=0, status=0, resizable=0');
    }
};
