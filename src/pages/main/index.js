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

    loadProducts = async()=>{
        const response = await api.get(`/product`);

        const _results = response.data.product;
        let filtered = {};

        console.log('original', _results);

        //Essa função aplica o filtro no objeto
        function filterObject(obj, filter, filterValue, elementArray){
             return Object.keys(obj).reduce((acc, val) => 
            (obj[val][filter] !== filterValue ? acc : {
                ...acc,
                [val]: obj[val]
            }), {});
        }

        function filterObjectInsideArray(obj, filter, elementArray, filterValue){
            return Object.keys(obj).reduce((acc, val)=>
            (obj[val][filter][0][elementArray] !== filterValue ? acc : {
                ...acc, 
                [val]: obj[val]
            }), {});
        } 

        filtered = filterObjectInsideArray(_results, "specs", 'bedrooms', 2);
        filtered = filtered = filterObject(filtered, "category", "aluguel");
        
        console.log(filtered);

    }
    render(){
        const {products, page, productInfo} = this.state;

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