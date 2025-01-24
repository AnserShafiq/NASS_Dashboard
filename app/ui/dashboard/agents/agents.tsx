import DailyReports from "./dailyreport";

// eslint-disable-next-line
export default async function AgentsDashboard({User, Id}:{User: any, Id: any}){
    return (
        <div className="flex flex-col w-full min-h-screen border-2 border-red-600 ">
            Hello Agent: {User.name}
            <DailyReports Agent={Id}/>
        </div>
    )
}