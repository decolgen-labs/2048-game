import React from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "ModelContainer") {
      onClose();
    }
  };

  if (isOpen !== true) return null;
  return (
    <div
      id="ModelContainer"
      onClick={handleCloseModal}
      className="modal-container"
    >
      {children}
    </div>
  );
};

export default Modal;
