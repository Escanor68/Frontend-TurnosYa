// Update the admin user credentials to include hasFields
if (email === "admin@example.com" && password === "admin123") {
  const adminUser: User = {
    id: "admin1",
    name: "Administrador",
    email: "admin@example.com",
    isAdmin: true,
    hasFields: true, // Allow admin to manage fields
  }

  setUser(adminUser)
  localStorage.setItem("user", JSON.stringify(adminUser))
  return true
}