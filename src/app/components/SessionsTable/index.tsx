"use client";

import * as React from 'react';
import { JSX } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/app/repositories/store";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { TrainingSession } from '@/app/entities/TrainingSession';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
    },
    {
        field: 'distance',
        headerName: 'Distance',
        type: 'number',
        width: 160,
    },
];

export default function SessionsTable(): JSX.Element {
    const trainingSessions: TrainingSession[] = useSelector((state: RootState) => state.trainingSessions.list);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={trainingSessions}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
