"use client"
import React, {useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = ({onUserSelect}) => {
    const options = ['Custom Prompt', 'Random AI Story', 'Scary Stroy', 'Motivational', 'Fun Fact', 'History'];

    const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-teal-900/10 dark:to-blue-900/10 p-6 rounded-lg">
      <h2 className="font-bold text-xl text-teal-600 dark:text-teal-400 flex items-center">
        <span className="bg-teal-100 dark:bg-teal-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-400">1</span>
        Content
      </h2>
      <p className="text-gray-600 dark:text-gray-400 ml-10">What is the topic of your video?</p>
      <Select onValueChange={(value) => {
        setSelectedOption(value)
        value!='Custom Prompt' && onUserSelect('topic', value)
      }}>
        <SelectTrigger className="w-full mt-4 p-6 text-lg border-teal-200 dark:border-teal-800/30 rounded-lg shadow-sm">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
            {options.map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
            ))}
        </SelectContent>
      </Select>

      {selectedOption == 'Custom Prompt' && 
      <Textarea 
        onChange={(e) => onUserSelect('topic', e.target.value)} 
        className="mt-4 border-teal-200 dark:border-teal-800/30 rounded-lg shadow-sm focus:border-teal-400 focus:ring-teal-400" 
        placeholder="Write prompt on which you want to generate video."
      />
      }
    </div>
  );
};

export default SelectTopic;
