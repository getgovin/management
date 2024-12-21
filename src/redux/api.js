import { createAsyncThunk } from "@reduxjs/toolkit";

export const listemploye = createAsyncThunk('listemploye', async () => {
    try {
        const response = await fetch('https://67663e73410f84999657262b.mockapi.io/employee', {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',  
            },
        });
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
});


export const addemploye = createAsyncThunk('addemploye', async (requesrOption) => {
    try {
        const response = await fetch('https://67663e73410f84999657262b.mockapi.io/employee', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',  
            },
            body:JSON.stringify(requesrOption)
        });
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
});


export const deleteemploye = createAsyncThunk('deleteemploye', async (id) => {
    try {
        const response = await fetch(`https://67663e73410f84999657262b.mockapi.io/employee/${id}`, {
            method: 'DELETE',  
            headers: {
                'Content-Type': 'application/json',  
            },
        });
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
});


export const viewemploye = createAsyncThunk('viewemploye', async (id) => {
    try {
        const response = await fetch(`https://67663e73410f84999657262b.mockapi.io/employee/${id}`, {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',  
            },
        });
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
});

export const editemploye = createAsyncThunk('editemploye', async (requestOption) => {
    try {
        const response = await fetch(`https://67663e73410f84999657262b.mockapi.io/employee/${requestOption?.id}`, {
            method: 'PUT',  
            headers: {
                'Content-Type': 'application/json',  
            },
            body:JSON.stringify(requestOption)
        });
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
});