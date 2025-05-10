import axios from "axios";

// Separated Script Handler
export const handleScriptLoading = async (local: string) => {
    try {
        const res = await axios.get(`/api/gitlab/scripts/${local}`);
        console.log('Script info:', res.data);
        // for example state update or show modal
    } catch (error) {
        console.error('Fout bij ophalen script:', error);
    }
};