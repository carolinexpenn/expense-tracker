import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#a4de6c', '#d0ed57']

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

function SpendingByCategoryChart({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount
      return totals
    }, {})

  const data = Object.entries(totalsByCategory).map(([category, amount], index) => ({
    name: toTitleCase(category),
    value: amount,
    color: category === 'housing' ? 'red' : COLORS[index % COLORS.length],
  }))

  if (data.length === 0) {
    return null
  }

  const legendPayload = data.map(entry => ({
    value: entry.name,
    type: 'square',
    color: entry.color,
  }))

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend payload={legendPayload} />
          <Bar dataKey="value">
            {data.map(entry => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingByCategoryChart
