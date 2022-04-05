import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import BottomButtons from "./BottomButtons";

interface StepInputs {
  leagueName: string
}

type PreStepsProps = {
  currentStep: number,
  handleSuccessStep: (arg: number) => void
}

const LeagueName = ({ handleSuccessStep, currentStep }: PreStepsProps) => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: StepInputs = {
    leagueName: ""
  };

  const validationSchema = Yup.object().shape({
    leagueName: Yup.string()
      .required("This field is required!"),
  });

  const handleSubmit = () => {
    setSuccessful(false);
    setMessage('');
    setLoading(false);
    handleSuccessStep(1);
  };

  return (
    <div className="LeagueName">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5">
          <div className="form-group my-10">
            <div className="instruction text-center">
              <p>The first step is to give your League a Name.<br />Make sure the name is representative of your organization &amp; playing facility/venue.</p>
              <ul className="warnings">
                <li>NO PROFANITY</li>
                <li>NO SPECIAL CHARACTERS</li>
                <li>35 CHARACTER MAX</li>
              </ul>
            </div>
          </div>
          <div className="form-group narrow">
            <Field name="leagueName" type="text" className="form-control" placeholder="type your League name here" />
            <ErrorMessage
              name="leagueName"
              component="div"
              className="alert alert-danger"
            />
          </div>



          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert success" : "alert danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <BottomButtons
            loading={loading}
            currentStep={currentStep}
            handleNext={handleSuccessStep}
          />
        </Form>
      </Formik>

    </div>

  )
};

export default LeagueName;