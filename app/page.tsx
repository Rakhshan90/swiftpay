import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import Landing from "@/components/landing";


export default function Home() {
  return (
    <div>
      <div className="min-h-screen max-w-7xl mx-auto">
        <Landing />
        <Features />
      </div>
      <Footer />
    </div>
  );
}
