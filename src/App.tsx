import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Address from "@/features/check/Address";
import { AddressProvider } from "./contexts/AddressContext";



function App() {
  return (
    <AddressProvider>
      <Header />
      <main className="p-4">
        <Address />
      </main>
      <Footer />
    </AddressProvider>
  );
}

export default App;
