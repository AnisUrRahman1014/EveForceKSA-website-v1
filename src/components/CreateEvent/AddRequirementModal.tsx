import { useState } from "react";
import { Modal, Select, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { REQUIREMENT_TYPES } from "../../types/event";
import type { RoleRequirement } from "../../types/event";

const { TextArea } = Input;

interface AddRequirementModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (requirement: RoleRequirement) => void;
}

const AddRequirementModal = ({ open, onClose, onAdd }: AddRequirementModalProps) => {
  const { t } = useTranslation();
  const [type, setType] = useState<string | undefined>();
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setType(undefined);
    setDescription("");
    onClose();
  };

  const handleAdd = () => {
    if (!type) return;
    onAdd({
      id: `req-${Date.now()}`,
      type,
      description: description.trim(),
    });
    handleClose();
  };

  return (
    <Modal
      title={t("addRequirement.title")}
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={480}
      zIndex={1200}
    >
      <div style={{ marginBottom: 20 }}>
        <p className="form-label">{t("addRequirement.type")}</p>
        <Select
          placeholder={t("addRequirement.typePlaceholder") ?? undefined}
          style={{ width: "100%" }}
          size="large"
          value={type}
          onChange={setType}
          options={REQUIREMENT_TYPES.map((rt) => ({ value: rt, label: rt }))}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="form-label">{t("addRequirement.description")}</p>
        <TextArea
          placeholder={t("addRequirement.descriptionPlaceholder") ?? undefined}
          maxLength={150}
          showCount
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Button block size="large" onClick={handleClose}>
          {t("common.cancel")}
        </Button>
        <Button block size="large" type="primary" onClick={handleAdd} disabled={!type}>
          {t("common.add")}
        </Button>
      </div>
    </Modal>
  );
};

export default AddRequirementModal;
