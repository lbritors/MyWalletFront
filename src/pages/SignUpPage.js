import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import REACT_APP_API_URL from "../constants/REACT_APP_API_URL.js";
import axios from "axios";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confimeSenha, setConfirmeSenha] = useState("");
  const navigate = useNavigate();
  
  
  function signUp(e) {
    e.preventDefault();
    if(senha !== confimeSenha || senha.length < 3) {
      alert("Senha inválida!");
      return
    }
    const requisiçao = axios.post(`${REACT_APP_API_URL}/cadastro`, {nome, email, senha})
    .then(res => navigate("/"))
    .catch(e => console.log(e.response))
  }


  return (
    <SingUpContainer>
      <form onSubmit={signUp}> 
        <MyWalletLogo />
        <input placeholder="Nome" onChange={e => setNome(e.target.value)} required type="text" />
        <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required type="email" />
        <input placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" onChange={(e) => setConfirmeSenha(e.target.value)} required type="password" autocomplete="new-password" />
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
