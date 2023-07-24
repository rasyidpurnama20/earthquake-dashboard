"use client";

import clsx from "clsx";
import get from "lodash.get";
import * as React from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { type FileWithPreview } from "@/types/dropzone";
import FilePreview from "./file-preview";
import { PiFileLight } from "react-icons/pi";

type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label: string;
  maxFiles?: number;
  readOnly?: boolean;
  validation?: Record<string, unknown>;
};

export default function DropzoneInput({
  accept,
  helperText = "",
  id,
  label,
  maxFiles = 1,
  validation,
  readOnly,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  //#region  //*=========== Error Focus ===========
  const dropzoneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);
  //#endregion  //*======== Error Focus ===========

  const [files, setFiles] = React.useState<FileWithPreview[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    getValues(id) || []
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setError(id, {
          type: "manual",
          message: rejectedFiles && rejectedFiles[0]?.errors[0]?.message,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          }
        );
        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 100000000000,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>

      {readOnly && !(files?.length > 0) ? (
        <div className="divide-y divide-gray-300 rounded-md border border-gray-300 py-3 pl-3 pr-4 text-sm">
          No file uploaded
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className="mt-1 divide-y divide-gray-300 rounded-md border border-gray-300">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div
                className="focus:ring-dark-400 group mt-1 focus:outline-none"
                {...getRootProps()}
                ref={dropzoneRef}
              >
                <input {...field} {...getInputProps()} />
                <div
                  className={clsx(
                    "w-full cursor-pointer rounded border-2 border-dashed border-gray-300 px-2 py-8",
                    error
                      ? "border-red-500 group-focus:border-red-500"
                      : "group-focus:border-primary-500"
                  )}
                >
                  <div className="space-y-1 text-center">
                    <PiFileLight className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500" />
                    <p className="text-gray-500">
                      Drag and drop file here, or click to choose file
                    </p>
                    <p className="text-xs text-gray-500">{`${
                      maxFiles - (files?.length || 0)
                    } file(s) remaining`}</p>
                  </div>
                </div>
              </div>

              <div className="mt-1">
                {helperText !== "" && (
                  <p className="text-xs text-gray-500">{helperText}</p>
                )}
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
              {!readOnly && !!files?.length && (
                <ul className="mt-1 divide-y divide-gray-300 rounded-md border border-gray-300">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}
