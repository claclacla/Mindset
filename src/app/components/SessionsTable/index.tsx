"use client";

import * as React from 'react';
import { JSX } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/app/repositories/store";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { TrainingSession } from '@/app/entities/TrainingSession';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    {
        field: 'firstName',
        headerName: 'First name'
    },
    {
        field: 'lastName',
        headerName: 'Last name'
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number'
    },
    {
        field: 'distance',
        headerName: 'Distance',
        type: 'number'
    },
];

export default function SessionsTable(): JSX.Element {
    const trainingSessions: TrainingSession[] = useSelector((state: RootState) => state.trainingSessions.list);

    return (
        <DataGrid
            rows={trainingSessions}
            columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
}
