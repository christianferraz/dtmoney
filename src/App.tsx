import { useState } from "react"
import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { GlobalStyle } from "./styles/globals"
import { CSSTransition } from "react-transition-group"
import { NewTransctionModal } from "./components/NewTransactionModal"



function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <CSSTransition in={isNewTransactionModalOpen}
          timeout={300}
          >
        <NewTransctionModal isOpeon={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
        </CSSTransition>
      <GlobalStyle />
    </>
  )
}

export default App
