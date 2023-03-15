import TabelaLeitores from '../../components/TabelaLeitores';
import TabelaLivros from '../../components/TabelaLivros';
import TabelaEmprestimos from '../../components/TabelaEmprestimos';
import './styles.css';


export default function Listagem( {livros, leitores, emprestimos, fcExcluirLivro, fcExcluirLeitor, fcExcluirEmprestimo } ) {

  return (
    <section className='listagem-container'>
      <div className='titulo-listagem'>
        Listagens
      </div>
      <TabelaLivros linhas={livros} fcExcluirLivro={fcExcluirLivro} />
      <TabelaLeitores linhas={leitores} fcExcluirLeitor={fcExcluirLeitor} />
      <TabelaEmprestimos linhas={emprestimos} fcExcluirEmprestimo={fcExcluirEmprestimo} />
    </section>
  )
}
