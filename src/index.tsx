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
  private numberOfPhonesOwned: IValue<string>;
  private isValid: Stream.Stream<boolean>;

  private isValidInstagram() {
    this.instagramAccount.error(null);
    if (this.isInstagram() === "보유") {
      if (!this.instagramAccount()) {
        this.instagramAccount.error("인스타그램 계정을 반드시 입력해 주세요.");
      } else if (!/^[a-z]+[a-z0-9]/g.test(this.instagramAccount())) {
        this.instagramAccount.error("형식이 올바르지 않습니다.");
      }
    }
  }

  public oninit() {
    this.email = Form.Value("");
    this.password = Form.Value("");
    this.passwordConfirm = Form.Value("");
    this.userName = Form.Value("");
    this.phoneNumber = Form.Value("");
    this.isInstagram = Form.Value("");
    this.instagramAccount = Form.Value("");
    this.numberOfPhonesOwned = Form.Value("0");

    this.password.map(password => {
      this.password.error(null);
      if (password.length < 6) {
        this.password.error("비밀번호는 6자 이상이어야 합니다.");
      } else if (!/[A-Z]/.test(password)) {
        this.password.error("비밀번호는 하나 이상의 대문자를 포함해야 합니다.");
      }
    });

    Stream.merge([this.password, this.passwordConfirm]).map(
      ([password, passwordConfirm]) => {
        this.passwordConfirm.error(null);
        if (password !== passwordConfirm) {
          this.passwordConfirm.error("비밀번호와 동일하게 입력해 주세요.");
        }
      }
    );

    this.isInstagram.map(() => this.isValidInstagram());

    this.instagramAccount.map(() => this.isValidInstagram());

    this.isValid = Stream.merge([
      this.email.isValid,
      this.password.isValid,
      this.passwordConfirm.isValid,
      this.userName.isValid,
      this.phoneNumber.isValid,
      this.isInstagram.isValid,
      this.instagramAccount.isValid,
      this.numberOfPhonesOwned.isValid
    ]).map(
      ([
        emailValid,
        passwordValid,
        passwordConfirmValid,
        userNameValid,
        phoneNumberValid,
        isInstagramValid,
        instagramAccountValid,
        numberOfPhonesOwnedValid
      ]) => {
        return (
          emailValid &&
          passwordValid &&
          passwordConfirmValid &&
          userNameValid &&
          phoneNumberValid &&
          isInstagramValid &&
          instagramAccountValid &&
          numberOfPhonesOwnedValid
        );
      }
    );
  }

  public view() {
    return (
      <div class="container">
        <Form onsubmit={() => this.onsubmit()}>
          <Form.Email
            label="이메일"
            value={this.email}
            placeholder="example@croquis.com"
            errorMsg="이메일이 입력되지 않았거나 형식이 올바르지 않습니다."
          />
          <Form.Password
            label="비밀번호"
            value={this.password}
            placeholder="대문자를 포함한 형식으로 입력하세요."
          />
          <Form.Password
            label="비밀번호 확인"
            value={this.passwordConfirm}
            placeholder="비밀번호를 확인하세요."
          />
          <Form.TextField
            label="이름"
            value={this.userName}
            placeholder="이름을 입력하세요."
          />
          <Form.PhoneField
            label="휴대폰 번호"
            value={this.phoneNumber}
            placeholder="숫자만 입력하세요."
            errorMsg="휴대폰 번호 형식이 올바르지 않습니다."
          />
          <Form.RadioButton
            label="인스타그램 소유 여부"
            value={this.isInstagram}
            radios={[
              { label: "미보유", value: "미보유" },
              { label: "보유", value: "보유" }
            ]}
            name="isInstagram"
            errorMsg="인스타그램 보유 여부를 선택해주세요."
          />
          {this.isInstagram() === "보유" && (
            <Form.InstagramAccount
              label="인스타그램 계정"
              value={this.instagramAccount}
              placeholder="계정을 입력하세요."
            />
          )}
          <Form.RadioButton
            label="소유한 핸드폰 개수"
            value={this.numberOfPhonesOwned}
            radios={[
              { label: "0", value: 0 },
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5개 이상", value: 5 }
            ]}
            name="numberOfPhonesOwned"
          />
          <Form.Submit label="Sign up" disabled={!this.isValid()} />
        </Form>
      </div>
    );
  }

  private onsubmit() {
    alert(
      `sign up with
        email=${this.email()}
        password=${this.password()}
        user name=${this.userName()}
        phone=${this.phoneNumber()}
        instagram=${this.isInstagram()}
        account=${this.instagramAccount()}
        phones owned=${this.numberOfPhonesOwned()}`
    );
  }
}

m.mount(document.getElementById("app")!, App);
