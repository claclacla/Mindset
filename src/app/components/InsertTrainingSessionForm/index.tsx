import { TextField } from "@mui/material";

import useInsertAPINewTrainingSession from "@/app/hooks/useInsertAPINewTrainingSession";

export default function InsertTrainingSessionForm() {
    const { trainingSession, onFormFieldChange, onSubmit } = useInsertAPINewTrainingSession();

    return (
        <form
            onSubmit={onSubmit}
            className="w-full max-w-md"
        >

            <div className="mb-6">
                <TextField
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={trainingSession.firstName}
                    onChange={onFormFieldChange}
                />
            </div>

            <div className="mb-6">
                <TextField
                    label="Lastname"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={trainingSession.lastName}
                    onChange={onFormFieldChange}
                />
            </div>

            <div className="mb-6 flex items-center space-x-4">
                <TextField
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    name="age"
                    sx={{ marginRight: 4 }}
                    value={trainingSession.age}
                    onChange={onFormFieldChange}
                />

                <TextField
                    label="Distance"
                    type="number"
                    variant="outlined"
                    fullWidth
                    name="distance"
                    value={trainingSession.distance}
                    onChange={onFormFieldChange}
                />
            </div>

            <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Insert
            </button>
        </form>
    );
}