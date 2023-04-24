import { useContext, useState } from "react"
import styled from "styled-components"
import { TransactionContext } from "../TransactionContext"
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const {transaction} = useContext(TransactionContext);
  const {user, BASE_URL} = useContext(UserContext);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  
  function handleForm(e) {
    e.preventDefault();
    const config = {
      headers : {
        "Authorization": `Bearer ${user.token}`
      }
    }
    console.log(value);
    const body = {valor: value, descricao: description};
    const promise = axios.post(`${BASE_URL}/nova-transacao/${transaction}`, body, config);
    promise.then((res) => {
      console.log(res.data);
    navigate("/")});
    promise.catch(err => console.log(err.response.data));
  }

  return (
    <TransactionsContainer>
      <h1>Nova {transaction}</h1>
      <form onSubmit={handleForm}>
        <input placeholder="Valor" onChange={(e) => setValue(e.target.value)} name="valor" required type="text"/>
        <input placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} required name="descricao" type="text" />
        <button type="submit">Salvar {transaction}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
