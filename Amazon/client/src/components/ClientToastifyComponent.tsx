"use client"

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

const ClientToastifyComponent = () => {
  return <ToastContainer position="top-right" autoClose={5000} />;
};

export default ClientToastifyComponent;
