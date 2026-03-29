import { useEffect, useState } from "react";
function TransactionInputModal({ onClose, onSave, editTarget }) {
    const [isSpendingType, setIsSpendingType] = useState(true);
    const [inputAmount, setInputAmount] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const [inputDate, setInputDate] = useState(
        new Date().toISOString().substring(0, 10),
    );
    let maxDate = new Date().toISOString().substring(0, 7);

    function handleAmountChange(e) {
        const result = e.target.value.replace(/[^\d]/g, "");
        setInputAmount(result ? Number(result).toLocaleString() : "");
    }

    useEffect(() => {
        if (editTarget) {
            setIsSpendingType(editTarget.isSpending);
            setInputAmount(Number(editTarget.amount).toLocaleString());
            setInputTitle(editTarget.title);
            setInputDate(
                new Date(editTarget.date).toISOString().substring(0, 10),
            );
        }
    }, [editTarget]);

    let type = isSpendingType ? "지출" : "수입";

    function handleSave() {
        const trimmedTitle = inputTitle.trim();
        setInputTitle(trimmedTitle);
        if (!inputAmount || !trimmedTitle || !inputDate) {
            window.alert("모든 항목을 바르게 입력해 주세요!");
            return;
        }

        const transaction = {
            id: editTarget ? editTarget.id : Date.now(),
            amount: inputAmount.replaceAll(",", ""),
            title: trimmedTitle,
            date: new Date(inputDate),
            isSpending: isSpendingType,
        };

        onSave(transaction);
    }

    return (
        <div className="modal-background">
            <div className="modal-container">
                <h1>{editTarget ? "거래 내역 수정" : "거래 내역 추가"}</h1>
                <div className="type-toggle-group">
                    <button
                        className={
                            isSpendingType
                                ? "toggle-unselected"
                                : "toggle-selected"
                        }
                        onClick={() => setIsSpendingType(false)}
                    >
                        수입
                    </button>

                    <button
                        className={
                            isSpendingType
                                ? "toggle-selected"
                                : "toggle-unselected"
                        }
                        onClick={() => setIsSpendingType(true)}
                    >
                        지출
                    </button>
                </div>

                <div className="input-group">
                    <input
                        placeholder="금액을 입력하세요"
                        onChange={handleAmountChange}
                        value={inputAmount}
                    />
                    <span className="wonStyle">
                        원<span className="starStyle"> *</span>
                    </span>
                </div>

                <div className="input-group">
                    <input
                        placeholder={`${type} 제목을 입력하세요`}
                        onChange={(e) => setInputTitle(e.target.value)}
                        value={inputTitle}
                    />
                    <span className="starStyle">*</span>
                </div>

                <div className="input-group-date">
                    <label>{type} 날짜</label>
                    <input
                        type="date"
                        onChange={(e) => setInputDate(e.target.value)}
                        value={inputDate}
                        max={maxDate}
                    />
                </div>

                <div className="button-group">
                    <button className="button-close-modal" onClick={onClose}>
                        취소
                    </button>
                    <button
                        className="button-add-transaction"
                        onClick={handleSave}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionInputModal;
