export const tranValidation ={
    EMAIL_INCORRECT: "Email không hợp lệ",
    PASSWORD_INCORRECT: "Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường và ký tự đặc biệt",
    PASSWORD_CONFIRM_INCORRECT: "Nhập lại mật khẩu chưa chính xác",
    UPDATE_USERNAME: "Tên người dùng không hợp lệ",
    UPDATE_ADDRESS: "Địa chỉ không hợp lệ",
    UPDATE_PHONE: "Số điện thoại không hợp lệ"
};

export const tranErrors = {
    ACCOUNT_IN_USE: "Email đã tồn tại",
    ACCOUNT_NOT_ACTIVE: "Tài khoản đã tồn tại nhưng chưa xác thực, vui lòng kiểm tra email để hoàn thành việc đăng ký",
    TOKEN_NULL: "Token hết hiệu lực",
    LOGIN_FAILED: "Sai tài khoản hoặc mật khẩu",
    SERVER_ERR: "Server bảo trì, liên hệ quản trị viên để được hỗ trợ",
    AVATAR_TYPE: "Ảnh không hợp lệ, yêu cẩu PNG/JPG/JPEG",
    AVATAR_SIZE: "Size ảnh quá lớn, yêu cầu không quá 1 MB"
};

export const tranSuccess = {
    register_success: (userEmail) => { 
        return `Tài khoản <strong>${userEmail}</strong> đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản`;
    },
    ACCOUNT_ACTIVE: "Kích hoạt tài khoản thành công",
    LOGIN_SUCCESS: () => {
        return "Đăng nhập thành công";
    },
    LOGOUT_SUCCESS: "Đăng xuất thành công",
    INFO_UPDATE_SUCCESS: "Cập nhập thông tin người dùng thành công"
}; 

export const tranMail = {
    SUBJECT: "ASTRA: Xác thực tài khoản",
    TEMPLATE: (linkVerify) => {
        return `
            <h2>Chúc mừng bạn đăng ký thành công tài khoản trên ASTRA</h2>
            <h3>Vui lòng click nút bên dưới để hoàn thành việc đăng ký</h3>
            <br>
            <a href="${linkVerify}" target="_blank" style="text-decoration: none;"><button>Xác Thực<button></a>
        `;
    },
    SEND_FAILED: "Xảy ra lỗi trong quá trình gửi Mail, vui lòng liên hệ quản trị viên để được hỗ trợ"
};


