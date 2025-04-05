import { useState } from "react";
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

  const handleCreate = (e) => {
    e.preventDefault();
    if (editing) {
      setUsers(
        users.map((user) => (user.id === formData.id ? formData : user))
      );
      setEditing(false);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, name: "", email: "", phone: "", city: "" });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId.id));
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
            <tr key={user.id}>
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
                  onClick={() => handleDelete(user)}
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
