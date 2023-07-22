"use client";

import * as React from "react";
import { HiOutlinePaperClip, HiX } from "react-icons/hi";
import { type FileWithPreview } from "@/types/dropzone";
import { Button } from "./button";

type FilePreviewProps = {
  file: FileWithPreview;
} & (
  | {
      deleteFile?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: true;
    }
  | {
      deleteFile: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: false;
    }
);

export default function FilePreview({
  deleteFile,
  file,
  readOnly,
}: FilePreviewProps): React.ReactElement {
  return (
    <li
      key={file.name}
      className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
    >
      <div className="flex w-0 flex-1 items-center">
        <HiOutlinePaperClip
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
      </div>
      <div className="ml-4 flex flex-shrink-0 items-center space-x-2">
        {!readOnly && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={(e) => deleteFile?.(e, file)}
          >
            <HiX size={20} />
          </Button>
        )}
      </div>
    </li>
  );
}
