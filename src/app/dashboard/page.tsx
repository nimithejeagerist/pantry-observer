'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import TableView from '../components/Table.jsx';
import DialogView from '../components/Dialog.jsx';
import Button from '@mui/material/Button';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const DashboardPage: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const [items, setItems] = useState<{ id: string; name: string; category: string; quantity: string; }[]>([]);
    const [newItem, setNewItem] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsList: { id: string; name: string; category: string; quantity: string; }[] = [];
            const querySnapshot = await getDocs(collection(db, 'items'));
            querySnapshot.forEach((doc) => {
                itemsList.push({ id: doc.id, ...doc.data() } as { id: string; name: string; category: string; quantity: string; });
            });
            setItems(itemsList);
        };
        fetchItems();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddItem = async () => {
        if (newItem && category && quantity) {
            try {
                const docRef = await addDoc(collection(db, 'items'), {
                    name: newItem,
                    category,
                    quantity,
                });
                setItems([...items, { id: docRef.id, name: newItem, category, quantity }]);
                setNewItem("");
                setCategory("");
                setQuantity("");
                setOpen(false);
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'items', id));
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4">
            <div className="flex items-center justify-between h-full">
                <Button variant="contained" color="primary" onClick={handleOpen}>Add Item</Button>
                <h1 className="text-3xl font-bold">Welcome to the pantry app</h1>
                <Button variant='contained' color='error' onClick={handleSignOut}>Sign Out</Button>
            </div>
            <div>
                <TableView items={items} handleDeleteItem={handleDeleteItem} />
            </div>
            <DialogView
                open={open}
                handleClose={handleClose}
                newItem={newItem}
                setNewItem={setNewItem}
                category={category}
                setCategory={setCategory}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddItem={handleAddItem}
            />
        </div>
    );
};

export default DashboardPage;