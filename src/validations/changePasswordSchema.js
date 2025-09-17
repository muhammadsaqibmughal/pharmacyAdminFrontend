import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+[\]{}|\\:;"'<>,./~`=-]).{8,}$/;

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required"),

  newPassword: Yup.string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export default changePasswordSchema;
