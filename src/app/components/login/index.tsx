import { Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { LoginRender } from "./renderers";
import { ErrorPopUp } from "../../errors";
import { UserService, WalletService } from "../../../services";

type State = {
  email: string;
  password: string;
  loading: boolean;
  toggleShow: boolean;
};

// Wrapper component to provide router hooks
const LoginWrapper = () => {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
};

class Login extends Component<{ navigate: any }, State> {
  public constructor(props: any) {
    super(props);

    this.login = this.login.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.setToggle = this.setToggle.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      toggleShow: false,
    };
  }

  public render(): ReactNode {
    return LoginRender(this);
  }

  public onEmail(event: any) {
    this.setState({ email: event.target.value });
  }

  public onPassword(event: any) {
    this.setState({ password: event.target.value });
  }

  public setToggle() {
    this.setState({ toggleShow: !this.state.toggleShow });
  }

  public async forgotPassword() {
    this.setState({ loading: false });
    this.props.navigate("/forgotten-password");
  }

  public async login() {
    try {
      this.setState({ loading: true });

      const loginData = await UserService.login(
        this.state.email,
        this.state.password,
        localStorage.getItem("refferal") === "true" ? true : false
      );
      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("encToken", loginData.encToken);

        const user = await UserService.getUserDetails(loginData.token, false);
        // Skip wallet recovery check for now since we're using mock data
        // if (await this.needToRecoverWallet(user.wallet.json)) {
        //     return this.props.navigate('/wallet-recovery', {
        //         state: { newPassword: this.state.password }
        //     })
        // }

        // check user if has referral by post code
        if (localStorage.getItem("refferal")) {
          ErrorPopUp.sucsess("Congratulations you've earned 20 CAPs.");
          localStorage.setItem("refferal", "false");
        }

        localStorage.setItem("allowed", "true");
        return this.props.navigate("/dashboard");
      }

      await this.registerOnFirstLogin();
    } catch (error) {
      this.setState({ loading: false });

      // console.log(error)
      ErrorPopUp.show(
        "Invalid email or password. Ensure that you do not have a blank space at the end of the email address or a capital within it. <br><br> If you do not yet have a wallet please click on the Register Here button"
      );
    }
  }

  private async needToRecoverWallet(wallet: string): Promise<boolean> {
    try {
      await WalletService.fromEncryptedJson(wallet, this.state.password);
      return false;
    } catch (error) {
      return true;
    }
  }

  private async registerOnFirstLogin() {
    const result = await UserService.register(
      this.state.email,
      this.state.password
    );
    localStorage.setItem("token", result.tokenData.token);
    localStorage.setItem("encToken", result.tokenData.encToken);
    localStorage.setItem("allowed", "true");

    this.props.navigate("/mnemonic", {
      state: { mnemonic: result.mnemonic },
    });
  }
}

export default LoginWrapper;
