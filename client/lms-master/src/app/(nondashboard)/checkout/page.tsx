"use client"
import Loading from '@/components/Loading';
import WizardStepper from '@/components/WizardStepper';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useUser } from '@clerk/nextjs'
import React from 'react'
import CheckoutDetailsPage from './details';
import PaymentPage from './payment';

const CheckoutWizard = () => {
    const {isLoaded} = useUser();
    const {checkoutStep} = useCheckoutNavigation();
    if(!isLoaded) return <Loading/>
    //below code will keep track of payment step as we have 3 steps
    const renderStep = () => {
        switch(checkoutStep){
            case 1: 
                return <CheckoutDetailsPage/>;
            case 2: 
                return <PaymentPage/>;
            case 3:
                return "completion page";
            default:
                return "checkout details page"
        }

    };
  return (
    <div className='checkout'>
        <WizardStepper currentStep={checkoutStep}/>
        <div className='checkout_content'>{renderStep()}</div>
    </div>
  )
}

export default CheckoutWizard