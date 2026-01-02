import { useEffect, useState } from "react";
import "./App.css";
import Process from "./components/process";
import UploadFile from "./components/upload_file";
import { removeBackground } from "@imgly/background-removal";
import toast, { Toaster } from "react-hot-toast";
import DaizySpan from "./components/daizySpan";

export type newFilePorps = {
  lastModified: number;
  lastModifyDate: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

function App() {
  const [file, setFile] = useState<object>({});
  const [fileName, setFileName] = useState<string>("");
  const [size, setSize] = useState<string | number>("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isUrl, setIsUrl] = useState<boolean>(false);

  const onFileUpload = (newFile: newFilePorps) => {
    // All important condion//
    if (!newFile) return;
    if (!newFile.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }
    const value = newFile.size / 1024 / 1024;
    const sizeFixed = value.toFixed(2);
    // console.log(sizeFixed);
    if (Number(sizeFixed) > 20) {
      return toast.error("The file cannot be larger than 20MB");
    }

    setFile(newFile);
    setFileName(newFile.name);
    // console.log(newFile);
    setSize(newFile.size);
    setShowPreview(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(newFile);
  };

  const onTrash = () => {
    setShowPreview(false);
    setUrl("");
    setIsUrl(false);
  };

  const startLoading = () => {
    setIsLoading(true);
    setLoading(0);

    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    return interval;
  };

  const onRemoveBackground = async () => {
    if (!showPreview) return toast.error("Add an image");

    const interval = startLoading();

    try {
      const result = await removeBackground(file as File);

      setUrl(URL.createObjectURL(result));
      setLoading(100);
      toast.success("Background remove successfully");
      setIsUrl(true);
    } catch (error) {
      toast.error("Background removal failed");
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsLoading(false);
        setLoading(0);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col text-center p-10 pt-15">
      <Toaster />
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-5xl font-bold text-center mb-4">
          Remove Backgrounds in Seconds
        </h1>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl">
          Upload your image and let our AI handle the rest. Automatic, precise,
          and free for personal use.
        </p>
      </div>
      <div id="container" className="flex justify-between">
        <div
          id="div-box"
          className="bg-card max-h-174 min-w-250 p-2 rounded-3xl"
        >
          <div
            id="image"
            className="flex items-center justify-center w-full h-full rounded-3xl relative"
          >
            <div className="hover-3d">
              <figure id="animate-image" className="max-w-150 rounded-2xl">
                <img src={url} />
              </figure>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <DaizySpan />
          </div>
        </div>
        <div id="uploadFile_process" className="flex flex-col space-y-5">
          <UploadFile
            onFileUpload={onFileUpload}
            preview={preview}
            fileName={fileName}
            size={size}
            onTrash={onTrash}
            showPreview={showPreview}
          />
          <Process
            removeBackground={onRemoveBackground}
            url={url}
            fileName={fileName}
            loading={loading}
            isUrl={isUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
