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

        this.setState({products: response.data.product});

        console.log('state', this.state);
    }

    handleFilter = (event) =>{
        const _state = this.state.products;
        
        const { name, value } = event.target;

        console.log('name ->', name, 'value ->', value);

        let filtered = {};

        filtered = this.filterObject(_state, name, value);

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
                    <form>
                        <label>
                            Alugar: <input type="checkbox" name="category" value="alugar" onChange={this.handleFilter}/>
                            Comprar: <input type="checkbox" name="category" value="vender" />
                        </label>
                        <select name="category" onChange={this.handleFilter}>
                            <option value="apartamento">Apartamento</option>
                            <option value="casa">Casa</option>
                        </select>
                        <button>Enviar</button>
                    </form>
                </div>
                <div className="product-list">
                    {products.map(product => (
                        <article key={product._id}>
                            <strong>{product.label}</strong><br/>
                            <i>{product.category}</i>
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