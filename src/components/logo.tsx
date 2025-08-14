import { Recycle } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Recycle className="h-7 w-7 text-primary" />
      <span className="font-headline text-xl font-bold">ReSource Hub</span>
    </div>
  );
}
