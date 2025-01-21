'use client'

import React from "react"

export default function AddNewAgent(){

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
                <label>Manager&apos;s Name</label>
                <input type='text' placeholder="Manager's Name..." name='manager' id='manager' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Profile Password</label>
                <input type='text' placeholder="Password..." name='password' id='password' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Company Alloted</label>
                <select name='assigned' id="assigned" required>
                    <option value={''} >Select Option</option>
                    <option value={'One'}>One</option>
                    <option value={'Two'}>Two</option>
                    <option value={'Three'}>Three</option>
                    <option value={'Four'}>Four</option>
                    <option value={'Five'}>Five</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}