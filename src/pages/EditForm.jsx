import Controller from "@/components/core/EditForm/Controller";
import FormUi from "@/components/core/EditForm/FormUi";
import axios from "axios";
import { ArrowLeftCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { formId } = useParams();
  const navigate = useNavigate();

  const [jsonForm, setJsonForm] = useState();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();

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
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const onFormUpdate = (value, idx) => {
    jsonForm.fields[idx].label = value.label
      ? value.label
      : jsonForm.fields[idx].label;
    if (jsonForm?.fields[idx]?.placeholder) {
      jsonForm.fields[idx].placeholder = value.placeholder
        ? value.placeholder
        : jsonForm.fields[idx].placeholder;
    }
    setUpdateTrigger(true);
  };

  const deleteField = (idx) => {
    const result = jsonForm.fields.filter((field, i) => i !== idx);
    jsonForm.fields = result;
    setUpdateTrigger(true);
  };

  const updateJsonInDB = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/edit-form`,
        { formId: formId, form: JSON.stringify(jsonForm) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setUpdateTrigger(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setUpdateTrigger(false);
    }
  };

  const updateControllerField = async (value, field) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/edit-field`,
        { formId: formId, field: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonInDB();
    }
  }, [updateTrigger]);

  useEffect(() => {
    getFormData();
  }, []);
  return (
    <div className="p-5">
      <div className=" hover:scale-y-125 transition-all delay-75">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircle /> Back
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              setSelectedTheme(value);
              updateControllerField(value, "theme");
            }}
            selectedBackground={(value) => setSelectedBackground(value)}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            onFormUpdate={onFormUpdate}
            deleteField={deleteField}
            selectedTheme={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
