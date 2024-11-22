import React from "react";
import CreateForm from "./Form/CreateForm";

const Form = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl flex items-center justify-between">
        My Forms
        <CreateForm />
      </h2>
    </div>
  );
};

export default Form;
