"use client"
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectDuration = ({onUserSelect}) => {
  return (
    <div className="mt-8 bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-teal-900/10 dark:to-blue-900/10 p-6 rounded-lg">
      <h2 className="font-bold text-xl text-teal-600 dark:text-teal-400 flex items-center">
        <span className="bg-teal-100 dark:bg-teal-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-400">3</span>
        Duration
      </h2>
      <p className="text-gray-600 dark:text-gray-400 ml-10">Select the duration of your video</p>
      <Select onValueChange={(value) => {
        value!='Custom Prompt' && onUserSelect('duration', value)
      }}>
        <SelectTrigger className="w-full mt-4 p-6 text-lg border-teal-200 dark:border-teal-800/30 rounded-lg shadow-sm">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='15 Seconds'>15 Seconds</SelectItem>
            <SelectItem value='30 Seconds'>30 Seconds</SelectItem>
            <SelectItem value='60 Seconds'>60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
