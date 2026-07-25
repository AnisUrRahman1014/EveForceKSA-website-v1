import { useState } from "react";
import { Modal, Select, Input, Button } from "antd";
import { REQUIREMENT_TYPES } from "../../types/event";
import type { RoleRequirement } from "../../types/event";

const { TextArea } = Input;

interface AddRequirementModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (requirement: RoleRequirement) => void;
}

const AddRequirementModal = ({ open, onClose, onAdd }: AddRequirementModalProps) => {
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
      title="Add Requirement"
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={480}
      zIndex={1200}
    >
      <div style={{ marginBottom: 20 }}>
        <p className="form-label">Requirement Type</p>
        <Select
          placeholder="Choose requirement type"
          style={{ width: "100%" }}
          size="large"
          value={type}
          onChange={setType}
          options={REQUIREMENT_TYPES.map((t) => ({ value: t, label: t }))}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="form-label">Description</p>
        <TextArea
          placeholder="Add specific instructions for this requirement..."
          maxLength={150}
          showCount
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Button block size="large" onClick={handleClose}>
          Cancel
        </Button>
        <Button block size="large" type="primary" onClick={handleAdd} disabled={!type}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default AddRequirementModal;
