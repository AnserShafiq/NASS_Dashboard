'use client'

import { Managers } from "@/app/lib/definitions";
// import { fetchManagers } from "@/app/lib/fetchings";
import React, { useEffect, useState } from "react"

export default function AddNewAgent(){

    const [managers, setManagers] = useState<Managers[]>([]);
    useEffect(() => {
        const getManagers = async () => {
          try {
            const response = await fetch('/api/managers/create',{method: 'GET'}); // Call server-side function
            const data = await response.json()
            setManagers(data)
          } catch (error) {
            console.error('Error fetching managers:', error);
          }
        };
    
        getManagers();
      }, []);
    // if(managers){
    //     console.log('=> ',managers)
    // }

    const handleSubmission = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch('/api/agents/create',{
            method:'POST',
            body: formData,
        })
        if(response.ok){
            console.log('Agent added')
        }else{
            console.log('Unable to add agent')
        }
        console.log(formData)
    }


    return(
        <form onSubmit={handleSubmission} className="flex flex-wrap">
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Agent&apos;s Name</label>
                <input type='text' placeholder="Agent's Name..." name='name' id='name' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Gender</label>
                <select name='gender' id="gender" required>
                    <option value={''} >Select Option</option>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Email Id</label>
                <input type='email' placeholder="Agent's Email..." name='email' id='email' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Managers</label>
                <select name="manager" id="manager" required>
                    <option value={''} >Select Manager</option>
                    {
                        managers.map((manager) =>(
                            <option value={manager.manager_id} key={manager.manager_id}>{manager.name}</option>
                        ) )
                    }
                </select>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Profile Password</label>
                <input type='text' placeholder="Password..." name='password' id='password' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
            <label>Company Allotted</label>
            <div id="assigned-checkboxes">
                <label>
                    <input type="checkbox" name="assigned" value="One" /> One
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Two" /> Two
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Three" /> Three
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Four" /> Four
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Five" /> Five
                </label>
            </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}