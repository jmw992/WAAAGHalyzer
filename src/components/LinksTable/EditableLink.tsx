import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Button } from "@/components/ui/button";

interface EditableLinkProps {
  url: string;
  onUrlChange: (newUrl: string) => void;
}

export function EditableLink({ url, onUrlChange }: EditableLinkProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getIsValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  const isValidUrl = getIsValidUrl(url);
  const handleLinkClick = () => {
    console.log("jmw handleLinkClick", url, isValidUrl);
    if (isValidUrl) {
      openUrl(url).catch((err) => {
        console.error("Error opening link:", err);
      });
    }
  };

  console.log("jmw url", url);
  console.log("jmw isValidUrl", isValidUrl);

  if (isEditing || !isValidUrl) {
    return (
      <Input
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        autoFocus
      />
    );
  }

  return (
    <div className="flex items-center w-full">
      <Button
        type="button"
        onClick={handleLinkClick}
        className="text-blue-500 hover:underline"
        variant="link"
      >
        {url}
      </Button>
      <Button
        type="button"
        onClick={() => setIsEditing(true)}
        className="ml-2 p-1 hover:text-primary"
        variant="ghost"
      >
        <Pencil size={16} />
      </Button>
    </div>
  );
}
