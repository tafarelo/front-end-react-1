import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const repositorie = {
      title: "Desafio ReactJS",
      url: "www.teste.com/meuprojeto",
      techs: ["react", "react native"]
    }
    const POST_REPOSITORIE = await api.post('/repositories', repositorie);
    getRepositories();
  }

  async function handleRemoveRepository(id) {
    const DELETE_REPOSITORIE = await api.delete(`/repositories/${id}`);
    getRepositories();
  }

  async function getRepositories() {
    const response = await api.get('/repositories');
    setRepositories([...response.data]);
  }

  useEffect(() => {
    getRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories && repositories.map((item) => {
            return (<li key={item.id}>
              {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
            </li>)
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
