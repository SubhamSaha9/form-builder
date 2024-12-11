import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Share, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { RWebShare } from "react-web-share";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FormListItem = ({ formRecord, jsonForm, refreshData }) => {
  const { token } = useSelector((state) => state.auth);
  const path = useLocation();
  console.log("path", path);
  const onDeleteForm = async (id) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/forms/delete-form`,
        { formId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      refreshData();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash
              className="h-5 w-5 text-red-600 
                    cursor-pointer hover:scale-105 transition-all"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                form and remove all the data related to form.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm(formRecord?._id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm?.formHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between">
        <RWebShare
          data={{
            text:
              jsonForm?.formHeading +
              " , Build your form in seconds with AI form Builder ",
            url:
              import.meta.env.VITE_PUBLIC_URL + "/ai-form/" + formRecord?._id,
            title: jsonForm?.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            {" "}
            <Share className="h-5 w-5" /> Share
          </Button>
        </RWebShare>
        <Link to={"/edit-form/" + formRecord?._id}>
          <Button className="flex gap-2" size="sm">
            <Edit className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;
