import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormListItemResp from "./Response/FormListItemResp";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Response = () => {
  const { token } = useSelector((state) => state.auth);
  const [formList, setFormList] = useState();
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
      toast.error(error?.response?.data.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    token && getFormList();
  }, [token]);
  return (
    <div>
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Responses
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="font-bold text-lg">Loading...</div>
        ) : (
          <>
            {formList &&
              formList?.map((form, index) => (
                <FormListItemResp
                  formRecord={form}
                  jsonForm={JSON.parse(form.form)}
                  key={index}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Response;
