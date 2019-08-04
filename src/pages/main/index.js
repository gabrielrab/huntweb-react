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

    // Função para aplicar filtro "simples"
    filterObject = (obj, filter, filterValue) =>{
        return Object.keys(obj).reduce((acc, val) => 
       (obj[val][filter] !== filterValue ? acc : {
           ...acc,
           [val]: obj[val]
       }), {});
   }

   // Função para aplicar o filtro quando tem um elemento dentro de array
   filterObjectInsideArray = (obj, filter, elementArray, filterValue) =>{
       return Object.keys(obj).reduce((acc, val)=>
       (obj[val][filter][0][elementArray] !== filterValue ? acc : {
           ...acc, 
           [val]: obj[val]
       }), {});
   }

   //Aqui carrego todos os products
    loadProducts = async()=>{
        const response = await api.get(`/product`);

        this.setState({products: response.data.product});

        console.log('state', this.state);
    }

    //Função do onchange 
    handleFilter = (event) =>{
        const _state = this.state.products;
        
        const { name, value } = event.target;

        let filtered = {};

        filtered = this.filterObject(_state, name, value);

        
        const filteredArray = [];
        
        //O if abaixo é uma gambiarra pois depois que eu aplicava o filtro e vinha mais de 1 resultado, a primeira posição do array obtia undefined
        if(Object.keys(filtered).length > 1){

            //Essa parte aqui eu uso para deixar do formato do state
            for(let i = 0; i < Object.keys(filtered).length + 1; i++){
                filteredArray.push(filtered[i]);
            }

            filteredArray.shift();

            return this.setState({products: filteredArray});
        } else{
            for(let i = 0; i < Object.keys(filtered).length; i++){
                filteredArray.push(filtered[i]);
            }

            return this.setState({products: filteredArray});
        }
    }
    render(){
        const {products} = this.state;

        return (
            <div>
                <div className="filter">
                    <form>
                        <label>
                            Alugar: <input type="checkbox" name="category" value="alugar" onChange={this.handleFilter} />
                            Comprar: <input type="checkbox" name="category" value="vender" onChange={this.handleFilter}/>
                        </label>
                        <select name="label" onChange={this.handleFilter}>
                            <option hidden>Selecione</option>
                            <option value="Apartamento ">Apartamento</option>
                            <option value="Lote">Lote</option>
                            <option value="Casa">Casa</option>
                        </select>
                        <button>Enviar</button>
                        <button onChange={this.loadProducts}>Limpar</button>
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
                </div>
            </div>
        )
    }
}