import Product from 'components/Product';
const categories = ['big', 'small', 'animal', 'weird'];

// Create a Category component
function Category({ category, products }) {
  return (
    <div>
      <h1>{category}</h1>
      {products
        .filter((product) => product.category === category)
        .map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
  }

  export default Category;