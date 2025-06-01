import { open } from "@tauri-apps/plugin-dialog";
import { RoundedButton } from "./RoundedButton";
// when using `"withGlobalTauri": true`, you may use
// const { open } = window.__TAURI__.dialog;

interface FileDialogProps {
  title: string;
}

const onClickAsync = async () => {
  console.log("jmw onclick start..");
  // Open a dialog
  const file = await open({
    multiple: false,
    directory: true,
  });
  console.log("file", file);
};

const onClick = () => {
  void onClickAsync();
};

export const FileDialog: React.FC<FileDialogProps> = ({ title }) => (
  <RoundedButton onClick={onClick} title={title} />
);
