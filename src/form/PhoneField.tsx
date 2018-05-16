import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IPhoneField extends IBaseControl<string> {}

class PhoneField extends BaseControl<IPhoneField, string> {
  private phoneValue: string;

  protected controls() {
    return (
      <input
        oninput={m.withAttr("value", value => {
          this.oninput(this.autoHypenPhone(value));
          this.phoneValue = this.autoHypenPhone(value);
        })}
        value={this.phoneValue}
        type="tel"
        class={cc(["form-control", { "is-invalid": !this.value.isValid() }])}
        placeholder={this.placeholder}
        maxlength="13"
      />
    );
  }

  private autoHypenPhone(phone: string) {
    phone = phone.replace(/[^0-9]/g, "");
    var phoneFormat = phone.replace(
      /(^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
      "$1-$2-$3"
    );
    return phoneFormat;
  }

  private oninput(value: string) {
    this.value(value);
    this.value.error(this.errorMsg);
    if (
      !value ||
      /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(value)
    ) {
      this.value.error(null);
    }
  }
}

export default PhoneField;
