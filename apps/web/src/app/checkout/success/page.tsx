"use client";
import { CircleCheckBig, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true)
    const [orderId, setOrderId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ stripeSessionId: sessionId }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.order?.id) {
                        setOrderId(data.order.id);
                    } else {
                        setError(data.message)
                    }
                    setLoading(false);
                });
        } else {
            setError("No session ID found");
            setLoading(false)
        }
    }, [sessionId]);


    if (loading) return <div className="text-lg font-semibold flex items-center justify-center h-screen">Loading...</div>

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center max-w-md bg-bg px-10 py-10 rounded-lg shadow-xl">
                {error ?
                    (
                        <>
                            <span><TriangleAlert className="text-red-500 " size={150} /></span>
                            <div className="flex items-center justify-center mt-5">
                                <span className="text-3xl font-bold text-primary p-3 border-y border-wsu">Uh oh, Something went wrong!</span>
                            </div>
                            <span className="mt-5 text-secondary">Please try again later.</span>
                            <span className="text-center text-secondary">Contact support if problem persists</span>

                            <div className="flex mt-5">
                                <button onClick={() => router.push("/")} className="px-4 py-2 bg-wsu text-bg rounded-full hover:bg-textSecondary hover:text-wsu transition-colors ">
                                    Go Home
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span><CircleCheckBig className="text-green-500 " size={150} /></span>
                            <div className="flex items-center justify-center mt-5">
                                <span className="text-3xl font-bold text-primary p-3 border-y border-wsu">Payment Successful!</span>
                            </div>
                            <span className="mt-5 text-secondary">Your order has been placed.</span>
                            <span className="text-center text-secondary">A confirmation email has been sent to your email address.</span>
                            {orderId && <span className="mt-5 text-primary">Order no: {orderId}</span>}

                            <div className="flex mt-5">
                                <button onClick={() => router.push("/")} className="px-4 py-2 bg-wsu text-bg rounded-full hover:bg-textSecondary hover:text-wsu transition-colors ">
                                    Continue Shopping
                                </button>
                            </div>
                        </>
                    )
                }
            </div >
        </div >
    )
}
