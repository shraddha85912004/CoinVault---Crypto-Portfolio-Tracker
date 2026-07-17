"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartData {
  symbol: string;
  name: string;
  amount: number;
  totalValue: number;
}

interface PortfolioChartsProps {
  data: ChartData[];
}

const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export function PortfolioCharts({ data }: PortfolioChartsProps) {
  // Format data for PieChart (Value distribution)
  const pieData = data.map((item) => ({
    name: item.symbol,
    value: item.totalValue,
  }));

  // Format data for BarChart (Asset amounts)
  const barData = data.map((item) => ({
    name: item.symbol,
    value: item.totalValue,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18181B] border border-white/10 p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-[#7C3AED] font-bold">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pie Chart Card */}
      <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Asset Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-400">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Holdings Value</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#666" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff0a' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
