"use client";
import { CircleCheckBig } from "lucide-react";
export default function SuccessPage() {

    function handleHome() {
        window.location.href = "/";
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center max-w-md bg-bg px-10 py-10 rounded-lg shadow-xl">
                <span><CircleCheckBig className="text-green-500 " size={150} /></span>
                <div className="flex items-center justify-center mt-5">
                    <span className="text-3xl font-bold text-primary p-3 border-y border-wsu">Payment Successful!</span>
                </div>
                <span className="mt-5 text-secondary">Your order has been placed.</span>
                <span className="text-center text-secondary">A confirmation email has been sent to your email address.</span>
                <span className="mt-5 text-primary">Order no: #1000432</span>

                <div className="flex mt-5">
                    <button onClick={handleHome} className="px-4 py-2 bg-wsu text-bg rounded-full hover:bg-textSecondary hover:text-wsu transition-colors ">
                        Continue Shopping
                    </button>
                </div>
            </div>

        </div>
    )
}
