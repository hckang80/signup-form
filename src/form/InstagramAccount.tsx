import cc from "classcat";
import * as m from "mithril";
import BaseControl, { IBaseControl } from "./BaseControl";
import Value from "./Value";

interface IInstagramAccount extends IBaseControl<string> {}

class InstagramAccount extends BaseControl<IInstagramAccount, string> {
  private account: string;

  public oninit(vnode: m.CVnode<IInstagramAccount>) {
    super.oninit(vnode);
    this.oninput(this.value());
  }

  protected controls() {
    return (
      <div class={cc(["form-control", { "is-invalid": !this.value.isValid() }])}>
        <div class={cc("row")}>
          <span class="col-sm-4">http://www.instagram.com/</span>
          <span class="col-sm-8">
          <input
            oninput={m.withAttr("value", value => this.oninput(value))}
            type="text"
            class={cc("form-control")}
            value={this.account}
            placeholder={this.placeholder}
          />
          </span>
        </div>
      </div>
    );
  }

  private oninput(value: string) {
    this.value(value);
    this.account = value;
  }
}

export default InstagramAccount;
