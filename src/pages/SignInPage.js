import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

function signIn(e) {
  e.preventDefault();
  const login = {email, senha};
  // // const navigate = useNavigate();
  // const request = axios.post("minhaAPI").then((res) => navigate("/home")).catch(err=> console.log(err.response.message));
}



  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" onChange={(e) => setSenha(e.target.value)} autocomplete="new-password" />
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
