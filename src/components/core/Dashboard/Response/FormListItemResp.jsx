import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const FormListItemResp = ({ jsonForm, formRecord }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const exportData = async () => {
    setLoading(true);
    try {
      let jsonData = [];
      const { data } = await axios.post(
        `${BASE_URL}/forms/get-all-response`,
        { formId: formRecord._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      console.log("data.data....", data.data);
      data?.data.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
      console.log("jsonData.............", jsonData);
      exportToExcel(jsonData);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || error.message);
      setLoading(false);
    }
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm?.formHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-center">
        <h2 className="text-sm">
          <strong>{formRecord?.response?.length}</strong> Responses
        </h2>
        <Button
          className=""
          size="sm"
          onClick={() => exportData()}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
};

export default FormListItemResp;
