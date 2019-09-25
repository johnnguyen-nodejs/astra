export const tranValidation ={
    EMAIL_INCORRECT: "Email Invalid",
    WALLET_INCORRECT: "ERC20 WALLET ADDRESS Invalid",
    REFFERAL_LINK_INCORRECT: "Refferal Link Invalid",
    PASSWORD_INCORRECT: "Password must be eight characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    PASSWORD_CONFIRM_INCORRECT: "Password and confirm password does not match",
    UPDATE_USERNAME: "Username invalid",
    UPDATE_ADDRESS: "Address Invalid",
    UPDATE_PHONE: "Phone Number Invalid"
};

export const tranErrors = {
    ACCOUNT_IN_USE: "Email Invalid or Exist",
    ACCOUNT_NOT_ACTIVE: "Account does not Active, Please check mail to Active",
    TOKEN_NULL: "Token Invalid or expired",
    LOGIN_FAILED: "Email or Password Incorrect",
    SERVER_ERR: "Server maintain, please contact support",
    AVATAR_TYPE: "File Invalid, require PNG/JPG/JPEG",
    AVATAR_SIZE: "File too large, Require maximum 1 MB",
    ACCOUNT_NOT_EXIST: "Account does not exist",
    CHECK_CURRENT_PASS_FAILED: "Current password Incorrect",
    WALLET_ALREADY_UPDATED: "Your ERC20 Wallet Updated, can't update again"
};

export const tranSuccess = {
    register_success: (userEmail) => { 
        return `Email <strong>${userEmail}</strong> register successly, Please check your email to active account`;
    },
    ACCOUNT_ACTIVE: "Active Account Success",
    LOGIN_SUCCESS: () => {
        return "Sign In Success";
    },
    LOGOUT_SUCCESS: "log Out Success",
    INFO_UPDATE_SUCCESS: "Update Info Success",
    PASS_UPDATE_SUCCESS: "Update Password Success",
    WALLET_UPDATE_SUCCESS: "Update Wallet Success"
}; 

export const tranMail = {
    SUBJECT: "ASTRA: Authenticate Account",
    TEMPLATE: (linkVerify) => {
        return `
            <h2>Chúc mừng bạn đăng ký thành công tài khoản trên ASTRA</h2>
            <h3>Vui lòng click nút bên dưới để hoàn thành việc đăng ký</h3>
            <br>
            <a href="${linkVerify}" target="_blank" style="text-decoration: none;"><button>Xác Thực<button></a>
        `;
    },
    SEND_FAILED: "Send Email process Error, please Contact Support"
};


