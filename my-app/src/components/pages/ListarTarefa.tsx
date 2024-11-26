import { useState, useEffect } from "react";
import axios from "axios";

function Listar() {
    const [tarefas, setTarefas] = useState<any[]>([]);

    useEffect(() => {
        carregarTarefas();
    }, []);

    const carregarTarefas = async () => {
        try {
            const resposta = await axios.get("http://localhost:5000/api/tarefa/listar");
            if (resposta.status === 200) {
                setTarefas(resposta.data);
            }
        } catch (erro) {
            console.error("Erro ao carregar tarefas:", erro);
            alert("Erro ao carregar tarefas!");
        }
    };

    return (
        <div>
            <h1>Todas as Tarefas</h1>
            <div className="tarefas-lista">
                {tarefas.map((tarefa) => (
                    <div key={tarefa.tarefaId} className="tarefa-item">
                        <span>Nome: {tarefa.nome}</span>
                        <span>Status: {tarefa.status}</span>
                    </div>
                ))}
                {tarefas.length === 0 && <p>Nenhuma tarefa cadastrada</p>}
            </div>
        </div>
    );
}

export default Listar;