import './App.css';
import { useState } from 'react';
import TransactionList from './TransactionList';
import TransactionInputModal from './TransactionInputModal';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  let spending = 0;
  let income = 0;

  transactions.forEach((t) => {
    if(t.isSpending){
      spending += Number(t.amount);
    }else{
      income += Number(t.amount);
    }
  })

  function openInputModal(item = null){
    setEditingItem(item);
    setIsInputModalOpen(true);
  }

  function closeInputModal(){
    setEditingItem(null);
    setIsInputModalOpen(false);
  }

  function openDeleteModal(item){
    setDeleteItem(item);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal(){
    setIsDeleteModalOpen(false);
    setDeleteItem(null);
  }

  function deleteTransaction(id){
    setTransactions(transactions.filter((t) => t.id !== id));
    closeDeleteModal();
  }

  function saveTransaction(item){
    if(editingItem){
      setTransactions(transactions.map((t) => t.id === item.id ? item : t));
    }else{
      setTransactions([item, ...transactions]);
    }

    closeInputModal();
  }

  return (
    <div className='background'>
      <div className='container'>
        <div className='header'>
          <div className='month-section'><h1>3월</h1></div>
          <button onClick={() => openInputModal()}>추가</button>
        </div>

      <TransactionList
        items={transactions}
        onEdit={openInputModal}
        onDelete={openDeleteModal}
        />

      <div className='stats-section'>
        <div className='stats-box'>
          <h1>총 수입</h1>
          <div className='stats' style={{color: "var(--blue200)"}}>
            <span>{income.toLocaleString()}</span> 
            <span>원</span>
          </div>
        </div>
        <div className='stats-box'>
          <h1>총 지출</h1>
          <div className='stats' style={{color: "var(--red200)"}}>
            <span>{spending.toLocaleString()}</span> 
            <span>원</span>
          </div>
        </div>
        <div className='stats-box'>
          <h1>총 잔액</h1>
          <div className='stats'>
            <span>{(income-spending).toLocaleString()}</span> 
            <span>원</span>
          </div>
        </div>
      </div>
      {
        isInputModalOpen &&(
          <TransactionInputModal 
            onClose={closeInputModal}
            onSave={saveTransaction}
            editTarget={editingItem}
            />
        )
      }

      {
        isDeleteModalOpen && (
          <div className='modal-background'>
            <div className='alert-container'>
              <h1>내역 삭제하기</h1>
              <p>이 내역을 거래 내역에서 삭제할까요?</p>

              <div className='button-group'>
                <button className='button-close-modal' onClick={closeDeleteModal}>취소</button>
                <button className='button-delete-transaction' onClick={() => deleteTransaction(deleteItem.id)}>확인</button>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default App;