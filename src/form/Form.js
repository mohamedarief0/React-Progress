import { useState } from "react";

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

  // input getting values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit fuction
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
    setFormData({ name: "", email: "", phone: "", city: "" });
  };

  console.log("User Created:", users);

  // Table edit and delete fucntions
  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const handleDelete = (userId) => {
    setUsers(
      users.filter((user) => {
        return user.id !== userId.id;
      })
    );
  };
  return (
    <>
      <h1>{editing ? "Edit User" : "Create User"}</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
        />

        <button type="submit">{editing ? "Update" : "Create"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Action</th>
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
                <div>
                  <button type="button" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(user)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
