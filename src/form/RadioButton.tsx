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
    return this.radios.map((label, index) => {
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
            value={label}
            name={this.name}
            type="radio"
            id={this.controlId + index}
            class={cc("custom-control-input")}
            checked={label === this.value()}
          />
          <label
            class={cc("custom-control-label")}
            for={this.controlId + index}
          >
            {label}
          </label>
        </div>
      );
    });
  }

  private onchange(value: string) {
    this.value(value);
    if (value) {
      this.value.error(null);
    } else {
      this.value.error("Please select whether you have Instagram or not.");
    }
  }
}

export default RadioButton;
