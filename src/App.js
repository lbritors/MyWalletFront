import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import { UserContext } from "./UserContext"
import { TransactionContext } from "./TransactionContext"

export default function App() {
  const [user, setUser] = useState("");
  const [transaction, setTransaction] = useState("");

  const BASE_URL = process.env.REACT_APP_API_URL;

 
  return (
    <PagesContainer>
      <BrowserRouter>
      <TransactionContext.Provider value={{transaction, setTransaction}}>
      <UserContext.Provider value={{user, setUser, BASE_URL}}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
        </UserContext.Provider>
        </TransactionContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
