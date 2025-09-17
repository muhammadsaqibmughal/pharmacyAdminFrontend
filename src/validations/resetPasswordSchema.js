import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+[\]{}|\\:;"'<>,./~`=-]).{8,}$/;

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export default resetPasswordSchema;
