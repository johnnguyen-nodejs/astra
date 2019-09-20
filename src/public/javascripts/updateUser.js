let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};

function callLogout(){
    let timerInterval;
    Swal.fire({
        position: "top-end",
        title: "Log Out After 5s",
        html: "Time: <strong></strong>",
        timer: 5000,
        onBeforeOpen: ()=> {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimeLeft() / 1000);   
            }, 1000);
        },
        onClose: ()=> {
            clearInterval(timerInterval);
        }
    }).then((result)=> {
        $.get("/logout", function(){
            location.reload()
        })
    });
}

function updateUserInfo() {
    $("#input-change-avatar").bind("change", function() {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576; // 1MB

        if($.inArray(fileData.type, math) === -1) {
            alertify.notify("File not valid, require PNG/JPG/JPEG", "error", 7);
            $(this).val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("File too large, require maxximum 1 MB", "error", 7);
            $(this).val(null);
            return false;
        }
        if(typeof(FileReader) != "undefined"){
            let imagePreview = $("#image-edit-profile");
            imagePreview.empty();
            let fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "class": "avatar img-circle",
                    "id": "user-modal-avatar",
                    "alt": "avatar"
                }).appendTo(imagePreview);
            };
            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append("avatar", fileData);
            userAvatar = formData;
        } else {
            alertify.notify("Browser not support this file", "error", 7);     
        }
    });
    $("#input-change-username").bind("change", function() {
        let username = $(this).val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);

        if(!regexUsername.test(username) || username.length < 3 || username.length > 20 ) {
            alertify.notify("Username not Valid", "error", 7);
            $(this).val(originUserInfo.username);
            delete userInfo.username;
            return false;
        }

        userInfo.username = username;
    });
    $("#input-change-address").bind("change", function() {
        let address = $(this).val();
        if(address.length < 3 || address.length > 20) {
            alertify.notify("Address not Valid", "error", 7);
            $(this).val(originUserInfo.address);
            delete userInfo.address;
            return false;
        }
        userInfo.address = address;
    });
    $("#input-change-phone").bind("change", function() {
        let phone = $(this).val();
        let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);

        if(!regexPhone.test(phone)) {
            alertify.notify("Phone Numeber is not Valid", "error", 7);
            $(this).val(originUserInfo.phone);
            delete userInfo.phone;
            return false;
        }
        userInfo.phone = phone;
    });
    $("#input-change-current-password").bind("change", function() {
        let currentPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if(!regexPassword.test(currentPassword)) {
            alertify.notify("Password is not Valid", "error", 7);
            $(this).val(null);
            delete userUpdatePassword.currentPassword;
            return false;
        }
        userUpdatePassword.currentPassword = currentPassword;
    });
    $("#input-change-new-password").bind("change", function() {
        let newPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if(!regexPassword.test(newPassword)) {
            alertify.notify("Password is not Valid", "error", 7);
            $(this).val(null);
            delete userUpdatePassword.newPassword;
            return false;
        }
        userUpdatePassword.newPassword = newPassword;
    });
    $("#input-change-confirm-new-password").bind("change", function() {
        let confirmNewPassword = $(this).val();

        if(!userUpdatePassword.newPassword) {
            alertify.notify("Please Enter New Password", "error", 7);
            $(this).val(null);
            delete userUpdatePassword.confirmNewPassword;
            return false;
        }
        if(confirmNewPassword !== userUpdatePassword.newPassword) {
            alertify.notify("Password not match!", "error", 7);
            $(this).val(null);
            delete userUpdatePassword.confirmNewPassword;
            return false;
        }
        userUpdatePassword.confirmNewPassword = confirmNewPassword;
    });
};

function callUpdateUserAvatar() {
    $.ajax({
        url: "/user/update-avatar",
        type: "put",
        cache: false,
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function(result){
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");
            $("#navbar-avatar").attr("src", result.imageSrc);
            originAvatarSrc = result.imageSrc;
            $("#btn-cancel-user-modal").click();
            setTimeout(function() {
                $('.user-modal-alert-success').css('display', 'none');
              }, 3000);
        },
        error: function(error){
            //dislay error
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
            //reset image
            $("#btn-cancel-user-modal").click();
            setTimeout(function() {
                $('.user-modal-alert-error').css('display', 'none');
              }, 3000);
        }
    });
}
function callUpdateUserInfo() {
    $.ajax({
        url: "/user/update-info",
        type: "put",
        data: userInfo,
        success: function(result){
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");
            originUserInfo = Object.assign(originUserInfo, userInfo);
            $("#navbar-username").text(originUserInfo.username);
            $("#btn-cancel-user-modal").click();
            setTimeout(function() {
                $('.user-modal-alert-success').css('display', 'none');
              }, 3000);
        },
        error: function(error){
            //dislay error
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
            //reset image
            $("#btn-cancel-user-modal").click();
            setTimeout(function() {
                $('.user-modal-alert-error').css('display', 'none');
              }, 3000);
        }
    });
}
function callUpdateUserPassword() {
    $.ajax({
        url: "/user/update-password",
        type: "put",
        data: userUpdatePassword,
        success: function(result){
            $(".user-modal-password-alert-success").find("span").text(result.message);
            $(".user-modal-password-alert-success").css("display", "block");

            $("#btn-cancel-password-modal").click();
            //logour after change password success
            callLogout();
            setTimeout(function() {
                $('.user-modal-password-alert-success').css('display', 'none');
              }, 3000);
        },
        error: function(error){
            //dislay error
            $(".user-modal-password-alert-error").find("span").text(error.responseText);
            $(".user-modal-password-alert-error").css("display", "block");
            //reset image
            $("#btn-cancel-password-modal").click();
            setTimeout(function() {
                $('.user-modal-password-alert-error').css('display', 'none');
              }, 3000);
        }
    });
}

$(document).ready(function() {
    
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    originUserInfo = {
        username: $("#input-change-username").val(),
        address: $("#input-change-address").val(),
        phone: $("#input-change-phone").val(),
    };

    updateUserInfo();
    $("#btn-update-user-modal").bind("click", function(){
        if($.isEmptyObject(userInfo) && !userAvatar){
            alertify.notify("Thông tin cập nhập trống", "error", 7);
            return false;
        }
        if(userAvatar){
            callUpdateUserAvatar();
        }
        if(!$.isEmptyObject(userInfo)){
            callUpdateUserInfo();
        }
        
    });
    $("#btn-cancel-user-modal").bind("click", function(){
        userAvatar = null;
        userInfo = {};
        $("#input-change-avatar").val(null);
        $("#user-modal-avatar").attr("src", originAvatarSrc);

        $("#input-change-username").val(originUserInfo.username);
        $("#input-change-address").val(originUserInfo.address);
        $("#input-change-phone").val(originUserInfo.phone);
    });
    $("#btn-update-password-modal").bind("click", function(){
        if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword) {
            alertify.notify("Thông tin cập nhập mật khẩu chưa đầy đủ", "error", 7);
            return false;
        }
         
        callUpdateUserPassword();
        
    });
    $("#btn-cancel-password-modal").bind("click", function(){
        userUpdatePassword = {};
        $("#input-change-current-password").val(null);
        $("#input-change-new-password").val(null);
        $("#input-change-confirm-new-password").val(null);
    });
})