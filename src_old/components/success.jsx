import React from "react";
import { Result, Modal, Button } from "antd";

export function SuccessDialog({ message, handleCancel, status }) {
  return (
    <Modal
      centered
      footer={null}
      closable={false}
      visible={status}
      onCancel={handleCancel}
      className="success-dialog"
    >
      <div style={{ padding: "0px 0px", textAlign: "center" }}>
        <Result status="success" title={message} />
        <Button
          style={{ margin: "auto" }}
          className="btn btn-primary"
          onClick={() => handleCancel()}
        >
          Fermer
        </Button>
      </div>
    </Modal>
  );
}

export default SuccessDialog;
