(function (win) {
    $(function () {
        class ExcelToJSON {
            parseExcel = function (file) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
    
                    var sheetName = workbook.SheetNames[0];
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var trimmedXL_row_object = XL_row_object.map(function(row) {
                        var trimmedRow = {};
                        Object.keys(row).forEach(function(key) {
                            var trimmedKey = key.trim();
                            trimmedRow[trimmedKey] = String(row[key]).trim();
                        });
                        return trimmedRow;
                    });
                    // console.log(trimmedXL_row_object);
                    var json_object = JSON.stringify(trimmedXL_row_object);

                    $('#excelJson').val(json_object);
                };
    
                reader.onerror = function (ex) {
                    console.log(ex);
                };
    
                reader.readAsBinaryString(file);
            };
        };

        $("#excelFile").change(function () {
            var files = $("#excelFile").prop('files'); // FileList object
            var xl2json = new ExcelToJSON();
            xl2json.parseExcel(files[0]);
        });

        $(".btn_img").click(function () {
            var j = RowJSON($(this));
            $(".imagePreview").each(function () {
                var imageView = $(this);
                var name = imageView.attr('name');
                if (typeof j[name] != 'undefined' && j[name].length > 0) {
                    $("#imgView .modal-title").text(j.name);
                    imageView.attr("src", j[name]);
                    imageView.attr("alt", j.name);
                    imageView.show();
                } else {
                    imageView.hide();
                }
            });
        });

        $(".btn_link").click(function () {
            var j = RowJSON($(this));
            $('#urlView a').text(j.url);
            $('#urlView a').attr("href", j.url);
        });

        $("#btn_add").click(function () {
            ResetPlusForm();
        });

        // $(".btn_edit").click(function () {
        //     var j = RowJSON($(this));
        //     ResetForm(j.id, j.name, j.gid, j.url);
        // });
        $(".btn_plusgameedit").click(function () {
            var j = RowJSON($(this));
            var Desc = getDesc(j);
            var DescTitle = getDescTitle(j);
            if (Desc == false) {
                ResetPlusForm(j.id);
                return;
            }

            //console.log(j.media);

            ResetJsonplusgameForm(j, j.id, j.name, j.gid, j.type, j.eventtype, Desc, j.youtube, j.linkedin, j.promopack, DescTitle, j.scheduleTime, j.label);
        });


        function getDesc(j) {

            var checked = $('[name=imgLang]:checked');
            var jsonDesc = JSON.parse(j.despression);

            if (!jsonDesc.hasOwnProperty(checked.val())) {
                return false;
            }

            return jsonDesc[checked.val()];
        }

        function getDescTitle(j) {

            var checked = $('[name=imgLang]:checked');
            var jsonDesc = JSON.parse(j.descTitle);

            if (!jsonDesc.hasOwnProperty(checked.val())) {
                return false;
            }

            return jsonDesc[checked.val()];
        }

        // $('input[type="radio"]').on('ifChecked', function () {
        //     var checked = $('[name=imgLang]:checked')

        // });
        // var getAllDespression = function () {
        //     var url = "getAllDespression?gid=" + $("#searchBanUerId").val();
        //     $.ajax(url, {
        //         success: function (data) {
        //             var banData = JSON.parse(data);
        //             for (var i in banData) {
        //                 var result = banData[i];
        //                 var account = result['account'];
        //                 var apiId = result['apiId'];
        //                 var aid = result['aid'];
        //                 var nickname = result['nickname'];
        //                 var id = result['id'];
        //                 buildRow(account, apiId, aid, nickname, id);

        //             }
        //         }
        //     });

        // };
        $(".btn_del").click(function () {

            var j = RowJSON($(this));
            $("#delete [name='id']").val(j.id);
            $("#delete [name='position']").val(j.pos);
        });

        $(".btn_do_inactive").click(function () {
            var j = RowJSON($(this));
            $('#changeMaintainActive [name=id]').val(j.id);
            $('#changeMaintainActive [name=active]').val(0);
            $('#changeMaintainActive').submit();
        });

        $(".btn_pos").click(function () {
            var j = RowJSON($(this));
            $('#pos [name=id]').val(j.id);
            $('#pos [name=position]').val(j.pos);
            $('#pos [name=nowPosition]').val(j.pos);
        });

        $(".btn_do_active").click(function () {
            var j = RowJSON($(this));
            $('#changeMaintainActive [name=id]').val(j.id);
            $('#changeMaintainActive [name=active]').val(1);
            $('#changeMaintainActive').submit();
        });

        $('#keyword').keypress(function (e) {
            if (e.which == 13) {
                $("#btn_search").trigger("click");
                return false;
            }
        });
        $("#btn_search").click(function () {
            var searchUrl = $(this).attr("action");
            var keyword = $("#keyword").val();
            
            location.href = searchUrl + '0/' + keyword;
        });

        $("#select_page").change(function () {
            var self = $(this);
            var keyword = $("#keyword").val();
            var url = self.attr("action") + self.val();
            if (keyword) {
                url += '/' + keyword;
            }
            location.href = url;
        });

        $(".btn_page").click(function () {
            location.href = $(this).attr("action");
        });

        $("#form form").submit(function (event) {

            var name = $("#formName").val();
            var gid = $("#formGameId").val();

            if (name === '')
                $("#formNameMsg").show();
            if (gid < 0)
                $("#formGameIdMsg").show();

            if (name === '' || gid < 0)
                event.preventDefault();
        });

        $('input[type="radio"]').on('ifChecked', function () {
            var radioValue = this.value;
            $('.uploadImageFile').each(function () {
                var fileField = $(this);
                var id = fileField.attr('id');
                if (('image' + radioValue) == id) {
                    $('#' + id).show();
                } else {
                    $('#' + id).hide();
                }
            });
        });
        $('input[type="radio"]').on('ifChecked', function () {
            var radioValue = this.value;
            $('.uploadIntroGameFile').each(function () {
                var fileField = $(this);
                var id = fileField.attr('id');
                // console.log(radioValue, id);
                if (('introGmae' + radioValue) == id) {
                    $('#' + id).show();
                } else {
                    $('#' + id).hide();
                }
            });
        });
        $('input[type="radio"]').on('ifChecked', function () {
            var radioValue = this.value;
            $('.uploadBackgroundImageFile').each(function () {
                var fileField = $(this);
                var id = fileField.attr('id');
                if (('backgroundImg' + radioValue) == id) {
                    $('#' + id).show();
                } else {
                    $('#' + id).hide();
                }
            });
        });
        $('input[type="radio"]').on('ifChecked', function () {
            var radioValue = this.value;
            $('.uploadDescImageFile').each(function () {
                var fileField = $(this);
                var id = fileField.attr('id');
                for (let i = 1; i <= 5; i++) {
                    document.getElementById(id).style.display = 'none';
                }
                for (let i = 1; i <= 5; i++) {
                    if (('descImage' + '_' + radioValue + '_' + i) == id) {
                        document.getElementById(id).style.display = '';
                    }
                }
            });

        });
        $('input[type="radio"]').on('ifChecked', function () {
            var radioValue = this.value;
            $('.descTitle').each(function () {
                var fileField = $(this);
                var id = fileField.attr('id');
                for (let i = 1; i <= 5; i++) {
                    document.getElementById(id).style.display = 'none';
                }
                for (let i = 1; i <= 5; i++) {
                    if (('descTitle' + '_' + radioValue + '_' + i) == id) {
                        document.getElementById(id).style.display = '';
                    }
                }
            });

        });
        $('input[name="imgLang"]').on('ifChecked', function () {
            var checked = $('[name=imgLang]:checked')
            var formValue = $("#form [name='rowjson']").val();
             
            if (formValue == null || formValue.length == 0) {
                return;
            }
            formValue = JSON.parse(formValue);
            var desc = getDesc(formValue);
            if (desc == false) {
                ResetPlusForm(formValue.id);
                return;
            }
            var DescTitle = getDescTitle(formValue);
            ResetJsonplusgameForm(formValue, formValue.id, formValue.name, formValue.gid, formValue.type, formValue.eventtype, desc, formValue.media, DescTitle, formValue.scheduleTime, formValue.label);

        });

        $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
        });

        $('.date-picker').daterangepicker({
            alwaysShowCalendars: true,
            timePicker: true,
            timePicker24Hour: true,
            autoApply: true,
            locale: {
                "format": 'YYYY-MM-DD HH:mm:ss'
            },
            singleDatePicker: true,
        });
    });

    function RowJSON(ele) {
        return JSON.parse(ele.parent().attr("row"));
    }
    function ResetPlusForm(id = '') {
        $("#form [name='datetime']").val('');
        $("#form [name='multiple']").val('');
        $("#form [name='feature']").val('');
        $("#form [name='despression']").val('');
        $("#form [name='platform']").val('');
        $("#form [name='language']").val('');
        $("#form [name='eventtype']").val('');
        $("#form [name='paylines']").val('');

        $("#form [name='id']").val(id);
        $("#form [name='name']").val('');
        $("#form [name='gid']").val('');
        $("#form [name='type']").val('');
        $("#form [name='label']").val('');
        var scheduleTime = $("#defaultScheduleTime").val();
        $("#form [name='scheduleTime']").val(scheduleTime);
        $("#form [name='youtube']").val('');
        $("#form [name='linkedin']").val('');
        $("#form [name='promopack']").val('');
    }
    function ResetJsonplusgameForm(j, id, name, gid, type, eventtype, Desc, youtube, linkedin, promopack, DescTitle, scheduleTime, label) {
        $("#form [name='rowjson']").val(JSON.stringify(j));
        ResetplusgameForm(id, name, gid, type, eventtype, Desc, youtube, linkedin, promopack, DescTitle, scheduleTime, label);
    }
    function ResetplusgameForm(id, name, gid, type, eventtype, Desc, youtube, linkedin, promopack, DescTitle, scheduleTime, label) {
        var lang = $('[name=imgLang]:checked').val();
        
        $("#form [name='datetime']").val(Desc['updatetime']);
        $("#form [name='multiple']").val(Desc['max-multiple']);
        $("#form [name='feature']").val(Desc['game-feature']);
        $("#form [name='despression']").val(Desc['despression']);
        $("#form [name='platform']").val(Desc['support-platform']);
        $("#form [name='language']").val(Desc['support-language']);
        $("#form [name='volatility']").val(Desc['volatility']);
        $("#form [name='paylines']").val(Desc['paylines']);
        $("#form [name='eventtype']").val(eventtype);
        $("#form [name='volatility']").val(Desc['volatility']);
        $("#form [name='rotate']").val(Desc['rotate']);
        $("#form [name='id']").val(id);
        $("#form [name='name']").val(Desc['game-name']);
        $("#form [name='gid']").val(gid);
        $("#form [name='type']").val(type);
        $("#form [name='label']").val(label);
        $("#form [name='scheduleTime']").val(scheduleTime);
        $("#form [name='youtube']").val(youtube);
        $("#form [name='linkedin']").val(linkedin);
        $("#form [name='promopack']").val(promopack);
        for (let i = 1; i <= 5; i++) {
            $("#form [name='descTitle_" + lang + "_" + i + "']").val(DescTitle[i]);
        }
    }

    var games = {
        setAction: function (act, title) {
            $("#form [name='action']").val(act);
            $("#form .modal-title").text(title);
        }
    };

    win.GamesHandler = games;

})(window);
