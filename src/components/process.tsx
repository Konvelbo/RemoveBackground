import { SlidersVertical, Sparkles, Download } from "lucide-react";

type processProps = {
  removeBackground: () => void;
  url: string;
  fileName: string;
};

const Process = ({ removeBackground, url, fileName }: processProps) => {
  return (
    <div id="process" className="min-w-180 rounded-3xl p-5 bg-card space-y-4">
      <div className="flex items-center gap-5">
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-background-secondary">
          <SlidersVertical />
        </div>
        <h2 className="text-2xl font-semibold">Process</h2>
      </div>
      <div id="progess_bar" className="">
        <div className="flex justify-between px-10">
          <p className="text-blue-700">Processing complete</p>
          <span>100%</span>
        </div>
        <progress
          className="progress progress-primary w-150 justify-start"
          value={20}
          max="100"
        ></progress>
      </div>
      <br></br>
      <button
        onClick={removeBackground}
        className="btn btn-info text-[1.3em] w-100 h-15 rounded-3xl"
      >
        <Sparkles className="mr-2" /> Remove Background
      </button>{" "}
      <br></br>
      {/*just for the line*/}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface-dark px-2 text-gray-500 font-medium">
            Result Ready
          </span>
        </div>
      </div>
      {/*..............*/}
      <a href={url} download={fileName + ".png"}>
        <button className="btn btn-success text-[1.3em] w-100 h-15 rounded-3xl">
          <Download className="mr-2" /> Download
        </button>
      </a>
    </div>
  );
};

export default Process;
