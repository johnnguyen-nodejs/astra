let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
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
        userInfo.username = $(this).val();
    });
    $("#input-change-address").bind("change", function() {
        userInfo.address = $(this).val();
    });
    $("#input-change-phone").bind("change", function() {
        userInfo.phone = $(this).val();
    });
};

$(document).ready(function() {
    updateUserInfo();
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    $("#btn-update-user-modal").bind("click", function(){
        if($.isEmptyObject(userInfo) && !userAvatar){
            alertify.notify("Thông tin cập nhập trống", "error", 7);
            return false;
        }
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
    });
    $("#btn-cancel-user-modal").bind("click", function(){
        userAvatar = null;
        userInfo = {};
        $("#user-modal-avatar").attr("src", originAvatarSrc);
    });
})