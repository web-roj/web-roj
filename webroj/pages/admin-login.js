import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const fixedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL; // Access the email
        const fixedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; // Access the password

        if (email === fixedEmail && password === fixedPassword) {
            router.push('/admin-dashboard'); // Redirect to admin dashboard
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Admin Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
