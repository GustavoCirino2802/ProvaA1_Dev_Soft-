import { useState, useEffect } from "react";
import axios from "axios";

function AlterarTarefa() {
    const [tarefas, setTarefas] = useState<any[]>([]);

    // Carregar tarefas ao montar o componente
    useEffect(() => {
        carregarTarefas();
    }, []);

    const carregarTarefas = async () => {
        try {
            const resposta = await axios.get("http://localhost:5000/api/tarefa/listar");
            setTarefas(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar tarefas:", erro);
            alert("Erro ao carregar tarefas!");
        }
    };

    const alterarStatus = async (tarefaId: number) => {
        try {
            const resposta = await axios.patch(
                `http://localhost:5000/api/tarefa/alterar/${tarefaId}`,
                { tarefaId: tarefaId }
            );

            if (resposta.status === 200) {
                alert("Status alterado com sucesso!");
                carregarTarefas(); // Recarrega a lista de tarefas
            }
        } catch (erro) {
            console.error("Erro ao alterar status:", erro);
            alert("Erro ao alterar status!");
        }
    };

    return (
        <div>
            <h1>Alterar Status das Tarefas</h1>
            <div className="tarefas-lista">
                {tarefas.map((tarefa) => (
                    <div key={tarefa.tarefaId} className="tarefa-item">
                        <span>Nome: {tarefa.nome}</span>
                        <span>Status atual: {tarefa.status}</span>
                        <button onClick={() => alterarStatus(tarefa.tarefaId)}>
                            Avançar Status
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlterarTarefa;