import Header from "@/components/common/Header";
import Controller from "@/components/core/EditForm/Controller";
import FormUi from "@/components/core/EditForm/FormUi";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeftCircle, Share2, SquareArrowOutUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { formId } = useParams();
  const navigate = useNavigate();

  const [jsonForm, setJsonForm] = useState();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  const getFormData = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/get-form`,
        { formId: formId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setJsonForm(JSON.parse(data.data.form));
      setSelectedTheme(data.data.theme ? data.data.theme : "light");
      setSelectedBackground(data.data.background && data.data.background);
      setSelectedStyle(data.data.style && JSON.parse(data.data.style));
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
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
      toast.error(error?.response?.data?.message || error.message);
      setUpdateTrigger(false);
    }
  };

  const updateControllerField = async (value, field) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/edit-field`,
        { formId: formId, field: field, value: value },
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
      toast.error(error.response?.data.message || error.message);
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonInDB();
    }
  }, [updateTrigger]);

  useEffect(() => {
    formId && getFormData();
  }, [formId]);
  return (
    <div className="p-5">
      <Header />
      <div className=" flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:scale-105 transition-all delay-75 "
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircle /> Back
        </h2>
        <div className="flex gap-2">
          <Button
            className="flex gap-2"
            onClick={() => navigate(`/ai-form/${formId}`)}
          >
            <SquareArrowOutUpRight className="h-5 w-5" /> Live Preview
          </Button>

          <RWebShare
            data={{
              text:
                jsonForm?.formHeading +
                " , Build your form in seconds with AI form Builder ",
              url: import.meta.env.VITE_PUBLIC_URL + "/ai-form/" + formId,
              title: jsonForm?.formTitle,
            }}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
              <Share2 /> Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              setSelectedTheme(value);
              updateControllerField(value, "theme");
            }}
            selectedBackground={(value) => {
              setSelectedBackground(value);
              updateControllerField(value, "background");
            }}
            selectedStyle={(value) => {
              setSelectedStyle(value);
              updateControllerField(JSON.stringify(value), "style");
            }}
            defaultTheme={selectedTheme}
            defaultBG={selectedBackground}
            defaultBorder={selectedStyle}
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
            selectedStyle={selectedStyle}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
