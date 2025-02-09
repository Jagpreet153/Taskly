import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
        <Loader size="50" className="animate spin text-muted-foreground" />
        </div>
    );
}

export default Loading;