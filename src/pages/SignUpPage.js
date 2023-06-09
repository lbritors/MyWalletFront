import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confimeSenha, setConfirmeSenha] = useState("");
  const navigate = useNavigate();
  const {BASE_URL} = useContext(UserContext);
  
  
  function signUp(e) {
    e.preventDefault();
    if(senha !== confimeSenha || senha.length < 3) {
      alert("Senha inválida!");
      return
    }
    const requisiçao = axios.post(`${BASE_URL}/cadastro`, {nome, email, senha})
    .then(res => {
      console.log(res.data)
       navigate("/")})
    .catch(e => alert(e.response.data))
  }


  return (
    <SingUpContainer>
      <form onSubmit={signUp}> 
        <MyWalletLogo />
        <input placeholder="Nome" onChange={e => setNome(e.target.value)} value={nome} required type="text" />
        <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required type="email" />
        <input placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required value={senha} type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" onChange={(e) => setConfirmeSenha(e.target.value)} value={confimeSenha} required type="password" autocomplete="new-password" />
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
