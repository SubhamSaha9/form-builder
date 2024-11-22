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
import { PlusIcon } from "lucide-react";
import { aiChatSession } from "@/utils/AiModel";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PROMPT =
  " On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldType, field required In Json format";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CreateForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);

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
      console.log(result.response.text());
      // const {data} = await axios.post(`${BASE_URL}/forms/create-form`, {form: result.response.text()}, {headers: {Authorization : `Bearer token`}});
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      navigate(`edit-form/${data.data._id}`);
    } catch (error) {
      toast.error(error.message);
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
                <Button onClick={handleCreateForm} disabled={loading}>
                  Create
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
