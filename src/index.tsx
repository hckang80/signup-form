// tslint:disable-next-line:no-reference
/// <reference path="index.d.ts"/>

import * as m from "mithril";
import * as Stream from "mithril/stream";
import Form, { IValue } from "./form";

class App implements m.ClassComponent<{}> {
  private email: IValue<string>;
  private password: IValue<string>;
  private passwordConfirm: IValue<string>;
  private userName: IValue<string>;
  private phoneNumber: IValue<string>;
  private isInstagram: IValue<string>;
  private instagramAccount: IValue<string>;
  private isValid: Stream.Stream<boolean>;

  public oninit() {
    this.email = Form.Value("");
    this.password = Form.Value("");
    this.passwordConfirm = Form.Value("");
    this.userName = Form.Value("");
    this.phoneNumber = Form.Value("");
    this.isInstagram = Form.Value("");
    this.instagramAccount = Form.Value("");

    this.password.map(password => {
      if (password.length < 6) {
        this.password.error("password must be at least 6 characters");
      } else if (!/[A-Z]/.test(password)) {
        this.password.error(
          "password must contain 1 or more uppercase characters"
        );
      } else {
        this.password.error(null);
      }
    });

    Stream.merge([this.password, this.passwordConfirm]).map(
      ([password, passwordConfirm]) => {
        if (password !== passwordConfirm) {
          this.passwordConfirm.error("password confirm must equal to password");
        } else {
          this.passwordConfirm.error(null);
        }
      }
    );

    this.isInstagram.map(isAccount => {
      if (!this.instagramAccount() && isAccount === "보유") {
        this.instagramAccount.error("Input a valid account");
      } else {
        this.instagramAccount.error(null);
      }
    });

    this.instagramAccount.map(account => {
      if (!account && this.isInstagram() === "보유") {
        this.instagramAccount.error("Input a valid account");
      } else {
        this.instagramAccount.error(null);
      }
    });

    this.isValid = Stream.merge([
      this.email.isValid,
      this.password.isValid,
      this.passwordConfirm.isValid,
      this.userName.isValid,
      this.phoneNumber.isValid,
      this.isInstagram.isValid,
      this.instagramAccount.isValid
    ]).map(
      ([
        emailValid,
        passwordValid,
        passwordConfirmValid,
        userNameValid,
        phoneNumberValid,
        isInstagramValid,
        instagramAccountValid
      ]) => {
        return (
          emailValid &&
          passwordValid &&
          passwordConfirmValid &&
          userNameValid &&
          phoneNumberValid &&
          isInstagramValid &&
          instagramAccountValid
        );
      }
    );
  }

  public view() {
    return (
      <div class="container">
        <Form onsubmit={() => this.onsubmit()}>
          <Form.Email
            label="Email"
            value={this.email}
            placeholder="example@croquis.com"
          />
          <Form.Password
            label="Password"
            value={this.password}
            placeholder=""
          />
          <Form.Password
            label="Confirm Password"
            value={this.passwordConfirm}
            placeholder=""
          />
          <Form.TextField
            label="User Name"
            value={this.userName}
            placeholder=""
          />
          <Form.PhoneField
            label="Phone"
            value={this.phoneNumber}
            placeholder=""
          />
          <Form.RadioButton
            label="Instagram"
            value={this.isInstagram}
            radios={["미보유", "보유"]}
            name="isInstagram"
          />
          {this.isInstagram() === "보유" && (
            <Form.InstagramAccount
              label="Instagram Account"
              value={this.instagramAccount}
              placeholder=""
            />
          )}
          <Form.Submit label="Sign up" disabled={!this.isValid()} />
        </Form>
      </div>
    );
  }

  private onsubmit() {
    alert(
      `sign up with email=${this.email()} password=${this.password()} user name=${this.userName()} phone number=${this.phoneNumber()} instagram=${
        this.isInstagram
      } account=${this.instagramAccount()}`
    );
  }
}

m.mount(document.getElementById("app")!, App);
