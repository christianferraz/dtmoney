import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox } from "./styles"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { FormEvent, useCallback, useState } from "react"

Modal.setAppElement('#root')

interface NewTransactionModalProps {
  isOpeon: boolean
  onRequestClose: () => void
}

export const NewTransctionModal = ({ isOpeon, onRequestClose }: NewTransactionModalProps) => {
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')

  function handleCreateNewTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.isDefaultPrevented()
  }

  const handleGetValue = useCallback((v: string) => {
    let v2 = ''
    v = v.replace(/\D/g,"").replace(/^[0]+/g,"");
    v = v.replace(/(\d)(\d{14})$/, "$1.$2");//coloca o ponto dos milhoes
    v = v.replace(/(\d)(\d{11})$/, "$1.$2");//coloca o ponto dos milhoes
    v = v.replace(/(\d)(\d{8})$/, "$1.$2");//coloca o ponto dos milhoes
    v = v.replace(/(\d)(\d{5})$/, "$1.$2");//coloca o ponto dos milhares
    v = v.replace(/(\d)(\d{2})$/, "$1,$2");
    switch(v.length) {
      case 0:
        v2 = "R$ 0,00"
        break
      case 1:
        v2 = "R$ 0,0" + v
        break
      case 2:
        v2 = "R$ 0," + v
        break
      default:
        v2 = "R$ " + v
    }
    setValue(v2)

  },[value])
  return (
    <Modal isOpen={isOpeon} onRequestClose={onRequestClose} closeTimeoutMS={500} className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={closeImg} alt="fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transção</h2>
        <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)} />
        <input placeholder="Valor" value={value} onChange={event => handleGetValue(event.target.value)} />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
        <button type="submit">Enviar</button>
      </Container>

    </Modal>
  )
}