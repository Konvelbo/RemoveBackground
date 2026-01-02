import { FileUp, Trash } from "lucide-react";
import type { newFilePorps } from "../App";
import type { JSX } from "react/jsx-dev-runtime";
type objectProps = {
  preview: string | ArrayBuffer | null;
  fileName: string;
  size: string | number | JSX;
  onFileUpload: (newFile: newFilePorps) => FileList | string | null;
  onTrash: () => void;
  showPreview: boolean;
};
const UploadFile = ({
  onFileUpload,
  onTrash,
  preview,
  fileName,
  size,
  showPreview,
}: objectProps) => {
  const value = size / 1024 / 1024;

  const sizeFixed = value.toFixed(2);

  return (
    <div
      id="upload_file"
      className="min-w-180 rounded-3xl p-5 bg-card space-y-5"
    >
      <div className="flex items-center gap-5">
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-background-secondary">
          <FileUp />
        </div>
        <h2 className="text-2xl font-semibold">Input Image</h2>
      </div>
      <label className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-600 rounded-3xl cursor-pointer bg-surface-dark hover:bg-surface-dark/80 hover:border-primary transition-all group relative">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <span className="material-symbols-outlined text-3xl text-gray-500 group-hover:text-primary mb-2 transition-colors">
            cloud_upload
          </span>
          <p className="mb-1 text-sm text-gray-400">
            <span className="font-semibold text-white">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500">SVG, PNG or JPG </p>
        </div>
        <input
          id="file-input"
          onChange={(value) => onFileUpload(value.target.files[0])}
          className=""
          type="file"
        />
      </label>
      {showPreview && (
        <div
          id="preview"
          className="bg-background-secondary p-5 rounded-3xl relative"
        >
          <div className="flex items-center gap-4">
            <img src={preview} className="w-15 h-15 rounded-lg bg-red" />
            <span>
              <h2 className="mb-1">{fileName}</h2>
              <span className="text-gray-400">
                {size ? sizeFixed + " MB" : ""}
              </span>
            </span>
            <Trash
              onClick={onTrash}
              className="absolute right-10 fill-red-600 text-red-600 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
