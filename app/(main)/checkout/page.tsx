import CheckoutForm from "@/components/sections/Checkout";
import Footer from "@/components/ui/Footer";

const Checkout = () => {

  return (
    <section className="relative w-full min-h-screen flex flex-col gap-4 items-center px-10 mt-32 py-10 overflow-hidden z-20">
      <h1 className="text-5xl font-semibold text-quinto">Checkout</h1>

      <CheckoutForm/>   
      <Footer />
    </section>
  );
};

export default Checkout;
