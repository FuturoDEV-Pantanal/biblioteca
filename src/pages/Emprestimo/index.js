import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Emprestimo( {leitores, livrosDisponiveis, fcRealizarEmprestimo} ) {

  const cpfRef = useRef();
  const isbnRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    const cpfLeitor = cpfRef.current.value;
    const isbnLivro = isbnRef.current.value;

    if (!cpfLeitor || !isbnLivro) {
      alert('Todos os campos são de preenchimento obrigatório!');
      return;
    }

    fcRealizarEmprestimo(+cpfLeitor, isbnLivro);  // colocando + para passar cpf como numérico no parametro da function
    alert(`Empréstimo cadastrado com sucesso!`);
    isbnRef.current.value = '';
    cpfRef.current.value = '';
  }

  return (
    <div className='emprestimo-container'>
      <div className='titulo-cadastro'>
        Cadastro de Empréstimo
      </div>
      <form className='form-emprestimo' onSubmit={handleSubmit}>
        <div className='form-grupo'>
          <label htmlFor='input-leitor'>Leitor: </label>
          <select name="input-leitor" id='input-leitor' ref={cpfRef}>
            <option key={0} value=''>Selecione o Leitor</option>
            {
              leitores.map(leitor => <option key={leitor.cpf} value={leitor.cpf}>{`${leitor.cpf} - ${leitor.nome}`}</option>)
            }
          </select>
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-livro'>Livro: </label>
          <select name="input-livro" id='input-livro' ref={isbnRef}>
            <option key={1} value=''>Selecione o Livro</option>
            {
              livrosDisponiveis.map(livro => <option key={livro.isbn} value={livro.isbn}>{livro.titulo}</option>)
            }
          </select>
        </div>
        <div>
          <button className='btn-voltar'><Link to='/'>Voltar</Link></button>
          <input type='submit' value='Confirmar' className='btn-submit'/>
        </div>
      </form>
    </div>
  )
}
