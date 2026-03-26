import './App.css';
import { useState } from 'react';
import TransactionList from './TransactionList';
import TransactionInputModal from './TransactionInputModal';
import { PrevIcon, NextIcon } from './Icons';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredTransactions = transactions.filter((t)=>(
    t.date.getFullYear() === currentDate.getFullYear() && 
    t.date.getMonth() === currentDate.getMonth()
  ));
  let spending = 0;
  let income = 0;

  filteredTransactions.forEach((t) => {
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

  function handlePrevMonth(){
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1));
  }

  function handleNextMonth(){
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1));
  }
  return (
    <div className='background'>
      <div className='container'>
        <div className='header'>
          <div className='year-section'>{currentDate.getFullYear()}년</div>
          <div className='month-section'>
            <button className='nav-btn' onClick={handlePrevMonth}>
              <PrevIcon/>
            </button>
            <div className='month' onClick={()=>setCurrentDate(new Date())}>{currentDate.getMonth()+1}월 </div>
            <button className='nav-btn' onClick={handleNextMonth} >
              <NextIcon color="var(--blue100)"/>
            </button>
          </div>
          <button className="add-button"onClick={() => openInputModal()}>추가</button>
        </div>

      <TransactionList

        items={filteredTransactions}
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