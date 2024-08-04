import React from "react";
import {
    Table, TableBody, TableCell, TableHead, TableRow, IconButton, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TableView = ({ items, handleDeleteItem }) => {
    const [checkedItems, setCheckedItems] = React.useState({});

    const handleCheckItem = (id) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));

        setTimeout(() => {
            handleDeleteItem(id);
        }, 1000); // 1 second delay before deleting the item
    };

    return (
        <Table className="w-full bg-gray-900">
            <TableHead className="bg-gray-800">
                <TableRow>
                    <TableCell className="text-white">Select</TableCell>
                    <TableCell className="text-white">Name</TableCell>
                    <TableCell className="text-white">Category</TableCell>
                    <TableCell className="text-white">Quantity</TableCell>
                    <TableCell className="text-white">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item) => (
                    <TableRow
                        key={item.id}
                        className={`bg-gray-800 ${checkedItems[item.id] ? 'line-through' : ''}`}
                    >
                        <TableCell>
                            <Checkbox
                                checked={checkedItems[item.id]}
                                onChange={() => handleCheckItem(item.id)}
                                className="text-white"
                            />
                        </TableCell>
                        <TableCell className="text-white">{item.name}</TableCell>
                        <TableCell className="text-white">{item.category}</TableCell>
                        <TableCell className="text-white">{item.quantity}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => handleDeleteItem(item.id)}>
                                <DeleteIcon className="text-white" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableView;