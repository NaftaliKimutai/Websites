
function isUrl(url) {

    var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!pattern.test(url))
        return false;
    else
        return true;
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
function fireAlert(data, successAlertClose = false) {


    try {
        data = JSON.parse(data);
    } catch (e) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            html: 'We have something wrong...',
        });
        return false;
    }

    if (data.status == 0 && successAlertClose) {
        Swal.fire({
            type: 'success',
            title: 'success!!!',
            html: data.message,
        });
        return true;
    } else if (data.status == 0 && successAlertClose === false) {
        return true;
    } else if (data.status == 2) {
        Swal.fire({
            type: 'info',
            html: data.message,
        });
        return true;
    } else {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            html: data.message,
        });
        return true;
    }
}
