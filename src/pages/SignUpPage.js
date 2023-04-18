import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confimeSenha, setConfirmeSenha] = useState("");

  
  
  function signUp(e) {
    e.preventDefault();
    if(senha !== confimeSenha) {
      console.log("Senha inválida!");
    }
    const signup = {nome, email, senha, confimeSenha};
  }


  return (
    <SingUpContainer>
      <form onSubmit={signUp}> 
        <MyWalletLogo />
        <input placeholder="Nome" onChange={e => setNome(e.target.value)} type="text" />
        <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} type="email" />
        <input placeholder="Senha" onChange={(e) => setSenha(e.target.value)} type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" onChange={(e) => setConfirmeSenha(e.target.value)} type="password" autocomplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
