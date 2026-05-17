import ProductList from "@/components/Blog/List";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
export default async function Page({ searchParams }: {
    searchParams:
    {
        gender?: string;
        type?: string;
        sort?: string
    }
}) {
    const { gender, type, sort } = searchParams;

    const products = await client.db.product.findMany({
        where: {
            active: true,
            gender: gender ? gender : undefined,
            articleType: type ? type : undefined
        },
        orderBy: 
            sort === "Best Reviews" ? { rating: "desc" } :
            sort === "Price Ascending" ? { price: "asc" } :
            sort === "Price Descending" ? { price: "desc" } :
            sort === "Name Ascending" ? { name: "asc" } :
            sort === "Name Descending" ? { name: "desc" }:
            undefined,
        include: {
            images: true
        }
    })

    return <div>
        <AppLayout>
            <ProductList products={products} />
        </AppLayout>
    </div>
}