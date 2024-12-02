import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeData } from "@/data/theme";
import { gradientBg } from "@/data/gradientBg";
import { Button } from "@/components/ui/button";

const Controller = ({
  selectedTheme,
  selectedBackground,
  defaultTheme,
  defaultBG,
}) => {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      {/* Theme selection controller */}
      <h2 className="my-1">Theme</h2>
      <Select
        defaultValue={defaultTheme && defaultTheme}
        onValueChange={(value) => selectedTheme(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themeData.map((theme, i) => (
            <SelectItem value={theme.theme} key={i}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background selection controller */}
      <h2 className="my-1 mt-8">Background</h2>
      <div className="grid grid-cols-3 gap-5">
        {gradientBg.map(
          (bg, i) =>
            i < showMore && (
              <div
                key={i}
                onClick={() => selectedBackground(bg.gradient)}
                className={`w-full h-[70px] rounded-lg hover:border-2 hover:border-black flex items-center justify-center cursor-pointer ${
                  defaultBG === bg.gradient &&
                  "border-dashed border-[3px] border-black"
                }`}
                style={{ background: bg.gradient }}
              >
                {i === 0 && "None"}
              </div>
            )
        )}
      </div>
      <Button
        variant="ghost"
        className="bg-gray-50 w-full my-3"
        size="sm"
        onClick={() => setShowMore(showMore <= 6 ? 20 : 6)}
      >
        {showMore > 6 ? "Show Less" : "Show More"}
      </Button>
    </div>
  );
};

export default Controller;
