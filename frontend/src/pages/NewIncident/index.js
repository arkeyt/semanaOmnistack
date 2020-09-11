import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 

import api from '../../services/api';

import logoImg from '../../asset/logo.svg';
import './style.css';


function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('incidents',data, {
                headers:{
                    Authorization : ongId,
                }
            });
            history.push('/profile'); 
        } catch (error) {
           alert('Erro ao cadastrar caso, tente novamente.'); 
        }
    }

    return (
    <div className="new-incident-container">
            <div className=" content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    
                    <h1>Cadastro novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resovler isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/> 
                        voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange = { e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange = { e => setDescription(e.target.value)}
                    />                    
                    <input 
                        placeholder="valor em reais"
                        value={value}
                        onChange = { e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        );
}

export default NewIncident;