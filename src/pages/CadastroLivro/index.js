import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';

export default function CadastroLivro( {livros, fcIncluirLivro, fcAlterarLivro} ) {

  const { isbnParam } = useParams();   // o ? no Router indica que este parametro é opcional 

  const isbnRef = useRef();
  const tituloRef = useRef();
  const autorRef = useRef();
  
  useEffect(() => {  // dentro do useEffect para garantir que o componente já carregou/renderizou
    if (isbnParam !== undefined) {  // tá prenchida???
      const livro = livros.find(l => l.isbn === isbnParam);
      isbnRef.current.value = livro.isbn;
      tituloRef.current.value = livro.titulo;
      autorRef.current.value = livro.autores;
    }
  }, [isbnParam, livros])
 
  function handleSubmit(e) {
    e.preventDefault();
    const isbn = isbnRef.current.value;
    const titulo = tituloRef.current.value;
    const autores = autorRef.current.value;

    if (!isbn || !titulo || !autores) {
      alert('Todos os campos são de preenchimento obrigatório!');
      return;
    }

    const dados = { isbn, titulo, autores };
    const isNovo = isbnParam === undefined;   // booleano
    if (isNovo) {    
      const isbnJaCadastrado = livros.some(l => l.isbn === isbn);
      if (isbnJaCadastrado) {
        alert('ISBN já cadastrado!');
        return;
      }
      fcIncluirLivro(dados);
      alert(`Livro ${isbn} cadastrado com sucesso!`);
      // limpando campos
      isbnRef.current.value = '';
      tituloRef.current.value = '';
      autorRef.current.value = '';
    } else {
      fcAlterarLivro(dados);
      alert(`Livro ${isbn} atualizado com sucesso!`);
    }
  }

  return (
    <div className='cadastro-container'>
      <div className='titulo-cadastro'>
        Cadastro de Livro
      </div>
      <form className='form-livro' onSubmit={handleSubmit}>
        <div className='form-grupo'>
          <label htmlFor='input-isbn'>ISBN: </label>
          <input type='text' id='input-isbn' ref={isbnRef} placeholder='Informe o ISBN' size={50} disabled={isbnParam}/>
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-titulo'>Título: </label>
          <input type='text' id='input-titulo' ref={tituloRef} placeholder='Informe o título' size={50}/>
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-autor'>Autores: </label>
          <input type='text' id='input-autor' ref={autorRef} placeholder='Informe o(s) autor(es)' size={50}/>
        </div>
        <div>
          <button className='btn-voltar'><Link to='/'>Voltar</Link></button>
          <input type='submit' value={!isbnParam ? 'Inserir' : 'Atualizar'} className='btn-submit'/>
        </div>
      </form>
    </div>
  )
}
