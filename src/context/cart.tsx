"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePush } from "./push";

type CartType = {
  name: string;
  description: string;
  guidelines: { id: string; name: string }[];
};

type CartContextType = {
  cart: CartType;
  guidelinesTotal: number;
  addGuidelineToCart: (_guide: { id: string; name: string }) => void;
  removeGuidelineOfCart: (_guideId: string) => void;
  addNameToCart: (_name: string) => void;
  addDescriptionToCart: (_desc: string) => void;
  cleanCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartType>({
    name: "",
    description: "",
    guidelines: [],
  });
  const [guidelinesTotal, setGuidelinesTotal] = useState(0);
  const { setPushMsg, setShowPush } = usePush();

  useEffect(() => {
    const c = localStorage.getItem("acessibiweb-cart");

    if (c) {
      const cParsed: CartType = JSON.parse(c);
      const guides = [...cParsed.guidelines];

      setCart(cParsed);
      setGuidelinesTotal(guides.length);
    }
  }, []);

  const addGuidelineToCart = (guideline: { id: string; name: string }) => {
    const cartGuides = [...cart.guidelines];

    if (cartGuides.length > 0) {
      const alreadyExists = cartGuides.find(
        (guide) => guide.id === guideline.id
      );

      if (!alreadyExists) {
        setGuidelinesTotal((prevTotal: number) => prevTotal + 1);

        setCart((prevCart: CartType) => {
          const guides = [...prevCart.guidelines];

          guides.push(guideline);

          const newCart = { ...prevCart, guidelines: guides };

          saveCart(newCart);

          return newCart;
        });
      } else {
        setShowPush(true);
        setPushMsg(
          "Essa diretriz já foi adicionada ao seu projeto. Acesse ele pelo ícone de carrinho no menu"
        );
      }
    } else {
      cartGuides.push(guideline);

      setGuidelinesTotal((prevTotal: number) => prevTotal + 1);
      setCart((prevCart: CartType) => {
        const newCart = { ...prevCart, guidelines: cartGuides };
        saveCart(newCart);
        return newCart;
      });
    }
  };

  const removeGuidelineOfCart = (guidelineId: string) => {
    setCart((prevCart: CartType) => {
      const guides = [...prevCart.guidelines];

      const newGuides = guides.filter(
        (guideline) => guideline.id !== guidelineId
      );

      if (newGuides.length < guides.length) {
        const newCart = { ...prevCart, guidelines: newGuides };

        saveCart(newCart);
        setGuidelinesTotal((prevTotal: number) => prevTotal - 1);

        return newCart;
      }

      return prevCart;
    });
  };

  const addNameToCart = (name: string) => {
    setCart((prevCart: CartType) => {
      const newCart = {
        ...prevCart,
        name,
      };

      saveCart(newCart);

      return newCart;
    });
  };

  const addDescriptionToCart = (desc: string) => {
    setCart((prevCart: CartType) => {
      const newCart = {
        ...prevCart,
        description: desc,
      };

      saveCart(newCart);

      return newCart;
    });
  };

  const cleanCart = () => {
    const newCart = {
      name: "",
      description: "",
      guidelines: [],
    };

    setCart(newCart);
    setGuidelinesTotal(0);
    saveCart(newCart);
  };

  const saveCart = (cart: CartType) => {
    localStorage.setItem("acessibiweb-cart", JSON.stringify(cart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        guidelinesTotal,
        addGuidelineToCart,
        removeGuidelineOfCart,
        addDescriptionToCart,
        addNameToCart,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
