import { useState, useEffect, useRef } from "react";
import "./App.css";
import Slider from "./Slider";
import ProductCard from "./Productcart";
import { products, categories } from "./data/products";

function Home({ searchTerm, setSearchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const resultsRef = useRef(null);

  // Filter products based on search and category
  useEffect(() => {
        fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      })
      .catch((err) => console.error("Error:", err));
    let filtered = products;



    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (searchTerm && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchTerm, filteredProducts.length]);
    
    const product = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setData(result); // Save the result to state
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Slider />

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All Products
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="results-info" ref={resultsRef}>
        <p>
          Showing <strong>{filteredProducts.length}</strong> products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} isSearchResult={Boolean(searchTerm)} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h2>😔 No products found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default Home;