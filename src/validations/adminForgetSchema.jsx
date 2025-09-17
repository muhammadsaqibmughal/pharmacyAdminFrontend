import * as Yup from "yup";

const adminForgetSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default adminForgetSchema;
