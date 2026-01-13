import React from 'react';
import "./Modal.css";
import { Modal as MuiModal, Box } from "@mui/material";

export const Modal = ({ open, handleClose, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      disableEnforceFocus
    >
      <Box className="modal-content">{children}</Box>
    </MuiModal>
  );
};
