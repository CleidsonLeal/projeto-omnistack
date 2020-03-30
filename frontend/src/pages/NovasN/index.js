import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import{FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'
export default function  NovasN() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const doadorId = localStorage.getItem('doadorId');

    async function handleNewNecessidade(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('necessidades', data, {
                headers: {
                    Authorization:doadorId,
                }
            })
            history.push('/profile')
        }   catch (err) {
            alert('Erro ao enviar solicitação, tente novamente.')
        }
            

    }




    return (
        
        <div className="nova-n">
            <section>
                <img src="{logoImg}" alt="Seja um Doador"/>
                <h1>Cadastrar nova ação</h1>
                <p>Doe, ajude o próximo.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                     Voltar para HOME
                </Link>

            </section>

            <form onSubmit={handleNewNecessidade}>
                <input 
                    placeholder="Oque necessito"    
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                <textarea  
                    placeholder = "Descrição"       
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input 
                    placeholder="Valor em Reais"    
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                
                <button className="button" type= "submit">Cadastrar</button>

            </form>


        </div>
    )
}