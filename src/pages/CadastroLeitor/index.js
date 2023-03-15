import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';

export default function CadastroLeitor( {leitores, fcIncluirLeitor, fcAlterarLeitor} ) {

  const { cpfParam } = useParams();   // o ? no Router indica que este parametro é opcional 

  const cpfRef = useRef();
  const nomeRef = useRef();
  const dataNascimentoRef = useRef();

  useEffect(() => {  // dentro do useEffect para garantir que o componente já carregou/renderizou
    if (cpfParam !== undefined) {   // se está preenchido...
      const leitor = leitores.find(leitor => leitor.cpf === parseInt(cpfParam) ); // tem que converter param pra number pra comparar, pq chega como string
      cpfRef.current.value = leitor.cpf;
      nomeRef.current.value = leitor.nome;
      dataNascimentoRef.current.value = leitor.dataNascimento;
    }
  }, [cpfParam, leitores]);

  function handleSubmit(e) {
    e.preventDefault();
    const cpf = cpfRef.current.value;
    const nome = nomeRef.current.value;
    const dataNascimento = dataNascimentoRef.current.value;

    if (!cpf || !nome || !dataNascimento) {
      alert('Todos os campos são de preenchimento obrigatório!');
      return;
    }
    
    const isNovo = cpfParam === undefined;
    const dados = { cpf: +cpf, nome, dataNascimento };  // tem que converter o cpf para number, pq no input vem como string
    if (isNovo) {
      const cpfJaCadastrado = leitores.some(l => l.cpf === +cpf);
      if (cpfJaCadastrado) {
        alert('CPF já cadastrado!');
        return;
      }
      fcIncluirLeitor(dados);
      alert(`Leitor ${cpf} cadastrado com sucesso!`);
      // limpando campos
      cpfRef.current.value = '';
      nomeRef.current.value = '';
      dataNascimentoRef.current.value = '';
    } else {
      fcAlterarLeitor(dados);
      alert(`Leitor ${cpf} atualizado com sucesso!`);
    }    
  }

  return (
    <div className='cadastro-container'>
      <div className='titulo-cadastro'>
        Cadastro de Leitor
      </div>
      <form className='form-leitor' onSubmit={handleSubmit}>
        <div className='form-grupo'>
          <label htmlFor='input-cpf'>CPF: </label>
          <input type='text' id='input-cpf' ref={cpfRef} placeholder='Informe o CPF' size={50} disabled={cpfParam} />
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-nome'>Nome: </label>
          <input type='text' id='input-nome' ref={nomeRef} placeholder='Informe o nome' size={50} />
        </div>
        <div className='form-grupo'>
          <label htmlFor='input-data-nascimento'>Data de Nascimento: </label>
          <input type='date' id='input-data-nascimento' ref={dataNascimentoRef} />
        </div>
        <div>
          <button className='btn-voltar'><Link to='/'>Voltar</Link></button>
          <input type='submit' value={!cpfParam ? 'Inserir' : 'Atualizar'} className='btn-submit'/>
        </div>
      </form>
    </div>
  )
}
