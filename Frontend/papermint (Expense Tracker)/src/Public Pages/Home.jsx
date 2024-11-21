import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
      const token = localStorage.getItem('uid'); // Retrieve token
      try {
        const response = await fetch('http://localhost:4000/api/v1/user/expance/entries', {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setExpenses(data);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
  
    useEffect(() => {
      fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('uid'); // Retrieve the token from localStorage
        try {
          const response = await fetch(`http://localhost:4000/api/v1/user/expance/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: token, // Send the token for authentication
            },
          });
      
          const data = await response.json();
          if (response.ok) {
            alert('Expense deleted successfully');
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id)); // Update the state to remove the deleted expense
          } else {
            alert(data.message || 'Unable to delete expense');
            console.error('Error:', data);
          }
        } catch (error) {
          console.error('Error deleting expense:', error);
          alert('An error occurred. Please try again.');
        }
      };
      

  return (
    <div style={{ margin: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Welcome to Expenses Manager</h2>
    <h2 style={{ marginBottom: '20px' }}>All Expenses</h2>
    <Link
      to="/add"
      style={{
        display: 'inline-block',
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
      }}
    >
      Add Expense
    </Link>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
    {expenses.map((expense, index) => (
 <div
 key={expense._id}
 style={{
   display: 'inline-block',
   width: 'calc(70% - 10px)', // Two items per row with some gap
   marginRight: index % 2 === 0 ? '10px' : '0', // Add margin to the right for every first item in a row
   marginBottom: '10px',
   border: '1px solid #ccc',
   borderRadius: '5px',
   padding: '10px',
 }}
>
 <div
   style={{
     display: 'flex', // Arrange content in a row
     justifyContent: 'space-between', // Spread items horizontally
     alignItems: 'center', // Align items vertically in the center
     flexWrap: 'wrap', // Allow wrapping for responsiveness
   }}
 >
   <p style={{ margin: '0 10px' }}><strong>Type:</strong> {expense.type}</p>
   <p style={{ margin: '0 10px' }}><strong>Amount:</strong> Rs.{expense.amount}</p>
   <p style={{ margin: '0 10px' }}><strong>Description:</strong> {expense.description}</p>
   <p style={{ margin: '0 10px' }}><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
   <button
     style={{
       padding: '5px 10px',
       backgroundColor: '#FF4D4D',
       color: 'white',
       border: 'none',
       borderRadius: '3px',
       cursor: 'pointer',
       margin: '0 10px',
     }}
     onClick={() => handleDelete(expense._id)} // Call delete handler
   >
     Delete
   </button>
 </div>
</div>

))}

    </ul>
  </div>
  )
}

export default Home
