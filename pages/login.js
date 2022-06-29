import { BaseAuthLayout } from "../components/Auth/Base";
import { LoginForm } from "../components/Auth/Login";
import Link from "next/link";

const styles = {
    marginTop: 30,
    textAlign: "center",
};
export default function Login() {
    return (
        <div className="page-login">
            <BaseAuthLayout>
                <LoginForm />
            </BaseAuthLayout>
        </div>
    );
}