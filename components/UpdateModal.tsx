import { updateRepo } from "@/helper/updateRepo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {updateModalProps} from "../Types/types"



export default function Modal({ onClose ,id }: updateModalProps) {
  const [showModal, setShowModal] = useState(true);
  const { data: session } = useSession();
  const Router = useRouter();
    //@ts-ignore
  const token = session?.accessToken;
  const handleClose = () => {
    setShowModal(false);
    onClose();
    };
    function updateHandler(event:FormEvent<HTMLFormElement>) {
       
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const newName = form.Name.value;
      const newDescription = form.description.value;
      
      updateRepo(newName,newDescription,id,token).then(() => {
        toast.success('Updated Successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        
        handleClose();
        setTimeout(() => {
          Router.back();
        }, 2000);
      })
      .catch(error => {
        toast.error('Could not Update', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        handleClose();
      });

      
      }

  return (
    <>

     <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
      onClick={() => handleClose()}
      style={{ display: showModal ? "flex" : "none" }}
    >
      <div className="bg-gray-700 rounded-md p-6 relative w-1/2 max-w-md text-white">
        <button
          className="absolute top-2 right-2 text-white text-xl hover:text-gray-300"
          onClick={() => handleClose()}
        >
          &times;
        </button>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit Your Repository</h2>
          

          <form className="w-full max-w-lg" onSubmit={(event)=>updateHandler(event)} onClick={(e) => e.stopPropagation()}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
        New Name
      </label>
      <input
        className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          id="name"
          name="Name"        
        type="text"
      required
        placeholder="Enter a new name"
      />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
        New Description
      </label>
      <textarea
        className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
        id="description"
         name="description"
        placeholder="Enter a new description"
        rows={3}
      />
    </div>
            </div>
            <div>
            <button 
            className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            type="submit"
            > Update
              </button>
              
            </div>
                      
            
</form>
<ToastContainer />
        </div>
      </div>
      </div>
    </>
   
  );
}
