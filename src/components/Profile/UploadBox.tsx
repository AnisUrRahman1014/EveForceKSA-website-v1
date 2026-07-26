import { useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface UploadBoxProps {
  value: string;
  onChange: (dataUrl: string) => void;
  hint: string;
  variant: "logo" | "cover";
  accept?: string;
}

const UploadBox = ({ value, onChange, hint, variant, accept = "image/*" }: UploadBoxProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`upload-box${value ? " upload-box--has-image" : ""}`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="upload-box__input"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value ? (
        <>
          <img
            src={value}
            alt=""
            className={variant === "logo" ? "upload-box__preview-logo" : "upload-box__preview-cover"}
          />
          <span className="upload-box__change">{t("profileEdit.chooseFile")}</span>
        </>
      ) : (
        <>
          <UploadOutlined className="upload-box__icon" />
          <span className="upload-box__label">{t("profileEdit.chooseFile")}</span>
          <span className="upload-box__hint">{hint}</span>
        </>
      )}
    </div>
  );
};

export default UploadBox;
