import React, { useState } from 'react';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Login Data: ", formData);
            alert("Login successful!");
        } else {
            console.log("Register Data: ", formData);
            alert("Registration successful!");
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width:"100vw",
                backgroundColor: '#f3f4f6',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '400px',
                    width: '100%',
                }}
            >
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        textAlign: 'center',
                        color:"gray"
                    }}
                >
                    {isLogin ? "Login" : "Register"}
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500',
                                color: '#374151',
                            }}
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                backgroundColor:"white",
                                color:"black"
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500',
                                color: '#374151',
                            }}
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                backgroundColor:"white",
                                color:"black"
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <p
                    style={{
                        marginTop: '16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            cursor: 'pointer',
                            marginLeft: '5px',
                            textDecoration: 'underline',
                        }}
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
