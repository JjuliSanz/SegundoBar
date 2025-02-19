import {
  ContactUs,
  Hero,
  About,
  WeServe,
  Videos,
  Gallery,
  Tragos,
} from "@/components/sections";
import Footer from "@/components/ui/Footer";

export default async function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <WeServe />
      <About />
      {/* <Servicies /> */}
      <Tragos />
      <ContactUs />
      <Videos />
      <Gallery />
      <Footer />
    </div>
  );
}
