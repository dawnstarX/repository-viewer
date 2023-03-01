import { deleteRepo } from '@/helper/deleteRepo';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import {deleteModalProps} from "../Types/types"

const DeleteModal = ({ onClose,username, repoName }: deleteModalProps) => {
    const [showModal, setShowModal] = useState(true);
    const { data: session } = useSession();
      //@ts-ignore
    const token = session?.accessToken;
    const handleClose = () => {
      setShowModal(false);
      onClose();
    };
    function deleteHandler() {
        deleteRepo(username,repoName,token).then(() => {
          console.log('Repository deleted successfully!');
        })
        .catch(error => {
          console.error('Failed to delete repository:', error);
        });
        handleClose();
      }
    
  return (
    <div
  className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
  onClick={() => handleClose()}
  style={{ display: showModal ? "flex" : "none" }}
>
  <div className="bg-gray-700 rounded-md p-6 relative w-1/2 max-w-md">
    <button
      className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
      onClick={() => handleClose()}
    >
      &times;
    </button>

    <div className="p-6 text-center text-white">
      <svg
        aria-hidden="true"
        className="mx-auto mb-4 w-14 h-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="mb-5 text-lg font-normal text-white">
        Are you sure you want to delete this product?
      </h3>
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
      
        onClick={deleteHandler} >
        Yes, I am sure
      </button>
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="text-gray-400 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
      onClick={handleClose}>
        No, cancel
      </button>
    </div>
  </div>
</div>

  )
}

export default DeleteModal