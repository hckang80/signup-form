import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IPhoneField extends IBaseControl<string> {}

class PhoneField extends BaseControl<IPhoneField, string> {
  private phoneFormat: string;

  protected controls() {
    return (
      <input
        oninput={m.withAttr("value", value => {
          this.oninput(this.autoHypenPhone(value));
          this.phoneFormat = this.autoHypenPhone(value);
        })}
        value={this.phoneFormat}
        type="tel"
        class={cc(["form-control", { "is-invalid": !this.value.isValid() }])}
        placeholder={this.placeholder}
        maxlength="13"
      />
    );
  }

  private autoHypenPhone(number: string) {
    number = number.replace(/[^0-9]/g, "");
    var tmp = "";
    if (number.length < 4) {
      return number;
    } else if (number.length < 7) {
      tmp += number.substr(0, 3);
      tmp += "-";
      tmp += number.substr(3);
      return tmp;
    } else if (number.length < 11) {
      tmp += number.substr(0, 3);
      tmp += "-";
      tmp += number.substr(3, 3);
      tmp += "-";
      tmp += number.substr(6);
      return tmp;
    } else {
      tmp += number.substr(0, 3);
      tmp += "-";
      tmp += number.substr(3, 4);
      tmp += "-";
      tmp += number.substr(7);
      return tmp;
    }
  }

  private oninput(value: string) {
    this.value(value);
    if (
      !value ||
      /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(value)
    ) {
      this.value.error(null);
    } else {
      this.value.error("Input a valid phone number");
    }
  }
}

export default PhoneField;
