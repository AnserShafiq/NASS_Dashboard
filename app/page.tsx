import Left from "@/app/ui/home/left";


export default function Page(){
  return (
    <div className='flex flex-col lg:flex-row w-screen h-screen bg-blue-50'>
      <div className="w-2/5 ">
        <Left />
      </div>
      <div className="w-3/5 bg-home bg-cover bg-right-top"/>
    </div>  
  )
}