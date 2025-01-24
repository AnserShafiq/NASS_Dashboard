'use client'


export default function DailyReports({Agent}: {Agent:string}){

    const handleDailySubmission = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        // console.log('Form Data => ', formData)
        // eslint-disable-next-line
        const data: Record<string, any>={
            agent_id: Agent,
        }
        // console.log(data)
        formData.forEach((value, key) => {
            data[key] = value
        })

        const response = await fetch( '/api/dailyreport', {method: 'POST', body: JSON.stringify(data)})
        if(response.ok){
            alert('Report got delivered')
        }
        else{
            alert('Report not got created.')
        }
    }

    return(
        <form onSubmit={handleDailySubmission} className="w-1/2 h-full mx-auto mt-4 bg-gray-100 rounded-lg py-3 px-6 shadow-xl shadow-shadow-1">
            <h3>Daily Calls</h3>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Total calls:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='total_calls' id="total_calls"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Calls Connected:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='calls_connected' id="calls_connected"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Rejections:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='calls_rejected' id="calls_rejected"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Positive calls:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='positive_calls' id="positive_calls"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Negative calls:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='negative_calls' id="negative_calls"/>
            </div>
            <h3 className="mt-5">Daily Mails</h3>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Total Sent:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='sent' id="sent"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Opened:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='opened' id="opened"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Bounced:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='bounced' id="bounced"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Direct Responses:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='direct_response' id="direct_response"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Positive Responses:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='positive_responses' id="positive_responses"/>
            </div>
            <div className="flex flex-col" >
                <label className="mb-1 mt-2 block text-sm font-medium text-gray-900">
                    Negative Responses:
                </label>
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" 
                type="number" min={0} name='negative_responses' id="negative_responses"/>
            </div>
            <button className="mt-5 mb-3 mx-auto px-4 py-2 bg-gray-500 text-gray-50 font-semi-bold text-sm rounded-xl" type="submit">Submit Report</button>
        </form>
    )
}