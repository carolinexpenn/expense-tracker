function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="tally">
      <div className="tally-item">
        <span className="tally-label">Income</span>
        <span className="tally-amount">£{totalIncome.toLocaleString('en-GB')}</span>
      </div>
      <div className="tally-item">
        <span className="tally-label">Expenses</span>
        <span className="tally-amount tally-amount--expense">£{totalExpenses.toLocaleString('en-GB')}</span>
      </div>
      <div className="tally-item tally-item--total">
        <span className="tally-label">Balance</span>
        <span className={`tally-amount ${balance < 0 ? "tally-amount--expense" : ""}`}>
          £{balance.toLocaleString('en-GB')}
        </span>
      </div>
    </div>
  );
}

export default Summary
