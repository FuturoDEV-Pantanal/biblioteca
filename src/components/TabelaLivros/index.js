import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './styles.css';

export default function TabelaLivros( {linhas, fcExcluirLivro} ) {
  if (linhas.length === 0)
    return (<h3>Sem livros cadastrados</h3>);

  return (
    <>
      <div className='tabela-titulo'>
        Livros
      </div>
      <table className='tabela'>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Autor(es)</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            linhas.map(livro => 
              <tr key={livro.isbn}>
                <td>{livro.isbn}</td>
                <td>{livro.titulo}</td>
                <td>{livro.autores}</td>
                <td className={livro.disponivel ? 'green' : 'red'}>{livro.disponivel ? 'SIM' : 'NÃO'}</td>
                <td>
                  <button title='Editar'><Link to={`cadastro-livro/${livro.isbn}`} > <AiOutlineEdit /> </Link> </button>
                  <button title='Excluir' onClick={() => fcExcluirLivro(livro.isbn)}> <AiOutlineDelete /> </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}