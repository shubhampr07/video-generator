import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white dark:bg-gray-800 border border-teal-100 dark:border-teal-900/20 rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-32 h-32 mb-4">
            <Image 
              src={'/progress.gif'} 
              width={120} 
              height={120} 
              alt="Loading animation"
              className="rounded-lg shadow-md"
            />
          </div>
          <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-2">Generating your video</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm">
            This may take a moment. Please don't refresh the page.
          </p>
          <div className="mt-6 w-full max-w-xs bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
