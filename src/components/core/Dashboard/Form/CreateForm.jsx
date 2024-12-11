import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { aiChatSession } from "@/utils/AiModel";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PROMPT =
  " On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CreateForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleCreateForm = async () => {
    setLoading(true);
    try {
      const result = await aiChatSession.sendMessage(
        `Description: ${userInput}${PROMPT}`
      );
      if (!result.response.text()) {
        setLoading(false);
        toast.error("Something went wrong!!");
        return;
      }
      const output = JSON.parse(result.response.text())[0];
      if (!output) {
        toast.error("No output from AI");
        return;
      }
      const { data } = await axios.post(
        `${BASE_URL}/forms/create-form`,
        { form: JSON.stringify(output) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      navigate(`/edit-form/${data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-0 bg-transparent m-0 ">
          <Button>
            <PlusIcon /> Create Form
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription className="pt-4">
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                className="my-2"
                placeholder="Write description of your form"
                value={userInput}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button variant="destructive" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleCreateForm()} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
