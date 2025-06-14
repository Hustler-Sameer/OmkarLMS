import CoursePreview from '@/components/CoursePreview';
import Loading from '@/components/Loading';
import SignInComponent from '@/components/SignIn';
import SignUpComponent from '@/components/SignUp';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { useGetCourseQuery } from '@/state/api';
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CheckoutDetailsPage = () => {
   const { course : selectedCourse , isLoading , isError}= useCurrentCourse();
   const searchParams = useSearchParams();
   const showSignUp = searchParams.get("showSignUp") === "true";

   if(isLoading) return <Loading/>
   if(isError) return <div>Failed to fetch course data</div>
   if(!selectedCourse) return <div>Course not found</div>

  return (
    <div className='checkout-details'>
        <div className='checkout-details__container'>
            <div className='checkout-details__preview'>
                <CoursePreview course={selectedCourse}/>
            </div>
            <div className="checkout-details__auth">
            {showSignUp ? <SignUpComponent /> : <SignInComponent />}
          </div>
        </div>
    </div>
  )
}

export default CheckoutDetailsPage