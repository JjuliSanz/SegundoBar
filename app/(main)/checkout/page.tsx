import CheckoutForm from "@/components/sections/Checkout";
import Footer from "@/components/ui/Footer";
import Nav from "../menu/Nav";

const Checkout = () => {

  return (
    <section className="relative w-full min-h-screen flex flex-col gap-4 items-center overflow-hidden z-20">
      <Nav/>
      <h1 className="text-5xl font-semibold text-quinto">Checkout</h1>

      <CheckoutForm/>   
      <Footer />
    </section>
  );
};

export default Checkout;
