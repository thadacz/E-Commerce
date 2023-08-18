import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getCart } from "../services/cart.service";
import authApi from "../services/auth.service";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  product: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    stock: number;
    size: string;
    color: string;
  };
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  getItemStock: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
      "shopping-cart",
      []
    );
    const user = authApi.getCurrentUser();
   

   useEffect(() => {
     async function fetchData() {
       try {
         const response = await getCart(user.id);
         const cartItemsData = response.data || [];
         setCartItems(cartItemsData);
       } catch (error) {
         console.error("Error fetching cart items:", error);
       }
     }

     fetchData();
   }, []);

   useEffect(() => {
     const updatedCartQuantity = cartItems.reduce(
       (quantity, item) => item.quantity + quantity,
       0
     );
     setCartQuantity(updatedCartQuantity);
   }, [cartItems]);

   const [cartQuantity, setCartQuantity] = useState(0);

function getItemQuantity(id: number) {
  const itemInCart = cartItems.find(
    (item) => item.product && item.product.id === id
  );
  return itemInCart ? itemInCart.quantity : 0;
}

function getItemStock(id: number) {
  const itemInCart = cartItems.find(
    (item) => item.product && item.product.id === id
  );
  return itemInCart ? itemInCart.product.stock : 0;
}

function increaseCartQuantity(id: number) {
  setCartItems((currItems) => {
    const existingItem = currItems.find(
      (item) => item.product && item.product.id === id
    );
    if (!existingItem) {
      return [...currItems, { product: { id }, quantity: 1 }];
    } else {
      return currItems.map((item) => {
        if (item.product && item.product.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    }
  });
}
function decreaseCartQuantity(id: number) {
  setCartItems((currItems) => {
    const existingItem = currItems.find(
      (item) => item.product && item.product.id === id
    );

    if (existingItem && existingItem.quantity === 1) {
      return currItems.filter((item) => item.product && item.product.id !== id);
    } else {
      return currItems.map((item) => {
        if (item.product && item.product.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    }
  });
}

function removeFromCart(id: number) {
  setCartItems((currItems) => {
    return currItems.filter((item) => item.product && item.product.id !== id);
  });
}

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        getItemStock,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
