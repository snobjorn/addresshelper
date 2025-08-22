import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Address from "@/components/Address";

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Address />
      </main>
      <Footer />
    </>
  );
}

export default App;
