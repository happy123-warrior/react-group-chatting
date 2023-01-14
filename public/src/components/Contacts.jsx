import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { addGroupRoute } from "../utils/APIRoutes";
import ManagingGroup from "./ManagingGroup";

export default function Contacts({ socket,contacts,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [groups,setGroups] = useState([]);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    
    setCurrentUserId(data._id);
    setCurrentUserImage(data.avatarImage);
  }, []);
 
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const showGroup = (group) => {
        // handleSelectGroup(group);
        setGroups([...groups,group]);
        console.log(groups);
  };

  

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div class="h-screen flex flex-col py-8 pl-6 pr-2  w-64 bg-white flex-shrink-0">

          <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div class="h-20 w-20 rounded-full border overflow-hidden">
              <img src="" alt="Avatar" class="h-full w-full" />
            </div>
            <div class="text-sm font-semibold mt-2">{currentUserName}</div>
            <div class="flex flex-row items-center mt-3">
              <div class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div class="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>

          <div className="h-[40vh] p-2 contacts mt-8">
            <div class="flex flex-row items-center justify-between text-xs mb-3"><span class="font-bold">Active Conversations</span><span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span></div>
            {contacts.map((contact, index) => {
              return (

                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "bg-[#9a86f3]" : ""
                    } flex flex-row items-center active:bg-blue-500 hover:outline-lime-50 rounded-xl focus:bg-blue-400 transition duration-400 cursor-pointer p-2`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div class="ml-0.5 text-sm  w-3/5 font-semibold" >{contact.username}</div>

                </div>
              );
            })}
             {groups && groups.map((group, index) => {
              return (
                
                <div
                  className={`group ${index+contacts.length === currentSelected ? "bg-[#9a86f3]" : ""
                    } flex flex-row items-center active:bg-blue-500 hover:outline-lime-50 rounded-xl focus:bg-blue-400 transition duration-400 cursor-pointer p-2`}
                    onClick={() => changeCurrentChat(index+contacts.length,group)}
                >
                  <div class="ml-0.5 text-sm  w-3/5 font-semibold" >{group.selectGroup}{"GROUP"}</div>

                </div>
              );
            })}
          </div>
          <hr className="mb-4"></hr>
          <div className="outline-2 outline-blue-50 shadow-sm rounded-sm">

           
            {/* <div class="flex flex-col space-y-1 mt-4 -mx-2">
              <div class="flex flex-row items-center justify-between text-xs mt-6">
                <span class="font-bold">Archivied</span>
                <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
              </div>
              <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  H
                </div>
                <div class="ml-2 text-sm font-semibold"></div>
              </button>
            </div> */}
            {/* <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div> */}
            {/* <div className="username">
              <h2>{currentUserName}</h2>
            </div> */}
          </div>
       <ManagingGroup socket={socket} handleContactGroup ={showGroup} currentUser = {currentUserId}/>
        </div>
        
      )}
    </>
  );
}
