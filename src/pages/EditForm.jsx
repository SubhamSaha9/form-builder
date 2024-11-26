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

  useEffect(() => {
    getFormData();
  }, []);
  return (
    <div className="p-5">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md"></div>
        <div className="md:col-span-2 border rounded-lg p-5 h-screen flex items-center justify-center">
          <FormUi jsonForm={jsonForm} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
