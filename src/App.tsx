import { useState } from "react";
import "./App.css";
import Process from "./components/process";
import UploadFile from "./components/upload_file";
import { removeBackground } from "@imgly/background-removal";
import toast, { Toaster } from "react-hot-toast";
import DaizySpan from "./components/daizySpan";

function App() {
  const [file, setFile] = useState<object>({});
  const [fileName, setFileName] = useState<string>("");
  const [size, setSize] = useState<string | number>("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isUrl, setIsUrl] = useState<boolean>(false);

  const onFileUpload = (newFile: File) => {
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
    } catch {
      toast.error("Background removal failed");
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        // setIsLoading(false);
        setLoading(0);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col text-center p-4 md:p-10 pt-10 md:pt-15 min-h-screen">
      <Toaster />
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Remove Backgrounds in Seconds
        </h1>
        <p className="text-base md:text-lg text-gray-400 text-center mb-8 md:mb-12 max-w-2xl px-4">
          Upload your image and let our AI handle the rest. Automatic, precise,
          and free for personal use.
        </p>
      </div>

      <div
        id="container"
        className="flex flex-col xl:flex-row gap-6 justify-center items-start w-full max-w-[1800px] mx-auto"
      >
        <div
          id="div-box"
          className="bg-card w-full xl:w-2/3 h-[400px] md:h-[600px] p-2 rounded-3xl"
        >
          <div
            id="image"
            className="flex items-center justify-center w-full h-full rounded-3xl relative overflow-hidden"
          >
            <div className="hover-3d w-full h-full flex items-center justify-center">
              <figure
                id="animate-image"
                className="max-w-[90%] max-h-[90%] rounded-2xl object-contain"
              >
                {url && (
                  <img
                    src={url || ""}
                    alt="Processed content"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </figure>
            </div>
            {url && <DaizySpan />}
          </div>
        </div>

        <div
          id="uploadFile_process"
          className="flex flex-col w-full xl:w-1/3 gap-6"
        >
          <UploadFile
            onFileUpload={onFileUpload}
            preview={preview}
            fileName={fileName}
            size={size}
            onTrash={onTrash}
            showPreview={showPreview}
          />
          <Process
            preview={preview}
            removeBackground={onRemoveBackground}
            url={url || ""}
            loading={loading}
            isUrl={isUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
