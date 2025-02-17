import About from "@/components/client/About";
import { Banner } from "@/components/client/Banner";
import BestSeller from "@/components/client/BestSeller";
import ContactForm from "@/components/client/ContactForm";
import PublishingCTA from "@/components/client/Cta";
import FavoriteBook from "@/components/client/FavoriteBook";
import OtherBooks from "@/components/client/OtherBooks";
import PublishingPackages from "@/components/client/Packages";
import Packages from "@/components/client/Packages";
import PromoBanner from "@/components/client/PromoBanner";
import Services from "@/components/client/Services";
import WhoWeAre from "@/components/client/WhoWeAre";

export default function Home() {
  return (
   <>
   <Banner />
   
   <BestSeller />
   <WhoWeAre />
   <Services />
   <Packages />
   <PublishingCTA />
   <FavoriteBook /> 
   <OtherBooks />
   <About/>
   <ContactForm/>
   
   </>
  );
}
