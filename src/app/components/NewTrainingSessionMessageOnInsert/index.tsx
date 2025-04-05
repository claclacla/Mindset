import NewTrainingSessionMessage from "@/app/components/NewTrainingSessionMessage";

import useShowNewTrainingSessionMessageOnInsert from '@/app/hooks/useShowNewTrainingSessionMessageOnInsert';
import { Box } from "@mui/system";

export default function NewTrainingSessionMessageOnInsert() {
    const { trainingSession } = useShowNewTrainingSessionMessageOnInsert();

    return (
        <Box>
            {trainingSession && <NewTrainingSessionMessage trainingSession={trainingSession} />}
        </Box>
    );
}