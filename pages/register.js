import { BaseAuthLayout } from "../components/Auth/Base";
import { RegisterForm } from "../components/Auth/Register";
import Link from "next/link";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

const Register = () => {
  return (
    <div className="page-cadastro">
      <BaseAuthLayout>
        <RegisterForm />
      </BaseAuthLayout>
    </div>
  );
};

export default Register;
