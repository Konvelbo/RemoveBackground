import { useState } from "react";
import "./App.css";
import Process from "./components/process";
import UploadFile from "./components/upload_file";

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
  const [url, setUrl] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const onFileUpload = (newFile: newFilePorps) => {
    if (!newFile) return;

    setFile(newFile);
    setFileName(newFile.name);
    console.log(newFile);
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
  };

  const removeBackground = () => {};

  return (
    <div className="flex flex-col text-center p-10 pt-15">
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-5xl font-bold text-center mb-4">
          Remove Backgrounds in Seconds
        </h1>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl">
          Upload your image and let our AI handle the rest. Automatic, precise,
          and free for personal use.
        </p>
      </div>
      <div className="flex justify-between">
        <div className=" bg-card max-h-174 p-2 rounded-3xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
            className="rounded-3xl h-170 object-contain"
          />
        </div>
        <div className="flex flex-col space-y-5">
          <UploadFile
            onFileUpload={onFileUpload}
            preview={preview}
            fileName={fileName}
            size={size}
            onTrash={onTrash}
            showPreview={showPreview}
          />
          <Process
            removeBackground={removeBackground}
            url={url}
            fileName={fileName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
