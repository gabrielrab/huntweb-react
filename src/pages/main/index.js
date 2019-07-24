import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component{

    state = {
        products: [],
    }

    componentDidMount(){
        this.loadProducts();
    }

    filterObject = (obj, filter, filterValue) =>{
        return Object.keys(obj).reduce((acc, val) => 
       (obj[val][filter] !== filterValue ? acc : {
           ...acc,
           [val]: obj[val]
       }), {});
   }

   filterObjectInsideArray = (obj, filter, elementArray, filterValue) =>{
       return Object.keys(obj).reduce((acc, val)=>
       (obj[val][filter][0][elementArray] !== filterValue ? acc : {
           ...acc, 
           [val]: obj[val]
       }), {});
   }

    loadProducts = async()=>{
        const response = await api.get(`/product`);

        const _results = response.data.product;
        let filtered = {};

        console.log('original', _results);

        filtered = this.filterObjectInsideArray(_results, "specs", 'bedrooms', 2);
        filtered = filtered = this.filterObject(filtered, "category", "aluguel");
        
        console.log('response', response.data.product);
        console.log('filtered', filtered);
        
        this.setState({products: response.data.product});

        console.log('state->', this.state);
    }
    render(){
        const {products} = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button>Anterior</button>
                    <button>Próximo</button>
                </div>
            </div>
        )
    }
}