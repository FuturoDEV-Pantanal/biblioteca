import { Link } from 'react-router-dom';
import './styles.css';

export default function Cabecalho() {
  return (
    <header>
        <div className='logotipo'>
            Biblioteca
        </div>
        <nav>
            <ul> 
                <li> <Link to='/'>Listagem</Link> </li>
                <li> <Link to='cadastro-livro'>Cadastro de Livro</Link> </li>
                <li> <Link to='cadastro-leitor'>Cadastro de Leitor</Link> </li>
                <li> <Link to='emprestimo'>Realizar Empréstimo</Link> </li>
            </ul>
        </nav>
    </header>
  )
}
