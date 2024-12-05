"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2 } from "lucide-react";

interface User {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  score: number;
  reports: number;
  admin: boolean;
}

export function AdminDashboardComponent({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [localUsers, setLocalUsers] = useState<Array<User>>(users); // Local copy of users
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>(users);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.status) {
        console.log("User deleted successfully:", data.message);

        // Update both localUsers and filteredUsers
        const updatedUsers = localUsers.filter(
          (user) => user._id !== data.deletedUser._id
        );
        setLocalUsers(updatedUsers);
        setFilteredUsers(
          updatedUsers.filter(
            (user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  useEffect(() => {
    setFilteredUsers(
      localUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, localUsers]);

  const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-green-500";
    if (score === 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen w-screen pt-20 bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin Status</TableHead>
                  <TableHead>Delete User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.admin ? "True" : "False"}</TableCell>

                    <TableCell>
                      <button onClick={() => handleDelete(user._id)}>
                        <Trash2 className="text-red-600 size-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
