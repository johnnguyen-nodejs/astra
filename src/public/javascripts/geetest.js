
let handler = function (captchaObj) {
    captchaObj.onReady(function () {
        $("#wait").hide();
    }).onSuccess( ()=> {
        var result = captchaObj.getValidate();
        if (!result) {
            alertify.notify("Verify error", "error", 5);
            return false;
        }
        $.ajax({
                url: '/geetest',
                type: 'POST',
                dataType: 'json',
                data: {
                    email: $("email-login-check").val(),
                    password: $("password-login-check").val(),
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode
                },
                success: function (data) {
                    if (data.status === 'success') {
                        return true;
                    } else if (data.status === 'fail') {
                        alertify.notify("Verify Error", "error", 5);
                        captchaObj.reset();
                    }
                }
            });
    });
    
    $('#check-login-geetest-btn').click(()=> {
        captchaObj.verify();
    })
    
};

$.ajax({
    url: "geetest?t=" + (new Date()).getTime(),
    type: "get",
    dataType: "json",
    success: function (data) {
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            timeout: '5000',
            product: "bind",
            width: "300px",
            lang: "en"
        }, handler);
    }
});
