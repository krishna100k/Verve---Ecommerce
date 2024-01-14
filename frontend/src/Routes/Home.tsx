import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products home = {true} filters={{}} category="all" />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
