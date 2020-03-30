import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const history = useHistory();
    const[necessidades, setNecessidades] = useState([]);
    const doadorId = localStorage.getItem('doadorId');
    const doadorName = localStorage.getItem('doadorName');

    useEffect(() => {
        api.get('profile',  {
            headers: {
                Authorization: doadorId,
            }
        }).then(response => {
            setNecessidades(response.data);
        })
    }, [doadorId]);


    async function handleDeleteNecessidades(id){
        try{
            await api.delete (`necessidades/${id}`,{
                headers: {
                    Authorization: doadorId,
                }
            }
            );

            setNecessidades(necessidades.filter(necessidades => necessidades.id != id));

        } catch (err) {
            alert('Erro ao deletar , tente novamente.');
        }

        

    }


    function handleLogout() {
        localStorage.clear();
        
        history.push('/');
    }



    return (
        <div className="profile-container">
            <header>
                <img src="{logoImg}" alt="Vamos doar" />
                <span>Bem vindo, {doadorName}</span>

                <Link className="button" to="/necessidades/novas">Cadastrar nova necessidade</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>


            </header>

            <h1>CASOS CADASTRADOS</h1>

            <ul>
                {necessidades.map(necessidades =>(
                    <li key={necessidades.id}>
                        <strong>Caso:</strong>
                        <p>{necessidades.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{necessidades.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(necessidades.value)}</p>



                    <button onClick={() => handleDeleteNecessidades(necessidades.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
                




            </ul>


        </div>

    )
}