import NewTrainingSessionMessage from "@/app/components/NewTrainingSessionMessage";

import useShowNewTrainingSessionMessageOnInsert from '@/app/hooks/useShowNewTrainingSessionMessageOnInsert';
import { Box } from "@mui/system";

export default function NewTrainingSessionMessageOnInsert() {
    const { newTrainingSession } = useShowNewTrainingSessionMessageOnInsert();

    return (
        <Box>
            { newTrainingSession && <NewTrainingSessionMessage trainingSession={newTrainingSession} />}
        </Box>
    );
}