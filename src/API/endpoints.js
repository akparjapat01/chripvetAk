// -----------------------   MENTEE ENDPOINTS   --------------------------------

export const profile_Mentee = '/mentee/profile';

export const sendOTP_Mentee = '/mentee/otp';

export const verifyOTP_Mentee = '/mentee/otpverify';

export const login_Mentee = '/mentee/login';

export const register_Mentee = '/mentee/signup';

export const delete_Appointment_Mentee = "/mentee/deleteAppointment";

export const forgotPassword_Mentee = '/mentee/forgetpassword';

export const changePassword_Mentee = '/mentee/changePassword';

export const logout_Mentee = '/mentee/logout';

export const refreshToken_Mentee = '/mentee/refreshtoken';

export const getAvailbility_Mentee = '/mentee/getAvailabilityFromDate'; // get the list of current online mentors.

export const getAvailbilityFromId_Mentee = '/mentee/getAvailabilityFromId';

export const getMentorDetailsById_Mentee = '/mentee/getMentorDetailsById';

export const getAllFavourites_Mentee = '/mentee/getallFvourities';

export const update_Mentee = '/mentee/updateMentee';

export const bookAppointment_Mentee = '/mentee/bookAppointment';

export const getAllScheduledAppointment_Mentee =
  '/mentee/scheduledAppointments';

export const getAllMessages_Mentee = '/mentee/getAllMessages';

export const getAllCurrentMessage_Mentee = '/mentee/getChat';

export const sendChat_Mentee = '/mentee/chat';

export const agoraCallStart = '/mentee/startCall'; // ${booking_id}/publisher/uid/1

export const addToFavourite_Mentee = '/mentee/favouriteMentor';

export const editFavouriteMentor_Mentee = '/mentee/editFavouriteMentor';

export const cases_Mentee = '/mentee/allCases';

export const specialistList_Mentee = '/mentee/mentorSpecialist';

export const categoryList_Mentee = '/mentee/mentorCategory';

export const end_call_Mentee = '/mentee/endCall';

export const editAppointment_Mentee = '/mentee/editAppointment';

export const deleteAppointment_Mentee = '/mentee/deleteAppointment';

export const getAllQuestions_Mentee = '/mentee/getAllQuestions';

export const getQuestionById_Mentee = '/mentee/getQuestionById?id=2';

export const createResponse_Mentee = '/mentee/createResponse';

export const auto_debit_Mentee = "/mentee/autodebit";

// -----------------------   MENTOR ENDPOINTS   --------------------------------

export const profile_Mentor = '/mentor/profile';

export const sendOTP_Mentor = '/mentor/otp';

export const update_Mentor = '/mentor/updateMentor';

export const logout_Mentor = '/mentor/logout';

export const provideAvailability_Mentor = '/mentor/creatementoravailability';

export const updateAvailability_Mentor = '/mentor/updatementoravailability';

export const createSlots_Mentor = '/mentor/createslots';

export const updateSlots_Mentor = '/mentor/updateslots';

export const getAvailabilityById_Mentor = '/mentor/getallavailabilitybyId';

export const mentorAvailbility = '/mentor/getallavailabilitybyId';

export const booking_Mentor = '/mentor/bookings'; // booking_type = new / recent

export const scheduled_Mentor = '/mentor/schedule';

export const delete_Appointment_Mentor = "/mentor/deleteAppointment";

export const cases_Mentor = '/mentor/cases';

export const dateOverrider_Mentor = '/mentor/viewAvailableMentors';

export const noOfAvailable_Mentor = '/mentor/numberOfAvailableMentors';

export const availableMentors_Mentor = "/mentor/availableMentor";

export const changePassword_Mentor = '/mentor/changePassword';

export const forgotPassowrd_Mentor = '/mentor/forgetpassword';

export const deleteSlot_Mentor = '/mentor/deleteSlot';

// -----------------------   ADMIN ENDPOINTS   --------------------------------

export const getAllCategory = '/admin/getallcategory';

export const getAllCategoryById = '/admin/getCategoryById?id=1';

export const getAllSpecialist = '/admin/getAllSpecialist';

export const getAllSpecialistById = '/admin/getSpecialistByID?id=1';
