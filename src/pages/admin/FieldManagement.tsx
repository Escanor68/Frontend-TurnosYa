"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"
import { useAuth } from "../../context/AuthContext"
import { API_URL } from "../../config"

interface Field {
  id: number
  name: string
  fieldType: string
  description: string
}

const FieldManagement = () => {
  const [fields, setFields] = useState<Field[]>([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [name, setName] = useState("")
  const [fieldType, setFieldType] = useState("")
  const [description, setDescription] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const { token } = useAuth()

  useEffect(() => {
    fetchFields()
  }, [])

  const fetchFields = async () => {
    try {
      const response = await fetch(`${API_URL}/fields`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFields(data)
    } catch (error) {
      console.error("Could not fetch fields:", error)
      showSnackbar("Failed to fetch fields", "error")
    }
  }

  const handleOpen = () => {
    setOpen(true)
    setName("")
    setFieldType("")
    setDescription("")
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditOpen = (field: Field) => {
    setEditOpen(true)
    setSelectedField(field)
    setName(field.name)
    setFieldType(field.fieldType)
    setDescription(field.description)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedField(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (name === "name") setName(value)
    else if (name === "fieldType") setFieldType(value)
    else if (name === "description") setDescription(value)
  }

  const createField = async () => {
    try {
      const response = await fetch(`${API_URL}/fields`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, fieldType, description }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      fetchFields()
      handleClose()
      showSnackbar("Field created successfully", "success")
    } catch (error) {
      console.error("Could not create field:", error)
      showSnackbar("Failed to create field", "error")
    }
  }

  const updateField = async () => {
    if (!selectedField) return

    try {
      const response = await fetch(`${API_URL}/fields/${selectedField.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, fieldType, description }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      fetchFields()
      handleEditClose()
      showSnackbar("Field updated successfully", "success")
    } catch (error) {
      console.error("Could not update field:", error)
      showSnackbar("Failed to update field", "error")
    }
  }

  const deleteField = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/fields/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      fetchFields()
      showSnackbar("Field deleted successfully", "success")
    } catch (error) {
      console.error("Could not delete field:", error)
      showSnackbar("Failed to delete field", "error")
    }
  }

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <div>
      <Button variant="contained" startIcon={<Add />} onClick={handleOpen} style={{ marginBottom: "20px" }}>
        Add New Field
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Field Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {field.name}
                </TableCell>
                <TableCell>{field.fieldType}</TableCell>
                <TableCell>{field.description}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditOpen(field)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteField(field.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Field</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="fieldType"
            label="Field Type"
            type="text"
            fullWidth
            variant="standard"
            value={fieldType}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleInputChange}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createField}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Field</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="fieldType"
            label="Field Type"
            type="text"
            fullWidth
            variant="standard"
            value={fieldType}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleInputChange}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={updateField}>Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default FieldManagement
