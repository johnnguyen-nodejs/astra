let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};

function updateUserInfo() {
    $("#input-change-avatar").bind("change", function() {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576; // 1MB

        if($.inArray(fileData.type, math) === -1) {
            alertify.notify("Ảnh không hợp lệ, yêu cẩu PNG/JPG/JPEG", "error", 7);
            $(this).val(null);
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("Size ảnh quá lớn, yêu cầu không quá 1 MB", "error", 7);
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
            alertify.notify("Trình duyệt không hỡ trợ file upload", "error", 7);     
        }
    });
    $("#input-change-username").bind("change", function() {
        let username = $(this).val();
        let regexUsername = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");

        if(!regexUsername.test(username) || username.length < 3 || username.length > 20 ) {
            alertify.notify("Tên người dùng không hợp lệ", "error", 7);
            $(this).val(originUserInfo.username);
            delete userInfo.username;
            return false;
        }

        userInfo.username = username;
    });
    $("#input-change-address").bind("change", function() {
        let address = $(this).val();
        if(address.length < 3 || address.length > 20) {
            alertify.notify("Địa chỉ người dùng không hợp lệ", "error", 7);
            $(this).val(originUserInfo.address);
            delete userInfo.address;
            return false;
        }
        userInfo.address = address;
    });
    $("#input-change-phone").bind("change", function() {
        let phone = $(this).val();
        let regexPhone = new RegExp("^(0)[0-9]{9-10}$");

        if(!regexPhone.test(phone)) {
            alertify.notify("Số điện thoại người dùng không hợp lệ", "error", 7);
            $(this).val(originUserInfo.phone);
            delete userInfo.phone;
            return false;
        }
        userInfo.phone = phone;
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
})