import axios from "axios"
import React, { useState,useEffect } from "react"


import { addGroupRoute,allGroupRoute,joinGroupRoute } from "../utils/APIRoutes";


export default function ManagingGroup({socket,currentUser,handleContactGroup}) {
    const [groupName, setGroupName] = useState(null);
    const [groupList,setGroupList] = useState([]);
    const [selectGroup, setselectGroup] = useState();
    useEffect(() => {
       axios.get(`${allGroupRoute}`).then((data) => {
            const group = data.data.groups;
            setGroupList(group);
            setselectGroup(group[0].groupName);
        });
       
    },[]);
    const createGroup = async (e) => {
        await axios.post(`${addGroupRoute}`, {
            groupName: groupName,
            user:[],
        })
    }
    useEffect(() => {
        if (socket.current) {
          socket.current.on("joinded_group", (msg) => {
            handleContactGroup(msg);
            console.log(msg);

          });
        }
      }, [socket,selectGroup]);
    const joinGroup = async(e) => {
            console.log(selectGroup);
            await axios.post(`${joinGroupRoute}`,{
                groupName:selectGroup,
                user:currentUser
            })
            
            socket.current.emit('join_group',{selectGroup,currentUser});
            

    }
    return (
        <div className="container">
            <form>
                <p class="mt-4">Group </p>
                <div class="mt-2">

                </div>
                <div class="mb-4">
                    <input type="text" onChange={(e) => setGroupName(e.target.value)} value = {groupName} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"></input>
                </div>
                <div class="text-center pt-1 flex flex-row mb-5 pb-1">
                    <button
                        class="inline-block px-6 py-2.5 text-blue-500  font-medium text-12 leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={createGroup}
                    >
                        Create
                    </button>


                </div>
            </form>
            <form>
                <div class="mb-4">
                    <select onChange= { e => setselectGroup(e.target.value)}   id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                      
                        {groupList.map((group) => 
                            <option   value={group.groupName}>{group.groupName}</option>
                        )}
                        {/* <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option> */}
                    </select>
                </div>
                <div class="text-center pt-1 flex flex-row mb-10 pb-1">

                    <button
                        class="inline-block px-6 py-2.5 text-blue-500  font-medium text-12 leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={joinGroup}
                    >
                        Join
                    </button>

                </div>
            </form>
        </div>
    )
}