const BASE_URL = 'http://localhost:4000/api/v1'


export const endpoints = {
    GET_PROFILE : BASE_URL + '/profile/getUserDetails',
    LOGIN : BASE_URL + '/auth/login',
    SIGNUP : BASE_URL + '/auth/signup',
    UPDATE_PASSWORD : BASE_URL + '/auth/changePassword',
    SENDOTP : BASE_URL + '/auth/sendotp',
    CREATE_RESET_TOKEN : BASE_URL + '/auth/createResetToken',
    RESET_PASSWORD : BASE_URL + '/auth/resetPassword',
    GET_JOBS: BASE_URL + '/job/getJobs',
    GET_LATEST_JOBS : BASE_URL + '/job/getLatestJobs',
    UPLOAD_PROFILE_PICTURE: BASE_URL + '/profile/updateProfilePicture',
    DELETE_ACCOUNT : BASE_URL + '/profile/deleteProfile',
    CTC_MAILS : BASE_URL + '/students/getAllStudents',
    ALL_PROFILE : BASE_URL + '/profile/getUsers',
    JOB : BASE_URL + '/job/getJob',
    UPDATE_PROFILE : BASE_URL + '/profile/updateProfile',
    CREATE_JOB : BASE_URL + '/job/createJob',
    DELETE_JOB : BASE_URL + '/job/deleteJob',
    APPLY_JOB: BASE_URL + '/application/createApplication',
    INITIATE_ORDER : BASE_URL + '/payment/createOrder',
    VERIFY_PAYMENT : BASE_URL + '/payment/verifyPayment',
    PAYMENT_SUCCESS_EMAIL : BASE_URL + '/payment/sendEmail',
    SEND_EMAIL : BASE_URL + '/students/mail'
}
