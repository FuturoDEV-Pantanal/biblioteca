import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Listagem from './pages/Listagem';
import CadastroLivro from './pages/CadastroLivro';
import CadastroLeitor from './pages/CadastroLeitor';
import Emprestimo from './pages/Emprestimo';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import './App.css';

function App() {

  const [livros, setLivros] = useState([]);
  const [leitores, setLeitores] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  useEffect(() => {  
    axios.get('dados.json')     // faz a mesma coisa que o fetch
      .then(resp => resp.data)
      .then(dados => {
        setLivros(dados.livros);
        setLeitores(dados.leitores);
      })
      .catch(erro => console.log(erro))
  }, [])
  
  const excluirLivro = (isbn) => {
    const resposta = window.confirm('Excluir o livro de ISBN ' + isbn + "?");
    if (!resposta)
      return;
    const temEmprestimo = emprestimos.some(emp => emp.isbnLivro === isbn);
    if (temEmprestimo) {
      alert('Não é possível excluir livro com empréstimo ativo!');
      return;  
    } 
    const lista = livros.filter(l => l.isbn !== isbn);
    setLivros(lista);
  }

  const excluirLeitor = (cpf) => {
    const resposta = window.confirm('Excluir o leitor de CPF ' + cpf + "?");
    if (!resposta)
      return;
    const temEmprestimo = emprestimos.some(emp => emp.cpfLeitor === cpf);
    if (temEmprestimo) {
      alert('Não é possível excluir leitor com empréstimo ativo!');
      return;  
    }
    const lista = leitores.filter(l => l.cpf !== cpf);
    setLeitores(lista);
  }

  const excluirEmprestimo = (id) => {  // devolver o livro daquele leitor 
    const resposta = window.confirm('Devolver o livro referente ao empréstimo de identificador ' + id + "?");
    if (!resposta)
      return;
    const emprestimo = emprestimos.find(e => e.id === id);
    const livrosAtualizados = livros.map(livro => {
      if (livro.isbn === emprestimo.isbnLivro)
        livro.disponivel = true;
      return livro;
    });
    const leitoresAtualizados = leitores.map(leitor => {
      if (leitor.cpf === emprestimo.cpfLeitor)
        leitor.emprestimosAtivos = leitor.emprestimosAtivos - 1;
      return leitor;
    });
    const lista = emprestimos.filter(e => e.id !== id);
    setEmprestimos(lista);
    setLivros(livrosAtualizados);
    setLeitores(leitoresAtualizados);
  }

  const incluirLivro = (novo) => {
    novo.disponivel = true;
    setLivros([...livros, novo]);
  }

  const alterarLivro = (atualizado) => {
    const lista = livros.map(livro => {
      if (livro.isbn === atualizado.isbn) {
        atualizado.disponivel = livro.disponivel;
        return atualizado;
      }
      return livro;
    });
    setLivros(lista);
  }

  const incluirLeitor = (novo) => {
    novo.emprestimosAtivos = 0;
    setLeitores([...leitores, novo]);
  }

  const alterarLeitor = (atualizado) => {
    const lista = leitores.map(leitor => {
      if (leitor.cpf === atualizado.cpf) {
        atualizado.emprestimosAtivos = leitor.emprestimosAtivos;         
        return atualizado;
      }
      return leitor;
    });
    setLeitores(lista);
  }

  const incluirEmprestimo = (cpf, isbn) => {
    const livro = livros.find(l => l.isbn === isbn);
    const leitor = leitores.find(l => l.cpf === cpf);
    const novo = {
      id: Math.floor(Math.random() * 999999),
      isbnLivro: livro.isbn,
      cpfLeitor: leitor.cpf,
      dataEmprestimo: new Date()
    }
    const livrosAtualizados = livros.map(livro => {
      if (livro.isbn === isbn)
        livro.disponivel = false;
      return livro;
    });
    const leitoresAtualizados = leitores.map(leitor => {
      if (leitor.cpf === cpf)
        leitor.emprestimosAtivos = leitor.emprestimosAtivos + 1;
      return leitor;
    });
    setEmprestimos([...emprestimos, novo]);
    setLivros(livrosAtualizados);
    setLeitores(leitoresAtualizados);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Cabecalho />
        <Routes>
          <Route path="/" element = { 
              <Listagem livros={livros} leitores={leitores} emprestimos={emprestimos} 
                  fcExcluirLivro={excluirLivro} fcExcluirLeitor={excluirLeitor} fcExcluirEmprestimo={excluirEmprestimo}
                 />
            } />   
          <Route path="cadastro-livro/:isbnParam?" element = { 
              <CadastroLivro livros={livros} fcIncluirLivro={incluirLivro} fcAlterarLivro={alterarLivro} />
            } />
          <Route path="cadastro-leitor/:cpfParam?" element = { 
            <CadastroLeitor leitores={leitores} fcIncluirLeitor={incluirLeitor} fcAlterarLeitor={alterarLeitor} /> 
            } />
          <Route path="emprestimo" element = { 
              <Emprestimo leitores={leitores} livrosDisponiveis={ livros.filter(l => l.disponivel) } fcRealizarEmprestimo={incluirEmprestimo} />
            } />
        </Routes>
        <Rodape />
      </div>
    </BrowserRouter>
  );
}

export default App;
