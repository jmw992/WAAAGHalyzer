import { openUrl } from "@tauri-apps/plugin-opener";
import { Pencil } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getIsValidUrl } from "@/lib/utils";

interface EditableLinkProps {
  url: string;
  onUrlChange: (newUrl: string) => void;
}

export function EditableLink({ url, onUrlChange }: EditableLinkProps) {
  const [isEditing, setIsEditing] = useState(false);

  const isValidUrl = useMemo(() => getIsValidUrl(url), [url]);

  const handleLinkClick = useCallback(() => {
    if (isValidUrl) {
      openUrl(url).catch((err: unknown) => {
        console.error("Error opening link:", err);
      });
    }
  }, [isValidUrl, url]);

  if (isEditing || !isValidUrl) {
    return (
      <Input
        type="url"
        value={url}
        onChange={(e) => {
          onUrlChange(e.target.value);
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
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
        onClick={() => {
          setIsEditing(true);
        }}
        className="ml-2 p-1 hover:text-primary"
        variant="ghost"
      >
        <Pencil size={16} />
      </Button>
    </div>
  );
}
