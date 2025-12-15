import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormListItem from "./FormListItem";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const FormList = () => {
  const [formList, setFormList] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const getFormList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/forms/get-all-forms`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setFormList(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormList();
  }, []);
  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {loading ? (
        <div className="font-bold text-lg">Loading...</div>
      ) : (
        <>
          {formList.map((form, index) => (
            <FormListItem
              jsonForm={JSON.parse(form.form)}
              formRecord={form}
              refreshData={getFormList}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FormList;
