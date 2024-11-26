import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Cadastrar from "./components/pages/CadastrarTarefa";
import Alterar from "./components/pages/AlterarTarefa";
import Listar from "./components/pages/ListarTarefa";
import ListarConcluidas from "./components/pages/ListarTarefaConcluida";
import ListarNaoConcluidas from "./components/pages/ListarTarefaNaoConcluida";

function App() {
    return (
        <div id="app">
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/pages/tarefa/listar">Listar Tarefas</Link></li>
                        <li><Link to="/pages/tarefa/cadastrar">Cadastrar Tarefa</Link></li>
                        <li><Link to="/pages/tarefa/alterar">Alterar Tarefa</Link></li>
                        <li><Link to="/pages/tarefa/concluidas">Listar Concluídas</Link></li>
                        <li><Link to="/pages/tarefa/naoconcluidas">Listar Não Concluídas</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/pages/tarefa/listar" element={<Listar />} />
                    <Route path="/pages/tarefa/cadastrar" element={<Cadastrar />} />
                    <Route path="/pages/tarefa/alterar" element={<Alterar />} />
                    <Route path="/pages/tarefa/concluidas" element={<ListarConcluidas />} />
                    <Route path="/pages/tarefa/naoconcluidas" element={<ListarNaoConcluidas />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;