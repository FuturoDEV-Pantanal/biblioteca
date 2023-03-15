import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './styles.css';

export default function TabelaLeitores( {linhas, fcExcluirLeitor} ) {
  if (linhas.length === 0)
    return (<h3>Sem leitores cadastrados</h3>);
  return (
    <>
      <div className='tabela-titulo'>
        Leitores
      </div>
      <table>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>dataNascimento</th>
            <th>Empréstimos Ativos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            linhas.map(leitor => 
              <tr key={leitor.cpf}>
                <td>{leitor.cpf}</td>
                <td>{leitor.nome}</td>
                <td>{leitor.dataNascimento}</td>
                <td>{leitor.emprestimosAtivos}</td>
                <td>
                  <button title='Editar'> <Link to={`cadastro-leitor/${leitor.cpf}`} > <AiOutlineEdit /> </Link> </button>
                  <button title='Excluir' onClick={() => fcExcluirLeitor(leitor.cpf)}> <AiOutlineDelete /> </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}