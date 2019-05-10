import MaskedInput from "react-text-mask";
import { InputBase } from "./input/inputBase";

export const Settings = () => (
  <div className="settings">
    <header>Settings</header>
    <p>This is the time which is used for measuring the time left.</p>
    <InputBase
      minWidth={240}
      disabled={false}
      required={true}
      label={"Timer duration"}
    >
      <MaskedInput
        mask={[/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/]}
        placeholder="hh:mm:ss"
      />
    </InputBase>
    <br />
    <p>
      When the time left is less than the warn time, the screen turns orange.
      <br />
      This is indicates that it's time to start wrapping the presentation.
    </p>
    <InputBase
      minWidth={240}
      disabled={false}
      required={true}
      label={"Warn at time"}
    >
      <MaskedInput mask={[/\d/, /\d/, ":", /\d/, /\d/]} placeholder="mm:ss" />
    </InputBase>
    <br />
    <p>
      When the time left is less than the alert time, the screen turns red.
      <br />
      This is indicates that it's really time to wrap the presentation.
    </p>
    <InputBase
      minWidth={240}
      disabled={false}
      required={true}
      label={"Alert at time"}
    >
      <MaskedInput mask={[/\d/, /\d/, ":", /\d/, /\d/]} placeholder="mm:ss" />
    </InputBase>
    <style jsx>{`
      .settings {
        padding: 16px;
      }
      header {
        font-size: 28px;
        font-weight: bold;
        color: #6200ff;
      }
    `}</style>
  </div>
);
