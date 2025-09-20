import blueDino from './img/blue-dino-bronco.jpg';
import seaTurtle from './img/sea-turtle.jpg';
import greenTrex from './img/green-dino.jpg';

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
  { id: 1, name: 'Great Green Sea Turtle', description: 'We bought this toy when we were at an aquarium in  New Zealand, the name of the aquarium was Kelly Tarltons', category: 'big', image: seaTurtle },
  { id: 2, name: 'Green T-Rex', description: 'We just got this one from Beckett when he was very small, he left it at our house in New Zealand', category: 'weird', image: greenTrex },
];

