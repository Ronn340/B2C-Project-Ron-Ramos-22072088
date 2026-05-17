import { ProductDetail } from "@/components/Blog/Detail";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import App from "next/app";

export default async function Page({ params }: { params: { urlId: string } }) {
    // Find the item matching urlId link paramatere
    const { urlId } = await params;
    const product = await client.db.product.findUnique({
        where: { urlId },
        include: { images: true },
    });

    if (!product) {
        return (
            <AppLayout>
                <div className="text-center text-lg font-semibold">
                    Product not found
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
           {/* Insert ProductDetail component here */}
           <ProductDetail product={product} />
        </AppLayout>
    );
}
