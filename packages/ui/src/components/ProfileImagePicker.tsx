import { AddAPhotoTwoTone } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { useDisplayImage } from "../hooks";
import React from "react";

interface IProfileImagePickerProps {
  onImageChange: (image: File | null) => void;
}

const ProfileImagePicker: React.FC<IProfileImagePickerProps> = ({
  onImageChange,
}) => {
  const { localUrl, localUploader } = useDisplayImage();

  return (
    <Box className="flex flex-col gap-4">
      <label
        htmlFor="photo-upload-input"
        className="group relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border border-dotted border-slate-300 transition-all duration-300 hover:border-slate-400"
      >
        <Box className="relative h-36 w-36 rounded-full bg-slate-50 group-hover:bg-slate-100">
          {localUrl && (
            <img
              src={localUrl}
              alt="preview"
              className="absolute h-full w-full rounded-full object-cover"
            />
          )}

          <Box
            className={clsx(
              "absolute flex h-full w-full flex-col items-center justify-center gap-1 rounded-full transition-all duration-300",
              {
                "opacity-0 group-hover:bg-slate-900/50 group-hover:opacity-100":
                  !!localUrl,
              },
            )}
          >
            <AddAPhotoTwoTone
              className={clsx({
                "fill-white": localUrl,
                "fill-slate-500": !localUrl,
              })}
            />
            <Typography
              variant="caption"
              className={clsx("font-bold", {
                "text-white": localUrl,
                "text-slate-500": !localUrl,
              })}
            >
              Upload Photo
            </Typography>
          </Box>
        </Box>
      </label>

      <input
        id="photo-upload-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          localUploader(e);
          onImageChange(e.target.files?.[0] ?? null);
        }}
      />

      <Typography variant="caption" className="text-slate-500">
        Allowed *.jpeg, *jpg, *.png, *.gif
      </Typography>
    </Box>
  );
};

export default ProfileImagePicker;
