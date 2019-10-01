let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};
let userUpdateWallet = {};

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
            $("#avatar-top-right").attr("src", result.imageSrc);
            $("#avatar-dashboard").attr("src", result.imageSrc);
            originAvatarSrc = result.imageSrc;
            $("#cancel-update-avatar").click();
            setTimeout(function() {
                $('.user-modal-alert-success').css('display', 'none');
              }, 3000);
        },
        error: function(error){
            //dislay error
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
            //reset image
            $("#cancel-update-avatar").click();
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
function callUpdateUserWallet() {
    $.ajax({
        url: "/user/update-wallet",
        type: "put",
        data: userUpdateWallet,
        success: function(result){
            $(".user-update-wallet-alert-success").find("span").text(result.message);
            $(".user-update-wallet-alert-success").css("display", "block");

            $("#btn-cancel-wallet").click();
            //logour after change password success
            setTimeout(function() {
                $('.user-update-wallet-alert-success').css('display', 'none');
              }, 3000);
        },
        error: function(error){
            //dislay error
            $(".user-update-wallet-alert-error").find("span").text(error.responseText);
            $(".user-update-wallet-alert-error").css("display", "block");
            //reset image
            $("#btn-cancel-wallet").click();
            setTimeout(function() {
                $('.user-update-wallet-alert-error').css('display', 'none');
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
    //update info
    $("#update-avatar-btn").bind("click", function(){
        //change avatar
        let fileData = $("#input-change-avatar").prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576; // 1MB

        if($.inArray(fileData.type, math) === -1) {
            alertify.notify("File not valid, require PNG/JPG/JPEG", "error", 5);
            $("#input-change-avatar").val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("File too large, require maxximum 1 MB", "error", 5);
            $("#input-change-avatar").val(null);
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
            alertify.notify("Browser not support this file", "error", 5);     
        }
        if(userAvatar){
            callUpdateUserAvatar();
        }
    });
    $("#cancel-update-avatar").bind("click", function(){
        userAvatar = null;
        $("#input-change-avatar").val(null);
        $("#user-modal-avatar").attr("src", originAvatarSrc);
    });
    $("#btn-update-user-modal").bind("click", function(){
        //change username
        let username = $("#input-change-username").val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);

        if(!regexUsername.test(username) || username < 3 ) {
            alertify.notify("Username not Valid", "error", 5);
            $("#input-change-username").val(originUserInfo.username);
            delete userInfo.username;
            return false;
        }
        userInfo.username = username;
        // change address
        let address = $("#input-change-address").val();
        if(address.length < 3 || address.length > 20) {
            alertify.notify("Address not Valid", "error", 5);
            $("#input-change-address").val(originUserInfo.address);
            delete userInfo.address;
            return false;
        }
        userInfo.address = address;
        //change phone
        let phone = $("#input-change-phone").val();
        let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);

        if(!regexPhone.test(phone)) {
            alertify.notify("Phone Numeber is not Valid", "error", 5);
            $("#input-change-phone").val(originUserInfo.phone);
            delete userInfo.phone;
            return false;
        }
        userInfo.phone = phone;

        if($.isEmptyObject(userInfo) && !userAvatar){
            alertify.notify("Data empty", "error", 5);
            return false;
        }

        if(!$.isEmptyObject(userInfo)){
            callUpdateUserInfo();
        }
        
    });
    $("#btn-cancel-user-modal").bind("click", function(){
        userInfo = {};
        $("#input-change-username").val(originUserInfo.username);
        $("#input-change-address").val(originUserInfo.address);
        $("#input-change-phone").val(originUserInfo.phone);
    });
    //update password
    $("#btn-update-password-modal").bind("click", function(){
        let currentPassword = $("#input-change-current-password").val();
        let newPassword = $("#input-change-new-password").val();
        let confirmNewPassword = $("#input-change-confirm-new-password").val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if(!regexPassword.test(currentPassword)) {
            alertify.notify("Password is not Valid", "error", 5);
            $("#input-change-current-password").val(null);
            delete userUpdatePassword.currentPassword;
            return false;
        }
        userUpdatePassword.newPassword = newPassword;
        if(!regexPassword.test(newPassword)) {
            alertify.notify("Password is not Valid", "error", 5);
            $("#input-change-new-password").val(null);
            delete userUpdatePassword.newPassword;
            return false;
        }
        userUpdatePassword.currentPassword = currentPassword;
        if(!userUpdatePassword.newPassword) {
            alertify.notify("Please Enter New Password", "error", 5);
            $("#input-change-confirm-new-password").val(null);
            delete userUpdatePassword.confirmNewPassword;
            return false;
        }
        if(confirmNewPassword !== userUpdatePassword.newPassword) {
            alertify.notify("Password not match!", "error", 5);
            $("#input-change-confirm-new-password").val(null);
            delete userUpdatePassword.confirmNewPassword;
            return false;
        }
        userUpdatePassword.confirmNewPassword = confirmNewPassword;
        if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword) {
            alertify.notify("Data update Password Empty", "error", 5);
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
    //update wallet
    $("#btn-update-wallet").bind("click", function(){
        let password = $("#input-current-password").val();
        let wallet = $("#input-update-wallet").val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
        let regexWallet = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{32,}$/);
        if(!regexPassword.test(password)) {
            alertify.notify("Password is not Valid", "error", 5);
            $("#input-current-password").val(null);
            delete userUpdateWallet.password;
            return false;
        }
        if(!regexWallet.test(wallet)) {
            alertify.notify("Wallet Invalid", "error", 5);
            $("#input-update-wallet").val(null);
            delete userUpdateWallet.wallet;
            return false;
        }
        userUpdateWallet.password = password;
        userUpdateWallet.wallet = wallet;
        if(!userUpdateWallet.password || !userUpdateWallet.wallet) {
            alertify.notify("data update wallet empty", "error", 5);
            return false;
        } 
        callUpdateUserWallet();
    });
    $("#btn-cancel-wallet").bind("click", function(){
        userUpdateWallet = {};
        $("#input-current-password").val(null);
        $("#input-update-wallet").val(null);
    });
})