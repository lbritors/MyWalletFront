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
  const {setTransaction} = useContext(TransactionContext);
  const [lista, setLista] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    const promise =  axios.get(`${BASE_URL}/home`, config);
    promise.then((res) => {
      const novo = res.data;
      setLista(novo);
      const money = saldoCalc();
      setSaldo(money)
      }
      );
    promise.catch(err => console.log(err.response.data));
      setLoading(false);
    }, []);

    
    function saldoCalc() {
      let soma = 0;
      for(let i = 0; i < lista.length; i++) {
        console.log(soma);
        console.log(lista.tipo)
        if(lista.tipo === "entrada") {
          soma += soma;
        } else {
          soma -=soma;
        }
      }
      return soma?.toFixed(2).replace(".", ",");
    }
    
    console.log(lista.tipo);
    
    if(lista.length === 0 || loading === true) {
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
          <strong>Saldo</strong>
          <Value color={saldo >= 0 ? "positivo" : "negativo"}>{saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => setTransaction("entrada")}>
          <Link to={`/nova-transacao/entrada`}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button onClick={() => setTransaction("saida")}>
          <Link to={`/nova-transacao/saida`}>
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
