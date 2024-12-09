import React from "react";
import CreateForm from "./Form/CreateForm";
import FormList from "./Form/FormList";

const Form = () => {
  return (
    <div>
      <div className="font-bold text-3xl flex items-center justify-between">
        My Forms
        <CreateForm />
      </div>
      {/* list of forms */}
      <FormList />
    </div>
  );
};

export default Form;
