import React from "react";
import * as Yup from "yup";

import MaskedInput, { MaskedInputProps } from "react-text-mask";
import { InputBase } from "./input/inputBase";
import { Formik, useField, Form } from "formik";
import { Button } from "./input/button";
import { mdiContentSave, mdiClose } from "@mdi/js";

type FieldProps = {
  label: string;
  required?: true;
  name: string;
  type: string;
  placeholder?: string;
  mask: MaskedInputProps["mask"];
  disabled?: true;
};

const MaskedField: React.FC<FieldProps> = props => {
  const [fieldProps, fieldMetaProps] = useField(props.name, props.type);

  return (
    <InputBase
      minWidth={240}
      disabled={props.disabled}
      required={true}
      label={props.label}
      errorMessage={fieldMetaProps.touched && fieldMetaProps.error}
    >
      <MaskedInput
        mask={props.mask}
        placeholder={props.placeholder}
        {...fieldProps}
      />
    </InputBase>
  );
};

const validationSchema = Yup.object().shape({
  duration: Yup.string()
    .matches(
      /\d{2}:\d{2}:\d{2}/,
      "Duration should match the format hour:minute:second"
    )
    .required("Timer duration is required"),
  warn: Yup.string()
    .matches(
      /\d{2}:\d{2}/,
      "Warn at time should match the format minute:second"
    )
    .required("Warn at time is required"),
  alert: Yup.string()
    .matches(
      /\d{2}:\d{2}/,
      "Alert at time should match the format minute:second"
    )
    .required("Alert at time is required")
});

export type SettingsData = {
  duration: string;
  warn: string;
  alert: string;
};

export const Settings: React.FC<{
  settings: SettingsData;
  onSave: (settings: SettingsData) => void;
}> = props => (
  <Formik<SettingsData>
    initialValues={props.settings}
    onSubmit={(values, opts) => {
      opts.setSubmitting(true);
      props.onSave(values);
    }}
    validationSchema={validationSchema}
  >
    {data => (
      <Form>
        <div className="settings">
          <header>Settings</header>
          <p>This is the time which is used for measuring the time left.</p>
          <MaskedField
            required={true}
            label={"Timer duration"}
            mask={[/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/]}
            placeholder="hh:mm:ss"
            name="duration"
            type="text"
          />
          <br />
          <p>
            When the time left is less than the warn time, the screen turns
            orange.
            <br />
            This indicates that it's time to start wrapping the presentation.
          </p>
          <MaskedField
            required={true}
            label={"Warn at time"}
            mask={[/\d/, /\d/, ":", /\d/, /\d/]}
            placeholder="mm:ss"
            name="warn"
            type="text"
          />
          <br />
          <p>
            When the time left is less than the alert time, the screen turns
            red.
            <br />
            This indicates that it's really time to wrap the presentation.
          </p>
          <MaskedField
            required={true}
            label={"Alert at time"}
            mask={[/\d/, /\d/, ":", /\d/, /\d/]}
            placeholder="mm:ss"
            name="alert"
            type="text"
          />
          <div className="buttons">
            <Button
              light
              type="submit"
              rightIcon={mdiClose}
              disabled={data.isSubmitting}
            >
              cancel
            </Button>
            <Button
              rightIcon={mdiContentSave}
              type="submit"
              disabled={data.isSubmitting}
            >
              save
            </Button>
          </div>
          <style jsx>{`
            .settings {
              padding: 16px;
            }
            header {
              font-size: 28px;
              font-weight: bold;
              color: #6200ff;
            }
            .buttons {
              display: flex;
              margin: -8px;
              padding-top: 16px;
            }

            .buttons > :global(button) {
              margin: 8px;
            }
          `}</style>
        </div>
      </Form>
    )}
  </Formik>
);
