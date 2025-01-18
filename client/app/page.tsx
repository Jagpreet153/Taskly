import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
export default function Home() {
  return (
    <div className="flex gap-2 m-3">
          <Button size="lg" variant="primary">Click ME</Button>
          <Button size="lg" variant="destructive">Click ME</Button>
          
          <Button size="lg" variant="secondary">Click ME</Button>
          <Button size="lg" variant="ghost">Click ME</Button>
          <Button size="sm" variant="muted">Click ME</Button>
          <Button size="lg" variant="teritary">Click ME</Button>
          <Input />
          
    </div>
 

  );
}
