import React, { FormEvent, useRef } from 'react'
import { useSession } from 'next-auth/react';
import {createRepo} from "../../../helper/createRepo"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Index = () => {
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const visibilityRef = useRef(null);
  const { data: session } = useSession();
  const Router = useRouter();
    //@ts-ignore
    const token = session?.accessToken;
  
  function handleSubmit(event :FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
   
    const name = form.Name.value;
    const description = form.description.value;
      const visibility = form.visibility.value;
      createRepo(token, name, description, visibility).then((response) => {
        toast.success('Created Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          Router.back();
        }, 2000);
      })
      .catch((error:string) => {
        toast.error('Could not create', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      });

    form.reset();
  }

  
  function handleClearForm(event: FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement;
    form.reset();
  }
    
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
    <div className="border-2 border-white  bg-transparent p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Repository</h1>
      <form onSubmit={(event) => { handleSubmit(event) }}>
  <label htmlFor="name" className="text-white">Name:</label>
  <textarea
    id="name"
    name="Name"
    required
    className="w-full rounded-lg py-2 px-4 mb-4 text-white bg-transparent border-2 border-white mt-4"
  />
  <label htmlFor="description" className="text-white mb-4">Description:</label>
  <textarea
    id="description"
    name="description"
    ref={descRef}
    required
    className="w-full rounded-lg py-2 px-4 mb-4 text-white bg-transparent border-2 border-white mt-4"
  />
  <label className="text-white">Visibility:</label>
  <div className="mt-4">
    <input
      type="radio"
      id="public"
      name="visibility"
      value="public"
      required
    />
    <label htmlFor="public" className="text-white">Public</label>
  </div>
  <div className="mt-4">
    <input
      type="radio"
      id="private"
      name="visibility"
      value="private"
      required
    />
    <label htmlFor="private" className="text-white">Private</label>
          </div>
          <div className=" mt-6 flex justify-between">
  <button
    type="submit" name="action" value="submit"
    className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">
    Create repository
  </button>
</div>
</form>
<ToastContainer />
    </div>
  </div>
  
  )
}

export default Index