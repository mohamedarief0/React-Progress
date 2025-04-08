import { useEffect, useState } from "react";
import axios from "axios";

import "./Form.css";

export default function Form() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        console.log("Fetched Data:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Use PUT request for updating an existing user
        await axios.put(
          `http://localhost:5000/api/users/${formData._id}`,
          formData
        );

        setUsers(
          users.map((user) => (user._id === formData._id ? formData : user))
        );
        setEditing(false);
      } else {
        // Use POST request for creating a new user
        const response = await axios.post(
          "http://localhost:5000/api/users",
          formData
        );
        setUsers([...users, response.data]);
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }

    setFormData({ id: null, name: "", email: "", phone: "", city: "" });
  };



  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <>
      <div className="container">
        <h1 className="title">{editing ? "Edit User" : "Create User"}</h1>
        <form className="user-form" onSubmit={handleCreate}>
          <input
            placeholder="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Phone Number"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            placeholder="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <button className="submit-btn" type="submit">
            {editing ? "Update User" : "Create User"}
          </button>
        </form>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.city}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
