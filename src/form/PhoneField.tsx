import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IPhoneField extends IBaseControl<string> {}

class PhoneField extends BaseControl<IPhoneField, string> {
  protected controls() {
    return (
      <input
        oninput={m.withAttr("value", value => this.oninput(value))}
        type="tel"
        class={cc(["form-control", { "is-invalid": !this.value.isValid() }])}
        placeholder={this.placeholder}
      />
    );
  }

  private oninput(value) {
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
