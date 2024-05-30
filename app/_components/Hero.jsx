import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const Hero = () => {
  return (
    <div>
        <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Create your  Form
        <strong className="font-extrabold text-primary sm:block"> In Seconds Not in Hours </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-gray-500">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button size='lg'
        className="block w-full px-12 py-3 text-sm font-medium text-white shadow sm:w-auto"
        ><SignInButton>+ Create AI Form</SignInButton></Button> 

        
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero