// In this file we are dealing the varaiable's structures

export type User = {
    profilePic: File,
    id:string,
    user_name: string,
    user_email:string,
    password:string,
};

export const SideMenu = [
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