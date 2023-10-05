import LoginImage from "../assets/img/business-growth.png";
import Logo from "../assets/img/logo.png";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: ChildrenProps) {
  return (
    <div className="login">
      <div className="login__left">
        <img src={Logo} className="login__logo" />
        {children}
      </div>
      <img src={LoginImage} className="login__right" />
    </div>
  );
}
