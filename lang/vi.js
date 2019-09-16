export const tranValidation ={
    EMAIL_INCORRECT: "Email không hợp lệ",
    PASSWORD_INCORRECT: "Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường và ký tự đặc biệt",
    PASSWORD_CONFIRM_INCORRECT: "Nhập lại mật khẩu chưa chính xác"
};

export const tranErrors = {
    ACCOUNT_IN_USE: "Email đã tồn tại",
    ACCOUNT_NOT_ACTIVE: "Tài khoản đã tồn tại nhưng chưa xác thực, vui lòng kiểm tra email để hoàn thành việc đăng ký"
};

export const tranSuccess = {
    register_success: (userEmail) => { 
        return `Tài khoản <strong>${userEmail}</strong> đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản`;
    }
}; 

