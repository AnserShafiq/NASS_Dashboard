"use client"
import { authenticate } from '@/app/lib/actions';
import {
    AtSymbolIcon,
    KeyIcon,
    ArrowRightIcon,ExclamationCircleIcon
  } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useActionState } from 'react';

export default function Form(){
  const {data:session} = useSession()
  console.log(session)
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
      )
    return(
    <form action={formAction} className="space-y-3 text-black">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`text-black mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="employee_code"
            >
              Employee Code
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="employee_code"
                type="text"
                name="employee_code"
                placeholder="Enter your Employee Code"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <button type='submit' aria-disabled={isPending} className="mt-4 text-gray-900 w-fit py-1 px-10 border-2 border-black rounded-md mx-auto relative">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-900 absolute h-full top-[2%] right-2" />
        </button>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className='text-red-500 text-sm'>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
    )
}