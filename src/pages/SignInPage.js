import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";


export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const {setUser, BASE_URL} = useContext(UserContext);
  const navigate = useNavigate();


  
  

useEffect(() => {
 const lsUser = JSON.parse(localStorage.getItem("user"));
 if(lsUser !== null) {
    setUser(lsUser);
    navigate("/home");
 }
}, []); 

function signIn(e) {
  e.preventDefault();
  const body = {email, senha};
  const promise = axios.post(`${BASE_URL}/`, body)
  .then(res => {
    const {nome, email, token} = res.data;
    setUser({nome, email, token});
    localStorage.setItem("user", JSON.stringify({nome, email, token}));
    navigate("/home");

  })
  .catch(err => alert(err.response.data))

}



  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" required  value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="password" />
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
