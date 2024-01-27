import blueDino from './img/blue-dino-bronco.jpg';
import seaTurtle from './img/sea-turtle.jpg';

// Define the categories
const categories = ['big', 'small', 'animal', 'weird'];

// Create a Product component
function Product({ product }) {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
}


// Create a Category component
function Category({ category, products }) {
  return (
    <div>
      <h1>{category}</h1>
      {products
        .filter(product => product.category === category)
        .map(product => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
}


// Create a Home component
export function Home({products}) {
  return (
    <div>
      <img src={blueDino} alt="Welcome to our toy store: McKnuffel!" />
      {categories.map(category => (
        <Category key={category} category={category} products={products} />
      ))}
    </div>
  );
}

// Mock product data
export const products = [
  { id: 1, name: 'Big Toy', description: 'A big toy', category: 'big', image: seaTurtle },
];

