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

        //Essa função aplica o filtro no objeto
        const filterObject = (obj, filter, filterValue) => 
        Object.keys(obj).reduce((acc, val) => 
        (obj[val][filter] !== filterValue ? acc : {
            ...acc,
            [val]: obj[val]
        }), {});

        const filtered = filterObject(_results, "category", "aluguel")
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