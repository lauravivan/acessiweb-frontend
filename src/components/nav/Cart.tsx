import { useCart } from "@/context/cart";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";

export default function Cart() {
  const { guidelinesTotal } = useCart();

  return (
    <Link
      href="/projetos/cadastrar"
      aria-label="Ir para tela de cadastro de projeto"
      className="nav__cart cursor-pointer"
    >
      <SlBasket
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
      <span role="status" aria-atomic={true}>
        <span className="sr-only">Total de </span>
        {guidelinesTotal}
        <span className="sr-only">items no carrinho</span>
      </span>
    </Link>
  );
}
