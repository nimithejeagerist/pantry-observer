import React from "react";
import {
    Table, TableBody, TableCell, TableHead, TableRow, IconButton,
    Dialog, DialogContent, DialogActions, DialogTitle,
    Button, TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

const DialogView = ({newItem, setNewItem, category, setCategory, quantity, setQuantity, open, handleClose, handleAddItem}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Item Name"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Beverage">Beverage</MenuItem>
                        <MenuItem value="Snack">Snack</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleAddItem} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogView;