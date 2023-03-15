import { AiOutlineRollback } from 'react-icons/ai';
import dateFormat from 'dateformat';
import './styles.css';

export default function TabelaEmprestimos( {linhas, fcExcluirEmprestimo} ) {
  if (linhas.length === 0)
    return (<h4>Sem empréstimos registrados</h4>)
  return (
    <>
      <div className='tabela-titulo'>
        Empréstimos
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>CPF</th>
            <th>ISBN</th>
            <th>Data Empréstimo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            linhas.map(emp => 
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.cpfLeitor}</td>
                <td>{emp.isbnLivro}</td>
                <td>{dateFormat(emp.dataEmprestimo, "isoDate")}</td>
                <td>
                  <button title='Devolver' onClick={() => fcExcluirEmprestimo(emp.id)}> <AiOutlineRollback /> </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}