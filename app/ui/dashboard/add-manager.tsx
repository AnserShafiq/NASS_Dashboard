'use client'
import { useState } from "react"

export default function AddManager ({User}:{User:string}){
    const [contactNumber, setContactNumber] = useState('');
    const handleformattedNumber = (value: string) => {
        console.log('Reading Contact Number....')
        let formattedNumber = value.replace(/\D/g,'')
        if(formattedNumber.length > 10){
            formattedNumber = formattedNumber.slice(0,10)
        }
        formattedNumber = formattedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        setContactNumber(formattedNumber);
    }
    const handleSubmission = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        console.log('==> ', formData);
        // eslint-disable-next-line
        const data: Record<string, any>={
            created_by: User,
        }

        formData.forEach((value, key) => {
            if(key === 'companies'){
                data[key] = data[key] || [];
                (data[key] as string[]).push(value as string);
            }
            else{
                data[key] = value;
            }
        })

        console.log('Final Data = > ', data)

        await fetch('/api/managers/create',{
            method: 'POST',
            body: JSON.stringify(data),
        })
    } 
    return(
        <form onSubmit={handleSubmission} className='flex flex-wrap'>
            
            <div className='flex flex-col w-1/2 border-2 border-black'>
                <label>Manager&apos;s Name</label>
                <input type='text' placeholder="Manager's Name..." name='name' id='name' required/>
            </div>
            <div className='flex flex-col w-1/2 border-2 border-black'>
                <label>Email</label>
                <input type='email' placeholder="Manager's Email..." name='email' id='email' required/>
            </div>
            <div className='flex flex-col w-1/2 border-2 border-black'>
                <label>Contact Number</label>
                <input type='tel' placeholder="Contact Number..." name='contact_number' value={contactNumber} onChange={(e)=>handleformattedNumber(e.target.value)} id='contact_number' required/>
            </div>
            <div className='flex flex-col w-1/2 border-2 border-black'>
                <label>Company To Assign</label>
                <div className=''>
                <label>
                    <input type="checkbox" name="companies" value="One" /> One
                </label>
                <label>
                    <input type="checkbox" name="companies" value="Two" /> Two
                </label>
                <label>
                    <input type="checkbox" name="companies" value="Three" /> Three
                </label>
                <label>
                    <input type="checkbox" name="companies" value="Four" /> Four
                </label>
                <label>
                    <input type="checkbox" name="companies" value="Five" /> Five
                </label>
                </div>
            </div>
            <div className='flex flex-col w-1/2 border-2 border-black'>
                <label>Gender</label>
                <select name='gender' id="gender" required>
                    <option value={''} >Select Option</option>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Profile Password</label>
                <input type='text' placeholder="Password..." name='password' id='password' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>No. Of Agents Assigned</label>
                <input type='number' placeholder="Agents assigned..." name='agents_assigned' id='agents_assigned' required/>
            </div>
            <button type="submit">Submit it</button>
        </form>
    )
}