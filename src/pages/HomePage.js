import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import ListTransaction from "../components/ListTransaction"
import axios from "axios"
import { TransactionContext } from "../TransactionContext"


export default function HomePage() {
  const {user, BASE_URL} = useContext(UserContext);
  const {setTransaction, transaction} = useContext(TransactionContext);
  const [lista, setLista] = useState([]);


  useEffect(() => {

    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    const promise =  axios.get(`${BASE_URL}/home`, config);
    promise.then((res) => {
      const novo = res.data;
      setLista(novo);});
    promise.catch(err => console.log(err.response.data)) 
    }, []);

    function saldo() {
      const total = 0;
      lista.forEach((l) => {
        total += l.valor;
        return total;
      })
    }
    
    if(lista === undefined) {
      return <div>Loading...</div>
    }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {lista.map(l => <ListTransaction key={l._id} descricao={l.descricao} tipo={l.tipo} data={l.data} valor={l.valor}/>)}
      
        </ul>

        <article>
          <strong>{saldo}</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => setTransaction("entrada")}>
          <Link to={`/nova-transacao/${transaction}`}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button onClick={() => setTransaction("saida")}>
          <Link to={`/nova-transacao/${transaction}`}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
