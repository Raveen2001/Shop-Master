import { useCallback, useState } from "react";

type IUploader = (e: React.ChangeEvent<HTMLInputElement>) => void;
type IUseDisplayImage = () => {
  localUrl: string;
  localUploader: IUploader;
};
const useDisplayImage: IUseDisplayImage = () => {
  const [result, setResult] = useState("");

  const localUploader = useCallback<IUploader>((e) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      setResult(e.target?.result as string);
    };

    reader.readAsDataURL(imageFile);
  }, []);

  return { localUrl: result, localUploader };
};

export default useDisplayImage;
