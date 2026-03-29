function TransactionList({ items, onEdit, onDelete }) {
    if (items.length === 0) {
        return (
            <div className="transaction-list">
                <div className="empty-stats">
                    <h3>거래 내역이 없습니다.</h3>
                    <p>거래 내역을 추가해 보세요!</p>
                </div>
            </div>
        );
    }

    const transactions = [...items].sort((a, b) => b.date - a.date);
    return (
        <div className="transaction-list">
            {transactions.map((t) => (
                <div key={t.id} className="transaction">
                    <div className="transaction-date">
                        {t.date.getMonth() + 1}월 {t.date.getDate()}일
                    </div>
                    <div className="transaction-title">{t.title}</div>
                    <div
                        className="transaction-amount"
                        style={{
                            color: t.isSpending
                                ? "var(--gray300)"
                                : "var(--blue200)",
                        }}
                    >
                        {t.isSpending ? "-" : "+"}{" "}
                        {Number(t.amount).toLocaleString()}
                        <span>원</span>
                    </div>
                    <div className="transaction-actions">
                        <button
                            className="edit-button"
                            onClick={() => onEdit(t)}
                        >
                            수정
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => onDelete(t)}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;
