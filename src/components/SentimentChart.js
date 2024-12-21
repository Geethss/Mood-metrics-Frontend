import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const SentimentChart = ({ data }) => {
    const sentimentCounts = data.reduce(
        (acc, { sentiment }) => {
            acc[sentiment] = (acc[sentiment] || 0) + 1;
            return acc;
        },
        { positive: 0, negative: 0, neutral: 0 }
    );

    const pieData = Object.keys(sentimentCounts).map((key) => ({
        name: key,
        value: sentimentCounts[key],
    }));

    const barData = [
        { name: "positive", count: sentimentCounts.positive },
        { name: "negative", count: sentimentCounts.negative },
        { name: "neutral", count: sentimentCounts.neutral },
    ];

    const PIE_COLORS = ["#2ecc71", "#e74c3c", "#3498db"]; // Updated Pie Colors
    const BAR_COLORS = {
        positive: "#1abc9c",
        negative: "#c0392b",
        neutral: "#2980b9",
    }; // Updated Bar Colors

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <PieChart width={300} height={300}>
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            <BarChart width={400} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8">
                    {barData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={BAR_COLORS[entry.name]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default SentimentChart;


