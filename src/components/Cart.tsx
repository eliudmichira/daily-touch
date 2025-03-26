import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Shopping cart</span>
          <AnimatePresence>
            {getCartCount() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-amber-500 text-white
                  text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {getCartCount()}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-[calc(100vh-8rem)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <ShoppingBag className="h-12 w-12 text-stone-400 mb-4" />
              <p className="text-stone-500 dark:text-stone-400">Your cart is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          {item.name}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-stone-200 dark:border-stone-800 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="block w-full">
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 