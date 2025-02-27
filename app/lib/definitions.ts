// In this file we are dealing the varaiable's structures

export type User = {
    user_id:string,
    user_name: string,
    user_email:string,
    user_type:string,
    password:string,
};

export type Agent = {
    agent_id: string,
    name: string,
    gender: string,
    email: string,
    company_assigned: string,
    manager_id:string,
    password: string,
}
export type Managers = {
    manager_id: string,
    name: string,
    email:string,
    password: string,
    contact_number: string,
    gender: string,
    companies: string | Array<string>,
    agents_assigned: number,
    created_by: string,
    created_on:string,
}
export const AgentMenu = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },{
        name: 'Your Companies',
        link: '/dashboard',
    },{
        name: 'Your Work',
        link:'/dashboard',
    },{
        name: 'Add New Data',
        link: '/dashboard/newdata',
    },

]
export const ManagerMenu = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },{
        name: 'Our Companies',
        link: '/dashboard',
    },{
        name: 'Our Agents',
        link:'/dashboard',
    },{
        name: 'Client Employers',
        link: '/dashboard',
    },{
        name: 'Job Applicants',
        link: '/dashboard',
    },{
        name: 'Add New Data',
        link: '/dashboard/newdata',
    },

]

// export interface Image {
//     id:number,
//     username:string,
//     title:string,
//     data:Buffer,
//     contentType:string,
//     createdAt: Date,
// };