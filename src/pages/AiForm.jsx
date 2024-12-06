import FormUi from "@/components/core/EditForm/FormUi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AiForm = () => {
  const { formId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [jsonForm, setJsonForm] = useState();
  const [formData, setFormData] = useState();

  const getFormData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/forms/${formId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setJsonForm(JSON.parse(data.data.form));
      setFormData(data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    formId && getFormData();
  }, [formId]);
  return (
    <div
      className="p-10 flex justify-center items-center h-[100vh]"
      style={{
        backgroundImage: formData?.background,
      }}
    >
      {formData && (
        <FormUi
          jsonForm={jsonForm}
          selectedStyle={JSON.parse(formData?.style)}
          selectedTheme={formData?.theme}
          onFormUpdate={() => console.log}
          deleteField={() => console.log}
          editable={false}
        />
      )}
      <Link
        className="flex gap-2 items-center
         bg-black text-white px-3 py-1 rounded-full
         fixed bottom-5 left-5 cursor-pointer 
         "
        to={"/"}
      >
        <img src={Logo} width={26} height={26} />
        Build your Own AI form
      </Link>
    </div>
  );
};

export default AiForm;
