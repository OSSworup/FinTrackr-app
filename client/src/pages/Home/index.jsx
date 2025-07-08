import Features from "../../components/HomeUIComponents/Features";
import Footer from "../../components/HomeUIComponents/Footer";
import Header from "../../components/HomeUIComponents/Header";
import Hero from "../../components/HomeUIComponents/Hero";


function Home(){
    return <div className="font-['Roboto']">
        <Header/>
        <main>
            <Hero/>
            <Features/>
        </main>
        <Footer/>
    </div>
}

export default Home;