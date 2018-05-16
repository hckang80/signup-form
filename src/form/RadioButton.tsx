import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IRadioButton extends IBaseControl<string> {}

class RadioButton extends BaseControl<IRadioButton, string> {
  public oninit(vnode: m.CVnode<IRadioButton>) {
    super.oninit(vnode);
    this.onchange(this.value());
  }

  protected controls() {
    return this.radios.map((radio, index) => {
      return (
        <div
          class={cc([
            "custom-control",
            "custom-radio",
            "custom-control-inline",
            { "is-invalid": !this.value.isValid() }
          ])}
        >
          <input
            onchange={m.withAttr("value", value => {
              this.onchange(value);
            })}
            value={radio.value}
            name={this.name}
            type="radio"
            id={this.controlId + index}
            class="custom-control-input"
            checked={radio.value + "" === this.value()}
          />
          <label class="custom-control-label" for={this.controlId + index}>
            {radio.label}
          </label>
        </div>
      );
    });
  }

  private onchange(value: string) {
    this.value(value);
    this.value.error(this.errorMsg);
    if (value) {
      this.value.error(null);
    }
  }
}

export default RadioButton;
