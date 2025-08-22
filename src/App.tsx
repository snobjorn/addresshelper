import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <div className="flex flex-row gap-2 container mx-auto">
          <Input placeholder="Street" />
          <Input placeholder="Street Number" />
          <Input placeholder="Apartment, Suite, etc." />
          <Input placeholder="City" />
          <Input placeholder="Zip" />
          <Button>Lookup Address</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
