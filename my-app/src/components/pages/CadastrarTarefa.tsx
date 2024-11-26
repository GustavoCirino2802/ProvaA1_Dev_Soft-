import { useState, useEffect } from "react";
import { Tarefa } from "../../models/Tarefa";
import axios from "axios";

function CadastrarTarefa() {
    const [nome, setNome] = useState("");
    const [categorias, setCategorias] = useState<any[]>([]);
    const [categoriaId, setCategoriaId] = useState(0);

    useEffect(() => {
        const carregarCategorias = async () => {
            try {
                const resposta = await axios.get("http://localhost:5000/api/categoria/listar");
                if (resposta.status === 200) {
                    setCategorias(resposta.data);
                    // Define a primeira categoria como padrão se existir
                    if (resposta.data.length > 0) {
                        setCategoriaId(resposta.data[0].categoriaId);
                    }
                }
            } catch (erro) {
                console.error("Erro ao carregar categorias:", erro);
                alert("Erro ao carregar categorias!");
            }
        };

        carregarCategorias();
    }, []);

    const enviarTarefa = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const tarefa: Tarefa = {
            tarefaId: 0,
            nome: nome,
            status: "Não iniciada",
            categoriaId: categoriaId
        };

        try {
            const resposta = await axios.post(
                "http://localhost:5000/api/tarefa/cadastrar",
                tarefa,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (resposta.status === 201 || resposta.status === 200) {
                alert("Tarefa cadastrada com sucesso!");
                setNome("");
                
                if (categorias.length > 0) {
                    setCategoriaId(categorias[0].categoriaId);
                }
            }
        } catch (erro) {
            console.error("Erro ao cadastrar tarefa:", erro);
            alert("Erro ao cadastrar tarefa!");
        }
    };

    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={enviarTarefa} id="form-cadastro">
                <div className="form-group">
                    <label htmlFor="nome">Nome da Tarefa:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        required
                        onChange={(event) => setNome(event.target.value)}
                        placeholder="Digite o nome da tarefa"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                        id="categoria"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <p>Status inicial: Não iniciada</p>
                    <small>O status pode ser alterado posteriormente para:</small>
                    <ul>
                        <li>Em andamento</li>
                        <li>Concluído</li>
                    </ul>
                </div>

                <button type="submit" disabled={!categoriaId}>
                    Cadastrar Tarefa
                </button>
            </form>
        </div>
    );
}

export default CadastrarTarefa;