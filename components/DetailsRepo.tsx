import { detailedrepoProps } from "@/Types/types"
import { deleteRepo } from '@/helper/deleteRepo';
import { updateRepo } from "../helper/updateRepo"
import React, { FormEvent, useRef, useState } from 'react'
import { useSession } from 'next-auth/react';
import { EyeIcon, StarIcon, Branch } from "../components/icons/icons";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";



const DetailsRepo = ({ props }: detailedrepoProps) => {

  const repo = props;
  const [showModal, setShowModal] = useState(false);
  const [dangerModel, setDangerModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const dangerModalClose = () => {
    setDangerModal(false);
  }

  const { data: session } = useSession();
  //@ts-ignore
  const token = session?.accessToken;
  const username = props.owner.login;
  const ID = props.id;




  function deleteHandler() {
    deleteRepo(username, props.name, token).then(() => {
      console.log('Repository deleted successfully!');
    })
      .catch(error => {
        console.error('Failed to delete repository:', error);
      });
  }




  return (
    <div className="flex justify-center items-center min-h-screen">
  <div className="w-full md:w-1/2 bg-transparent rounded-lg border border-white" style={{ flexWrap: 'wrap' }}>
    <div className="bg-transparent py-2 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-500 text-center">{repo.name}</h1>
    </div>
    <div className="border-t border-white p-6 flex justify-between">
      <div className="flex-grow">
        <p className="text-sm text-white mb-2">CreatedAt: {repo.createdAt}</p>
        <p className="text-sm text-white mb-2">UpdatedAt: {repo.updatedAt}</p>
      </div>
      <div className="ml-auto">
        <p className="text-sm text-white font-bold mb-2">{repo.isPrivate ? 'Private' : 'Public'}</p>
        <p className="text-sm text-white font-bold mb-2">{repo.primaryLanguage?.name}</p>
      </div>
    </div>
    <div className="bg-transparent p-6">
      <p className="text-center text-white">{repo.description}</p>
    </div>
    <div className="p-6 flex justify-between">
      <div className="p-6 flex justify-between">
        <div className="w-1/3 p-6 flex justify-start items-center">
          <div className="ml-auto">
            <StarIcon />
          </div>
          <p className="text-xs sm:text-sm text-white font-bold ml-auto">
            Stars:{repo.stargazers.totalCount}
          </p>
        </div>
      </div>
      <div className="w-1/3 p-6 flex justify-end items-center">
        <div className="ml-auto" style={{ marginLeft: 'auto' }}>
          <EyeIcon />
        </div>

        <p className="text-xs sm:text-sm text-white font-bold text-left">
          Watchers: {repo.watchers.totalCount}
        </p>
      </div>
      <div className="w-1/3 p-6 flex justify-end items-center">
        <div className="ml-auto" style={{ marginLeft: 'auto' }}>
          <Branch />
        </div>
        <p className="text-xs sm:text-sm text-white font-bold" >
          Forks: {repo.forks.totalCount}
        </p>
      </div>
    </div>

    <div className="p-6 flex justify-between">
      <div className="w-1/6">
        <button className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={() => setShowModal(true)}>Edit</button>
      </div>
      <div className="flex-grow"></div>
      <div className="w-1/6 ml-auto">
        <button className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none" onClick={()=>setDangerModal(true)}>Delete</button>
      </div>
    </div>
    <div>
          {showModal && <UpdateModal onClose={handleModalClose} id={ID} />}
        </div>
        <div>
          {dangerModel && <DeleteModal onClose={dangerModalClose} username={username } id={ID} />}
        </div>

      </div>
    </div>




  )
}


export default DetailsRepo