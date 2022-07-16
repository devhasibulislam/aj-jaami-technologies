import './App.css';
import { useQuery } from 'react-query';
import { useState } from 'react';

function App() {
  const [checkedValue, setCheckedValue] = useState('');
  const [filteredItem, setFilteredItem] = useState('');

  const { data: products, refetch } = useQuery('products', () => fetch('./products.json').then(res => res.json()));

  const handleChange = (event) => {
    if (event.target.checked) {
      if (event.target.value === '2020')
        setFilteredItem('year');
      else
        setFilteredItem('shoes');

      setCheckedValue(event.target.value);
    } else {
      setCheckedValue('');
    }
  };

  const filteredProducts = filteredItem === 'year' ? products?.filter(product => product.year.toLowerCase()?.includes(checkedValue?.toLowerCase())) : products?.filter(product => product.category.toLowerCase()?.includes(checkedValue?.toLowerCase()));

  return (
    <section className='App'>
      <div className='container mx-auto my-12'>
        <div className='grid gap-x-8'
          style={{
            gridTemplateColumns: ".3fr .7fr"
          }}
        >
          {/* side bar */}
          <div className='text-left'>
            <div className='fixed top-32 left-24'>
              <p className='cursor-pointer my-1 w-fit'>
                <input type="checkbox" name="sidebar" id="sidebar" value={'2020'} onChange={handleChange} />
                <span className='ml-1'>year: 2020</span>
              </p>
              <p className='cursor-pointer my-1 w-fit'>
                <input type="checkbox" name="sidebar" id="sidebar" value={'shoes'} onChange={handleChange} />
                <span className='ml-1'>category: shoes</span>
              </p>
            </div>
          </div>
          {/* content body */}
          <div className=''>
            <div className='grid grid-cols-2 gap-y-12'>
              {
                filteredProducts?.map((product, index) =>
                  <div className="card w-96 bg-base-100 shadow-xl" key={index}>
                    <figure><img src={product.image} alt={`shoes${index + 1}`} /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {product.name}
                        <div className="badge badge-secondary">{product.size}</div>
                        <div className="badge badge-secondary">{product.brand}</div>
                      </h2>
                      <p className='text-left'>This product based on <span className='badge badge-success'>{product.category}</span></p>
                      <div className="card-actions justify-start mb-4">
                        <div className="badge badge-outline"><b>$</b>{product.price}</div>
                        <div className="badge badge-outline">{product.year}</div>
                      </div>
                      <div className="card-actions">
                        <button className="btn btn-sm btn-outline btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
