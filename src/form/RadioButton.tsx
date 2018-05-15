import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IRadioButton extends IBaseControl<string> {}

class RadioButton extends BaseControl<IRadioButton, string> {
  protected controls() {
    return this.radios.map((label, index) => {
      return (
        <div
          class={cc([
            "custom-control",
            "custom-radio",
            "custom-control-inline"
          ])}
        >
          <input
            onchange={m.withAttr("value", value => {
              this.value(value);
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
}

export default RadioButton;
