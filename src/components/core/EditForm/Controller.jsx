import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeData } from "@/data/theme";

const Controller = ({ setSelectedTheme }) => {
  return (
    <div>
      {/* Theme selection controller */}
      <h2 className="my-1">Select Theme</h2>
    </div>
  );
};

export default Controller;
