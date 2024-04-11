import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button><Link href='/issues/new'>New Issue</Link></Button> 
    </div>
  );
}
