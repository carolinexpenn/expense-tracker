import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#8a6d3b', '#4b6455', '#5b6b7a', '#b08968', '#6b4c3a', '#7a8b99', '#9c8aa5']
const INK = '#1f2a24'
const INK_SOFT = '#5c6a5f'
const RULE = '#cabfa2'
const SURFACE = '#f8f4e9'

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
    color: COLORS[index % COLORS.length],
  }))

  if (data.length === 0) {
    return null
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={RULE} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: INK_SOFT, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 }}
            axisLine={{ stroke: RULE }}
            tickLine={{ stroke: RULE }}
            angle={-30}
            textAnchor="end"
            interval={0}
            height={50}
          />
          <YAxis
            tick={{ fill: INK_SOFT, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 }}
            axisLine={{ stroke: RULE }}
            tickLine={{ stroke: RULE }}
          />
          <Tooltip
            formatter={(value) => `£${value}`}
            contentStyle={{
              background: SURFACE,
              border: `1px solid ${RULE}`,
              borderRadius: 0,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: INK,
            }}
          />
          <Bar dataKey="value" radius={0}>
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
