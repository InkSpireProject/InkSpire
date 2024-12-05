"use client";
import Loading from "@/components/Loading/Loading";
import { useUser } from "@clerk/nextjs";
import authenticate from "@/server/action";
import { AdminDashboardComponent } from "@/components/admin-dashboard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  score: number;
  reports: number;
  admin: boolean;
}

export interface Book {
  _id: string;
  name: string;
  author: string;
  url: string;
  description: string;
  price: number;
  isbn: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Cart {
  _id: string;
  username: string;
  book: Book;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Rent {
  _id: string;
  username: string;
  book: Book;
  duration: number;
  amount: number;
  isReturned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

function AdminPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [password, setPassword] = useState<string>("");
  const [access, setAccess] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isSignedIn) {
      const checkUser = async () => await authenticate();
      checkUser();
    }
    if (isLoaded && user) {
      const checkAdminStatus = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/admin?username=${user.username}`
          );
          if (response.data.status === true) {
            setShowUsers(response.data.users);
            setAccess(true);
          } else {
            setAccess(false);
          }
        } catch (err) {
          setAccess(false);
        } finally {
          setLoading(false);
        }
      };
      checkAdminStatus();
    }
  }, [isLoaded, user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin", {
        username: user?.username,
        password: password,
      });
      if (response.data.status === true) {
        setAccess(true);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-300 to-gray-100">
      {!access ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Admin Access</h2>
          <p className="text-gray-600 mb-2">Enter Admin Password</p>
          <input
            type="password"
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-red-950"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-950 transition-colors"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          {showUsers.length > 0 ? (
            <AdminDashboardComponent users={showUsers} />
          ) : (
            <div className="text-center text-gray-500">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
