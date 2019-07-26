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

        filtered = this.filterObjectInsideArray(_results, "specs", 'bedrooms', 2);
        filtered = filtered = this.filterObject(filtered, "category", "aluguel");

        const filteredArray = [];

        for(let i = 0; i < Object.keys(filtered).length; i++){
            filteredArray.push(filtered[i]);
        }

        this.setState({products: filteredArray});
    }
    render(){
        const {products} = this.state;

        return (
            <div>
                <div className="filter">
                    <form method="get">
                        <label>
                            <input type="checkbox" value="alugar" placeholder="Aqui"/>
                            <select name="category">
                                <option>Apartamento</option>
                                <option>Casa</option>
                            </select>
                        </label>
                        <button>Enviar</button>
                    </form>
                </div>
                <div className="product-list">
                    {products.map(product => (
                        <article key={product._id}>
                            <strong>{product.label}</strong>
                            <p>{product.description}</p>
                            
                            <Link to={`/products/${product._id}`}>Acessar</Link>
                        </article>
                    ))}
                    <div className="actions">
                        <button>Anterior</button>
                        <button>Próximo</button>
                    </div>
                </div>
            </div>
        )
    }
}