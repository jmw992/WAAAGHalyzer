import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOTAL_WAR_WARHAMMER_3 } from "@/constants";

interface FolderInputProps {
  initialValue?: string;
  onChange: (filePath: string) => void;
}

export const FolderInput: React.FC<FolderInputProps> = ({
  initialValue: inputPlaceholder,
  onChange,
}) => {
  const [displayFile, setDisplayFile] = useState(
    inputPlaceholder ?? TOTAL_WAR_WARHAMMER_3,
  );

  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: true,
    });
    if (typeof file === "string") {
      setDisplayFile(file);
      onChange(file);
    }
  };

  const onClick = () => {
    void onClickAsync();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <Button variant={"secondary"} size="sm" onClick={onClick}>
        Select
      </Button>
      <Input
        type="text"
        value={displayFile}
        style={{ width: "100%", minWidth: 0 }}
        onChange={(e) => {
          setDisplayFile(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
