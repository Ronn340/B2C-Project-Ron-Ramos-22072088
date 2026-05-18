import { CartItem, Product } from "@prisma/client";
type CartItemWithProduct = CartItem & { product: Product };

export function CartListItem({ item }: { item: CartItemWithProduct }) {
    return (
        <div className="flex gap-2 py-4">
            {/* Left side item */}
            <div className="flex w-1/5 p-4 items-center justify-center">
                <img src={item.product.imageUrl} alt={item.product.name}
                    className="w-full aspect-square border border-gray-300 rounded-lg" />
            </div>
            {/* Right side details */}
            <div className="flex flex-col w-3/4 pt-4">
                <span className="text-base font-semibold text-primary">{item.product.name}</span>
                <span className="text-sm text-gray-500 mt-1">Colour: {item.product.colour}</span>
                <span className="text-sm text-gray-500">Size: Men S</span>
                <span className="text-lg font-bold text-primary mt-1">${item.product.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 border rounded-lg w-fit bg-textSecondary border-primary my-2">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-wsu rounded-lg">
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-wsu rounded-lg">
                        +
                    </button>
                </div>
                <button className="flex text-sm text-wsu mt-1 hover:underline">
                    Remove
                </button>
                <span className="text-sm font-semibold text-primary">Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    );
}