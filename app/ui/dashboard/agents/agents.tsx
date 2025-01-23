
// eslint-disable-next-line
export default async function AgentsDashboard({User}:{User: any}){
    return (
        <div>
            Hello Agent: {User.name}
        </div>
    )
}