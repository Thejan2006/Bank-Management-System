'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// improt the DashboardUI component
import DashboardUI from '../../components/DashboardUI'; 

export default function DashboardPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const storedUsername = localStorage.getItem('username');

    if (!userId) {
      router.push('/login');
      return;
    }

    setName(storedUsername || 'User');

    const fetchDashboardData = async () => {
      try {
        const userRes = await fetch(`bank-management-system-production-ee76.up.railway.app/user/${userId}`);
        const userData = await userRes.json();
        
        const txRes = await fetch(`bank-management-system-production-ee76.up.railway.app/transactions/${userId}`);
        const txData = await txRes.json();
        
        let txArray = [];
        if (Array.isArray(txData)) txArray = txData;
        else if (txData.transactions && Array.isArray(txData.transactions)) txArray = txData.transactions;

        let totalIncome = 0;
        let totalExpense = 0;

        txArray.forEach(tx => {
           let type = 'transaction';
           let amount = 0;
           
           if (Array.isArray(tx)) {
              const knownTypes = ['deposit', 'withdraw', 'transfer'];
              const foundType = tx.find(val => typeof val === 'string' && knownTypes.includes(val.toLowerCase()));
              if (foundType) type = foundType;
              const numericVal = tx.find(val => typeof val === 'number' || (!isNaN(parseFloat(val)) && isFinite(val) && typeof val !== 'boolean'));
              if (numericVal !== undefined) amount = parseFloat(numericVal);
           } else if (typeof tx === 'object' && tx !== null) {
              type = tx.type || tx.transaction_type || tx.tx_type || '';
              amount = tx.amount !== undefined ? parseFloat(tx.amount) : parseFloat(tx.tx_amount || tx.value || 0);
           }
           
           if (String(type).toLowerCase() === 'deposit') totalIncome += amount;
           else if (['withdraw', 'transfer'].includes(String(type).toLowerCase())) totalExpense += amount;
        });

        setChartData([
          { name: 'Total Income', value: totalIncome },
          { name: 'Total Expenses', value: totalExpense }
        ]);

        if (userData.balance !== undefined && userData.balance !== 0) {
           setBalance(userData.balance);
        } else {
           setBalance(totalIncome - totalExpense);
        }

      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // pass the fetched data to the DashboardUI component
  return (
    <DashboardUI 
      name={name}
      balance={balance}
      chartData={chartData}
      loading={loading}
    />
  );
}