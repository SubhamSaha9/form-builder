import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditForm = () => {
  const { formId } = useParams();
  const getFormData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/forms/get-form/${formId}`, {
        headers: { Authorization: `Bearer token` },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nemo, et
      exercitationem ut reprehenderit distinctio eos voluptatem quam magni
      repellendus nisi blanditiis est molestiae consectetur natus unde voluptas
      ipsum numquam.
    </div>
  );
};

export default EditForm;
